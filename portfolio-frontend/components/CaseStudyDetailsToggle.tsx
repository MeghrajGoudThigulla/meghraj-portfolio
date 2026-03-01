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
    <div className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        Solution
      </p>
      <button
        type="button"
        className="inline-flex items-center rounded-lg border border-transparent px-1 text-sm font-semibold text-brand-blue transition hover:text-brand-navy hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={handleToggle}
      >
        {expanded ? "Hide architecture details" : "Show architecture details"}
      </button>
      {expanded ? (
        <ul id={panelId} className="mt-3 space-y-2 text-sm leading-relaxed text-brand-charcoal">
          {actionItems.map((item) => (
            <li key={item} className="flex gap-2 rounded-lg border border-brand-border/60 bg-brand-muted/40 px-3 py-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
