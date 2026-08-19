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
    title: "IYOV AI",
    subtitle: "AI-Powered Business Operations Platform",
    status: "Internal / Pre-release",
    problem: "Business operations span onboarding, employee workflows, payroll, verification, and other rule-heavy processes that become difficult to manage consistently as requirements grow.",
    action: [
      "Developed production features across the platform while working closely with stakeholders on custom requirements.",
      "Built the payroll module around India-specific legal and payroll requirements, with the design being extended toward additional countries.",
      "Performed R&D and competitive analysis to evaluate practical approaches for new product capabilities.",
      "Supported infrastructure, deployments, product demonstrations, technical communication, and knowledge transfer alongside feature development."
    ],
    result: "A growing automation platform with payroll and operational workflows designed to turn complex business processes into structured software.",
    metrics: ["Payroll Automation", "AI / R&D", "Product Ownership"],
    stack: "Python, FastAPI, Flutter, PostgreSQL, Redis, Firebase, AI/ML",
    apiDiagram: { theme: "assessment", clientLabel: "Flutter + Web Interfaces", gatewayLabel: "Application API Layer", routeGroups: ["employee", "payroll", "automation", "integrations"], dataLayerLabel: "PostgreSQL + Redis", controlLabel: "Authentication & Rules" },
    sourcePath: "/Users/tfg-admin/dev/projects/IYOV-AI",
  },
  {
    title: "Medical Advisor",
    subtitle: "Healthcare Coordination Platform",
    status: "Published",
    problem: "Healthcare coordination requires reliable mobile workflows, protected APIs, real-time information, and resilient handling of operational data.",
    action: [
      "Contributed across Flutter mobile, FastAPI backend, PostgreSQL, Firebase, Redis, and supporting infrastructure.",
      "Worked on secure authentication and request-validation flows for production mobile workflows.",
      "Helped ship the platform and troubleshoot deployment and integration issues across the stack.",
      "Became a key knowledge-transfer resource, giving hands-on KT to 8 team members working with the platform."
    ],
    result: "A production healthcare platform that also became an internal technical onboarding reference for new team members.",
    metrics: ["Flutter + FastAPI", "PostgreSQL + Redis", "8 KT Sessions"],
    stack: "Flutter, Python, FastAPI, PostgreSQL, Redis, Firebase, Docker",
    apiDiagram: { theme: "healthcare", clientLabel: "Flutter Mobile Clients", gatewayLabel: "FastAPI Service Layer", routeGroups: ["auth", "medical_data", "field_ops"], dataLayerLabel: "PostgreSQL + Firebase + Redis", controlLabel: "Auth & RBAC" },
    sourcePath: "/Users/tfg-admin/dev/projects/MEDICAL_ADVISOR",
    detailsHref: "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor",
  },
  {
    title: "TFGenAPI",
    subtitle: "Backend Platform Built from Scratch",
    status: "Internal / Pre-release",
    problem: "Building a reusable backend platform from the ground up requires clear API boundaries, dependable data flows, maintainable architecture, and practical decisions under incomplete requirements.",
    action: [
      "Built the platform from scratch, owning the backend implementation and the difficult technical decisions needed to make it usable in production workflows.",
      "Designed and implemented REST APIs around evolving product requirements and integration needs.",
      "Used R&D and debugging to investigate unfamiliar technical problems instead of forcing a predetermined implementation.",
      "Worked across development, infrastructure, and stakeholder requirements to move large tickets toward completion."
    ],
    result: "A backend foundation built to support evolving product requirements while keeping the implementation practical and maintainable.",
    metrics: ["Built from Scratch", "REST APIs", "R&D + Debugging"],
    stack: "Python, FastAPI, PostgreSQL, REST APIs, Redis, Docker",
    apiDiagram: { theme: "banking", clientLabel: "Web / Mobile Clients", gatewayLabel: "FastAPI API Gateway", routeGroups: ["auth", "core_api", "business_rules", "integrations"], dataLayerLabel: "PostgreSQL + Redis", controlLabel: "Validation & Access Control" },
    sourcePath: "/Users/tfg-admin/dev/projects/TFGenAPI",
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
      "Generated loan agreement PDFs dynamically with WeasyPrint and Jinja2."
    ],
    result: "A flexible multi-tenant loan engine that maps forms, executes server-side rules, and preserves security records.",
    metrics: ["70+ APIs", "Multi-Tenant", "RBAC + Audit"],
    stack: "Python, FastAPI, SQLAlchemy, Alembic, PostgreSQL, Redis, WeasyPrint, Docker",
    apiDiagram: { theme: "banking", clientLabel: "React Web + FCM", gatewayLabel: "FastAPI Route Gateway", routeGroups: ["applicant/auth", "rule_engine", "dynamic_forms", "observability"], dataLayerLabel: "PostgreSQL + Redis", controlLabel: "Tenant JWT & RBAC" },
    sourcePath: "/Users/tfg-admin/dev/projects/tfg-securebank/tfg-securebank_api",
    detailsHref: "https://tfgsecurebank.com/",
  },
  {
    title: "DealsMart",
    subtitle: "Commerce Platform",
    status: "Internal / Pre-release",
    problem: "Inventory synchronization and payment verification required stronger transactional consistency and reliable background processing.",
    action: [
      "Migrated document structures into normalized PostgreSQL models for stronger transactional guarantees.",
      "Built a FastAPI orchestration layer backed by Redis and background workers for payment reconciliation.",
      "Delivered Flutter mobile and Flutter Web administration surfaces.",
      "Integrated S3/MinIO object storage for scalable media uploads."
    ],
    result: "A commerce backend designed around transactional inventory, background processing, and reliable payment workflows.",
    metrics: ["PostgreSQL", "Background Workers", "Flutter + Web Admin"],
    stack: "Flutter, FastAPI, PostgreSQL, Redis, RQ, S3/MinIO",
    apiDiagram: { theme: "commerce", clientLabel: "Customer App + Web Admin", gatewayLabel: "FastAPI REST Gateway", routeGroups: ["catalog", "cart & checkout", "returns", "support_chat"], dataLayerLabel: "PostgreSQL + Redis + Workers", controlLabel: "JWT & Audit Logs" },
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
    <section className="section-shell relative border-b border-brand-border/40 bg-brand-bg" id="projects">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand-blue/5 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-8 h-80 w-80 rounded-full bg-brand-accent/5 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Selected Engineering Work" description="The three projects I want people to remember first, followed by additional production work that shows the breadth of my engineering experience." eyebrow="PORTFOLIO PROJECTS" />

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
