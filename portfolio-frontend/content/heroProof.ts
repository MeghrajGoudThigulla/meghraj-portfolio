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

export const HERO_EYEBROW = "Senior AI Developer · Technical Consultant";

export const HERO_HEADLINE =
  "I build the hard parts of products that have to work.";

export const HERO_PROOF_LINE =
  "I work across AI/ML, Python, Flutter, JavaScript, backend systems, infrastructure, and product R&D. I take unfamiliar requirements, investigate the difficult parts, and turn them into software that can ship and keep moving.";

export const HERO_TRUST_BADGES: HeroTrustBadge[] = [
  {
    id: "adaptive",
    title: "Adaptive by default",
    detail: "Research unfamiliar territory before committing to a solution.",
    proofRef: "about",
  },
  {
    id: "production",
    title: "Production-minded",
    detail: "AI, healthcare, finance, HR, verification, and commerce systems.",
    proofRef: "projects",
  },
  {
    id: "ownership",
    title: "Hands-on ownership",
    detail: "Build, debug, deploy, publish, demonstrate, and support.",
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
    label: "Knowledge Transfer",
    value: "8+",
    detail: "Team members supported through hands-on platform KT.",
  },
  {
    label: "Engineering Core",
    value: "AI + Backend",
    detail: "Python, ML, APIs, databases, automation, and system debugging.",
  },
  {
    label: "Mobile Delivery",
    value: "Flutter",
    detail: "Cross-platform apps plus Android and iOS release ownership.",
  },
];
