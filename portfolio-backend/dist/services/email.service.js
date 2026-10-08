"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResendEmail = void 0;
const env_1 = require("../config/env");
const sendResendEmail = async (payload) => {
    if (!env_1.resendApiKey || !env_1.resendFrom || !env_1.alertTo) {
        console.warn("Resend email not sent: missing RESEND_API_KEY, RESEND_FROM, or ALERT_TO.");
        return;
    }
    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${env_1.resendApiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: env_1.resendFrom,
            to: [env_1.alertTo],
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
exports.sendResendEmail = sendResendEmail;
