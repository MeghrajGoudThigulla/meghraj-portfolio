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
    title: "Commerce Platform Consolidation",
    subtitle: "DEALSMART | Customer App + Operations Admin",
    status: "Internal / Pre-release",
    problem:
      "Commerce flows, inventory operations, and payment handling were split across disconnected paths, slowing releases and increasing operational rework.",
    action: [
      "Delivered a dual-client setup with a 23-screen Flutter customer app and a 41-page Flutter Web admin console for catalog, order, and support workflows.",
      "Implemented a FastAPI backend with 104 endpoints across 22 router modules covering auth, catalog, cart, orders, reporting, and admin operations.",
      "Built a PostgreSQL commerce domain with 42 SQLAlchemy models and 13 Alembic migrations, then wired RQ-driven webhook handling for asynchronous payment events.",
    ],
    result:
      "Established a single commerce architecture with tighter operational controls and lower integration friction across customer and admin paths.",
    metrics: ["104 endpoints", "22 router modules", "42 models / 13 migrations"],
    stack:
      "Flutter, FastAPI, PostgreSQL, Redis, RQ workers, MinIO/S3",
    apiDiagram: {
      theme: "commerce",
      clientLabel: "Flutter Customer App + Flutter Web Admin",
      gatewayLabel: "FastAPI /api/v1",
      routeGroups: [
        "auth (16)",
        "admin_inventory (15)",
        "admin_payments (10)",
        "admin_staff (7)",
        "addresses (5)",
        "cart, catalog, support, settings, favorites (4 each)",
        "orders/users/admin_reports (3 each)",
        "audit (2)",
        "health/admin_uploads/razorpay (1 each)",
        "+5 additional admin/ops routers",
      ],
      dataLayerLabel: "PostgreSQL + Redis rate limiter + RQ background workers",
      controlLabel:
        "Razorpay webhook handling, reconciliation jobs, and admin audit endpoints",
    },
    sourcePath: "/Users/tfg-admin/dev/projects/DEALSMART/dealsmart-backend-next",
  },
  {
    title: "Metadata + Applicant Platform Modernization",
    subtitle: "TFG SecureBank | Spring Boot to FastAPI Migration",
    status: "Internal / Pre-release",
    problem:
      "Legacy metadata services made applicant onboarding and workflow operations difficult to evolve safely.",
    action: [
      "Expanded the FastAPI service surface to 103 endpoints across 20 routers while preserving metadata-driven form and workflow behavior.",
      "Rolled out feature-flagged applicant capabilities: account auth (email/password + Google), verification, draft resume, document uploads, and submission flows.",
      "Added observability endpoints, correlation IDs, and Redis-backed per-client rate limiting with worker-driven reliability jobs.",
    ],
    result:
      "Enabled staged applicant delivery with stronger runtime visibility and safer operations for admin and workflow teams.",
    metrics: ["103 endpoints", "20 router modules", "11 migrations + worker jobs"],
    stack: "React (MUI), FastAPI, MySQL, Redis, SQLAlchemy, Alembic",
    apiDiagram: {
      theme: "banking",
      clientLabel: "React (MUI) Admin Console + Applicant Portal",
      gatewayLabel: "FastAPI /api/v1 Metadata Service",
      routeGroups: [
        "applicant (32)",
        "formresponse, ruleEngine (8 each)",
        "excel (7)",
        "menu, form (6 each)",
        "header, dropdown, user, observability (5 each)",
        "health (3)",
        "auth, admin, approval, documents (2 each)",
        "files, download, records, loanapplication, doc (1 each)",
      ],
      dataLayerLabel: "MySQL + Redis + SQLAlchemy metadata models + async rule-engine jobs",
      controlLabel:
        "Feature flags, observability endpoints, and background workers for reliability controls",
    },
    sourcePath: "/Users/tfg-admin/dev/projects/tfg-securebank/tfg-securebank_api",
  },
  {
    title: "Healthcare Request Operations Hardening",
    subtitle: "Medical Advisor | Mobile + Admin + API",
    status: "Published",
    problem:
      "Healthcare service-request and scheduling operations needed stronger trust controls and reliable admin-to-mobile synchronization.",
    action: [
      "Maintained a FastAPI layer with 66 endpoints across 5 router groups for admin operations, user flows, auth, health checks, and integrity verification.",
      "Enforced Firebase token authentication and Play Integrity nonce validation to harden mobile request submission paths.",
      "Kept PostgreSQL as source of truth while dual-writing selected operational state to Firestore for real-time mobile/admin sync.",
    ],
    result:
      "Improved request-processing reliability and security without sacrificing real-time product behavior.",
    metrics: [
      "66 endpoints",
      "5 router groups",
      "14 models / 6 migrations",
    ],
    stack:
      "Flutter (Android/iOS/Web), Firebase Auth/Firestore/Storage, FastAPI, PostgreSQL, Play Integrity",
    apiDiagram: {
      theme: "healthcare",
      clientLabel: "Flutter Mobile + Admin Web",
      gatewayLabel: "FastAPI Service Layer",
      routeGroups: [
        "/admin/* (39)",
        "/user/* (21)",
        "/auth/* (3)",
        "/health (2)",
        "/integrity/nonce (1)",
      ],
      dataLayerLabel: "PostgreSQL + Firebase Auth/Storage + cache-backed settings",
      controlLabel:
        "Play Integrity nonce validation, Firebase token auth, and real-time dual-write flows",
    },
    sourcePath: "/Users/tfg-admin/dev/projects/MEDICAL_ADVISOR/medicaladvisor-api",
    detailsHref:
      "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor",
  },
  {
    title: "Assessment Engine API Governance",
    subtitle: "TFG NexaTest | Learner + Admin Backend",
    status: "Internal / Pre-release",
    problem:
      "Assessment attempts and module governance required strict auth boundaries with a compact API surface.",
    action: [
      "Built an Express backend exposing 13 endpoints across module discovery, history, profile, and admin governance routes.",
      "Enforced Firebase token authentication and role-based admin guards for analytics, module toggles, and question-level oversight.",
      "Added centralized params/body validation to protect attempt recording and module mutation workflows.",
    ],
    result:
      "Delivered a secure, low-complexity backend for learner activity and admin oversight.",
    metrics: ["13 endpoints", "4 route groups", "Firebase auth + RBAC"],
    stack: "Node.js, Express, MySQL (mysql2), Firebase Admin, Zod validation",
    apiDiagram: {
      theme: "assessment",
      clientLabel: "Learner and Admin Clients",
      gatewayLabel: "Express API Router",
      routeGroups: [
        "/admin (6)",
        "/modules (3)",
        "/history (2)",
        "/me (2)",
      ],
      dataLayerLabel: "MySQL connection pool + Firebase token verification",
      controlLabel:
        "Global rate limiting, helmet/cors hardening, and request-validation middleware",
    },
    sourcePath: "/Users/tfg-admin/dev/projects/TFG NexaTest/backend",
  },
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
        className="pointer-events-none absolute -right-32 bottom-8 h-72 w-72 rounded-full bg-white/80 blur-3xl"
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
                className="fade-up relative overflow-hidden rounded-3xl border border-brand-border bg-white/95 p-4 shadow-elev-1 transition hover:-translate-y-0.5 hover:shadow-elev-2 sm:p-5 lg:p-6"
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
                        className="rounded-full border border-brand-blue/25 bg-sky-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-navy sm:px-3 sm:text-[11px] sm:tracking-[0.1em]"
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

                    <div className="rounded-2xl border border-brand-border bg-white px-3 py-3 shadow-sm sm:px-4 sm:py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Outcome
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                        {study.result}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-brand-border bg-white px-3 py-3 shadow-sm sm:px-4 sm:py-4">
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
