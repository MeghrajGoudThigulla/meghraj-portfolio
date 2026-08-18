'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import ApiDiagramCard, { type ApiDiagramModel } from './ApiDiagramCard';
import ProjectDetailsToggle from './ProjectDetailsToggle';
import SectionHeading from './SectionHeading';

export type Project = {
  title: string;
  subtitle: string;
  status: "Published" | "Internal / Pre-release";
  problem: string;
  action: string[];
  result: string;
  metrics: string[];
  stack: string;
  apiDiagram: ApiDiagramModel;
  sourcePath: string;
  detailsHref?: string;
};

const projectsData: Project[] = [
  {
    title: "TFG Verify",
    subtitle: "AI-Powered HRTech Onboarding Ecosystem",
    status: "Published",
    problem: "Legacy background verification systems suffered from manual parsing bottlenecks, high candidate turnaround times, and limited post-hiring HRMS workflows.",
    action: [
      "Engineered an NLP parsing engine using SpaCy and Sentence Transformers with configurable confidence thresholds.",
      "Designed the employee lifecycle portal across Hiring, Verification, Onboarding, Payroll, and Attendance.",
      "Integrated Quest Diagnostics and LabCorp testing services into candidate verification workflows.",
      "Restructured API-based pricing tiers for SME adoption against established BGV competitors."
    ],
    result: "Automated candidate screening with deterministic ML evaluation and integrated verification workflows.",
    metrics: ["SpaCy NLP", "Face Recognition", "Quest/LabCorp APIs"],
    stack: "Next.js 16, Python, FastAPI, MongoDB, PyTesseract, GenAI",
    apiDiagram: { theme: "assessment", clientLabel: "Next.js BGV Dashboard", gatewayLabel: "FastAPI Inference Gateway", routeGroups: ["cv_parsing", "ocr_validation", "fraud_detection"], dataLayerLabel: "MongoDB + S3", controlLabel: "AI Semantic Matching" },
    sourcePath: "/Users/tfg-admin/dev/projects/tfg-verify",
    detailsHref: "https://tfgverify.com/",
  },
  {
    title: "Medical Advisor",
    subtitle: "Mission-Critical Healthcare Coordination API",
    status: "Published",
    problem: "Emergency dispatch centers required real-time patient vital updates and hardened request validation against payload tampering or spoofing.",
    action: [
      "Architected a FastAPI security gateway using Google Play Integrity nonces to verify edge payloads.",
      "Engineered an asynchronous dual-write pipeline across PostgreSQL and Firestore for real-time vitals.",
      "Configured Redis caching and Dockerized microservices deployed on Render.",
      "Integrated asynchronous AI document parsing to reduce clinical administration overhead."
    ],
    result: "A resilient healthcare dispatcher with low-latency synchronization and cryptographic request enforcement.",
    metrics: ["Play Integrity", "Dual-Write Sync", "RBAC"],
    stack: "Python, FastAPI, PostgreSQL, Redis, Firebase/GCP, Docker",
    apiDiagram: { theme: "healthcare", clientLabel: "Flutter Mobile Clients", gatewayLabel: "FastAPI Security Gateway", routeGroups: ["auth", "medical_data", "field_ops"], dataLayerLabel: "Postgres + Firestore", controlLabel: "JWT & RBAC" },
    sourcePath: "/Users/tfg-admin/dev/projects/MEDICAL_ADVISOR",
    detailsHref: "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor",
  },
  {
    title: "TFG SecureBank",
    subtitle: "Multi-Tenant Applicant Loan API Gateway",
    status: "Published",
    problem: "Banking onboarding required dynamic forms, tenant-isolated routing, real-time validation, and transparent audit trails without manual code changes.",
    action: [
      "Architected a multi-tenant FastAPI backend with SQLAlchemy and Alembic across PostgreSQL/Supabase and legacy MySQL.",
      "Engineered an asynchronous rules engine for Excel-based credit validation matrices.",
      "Secured 70+ banking APIs with JWT filters, granular RBAC, and audit events.",
      "Generated tamper-resistant loan agreement PDFs dynamically with WeasyPrint and Jinja2."
    ],
    result: "A flexible multi-tenant loan engine that maps forms, executes server-side rules, and preserves security records.",
    metrics: ["70+ APIs", "Multi-Tenant", "RBAC + Audit"],
    stack: "Python, FastAPI, SQLAlchemy, Alembic, PostgreSQL, Redis, WeasyPrint, Docker",
    apiDiagram: { theme: "banking", clientLabel: "React Web + FCM", gatewayLabel: "FastAPI Route Gateway", routeGroups: ["applicant/auth", "rule_engine", "dynamic_forms", "observability"], dataLayerLabel: "PostgreSQL + Redis", controlLabel: "Tenant JWT & RBAC" },
    sourcePath: "/Users/tfg-admin/dev/projects/tfg-securebank/tfg-securebank_api",
    detailsHref: "https://tfgsecurebank.com/",
  },
  {
    title: "TFG Corporate Website",
    subtitle: "High-Performance Next.js Migration",
    status: "Published",
    problem: "Legacy formats lacked search scannability and exposed risks from hardcoded database and SMTP configuration.",
    action: [
      "Modernized the corporate website into an SEO-optimized Next.js experience with zero production downtime.",
      "Refactored committed credentials and connection keys into secure environment configuration.",
      "Isolated local test workflows from production databases and assets."
    ],
    result: "A performant Next.js site with stronger SEO, environment validation, and production-safe development workflows.",
    metrics: ["Next.js", "SEO", "Environment Safety"],
    stack: "Next.js, Flask, SQLite / MySQL, environment variables, Tailwind",
    apiDiagram: { theme: "assessment", clientLabel: "Next.js Web Client", gatewayLabel: "Flask API Gateway", routeGroups: ["subscribe", "contact", "auth/login", "verify"], dataLayerLabel: "MySQL / SQLite", controlLabel: "Environment Guards" },
    sourcePath: "/Users/tfg-admin/dev/projects/tfg-org-com",
    detailsHref: "https://tfgroup.ai/en",
  },
  {
    title: "DealsMart",
    subtitle: "High-Scale Monolithic Retail Platform",
    status: "Internal / Pre-release",
    problem: "Inventory synchronization and payment verification suffered from consistency and race-condition issues in distributed deployments.",
    action: [
      "Migrated document structures into normalized PostgreSQL models for stronger transactional guarantees.",
      "Built a FastAPI orchestration layer backed by Redis and distributed RQ workers for payment reconciliation.",
      "Delivered Flutter mobile and Flutter Web administration surfaces.",
      "Integrated S3/MinIO object storage for scalable media uploads."
    ],
    result: "A deterministic commerce backend designed around transactional inventory and idempotent payment processing.",
    metrics: ["PostgreSQL", "RQ Workers", "Flutter + Web Admin"],
    stack: "Flutter, FastAPI, PostgreSQL, Redis, RQ, S3/MinIO",
    apiDiagram: { theme: "commerce", clientLabel: "Customer App + Web Admin", gatewayLabel: "FastAPI REST Gateway", routeGroups: ["catalog", "cart & checkout", "returns", "support_chat"], dataLayerLabel: "PostgreSQL + Redis + RQ", controlLabel: "JWT & Audit Logs" },
    sourcePath: "/Users/tfg-admin/dev/projects/DEALSMART",
  }
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const projectVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.55 } }
};

export default function Projects() {
  return (
    <section className="section-shell relative bg-brand-bg border-b border-brand-border/40" id="projects">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand-blue/5 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-8 h-80 w-80 rounded-full bg-brand-accent/5 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Selected Engineering Work" description="Production systems and product builds that demonstrate architecture, backend ownership, security, and delivery depth." eyebrow="Portfolio Projects" />

        <motion.div className="mt-10 grid gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          {projectsData.map((project, index) => {
            const detailsHref = project.detailsHref ?? "/#contact";
            const isExternal = detailsHref.startsWith("http");

            return (
              <motion.article key={project.title} variants={projectVariants} className="group relative overflow-hidden rounded-3xl border border-brand-border/70 bg-brand-surface/80 shadow-glass transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-elev-2">
                <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-sky-400 to-brand-accent opacity-70 transition-opacity group-hover:opacity-100" />

                <div className="grid lg:grid-cols-[1fr,0.72fr]">
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blue">0{index + 1} / Case Study</p>
                        <h3 className="mt-2 text-2xl font-bold leading-tight text-brand-navy sm:text-3xl lg:text-4xl">{project.title}</h3>
                        <p className="mt-2 text-sm font-medium text-brand-charcoal sm:text-base">{project.subtitle}</p>
                      </div>
                      <span className={project.status === "Published" ? "badge-accent" : "rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-amber-500"}>{project.status}</span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.metrics.map((metric) => <span key={metric} className="rounded-lg border border-brand-border bg-brand-muted/50 px-2.5 py-1.5 font-mono text-[10px] font-medium text-brand-charcoal sm:text-[11px]">{metric}</span>)}
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

                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      <ProjectDetailsToggle projectTitle={project.title} actionItems={project.action} />
                      {project.detailsHref && <Link href={detailsHref} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} className="btn btn-secondary btn-sm">View Live Project →</Link>}
                    </div>
                  </div>

                  <div className="border-t border-brand-border bg-brand-muted/30 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
                    <div className="flex h-full flex-col gap-5">
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-blue">03 / Architecture</p>
                        <p className="mt-2 text-sm leading-6 text-brand-charcoal">The system surface and technology choices behind the product.</p>
                      </div>
                      <div className="rounded-2xl border border-brand-border bg-brand-surface p-3 shadow-sm"><ApiDiagramCard idPrefix={`project-${index}`} diagram={project.apiDiagram} /></div>
                      <div className="mt-auto rounded-2xl border border-brand-border bg-brand-surface p-4">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-blue">04 / Stack</p>
                        <p className="mt-2 text-sm leading-6 text-brand-charcoal">{project.stack}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
