"use client";

import { useState } from "react";
import { trackMetric } from "@/lib/metrics";

type CaseStudyDetailsToggleProps = {
  caseTitle: string;
  actionItems: string[];
};

const caseExpandStorageKey = "case_expand_events";
const inMemoryCaseExpandIds = new Set<string>();

const toCaseId = (caseTitle: string) =>
  caseTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const shouldTrackCaseExpand = (caseId: string) => {
  if (typeof window === "undefined") return false;
  if (inMemoryCaseExpandIds.has(caseId)) return false;

  try {
    const stored = window.sessionStorage.getItem(caseExpandStorageKey);
    const parsed = stored ? (JSON.parse(stored) as string[]) : [];
    if (parsed.includes(caseId)) return false;

    inMemoryCaseExpandIds.add(caseId);
    window.sessionStorage.setItem(caseExpandStorageKey, JSON.stringify([...parsed, caseId]));
    return true;
  } catch {
    inMemoryCaseExpandIds.add(caseId);
    return true;
  }
};

export default function CaseStudyDetailsToggle({
  caseTitle,
  actionItems,
}: CaseStudyDetailsToggleProps) {
  const [expanded, setExpanded] = useState(false);
  const caseId = toCaseId(caseTitle);
  const panelId = `case-details-${caseId}`;

  const handleToggle = () => {
    if (!expanded && shouldTrackCaseExpand(caseId)) {
      trackMetric({
        eventName: "case_expand",
        meta: {
          caseId,
          caseTitle,
          itemCount: actionItems.length,
        },
      });
    }
    setExpanded((current) => !current);
  };

  return (
    <div className="rounded-2xl border border-brand-border bg-white p-3 shadow-sm sm:p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        Execution Path
      </p>
      <button
        type="button"
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-brand-blue/20 bg-sky-50 px-3 py-2 text-sm font-semibold text-brand-blue transition hover:border-brand-blue/35 hover:bg-sky-100/60 hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={handleToggle}
      >
        <span>{expanded ? "Hide architecture details" : "Show architecture details"}</span>
        <span aria-hidden className={`text-xs transition-transform ${expanded ? "rotate-180" : ""}`}>
          v
        </span>
      </button>
      {expanded ? (
        <ul id={panelId} className="mt-3 space-y-2 text-sm leading-relaxed text-brand-charcoal sm:mt-4">
          {actionItems.map((item, index) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-brand-border/70 bg-gradient-to-r from-brand-muted/35 to-white px-2.5 py-2.5 sm:px-3 sm:py-3"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue/12 text-[10px] font-bold text-brand-blue">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
