'use client';

import { motion, Variants } from 'framer-motion';
import ApiDiagramCard, { type ApiDiagramModel } from './ApiDiagramCard';
import ProjectDetailsToggle from './ProjectDetailsToggle';
import SectionHeading from './SectionHeading';
import TiltCard from './TiltCard';

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectCategory =
  | "Verification & Platform"
  | "AI & HR"
  | "FinTech"
  | "Healthcare"
  | "Commerce";

export type Project = {
  title: string;
  category: ProjectCategory;
  subtitle: string;
  status: "Production / Internal" | "Internal / Pre-release" | "Published";
  problem: string;
  action: string[];
  result: string;
  metrics: string[];
  stack: string;
  apiDiagram: ApiDiagramModel;
  links?: ProjectLink[];
};

const projectsData: Project[] = [
  {
    title: "TFGenAPI",
    category: "Verification & Platform",
    subtitle: "Verification & Custom API Platform",
    status: "Production / Internal",
    problem: "Verification products need dependable API boundaries, provider integrations, asynchronous workflows, security controls, and enough flexibility to evolve with business requirements.",
    action: [
      "Built the verification API platform from scratch, owning database design and cross-layer integration components.",
      "Engineered an AI inference pipeline utilizing PyTesseract for OCR and Sentence Transformers to compute dense vector embeddings.",
      "Configured a MongoDB (Motor) data layer to support high-throughput, unstructured document ingestion and ML feature persistence.",
      "Integrated Celery/Redis task queues for asynchronous verification flows and webhook notifications."
    ],
    result: "A reusable backend foundation for verification and custom API workflows, built to support evolving product requirements without turning every change into a new system.",
    metrics: ["Built from Scratch", "Backend Ownership", "R&D + Debugging"],
    stack: "Python, FastAPI, PostgreSQL, Redis, REST APIs, Next.js, TypeScript",
    apiDiagram: { theme: "banking", clientLabel: "Enterprise Dashboard & API Consumers", gatewayLabel: "FastAPI Route Handlers", routeGroups: ["identity verification", "user consent", "event webhooks", "billing & audit"], dataLayerLabel: "PostgreSQL RLS + Redis Queue", controlLabel: "Organization RBAC & Hash API Keys" },
    links: [{ label: "Live API Platform", href: "https://tfgenapi.ai/" }]
  },
  {
    title: "IYOV AI",
    category: "AI & HR",
    subtitle: "AI-Powered Workforce Management Ecosystem",
    status: "Internal / Pre-release",
    problem: "HR and business operations combine complex employee pipelines, verification, payroll, compliance, and multi-surface applications where correctness and real-time synchronization matter at scale.",
    action: [
      "Built the India tax and compliance payroll module from scratch, automating complex statutory rules into payroll formulas.",
      "Automated payroll batches, document processing, and bulk worker notifications with Redis-backed job queues.",
      "Designed PostgreSQL and Supabase data layers with Row-Level Security, Redis rate limiting, and Celery webhook workers.",
      "Integrated candidate evaluation pipelines and third-party provider APIs into production FastAPI services."
    ],
    result: "An AI-powered workforce management ecosystem with payroll, LMS, portal, and employee workflows that sync across web and mobile platforms.",
    metrics: ["Workforce Ecosystem", "Payroll Ownership", "Asynchronous Queues"],
    stack: "Python, FastAPI, Next.js, TypeScript, PostgreSQL, Redis, Celery",
    apiDiagram: { theme: "assessment", clientLabel: "Recruiter Web & Admin Dashboard", gatewayLabel: "FastAPI REST Service", routeGroups: ["candidate screening", "ats pipeline", "interview workflows", "background check"], dataLayerLabel: "PostgreSQL + Redis Queue", controlLabel: "OAuth2 & Token Sync" },
    links: [
      { label: "Web Portal", href: "https://iyov.ai/" },
      { label: "CRM Portal", href: "https://crm.iyov.ai/crm" },
    ]
  },
  {
    title: "TFG SecureBank",
    category: "FinTech",
    subtitle: "Digital Fintech Application",
    status: "Production / Internal",
    problem: "Financial workflows require secure applicant journeys, backend validation, document handling, tenant-aware access, and reliable communication across web and mobile surfaces.",
    action: [
      "Architected a multi-tenant FastAPI backend with 70 REST endpoints, routing between PostgreSQL/Supabase and legacy MySQL.",
      "Created a rules engine with openpyxl and xlcalculator that executes credit validation matrices directly from spreadsheet models.",
      "Generated tamper-proof loan agreement PDFs with WeasyPrint and Jinja2 templates.",
      "Managed system migrations and resolved production infrastructure failures directly on live instances."
    ],
    result: "A multi-surface financial platform connecting applicant workflows, backend services, web interfaces, and mobile experiences.",
    metrics: ["FinTech Domain", "70 REST Endpoints", "Backend Engineering"],
    stack: "Python, FastAPI, SQLAlchemy, Alembic, PostgreSQL, Redis, WeasyPrint",
    apiDiagram: { theme: "banking", clientLabel: "React Web + Mobile Client", gatewayLabel: "FastAPI Application API", routeGroups: ["auth", "products", "applications", "file_uploads"], dataLayerLabel: "PostgreSQL on Supabase", controlLabel: "Multitenancy & Session Security" },
    links: [{ label: "Live Platform", href: "https://tfgsecurebank.com/" }]
  },
  {
    title: "Medical Advisor",
    category: "Healthcare",
    subtitle: "Mission-Critical Healthcare API",
    status: "Published",
    problem: "Healthcare coordination requires dependable mobile workflows, protected APIs, real-time information, and resilient handling of operational data.",
    action: [
      "Architected a FastAPI microservice secured with strict JWT authentication and Google Play Integrity nonces.",
      "Designed an asynchronous dual-write pipeline syncing PostgreSQL transaction state to Firestore for real-time WebSockets.",
      "Trained and onboarded 8 engineers as technical lead for knowledge transfer.",
      "Debugged system integrations, JWT session handlers, and device sync APIs."
    ],
    result: "A production healthcare platform that also became an internal technical onboarding reference for new team members.",
    metrics: ["FastAPI Microservice", "Dual-Write Sync", "8 KT Sessions"],
    stack: "Python, FastAPI, PostgreSQL, Redis, Firebase/GCP, Docker",
    apiDiagram: { theme: "healthcare", clientLabel: "Flutter Mobile Clients + Admin Web", gatewayLabel: "FastAPI Sync Gateway", routeGroups: ["admin sync", "realtime dual-write", "ai inference", "data pipelines"], dataLayerLabel: "PostgreSQL + Firestore + Redis", controlLabel: "Firebase Auth & Inference Queue" },
    links: [{ label: "Google Play Store", href: "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor&pcampaignid=web_share" }]
  },
  {
    title: "DealsMart",
    category: "Commerce",
    subtitle: "Enterprise Commerce Platform",
    status: "Internal / Pre-release",
    problem: "Enterprise commerce requiring strict transactional integrity across cart mutations and asynchronous payment reconciliation.",
    action: [
      "Engineered monolithic FastAPI backend interfacing with PostgreSQL to enforce strict ACID compliance across cart mutations.",
      "Implemented event-driven architecture using distributed RQ workers and Redis for idempotent payment reconciliation.",
      "Delivered cross-platform presentation layer using Flutter with object storage integration."
    ],
    result: "ACID-compliant cart processing and resilient, idempotent payment reconciliation workflows.",
    metrics: ["ACID Cart Mutations", "Payment Reconciliation", "Pre-release"],
    stack: "Flutter, FastAPI, PostgreSQL, Redis, RQ workers",
    apiDiagram: { theme: "commerce", clientLabel: "Flutter Client App", gatewayLabel: "FastAPI REST Service", routeGroups: ["cart mutations", "checkout flow", "payment webhook", "order history"], dataLayerLabel: "PostgreSQL + Redis Queue", controlLabel: "ACID Transactions & RQ Workers" },
  },
  {
    title: "IYOV AI Mobile",
    category: "AI & HR",
    subtitle: "Multi-App Mobile Suite (Android & iOS)",
    status: "Published",
    problem: "Multi-app workforce operations across portals, HRMS, LMS, and care management require unified release cycles and synchronized mobile build pipelines.",
    action: [
      "Owned App Store and Play Store releases and deployment pipelines for 4+ Flutter apps (Employee Portal, HRMS, LMS, Care Navigator).",
      "Unified mobile build configurations and automated pipelines, shortening turnaround for critical hotfixes.",
      "Maintained cross-platform presentation layers with FastAPI backends and real-time state synchronization."
    ],
    result: "Published and maintained a suite of 4+ companion Flutter applications across Apple App Store and Google Play.",
    metrics: ["4+ Flutter Apps", "Store Ownership", "Automated Pipelines"],
    stack: "Flutter, Dart, Riverpod, GoRouter, Fastlane, GitHub Actions",
    apiDiagram: { theme: "assessment", clientLabel: "iOS & Android Flutter Apps", gatewayLabel: "FastAPI Gateway", routeGroups: ["employee portal", "hrms mobile", "lms player", "care navigator"], dataLayerLabel: "Local State (Riverpod) + Remote Sync", controlLabel: "Play Integrity & Store Build Pipelines" },
    links: [
      { label: "Portal App (Play Store)", href: "https://play.google.com/store/apps/details?id=ai.iyov.jobs&pcampaignid=web_share" },
      { label: "HRMS App (Play Store)", href: "https://play.google.com/store/apps/details?id=ai.iyov.hrms&pcampaignid=web_share" },
      { label: "HRMS App (App Store)", href: "https://apps.apple.com/in/app/iyov-hrms/id6798589436" },
      { label: "Employee App (Play Store)", href: "https://play.google.com/store/apps/details?id=ai.iyov.employee&pcampaignid=web_share" },
      { label: "LMS App (App Store)", href: "https://apps.apple.com/in/app/iyov-lms/id6800318336" },
    ]
  }
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const projectVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.55 } }
};

export default function Projects() {
  return (
    <section className="section-shell relative overflow-hidden border-b border-brand-border/40 bg-brand-bg" id="projects">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand-blue/5 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-8 h-80 w-80 rounded-full bg-brand-accent/5 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Selected Engineering Work"
          description="Production and internal systems I've worked across, ordered by the depth of ownership and technical responsibility they demonstrate. Proprietary projects are described at a high level without exposing private source code."
          eyebrow="ENGINEERING WORK"
        />

        <motion.div className="mt-10 grid gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          {projectsData.map((project, index) => {
            return (
              <TiltCard as="article" key={project.title} variants={projectVariants} className="group relative overflow-hidden rounded-3xl border border-brand-border/70 bg-brand-surface/80 shadow-glass border-glow-hover card min-w-0">
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
                          <span className="text-slate-400 font-mono text-[10px]" aria-hidden="true">•</span>
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
                          <span className="font-mono text-[10px] text-slate-500">Proprietary / Private</span>
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
            <span className="font-mono text-[10px] text-slate-400">Production / Support</span>
          </div>
          <ul className="mt-3 divide-y divide-brand-border/40 text-sm leading-relaxed text-brand-charcoal">
            <li className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
              <div>
                <a
                  href="https://tfgroup.ai/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-navy hover:text-brand-blue underline decoration-brand-border/70 hover:decoration-brand-blue"
                >
                  TFG Corporate Website
                </a>
                <span className="text-slate-500"> — Next.js, Flask; zero-downtime migration from legacy static site</span>
              </div>
              <a
                href="https://tfgroup.ai/en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-brand-blue hover:underline shrink-0"
              >
                tfgroup.ai ↗
              </a>
            </li>
            <li className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
              <div>
                <a
                  href="https://groconnect.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-navy hover:text-brand-blue underline decoration-brand-border/70 hover:decoration-brand-blue"
                >
                  GroConnect
                </a>
                <span className="text-slate-500"> — PHP, Node.js; client portal and AI training platform</span>
              </div>
              <a
                href="https://groconnect.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-brand-blue hover:underline shrink-0"
              >
                groconnect.co.in ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
