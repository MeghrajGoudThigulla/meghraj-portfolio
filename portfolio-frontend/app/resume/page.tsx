import Link from "next/link";

export const metadata = {
  title: "Résumé | Meghraj Goud",
  description:
    "Printable résumé for Meghraj Goud highlighting full-stack delivery, security, and leadership.",
};

const contactLinks = [
  { href: "tel:+917997221772", label: "+91 79972 21772" },
  { href: "mailto:meghraj.thigulla@outlook.com", label: "meghraj.thigulla@outlook.com" },
  { href: "https://github.com/MeghrajGoudThigulla", label: "GitHub" },
  { href: "https://www.linkedin.com/in/meghraj-goud-thigulla", label: "LinkedIn" },
  { href: "https://linktr.ee/meghraj_goud_thigulla", label: "Certificates" },
];

export default function ResumePage() {
  return (
    <div className="bg-brand-bg text-brand-charcoal">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="flex flex-col items-center gap-3 rounded-2xl border border-brand-charcoal/10 bg-brand-surface px-4 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
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
          <div className="flex gap-3">
            <Link
              href="/"
              className="btn btn-secondary"
            >
              Back to Portfolio
            </Link>
          </div>
        </header>

        <main className="grid gap-6">
          <Section title="EXPERIENCE">
            <Role
              title="Full Stack Developer"
              place="Threshing Floor Group, Hyderabad"
              timeline="July 2024–Present"
              bullets={[
                "Led end-to-end development across Android, iOS, and Web using Flutter, Firebase, Python, and Bootstrap, cutting cross-platform engineering overhead by 30% and accelerating release cycles.",
                "Architected and implemented core modules for an upcoming e-commerce platform, delivering 60% of the MVP and enabling the planned onboarding of 1K+ users for the Q1 launch.",
                "Increased app responsiveness by 25% through optimized API design, Firestore query restructuring, caching strategies, and modular UI refactoring.",
                "Collaborated with product, design, and business stakeholders to convert requirements into scalable solutions with rapid iteration and measurable user impact.",
                "Improved efficiency by introducing reusable design components, uniform API contracts, and automated build/test flows across mobile and web.",
              ]}
            />
          </Section>

          <Section title="PROJECTS">
            <Project
              title="Medical Advisor"
              subtitle="Mobile app for medical services with real-time support and admin tools."
              link={{ href: "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor", label: "Play Store" }}
              tech="Flutter (Android/iOS), Firebase Auth/Firestore/Storage, Google Maps/Places; FastAPI, SQLAlchemy, PostgreSQL, Play Integrity, Flutter Web Admin"
              bullets={[
                "Added Play Integrity guard with secure nonce generation to block unauthorized service requests at scale.",
                "Unified Firebase ID Token authentication across user and admin flows; dual Firestore writes for instant UI sync.",
                "Built service, profile, and scheduling modules; compliant account deletion with audit logs.",
                "Integrated file uploads via Firebase Storage and retrieval pipelines for admin operations.",
                "Developed admin APIs (list, search, pagination) plus CORS and environment setup for stable deployment.",
              ]}
            />
            <Project
              title="GroConnect"
              subtitle="Professional networking platform for profiles, peers, and curated opportunities."
              link={{ href: "https://groconnect.in", label: "groconnect.in" }}
              tech="Python, Flask, MongoDB, HTML/CSS, JavaScript, Bootstrap"
              bullets={[
                "Implemented onboarding, profile creation, and peer-connection workflows using Flask and MongoDB.",
                "Built responsive UI modules, improving engagement across mobile and desktop.",
                "Designed scalable data models and optimized MongoDB queries for fast search and retrieval.",
                "Reduced page load time by refactoring layouts and removing redundant network calls.",
              ]}
            />
            <Project
              title="Blockchain-Based Fake Product Identification System"
              subtitle="Platform for verifying product authenticity using tamper-proof smart contracts."
              tech="Java, Solidity, Ethereum (Ganache), Web3.js, MySQL"
              bullets={[
                "Developed Solidity contracts for generating immutable product hashes for counterfeit prevention.",
                "Built Java backend integrated with Ethereum via Web3.js for registration and validation.",
                "Designed user-facing verification flows through QR/product codes with MySQL-backed audit logging.",
              ]}
            />
            <Project
              title="AI Therapist Using NLP"
              subtitle="AI chatbot offering sentiment-aware conversational support."
              tech="Python, TensorFlow, PyTorch, NLTK, Scikit-learn"
              bullets={[
                "Built sentiment classification pipeline to analyze user intent and emotional tone.",
                "Implemented full NLP preprocessing stack including tokenization, stemming, and normalization.",
                "Trained deep learning dialogue models for personalized, context-aware responses.",
                "Designed safety rule engine to detect crisis cues and recommend professional help.",
              ]}
            />
          </Section>

          <Section title="SKILLS">
            <SkillGroup
              items={[
                { label: "Languages", value: "Python, Dart, JavaScript, C++" },
                { label: "Frameworks", value: "Flutter, FastAPI, Flask" },
                { label: "Mobile", value: "Flutter (Android & iOS), Firebase" },
                { label: "Backend", value: "REST APIs, SQLAlchemy, Authentication, Caching" },
                { label: "Database", value: "PostgreSQL, MySQL, MongoDB, Firestore" },
                { label: "Tools", value: "Git, Docker, Android Studio, VS Code" },
                { label: "Concepts", value: "System Design Basics, OOP, DSA, MVC/MVVM, CI/CD" },
              ]}
            />
          </Section>

          <Section title="EDUCATION">
            <Role
              title="Bachelor of Technology in Information Technology"
              place="Vignana Bharathi Institute of Technology (VBIT), Ghatkesar"
              timeline="2020–2024"
              bullets={[
                "Relevant Coursework: Data Structures and Algorithms, Software Engineering, DBMS, Computer Networks, Information Security, AI/ML, Design and Analysis of Algorithms.",
              ]}
            />
          </Section>

          <Section title="EXTRA-CURRICULAR ACTIVITIES">
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
    <section className="rounded-2xl border border-brand-charcoal/10 bg-brand-surface px-4 py-5 shadow-sm lg:px-6 lg:py-6">
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
      "Coordinated logistics, venue planning, and event flow for a cultural and technical festival with 2,500+ attendees across 6+ student divisions.",
  },
  {
    title: "Co-Founder, Sama Sangathan",
    detail:
      "Led women’s safety and empowerment programs impacting 500+ students through workshops, outreach, and collaboration with college leadership.",
  },
  {
    title: "Executive Member, Institute of Student Engineering VBIT SS",
    detail:
      "Drove student engagement, generating 132 new leads and supporting an incubation-focused vertical.",
  },
  {
    title: "Volunteer, Denaurlen's 3C Festival (T-HUB 2.0)",
    detail:
      "Managed hospitality, logistics, and VIP coordination for a high-visibility tech product launch to ensure smooth operations.",
  },
];
