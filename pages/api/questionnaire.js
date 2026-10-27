import {
  allQuestions,
  MAX_ANSWER_LENGTH,
} from "../../config/intakeQuestionnaire";
import { appendRow } from "../../lib/sheets";
import { sendMail, emailLayout, escapeHtml } from "../../utils/mailer";

const TAB = "Questionnaire";
const HEADERS = [
  "Submitted at",
  "Reference",
  "Email",
  ...allQuestions.map((q) => (q.number ? `${q.number}. ${q.text}` : q.text)),
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REF_RE = /^AVS-[A-HJ-NP-Z2-9]{6}$/;

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

  if (body.website) return res.status(200).json({ ok: true, emailSent: true }); // honeypot

  const email = String(body.email ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 200);
  if (!EMAIL_RE.test(email))
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });

  const ref = REF_RE.test(String(body.ref ?? "")) ? body.ref : "";
  const answers =
    body.answers && typeof body.answers === "object" ? body.answers : {};

  const row = [
    new Date().toISOString(),
    ref,
    email,
    ...allQuestions.map((q) =>
      String(answers[q.id] ?? "")
        .trim()
        .slice(0, MAX_ANSWER_LENGTH),
    ),
  ];

  try {
    await appendRow(TAB, HEADERS, row);
  } catch (error) {
    console.error("Questionnaire: failed to save to Google Sheets", error);
    return res.status(500).json({
      error: "We couldn't save your answers. Please try again in a moment.",
    });
  }

  let emailSent = true;
  try {
    await sendMail({
      to: email,
      subject: "We've received your intake questionnaire",
      html: emailLayout(
        "Thank you for completing the questionnaire",
        `<p>Your answers have been received. I'll review them before our first session so we can focus on what matters most to you.</p>
<p>We'll be in touch to confirm your start date and session time.</p>${ref ? `<p style="color:#6b7a84">Reference: ${escapeHtml(ref)}</p>` : ""}`,
      ),
    });
  } catch (error) {
    emailSent = false;
    console.error("Questionnaire: failed to send confirmation email", error);
  }

  if (process.env.ADMIN_NOTIFY_EMAIL) {
    try {
      await sendMail({
        to: process.env.ADMIN_NOTIFY_EMAIL,
        subject: `Intake questionnaire submitted${ref ? `: ${ref}` : ""}`,
        html: emailLayout(
          "Questionnaire submitted",
          `<p>${escapeHtml(email)} has submitted the intake questionnaire. See the Questionnaire sheet.</p>`,
        ),
      });
    } catch (error) {
      console.error("Questionnaire: failed to send admin notification", error);
    }
  }

  return res.status(200).json({ ok: true, emailSent });
}
