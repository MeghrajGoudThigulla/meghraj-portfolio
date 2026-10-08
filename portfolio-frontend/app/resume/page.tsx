import type { Metadata } from "next";
import Link from "next/link";
import ResumeStickyActions from "@/components/ResumeStickyActions";
import ResumeHighlightsBar from "@/components/ResumeHighlightsBar";
import { resumeData } from "@/data/resume";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Printable résumé for Meghraj Goud highlighting full-stack delivery, AI/ML, and backend infrastructure.",
  alternates: {
    canonical: "/resume",
  },
};

export default function ResumePage() {
  return (
    <div className="resume-page bg-brand-bg text-brand-charcoal">
      <div className="resume-shell mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <ResumeStickyActions />

        <header className="resume-header relative flex flex-col items-center gap-4 rounded-2xl border border-brand-border bg-brand-surface px-6 py-6 shadow-glass sm:flex-row sm:items-center sm:justify-between overflow-hidden">
          {/* Vertical left accent bar */}
          <div className="absolute left-0 inset-y-0 w-1.5 bg-gradient-to-b from-brand-blue via-cyan-400 to-brand-accent" />

          <div className="text-center sm:text-left pl-2 sm:pl-3">
            <h1 className="text-3xl font-bold text-brand-navy lg:text-4xl tracking-tight">
              {resumeData.name}
            </h1>
            <div className="mt-3.5 flex flex-wrap justify-center gap-2 sm:justify-start">
              {resumeData.contactLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-brand-border bg-brand-bg/50 px-2.5 py-1.5 text-xs font-semibold text-brand-charcoal transition-all hover:border-brand-blue/30 hover:bg-brand-surface hover:text-brand-blue hover:shadow-sm"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <ResumeHighlightsBar />

        <main id="main-content" tabIndex={-1} className="resume-content grid gap-6">
          <Section title="EXPERIENCE">
            <div className="space-y-3 group/role">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-brand-navy transition-colors group-hover/role:text-brand-blue">
                    {resumeData.experience.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {resumeData.experience.company}
                    {" \u2022 "}
                    <a
                      href={resumeData.experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:underline"
                    >
                      {resumeData.experience.companyDisplay}
                    </a>
                  </p>
                </div>
                <p className="text-sm font-bold text-brand-blue sm:text-right shrink-0">
                  {resumeData.experience.period}
                </p>
              </div>
              <ul className="space-y-2 text-sm leading-relaxed text-brand-charcoal lg:text-base">
                {resumeData.experience.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 items-start group/bullet">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue/50 transition-all duration-300 group-hover/bullet:scale-125 group-hover/bullet:bg-brand-blue" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section title="SKILLS">
            <div className="grid gap-3 sm:grid-cols-2">
              {resumeData.skills.map((item) => (
                <div
                  key={item.category}
                  className="rounded-xl border border-brand-border bg-brand-bg/50 px-4 py-3.5 transition-all duration-300 hover:border-brand-blue/25 hover:bg-brand-surface hover:shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400">
                    {item.category}
                  </p>
                  <p className="mt-1 text-sm text-brand-charcoal lg:text-base font-medium">
                    {item.skills}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="PROJECTS">
            <div className="space-y-6">
              {resumeData.projects.map((project) => (
                <div
                  key={project.title}
                  className="space-y-3 group/item border-b border-brand-border/40 pb-5 last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-brand-navy transition-colors group-hover/item:text-brand-blue">
                        {project.title}
                      </h3>
                      <p className="text-sm italic text-brand-charcoal lg:text-base">
                        {project.subtitle}
                      </p>
                    </div>
                    {project.url && project.urlLabel ? (
                      <a
                        href={project.url}
                        className="text-sm font-bold text-brand-blue hover:text-brand-navy transition-colors shrink-0"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.urlLabel} &rarr;
                      </a>
                    ) : null}
                  </div>
                  <div className="inline-flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-brand-bg px-2.5 py-1.5 rounded-lg border border-brand-border/60">
                    Tech: <span className="font-normal text-brand-charcoal">{project.tech}</span>
                  </div>
                  <ul className="space-y-2 text-sm leading-relaxed text-brand-charcoal lg:text-base mt-2">
                    {project.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 items-start group/bullet">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue/50 transition-all duration-300 group-hover/bullet:scale-125 group-hover/bullet:bg-brand-blue" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="rounded-xl border border-brand-border/60 bg-brand-bg/40 p-4 sm:p-5 space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-navy">
                  Additional Projects
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed text-brand-charcoal">
                  {resumeData.additionalProjects.map((item) => (
                    <li key={item.title} className="flex gap-2.5 items-start">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue/50" />
                      <div>
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-brand-navy hover:text-brand-blue underline decoration-brand-border hover:decoration-brand-blue"
                          >
                            {item.title}
                          </a>
                        ) : (
                          <span className="font-bold text-brand-navy">{item.title}</span>
                        )}
                        <span className="text-slate-600 dark:text-slate-400"> ({item.tech}; {item.details})</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section title="EDUCATION">
            <div className="space-y-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-bold text-brand-navy">
                  {resumeData.education.degree}
                </h3>
                <p className="text-sm font-bold text-brand-blue sm:text-right shrink-0">
                  {resumeData.education.period}
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                {resumeData.education.institution}
              </p>
            </div>
          </Section>

          <Section title="CERTIFICATIONS">
            <ul className="space-y-3 text-sm leading-relaxed text-brand-charcoal lg:text-base">
              {resumeData.certifications.map((cert) => (
                <li key={cert.issuer} className="flex gap-3 items-start group/cert">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue/50 transition-all duration-300 group-hover/cert:scale-125 group-hover/cert:bg-brand-blue" />
                  <div>
                    <span className="font-bold text-brand-navy">{cert.issuer}: </span>
                    <span>{cert.items.join("; ")}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        </main>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume-section card p-5 sm:p-6 lg:p-8 hover:border-brand-blue/30 transition-all duration-300 shadow-sm group/section">
      <h2 className="text-xl font-bold uppercase tracking-[0.14em] text-brand-navy border-b border-brand-border/60 pb-3 transition-colors group-hover/section:text-brand-blue group-hover/section:border-brand-blue/30">
        {title}
      </h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}
