import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white/80 py-16 shadow-sm sm:py-20 lg:py-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Full Stack Engineer → Consulting & Finance
          </p>
          <h1 className="text-4xl font-bold leading-tight text-brand-navy lg:text-7xl">
            Bridging scalable engineering and business strategy.
          </h1>
          <p className="max-w-4xl text-lg leading-relaxed text-brand-charcoal lg:text-xl">
            I design and ship cross-platform systems that translate complex
            requirements into measurable outcomes—reducing engineering overhead,
            accelerating MVP launches, and building trustworthy data flows for
            decision-makers.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="#cases"
              className="rounded-md bg-brand-blue px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-sky-800"
            >
              View Case Studies
            </Link>
            <Link
              href="#contact"
              className="rounded-md border border-brand-charcoal/30 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-navy transition hover:border-brand-blue hover:text-brand-blue"
            >
              Schedule a Call
            </Link>
            <Link
              href="/resume"
              className="rounded-md border border-transparent px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-gold transition hover:text-amber-800"
            >
              View Résumé
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metricCards.map((metric) => (
            <div
              key={metric.label}
              className="rounded border border-brand-charcoal/10 bg-brand-surface px-4 py-5 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                {metric.label}
              </p>
              <p className="mt-3 text-3xl font-bold text-brand-gold">
                {metric.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const metricCards = [
  {
    label: "Efficiency",
    value: "30% ↓",
    detail:
      "Cut cross-platform engineering overhead by unifying mobile/web release flows.",
  },
  {
    label: "MVP Delivery",
    value: "60% built",
    detail:
      "Architected core modules for an e-commerce launch targeting 1K+ early users.",
  },
  {
    label: "Responsiveness",
    value: "25% faster",
    detail:
      "Optimized APIs, caching, and Firestore queries for smoother app experiences.",
  },
];
