import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { renderWithProviders } from "@/test/helpers";
import Hero from "../Hero";
import Projects from "../Projects";
import ContactForm from "../ContactForm";
import Footer from "../Footer";
import MobileNav from "../MobileNav";
import { resetBadgeImpressions } from "../HeroTrustBadges";
import { resetProjectExpand } from "../ProjectDetailsToggle";

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

describe("Accessibility (a11y) smoke suite", () => {
  beforeEach(() => {
    resetBadgeImpressions();
    resetProjectExpand();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("Hero component has no axe violations", async () => {
    const { container } = renderWithProviders(<Hero />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Projects component has no axe violations", async () => {
    const { container } = renderWithProviders(<Projects />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("ContactForm component has no axe violations", async () => {
    const { container } = renderWithProviders(<ContactForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Footer component has no axe violations", async () => {
    const { container } = renderWithProviders(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("MobileNav in open state has no axe violations", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<MobileNav />);

    const openButton = screen.getByRole("button", { name: /open navigation menu/i });
    await user.click(openButton);

    const dialog = screen.getByRole("dialog", { name: /mobile navigation/i });
    expect(dialog).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
