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
    { label: "Stack", value: stack },
    { label: "Scale", value: scale },
    { label: "Impact", value: impact },
  ];

  return (
    <div className="rounded-xl border border-brand-charcoal/10 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        At a glance
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {summaryItems.map((item) => (
          <div key={item.label} className="rounded-lg border border-brand-charcoal/10 bg-brand-bg p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              {item.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
