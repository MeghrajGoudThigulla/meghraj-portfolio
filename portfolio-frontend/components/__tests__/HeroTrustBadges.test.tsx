import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HERO_TRUST_BADGES } from "@/content/heroProof";
import HeroTrustBadges from "../HeroTrustBadges";

const trackMetricMock = vi.fn();

vi.mock("@/lib/metrics", () => ({
  trackMetric: (payload: unknown) => trackMetricMock(payload),
}));

describe("HeroTrustBadges telemetry", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    trackMetricMock.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it("tracks trust badge impressions once per session", async () => {
    const badges = HERO_TRUST_BADGES.map((badge) => ({
      ...badge,
      id: `${badge.id}-impression`,
    }));
    render(<HeroTrustBadges badges={badges} />);

    await waitFor(() => {
      const impressionEvents = trackMetricMock.mock.calls
        .map(([payload]) => payload as { eventName?: string })
        .filter((payload) => payload.eventName === "hero_trust_badge_impression");
      expect(impressionEvents).toHaveLength(badges.length);
    });

    cleanup();
    render(<HeroTrustBadges badges={badges} />);

    await waitFor(() => {
      const impressionEvents = trackMetricMock.mock.calls
        .map(([payload]) => payload as { eventName?: string })
        .filter((payload) => payload.eventName === "hero_trust_badge_impression");
      expect(impressionEvents).toHaveLength(badges.length);
    });
  });

  it("tracks badge click events", async () => {
    const user = userEvent.setup();
    const badges = HERO_TRUST_BADGES.map((badge) => ({
      ...badge,
      id: `${badge.id}-click`,
    }));
    render(<HeroTrustBadges badges={badges} />);

    await waitFor(() => {
      expect(trackMetricMock).toHaveBeenCalled();
    });
    trackMetricMock.mockClear();

    await user.click(screen.getByRole("button", { name: /286 APIs/i }));

    const engagementEvents = trackMetricMock.mock.calls
      .map(([payload]) => payload as { eventName?: string; meta?: Record<string, unknown> })
      .filter((payload) => payload.eventName === "hero_trust_badge_engaged");

    expect(engagementEvents).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          meta: expect.objectContaining({
            badgeId: "apis_delivered-click",
            proofRef: "cases",
            trigger: "click",
          }),
        }),
      ]),
    );
  });
});
