export interface ResumeContactLink {
  href: string;
  label: string;
}

export interface ResumeExperience {
  title: string;
  period: string;
  company: string;
  companyUrl: string;
  companyDisplay: string;
  bullets: string[];
}

export interface ResumeSkillCategory {
  category: string;
  skills: string;
}

export interface ResumeProject {
  title: string;
  subtitle: string;
  tech: string;
  url?: string;
  urlLabel?: string;
  bullets: string[];
}

export interface AdditionalProject {
  title: string;
  tech: string;
  details: string;
  url?: string;
  urlLabel?: string;
}

export interface ResumeEducation {
  degree: string;
  period: string;
  institution: string;
}

export interface ResumeCertificationCategory {
  issuer: string;
  items: string[];
}

export interface ResumeData {
  name: string;
  contactLinks: ResumeContactLink[];
  experience: ResumeExperience;
  skills: ResumeSkillCategory[];
  projects: ResumeProject[];
  additionalProjects: AdditionalProject[];
  education: ResumeEducation;
  certifications: ResumeCertificationCategory[];
}

export const resumeData: ResumeData = {
  name: "Thigulla Meghraj Goud",
  contactLinks: [
    { href: "mailto:meghraj.thigulla@outlook.com", label: "meghraj.thigulla@outlook.com" },
    { href: "https://www.linkedin.com/in/meghraj-goud-thigulla", label: "LinkedIn" },
    { href: "https://meghraj-portfolio.web.app/", label: "Portfolio" },
    { href: "https://github.com/MeghrajGoudThigulla", label: "GitHub" },
    { href: "https://linktr.ee/meghraj_goud_thigulla", label: "Certificates" },
  ],
  experience: {
    title: "Senior AI Developer & Full Stack Engineer",
    period: "July 2024 - Oct 2026",
    company: "Threshing Floor Group, Hyderabad",
    companyUrl: "https://tfgroup.ai/en",
    companyDisplay: "tfgroup.ai",
    bullets: [
      "Delivered backend infrastructure with 286 endpoints, 61+ database models, and 30+ Alembic/Prisma schema migrations across multiple production products.",
      "Shipped 80+ mobile screens and 96+ web interfaces using Flutter, React, and Next.js on FastAPI backends.",
      "Owned App Store / Play Store releases and deployment pipelines for 4+ Flutter apps (Employee Portal, HRMS, LMS, Care Navigator).",
      "Designed PostgreSQL/Supabase data layers with Row-Level Security, Redis rate limiting, Celery webhook workers, and dual-store WebSocket sync.",
      "Integrated ML pipelines (OCR, embeddings) and third-party provider APIs into production FastAPI services.",
      "Converted ambiguous requirements into shippable milestones as technical consultant to executive stakeholders; led knowledge transfer for 8 engineers.",
    ],
  },
  skills: [
    {
      category: "Languages",
      skills: "Python, Dart, JavaScript, TypeScript, C++",
    },
    {
      category: "Backend",
      skills: "FastAPI, Flask, Express, Celery, SQLAlchemy, Alembic, Prisma",
    },
    {
      category: "Frontend & Mobile",
      skills: "Flutter, React, Next.js, Tailwind CSS, MUI",
    },
    {
      category: "Databases",
      skills: "PostgreSQL, MySQL, MongoDB, Redis, Firestore, Supabase",
    },
    {
      category: "Architecture",
      skills: "REST APIs, RBAC, JWT, Rate Limiting, Caching, WebSockets, Webhooks, Row-Level Security",
    },
    {
      category: "AI/ML & OCR",
      skills: "ONNX Runtime, PaddleOCR, PyTesseract, Sentence Transformers, Embeddings, Model Gateway Services",
    },
    {
      category: "DevOps & Tooling",
      skills: "Docker, AWS EC2, nginx, systemd, Git",
    },
  ],
  projects: [
    {
      title: "IYOV AI",
      subtitle: "AI-Powered Workforce Management Ecosystem",
      tech: "Python, FastAPI, Flutter, Riverpod, GoRouter, Next.js, PostgreSQL, Redis, Firebase",
      url: "https://iyov.ai/",
      urlLabel: "iyov.ai",
      bullets: [
        "Built the India tax and compliance payroll module from scratch, automating complex statutory rules into payroll formulas.",
        "Automated payroll batches, document processing, and bulk worker notifications with Redis-backed job queues.",
        "Released 4+ companion Flutter apps (Employee Portal, HRMS, LMS, Care Navigator) to App Store / Play Store.",
        "Unified mobile build configurations and automated pipelines, shortening turnaround for critical hotfixes.",
      ],
    },
    {
      title: "TFG SecureBank",
      subtitle: "Digital Fintech Application",
      tech: "Python, FastAPI, SQLAlchemy, Alembic, PostgreSQL, Redis, WeasyPrint",
      url: "https://tfgsecurebank.com/",
      urlLabel: "tfgsecurebank.com",
      bullets: [
        "Architected a multi-tenant FastAPI backend with 70 REST endpoints, routing between PostgreSQL/Supabase and legacy MySQL.",
        "Created a rules engine with openpyxl and xlcalculator that executes credit validation matrices directly from Excel templates.",
        "Generated tamper-evident loan agreement PDFs with WeasyPrint and Jinja2 templates.",
      ],
    },
    {
      title: "TFGenAPI",
      subtitle: "Verification & Custom API Platform",
      tech: "Next.js 16, Python, FastAPI, MongoDB, PyTesseract, Sentence Transformers",
      url: "https://tfgenapi.ai/",
      urlLabel: "tfgenapi.ai",
      bullets: [
        "Built the verification API platform end to end, owning database design and cross-layer integration.",
        "Implemented an AI inference pipeline: PyTesseract OCR plus Sentence Transformers embeddings for document matching.",
        "Configured a MongoDB (Motor) layer for high-throughput unstructured document ingestion and ML feature persistence.",
        "Added Celery/Redis task queues for asynchronous verification flows and webhook notifications.",
      ],
    },
    {
      title: "Medical Advisor",
      subtitle: "Mission-Critical Healthcare API",
      tech: "Python, FastAPI, PostgreSQL, Redis, Firebase/GCP, Docker",
      url: "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor&pcampaignid=web_share",
      urlLabel: "Play Store",
      bullets: [
        "Architected a FastAPI microservice secured with strict JWT authentication and Google Play Integrity nonces.",
        "Designed an asynchronous dual-write pipeline syncing PostgreSQL transaction state to Firestore for real-time WebSockets.",
        "Trained and onboarded 8 engineers as technical lead for knowledge transfer.",
      ],
    },
  ],
  additionalProjects: [
    {
      title: "DealsMart",
      tech: "Flutter, FastAPI, PostgreSQL, RQ workers",
      details: "ACID cart mutations, idempotent payment reconciliation; pre-release",
    },
    {
      title: "TFG Corporate Website",
      tech: "Next.js, Flask",
      details: "zero-downtime migration from legacy static site",
      url: "https://tfgroup.ai/en",
      urlLabel: "tfgroup.ai",
    },
    {
      title: "GroConnect",
      tech: "PHP, Node.js",
      details: "client portal and AI training platform",
    },
  ],
  education: {
    degree: "Bachelor of Technology in Information Technology",
    period: "2020 — 2024",
    institution: "Vignana Bharathi Institute of Technology (VBIT), Ghatkesar",
  },
  certifications: [
    {
      issuer: "AWS Academy",
      items: [
        "Cloud Foundations",
        "Machine Learning Foundations",
        "AI-ML Virtual Internship",
      ],
    },
    {
      issuer: "Cisco",
      items: [
        "Networking Essentials",
        "Introduction to Cybersecurity",
        "Cybersecurity Essentials",
      ],
    },
    {
      issuer: "Fortinet",
      items: [
        "Certified Fundamentals",
        "Certified Associate in Cybersecurity",
        "Network Security Associate Virtual Internship",
      ],
    },
    {
      issuer: "Celonis",
      items: [
        "Foundations",
        "Academic Process Mining Fundamentals",
        "Execution Management Consulting Program",
      ],
    },
  ],
};
