import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "../generated/prisma";
import nodemailer from "nodemailer";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

dotenv.config();

const app = express();
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Configure it in the environment.");
}

const databaseUrl = process.env.DATABASE_URL;
const caCertFromEnv = process.env.PG_CA_CERT?.replace(/\\n/g, "\n").trim();
const caCertFromBase64 = process.env.PG_CA_CERT_B64
  ? Buffer.from(process.env.PG_CA_CERT_B64, "base64").toString("utf8").trim()
  : undefined;
const base64LooksValid = Boolean(
  caCertFromBase64 && caCertFromBase64.includes("BEGIN CERTIFICATE"),
);
const caCert = process.env.PG_CA_CERT_B64 ? caCertFromBase64 : caCertFromEnv;
if (process.env.PG_CA_CERT_B64 && !base64LooksValid) {
  console.warn("PG_CA_CERT_B64 is set but does not look like a PEM certificate.");
}
if (process.env.PG_CA_CERT_B64) {
  console.log("TLS CA cert source: PG_CA_CERT_B64", {
    caCertLength: caCert?.length ?? 0,
    base64LooksValid,
  });
} else if (process.env.PG_CA_CERT) {
  console.log("TLS CA cert source: PG_CA_CERT", { caCertLength: caCert?.length ?? 0 });
} else {
  console.log("TLS CA cert source: none");
}

const requiresSsl = /sslmode=(require|verify-ca|verify-full)/i.test(
  databaseUrl,
);
const sslConfig = requiresSsl
  ? caCert
    ? { ca: caCert, rejectUnauthorized: true }
    : { rejectUnauthorized: false }
  : undefined;

if (requiresSsl && !caCert) {
  console.warn(
    "PG_CA_CERT is not set; TLS verification is disabled for this connection.",
  );
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: sslConfig,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const PORT = process.env.PORT || 4000;
const allowedOrigins = (process.env.CORS_ORIGINS || process.env.FRONTEND_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const rateLimitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
const rateLimitMax = Number(process.env.RATE_LIMIT_MAX) || 20;
const rateLimitStore = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

if (process.env.TRUST_PROXY === "true") {
  app.set("trust proxy", 1);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS blocked: origin not allowed"));
    },
  }),
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Consulting Portfolio API Active");
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message, segment } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const ip = req.ip || "unknown";
    const now = Date.now();
    const existing = rateLimitStore.get(ip);

    if (!existing || now > existing.resetAt) {
      rateLimitStore.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    } else {
      existing.count += 1;
      if (existing.count > rateLimitMax) {
        return res.status(429).json({ error: "Too many requests, try again later." });
      }
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
        segment: segment || "Consulting",
      },
    });

    const smtpPort = Number(process.env.SMTP_PORT);
    const canSendMail =
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.ALERT_TO &&
      Number.isFinite(smtpPort);

    if (canSendMail) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      try {
        await transporter.sendMail({
          from: `"Portfolio" <${process.env.SMTP_USER}>`,
          to: process.env.ALERT_TO,
          subject: `New contact: ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nSegment: ${segment || "Consulting"}\n\n${message}`,
        });
      } catch (emailError) {
        console.error("Email notification failed", emailError);
      }
    } else {
      console.warn("Email not sent: SMTP env vars missing");
    }

    return res.json({ success: true, id: contact.id });
  } catch (error) {
    console.error("/api/contact error", error);
    return res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
