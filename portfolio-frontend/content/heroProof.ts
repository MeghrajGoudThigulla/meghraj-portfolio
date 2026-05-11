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

export const HERO_EYEBROW = "Senior AI Developer & Aspiring Tech Consultant";

export const HERO_HEADLINE =
  "I build scalable intelligence. Translating deep tech into strategic business outcomes.";

export const HERO_PROOF_LINE =
  "Delivered 6 enterprise-grade systems integrating scalable APIs, AI/ML pipelines, and modern architectures.";

export const HERO_TRUST_BADGES: HeroTrustBadge[] = [
  {
    id: "projects_shipped",
    title: "6 Projects",
    detail: "Enterprise-Grade",
    proofRef: "cases",
  },
  {
    id: "ai_driven",
    title: "AI Integrations",
    detail: "Next-Gen Intelligence",
    proofRef: "cases",
  },
  {
    id: "tech_stack",
    title: "Full-Stack + ML",
    detail: "Python, Next.js, Flutter",
    proofRef: "skills",
  },
];

export const HERO_METRIC_CARDS: HeroMetricCard[] = [
  {
    label: "Scalable Platforms",
    value: "6+",
    detail:
      "Engineered high-performance systems from e-commerce to healthcare and internal ops.",
  },
  {
    label: "AI & Data Solutions",
    value: "Intelligent",
    detail:
      "Integrating cutting-edge AI models and machine learning pipelines into production.",
  },
  {
    label: "Tech Consulting",
    value: "Strategic",
    detail:
      "Bridging the gap between complex technical architectures and high-level business goals.",
  },
];
