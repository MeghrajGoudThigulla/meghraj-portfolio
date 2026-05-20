type ProjectSummaryRowProps = {
  problem: string;
  stack: string;
  scale: string;
  impact: string;
};

/**
 * ProjectSummaryRow displays a highly structured 4-column snapshot of a project's
 * engineering challenges, technical architecture, deployment scale, and delivery outcome.
 */
export default function ProjectSummaryRow({
  problem,
  stack,
  scale,
  impact,
}: ProjectSummaryRowProps) {
  const summaryItems = [
    { label: "Problem", value: problem },
    { label: "Architecture", value: stack },
    { label: "Scale", value: scale },
    { label: "Outcome", value: impact },
  ];

  return (
    <div className="rounded-2xl border border-brand-border bg-gradient-to-br from-brand-surface to-brand-bg p-3 shadow-glass sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        Project Snapshot
      </p>
      <div className="mt-3 grid gap-2.5 sm:mt-4 sm:gap-3 sm:grid-cols-2">
        {summaryItems.map((item, index) => (
          <div
            key={item.label}
            className="group rounded-xl border border-brand-border/60 bg-brand-bg/50 backdrop-blur-sm p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-elev-1 hover:border-brand-blue/30 sm:p-4"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue/10 text-[10px] font-bold text-brand-blue">
                {index + 1}
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                {item.label}
              </p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-brand-charcoal sm:mt-3">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
