export default function ContactAside() {
  return (
    <aside aria-label="Contact planning guide" className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-[#080B10]/95 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl hud-bracket">
      {/* Top ambient color flare */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-[60px]" />

      <div className="flex items-center gap-3 border-b border-cyan-950/70 pb-4 font-mono text-[10px]">
        <span className="font-bold uppercase tracking-[0.16em] text-cyan-400">DIRECT INTAKE BRIEF</span>
        <span className="h-px flex-1 bg-cyan-950/80" />
        <span className="text-slate-500 font-semibold">[SLA: &lt; 24H]</span>
      </div>

      <h3 className="mt-6 text-xl sm:text-2xl font-extrabold leading-tight text-white font-sans tracking-tight">
        Give me enough context to understand the problem.
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">
        A short description is enough. The useful details are the workflow, constraints, and outcome you are trying to reach.
      </p>

      <ul className="mt-6 space-y-3.5 text-sm text-slate-200">
        {[
          "What are you trying to build or improve?",
          "What is currently slow, manual, fragile, or expensive?",
          "What stack, timeline, or infrastructure constraints matter?",
          "What would a successful outcome look like?",
        ].map((item, index) => (
          <li key={item} className="flex items-start gap-3 rounded-xl border border-transparent bg-cyan-950/15 p-2.5 transition-colors hover:border-cyan-500/30 hover:bg-cyan-950/30">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-cyan-500/40 bg-cyan-950/50 font-mono text-[10px] font-bold text-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.2)]">
              0{index + 1}
            </span>
            <span className="leading-relaxed text-slate-300 text-xs sm:text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 font-mono">
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-400">Response SLA</p>
          <p className="mt-1 text-sm font-bold text-white">Within one business day</p>
        </div>
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-400">Core Focus</p>
          <p className="mt-1 text-sm font-bold text-white">Production architectures</p>
        </div>
      </div>
    </aside>
  );
}
