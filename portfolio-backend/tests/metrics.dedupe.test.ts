import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const queryMock = vi.fn();

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
      create: vi.fn(),
    };
    constructor(_args: unknown) {}
  },
}));

const baseImpressionPayload = {
  eventName: "hero_trust_badge_impression",
  page: "/",
  sessionId: "test-session-1",
  meta: {
    badgeId: "apis_delivered",
    badgeTitle: "294+ APIs",
    trigger: "impression",
  },
};

const loadApp = async () => {
  const module = await import("../src/index");
  return module.app;
};

describe("/api/metrics dedupe", () => {
  beforeEach(() => {
    vi.resetModules();
    queryMock.mockReset();
    process.env.NODE_ENV = "test";
    process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/postgres";
  });

  it("accepts a new trust badge impression metric", async () => {
    queryMock.mockResolvedValueOnce({ rowCount: 1 });
    const app = await loadApp();

    const response = await request(app).post("/api/metrics").send(baseImpressionPayload);

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true });
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it("marks duplicate trust badge impressions as deduped", async () => {
    queryMock.mockResolvedValueOnce({ rowCount: 0 });
    const app = await loadApp();

    const response = await request(app).post("/api/metrics").send(baseImpressionPayload);

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true, deduped: true });
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it("treats DB-level unique conflicts as deduped impressions", async () => {
    queryMock.mockRejectedValueOnce({ code: "23505" });
    const app = await loadApp();

    const response = await request(app).post("/api/metrics").send(baseImpressionPayload);

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true, deduped: true });
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it("keeps non-impression metrics on the standard insert path", async () => {
    queryMock.mockResolvedValueOnce({ rowCount: 1 });
    const app = await loadApp();

    const response = await request(app).post("/api/metrics").send({
      eventName: "page_navigation_perf",
      page: "/",
      sessionId: "session-2",
      durationMs: 120,
      meta: {
        firstContentfulPaintMs: 300,
      },
    });

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true });
    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock.mock.calls[0][0]).toContain(`VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)`);
  });
});
