import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ResumeStickyActions from "../ResumeStickyActions";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const trackMetricMock = vi.fn();

vi.mock("@/lib/metrics", () => ({
  trackMetric: (payload: unknown) => trackMetricMock(payload),
}));

describe("ResumeStickyActions", () => {
  beforeEach(() => {
    trackMetricMock.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders download, portfolio, and contact actions", () => {
    render(<ResumeStickyActions />);

    expect(screen.getByRole("button", { name: "Download PDF" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to Portfolio" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/#contact");
  });

  it("tracks resume_print_click and calls window.print", async () => {
    const user = userEvent.setup();
    const printSpy = vi.spyOn(window, "print").mockImplementation(() => {});

    render(<ResumeStickyActions />);
    await user.click(screen.getByRole("button", { name: "Download PDF" }));

    expect(printSpy).toHaveBeenCalledTimes(1);
    expect(trackMetricMock).toHaveBeenCalledWith(
      expect.objectContaining({
        eventName: "resume_print_click",
        meta: expect.objectContaining({ source: "resume_sticky_actions" }),
      }),
    );
  });
});
