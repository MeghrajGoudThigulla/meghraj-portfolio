import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const queryMock = vi.fn();
const contactCreateMock = vi.fn();
const metricCreateMock = vi.fn();

vi.mock("pg", () => {
  class Pool {
    query = queryMock;
  }
  return { Pool };
});

vi.mock("@prisma/adapter-pg", () => ({
  PrismaPg: class PrismaPg {
    constructor(_pool: unknown) {}
  },
}));

vi.mock("../generated/prisma", () => ({
  PrismaClient: class PrismaClient {
    contact = {
      create: contactCreateMock,
    };
    metric = {
      create: metricCreateMock,
    };
    constructor(_args: unknown) {}
  },
}));

const validContactPayload = {
  name: " Meghraj ",
  email: " meghraj@example.com ",
  message: " Need help with API reliability. ",
  segment: "Consulting",
};

const loadApp = async () => {
  const module = await import("../src/index");
  return module.app;
};

describe("backend route coverage", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();

    process.env.NODE_ENV = "test";
    process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/postgres";
    process.env.CORS_ORIGINS = "https://allowed.example.com";
    process.env.RATE_LIMIT_MAX = "20";
    process.env.RESEND_API_KEY = "test-resend-key";
    process.env.RESEND_FROM = "Portfolio <noreply@example.com>";
    process.env.ALERT_TO = "alerts@example.com";

    queryMock.mockReset();
    contactCreateMock.mockReset();
    metricCreateMock.mockReset();
    queryMock.mockResolvedValue({ rowCount: 1 });
    contactCreateMock.mockResolvedValue({ id: 101 });
    metricCreateMock.mockResolvedValue({ id: 201 });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("GET /health returns ok", async () => {
    const app = await loadApp();
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok", database: "healthy" });
  });

  it("GET /health returns 500 when database query fails", async () => {
    queryMock.mockRejectedValueOnce(new Error("Database connection timed out"));
    const app = await loadApp();
    const response = await request(app).get("/health");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toBe("string");
  });

  it("POST /api/contact accepts valid payload and trims fields", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 202,
      text: async () => "",
    });
    vi.stubGlobal("fetch", fetchMock);

    const app = await loadApp();
    const response = await request(app).post("/api/contact").send(validContactPayload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, id: 101 });
    expect(contactCreateMock).toHaveBeenCalledWith({
      data: {
        name: "Meghraj",
        email: "meghraj@example.com",
        message: "Need help with API reliability.",
        segment: "Consulting",
      },
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
      }),
    );
  });

  it("POST /api/contact rejects invalid payload", async () => {
    const app = await loadApp();
    const response = await request(app).post("/api/contact").send({
      name: "",
      email: "invalid",
      message: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(typeof response.body.error).toBe("string");
    expect(contactCreateMock).not.toHaveBeenCalled();
  });

  it("POST /api/contact enforces rate limits", async () => {
    process.env.RATE_LIMIT_MAX = "1";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 202,
      text: async () => "",
    });
    vi.stubGlobal("fetch", fetchMock);

    const app = await loadApp();

    const firstResponse = await request(app).post("/api/contact").send(validContactPayload);
    const secondResponse = await request(app).post("/api/contact").send(validContactPayload);

    expect(firstResponse.status).toBe(200);
    expect(secondResponse.status).toBe(429);
    expect(secondResponse.body).toHaveProperty("error");
    expect(typeof secondResponse.body.error).toBe("string");
  });

  it("POST /api/contact returns 202 accepted when Resend fails", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("resend unavailable"));
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", fetchMock);

    const app = await loadApp();
    const response = await request(app).post("/api/contact").send(validContactPayload);

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ success: true, id: 101, emailQueued: false });
    expect(contactCreateMock).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Email notification failed",
      expect.any(Error),
    );
  });

  it("POST /api/contact silently drops bot submission when honeypot website is filled", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const app = await loadApp();
    const response = await request(app).post("/api/contact").send({
      ...validContactPayload,
      website: "https://spam-bot.xyz",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
    expect(contactCreateMock).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("POST /api/contact silently drops bot submission when elapsedMs is under 2000", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const app = await loadApp();
    const response = await request(app).post("/api/contact").send({
      ...validContactPayload,
      elapsedMs: 850,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
    expect(contactCreateMock).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("POST /api/contact accepts valid payload with elapsedMs >= 2000", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 202,
      text: async () => "",
    });
    vi.stubGlobal("fetch", fetchMock);

    const app = await loadApp();
    const response = await request(app).post("/api/contact").send({
      ...validContactPayload,
      website: "",
      elapsedMs: 3200,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, id: 101 });
    expect(contactCreateMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalled();
  });

  it("CORS allows configured origin on preflight", async () => {
    const app = await loadApp();
    const response = await request(app)
      .options("/api/contact")
      .set("Origin", "https://allowed.example.com")
      .set("Access-Control-Request-Method", "POST");

    expect(response.status).toBe(204);
    expect(response.headers["access-control-allow-origin"]).toBe("https://allowed.example.com");
  });

  it("CORS allows configured origin on actual request", async () => {
    const app = await loadApp();
    const response = await request(app)
      .get("/health")
      .set("Origin", "https://allowed.example.com");

    expect(response.status).toBe(200);
    expect(response.headers["access-control-allow-origin"]).toBe("https://allowed.example.com");
  });

  it("CORS rejects non-allowlisted origin without 500 server error", async () => {
    const app = await loadApp();
    const preflight = await request(app)
      .options("/api/contact")
      .set("Origin", "https://evil.example.com")
      .set("Access-Control-Request-Method", "POST");

    expect(preflight.status).not.toBe(500);
    expect(preflight.headers["access-control-allow-origin"]).toBeUndefined();

    const response = await request(app)
      .get("/health")
      .set("Origin", "https://evil.example.com");

    expect(response.status).toBe(200);
    expect(response.headers["access-control-allow-origin"]).toBeUndefined();
  });

  it("permits requests with no origin (curl / server-to-server)", async () => {
    const app = await loadApp();
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok", database: "healthy" });
  });

  it("POST /api/metrics rejects invalid payload with 400 and error property", async () => {
    const app = await loadApp();
    const response = await request(app).post("/api/metrics").send({
      invalidKey: 123,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(typeof response.body.error).toBe("string");
  });

  it("POST /api/metrics accepts valid payload with status 202", async () => {
    queryMock.mockResolvedValueOnce({ rowCount: 1 });
    const app = await loadApp();
    const response = await request(app).post("/api/metrics").send({
      eventName: "cta_click",
      page: "/",
      sessionId: "session-abc-123",
      meta: { target: "hero" },
    });

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true });
    expect(queryMock).toHaveBeenCalled();
  });
});
