"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackMetric, trackNavigationPerformance } from "@/lib/metrics";

const scheduleNavigationPerfTracking = (callback: () => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  if ("requestIdleCallback" in window && typeof window.requestIdleCallback === "function") {
    const idleId = window.requestIdleCallback(() => callback(), { timeout: 2000 });
    return () => {
      if ("cancelIdleCallback" in window && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
    };
  }

  const timeoutId = window.setTimeout(() => callback(), 0);
  return () => window.clearTimeout(timeoutId);
};

export default function MetricsTracker() {
  const pathname = usePathname();
  const hasTrackedPerfRef = useRef(false);

  useEffect(() => {
    if (!pathname) return;

    trackMetric({
      eventName: "page_view",
      page: pathname,
    });

    if (!hasTrackedPerfRef.current) {
      hasTrackedPerfRef.current = true;
      return scheduleNavigationPerfTracking(() => {
        trackNavigationPerformance();
      });
    }
  }, [pathname]);

  return null;
}
