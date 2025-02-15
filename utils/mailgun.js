// utils/mailgun.js
import FormData from "form-data";
import Mailgun from "mailgun.js";

export async function sendWelcomeEmail(userEmail, userName) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
  });

  try {
    const data = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: "support <support@avesetokula.com>",
      to: [userEmail],
      subject: "Welcome to Our Course! 🎉",
      template: "Welcome on board",
      "h:X-Mailgun-Variables": JSON.stringify({
        name: userName,
        //test: "test",
      }),
    });
    console.log(data); // logs response data
  } catch (error) {
    console.error("Error sending welcome email:", error);
    // Consider adding error handling/retry logic here
  }
}
