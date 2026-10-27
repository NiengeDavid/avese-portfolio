// Server-only helper (import from pages/api/* only). Reads MAILGUN_* from server env,
// so the key is never bundled for the browser.
import FormData from "form-data";
import Mailgun from "mailgun.js";

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function emailLayout(heading, bodyHtml) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1f2d36;line-height:1.6">
<h2 style="color:#365B6D;margin-bottom:16px">${heading}</h2>
${bodyHtml}
<p style="color:#6b7a84;font-size:13px;margin-top:32px">Avese Tokula - Personal Growth, Leadership &amp; Business Mentoring</p>
</div>`;
}

export function buttonHtml(href, label) {
  return `<p style="margin:24px 0"><a href="${escapeHtml(href)}" style="background:#365B6D;color:#ffffff;padding:12px 22px;border-radius:8px;text-decoration:none;display:inline-block">${escapeHtml(label)}</a></p>`;
}

export async function sendMail({ to, subject, html }) {
  const key = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  if (!key || !domain)
    throw new Error("Mailgun environment variables are not configured");

  const mg = new Mailgun(FormData).client({ username: "api", key });
  return mg.messages.create(domain, {
    from: process.env.MAIL_FROM || "support <support@avesetokula.com>",
    to: [to],
    subject,
    html,
  });
}

export function getSiteUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const proto = req.headers["x-forwarded-proto"] || "https";
  return `${proto}://${req.headers.host}`;
}
