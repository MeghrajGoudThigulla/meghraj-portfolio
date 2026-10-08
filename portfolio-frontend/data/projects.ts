import { type ApiDiagramModel } from "@/components/ApiDiagramCard";

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectCategory =
  | "Verification & Platform"
  | "AI & HR"
  | "FinTech"
  | "Healthcare"
  | "Commerce";

export type Project = {
  title: string;
  category: ProjectCategory;
  subtitle: string;
  status: "Production / Internal" | "Internal / Pre-release" | "Published";
  problem: string;
  action: string[];
  result: string;
  metrics: string[];
  stack: string;
  apiDiagram: ApiDiagramModel;
  links?: ProjectLink[];
};

export type AdditionalProject = {
  title: string;
  href: string;
  description: string;
  linkText: string;
};

export const PROJECTS_SECTION_HEADER = {
  title: "Selected Engineering Work",
  description: "Production and internal systems I've worked across, ordered by the depth of ownership and technical responsibility they demonstrate. Proprietary projects are described at a high level without exposing private source code.",
  eyebrow: "ENGINEERING WORK",
};

export const projectsData: Project[] = [
  {
    title: "TFGenAPI",
    category: "Verification & Platform",
    subtitle: "Verification & Custom API Platform",
    status: "Production / Internal",
    problem: "Verification products need dependable API boundaries, provider integrations, asynchronous workflows, security controls, and enough flexibility to evolve with business requirements.",
    action: [
      "Built the verification API platform from scratch, owning database design and cross-layer integration components.",
      "Engineered an AI inference pipeline utilizing PyTesseract for OCR and Sentence Transformers to compute dense vector embeddings.",
      "Configured a MongoDB (Motor) data layer to support high-throughput, unstructured document ingestion and ML feature persistence.",
      "Integrated Celery/Redis task queues for asynchronous verification flows and webhook notifications."
    ],
    result: "A reusable backend foundation for verification and custom API workflows, built to support evolving product requirements without turning every change into a new system.",
    metrics: ["Built from Scratch", "Backend Ownership", "R&D + Debugging"],
    stack: "Python, FastAPI, PostgreSQL, Redis, REST APIs, Next.js, TypeScript",
    apiDiagram: { theme: "banking", clientLabel: "Enterprise Dashboard & API Consumers", gatewayLabel: "FastAPI Route Handlers", routeGroups: ["identity verification", "user consent", "event webhooks", "billing & audit"], dataLayerLabel: "PostgreSQL RLS + Redis Queue", controlLabel: "Organization RBAC & Hash API Keys" },
    links: [{ label: "Live API Platform", href: "https://tfgenapi.ai/" }]
  },
  {
    title: "IYOV AI",
    category: "AI & HR",
    subtitle: "AI-Powered Workforce Management Ecosystem",
    status: "Internal / Pre-release",
    problem: "HR and business operations combine complex employee pipelines, verification, payroll, compliance, and multi-surface applications where correctness and real-time synchronization matter at scale.",
    action: [
      "Built the India tax and compliance payroll module from scratch, automating complex statutory rules into payroll formulas.",
      "Automated payroll batches, document processing, and bulk worker notifications with Redis-backed job queues.",
      "Designed PostgreSQL and Supabase data layers with Row-Level Security, Redis rate limiting, and Celery webhook workers.",
      "Integrated candidate evaluation pipelines and third-party provider APIs into production FastAPI services."
    ],
    result: "An AI-powered workforce management ecosystem with payroll, LMS, portal, and employee workflows that sync across web and mobile platforms.",
    metrics: ["Workforce Ecosystem", "Payroll Ownership", "Asynchronous Queues"],
    stack: "Python, FastAPI, Next.js, TypeScript, PostgreSQL, Redis, Celery",
    apiDiagram: { theme: "assessment", clientLabel: "Recruiter Web & Admin Dashboard", gatewayLabel: "FastAPI REST Service", routeGroups: ["candidate screening", "ats pipeline", "interview workflows", "background check"], dataLayerLabel: "PostgreSQL + Redis Queue", controlLabel: "OAuth2 & Token Sync" },
    links: [
      { label: "Web Portal", href: "https://iyov.ai/" },
      { label: "CRM Portal", href: "https://crm.iyov.ai/crm" },
    ]
  },
  {
    title: "TFG SecureBank",
    category: "FinTech",
    subtitle: "Digital Fintech Application",
    status: "Production / Internal",
    problem: "Financial workflows require secure applicant journeys, backend validation, document handling, tenant-aware access, and reliable communication across web and mobile surfaces.",
    action: [
      "Architected a multi-tenant FastAPI backend with 70 REST endpoints, routing between PostgreSQL/Supabase and legacy MySQL.",
      "Created a rules engine with openpyxl and xlcalculator that executes credit validation matrices directly from spreadsheet models.",
      "Generated tamper-evident loan agreement PDFs with WeasyPrint and Jinja2 templates.",
      "Managed system migrations and resolved production infrastructure failures directly on live instances."
    ],
    result: "A multi-surface financial platform connecting applicant workflows, backend services, web interfaces, and mobile experiences.",
    metrics: ["FinTech Domain", "70 REST Endpoints", "Backend Engineering"],
    stack: "Python, FastAPI, SQLAlchemy, Alembic, PostgreSQL, Redis, WeasyPrint",
    apiDiagram: { theme: "banking", clientLabel: "React Web + Mobile Client", gatewayLabel: "FastAPI Application API", routeGroups: ["auth", "products", "applications", "file_uploads"], dataLayerLabel: "PostgreSQL on Supabase", controlLabel: "Multitenancy & Session Security" },
    links: [{ label: "Live Platform", href: "https://tfgsecurebank.com/" }]
  },
  {
    title: "Medical Advisor",
    category: "Healthcare",
    subtitle: "Mission-Critical Healthcare API",
    status: "Published",
    problem: "Healthcare coordination requires dependable mobile workflows, protected APIs, real-time information, and resilient handling of operational data.",
    action: [
      "Architected a FastAPI microservice secured with strict JWT authentication and Google Play Integrity nonces.",
      "Designed an asynchronous dual-write pipeline syncing PostgreSQL transaction state to Firestore for real-time WebSockets.",
      "Trained and onboarded 8 engineers as technical lead for knowledge transfer.",
      "Debugged system integrations, JWT session handlers, and device sync APIs."
    ],
    result: "A production healthcare platform that also became an internal technical onboarding reference for new team members.",
    metrics: ["FastAPI Microservice", "Dual-Write Sync", "8 KT Sessions"],
    stack: "Python, FastAPI, PostgreSQL, Redis, Firebase/GCP, Docker",
    apiDiagram: { theme: "healthcare", clientLabel: "Flutter Mobile Clients + Admin Web", gatewayLabel: "FastAPI Sync Gateway", routeGroups: ["admin sync", "realtime dual-write", "ai inference", "data pipelines"], dataLayerLabel: "PostgreSQL + Firestore + Redis", controlLabel: "Firebase Auth & Inference Queue" },
    links: [{ label: "Google Play Store", href: "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor&pcampaignid=web_share" }]
  },
  {
    title: "DealsMart",
    category: "Commerce",
    subtitle: "Enterprise Commerce Platform",
    status: "Internal / Pre-release",
    problem: "Enterprise commerce requiring strict transactional integrity across cart mutations and asynchronous payment reconciliation.",
    action: [
      "Engineered monolithic FastAPI backend interfacing with PostgreSQL to enforce strict ACID compliance across cart mutations.",
      "Implemented event-driven architecture using distributed RQ workers and Redis for idempotent payment reconciliation.",
      "Delivered cross-platform presentation layer using Flutter with object storage integration."
    ],
    result: "ACID-compliant cart processing and resilient, idempotent payment reconciliation workflows.",
    metrics: ["ACID Cart Mutations", "Payment Reconciliation", "Pre-release"],
    stack: "Flutter, FastAPI, PostgreSQL, Redis, RQ workers",
    apiDiagram: { theme: "commerce", clientLabel: "Flutter Client App", gatewayLabel: "FastAPI REST Service", routeGroups: ["cart mutations", "checkout flow", "payment webhook", "order history"], dataLayerLabel: "PostgreSQL + Redis Queue", controlLabel: "ACID Transactions & RQ Workers" },
  },
  {
    title: "IYOV AI Mobile",
    category: "AI & HR",
    subtitle: "Multi-App Mobile Suite (Android & iOS)",
    status: "Published",
    problem: "Multi-app workforce operations across portals, HRMS, LMS, and care management require unified release cycles and synchronized mobile build pipelines.",
    action: [
      "Owned App Store and Play Store releases and deployment pipelines for 4+ Flutter apps (Employee Portal, HRMS, LMS, Care Navigator).",
      "Unified mobile build configurations and automated pipelines, shortening turnaround for critical hotfixes.",
      "Maintained cross-platform presentation layers with FastAPI backends and real-time state synchronization."
    ],
    result: "Published and maintained a suite of 4+ companion Flutter applications across Apple App Store and Google Play.",
    metrics: ["4+ Flutter Apps", "Store Ownership", "Automated Pipelines"],
    stack: "Flutter, Dart, Riverpod, GoRouter, Fastlane, GitHub Actions",
    apiDiagram: { theme: "assessment", clientLabel: "iOS & Android Flutter Apps", gatewayLabel: "FastAPI Gateway", routeGroups: ["employee portal", "hrms mobile", "lms player", "care navigator"], dataLayerLabel: "Local State (Riverpod) + Remote Sync", controlLabel: "Play Integrity & Store Build Pipelines" },
    links: [
      { label: "Portal App (Play Store)", href: "https://play.google.com/store/apps/details?id=ai.iyov.jobs&pcampaignid=web_share" },
      { label: "HRMS App (Play Store)", href: "https://play.google.com/store/apps/details?id=ai.iyov.hrms&pcampaignid=web_share" },
      { label: "HRMS App (App Store)", href: "https://apps.apple.com/in/app/iyov-hrms/id6798589436" },
      { label: "Employee App (Play Store)", href: "https://play.google.com/store/apps/details?id=ai.iyov.employee&pcampaignid=web_share" },
      { label: "LMS App (App Store)", href: "https://apps.apple.com/in/app/iyov-lms/id6800318336" },
    ]
  }
];

export const ADDITIONAL_PROJECTS: AdditionalProject[] = [
  {
    title: "TFG Corporate Website",
    href: "https://tfgroup.ai/en",
    description: "Next.js, Flask; zero-downtime migration from legacy static site",
    linkText: "tfgroup.ai ↗",
  },
  {
    title: "GroConnect",
    href: "https://groconnect.co.in/",
    description: "PHP, Node.js; client portal and AI training platform",
    linkText: "groconnect.co.in ↗",
  },
];
