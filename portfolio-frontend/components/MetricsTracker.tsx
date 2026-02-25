"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackMetric, trackNavigationPerformance } from "@/lib/metrics";

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
      window.setTimeout(() => {
        trackNavigationPerformance();
      }, 0);
    }
  }, [pathname]);

  return null;
}
