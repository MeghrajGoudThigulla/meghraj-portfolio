import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section className="py-20 sm:py-24 lg:py-28" id="about">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Consulting Pivot"
          title="Engineering rigor, finance-ready storytelling."
          description="I translate technical depth into business cases: operational efficiency, security, and speed to market."
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-4 rounded border border-brand-charcoal/10 bg-brand-surface px-5 py-6 shadow-sm">
            <p className="max-w-prose text-base leading-relaxed text-brand-charcoal lg:text-lg">
              With a B.Tech in IT and full-stack delivery across mobile, web, and
              backend, I thrive in environments that demand clarity, analytics,
              and stakeholder alignment. My recent work spans healthcare ops,
              networking platforms, and compliance-minded data flows—core themes
              for finance and consulting teams.
            </p>
            <p className="max-w-prose text-sm leading-relaxed text-slate-600 lg:text-base">
              I like working with teams that value tight feedback loops, shared
              dashboards, and a clear path from prototype to production.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {strengths.map((item) => (
                <div
                  key={item.title}
                  className="rounded border border-brand-charcoal/10 bg-brand-bg px-4 py-3"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded border border-brand-charcoal/10 bg-brand-surface px-5 py-6 shadow-sm">
            <h3 className="text-xl font-semibold text-brand-navy lg:text-2xl">
              How I operate
            </h3>
            <ul className="space-y-3 text-sm leading-relaxed text-brand-charcoal lg:text-base">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                <span>
                  Diagnose quickly: map constraints, surface trade-offs, and
                  propose lean pilots with measurable ROI.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                <span>
                  Ship predictably: modular architecture, automated testing, and
                  crisp API contracts to keep teams unblocked.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
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
    title: "Leadership",
    detail:
      "Co-founded student initiatives impacting 500+ people; coordinated cross-team execution for large events.",
  },
];
