"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { trackMetric } from "@/lib/metrics";

type ProjectDetailsToggleProps = {
  projectTitle: string;
  actionItems: string[];
};

const projectExpandStorageKey = "project_expand_events";
const inMemoryProjectExpandIds = new Set<string>();

const toProjectId = (projectTitle: string) =>
  projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const shouldTrackProjectExpand = (projectId: string) => {
  if (typeof window === "undefined") return false;
  if (inMemoryProjectExpandIds.has(projectId)) return false;

  try {
    const stored = window.sessionStorage.getItem(projectExpandStorageKey);
    const parsed = stored ? (JSON.parse(stored) as string[]) : [];
    if (parsed.includes(projectId)) return false;

    inMemoryProjectExpandIds.add(projectId);
    window.sessionStorage.setItem(projectExpandStorageKey, JSON.stringify([...parsed, projectId]));
    return true;
  } catch {
    inMemoryProjectExpandIds.add(projectId);
    return true;
  }
};

/**
 * ProjectDetailsToggle provides an interactive, accessible button to collapse/expand
 * the detailed implementation path and engineering milestones for each portfolio project.
 */
export default function ProjectDetailsToggle({
  projectTitle,
  actionItems,
}: ProjectDetailsToggleProps) {
  const [expanded, setExpanded] = useState(false);
  const projectId = toProjectId(projectTitle);
  const panelId = `project-details-${projectId}`;
  const shouldReduceMotion = useReducedMotion();

  const handleToggle = () => {
    if (!expanded && shouldTrackProjectExpand(projectId)) {
      trackMetric({
        eventName: "project_expand",
        meta: {
          projectId,
          projectTitle,
          itemCount: actionItems.length,
        },
      });
    }
    setExpanded((current) => !current);
  };

  const content = (
    <ul
      id={panelId}
      className="mt-3 space-y-2 text-sm leading-relaxed text-brand-charcoal sm:mt-4"
    >
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
  );

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-surface p-3 shadow-sm sm:p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        Execution Path
      </p>
      <button
        type="button"
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-brand-blue/20 bg-brand-surface px-3 py-2 text-sm font-semibold text-brand-blue transition hover:border-brand-blue/35 hover:bg-sky-100/60 hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={handleToggle}
      >
        <span>{expanded ? "Hide architecture details" : "Show architecture details"}</span>
        <motion.span
          aria-hidden
          animate={shouldReduceMotion ? {} : { rotate: expanded ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-[9px] font-bold leading-none block"
        >
          ▼
        </motion.span>
      </button>

      {shouldReduceMotion ? (
        expanded && content
      ) : (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
