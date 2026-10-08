import { resendApiKey, resendFrom, alertTo } from "../config/env";

export type EmailPayload = {
  name: string;
  email: string;
  message: string;
  segment: string;
};

export const sendResendEmail = async (payload: EmailPayload) => {
  if (!resendApiKey || !resendFrom || !alertTo) {
    console.warn("Resend email not sent: missing RESEND_API_KEY, RESEND_FROM, or ALERT_TO.");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [alertTo],
      reply_to: payload.email,
      subject: `New contact: ${payload.name}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\nSegment: ${payload.segment}\n\n${payload.message}`,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend API error ${response.status}: ${errorBody}`);
  }
};
