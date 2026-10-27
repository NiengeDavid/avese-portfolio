import { getCourse, formatNaira } from "../../config/courses";
import { appendRow } from "../../lib/sheets";
import {
  sendMail,
  emailLayout,
  buttonHtml,
  escapeHtml,
  getSiteUrl,
} from "../../utils/mailer";

const TAB = "Payments";
const HEADERS = [
  "Submitted at",
  "Reference",
  "First name",
  "Surname",
  "Email",
  "Phone",
  "Course",
  "Package",
  "Amount (NGN)",
  "Status",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,19}$/;
const REF_RE = /^AVS-[A-HJ-NP-Z2-9]{6}$/; // matches the code generated on the checkout page

const clean = (value, max = 120) =>
  String(value ?? "")
    .trim()
    .slice(0, max);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = req.body || {};
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid request" });
    }
  }

  // Honeypot: real users never fill this hidden field.
  if (body.website) return res.status(200).json({ ok: true, emailSent: true });

  const firstName = clean(body.firstName);
  const surname = clean(body.surname);
  const email = clean(body.email, 200).toLowerCase();
  const phone = clean(body.phone, 30);
  const ref = clean(body.ref, 20);

  const course = getCourse(clean(body.courseSlug, 200));
  const pkg = course && course.packages.find((p) => p.id === body.plan);

  if (!course || !pkg)
    return res.status(400).json({ error: "Please choose a valid package." });
  if (!firstName || !surname)
    return res
      .status(400)
      .json({ error: "Please enter your first name and surname." });
  if (!EMAIL_RE.test(email))
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  if (!PHONE_RE.test(phone))
    return res
      .status(400)
      .json({ error: "Please enter a valid phone number." });
  if (!REF_RE.test(ref))
    return res
      .status(400)
      .json({
        error:
          "Your payment code is invalid. Please refresh the page and try again.",
      });

  // The amount always comes from server config, never from the browser.
  try {
    await appendRow(TAB, HEADERS, [
      new Date().toISOString(),
      ref,
      firstName,
      surname,
      email,
      phone,
      course.title,
      pkg.label,
      pkg.amount,
      "Pending verification",
    ]);
  } catch (error) {
    console.error("Checkout: failed to save to Google Sheets", error);
    return res
      .status(500)
      .json({
        error: "We couldn't save your details. Please try again in a moment.",
      });
  }

  const intakeUrl = `${getSiteUrl(req)}/intake-questionnaire?ref=${encodeURIComponent(ref)}`;
  let emailSent = true;

  try {
    await sendMail({
      to: email,
      subject: "We've received your payment details",
      html: emailLayout(
        `Thank you, ${escapeHtml(firstName)}`,
        `<p>We've received your payment details for <strong>${escapeHtml(course.title)}</strong> (${escapeHtml(pkg.label)}, ${escapeHtml(formatNaira(pkg.amount))}).</p>
<p>Your payment reference is <strong>${escapeHtml(ref)}</strong>. We'll confirm once your transfer reflects in our account.</p>
<p>Next step: please complete the intake questionnaire so we can tailor the programme to you before the first session.</p>
${buttonHtml(intakeUrl, "Take the intake questionnaire")}`,
      ),
    });
  } catch (error) {
    emailSent = false;
    console.error("Checkout: failed to send confirmation email", error);
  }

  if (process.env.ADMIN_NOTIFY_EMAIL) {
    try {
      await sendMail({
        to: process.env.ADMIN_NOTIFY_EMAIL,
        subject: `New payment submission: ${ref}`,
        html: emailLayout(
          "New payment submission",
          `<p>${escapeHtml(firstName)} ${escapeHtml(surname)} (${escapeHtml(email)}, ${escapeHtml(phone)}) chose <strong>${escapeHtml(pkg.label)}</strong>, ${escapeHtml(formatNaira(pkg.amount))}.</p><p>Reference: <strong>${escapeHtml(ref)}</strong>. Check your bank account, then update the Status column in the Payments sheet.</p>`,
        ),
      });
    } catch (error) {
      console.error("Checkout: failed to send admin notification", error);
    }
  }

  return res.status(200).json({ ok: true, emailSent });
}
