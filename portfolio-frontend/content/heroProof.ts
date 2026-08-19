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

export const HERO_EYEBROW = "Senior AI Developer · AI & Technical Consultant";

export const HERO_HEADLINE =
  "I adapt quickly, solve difficult problems, and build practical software systems.";

export const HERO_PROOF_LINE =
  "I work across AI/ML, Python, Flutter, JavaScript, backend systems, infrastructure, and product R&D to turn unfamiliar requirements into software that can actually ship.";

export const HERO_TRUST_BADGES: HeroTrustBadge[] = [
  {
    id: "adaptive",
    title: "Highly Adaptive",
    detail: "R&D-first approach to unfamiliar problems",
    proofRef: "about",
  },
  {
    id: "production",
    title: "Production Experience",
    detail: "AI, healthcare, finance & automation systems",
    proofRef: "projects",
  },
  {
    id: "ownership",
    title: "Hands-On Ownership",
    detail: "Build, debug, deploy, publish & support",
    proofRef: "journey",
  },
];

export const HERO_METRIC_CARDS: HeroMetricCard[] = [
  {
    label: "Production APIs",
    value: "280+",
    detail: "REST endpoints built and integrated across production systems.",
  },
  {
    label: "Technical Knowledge Transfer",
    value: "8",
    detail: "Team members onboarded through hands-on platform KT.",
  },
  {
    label: "Core Engineering",
    value: "AI + Backend",
    detail: "Python, ML, APIs, databases, automation, and system debugging.",
  },
  {
    label: "Mobile Delivery",
    value: "Flutter",
    detail: "Cross-platform applications plus Android and iOS publishing.",
  },
];
