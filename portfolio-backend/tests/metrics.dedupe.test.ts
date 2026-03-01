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

const baseCaseExpandPayload = {
  eventName: "case_expand",
  page: "/",
  sessionId: "test-session-case-1",
  meta: {
    caseId: "commerce-platform-buildout",
    caseTitle: "Commerce Platform Buildout",
  },
};

const baseRoiPresetPayload = {
  eventName: "roi_preset_selected",
  page: "/",
  sessionId: "test-session-roi-preset-1",
  meta: {
    presetId: "ops_team",
    hoursSaved: 10,
    hourlyRate: 95,
  },
};

const baseRoiEstimateClickPayload = {
  eventName: "roi_estimate_cta_click",
  page: "/",
  sessionId: "test-session-roi-estimate-1",
  value: 49400,
  meta: {
    estimateKey: "10:95",
    hoursSaved: 10,
    hourlyRate: 95,
    source: "roi_section",
  },
};

const baseRoiEstimateClickPayloadWithoutEstimateKey = {
  eventName: "roi_estimate_cta_click",
  page: "/",
  sessionId: "test-session-roi-estimate-2",
  value: 49400,
  meta: {
    hoursSaved: 10,
    hourlyRate: 95,
    source: "roi_section",
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
    expect(queryMock.mock.calls[0][0]).toContain(`INSERT INTO "PortfolioMetricDedupe"`);
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

  it("accepts a new case_expand metric", async () => {
    queryMock.mockResolvedValueOnce({ rowCount: 1 });
    const app = await loadApp();

    const response = await request(app).post("/api/metrics").send(baseCaseExpandPayload);

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true });
    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock.mock.calls[0][0]).toContain(`INSERT INTO "PortfolioMetricDedupe"`);
  });

  it("marks duplicate case_expand metrics as deduped", async () => {
    queryMock.mockResolvedValueOnce({ rowCount: 0 });
    const app = await loadApp();

    const response = await request(app).post("/api/metrics").send(baseCaseExpandPayload);

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true, deduped: true });
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it("treats DB-level unique conflicts as deduped case_expand metrics", async () => {
    queryMock.mockRejectedValueOnce({ code: "23505" });
    const app = await loadApp();

    const response = await request(app).post("/api/metrics").send(baseCaseExpandPayload);

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true, deduped: true });
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it("accepts a new roi_preset_selected metric", async () => {
    queryMock.mockResolvedValueOnce({ rowCount: 1 });
    const app = await loadApp();

    const response = await request(app).post("/api/metrics").send(baseRoiPresetPayload);

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true });
    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock.mock.calls[0][0]).toContain(`INSERT INTO "PortfolioMetricDedupe"`);
  });

  it("marks duplicate roi_preset_selected metrics as deduped", async () => {
    queryMock.mockResolvedValueOnce({ rowCount: 0 });
    const app = await loadApp();

    const response = await request(app).post("/api/metrics").send(baseRoiPresetPayload);

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true, deduped: true });
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it("accepts a new roi_estimate_cta_click metric", async () => {
    queryMock.mockResolvedValueOnce({ rowCount: 1 });
    const app = await loadApp();

    const response = await request(app).post("/api/metrics").send(baseRoiEstimateClickPayload);

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true });
    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock.mock.calls[0][0]).toContain(`INSERT INTO "PortfolioMetricDedupe"`);
  });

  it("marks duplicate roi_estimate_cta_click metrics as deduped", async () => {
    queryMock.mockResolvedValueOnce({ rowCount: 0 });
    const app = await loadApp();

    const response = await request(app).post("/api/metrics").send(baseRoiEstimateClickPayload);

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true, deduped: true });
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it("derives and persists estimateKey when roi_estimate_cta_click omits it", async () => {
    queryMock.mockResolvedValueOnce({ rowCount: 1 });
    const app = await loadApp();

    const response = await request(app)
      .post("/api/metrics")
      .send(baseRoiEstimateClickPayloadWithoutEstimateKey);

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true });
    expect(queryMock).toHaveBeenCalledTimes(1);
    const insertedMetaRaw = queryMock.mock.calls[0][1][8] as string;
    expect(JSON.parse(insertedMetaRaw)).toEqual(
      expect.objectContaining({
        hoursSaved: 10,
        hourlyRate: 95,
        estimateKey: "10:95",
      }),
    );
  });

  it("accepts roi_preset_selected without presetId using fallback dedupe key", async () => {
    queryMock.mockResolvedValueOnce({ rowCount: 1 });
    const app = await loadApp();

    const response = await request(app).post("/api/metrics").send({
      eventName: "roi_preset_selected",
      page: "/",
      sessionId: "session-missing-preset",
      meta: { hoursSaved: 10, hourlyRate: 95 },
    });

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true });
    expect(queryMock).toHaveBeenCalledTimes(1);
    const insertedMetaRaw = queryMock.mock.calls[0][1][8] as string;
    expect(JSON.parse(insertedMetaRaw)).toEqual(
      expect.objectContaining({
        presetId: "10:95",
      }),
    );
  });

  it("accepts roi_estimate_cta_click without estimate key inputs using value fallback", async () => {
    queryMock.mockResolvedValueOnce({ rowCount: 1 });
    const app = await loadApp();

    const response = await request(app).post("/api/metrics").send({
      eventName: "roi_estimate_cta_click",
      page: "/",
      sessionId: "session-missing-estimate",
      value: 12345,
      meta: { source: "roi_section" },
    });

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ accepted: true });
    expect(queryMock).toHaveBeenCalledTimes(1);
    const insertedMetaRaw = queryMock.mock.calls[0][1][8] as string;
    expect(JSON.parse(insertedMetaRaw)).toEqual(
      expect.objectContaining({
        estimateKey: "value:12345",
      }),
    );
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
