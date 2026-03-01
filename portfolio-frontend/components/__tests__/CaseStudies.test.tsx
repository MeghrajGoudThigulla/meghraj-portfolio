import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CaseStudies from "../CaseStudies";

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

describe("CaseStudies", () => {
  it("renders summary rows and keeps external details links", () => {
    render(<CaseStudies />);

    expect(screen.getAllByText("Case Snapshot").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: "Show architecture details" }).length).toBeGreaterThan(0);
    const detailLinks = screen.getAllByRole("link", { name: "View details →" });
    expect(detailLinks.length).toBeGreaterThan(0);

    const externalPlayStoreLink = detailLinks.find(
      (link) =>
        link.getAttribute("href") ===
        "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor",
    );
    expect(externalPlayStoreLink).toBeDefined();
  });
});
