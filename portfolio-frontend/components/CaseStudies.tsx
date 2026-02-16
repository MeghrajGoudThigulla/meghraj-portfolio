import Link from "next/link";
import SectionHeading from "./SectionHeading";

export type CaseStudy = {
  title: string;
  subtitle: string;
  problem: string;
  action: string[];
  result: string;
  metrics: string[];
  stack: string;
  detailsHref?: string;
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
    metrics: [
      "1K+ user readiness",
      "Secure onboarding",
      "Reduced admin overhead",
    ],
    stack:
      "Flutter (Android/iOS/Web), Firebase Auth/Firestore/Storage, FastAPI, PostgreSQL, Play Integrity",
    detailsHref:
      "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor",
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
    metrics: ["Faster load times", "Lower bounce rates", "Stable onboarding"],
    stack: "Python (Flask), MongoDB, JavaScript, Bootstrap, HTML/CSS",
    detailsHref: "https://groconnect.in",
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
    metrics: [
      "500+ students reached",
      "Multi-cohort programs",
      "Stakeholder alignment",
    ],
    stack: "Leadership, program design, stakeholder management, ops execution",
  },
];

export default function CaseStudies() {
  return (
    <section
      className="relative overflow-hidden border-y border-brand-charcoal/10 bg-brand-bg py-20 sm:py-24 lg:py-28"
      id="cases"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-sky-100/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-8 h-72 w-72 rounded-full bg-white/80 blur-3xl"
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Engineering that ships outcomes, not just code."
          description="Examples of turning ambiguity into measurable efficiency, resilience, and adoption."
        />

        <div className="grid gap-6 lg:gap-8">
          {caseStudies.map((study, index) => {
            const detailsHref = study.detailsHref ?? "#contact";
            const isExternal = detailsHref.startsWith("http");

            return (
              <article
                key={study.title}
                className="card card-hover fade-up px-5 py-6"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-semibold text-brand-navy lg:text-3xl">
                    {study.title}
                  </h3>
                  <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">
                    {study.subtitle}
                  </p>
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr,0.9fr] lg:gap-6">
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Problem
                      </p>
                      <p className="mt-2 max-w-prose text-base leading-relaxed text-brand-charcoal">
                        {study.problem}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Solution
                      </p>
                      <ul className="mt-2 space-y-2 text-base leading-relaxed text-brand-charcoal">
                        {study.action.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-lg border border-brand-charcoal/10 border-l-4 border-l-brand-blue/60 bg-white/90 px-4 py-5 shadow-sm">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Impact
                      </p>
                      <p className="mt-2 text-lg font-semibold text-brand-blue">
                        {study.result}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {study.metrics.map((metric) => (
                          <span key={metric} className="badge-accent">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Tech Stack
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                        {study.stack}
                      </p>
                    </div>
                    <Link
                      href={detailsHref}
                      className="inline-flex items-center text-sm font-semibold text-brand-blue transition hover:text-brand-navy hover:underline underline-offset-4"
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
