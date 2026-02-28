import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MetricsTracker from "../MetricsTracker";

const trackMetricMock = vi.fn();
const trackNavigationPerformanceMock = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("@/lib/metrics", () => ({
  trackMetric: (payload: unknown) => trackMetricMock(payload),
  trackNavigationPerformance: () => trackNavigationPerformanceMock(),
}));

describe("MetricsTracker", () => {
  beforeEach(() => {
    trackMetricMock.mockReset();
    trackNavigationPerformanceMock.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("tracks page_view and schedules perf via requestIdleCallback", () => {
    const requestIdleCallbackMock = vi.fn((callback: IdleRequestCallback) => {
      callback({ didTimeout: false, timeRemaining: () => 1 });
      return 1;
    });

    const cancelIdleCallbackMock = vi.fn();
    vi.stubGlobal("requestIdleCallback", requestIdleCallbackMock);
    vi.stubGlobal("cancelIdleCallback", cancelIdleCallbackMock);

    render(<MetricsTracker />);

    expect(trackMetricMock).toHaveBeenCalledWith(
      expect.objectContaining({
        eventName: "page_view",
        page: "/",
      }),
    );
    expect(requestIdleCallbackMock).toHaveBeenCalledTimes(1);
    expect(trackNavigationPerformanceMock).toHaveBeenCalledTimes(1);
  });

  it("falls back to setTimeout when requestIdleCallback is unavailable", () => {
    vi.useFakeTimers();
    const setTimeoutSpy = vi.spyOn(window, "setTimeout");
    vi.stubGlobal("requestIdleCallback", undefined);
    vi.stubGlobal("cancelIdleCallback", undefined);

    render(<MetricsTracker />);

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(trackNavigationPerformanceMock).toHaveBeenCalledTimes(0);

    vi.runAllTimers();
    expect(trackNavigationPerformanceMock).toHaveBeenCalledTimes(1);
  });
});
