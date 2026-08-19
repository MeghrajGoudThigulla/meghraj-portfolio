import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HERO_HEADLINE, HERO_PROOF_LINE, HERO_TRUST_BADGES } from "@/content/heroProof";
import Hero from "../Hero";

const escapeForRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => <a href={href} {...rest}>{children}</a>,
}));

describe("Hero", () => {
  afterEach(() => cleanup());

  it("renders primary, work, and resume CTA hierarchy", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "View My Work" })).toHaveAttribute("href", "/#projects");
    expect(screen.getByRole("link", { name: "Work With Me" })).toHaveAttribute("href", "/#contact");
    expect(screen.getByRole("link", { name: "Résumé →" })).toHaveAttribute("href", "/resume");
  });

  it("renders adaptive positioning and trust badges", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { name: HERO_HEADLINE })).toBeInTheDocument();
    expect(screen.getByText(HERO_PROOF_LINE)).toBeInTheDocument();
    expect(screen.getByLabelText("Trust badges")).toBeInTheDocument();
    HERO_TRUST_BADGES.forEach((badge) => {
      expect(screen.getByRole("button", { name: new RegExp(escapeForRegExp(badge.title), "i") })).toBeInTheDocument();
    });
  });
});
