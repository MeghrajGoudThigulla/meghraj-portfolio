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
              title="Senior AI Developer & Full Stack Engineer"
              place="Threshing Floor Group, Hyderabad • www.tfgorg.com"
              timeline="July 2024–Present"
              bullets={[
                "Architecting scalable intelligence and building production systems that bridge complex deep-tech models with strategic business outcomes.",
                "Engineered 7 high-performance platforms spanning Next.js, React, Flutter, and FastAPI, integrating modern ML pipelines and robust API layers.",
                "Designed cloud-native environments with PostgreSQL/Supabase, integrating Redis rate limiting, Row-Level Security, and scalable background workers.",
                "Managed release cycles, App Store / Play Store publishing, and deployment pipelines for a suite of 4+ custom Flutter apps (Employee Portal, HRMS, LMS, Care Navigator).",
              ]}
            />
          </Section>

          <Section title="SYSTEM SCALE SNAPSHOT">
            <ul className="space-y-2 text-sm leading-relaxed text-brand-charcoal lg:text-base">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                <span>286 total backend API endpoints across 6+ systems</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                <span>61+ SQLAlchemy models with 30+ schema migrations</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                <span>80+ mobile screens and 96+ admin/web pages delivered</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                <span>App Store and Play Store release ownership for 4 distinct operational Flutter apps</span>
              </li>
            </ul>
          </Section>

          <Section title="PROJECTS">
            <Project
              title="TFGenAPI (TFG Verify)"
              subtitle="AI-Powered Background Verification (BGV) Platform (Production / Internal)"
              tech="Next.js 16, Python, FastAPI, MongoDB, PyTesseract, Sentence Transformers"
              bullets={[
                "Built the verification API platform from scratch, owning database design and cross-layer integration components.",
                "Engineered an AI inference pipeline utilizing PyTesseract for OCR and Sentence Transformers to compute dense vector embeddings.",
                "Configured a MongoDB (Motor) data layer to support high-throughput, unstructured document ingestion and ML feature persistence.",
              ]}
              link={{ href: "https://tfgverify.com/", label: "tfgverify.com" }}
            />
            <Project
              title="IYOV AI"
              subtitle="AI-Powered HR & Business Operations Platform (Internal / Pre-release)"
              tech="Python, FastAPI, Flutter, Next.js, PostgreSQL, Redis, AI/ML"
              bullets={[
                "Developed the core payroll module from scratch, translating complex India tax and compliance laws into automated formulas.",
                "Built background job queues using Redis to handle payroll batches, document processing, and bulk worker notifications.",
                "Collaborated with business stakeholders to convert ambiguous operational requirements into shippable platform milestones.",
              ]}
            />
            <Project
              title="TFG Mobile App Suite"
              subtitle="Cross-Platform Operational Applications (Production / Internal)"
              tech="Flutter, Dart, Riverpod, GoRouter, Firebase, REST APIs, iOS, Android"
              bullets={[
                "Authored features and managed App Store / Play Store release cycles for 4+ Flutter apps (Employee Portal, HRMS, LMS, Care Navigator).",
                "Debugged cross-platform API syncs, JWT session handlers, local storage caches, and push notification channels.",
                "Established unified build configurations and automated pipelines, reducing time-to-market for mobile hotfixes.",
              ]}
            />
            <Project
              title="Medical Advisor"
              subtitle="Mission-Critical Healthcare API (Published)"
              tech="Python, FastAPI, PostgreSQL, Redis, Firebase/GCP, Docker"
              bullets={[
                "Architected a FastAPI microservice integrating strict JWT authentication and Google Play Integrity nonces.",
                "Engineered an asynchronous dual-write pipeline synchronizing PostgreSQL transaction state to Firestore for real-time WebSockets.",
                "Acted as the onboarding lead, delivering technical training and knowledge transfer to 8 engineering team members.",
              ]}
              link={{ href: "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor", label: "Play Store" }}
            />
            <Project
              title="TFG SecureBank"
              subtitle="Metadata-Driven Applicant Modernization (Published)"
              tech="Python, FastAPI, SQLAlchemy, Alembic, PostgreSQL, Redis, WeasyPrint"
              bullets={[
                "Architected a multi-tenant FastAPI backend exposing 70 RESTful endpoints, dynamically routed between PostgreSQL/Supabase and legacy MySQL backends.",
                "Engineered a dynamic rules engine using openpyxl and xlcalculator to parse and execute complex credit validation matrices directly from Excel templates.",
                "Integrated WeasyPrint and Jinja2 templates to compile and output dynamic, tamper-proof, legally binding loan agreement PDF documents.",
              ]}
              link={{ href: "https://tfgsecurebank.com/", label: "tfgsecurebank.com" }}
            />
            <Project
              title="DealsMart"
              subtitle="Enterprise Commerce Platform (Internal / Pre-release)"
              tech="Flutter, FastAPI, PostgreSQL, Redis, RQ workers, S3/MinIO"
              bullets={[
                "Engineered a monolithic FastAPI layer interfacing with PostgreSQL to enforce strict ACID compliance across cart mutations.",
                "Implemented an event-driven architecture using distributed RQ workers and Redis for idempotent payment reconciliation.",
                "Delivered a cross-platform presentation layer using Flutter, utilizing S3/MinIO for scalable object storage.",
              ]}
            />
            <Project
              title="TFG Corporate Website"
              subtitle="Corporate Marketing Presence (Published)"
              tech="Next.js, React, Flask, MySQL, Bootstrap"
              bullets={[
                "Led the modernization from a legacy static structure to a Next.js framework (tfg_website_next) for enhanced performance and SEO.",
                "Integrated contact and subscription routes with the Flask API backend (tfg_website_server) while preserving static HTML fallbacks.",
                "Maintained high reliability and zero downtime during the platform migration for the global firm."
              ]}
              link={{ href: "https://tfgroup.ai/en", label: "tfgroup.ai" }}
            />
            <Project
              title="GroConnect"
              subtitle="AI-Powered IT Solutions & Training Platform (Published)"
              tech="HTML5, CSS3, JavaScript, PHP, Node.js"
              bullets={[
                "Developed the public client web portal showcasing custom software, DevOps, cloud migrations, and corporate IT services.",
                "Wired secure dynamic forms to a local PHP/Node contact server with transactional notifications and logs.",
                "Designed and built landing zones for the GroC-Training sub-platform, supporting 30-day corporate AI training enrollment."
              ]}
            />
          </Section>

          <Section title="SKILLS">
            <SkillGroup
              items={[
                { label: "Languages", value: "Python, Dart, JavaScript, TypeScript, C++" },
                { label: "Backend Frameworks", value: "FastAPI, Flask, Express" },
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
