export type HeroTrustBadge = {
  id: string;
  title: string;
  detail: string;
  proofRef: string;
};

export type HeroMetricCard = {
  label: string;
  value: string;
  detail: string;
};

export const HERO_EYEBROW = "AI Product Builder & Aspiring Technical Consultant";

export const HERO_HEADLINE =
  "I translate complex systems into practical, high-value digital solutions.";

export const HERO_PROOF_LINE =
  "I engineer scalable frontend, backend, and database architectures across AI automation, healthcare tech, compliance verification, and fintech systems.";

export const HERO_TRUST_BADGES: HeroTrustBadge[] = [
  {
    id: "projects_shipped",
    title: "6 Shipped Platforms",
    detail: "From ideation to production",
    proofRef: "projects",
  },
  {
    id: "ai_driven",
    title: "AI Automation",
    detail: "Intelligent pipeline workflows",
    proofRef: "projects",
  },
  {
    id: "tech_stack",
    title: "Relational Execution",
    detail: "Type-safe database structures",
    proofRef: "skills",
  },
];

export const HERO_METRIC_CARDS: HeroMetricCard[] = [
  {
    label: "Backend Architecture",
    value: "286",
    detail: "Production-ready API endpoints successfully shipped and integrated.",
  },
  {
    label: "Data Schema Control",
    // Note: 61+ models, 30+ schema migrations
    value: "61+",
    detail: "Database models designed, query-optimized, and migrated in PostgreSQL & Mongo.",
  },
  {
    label: "UI/UX High-Fidelity pages",
    value: "96+",
    detail: "Interactive, clean admin dashboards and user interfaces developed.",
  },
  {
    label: "Mobile screens flow",
    value: "80+",
    detail: "Seamless mobile screen layouts built using Flutter and Dart.",
  },
];
