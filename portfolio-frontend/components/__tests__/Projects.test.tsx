import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Projects from "../Projects";

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => <a href={href} {...rest}>{children}</a>,
}));

describe("Projects", () => {
  it("renders project case-study structure and external live links", () => {
    render(<Projects />);
    expect(screen.getByRole("heading", { name: "Selected Engineering Work" })).toBeInTheDocument();
    expect(screen.getAllByText(/01 \/ Challenge/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/02 \/ Outcome/).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: "Show architecture details" }).length).toBeGreaterThan(0);
    const liveLinks = screen.getAllByRole("link", { name: "View Live Project →" });
    expect(liveLinks.length).toBeGreaterThan(0);
    expect(liveLinks.some((link) => link.getAttribute("href") === "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor")).toBe(true);
  });
});
