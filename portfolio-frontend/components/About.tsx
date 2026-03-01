import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section
      className="section-shell section-band relative"
      id="about"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-36 top-10 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-6 h-60 w-60 rounded-full bg-amber-100/50 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Full-stack engineer focused on scalable systems."
          description="I specialize in backend architecture and cross-platform product delivery with clear reliability, security, and business outcomes."
          eyebrow="Profile"
        />

        <div className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:gap-10">
          <div className="card fade-up space-y-6 px-5 py-6 lg:px-6">
            <div className="rounded-xl border border-brand-border/80 bg-brand-muted/45 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Value Statement
              </p>
              <p className="mt-2 max-w-prose text-base leading-relaxed text-brand-charcoal lg:text-lg">
                I design and ship backend-first platforms across mobile, web, and
                APIs with measurable outcomes: faster delivery, lower failure
                rates, and clearer ownership from architecture to release.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {strengths.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-brand-border bg-white px-4 py-3 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="card fade-up space-y-4 px-5 py-6 lg:px-6">
            <h3 className="text-xl font-semibold text-brand-navy lg:text-2xl">
              How I operate
            </h3>
            <ul className="space-y-3 text-sm leading-relaxed text-brand-charcoal lg:text-base">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                <span>
                  Diagnose quickly: map constraints, surface trade-offs, and
                  propose lean pilots with measurable ROI.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                <span>
                  Ship predictably: modular architecture, automated testing, and
                  crisp API contracts to keep teams unblocked.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                <span>
                  Communicate clearly: convert technical progress into
                  stakeholder updates and executive-ready summaries.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const strengths = [
  {
    title: "Ops & ROI Focus",
    detail: "Reduced engineering overhead by 30% and improved responsiveness by 25% through better APIs and caching.",
  },
  {
    title: "Security & Trust",
    detail:
      "Play Integrity enforcement, unified auth, and compliant account deletion across mobile and admin portals.",
  },
  {
    title: "Scalability",
    detail:
      "Delivered 60% of an e-commerce MVP and structured it for 1K+ early users with modular services.",
  },
  {
    title: "Delivery Discipline",
    detail:
      "Translate ambiguity into shippable milestones with clear ownership, pragmatic scope, and stable release cadence.",
  },
];
