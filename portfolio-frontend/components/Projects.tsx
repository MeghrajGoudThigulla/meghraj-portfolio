'use client';

import { useState } from 'react';
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

const PROJECT_THEMES: Record<string, {
  sysId: string;
  badge: string;
  accentGradient: string;
  glowColor: string;
  pipelineDetail: string;
  domainColor: string;
  borderGlow: string;
  categoryTag: "AI" | "FINTECH" | "MOBILE";
  sampleRoute: string;
  sampleOutput: string;
  authMethod: string;
}> = {
  TFGenAPI: {
    sysId: "SYS-OCR-01",
    badge: "NEURAL INGESTION & EMBEDDING",
    accentGradient: "from-emerald-400 via-cyan-400 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.16)",
    pipelineDetail: "PyTesseract OCR → Dense Vectors → Celery/Redis Worker Queues",
    domainColor: "#10B981",
    borderGlow: "hover:border-emerald-500/50",
    categoryTag: "AI",
    sampleRoute: "POST /v1/extract/ocr-embeddings",
    sampleOutput: "200 OK · 768-dim dense vectors · JSON",
    authMethod: "JWT Bearer + Token Bucket Rate Limit",
  },
  "IYOV AI": {
    sysId: "SYS-FIN-02",
    badge: "STATUTORY PAYROLL ENGINE",
    accentGradient: "from-indigo-400 via-purple-400 to-pink-500",
    glowColor: "rgba(99, 102, 241, 0.16)",
    pipelineDetail: "Statutory Compliance Rules → Scheduled Dedupe CTE Worker → 4 Flutter Apps",
    domainColor: "#818CF8",
    borderGlow: "hover:border-indigo-500/50",
    categoryTag: "FINTECH",
    sampleRoute: "POST /v1/payroll/compliance-batch",
    sampleOutput: "202 ACCEPTED · Dedupe CTE Worker · Batched",
    authMethod: "RBAC + India Statutory Tax Formulas",
  },
  "TFG SecureBank": {
    sysId: "SYS-BANK-03",
    badge: "CORE BANKING & LOAN ENGINE",
    accentGradient: "from-amber-400 via-yellow-400 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.16)",
    pipelineDetail: "70 REST Endpoints → Dual DB Router (Postgres + MySQL) → Tamper-Evident Loan Generator",
    domainColor: "#F59E0B",
    borderGlow: "hover:border-amber-500/50",
    categoryTag: "FINTECH",
    sampleRoute: "POST /v1/loans/matrix-validate",
    sampleOutput: "200 OK · Dual-DB Router (PG + MySQL) · Signed PDF",
    authMethod: "Multi-tenant Isolation + SHA-256 Checksums",
  },
  "Medical Advisor": {
    sysId: "SYS-MED-04",
    badge: "CLINICAL TELEMETRY & INTEGRITY",
    accentGradient: "from-teal-400 via-emerald-400 to-cyan-500",
    glowColor: "rgba(20, 184, 166, 0.16)",
    pipelineDetail: "FastAPI Microservices → Google Play Integrity → Dual-Store WebSocket Sync",
    domainColor: "#14B8A6",
    borderGlow: "hover:border-teal-500/50",
    categoryTag: "AI",
    sampleRoute: "POST /v1/clinical/telemetry-sync",
    sampleOutput: "200 OK · Google Play Integrity Verified · WebSocket",
    authMethod: "Google Play Attestation + mTLS",
  },
  DealsMart: {
    sysId: "SYS-COMM-05",
    badge: "MERCHANT CONCURRENCY GATEWAY",
    accentGradient: "from-orange-500 via-red-500 to-amber-500",
    glowColor: "rgba(234, 88, 12, 0.16)",
    pipelineDetail: "Merchant Sync Gateway → Concurrency Pool → Flutter Mobile Engine",
    domainColor: "#F97316",
    borderGlow: "hover:border-orange-500/50",
    categoryTag: "MOBILE",
    sampleRoute: "POST /v1/merchants/concurrency-stream",
    sampleOutput: "200 OK · Redis Connection Pool · Event Stream",
    authMethod: "Merchant Signature + Redis Bucket",
  },
  "IYOV AI Mobile Suite": {
    sysId: "SYS-MOB-06",
    badge: "ENTERPRISE FLUTTER RUNTIME",
    accentGradient: "from-sky-400 via-blue-500 to-indigo-500",
    glowColor: "rgba(56, 189, 248, 0.16)",
    pipelineDetail: "Unified Flutter Engine → Multi-tenant State Pipelines → App & Play Stores",
    domainColor: "#38BDF8",
    borderGlow: "hover:border-sky-500/50",
    categoryTag: "MOBILE",
    sampleRoute: "EVENT app_store_release_hotfix",
    sampleOutput: "200 OK · App Store & Play Store Production",
    authMethod: "Encrypted Device Keystore + Riverpod State",
  },
};

export default function Projects() {
  const [activeDomain, setActiveDomain] = useState<string>("ALL");
  const [copiedRoute, setCopiedRoute] = useState<string | null>(null);

  const copyCurl = (sampleRoute: string) => {
    const route = sampleRoute.replace(/^(POST|EVENT)\s+/, "");
    const cmd = `curl -X POST "https://api.threshingfloor.ai${route}" -H "Authorization: Bearer <TOKEN>"`;
    navigator.clipboard?.writeText(cmd);
    setCopiedRoute(sampleRoute);
    setTimeout(() => setCopiedRoute(null), 2000);
  };

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

        {/* Live Architecture Cluster Telemetry Header Bar */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-[11px]">
          <div className="rounded-2xl border border-cyan-500/30 bg-[#080B10]/90 p-4 shadow-lg hud-bracket">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00F0FF]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">REST & GRAPHQL</span>
            </div>
            <p className="mt-2 text-lg sm:text-xl font-black text-white font-sans">286 Endpoints</p>
            <p className="mt-0.5 text-[10px] text-cyan-400 font-semibold">Dual-DB Routing (PG + MySQL)</p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-[#080B10]/90 p-4 shadow-lg hud-bracket">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">DATA MODELS</span>
            </div>
            <p className="mt-2 text-lg sm:text-xl font-black text-white font-sans">61+ Schemas</p>
            <p className="mt-0.5 text-[10px] text-emerald-400 font-semibold">30+ Alembic & Prisma Migrations</p>
          </div>

          <div className="rounded-2xl border border-sky-500/30 bg-[#080B10]/90 p-4 shadow-lg hud-bracket">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38BDF8]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">MOBILE CLIENTS</span>
            </div>
            <p className="mt-2 text-lg sm:text-xl font-black text-white font-sans">4+ Flutter Apps</p>
            <p className="mt-0.5 text-[10px] text-sky-400 font-semibold">App Store & Google Play Live</p>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-[#080B10]/90 p-4 shadow-lg hud-bracket">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#F59E0B]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TEST INTEGRITY</span>
            </div>
            <p className="mt-2 text-lg sm:text-xl font-black text-white font-sans">Decoupled</p>
            <p className="mt-0.5 text-[10px] text-amber-400 font-semibold">Zero Invented Claims Enforced</p>
          </div>
        </div>

        {/* Interactive Domain Filter Toolbar */}
        <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs border-b border-brand-border/50 pb-4">
          <span className="text-[10px] uppercase font-bold text-slate-500 mr-2 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{"SYSTEM FILTER //"}</span>
          </span>
          {[
            { id: "ALL", label: "ALL ARCHITECTURES (6)" },
            { id: "AI", label: "NEURAL & AI (2)" },
            { id: "FINTECH", label: "STATUTORY & FINTECH (2)" },
            { id: "MOBILE", label: "MOBILE SUITES (2)" },
          ].map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveDomain(filter.id)}
              className={`rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-all ${
                activeDomain === filter.id
                  ? "border border-cyan-400 bg-cyan-950/80 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                  : "border border-cyan-500/15 bg-[#080B10]/60 text-slate-400 hover:border-cyan-400/40 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <motion.div className="mt-10 grid gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          {projectsData.map((project, index) => {
            const theme = PROJECT_THEMES[project.title] || PROJECT_THEMES["TFGenAPI"];
            const isMatch = activeDomain === "ALL" || theme.categoryTag === activeDomain;
            return (
              <TiltCard
                as="article"
                data-testid="project-article"
                key={project.title}
                variants={projectVariants}
                className={`group relative overflow-hidden rounded-3xl border border-brand-border/70 bg-brand-surface/80 shadow-glass ${theme.borderGlow} card min-w-0 hud-bracket transition-all duration-300 ${
                  isMatch ? 'opacity-100' : 'opacity-35 grayscale-[0.6] scale-[0.99]'
                }`}
              >
                <div aria-hidden className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${theme.accentGradient} opacity-80 transition-opacity group-hover:opacity-100`} />
                
                {/* Ambient glow orb inside project card */}
                <div 
                  aria-hidden 
                  className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full blur-[90px] opacity-15 transition-opacity duration-300 group-hover:opacity-30"
                  style={{ background: theme.domainColor }}
                />

                {/* Tactical HUD Header Strip */}
                <div className="flex items-center justify-between border-b border-brand-border/60 bg-black/40 px-5 sm:px-8 py-2.5 font-mono text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-cyan-400">[{theme.sysId}]</span>
                    <span className="text-slate-600">{"//"}</span>
                    <span className="text-slate-300 font-bold uppercase tracking-wider">{theme.badge}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="hidden sm:inline text-emerald-400 uppercase tracking-widest font-bold">VERIFIED PRODUCTION</span>
                  </div>
                </div>

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

                    {/* Tactical Pipeline Data Stream */}
                    <div className="mt-4 flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/30 px-3.5 py-2 font-mono text-[11px] text-cyan-300 shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shrink-0 shadow-[0_0_8px_#00F0FF]" />
                      <span className="font-black text-cyan-400 shrink-0 tracking-wider">{"FLOW //"}</span>
                      <span className="truncate text-slate-200 font-medium">
                        {theme.pipelineDetail}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
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
                      
                      {/* Live Route Schema & Blueprint Terminal Drawer */}
                      <div className="rounded-2xl border border-cyan-500/25 bg-[#06080E]/95 p-3.5 font-mono text-[11px] shadow-inner">
                        <div className="flex items-center justify-between border-b border-cyan-950/70 pb-2 mb-2 text-[10px]">
                          <span className="text-cyan-400 font-bold uppercase tracking-wider">{"ENDPOINT SPEC //"}</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => copyCurl(theme.sampleRoute)}
                              className="rounded border border-cyan-500/30 bg-cyan-950/60 px-2 py-0.5 text-[9px] font-bold text-cyan-300 hover:border-cyan-400 hover:text-white transition-colors"
                              title="Copy cURL snippet"
                            >
                              {copiedRoute === theme.sampleRoute ? "COPIED ✓" : "COPY CURL"}
                            </button>
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              LIVE
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
                          <span className="rounded bg-cyan-950 px-1.5 py-0.5 text-cyan-300 font-black text-[10px] shrink-0 border border-cyan-500/30">
                            {theme.sampleRoute.startsWith("POST") ? "POST" : "STREAM"}
                          </span>
                          <span className="text-slate-100 font-bold text-xs truncate">
                            {theme.sampleRoute.replace(/^(POST|EVENT)\s+/, "")}
                          </span>
                        </div>
                        <div className="mt-2 space-y-1 text-[10px] text-slate-400 pt-1 border-t border-cyan-950/50">
                          <div className="flex justify-between">
                            <span className="text-slate-500">PAYLOAD:</span>
                            <span className="text-slate-300 truncate max-w-[170px]">{theme.sampleOutput}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">SECURITY:</span>
                            <span className="text-cyan-400 font-semibold truncate max-w-[170px]">{theme.authMethod}</span>
                          </div>
                        </div>
                      </div>

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
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-brand-navy hover:text-brand-blue underline decoration-brand-border/70 hover:decoration-brand-blue"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <span className="font-bold text-brand-navy">{item.title}</span>
                  )}
                  <span className="text-slate-600 dark:text-slate-400"> — {item.description}</span>
                </div>
                {item.href && item.linkText && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-brand-blue hover:underline shrink-0"
                  >
                    {item.linkText}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
