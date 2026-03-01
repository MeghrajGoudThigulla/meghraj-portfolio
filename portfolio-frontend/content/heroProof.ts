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

export const HERO_EYEBROW = "Backend-first engineering delivery";

export const HERO_HEADLINE =
  "I build production systems that cut delivery friction and improve reliability.";

export const HERO_PROOF_LINE =
  "318+ APIs delivered across fintech, healthcare, and operations systems using Next.js, FastAPI, and Prisma-driven architectures.";

export const HERO_TRUST_BADGES: HeroTrustBadge[] = [
  {
    id: "apis_delivered",
    title: "318+ APIs",
    detail: "Production-delivered",
    proofRef: "cases",
  },
  {
    id: "core_stack",
    title: "Core Stack",
    detail: "FastAPI / Flutter / PostgreSQL",
    proofRef: "skills",
  },
  {
    id: "domain_coverage",
    title: "Domain Coverage",
    detail: "Fintech and Ops Systems",
    proofRef: "about",
  },
];

export const HERO_METRIC_CARDS: HeroMetricCard[] = [
  {
    label: "Efficiency",
    value: "30% ↓",
    detail:
      "Cut cross-platform engineering overhead by unifying mobile/web release flows.",
  },
  {
    label: "MVP Delivery",
    value: "60% built",
    detail:
      "Architected core modules for an e-commerce launch targeting 1K+ early users.",
  },
  {
    label: "Responsiveness",
    value: "25% faster",
    detail:
      "Optimized APIs, caching, and Firestore queries for smoother app experiences.",
  },
];
