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
    title: "Commerce Platform Buildout",
    subtitle: "DEALSMART | Customer App + Admin Platform",
    status: "Internal / Pre-release",
    problem:
      "Needed a single commerce platform that could support customer flows, admin operations, and payment lifecycle management.",
    action: [
      "Built a Flutter customer app (23 screens) and a 41-page Flutter Web admin dashboard for catalog, orders, and operations.",
      "Designed a FastAPI backend with 134 endpoints across 23 routers for auth, cart, orders, payments, reports, and admin controls.",
      "Modeled a production commerce schema with 42 SQLAlchemy models and 13 Alembic migrations, including shipments, refunds, and RMAs.",
    ],
    result:
      "Established a modular commerce foundation with secure request handling and asynchronous payment processing readiness.",
    metrics: ["134 endpoints", "23 router modules", "Async webhooks + workers"],
    stack:
      "Flutter, FastAPI, PostgreSQL, Redis, RQ workers, MinIO/S3",
    apiDiagram: {
      theme: "commerce",
      clientLabel: "Flutter Customer App + Flutter Web Admin",
      gatewayLabel: "FastAPI /api/v1",
      routeGroups: [
        "auth (16)",
        "catalog (17)",
        "orders (20)",
        "admin_inventory (15)",
        "admin_payments (10)",
        "admin_staff (7)",
        "cart (4)",
        "support (4)",
        "addresses (5)",
        "+14 additional admin/ops routers",
      ],
      dataLayerLabel: "PostgreSQL + Redis rate limiter + RQ background workers",
      controlLabel: "Includes webhook replay, reconciliation, and admin audit modules",
    },
    sourcePath: "/Users/tfg-admin/dev/projects/DEALSMART/dealsmart-backend-next",
  },
  {
    title: "Metadata Platform Modernization",
    subtitle: "TFG SecureBank | Spring Boot to FastAPI Migration",
    status: "Internal / Pre-release",
    problem:
      "Legacy backend constraints and fragmented applicant flows slowed delivery for metadata-driven workflows and operations visibility.",
    action: [
      "Contributed to migration from Spring Boot services into a modular FastAPI platform now spanning 103 endpoints across 20 routers.",
      "Shipped applicant lifecycle capabilities behind feature flags: signup/login (email and Google), email verification, draft save/resume, and submission flows.",
      "Added operations hardening with observability endpoints, Redis-backed status rate limiting, and upload cleanup tracking.",
    ],
    result:
      "Improved rollout safety and operational control while scaling the service footprint for enterprise workflow and applicant processing.",
    metrics: ["103 endpoints", "20 router modules", "Feature-flagged applicant rollout"],
    stack: "React (MUI), FastAPI, MySQL, Redis, SQLAlchemy, Alembic",
    apiDiagram: {
      theme: "banking",
      clientLabel: "React (MUI) Admin Console + Applicant Portal",
      gatewayLabel: "FastAPI /api/v1 Metadata Service",
      routeGroups: [
        "applicant (32)",
        "formresponse + ruleEngine (8 each)",
        "excel (7), menu + form (6 each)",
        "header + dropdown + user (5 each)",
        "observability (5)",
        "health (3)",
        "auth/admin/approval/documents (2 each)",
        "files/download/records/loanapplication/doc (1 each)",
      ],
      dataLayerLabel: "MySQL + Redis + SQLAlchemy metadata models + async rule-engine jobs",
      controlLabel:
        "Feature-flagged rollout path for applicant APIs with observability and admin safeguards",
    },
    sourcePath: "/Users/tfg-admin/dev/projects/tfg-securebank/tfg-securebank_api",
  },
  {
    title: "Healthcare Operations Optimization",
    subtitle: "Medical Advisor | Mobile, Web, Admin",
    status: "Published",
    problem:
      "Manual scheduling and unverified service requests created compliance risk and operational drag.",
    action: [
      "Implemented Play Integrity guardrails and secure nonce generation to block unauthorized requests.",
      "Unified Firebase ID token auth for users and admins; dual Firestore writes for instant UI sync.",
      "Built admin search/pagination plus compliant account deletion with audit logs.",
    ],
    result:
      "Prepared for a 1K+ user launch with secure onboarding and reduced admin overhead.",
    metrics: [
      "68 endpoints",
      "5 router groups",
      "Play Integrity + Firebase auth",
    ],
    stack:
      "Flutter (Android/iOS/Web), Firebase Auth/Firestore/Storage, FastAPI, PostgreSQL, Play Integrity",
    apiDiagram: {
      theme: "healthcare",
      clientLabel: "Flutter Mobile + Admin Web",
      gatewayLabel: "FastAPI Service Layer",
      routeGroups: [
        "/admin/* (41)",
        "/user/* (21)",
        "/auth/* (3)",
        "/health (2)",
        "/integrity/nonce (1)",
      ],
      dataLayerLabel: "PostgreSQL + Firebase Auth/Storage + cache-backed settings",
      controlLabel: "Play Integrity nonce verification and role-protected admin operations",
    },
    sourcePath: "/Users/tfg-admin/dev/projects/MEDICAL_ADVISOR/medicaladvisor-api",
    detailsHref:
      "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor",
  },
  {
    title: "Assessment Engine API",
    subtitle: "TFG NexaTest | Module + Attempt + Admin Workflow Backend",
    status: "Internal / Pre-release",
    problem: "Needed a compact assessment backend with authenticated attempts, analytics, and admin module controls.",
    action: [
      "Built Express route groups for module discovery, attempt recording, history retrieval, and admin analytics.",
      "Added auth middleware and role checks to split learner and admin capabilities across route domains.",
      "Implemented schema validation on body/params to guard module mutations and attempt writes.",
    ],
    result:
      "Delivered a secure and testable API surface for module lifecycle and assessment history operations.",
    metrics: ["13 endpoints", "4 route groups", "Auth + admin guards"],
    stack: "Node.js, Express, middleware validation, role-based guards",
    apiDiagram: {
      theme: "assessment",
      clientLabel: "Learner and Admin Clients",
      gatewayLabel: "Express API Router",
      routeGroups: [
        "/modules (3)",
        "/history (2)",
        "/admin (6)",
        "/me (2)",
      ],
      dataLayerLabel: "Authenticated route layer with validator middleware",
      controlLabel: "requireAdmin guards on analytics and module governance actions",
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
          title="Engineering case studies with architecture context."
          description="Each case highlights the operating problem, system design choices, and measurable outcomes."
          eyebrow="Case Studies"
        />

        <div className="grid gap-6 lg:gap-8">
          {caseStudies.map((study, index) => {
            const detailsHref = study.detailsHref ?? "#contact";
            const isExternal = detailsHref.startsWith("http");

            return (
              <article
                key={study.title}
                className="card card-hover fade-up overflow-hidden border-brand-border bg-white/95 px-5 py-6 lg:px-6"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="flex flex-col gap-2 border-b border-brand-border pb-4">
                  <h3 className="text-2xl font-semibold leading-tight text-brand-navy lg:text-3xl">
                    {study.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {study.subtitle}
                    </p>
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
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr,0.8fr] lg:gap-8">
                  <div className="space-y-5">
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

                  <div className="space-y-4 rounded-xl border border-brand-border bg-brand-muted/45 px-4 py-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Impact
                      </p>
                      <p className="mt-2 text-base font-semibold leading-relaxed text-brand-navy">
                        {study.result}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {study.metrics.map((metric) => (
                          <span key={metric} className="badge-accent border-brand-blue/30 bg-white">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        API Diagram
                      </p>
                      <ApiDiagramCard
                        idPrefix={`case-${index}`}
                        diagram={study.apiDiagram}
                      />
                      <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                        Source: {study.sourcePath}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Tech Stack
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                        {study.stack}
                      </p>
                    </div>
                    <Link
                      href={detailsHref}
                      className="inline-flex items-center rounded-md text-sm font-semibold text-brand-blue transition hover:text-brand-navy hover:underline underline-offset-4"
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                    >
                      View details →
                    </Link>
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
