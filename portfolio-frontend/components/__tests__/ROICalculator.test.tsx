import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ROICalculator from "../ROICalculator";

const trackMetricMock = vi.fn();

vi.mock("@/lib/metrics", () => ({
  trackMetric: (payload: unknown) => trackMetricMock(payload),
}));

describe("ROICalculator", () => {
  beforeEach(() => {
    trackMetricMock.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("tracks load timing when ROI section mounts", () => {
    vi.spyOn(performance, "now").mockReturnValue(321.4);

    render(<ROICalculator />);

    expect(trackMetricMock).toHaveBeenCalledWith(
      expect.objectContaining({
        eventName: "roi_calculator_loaded",
        durationMs: 321,
        meta: { source: "roi_section_mount" },
      }),
    );
  });

  it("tracks engagement once after first interaction", async () => {
    render(<ROICalculator />);

    const sliders = screen.getAllByRole("slider");
    fireEvent.change(sliders[0], { target: { value: "8" } });
    fireEvent.change(sliders[1], { target: { value: "100" } });

    await waitFor(() => {
      expect(trackMetricMock).toHaveBeenCalledWith(
        expect.objectContaining({
          eventName: "roi_calculator_engaged",
          meta: expect.objectContaining({
            hoursSaved: 8,
            hourlyRate: 85,
          }),
        }),
      );
    });

    const engagementCalls = trackMetricMock.mock.calls.filter(
      ([payload]) =>
        typeof payload === "object" &&
        payload !== null &&
        "eventName" in payload &&
        (payload as { eventName?: string }).eventName === "roi_calculator_engaged",
    );

    expect(engagementCalls).toHaveLength(1);
  });

  it("applies a preset and tracks roi_preset_selected", async () => {
    const user = userEvent.setup();

    render(<ROICalculator />);
    await user.click(screen.getByRole("button", { name: "Ops Team" }));

    expect(trackMetricMock).toHaveBeenCalledWith(
      expect.objectContaining({
        eventName: "roi_preset_selected",
        meta: expect.objectContaining({
          presetId: "ops_team",
          hoursSaved: 10,
          hourlyRate: 95,
        }),
      }),
    );

    expect(screen.getByText("$49,400")).toBeInTheDocument();
  });

  it("tracks roi_estimate_cta_click with current estimate", async () => {
    const user = userEvent.setup();

    render(<ROICalculator />);
    await user.click(screen.getByRole("link", { name: "Use this estimate in a discovery call" }));

    expect(trackMetricMock).toHaveBeenCalledWith(
      expect.objectContaining({
        eventName: "roi_estimate_cta_click",
        value: 26520,
        meta: expect.objectContaining({
          source: "roi_section",
          hoursSaved: 6,
          hourlyRate: 85,
          estimateKey: "6:85",
        }),
      }),
    );
  });
});
