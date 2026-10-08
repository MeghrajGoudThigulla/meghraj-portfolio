import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Footer from "../Footer";
import { resumeData } from "@/data/resume";

describe("Footer", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders navigation landmarks for quick links and profiles", () => {
    render(<Footer />);
    const navs = screen.getAllByRole("navigation");
    expect(navs.length).toBeGreaterThanOrEqual(2);
  });

  it("renders section anchor links and external profiles by href with secure rel/target", () => {
    const { container } = render(<Footer />);

    const sectionHrefs = ["/#about", "/#services", "/#projects", "/#journey", "/#skills", "/#contact"];
    sectionHrefs.forEach((href) => {
      const link = container.querySelector(`a[href='${href}']`);
      expect(link).toBeInTheDocument();
    });

    const mailto = resumeData.contactLinks.find((l) => l.href.startsWith("mailto:"))?.href;
    expect(mailto).toBeTruthy();
    const mailLink = container.querySelector(`a[href='${mailto}']`);
    expect(mailLink).toBeInTheDocument();

    const github = resumeData.contactLinks.find((l) => l.href.includes("github.com"))?.href;
    expect(github).toBeTruthy();
    const githubLink = container.querySelector(`a[href='${github}']`);
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    const linkedin = resumeData.contactLinks.find((l) => l.href.includes("linkedin.com"))?.href;
    expect(linkedin).toBeTruthy();
    const linkedinLink = container.querySelector(`a[href='${linkedin}']`);
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");

    const resumeLinks = container.querySelectorAll("a[href='/resume']");
    expect(resumeLinks.length).toBeGreaterThanOrEqual(1);
  });
});
