import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
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
});
