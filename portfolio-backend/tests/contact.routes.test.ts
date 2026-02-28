import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const queryMock = vi.fn();
const contactCreateMock = vi.fn();

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
    queryMock.mockResolvedValue({ rowCount: 1 });
    contactCreateMock.mockResolvedValue({ id: 101 });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("GET /health returns ok", async () => {
    const app = await loadApp();
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
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
    expect(response.body).toEqual({ error: "Invalid contact payload" });
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
    expect(secondResponse.body).toEqual({ error: "Too many requests, try again later." });
  });

  it("POST /api/contact returns success even if Resend fails", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("resend unavailable"));
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", fetchMock);

    const app = await loadApp();
    const response = await request(app).post("/api/contact").send(validContactPayload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, id: 101 });

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Email notification failed",
      expect.any(Error),
    );
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

  it("CORS blocks non-allowlisted origin on preflight", async () => {
    const app = await loadApp();
    const response = await request(app)
      .options("/api/contact")
      .set("Origin", "https://blocked.example.com")
      .set("Access-Control-Request-Method", "POST");

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.headers["access-control-allow-origin"]).toBeUndefined();
  });
});
