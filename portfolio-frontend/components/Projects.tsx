'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import ApiDiagramCard, { type ApiDiagramModel } from './ApiDiagramCard';
import ProjectDetailsToggle from './ProjectDetailsToggle';
import SectionHeading from './SectionHeading';
import TiltCard from './TiltCard';

export type Project = {
  title: string;
  subtitle: string;
  status: "Production / Internal" | "Internal / Pre-release" | "Published";
  problem: string;
  action: string[];
  result: string;
  metrics: string[];
  stack: string;
  apiDiagram: ApiDiagramModel;
  detailsHref?: string;
};

const projectsData: Project[] = [
  {
    title: "TFGenAPI",
    subtitle: "Verification & Custom API Platform",
    status: "Production / Internal",
    problem: "Verification products need dependable API boundaries, provider integrations, asynchronous workflows, security controls, and enough flexibility to evolve with business requirements.",
    action: [
      "Built the platform from scratch and owned difficult backend modules and technical decisions across evolving requirements.",
      "Developed REST APIs and integrations while working through unfamiliar technical problems with R&D and iterative debugging.",
      "Worked across backend development, infrastructure issues, stakeholder requirements, and large tickets that needed end-to-end ownership.",
      "Used the platform as a practical engineering environment for solving complex verification and automation problems."
    ],
    result: "A reusable backend foundation for verification and custom API workflows, built to support evolving product requirements without turning every change into a new system.",
    metrics: ["Built from Scratch", "Backend Ownership", "R&D + Debugging"],
    stack: "Python, FastAPI, PostgreSQL, Redis, REST APIs, Next.js, TypeScript",
    apiDiagram: { theme: "banking", clientLabel: "Enterprise Dashboard & API Consumers", gatewayLabel: "FastAPI Route Handlers", routeGroups: ["identity & ocr", "consent flows", "workflows & webhooks", "billing & audits"], dataLayerLabel: "PostgreSQL RLS + Redis Queue", controlLabel: "Organization RBAC & Hash API Keys" },
  },
  {
    title: "IYOV AI",
    subtitle: "AI-Powered HR & Business Operations Platform",
    status: "Internal / Pre-release",
    problem: "HR operations combine employee workflows, verification, payroll, compliance, and other rule-heavy processes where correctness and maintainability matter as requirements grow.",
    action: [
      "Developed production features across the platform while working directly with stakeholders on custom requirements.",
      "Mainly built the payroll module around India-specific legal and payroll requirements, with the design being extended toward additional countries.",
      "Performed R&D, competitive analysis, product demonstrations, infrastructure work, and technical communication alongside feature development.",
      "Worked across difficult tickets, deployments, integrations, and knowledge transfer rather than limiting the role to feature coding."
    ],
    result: "A growing HR automation platform with payroll and operational workflows that turn complex business rules into structured software.",
    metrics: ["Payroll Ownership", "AI / R&D", "Product + Infrastructure"],
    stack: "Python, FastAPI, Flutter, Next.js, TypeScript, PostgreSQL, Redis, AI/ML",
    apiDiagram: { theme: "assessment", clientLabel: "Flutter Mobile + Recruiter Web", gatewayLabel: "FastAPI REST Service", routeGroups: ["ai_screening", "jobs & ATS", "interviews", "bgv_verification"], dataLayerLabel: "MongoDB Database", controlLabel: "OAuth2 Password Flow" },
  },
  {
    title: "TFG SecureBank",
    subtitle: "Digital Loan Processing Platform",
    status: "Production / Internal",
    problem: "Financial workflows require secure applicant journeys, backend validation, document handling, tenant-aware access, and reliable communication across web and mobile surfaces.",
    action: [
      "Worked across backend services and product workflows for a multi-surface loan-processing platform.",
      "Contributed to API development, business logic, integrations, and difficult implementation work across the system.",
      "Worked with FastAPI, PostgreSQL, React, Flutter, Firebase, and supporting infrastructure across development surfaces.",
      "Used debugging and R&D to resolve integration and deployment issues while moving large tickets toward completion."
    ],
    result: "A multi-surface financial platform connecting applicant workflows, backend services, web interfaces, and mobile experiences.",
    metrics: ["FinTech Domain", "Web + Mobile", "Backend Engineering"],
    stack: "Python, FastAPI, React, Vite, Flutter, PostgreSQL, Supabase, Firebase",
    apiDiagram: { theme: "banking", clientLabel: "React Vite Web + Flutter Mobile", gatewayLabel: "FastAPI Application API", routeGroups: ["auth", "products", "applications", "file_uploads"], dataLayerLabel: "PostgreSQL on Supabase", controlLabel: "Multitenancy & Session Security" },
    detailsHref: "https://tfgsecurebank.com/",
  },
  {
    title: "Medical Advisor",
    subtitle: "Healthcare Coordination Platform",
    status: "Published",
    problem: "Healthcare coordination requires dependable mobile workflows, protected APIs, real-time information, and resilient handling of operational data.",
    action: [
      "Contributed across Flutter mobile, FastAPI backend, PostgreSQL, Firebase, Redis, and supporting infrastructure.",
      "Worked on authentication, request-validation, production workflows, and cross-stack debugging.",
      "Helped ship the platform and troubleshoot deployment and integration issues across the stack.",
      "Became a key knowledge-transfer resource, giving hands-on KT to 8 team members working with the platform."
    ],
    result: "A production healthcare platform that also became an internal technical onboarding reference for new team members.",
    metrics: ["Flutter + FastAPI", "Production Platform", "8 KT Sessions"],
    stack: "Flutter, Python, FastAPI, PostgreSQL, Redis, Firebase, Docker",
    apiDiagram: { theme: "healthcare", clientLabel: "Flutter Mobile Clients + Admin Web", gatewayLabel: "FastAPI Sync Gateway", routeGroups: ["admin_sync", "firestore_dual_write", "ai_medgemma_pipeline", "backfill_jobs"], dataLayerLabel: "PostgreSQL + Firestore + Redis", controlLabel: "Firebase Auth & MedGemma Queue" },
    detailsHref: "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor",
  },
  {
    title: "DealsMart",
    subtitle: "Full-Stack Commerce Platform",
    status: "Internal / Pre-release",
    problem: "Commerce workflows need reliable catalog, inventory, payments, orders, background processing, and administration across multiple product surfaces.",
    action: [
      "Worked across the Flutter customer application, Flutter Web administration surface, and FastAPI backend.",
      "Built backend workflows around PostgreSQL, Redis, background jobs, payment processing, and object storage.",
      "Worked on transactional data flows, integrations, and the difficult modules required to move the product beyond a basic CRUD application.",
      "Used R&D and debugging to resolve implementation issues across mobile, backend, database, and infrastructure layers."
    ],
    result: "A multi-surface commerce system spanning customer experiences, administration, transactional backend workflows, and supporting infrastructure.",
    metrics: ["Flutter + Web Admin", "FastAPI", "Payments + Background Jobs"],
    stack: "Flutter, FastAPI, PostgreSQL, Redis, RQ, Razorpay, S3/MinIO",
    apiDiagram: { theme: "commerce", clientLabel: "Flutter App + Flutter Web Admin", gatewayLabel: "FastAPI REST Server", routeGroups: ["catalog & cart", "checkout & razorpay", "orders & returns", "support chat"], dataLayerLabel: "PostgreSQL + Redis + Firebase Storage", controlLabel: "JWT Session & MSG91 OTP" },
  },
  {
    title: "TFG Mobile App Suite",
    subtitle: "Cross-Platform Operational Applications",
    status: "Production / Internal",
    problem: "Growing business operations require a suite of dedicated, reliable mobile experiences (Employee Portal, HRMS, LMS, and Care Navigator) that consume backend services and remain maintainable across iOS and Android platforms.",
    action: [
      "Developed Flutter features and handled integration across multiple operational mobile products.",
      "Managed Android and iOS App Store/Play Store publishing pipelines, provisioning, and releases.",
      "Debugged mobile-specific integration issues, API syncs, local storage persistence, and push notifications.",
      "Authored technical solutions across Employee Portal, HRMS, and LMS mobile surfaces to match business requirements."
    ],
    result: "Published and maintained a suite of 4+ custom mobile applications, establishing reliable release pipelines and consistent borrower/employee client features.",
    metrics: ["4+ Flutter Apps", "App/Play Store Releases", "Cross-Platform Delivery"],
    stack: "Flutter, Dart, Riverpod, GoRouter, Firebase, REST APIs, iOS, Android",
    apiDiagram: { theme: "assessment", clientLabel: "4+ Flutter Mobile Clients", gatewayLabel: "FastAPI Operational API", routeGroups: ["employee portal", "hrms mobile", "lms mobile", "care navigator"], dataLayerLabel: "SQLite Local + Firebase Push", controlLabel: "Token Sync & Device Biometrics" },
  },
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
        <SectionHeading
          title="Selected Engineering Work"
          description="Production and internal systems I've worked across, ordered by the depth of ownership and technical responsibility they demonstrate. Proprietary projects are described at a high level without exposing private source code."
          eyebrow="ENGINEERING WORK"
        />

        <motion.div className="mt-10 grid gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          {projectsData.map((project, index) => {
            const detailsHref = project.detailsHref ?? "/#contact";
            const isExternal = detailsHref.startsWith("http");

            return (
              <TiltCard as="article" key={project.title} variants={projectVariants} className="group relative overflow-hidden rounded-3xl border border-brand-border/70 bg-brand-surface/80 shadow-glass border-glow-hover card">
                <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-sky-400 to-brand-accent opacity-70 transition-opacity group-hover:opacity-100" />

                <div className="grid lg:grid-cols-[1fr,0.72fr]">
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blue">0{index + 1} / Case Study</p>
                        <h3 className="mt-2 text-2xl font-bold leading-tight text-brand-navy sm:text-3xl lg:text-4xl">{project.title}</h3>
                        <p className="mt-2 text-sm font-medium text-brand-charcoal sm:text-base">{project.subtitle}</p>
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${
                        project.status === "Published"
                          ? "border-brand-blue/30 bg-brand-blue/10 text-brand-blue"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-500"
                      }`}>{project.status}</span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.metrics.map((metric, idx) => (
                        <span key={metric} className={`rounded-lg px-2.5 py-1.5 font-mono text-[10px] font-medium transition-colors ${
                          idx === 0
                            ? "border border-brand-blue/30 bg-brand-blue/10 text-brand-blue font-semibold"
                            : "border border-brand-border bg-brand-muted/50 text-brand-charcoal"
                        } sm:text-[11px]`}>
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

                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      <ProjectDetailsToggle projectTitle={project.title} actionItems={project.action} />
                      {project.detailsHref ? (
                        <Link href={detailsHref} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} className="btn btn-secondary btn-sm">View Live Project →</Link>
                      ) : (
                        <Link href="/#contact" className="btn btn-secondary btn-sm">Discuss the Work →</Link>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-brand-border bg-brand-muted/30 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
                    <div className="flex h-full flex-col gap-5">
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-blue">03 / Architecture</p>
                        <p className="mt-2 text-sm leading-6 text-brand-charcoal">A high-level view of the system surface and technology choices. Proprietary implementation details are intentionally omitted.</p>
                      </div>
                      <div className="rounded-2xl border border-brand-border bg-brand-surface p-3 shadow-sm"><ApiDiagramCard idPrefix={`project-${index}`} diagram={project.apiDiagram} /></div>
                      <div className="mt-auto rounded-2xl border border-brand-border bg-brand-surface p-4">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-blue">04 / Stack</p>
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {project.stack.split(", ").map((tech) => (
                            <span key={tech} className="rounded-md border border-brand-border/80 bg-brand-bg/50 px-2 py-1 font-mono text-[10px] font-medium text-brand-charcoal transition-colors hover:border-brand-blue/30 hover:text-brand-blue">
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
      </div>
    </section>
  );
}
