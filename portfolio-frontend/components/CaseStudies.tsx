import Link from "next/link";
import SectionHeading from "./SectionHeading";

export type CaseStudy = {
  title: string;
  subtitle: string;
  problem: string;
  action: string[];
  result: string;
  stack: string;
  link?: string;
};

const caseStudies: CaseStudy[] = [
  {
    title: "Healthcare Operations Optimization",
    subtitle: "Medical Advisor | Mobile, Web, Admin",
    problem:
      "Manual scheduling and unverified service requests created compliance risk and operational drag.",
    action: [
      "Implemented Play Integrity guardrails and secure nonce generation to block unauthorized requests.",
      "Unified Firebase ID token auth for users and admins; dual Firestore writes for instant UI sync.",
      "Built admin search/pagination plus compliant account deletion with audit logs.",
    ],
    result:
      "Prepared for a 1K+ user launch with secure onboarding and reduced admin overhead.",
    stack:
      "Flutter (Android/iOS/Web), Firebase Auth/Firestore/Storage, FastAPI, PostgreSQL, Play Integrity",
    link: "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor",
  },
  {
    title: "Network Performance & Acquisition",
    subtitle: "GroConnect | Professional Networking Platform",
    problem: "High bounce rates and slow page loads hurt user acquisition.",
    action: [
      "Refined data models and optimized MongoDB queries for faster profile and search flows.",
      "Refactored layout logic, removed redundant network calls, and tuned caching for smoother navigation.",
      "Built responsive UI modules to keep engagement consistent across mobile and desktop.",
    ],
    result:
      "Improved load times and retention while keeping onboarding and peer connection workflows stable.",
    stack: "Python (Flask), MongoDB, JavaScript, Bootstrap, HTML/CSS",
    link: "https://groconnect.in",
  },
  {
    title: "Community Impact Initiative",
    subtitle: "Sama Sangathan | Co-Founder & Strategic Lead",
    problem:
      "Needed a scalable model for women’s safety and empowerment outreach across campus.",
    action: [
      "Led cross-functional teams to design programming, outreach, and partnerships with college leadership.",
      "Coordinated logistics and content for workshops and awareness campaigns across multiple cohorts.",
      "Established feedback loops to keep programming relevant and measurable.",
    ],
    result:
      "Impact delivered to 500+ students, demonstrating leadership and stakeholder alignment.",
    stack: "Leadership, program design, stakeholder management, ops execution",
  },
];

export default function CaseStudies() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" id="cases">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Case Studies"
          title="Engineering that ships outcomes, not just code."
          description="Examples of turning ambiguity into measurable efficiency, resilience, and adoption."
        />

        <div className="grid gap-6 lg:gap-8">
          {caseStudies.map((study) => (
            <article
              key={study.title}
              className="rounded border border-brand-charcoal/10 bg-brand-surface px-5 py-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-semibold text-brand-navy lg:text-3xl">
                  {study.title}
                </h3>
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">
                  {study.subtitle}
                </p>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr,1fr] lg:gap-6">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500">
                    Situation → Action
                  </p>
                  <p className="text-base leading-relaxed text-brand-charcoal">
                    <span className="font-semibold text-brand-navy">Problem:</span>{" "}
                    {study.problem}
                  </p>
                  <ul className="space-y-2 text-base leading-relaxed text-brand-charcoal">
                    {study.action.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 rounded border border-dashed border-brand-charcoal/15 bg-brand-bg px-4 py-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500">
                    Result & Stack
                  </p>
                  <p className="text-lg font-semibold text-brand-gold">
                    {study.result}
                  </p>
                  <p className="text-sm leading-relaxed text-brand-charcoal">
                    <span className="font-semibold text-brand-navy">Stack:</span>{" "}
                    {study.stack}
                  </p>
                  {study.link ? (
                    <Link
                      href={study.link}
                      className="inline-flex items-center text-sm font-semibold text-brand-blue hover:text-brand-navy"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View live
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
