"use client";

import { useEffect } from "react";
import { trackMetric } from "@/lib/metrics";
import type { HeroTrustBadge } from "@/content/heroProof";

type HeroTrustBadgesProps = {
  badges: HeroTrustBadge[];
};

const badgeImpressionStorageKey = "hero_trust_badge_impressions";
const inMemoryImpressionIds = new Set<string>();

const shouldTrackBadgeImpression = (badgeId: string) => {
  if (typeof window === "undefined") return false;
  if (inMemoryImpressionIds.has(badgeId)) return false;

  try {
    const stored = window.sessionStorage.getItem(badgeImpressionStorageKey);
    const parsed = stored ? (JSON.parse(stored) as string[]) : [];
    if (parsed.includes(badgeId)) return false;
    inMemoryImpressionIds.add(badgeId);
    window.sessionStorage.setItem(
      badgeImpressionStorageKey,
      JSON.stringify([...parsed, badgeId]),
    );
    return true;
  } catch {
    inMemoryImpressionIds.add(badgeId);
    return true;
  }
};

export default function HeroTrustBadges({ badges }: HeroTrustBadgesProps) {
  useEffect(() => {
    badges.forEach((badge, index) => {
      if (!shouldTrackBadgeImpression(badge.id)) return;

      trackMetric({
        eventName: "hero_trust_badge_impression",
        meta: {
          badgeId: badge.id,
          badgeTitle: badge.title,
          badgeDetail: badge.detail,
          position: index + 1,
          proofRef: badge.proofRef,
        },
      });
    });
  }, [badges]);

  return (
    <ul className="fade-up stagger-3 flex flex-wrap gap-2" aria-label="Trust badges">
      {badges.map((badge, index) => (
        <li
          key={badge.id}
        >
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-brand-blue/20 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-brand-navy transition hover:border-brand-blue/40 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
            onClick={() => {
              trackMetric({
                eventName: "hero_trust_badge_engaged",
                meta: {
                  badgeId: badge.id,
                  badgeTitle: badge.title,
                  badgeDetail: badge.detail,
                  position: index + 1,
                  proofRef: badge.proofRef,
                  trigger: "click",
                },
              });
            }}
            onFocus={() => {
              trackMetric({
                eventName: "hero_trust_badge_engaged",
                meta: {
                  badgeId: badge.id,
                  badgeTitle: badge.title,
                  badgeDetail: badge.detail,
                  position: index + 1,
                  proofRef: badge.proofRef,
                  trigger: "focus",
                },
              });
            }}
          >
            <span className="text-brand-blue">{badge.title}</span>
            <span className="mx-1 text-slate-400">|</span>
            <span className="text-slate-600">{badge.detail}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
