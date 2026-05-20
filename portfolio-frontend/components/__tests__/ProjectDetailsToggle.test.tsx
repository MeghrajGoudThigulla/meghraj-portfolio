import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MotionConfig } from "framer-motion";
import ProjectDetailsToggle from "../ProjectDetailsToggle";

const trackMetricMock = vi.fn();

vi.mock("@/lib/metrics", () => ({
  trackMetric: (payload: unknown) => trackMetricMock(payload),
}));

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useReducedMotion: () => true,
  };
});

describe("ProjectDetailsToggle", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    trackMetricMock.mockReset();
  });

  it("toggles details with accessible expanded state", async () => {
    const user = userEvent.setup();
    render(
      <MotionConfig reducedMotion="always">
        <ProjectDetailsToggle
          projectTitle="Commerce Platform Buildout"
          actionItems={["Built APIs", "Added workers"]}
        />
      </MotionConfig>,
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
        eventName: "project_expand",
        meta: expect.objectContaining({
          projectId: "commerce-platform-buildout",
          projectTitle: "Commerce Platform Buildout",
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
