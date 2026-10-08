import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ResumePage from "../page";
import { resumeData } from "@/data/resume";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    target,
    rel,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    target?: string;
    rel?: string;
    [key: string]: unknown;
  }) => (
    <a href={href} target={target} rel={rel} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock("@/lib/metrics", () => ({
  trackMetric: vi.fn(),
}));

describe("ResumePage", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders exactly one semantic h1 for candidate name and h2 sections in strict order", () => {
    render(<ResumePage />);

    const h1Headings = screen.getAllByRole("heading", { level: 1 });
    expect(h1Headings).toHaveLength(1);
    expect(h1Headings[0]).toHaveTextContent(resumeData.name);

    const sectionHeadings = screen.getAllByRole("heading", { level: 2 });
    const sectionTitles = sectionHeadings.map((h) => h.textContent?.trim());
    expect(sectionTitles).toEqual([
      "EXPERIENCE",
      "SKILLS",
      "PROJECTS",
      "EDUCATION",
      "CERTIFICATIONS",
    ]);
  });

  it("renders all contact links with valid hrefs and external security attributes", () => {
    render(<ResumePage />);

    resumeData.contactLinks.forEach((link) => {
      const el = screen.getByRole("link", { name: link.label });
      expect(el).toHaveAttribute("href", link.href);
      if (link.href.startsWith("http")) {
        expect(el).toHaveAttribute("target", "_blank");
        expect(el).toHaveAttribute("rel", "noopener noreferrer");
      }
    });
  });

  it("omits phone number and WhatsApp links from the web interface", () => {
    render(<ResumePage />);

    expect(screen.queryByText(/79972/)).not.toBeInTheDocument();
    expect(screen.queryByText(/whatsapp/i)).not.toBeInTheDocument();
  });

  it("renders project external links matching data with rel noopener noreferrer", () => {
    render(<ResumePage />);

    resumeData.projects
      .filter((project) => project.url && project.urlLabel)
      .forEach((project) => {
        const link = screen.getByRole("link", { name: new RegExp(project.urlLabel!, "i") });
        expect(link).toHaveAttribute("href", project.url);
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
  });

  it("renders quick actions navigation and print control with valid hrefs", () => {
    render(<ResumePage />);

    const quickActions = screen.getByRole("complementary", { name: /resume quick actions/i });
    expect(within(quickActions).getByRole("button", { name: /download pdf/i })).toBeInTheDocument();
    expect(within(quickActions).getByRole("link", { name: /open pdf/i })).toHaveAttribute("href", "/Thigulla_Meghraj_Goud_Resume.pdf");
    expect(within(quickActions).getByRole("link", { name: /portfolio/i })).toHaveAttribute("href", "/");
    expect(within(quickActions).getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/#contact");
  });
});
