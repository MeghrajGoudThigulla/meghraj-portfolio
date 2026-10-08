import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Projects from "../Projects";

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => <a href={href} {...rest}>{children}</a>,
}));

vi.mock("@/lib/metrics", () => ({
  trackMetric: vi.fn(),
}));

describe("Projects", () => {
  it("renders project case-study structure and disclosure toggles", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    expect(screen.getByRole("heading", { name: "Selected Engineering Work" })).toBeInTheDocument();
    expect(screen.getAllByText(/01 \/ Challenge/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/02 \/ Outcome/).length).toBeGreaterThan(0);

    const toggles = screen.getAllByRole("button", { name: /Show architecture details/i });
    expect(toggles.length).toBeGreaterThan(0);

    const firstToggle = toggles[0];
    expect(firstToggle).toHaveAttribute("aria-expanded", "false");
    expect(firstToggle).toHaveAttribute("aria-controls");

    await user.click(firstToggle);
    expect(firstToggle).toHaveAttribute("aria-expanded", "true");
  });
});
