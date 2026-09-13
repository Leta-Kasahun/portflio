type SendNotificationParams = {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
};

export async function sendContactNotification({
  name,
  email,
  subject,
  message,
}: SendNotificationParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return false;
  }

  const toEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "letakasahun2@gmail.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `[Portfolio Inquiry] ${subject ? subject : "New message from " + name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0E1113; color: #E7EAEA; border: 1px solid #22282B; border-radius: 12px;">
            <div style="border-bottom: 1px solid #22282B; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="color: #3FC7B0; margin: 0; font-size: 20px;">New Portfolio Inquiry</h2>
              <p style="color: #8A9295; font-size: 13px; margin: 4px 0 0 0;">Received from your portfolio website contact form.</p>
            </div>
            <div style="margin-bottom: 16px;">
              <strong style="color: #8A9295; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; display: block;">Sender:</strong>
              <span style="font-size: 15px; color: #FFFFFF;">${name}</span> &lt;<a href="mailto:${email}" style="color: #3FC7B0; text-decoration: none;">${email}</a>&gt;
            </div>
            ${
              subject
                ? `<div style="margin-bottom: 16px;">
                    <strong style="color: #8A9295; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; display: block;">Subject:</strong>
                    <span style="font-size: 15px; color: #FFFFFF;">${subject}</span>
                  </div>`
                : ""
            }
            <div style="margin-bottom: 24px;">
              <strong style="color: #8A9295; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Message:</strong>
              <div style="background-color: #171B1D; padding: 16px; border-radius: 8px; border: 1px solid #22282B; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #E7EAEA;">
${message}
              </div>
            </div>
            <div style="border-top: 1px solid #22282B; padding-top: 16px; text-align: center;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || "Your message to Leta Kasahun")}" style="display: inline-block; background-color: #3FC7B0; color: #0E1113; padding: 10px 20px; border-radius: 6px; font-weight: 600; text-decoration: none; font-size: 13px;">
                Reply to ${name}
              </a>
            </div>
          </div>
        `,
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}
