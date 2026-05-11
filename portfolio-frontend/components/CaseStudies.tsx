import Link from "next/link";
import ApiDiagramCard, { type ApiDiagramModel } from "./ApiDiagramCard";
import CaseStudyDetailsToggle from "./CaseStudyDetailsToggle";
import CaseStudySummaryRow from "./CaseStudySummaryRow";
import SectionHeading from "./SectionHeading";

export type CaseStudy = {
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

const caseStudies: CaseStudy[] = [
  {
    title: "DealsMart",
    subtitle: "Enterprise Commerce Platform",
    status: "Internal / Pre-release",
    problem:
      "Legacy NoSQL data stores introduced race conditions during multi-region inventory synchronization and limited the capability to execute complex relational queries across the checkout pipeline.",
    action: [
      "Engineered a monolithic FastAPI layer interfacing with PostgreSQL to enforce strict ACID compliance across concurrent cart and inventory mutations.",
      "Implemented an event-driven architecture using distributed RQ workers and Redis for idempotent payment reconciliation and background job execution.",
      "Delivered a cross-platform presentation layer using Flutter to interface with the REST APIs, utilizing S3/MinIO for scalable object storage.",
    ],
    result:
      "Successfully transitioned the platform to a relational architecture, enabling deterministic payment reconciliation and resolving inventory race conditions.",
    metrics: ["FastAPI Migration", "Dual Flutter Apps", "RQ Background Workers"],
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
  },
  {
    title: "Medical Advisor",
    subtitle: "Mission-Critical Healthcare API",
    status: "Published",
    problem:
      "Field medical units required sub-second synchronization and strict cryptographic enforcement to prevent unauthorized API payload spoofing during critical dispatch workflows.",
    action: [
      "Architected a FastAPI microservice integrating strict JWT authentication and Google Play Integrity nonces to cryptographically verify incoming requests.",
      "Engineered an asynchronous dual-write pipeline synchronizing PostgreSQL transaction state directly to Firestore to enable real-time WebSocket updates.",
      "Configured Redis for in-memory caching of high-frequency read paths, deployed via containerized Docker environments on Render.",
    ],
    result:
      "Deployed an enterprise-grade healthcare API that guarantees data integrity and sub-second dispatch state synchronization.",
    metrics: ["FastAPI + Docker", "Firestore Sync", "Redis Caching"],
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
    title: "TFG Verify",
    subtitle: "AI-Powered BGV (Background Verification) Platform",
    status: "Published",
    problem:
      "Manual background verification processes lacked deterministic fraud detection capabilities and suffered from high computational latency during structured document parsing.",
    action: [
      "Engineered an AI inference pipeline utilizing PyTesseract for OCR and Sentence Transformers to compute dense vector embeddings for CV semantic matching.",
      "Architected a Next.js 16 SSR frontend, leveraging Turbopack for module resolution and Recharts for rendering normalized inference thresholds.",
      "Configured a MongoDB (Motor) data layer to support high-throughput, unstructured document ingestion and ML feature store persistence.",
    ],
    result:
      "Automated the candidate screening pipeline, shifting from manual processing to deterministic ML evaluation for high-precision fraud detection.",
    metrics: ["Next.js 16 + Turbopack", "PyTesseract OCR", "GenAI + Sentence Transformers"],
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
    title: "TFG SecureBank",
    subtitle: "Metadata-Driven Applicant Modernization",
    status: "Published",
    problem:
      "Financial form onboarding required dynamic, metadata-driven schema resolution and an abstracted rules engine for complex workflow routing without hardcoding business logic.",
    action: [
      "Engineered a Spring Boot 3.x (Java 17) backend exposing 70 RESTful endpoints, secured via custom stateless JWT filters and strict RBAC.",
      "Integrated Apache POI for dynamic execution of Excel-based rule templates and Apache PDFBox to generate immutable document artifacts.",
      "Designed a normalized MySQL (JPA/Hibernate) schema utilizing EAV (Entity-Attribute-Value) patterns to serialize dynamic form metadata.",
    ],
    result:
      "Delivered an abstracted banking administration portal that dynamically adapts to evolving applicant schemas and runtime compliance rules.",
    metrics: ["Spring Boot 3.x", "70 REST Endpoints", "Dynamic Forms & PDF Gen"],
    stack: "Java 17, Spring Boot, MySQL (JPA), Apache POI, PDFBox",
    apiDiagram: {
      theme: "banking",
      clientLabel: "React Admin Console",
      gatewayLabel: "Spring Boot API",
      routeGroups: ["dynamic_forms", "workflow_rules", "pdf_generation", "auth"],
      dataLayerLabel: "MySQL + JPA/Hibernate",
      controlLabel: "Stateless JWT & RBAC",
    },
    sourcePath: "/Users/tfg-admin/dev/projects/tfg-securebank",
    detailsHref: "https://tfgsecurebank.com/",
  }
];

export default function CaseStudies() {
  return (
    <section
      className="section-shell section-band-muted relative"
      id="cases"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-sky-100/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-8 h-72 w-72 rounded-full bg-brand-surface/80 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Case studies mapped to live repository architecture."
          description="Each case ties the delivery narrative to verifiable endpoint counts, module boundaries, and runtime controls."
          eyebrow="Case Studies"
        />

        <div className="grid gap-6 sm:gap-7 lg:gap-9">
          {caseStudies.map((study, index) => {
            const detailsHref = study.detailsHref ?? "/#contact";
            const isExternal = detailsHref.startsWith("http");

            return (
              <article
                key={study.title}
                className="fade-up relative overflow-hidden rounded-3xl border border-brand-border bg-brand-surface/95 p-4 shadow-elev-1 transition hover:-translate-y-0.5 hover:shadow-elev-2 sm:p-5 lg:p-6"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-sky-400 to-emerald-400"
                />

                <div className="flex flex-col gap-3 sm:gap-4 border-b border-brand-border pb-4 sm:pb-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Case {(index + 1).toString().padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold leading-tight text-brand-navy sm:text-2xl lg:text-3xl">
                        {study.title}
                      </h3>
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs">
                        {study.subtitle}
                      </p>
                    </div>
                    <span
                      className={
                        study.status === "Published"
                          ? "badge-accent"
                          : "rounded-full border border-amber-300/70 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700"
                      }
                    >
                      {study.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {study.metrics.map((metric) => (
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
                    <CaseStudySummaryRow
                      problem={study.problem}
                      stack={study.stack}
                      scale={study.metrics.join(", ")}
                      impact={study.result}
                    />
                    <CaseStudyDetailsToggle
                      caseTitle={study.title}
                      actionItems={study.action}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-brand-border bg-brand-muted/35 px-3 py-4 sm:px-4 sm:py-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Architecture Surface
                      </p>
                      <ApiDiagramCard
                        idPrefix={`case-${index}`}
                        diagram={study.apiDiagram}
                      />
                    </div>

                    <div className="rounded-2xl border border-brand-border bg-brand-surface px-3 py-3 shadow-sm sm:px-4 sm:py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Outcome
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                        {study.result}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-brand-border bg-brand-surface px-3 py-3 shadow-sm sm:px-4 sm:py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Tech Stack
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                        {study.stack}
                      </p>
                      <Link
                        href={detailsHref}
                        className="mt-3 inline-flex items-center rounded-md text-sm font-semibold text-brand-blue transition hover:text-brand-navy hover:underline underline-offset-4"
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                      >
                        View details →
                      </Link>
                    </div>
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
