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
  "286 backend APIs shipped, including 273 FastAPI endpoints, with 61+ SQLAlchemy models and 30+ migrations.";

export const HERO_TRUST_BADGES: HeroTrustBadge[] = [
  {
    id: "apis_delivered",
    title: "286 APIs",
    detail: "Across 4 systems",
    proofRef: "cases",
  },
  {
    id: "fastapi_footprint",
    title: "273 FastAPI",
    detail: "Across 3 services",
    proofRef: "cases",
  },
  {
    id: "data_layer_scale",
    title: "61+ Models / 30+ Migrations",
    detail: "SQLAlchemy + Alembic",
    proofRef: "skills",
  },
];

export const HERO_METRIC_CARDS: HeroMetricCard[] = [
  {
    label: "Total APIs",
    value: "286",
    detail:
      "Combined REST endpoints across DEALSMART, SecureBank, Medical Advisor, and NexaTest.",
  },
  {
    label: "FastAPI Footprint",
    value: "273",
    detail:
      "FastAPI endpoints across DEALSMART, SecureBank, and Medical Advisor.",
  },
  {
    label: "Data Layer",
    value: "61+ / 30+",
    detail:
      "SQLAlchemy models and Alembic migrations maintained across active services.",
  },
];
