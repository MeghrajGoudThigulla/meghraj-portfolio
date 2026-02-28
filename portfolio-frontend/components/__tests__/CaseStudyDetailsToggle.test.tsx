import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CaseStudyDetailsToggle from "../CaseStudyDetailsToggle";

const trackMetricMock = vi.fn();

vi.mock("@/lib/metrics", () => ({
  trackMetric: (payload: unknown) => trackMetricMock(payload),
}));

describe("CaseStudyDetailsToggle", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    trackMetricMock.mockReset();
  });

  it("toggles details with accessible expanded state", async () => {
    const user = userEvent.setup();
    render(
      <CaseStudyDetailsToggle
        caseTitle="Commerce Platform Buildout"
        actionItems={["Built APIs", "Added workers"]}
      />,
    );

    const toggleButton = screen.getByRole("button", { name: "Show architecture details" });
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Built APIs")).not.toBeInTheDocument();

    await user.click(toggleButton);
    expect(screen.getByRole("button", { name: "Hide architecture details" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("Built APIs")).toBeInTheDocument();
    expect(trackMetricMock).toHaveBeenCalledWith(
      expect.objectContaining({
        eventName: "case_expand",
        meta: expect.objectContaining({
          caseId: "commerce-platform-buildout",
          caseTitle: "Commerce Platform Buildout",
        }),
      }),
    );

    await user.click(screen.getByRole("button", { name: "Hide architecture details" }));
    expect(screen.queryByText("Built APIs")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show architecture details" }));
    expect(screen.getByText("Built APIs")).toBeInTheDocument();
    expect(trackMetricMock).toHaveBeenCalledTimes(1);
  });
});
