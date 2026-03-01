type CaseStudySummaryRowProps = {
  problem: string;
  stack: string;
  scale: string;
  impact: string;
};

export default function CaseStudySummaryRow({
  problem,
  stack,
  scale,
  impact,
}: CaseStudySummaryRowProps) {
  const summaryItems = [
    { label: "Problem", value: problem },
    { label: "Architecture", value: stack },
    { label: "Scale", value: scale },
    { label: "Outcome", value: impact },
  ];

  return (
    <div className="rounded-2xl border border-brand-border bg-gradient-to-b from-white to-sky-50/40 p-3 shadow-sm sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        Case Snapshot
      </p>
      <div className="mt-3 grid gap-2.5 sm:mt-4 sm:gap-3 sm:grid-cols-2">
        {summaryItems.map((item, index) => (
          <div
            key={item.label}
            className="group rounded-xl border border-brand-border/80 bg-white/95 p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-3"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue/10 text-[10px] font-bold text-brand-blue">
                {index + 1}
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                {item.label}
              </p>
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-brand-charcoal sm:mt-2 sm:text-sm">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
