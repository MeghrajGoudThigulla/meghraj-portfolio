'use client';

import { motion, Variants } from 'framer-motion';
import ApiDiagramCard from './ApiDiagramCard';
import ProjectDetailsToggle from './ProjectDetailsToggle';
import SectionHeading from './SectionHeading';
import TiltCard from './TiltCard';
import {
  ADDITIONAL_PROJECTS,
  PROJECTS_SECTION_HEADER,
  projectsData,
  type Project,
  type ProjectCategory,
  type ProjectLink,
} from '@/data/projects';

export type { Project, ProjectCategory, ProjectLink };
export { projectsData };

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const projectVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.55 } }
};

export default function Projects() {
  return (
    <section className="section-shell relative overflow-hidden border-b border-brand-border/40 bg-brand-bg" id="projects" aria-labelledby="projects-heading">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand-blue/5 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-8 h-80 w-80 rounded-full bg-brand-accent/5 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          titleId="projects-heading"
          title={PROJECTS_SECTION_HEADER.title}
          description={PROJECTS_SECTION_HEADER.description}
          eyebrow={PROJECTS_SECTION_HEADER.eyebrow}
        />

        <motion.div className="mt-10 grid gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          {projectsData.map((project, index) => {
            return (
              <TiltCard as="article" data-testid="project-article" key={project.title} variants={projectVariants} className="group relative overflow-hidden rounded-3xl border border-brand-border/70 bg-brand-surface/80 shadow-glass border-glow-hover card min-w-0">
                <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-sky-400 to-brand-accent opacity-70 transition-opacity group-hover:opacity-100" />
                
                {/* Ambient glow orb inside project card */}
                <div 
                  aria-hidden 
                  className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full blur-[80px] opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                  style={{
                    background: project.apiDiagram.theme === "banking" 
                      ? "var(--brand-blue)" 
                      : project.apiDiagram.theme === "assessment"
                      ? "var(--brand-accent)"
                      : "var(--brand-blue)"
                  }}
                />

                <div className="grid lg:grid-cols-[1fr,0.72fr] relative z-10 min-w-0">
                  <div className="p-6 sm:p-8 lg:p-10 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blue">0{index + 1} / Case Study</p>
                          <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]" aria-hidden="true">•</span>
                          <span className="rounded-md border border-brand-blue/30 bg-brand-blue/8 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-brand-blue">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="mt-2 text-2xl font-bold leading-tight text-brand-navy sm:text-3xl lg:text-4xl">{project.title}</h3>
                        <p className="mt-2 text-sm font-medium text-brand-charcoal sm:text-base">{project.subtitle}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${
                          project.status === "Published"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : project.status === "Internal / Pre-release"
                            ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                            : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-500"
                        }`}>{project.status}</span>
                        {project.status !== "Published" && (
                          <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400">Proprietary / Private</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.metrics.map((metric, idx) => (
                        <span key={metric} className={`rounded-lg px-2.5 py-1.5 font-mono text-[10px] font-medium transition-all duration-300 ${
                          idx === 0
                            ? "border border-brand-blue/35 bg-gradient-to-r from-brand-blue/8 to-cyan-500/8 text-brand-blue font-bold shadow-[0_2px_10px_rgba(2,132,199,0.04)] flex items-center gap-1.5"
                            : "border border-brand-border bg-brand-muted/30 text-brand-charcoal hover:border-brand-blue/20 hover:bg-brand-surface hover:text-brand-navy"
                        } sm:text-[11px]`}>
                          {idx === 0 && (
                            <span className="relative flex h-1.5 w-1.5 shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-blue"></span>
                            </span>
                          )}
                          {metric}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 space-y-6">
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-blue">01 / Challenge</p>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-charcoal sm:text-base">{project.problem}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-blue">02 / Outcome</p>
                        <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-brand-navy sm:text-base">{project.result}</p>
                      </div>
                    </div>

                    {project.action && project.action.length > 0 && (
                      <div className="mt-6">
                        <ProjectDetailsToggle
                          projectTitle={project.title}
                          actionItems={project.action}
                        />
                      </div>
                    )}

                    {project.links && project.links.length > 0 && (
                      <div className="mt-8 flex flex-wrap gap-2">
                        {project.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-brand-blue/30 bg-brand-blue/5 px-3 py-1.5 text-[11px] font-semibold text-brand-blue transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-blue hover:text-white hover:shadow-sm"
                          >
                            <span>{link.label}</span>
                            <span className="text-[10px]">↗</span>
                          </a>
                        ))}
                      </div>
                    )}

                  </div>

                  <div className="border-t border-brand-border bg-brand-muted/30 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8 min-w-0">
                    <div className="flex h-full flex-col gap-5 min-w-0">
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-blue">03 / Architecture</p>
                        <p className="mt-2 text-sm leading-6 text-brand-charcoal">A high-level view of the system surface and technology choices. Proprietary implementation details are intentionally omitted.</p>
                      </div>
                      <div className="rounded-2xl border border-brand-border bg-brand-surface p-3 shadow-sm min-w-0"><ApiDiagramCard idPrefix={`project-${index}`} diagram={project.apiDiagram} /></div>
                      <div className="mt-auto rounded-2xl border border-brand-border bg-brand-surface p-4">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-blue">04 / Stack</p>
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {project.stack.split(", ").map((tech) => (
                            <span key={tech} className="rounded-md border border-brand-border/80 bg-brand-bg/50 px-2.5 py-1.5 font-mono text-[10px] font-medium text-brand-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:rotate-1 hover:border-brand-blue/40 hover:bg-brand-surface hover:text-brand-blue hover:shadow-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </motion.div>

        {/* Compact Additional Projects Row */}
        <div className="mt-8 rounded-2xl border border-brand-border/70 bg-brand-surface/70 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-brand-border/50 pb-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-brand-blue">
              Additional Systems & Migrations
            </h3>
            <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400">Production / Support</span>
          </div>
          <ul className="mt-3 divide-y divide-brand-border/40 text-sm leading-relaxed text-brand-charcoal">
            {ADDITIONAL_PROJECTS.map((item) => (
              <li key={item.title} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                <div>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-brand-navy hover:text-brand-blue underline decoration-brand-border/70 hover:decoration-brand-blue"
                  >
                    {item.title}
                  </a>
                  <span className="text-slate-600 dark:text-slate-400"> — {item.description}</span>
                </div>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-blue hover:underline shrink-0"
                >
                  {item.linkText}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
