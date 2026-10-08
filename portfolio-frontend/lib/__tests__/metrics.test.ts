import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getSessionId,
  resetSessionIdForTesting,
  trackMetric,
  trackNavigationPerformance,
} from "../metrics";

describe("metrics module", () => {
  const originalEnv = process.env.NEXT_PUBLIC_RENDER_API_URL;
  const mockApiUrl = "https://mock-api.example.com";

  beforeEach(() => {
    process.env.NEXT_PUBLIC_RENDER_API_URL = mockApiUrl;
    resetSessionIdForTesting();
    window.sessionStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_RENDER_API_URL = originalEnv;
    resetSessionIdForTesting();
    window.sessionStorage.clear();
    vi.unstubAllGlobals();
  });

  describe("getSessionId", () => {
    it("returns existing sessionId stored in sessionStorage", () => {
      window.sessionStorage.setItem("portfolio_metrics_session_id", "existing-session-123");
      const id = getSessionId();
      expect(id).toBe("existing-session-123");
    });

    it("generates and stores a new sessionId if sessionStorage is empty", () => {
      const id = getSessionId();
      expect(id).toBeTruthy();
      expect(typeof id).toBe("string");
      expect(window.sessionStorage.getItem("portfolio_metrics_session_id")).toBe(id);
    });

    it("generates fallback in-memory id when sessionStorage throws SecurityError", () => {
      vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new Error("SecurityError: Access is denied for this document");
      });

      const id1 = getSessionId();
      expect(id1).toBeTruthy();

      const id2 = getSessionId();
      expect(id2).toBe(id1);
    });
  });

  describe("trackMetric", () => {
    it("does nothing when NEXT_PUBLIC_RENDER_API_URL is unset", () => {
      delete process.env.NEXT_PUBLIC_RENDER_API_URL;
      const sendBeaconMock = vi.fn();
      vi.stubGlobal("navigator", { sendBeacon: sendBeaconMock });
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      trackMetric({ eventName: "test_event" });

      expect(sendBeaconMock).not.toHaveBeenCalled();
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("uses navigator.sendBeacon when available and queued successfully", () => {
      const sendBeaconMock = vi.fn().mockReturnValue(true);
      vi.stubGlobal("navigator", { sendBeacon: sendBeaconMock });
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      trackMetric({
        eventName: "cta_click",
        meta: { target: "hero" },
      });

      expect(sendBeaconMock).toHaveBeenCalledTimes(1);
      const [url, blob] = sendBeaconMock.mock.calls[0];
      expect(url).toBe(`${mockApiUrl}/api/metrics`);
      expect(blob).toBeInstanceOf(Blob);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("falls back to fetch when navigator.sendBeacon returns false", async () => {
      const sendBeaconMock = vi.fn().mockReturnValue(false);
      vi.stubGlobal("navigator", { sendBeacon: sendBeaconMock });
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 204 }));

      trackMetric({ eventName: "cta_click" });

      expect(sendBeaconMock).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [fetchUrl, fetchOptions] = fetchSpy.mock.calls[0];
      expect(fetchUrl).toBe(`${mockApiUrl}/api/metrics`);
      expect(fetchOptions?.method).toBe("POST");
      expect(fetchOptions?.keepalive).toBe(true);
    });

    it("falls back to fetch when navigator.sendBeacon throws an error", () => {
      const sendBeaconMock = vi.fn().mockImplementation(() => {
        throw new Error("QuotaExceededError");
      });
      vi.stubGlobal("navigator", { sendBeacon: sendBeaconMock });
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 204 }));

      trackMetric({ eventName: "cta_click" });

      expect(sendBeaconMock).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    it("falls back to fetch when navigator.sendBeacon is unavailable", () => {
      vi.stubGlobal("navigator", {});
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 204 }));

      trackMetric({ eventName: "cta_click" });

      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    it("silently swallows fetch errors without throwing", () => {
      vi.stubGlobal("navigator", {});
      vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network failed"));

      expect(() => {
        trackMetric({ eventName: "cta_click" });
      }).not.toThrow();
    });

    it("preserves explicit sessionId and page when passed in payload", () => {
      const sendBeaconMock = vi.fn().mockReturnValue(true);
      vi.stubGlobal("navigator", { sendBeacon: sendBeaconMock });

      trackMetric({
        eventName: "custom_event",
        sessionId: "explicit-session-456",
        page: "/custom-page",
      });

      expect(sendBeaconMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("trackNavigationPerformance", () => {
    it("handles missing navigation performance entries gracefully", () => {
      const getEntriesByTypeSpy = vi.spyOn(performance, "getEntriesByType").mockReturnValue([]);
      const sendBeaconMock = vi.fn().mockReturnValue(true);
      vi.stubGlobal("navigator", { sendBeacon: sendBeaconMock });

      expect(() => trackNavigationPerformance()).not.toThrow();
      expect(sendBeaconMock).not.toHaveBeenCalled();
      getEntriesByTypeSpy.mockRestore();
    });

    it("extracts performance navigation timing and triggers trackMetric", () => {
      const mockNavEntry = {
        name: "navigation",
        entryType: "navigation",
        startTime: 0,
        duration: 450,
        loadEventEnd: 450,
        responseStart: 45,
        domContentLoadedEventEnd: 220,
        transferSize: 12000,
        decodedBodySize: 34000,
        toJSON: () => ({}),
      } as PerformanceNavigationTiming;

      const mockPaintEntry = {
        name: "first-contentful-paint",
        entryType: "paint",
        startTime: 110,
        duration: 0,
        toJSON: () => ({}),
      } as PerformancePaintTiming;

      vi.spyOn(performance, "getEntriesByType").mockImplementation((type: string) => {
        if (type === "navigation") return [mockNavEntry];
        if (type === "paint") return [mockPaintEntry];
        return [];
      });

      const sendBeaconMock = vi.fn().mockReturnValue(true);
      vi.stubGlobal("navigator", { sendBeacon: sendBeaconMock });

      trackNavigationPerformance();

      expect(sendBeaconMock).toHaveBeenCalledTimes(1);
      const [url] = sendBeaconMock.mock.calls[0];
      expect(url).toBe(`${mockApiUrl}/api/metrics`);
    });
  });
});
