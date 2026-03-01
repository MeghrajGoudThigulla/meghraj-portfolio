import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Footer from "../Footer";

describe("Footer", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders section quick links", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "Skills" })).toHaveAttribute("href", "#skills");
    expect(screen.getByRole("link", { name: "Case Studies" })).toHaveAttribute("href", "#cases");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact");
  });

  it("renders profile links with descriptive labels", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Email Meghraj" })).toHaveAttribute(
      "href",
      "mailto:meghraj.thigulla@outlook.com",
    );
    expect(screen.getByRole("link", { name: "Open Meghraj GitHub profile" })).toHaveAttribute(
      "href",
      "https://github.com/MeghrajGoudThigulla",
    );
    expect(screen.getByRole("link", { name: "Open Meghraj LinkedIn profile" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/meghraj-goud-thigulla",
    );
    expect(screen.getByRole("link", { name: "Open Meghraj resume" })).toHaveAttribute(
      "href",
      "/resume",
    );
  });
});
