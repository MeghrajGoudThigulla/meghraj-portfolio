"use client";

type MetricEvent = {
  eventName: string;
  page?: string;
  sessionId?: string;
  value?: number;
  durationMs?: number;
  success?: boolean;
  meta?: Record<string, unknown>;
};

const apiBase = process.env.NEXT_PUBLIC_RENDER_API_URL;
const sessionStorageKey = "portfolio_metrics_session_id";

const getSessionId = () => {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.sessionStorage.getItem(sessionStorageKey);
    if (existing) return existing;

    const generated =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.sessionStorage.setItem(sessionStorageKey, generated);
    return generated;
  } catch {
    return "";
  }
};

export const trackMetric = (event: MetricEvent) => {
  if (!apiBase || typeof window === "undefined") return;

  const payload = {
    eventName: event.eventName,
    page: event.page ?? window.location.pathname,
    sessionId: event.sessionId ?? getSessionId(),
    value: event.value,
    durationMs: event.durationMs,
    success: event.success,
    meta: event.meta,
  };

  try {
    const body = JSON.stringify(payload);
    const url = `${apiBase}/api/metrics`;

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(url, blob);
      return;
    }

    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // Metrics must never block UX.
    });
  } catch {
    // Metrics must never block UX.
  }
};

export const trackNavigationPerformance = () => {
  if (typeof window === "undefined" || typeof performance === "undefined") return;

  const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  if (!navEntry) return;

  const paintEntries = performance.getEntriesByType("paint");
  const firstContentfulPaint = paintEntries.find((entry) => entry.name === "first-contentful-paint");

  trackMetric({
    eventName: "page_navigation_perf",
    durationMs: navEntry.loadEventEnd > 0 ? navEntry.loadEventEnd : navEntry.duration,
    meta: {
      ttfbMs: Math.round(navEntry.responseStart),
      domContentLoadedMs: Math.round(navEntry.domContentLoadedEventEnd),
      loadEventMs: Math.round(navEntry.loadEventEnd || navEntry.duration),
      transferSize: navEntry.transferSize,
      decodedBodySize: navEntry.decodedBodySize,
      firstContentfulPaintMs: firstContentfulPaint ? Math.round(firstContentfulPaint.startTime) : null,
    },
  });
};
