export default function ContactAside() {
  return (
    <aside aria-label="Contact planning guide" className="card p-6 sm:p-7 lg:p-8">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue">NEXT STEP</span>
        <span className="h-px flex-1 bg-brand-border" />
      </div>

      <h3 className="mt-6 text-2xl font-semibold leading-tight text-brand-navy">
        Give me enough context to understand the problem.
      </h3>
      <p className="mt-3 text-sm leading-6 text-brand-charcoal">
        A short description is enough. The useful details are the workflow, constraints, and outcome you are trying to reach.
      </p>

      <ul className="mt-7 space-y-4 text-sm text-brand-charcoal">
        {[
          "What are you trying to build or improve?",
          "What is currently slow, manual, fragile, or expensive?",
          "What stack, timeline, or infrastructure constraints matter?",
          "What would a successful outcome look like?",
        ].map((item, index) => (
          <li key={item} className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 font-mono text-[9px] font-semibold text-brand-blue">
              {index + 1}
            </span>
            <span className="leading-6">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div className="rounded-xl border border-brand-border bg-brand-muted/50 px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Response</p>
          <p className="mt-1.5 text-sm font-semibold text-brand-navy">Within one business day</p>
        </div>
        <div className="rounded-xl border border-brand-border bg-brand-muted/50 px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Focus</p>
          <p className="mt-1.5 text-sm font-semibold text-brand-navy">Product & engineering systems</p>
        </div>
      </div>
    </aside>
  );
}
