'use client';

import Link from "next/link";
import { trackMetric } from "@/lib/metrics";
import PrintButton from "./PrintButton";

export default function ResumeStickyActions() {
  return (
    <aside
      aria-label="Resume quick actions"
      className="resume-sticky-actions fixed inset-x-4 bottom-4 z-30 rounded-2xl border border-brand-charcoal/15 bg-white/95 p-3 shadow-lg backdrop-blur md:sticky md:top-4 md:inset-x-auto"
    >
      <div className="flex flex-wrap items-center gap-2">
        <PrintButton
          label="Download PDF"
          className="btn btn-primary btn-sm"
          onPrint={() => {
            trackMetric({
              eventName: "resume_print_click",
              meta: {
                source: "resume_sticky_actions",
              },
            });
          }}
        />
        <Link href="/" className="btn btn-secondary btn-sm">
          Back to Portfolio
        </Link>
        <Link href="/#contact" className="btn btn-secondary btn-sm">
          Contact
        </Link>
      </div>
    </aside>
  );
}
