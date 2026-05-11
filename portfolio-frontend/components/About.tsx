import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section
      className="section-shell section-band relative"
      id="about"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-36 top-10 h-72 w-72 rounded-full bg-brand-blue/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-6 h-60 w-60 rounded-full bg-brand-accent/20 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Senior AI Developer & Aspiring Tech Consultant."
          description="I specialize in architecting intelligent systems, bridging deep technical execution with high-level strategic business outcomes."
          eyebrow="Profile"
        />

        <div className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:gap-10">
          <div className="card fade-up space-y-6 px-5 py-6 lg:px-6 border border-brand-border/80 bg-brand-surface/60 backdrop-blur-md shadow-glass">
            <div className="rounded-xl border border-brand-border/80 bg-brand-muted/45 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Value Statement
              </p>
              <p className="mt-2 max-w-prose text-base leading-relaxed text-brand-charcoal lg:text-lg">
                I design and deploy AI-driven platforms across diverse sectors with measurable outcomes:
                optimizing operational efficiency, integrating intelligent pipelines, and translating
                complex technical capabilities into clear strategic ROI.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {strengths.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-brand-border bg-brand-surface px-4 py-3 shadow-sm transition hover:border-brand-blue/50"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="card fade-up space-y-4 px-5 py-6 lg:px-6 border border-brand-border/80 bg-brand-surface/60 backdrop-blur-md shadow-glass">
            <h3 className="text-xl font-semibold text-brand-navy lg:text-2xl">
              How I operate
            </h3>
            <ul className="space-y-4 text-sm leading-relaxed text-brand-charcoal lg:text-base">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-accent shrink-0" />
                <span>
                  <strong>Consultative Approach:</strong> Diagnose complex business bottlenecks, surface architectural trade-offs, and propose intelligent pilots with measurable ROI.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-accent shrink-0" />
                <span>
                  <strong>Scalable Execution:</strong> Deploy robust, automated ML pipelines and crisp API contracts to keep teams unblocked and systems resilient.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-accent shrink-0" />
                <span>
                  <strong>Strategic Communication:</strong> Convert deep technical progress into stakeholder-friendly updates and executive-ready implementation strategies.
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
    title: "AI Integration & ML",
    detail: "Designing intelligent workflows, NLP solutions, and computer vision models into robust production environments.",
  },
  {
    title: "Technical Strategy",
    detail:
      "Bridging the gap between engineering and business, translating technical ambiguity into clear, actionable roadmaps.",
  },
  {
    title: "Scalable Architecture",
    detail:
      "Delivering cloud-native infrastructures with microservices, scalable databases, and asynchronous task processing.",
  },
  {
    title: "Delivery Discipline",
    detail:
      "Translating complex constraints into shippable milestones with predictable cadences and clear ownership.",
  },
];
