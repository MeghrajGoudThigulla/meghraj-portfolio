export default function ContactAside() {
  return (
    <aside
      aria-label="Contact planning guide"
      className="space-y-5 rounded-xl border border-brand-charcoal/10 bg-brand-bg px-4 py-5"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
          What helps me respond fast
        </p>
        <h3 className="mt-2 text-xl font-semibold text-brand-navy">
          Share the key inputs and I will reply with a clear next step.
        </h3>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-brand-charcoal">
          I typically respond within one business day with a short plan, scope questions, and timelines.
        </p>
      </div>
      <ul className="space-y-3 text-sm text-brand-charcoal">
        {[
          "Team size and stakeholders involved.",
          "Target metric (cost, latency, adoption, compliance).",
          "Current stack or infrastructure constraints.",
          "Timeline or launch milestone.",
        ].map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "Response time", value: "Within 1 business day" },
          { label: "Focus areas", value: "MVPs, performance, data flows" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-brand-charcoal/10 bg-white px-4 py-3"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              {item.label}
            </p>
            <p className="mt-2 text-sm font-semibold text-brand-navy">
              {item.value}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-brand-charcoal/10 bg-white px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          Typical first call output
        </p>
        <p className="mt-2 text-sm text-brand-charcoal">
          A scoped problem statement, baseline assumptions, and a delivery plan
          with risks and milestones.
        </p>
      </div>
    </aside>
  );
}
