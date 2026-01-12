import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-sky-50 py-20 shadow-sm sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-sky-100/50 blur-3xl"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="flex flex-col gap-4">
            <p className="fade-up stagger-1 max-w-prose text-lg font-semibold text-brand-navy">
              I help{" "}
              <span className="text-brand-blue">
                fintech and consulting teams
              </span>{" "}
              build scalable, high-performance applications.
            </p>
            <h1 className="fade-up stagger-2 text-3xl font-bold leading-tight text-brand-navy sm:text-4xl lg:text-6xl">
              Outcome-led product engineering with measurable impact.
            </h1>
            <p className="fade-up stagger-3 max-w-prose text-lg leading-relaxed text-brand-charcoal lg:text-xl">
              I design and ship cross-platform systems that translate complex
              requirements into measurable outcomes—reducing engineering overhead,
              accelerating MVP launches, and building trustworthy data flows for
              decision-makers.
            </p>
            <div className="fade-up stagger-2 flex flex-wrap items-center gap-3">
              <Link
                href="#contact"
                className="btn btn-primary"
              >
                Schedule a Call
              </Link>
              <Link
                href="#cases"
                className="btn btn-secondary"
              >
                View Case Studies
              </Link>
              <Link
                href="/resume"
                className="btn btn-ghost"
              >
                View Résumé
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {metricCards.map((metric) => (
              <div
                key={metric.label}
                className="card card-hover fade-in border-t-4 border-t-brand-blue/60 px-4 py-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-3 text-3xl font-bold text-brand-blue">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
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
