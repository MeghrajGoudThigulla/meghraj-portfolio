'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import ApiDiagramCard, { type ApiDiagramModel } from './ApiDiagramCard';
import ProjectDetailsToggle from './ProjectDetailsToggle';
import ProjectSummaryRow from './ProjectSummaryRow';
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
    problem:
      "Legacy background verification (BGV) systems suffered from manual parsing bottlenecks, high candidate turnaround times, and lack of comprehensive post-hiring HRMS modules.",
    action: [
      "Engineered a high-performance NLP parsing engine using SpaCy and Sentence Transformers to extract CV attributes with configurable confidence thresholds (>90% automatic field complete, 70-90% interactive suggestion cards, <70% manual review).",
      "Designed a full employee lifecycle portal extending from Hiring to Verification, Onboarding, Payroll, and Attendance check-in/out, leveraging geo-location face matching.",
      "Integrated Quest Diagnostics and LabCorp testing services directly into candidate verification workflows for complete compliance screening.",
      "Positioned TFG Verify against major direct competitors (SpringVerify, OnGrid, AuthBridge, IDfy) by restructuring commercial pricing models into affordable API-based SME tiers."
    ],
    result:
      "Automated the candidate screening pipeline, shifting from manual processing to deterministic ML evaluation for high-precision fraud detection.",
    metrics: ["SpaCy NLP Parsing", "Face recognition Check-ins", "Quest/LabCorp API Integrations"],
    stack: "Next.js 16, Python, FastAPI, MongoDB, PyTesseract, GenAI",
    apiDiagram: {
      theme: "assessment",
      clientLabel: "Next.js BGV Dashboard",
      gatewayLabel: "FastAPI Inference Gateway",
      routeGroups: ["cv_parsing", "ocr_validation", "fraud_detection"],
      dataLayerLabel: "MongoDB (Motor) + S3",
      controlLabel: "AI Semantic Matching",
    },
    sourcePath: "/Users/tfg-admin/dev/projects/tfg-verify",
    detailsHref: "https://tfgverify.com/",
  },
  {
    title: "Medical Advisor",
    subtitle: "Mission-Critical Healthcare Coordination API",
    status: "Published",
    problem:
      "Emergency dispatch centers required real-time sub-second patient vital updates and highly secure protocols to prevent API payload tampering or request spoofing.",
    action: [
      "Architected a robust FastAPI security gateway utilizing Google Play Integrity nonces to cryptographically verify and sign incoming edge payloads.",
      "Engineered an asynchronous dual-write pipeline committing persistence to PostgreSQL while streaming real-time patient vitals to Google Firestore WebSockets.",
      "Configured a centralized Redis cluster for caching high-frequency vital trends, running containerized Docker microservices on Render.",
      "Integrated asynchronous OpenAI/Gemini document models to parse unstructured clinical test files and significantly reduce doctor administrative overhead."
    ],
    result:
      "Deployed a resilient healthcare dispatcher delivering sub-second response latency and strict cryptographic request enforcement.",
    metrics: ["Google Play Nonces", "Dual-Write Firestore Sync", "Triangle System Design"],
    stack: "Python, FastAPI, PostgreSQL, Redis, Firebase/GCP, Docker",
    apiDiagram: {
      theme: "healthcare",
      clientLabel: "Flutter Mobile Clients",
      gatewayLabel: "FastAPI Security Gateway",
      routeGroups: ["auth", "medical_data", "field_ops"],
      dataLayerLabel: "Postgres + Firestore Sync",
      controlLabel: "Strict JWT & RBAC",
    },
    sourcePath: "/Users/tfg-admin/dev/projects/MEDICAL_ADVISOR",
    detailsHref: "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor",
  },
  {
    title: "TFG SecureBank",
    subtitle: "Multi-Tenant Applicant Loan API Gateway",
    status: "Published",
    problem:
      "Core banking onboarding and applicant portals required continuous dynamic form updates, real-time validation schemas, tenant-isolated data routing, and transparent audit trails without manual code modifications.",
    action: [
      "Architected a multi-tenant FastAPI backend using SQLAlchemy and Alembic supporting dynamic routing between PostgreSQL/Supabase and legacy MySQL backends.",
      "Engineered an asynchronous rules engine using openpyxl and xlcalculator to parse and execute complex credit validation matrices directly from Excel templates.",
      "Secured banking endpoints exposing over 70 APIs via stateless JWT filters, incorporating granular role-based access control (RBAC) and auth_audit_event logging.",
      "Integrated WeasyPrint and Jinja2 templates to compile dynamic, tamper-proof, legally binding loan agreement PDF documents dynamically."
    ],
    result:
      "Delivered a flexible, multi-tenant applicant loan engine adaptively mapping forms, running server-side rules, and keeping immutable security records.",
    metrics: ["FastAPI + SQLAlchemy", "Multi-Tenant Architecture", "Alembic DB Migrations"],
    stack: "Python, FastAPI, SQLAlchemy, Alembic, PostgreSQL, Redis, WeasyPrint, Docker",
    apiDiagram: {
      theme: "banking",
      clientLabel: "React Web + FCM Mobile Clients",
      gatewayLabel: "FastAPI Route Gateway",
      routeGroups: ["applicant/auth", "rule_engine", "dynamic_forms", "observability"],
      dataLayerLabel: "PostgreSQL (Supabase) + Redis",
      controlLabel: "Multi-Tenant JWT & RBAC",
    },
    sourcePath: "/Users/tfg-admin/dev/projects/tfg-securebank/tfg-securebank_api",
    detailsHref: "https://tfgsecurebank.com/",
  },
  {
    title: "TFG Corporate Website",
    subtitle: "High-Performance Next.js Migration",
    status: "Published",
    problem:
      "Static legacy formats lacked search scannability and suffered from database connection leakage risks due to hardcoded DB and SMTP strings in configuration code.",
    action: [
      "Successfully modernized corporate website structures into a modern, SEO-optimized Next.js layout with zero production downtime.",
      "Audited and refactored committed local credentials and Flask server connection keys in source configs, migrating all values to secure environment files.",
      "Constructed a localized developer sandbox preventing local test workflows from reaching live databases, isolating dev assets from production."
    ],
    result:
      "Delivered a performant Next.js static output earning maximum Lighthouse scores, featuring environment validation and full sandbox isolation.",
    metrics: ["Next.js Static Export", "Environment Sandbox", "SEO Optimization"],
    stack: "Next.js, Flask, SQLite / MySQL, environment variables, Tailwind",
    apiDiagram: {
      theme: "assessment",
      clientLabel: "Next.js Web Client",
      gatewayLabel: "Flask API Gateway",
      routeGroups: ["subscribe", "contact", "auth/login", "verify"],
      dataLayerLabel: "MySQL / SQLite isolation",
      controlLabel: "Clean environment guards",
    },
    sourcePath: "/Users/tfg-admin/dev/projects/tfg-org-com",
    detailsHref: "https://tfgroup.ai/en",
  },
  {
    title: "DealsMart",
    subtitle: "High-Scale Monolithic Retail Platform",
    status: "Internal / Pre-release",
    problem:
      "Inventory synchronization delays and payment verification race conditions in multi-region deployments due to distributed legacy NoSQL consistency limits.",
    action: [
      "Migrated legacy NoSQL document structures into a highly normalized, strictly typed relational PostgreSQL database to enforce ACID compliance.",
      "Engineered a Python FastAPI orchestration layer backed by Redis and distributed RQ workers for asynchronous, idempotent Razorpay payment reconciliations.",
      "Delivered high-performance, concurrent client presentation surfaces utilizing Flutter for the mobile app and Flutter Web for the administrative console.",
      "Configured secure local filesystem access and integrated robust S3/MinIO cloud object stores for scalable, high-throughput media uploads."
    ],
    result:
      "Shipped a relational ecosystem achieving 100% deterministic cart reconciliation and completely resolving multi-region inventory sync races.",
    metrics: ["PostgreSQL Migration", "Distributed RQ Workers", "Vite + Flutter Web Admin"],
    stack: "Flutter, FastAPI, PostgreSQL, Redis, RQ workers, S3/MinIO",
    apiDiagram: {
      theme: "commerce",
      clientLabel: "Customer App + Web Admin",
      gatewayLabel: "FastAPI REST Gateway",
      routeGroups: ["catalog", "cart & checkout", "returns", "support_chat"],
      dataLayerLabel: "PostgreSQL + Redis + RQ",
      controlLabel: "JWT Auth & Audit Logs",
    },
    sourcePath: "/Users/tfg-admin/dev/projects/DEALSMART",
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const projectVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.8
    }
  }
};

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="section-shell relative bg-brand-bg border-b border-brand-border/40 py-20 sm:py-24"
      id="projects"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand-blue/5 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-8 h-80 w-80 rounded-full bg-brand-accent/5 blur-[130px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Strategic Engineering & Projects"
          description="High-fidelity showcases combining technical depth, database patterns, and robust digital product-marketing value."
          eyebrow="Portfolio Projects"
        />

        <motion.div 
          className="grid gap-10 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projectsData.map((project, index) => {
            const detailsHref = project.detailsHref ?? "/#contact";
            const isExternal = detailsHref.startsWith("http");

            return (
              <motion.article
                key={project.title}
                variants={projectVariants}
                className="relative overflow-hidden rounded-3xl border border-brand-border/50 bg-brand-surface/40 backdrop-blur-md p-6 shadow-glass transition-all duration-500"
                style={{
                  transform: hoveredIndex === index ? "translateY(-6px) scale(1.005) rotateX(1deg)" : "translateY(0) scale(1) rotateX(0)",
                  boxShadow: hoveredIndex === index ? "0 20px 40px -15px rgba(56, 189, 248, 0.15), 0 0 30px rgba(139, 92, 246, 0.05)" : "0 8px 32px 0 rgba(15, 23, 42, 0.1)",
                  perspective: "1000px"
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Custom glowing accent border matching hover state */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-blue via-sky-400 to-brand-accent transition-opacity duration-300"
                  style={{ opacity: hoveredIndex === index ? 1 : 0.6 }}
                />

                <div className="flex flex-col gap-4 border-b border-brand-border pb-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="mt-1 text-2xl font-bold leading-tight text-brand-navy sm:text-3xl font-serif transition-colors"
                          style={{ color: hoveredIndex === index ? 'var(--brand-blue)' : 'var(--brand-navy)' }}>
                        {project.title}
                      </h3>
                      <p className="mt-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-blue">
                        {project.subtitle}
                      </p>
                    </div>
                    <span
                      className={
                        project.status === "Published"
                          ? "badge-accent"
                          : "rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-amber-400"
                      }
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="rounded-full border border-brand-blue/25 bg-brand-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-navy sm:px-3 sm:text-[11px] sm:tracking-[0.1em]"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 xl:grid-cols-[1.1fr,0.9fr] xl:gap-7">
                  <div className="space-y-4">
                    <ProjectSummaryRow
                      problem={project.problem}
                      stack={project.stack}
                      scale={project.metrics.join(", ")}
                      impact={project.result}
                    />
                    <ProjectDetailsToggle
                      projectTitle={project.title}
                      actionItems={project.action}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-brand-border bg-brand-muted/35 px-3 py-4 sm:px-4 sm:py-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        System Architecture Surface
                      </p>
                      <ApiDiagramCard
                        idPrefix={`project-${index}`}
                        diagram={project.apiDiagram}
                      />
                    </div>

                    <div className="rounded-2xl border border-brand-border bg-brand-surface px-3 py-3 shadow-sm sm:px-4 sm:py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Expected Deliverable Outcome
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                        {project.result}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-brand-border bg-brand-surface px-3 py-3 shadow-sm sm:px-4 sm:py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Technology Implementation
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                        {project.stack}
                      </p>
                      {project.detailsHref && (
                        <Link
                          href={detailsHref}
                          className="mt-3 inline-flex items-center rounded-md text-sm font-semibold text-brand-blue transition hover:text-brand-navy hover:underline underline-offset-4"
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                        >
                          View Project Scope →
                        </Link>
                      )}
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
