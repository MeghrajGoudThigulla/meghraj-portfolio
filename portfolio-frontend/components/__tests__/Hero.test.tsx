import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HERO_CTA_LINKS, HERO_HEADLINE, HERO_PROOF_LINE, HERO_TRUST_BADGES } from "@/content/heroProof";
import Hero from "../Hero";
import { resetBadgeImpressions } from "../HeroTrustBadges";

const trackMetricMock = vi.fn();
vi.mock("@/lib/metrics", () => ({
  trackMetric: (payload: unknown) => trackMetricMock(payload),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

describe("Hero", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    resetBadgeImpressions();
    trackMetricMock.mockClear();
  });
  afterEach(() => cleanup());

  it("renders exact heading level-1 matching headline constant", () => {
    render(<Hero />);
    const h1Headings = screen.getAllByRole("heading", { level: 1 });
    expect(h1Headings).toHaveLength(1);
    expect(h1Headings[0]).toHaveTextContent(HERO_HEADLINE);
    expect(screen.getByText(HERO_PROOF_LINE)).toBeInTheDocument();
  });

  it("renders CTA links as role=link with expected href hierarchy from data", () => {
    render(<Hero />);
    HERO_CTA_LINKS.forEach((cta) => {
      const link = screen.getByRole("link", { name: cta.label });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", cta.href);
    });
  });

  it("fires trust-badge telemetry on click and dedupes impressions per session", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Hero />);

    const initialImpressions = trackMetricMock.mock.calls
      .map(([p]) => p as { eventName?: string })
      .filter((p) => p.eventName === "hero_trust_badge_impression");
    expect(initialImpressions).toHaveLength(HERO_TRUST_BADGES.length);

    unmount();
    trackMetricMock.mockClear();
    render(<Hero />);
    const secondImpressions = trackMetricMock.mock.calls
      .map(([p]) => p as { eventName?: string })
      .filter((p) => p.eventName === "hero_trust_badge_impression");
    expect(secondImpressions).toHaveLength(0);

    const targetBadge = HERO_TRUST_BADGES[0];
    const badgeButton = screen.getByRole("button", { name: new RegExp(targetBadge.title, "i") });
    await user.click(badgeButton);

    const engagementEvents = trackMetricMock.mock.calls
      .map(([p]) => p as { eventName?: string; meta?: Record<string, unknown> })
      .filter((p) => p.eventName === "hero_trust_badge_engaged");
    expect(engagementEvents).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          meta: expect.objectContaining({
            badgeId: targetBadge.id,
            proofRef: targetBadge.proofRef,
            trigger: "click",
          }),
        }),
      ])
    );
  });
});
