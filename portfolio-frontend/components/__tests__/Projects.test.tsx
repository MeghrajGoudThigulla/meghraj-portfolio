import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Projects from "../Projects";

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => <a href={href} {...rest}>{children}</a>,
}));

describe("Projects", () => {
  it("renders project case-study structure", () => {
    render(<Projects />);
    expect(screen.getByRole("heading", { name: "Selected Engineering Work" })).toBeInTheDocument();
    expect(screen.getAllByText(/01 \/ Challenge/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/02 \/ Outcome/).length).toBeGreaterThan(0);
  });
});
