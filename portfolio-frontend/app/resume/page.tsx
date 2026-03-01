import Link from "next/link";
import ResumeHighlightsBar from "@/components/ResumeHighlightsBar";
import ResumeStickyActions from "@/components/ResumeStickyActions";

export const metadata = {
  title: "Résumé | Meghraj Goud",
  description:
    "Printable résumé for Meghraj Goud highlighting full-stack delivery, security, and leadership.",
};

const contactLinks = [
  { href: "tel:+917997221772", label: "+91 79972 21772" },
  { href: "mailto:meghraj.thigulla@outlook.com", label: "meghraj.thigulla@outlook.com" },
  { href: "https://www.linkedin.com/in/meghraj-goud-thigulla", label: "LinkedIn" },
  { href: "https://meghraj-portfolio.web.app/", label: "Portfolio" },
  { href: "https://github.com/MeghrajGoudThigulla", label: "GitHub" },
  { href: "https://linktr.ee/meghraj_goud_thigulla", label: "Certificates" },
];

export default function ResumePage() {
  return (
    <div className="resume-page bg-brand-bg text-brand-charcoal">
      <div className="resume-shell mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <ResumeStickyActions />

        <header className="resume-header flex flex-col items-center gap-3 rounded-2xl border border-brand-charcoal/10 bg-brand-surface px-4 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-brand-navy lg:text-4xl">
              THIGULLA MEGHRAJ GOUD
            </h1>
            <p className="mt-2 flex flex-wrap justify-center gap-3 text-sm text-brand-charcoal sm:justify-start">
              {contactLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-brand-blue"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </p>
          </div>
        </header>

        <ResumeHighlightsBar />

        <main id="main-content" tabIndex={-1} className="resume-content grid gap-6">
          <Section title="EXPERIENCE">
            <Role
              title="Full Stack Developer"
              place="Threshing Floor Group, Hyderabad • www.tfgorg.com"
              timeline="July 2024–Present"
              bullets={[
                "Architected and delivered 4 full-stack platforms spanning Flutter mobile apps (80+ screens), React/MUI web systems (47+ pages), and backend services totaling 318 REST API endpoints across FastAPI, Spring Boot, and Express.",
                "Designed and maintained 3 FastAPI services exposing 305 endpoints with JWT authentication, role-based access control (RBAC), Redis rate limiting, background workers, and object storage integrations.",
                "Modeled relational systems using PostgreSQL and MySQL with 61+ SQLAlchemy models and 20+ schema migrations; implemented transactional writes, audit logging, and soft-delete patterns.",
                "Built asynchronous webhook pipelines, Redis caching layers, Firebase Admin integrations, and secure token verification workflows across production and internal platforms.",
              ]}
            />
          </Section>

          <Section title="SYSTEM SCALE SNAPSHOT">
            <ul className="space-y-2 text-sm leading-relaxed text-brand-charcoal lg:text-base">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                <span>318 total backend API endpoints across 4 systems</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                <span>305 FastAPI endpoints across 3 services</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                <span>61+ SQLAlchemy models with 20+ schema migrations</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                <span>80+ mobile screens and 96+ admin/web pages delivered</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                <span>Redis rate limiting, async webhook workers, and transactional DB writes</span>
              </li>
            </ul>
          </Section>

          <Section title="PROJECTS">
            <Project
              title="DEALSMART"
              subtitle="Commerce platform (Internal / Pre-release) with customer mobile app and operations admin system."
              tech="Flutter, FastAPI, PostgreSQL, Redis, MinIO/S3"
              bullets={[
                "Built a Flutter customer application (23 screens, 6-tab navigation) and a 41-page Flutter Web admin dashboard.",
                "Developed a FastAPI backend with 134 REST endpoints across 23 routers covering auth, catalog, cart, orders, payments, reporting, and admin workflows.",
                "Designed a commerce-grade PostgreSQL schema with 42 SQLAlchemy models and 13 Alembic migrations supporting orders, shipments, refunds, RMAs, and inventory tracking.",
                "Implemented Redis-based global rate limiting and RQ background workers for asynchronous payment webhook processing with idempotent event tracking.",
              ]}
            />
            <Project
              title="TFG SecureBank"
              subtitle="Enterprise form-builder and workflow platform (Backend modernization from Spring Boot to FastAPI)."
              tech="React (MUI), FastAPI, MySQL, Redis, SQLAlchemy, Alembic"
              bullets={[
                "Contributing to migration from legacy Spring Boot backend to a modular FastAPI platform (103 endpoints across 20 routers).",
                "Delivered a 47-page React/MUI admin UX supporting dynamic form configuration, dashboards, and workflow management.",
                "Shipped feature-flagged applicant lifecycle flows including signup/login, email verification, draft save/resume, and submission APIs.",
                "Implemented observability endpoints, Redis-backed status rate limiting, and upload cleanup tracking with correlation-ID logging.",
              ]}
            />
            <Project
              title="Medical Advisor"
              subtitle="Published production healthcare platform enabling ambulance requests, scheduling, subscriptions, and real-time support via mobile and web admin systems."
              link={{ href: "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor", label: "Play Store" }}
              tech="Flutter (Android/iOS), Flutter Web, FastAPI, PostgreSQL, Firebase Auth/Firestore/Storage, Redis, Google Maps"
              bullets={[
                "Built a multi-app architecture comprising Flutter mobile apps, a Flutter Web admin dashboard, and a FastAPI backend backed by PostgreSQL.",
                "Implemented Firebase ID Token authentication for users and JWT-based auth with role enforcement for admin APIs.",
                "Integrated Google Play Integrity with secure nonce generation, 5-minute TTL validation, and live request tracking refreshed every 15 seconds to block unauthorized access.",
                "Designed core service workflows for requests, scheduling, profiles, and support, using Postgres as the source of truth with selective Firestore dual-writes for real-time UI sync.",
                "Added Redis caching for advertisements and global settings with 5-minute TTLs, significantly reducing database read load.",
                "Integrated Firebase Storage for secure image and document uploads, exposing controlled access via admin APIs.",
                "Built admin-facing APIs for status management, search, pagination, support chats, and operational configuration with production-ready CORS and environment isolation.",
              ]}
            />
            <Project
              title="Personal Portfolio Platform"
              subtitle="Published full-stack portfolio platform with backend controls for secure lead capture and operational reliability."
              tech="Next.js (App Router), Node.js, Express, Prisma, PostgreSQL, TypeScript"
              bullets={[
                "Built a Next.js App Router frontend with modular components and static export for lightweight, fast deployments.",
                "Developed a Node/Express API backed by Prisma and PostgreSQL to handle contact submissions and backend workflows.",
                "Implemented per-IP rate limiting (20 requests per 15 minutes) to protect contact endpoints from abuse.",
                "Added TLS/CA-based secure Postgres connectivity and resilient email notifications using Resend.",
                "Configured environment-based CORS policies and deployment-ready infrastructure for reliable production hosting.",
              ]}
            />
            <Project
              title="GroConnect"
              subtitle="Published professional networking platform for profiles, peers, and curated opportunities."
              link={{ href: "https://groconnect.in", label: "groconnect.in" }}
              tech="Python, Flask, MongoDB, HTML/CSS, JavaScript, Bootstrap"
              bullets={[
                "Implemented onboarding, profile creation, and peer-connection workflows using Flask and MongoDB.",
                "Built responsive UI modules, improving engagement across mobile and desktop.",
                "Designed scalable data models and optimized MongoDB queries for fast search and retrieval.",
                "Reduced page load time by refactoring layouts and removing redundant network calls.",
              ]}
            />
          </Section>

          <Section title="SKILLS">
            <SkillGroup
              items={[
                { label: "Languages", value: "Python, Dart, JavaScript, TypeScript, C++" },
                { label: "Backend Frameworks", value: "FastAPI, Flask, Express, Spring Boot" },
                { label: "Frontend & Mobile", value: "Flutter (Android/iOS), React (MUI), Next.js" },
                { label: "Databases", value: "PostgreSQL, MySQL, MongoDB, Redis, Firestore" },
                { label: "Architecture", value: "REST API Design, RBAC, JWT, Rate Limiting, Caching, Background Workers, Transaction Management" },
                { label: "DevOps & Tooling", value: "Docker, Alembic, SQLAlchemy, Prisma, Git" },
              ]}
            />
          </Section>

          <Section title="EDUCATION">
            <Role
              title="Bachelor of Technology in Information Technology"
              place="Vignana Bharathi Institute of Technology (VBIT), Ghatkesar"
              timeline="2020–2024"
              bullets={[]}
            />
          </Section>

          <Section title="LEADERSHIP HIGHLIGHTS">
            <ul className="space-y-3 text-sm leading-relaxed text-brand-charcoal lg:text-base">
              {activities.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                  <div>
                    <p className="font-semibold text-brand-navy">{item.title}</p>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        </main>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume-section rounded-2xl border border-brand-charcoal/10 bg-brand-surface px-4 py-5 shadow-sm lg:px-6 lg:py-6">
      <h2 className="text-xl font-semibold uppercase tracking-[0.14em] text-brand-navy">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Role({
  title,
  place,
  timeline,
  bullets,
}: {
  title: string;
  place: string;
  timeline: string;
  bullets: string[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-brand-navy">{title}</p>
          <p className="text-sm font-medium text-slate-600">{place}</p>
        </div>
        <p className="text-sm font-semibold text-brand-blue">{timeline}</p>
      </div>
      {bullets.length > 0 ? (
        <ul className="space-y-2 text-sm leading-relaxed text-brand-charcoal lg:text-base">
          {bullets.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Project({
  title,
  subtitle,
  tech,
  bullets,
  link,
}: {
  title: string;
  subtitle: string;
  tech: string;
  bullets: string[];
  link?: { href: string; label: string };
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="text-lg font-semibold text-brand-navy">{title}</p>
        {link ? (
          <Link
            href={link.href}
            className="text-sm font-semibold text-brand-blue hover:text-brand-navy"
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </Link>
        ) : null}
      </div>
      <p className="text-sm italic text-brand-charcoal lg:text-base">{subtitle}</p>
      <p className="text-sm font-semibold text-slate-600">
        Tech: <span className="font-normal text-brand-charcoal">{tech}</span>
      </p>
      <ul className="space-y-2 text-sm leading-relaxed text-brand-charcoal lg:text-base">
        {bullets.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillGroup({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded border border-brand-charcoal/10 bg-brand-bg px-3 py-3"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
            {item.label}
          </p>
          <p className="mt-1 text-sm text-brand-charcoal lg:text-base">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

const activities = [
  {
    title: "Organizing Committee, VIBHA 2K24",
    detail:
      "Coordinated logistics and cross-team execution for a 2,500+ attendee campus festival.",
  },
  {
    title: "Co-Founder, Sama Sangathan",
    detail:
      "Led women’s safety and empowerment initiatives through workshops and awareness programs impacting 500+ students.",
  },
];
