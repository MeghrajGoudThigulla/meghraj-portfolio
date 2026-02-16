"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("../generated/prisma");
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new prisma_1.PrismaClient();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("Consulting Portfolio API Active");
});
app.post("/api/contact", async (req, res) => {
    const { name, email, message, segment } = req.body || {};
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                message,
                segment: segment || "Consulting",
            },
        });
        if (process.env.SMTP_HOST &&
            process.env.SMTP_PORT &&
            process.env.SMTP_USER &&
            process.env.SMTP_PASS &&
            process.env.ALERT_TO) {
            const transporter = nodemailer_1.default.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });
            await transporter.sendMail({
                from: `"Portfolio" <${process.env.SMTP_USER}>`,
                to: process.env.ALERT_TO,
                subject: `New contact: ${name}`,
                text: `Name: ${name}\nEmail: ${email}\nSegment: ${segment || "Consulting"}\n\n${message}`,
            });
        }
        else {
            console.warn("Email not sent: SMTP env vars missing");
        }
        return res.json({ success: true, id: contact.id });
    }
    catch (error) {
        console.error("/api/contact error", error);
        return res.status(500).json({ error: "Database error" });
    }
});
app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
