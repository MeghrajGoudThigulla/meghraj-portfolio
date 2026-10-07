import { cleanup, render, screen } from "@testing-library/react";
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

  it("renders semantic h1 for candidate name and h2 for each section", () => {
    render(<ResumePage />);

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(resumeData.name);

    const sectionHeadings = screen.getAllByRole("heading", { level: 2 });
    const sectionTitles = sectionHeadings.map((h) => h.textContent?.trim());
    expect(sectionTitles).toContain("EXPERIENCE");
    expect(sectionTitles).toContain("SKILLS");
    expect(sectionTitles).toContain("PROJECTS");
    expect(sectionTitles).toContain("EDUCATION");
    expect(sectionTitles).toContain("CERTIFICATIONS");
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

  it("renders project external links with rel noopener noreferrer", () => {
    render(<ResumePage />);

    const iyovLink = screen.getByRole("link", { name: /iyov\.ai/i });
    expect(iyovLink).toHaveAttribute("href", "https://iyov.ai/");
    expect(iyovLink).toHaveAttribute("target", "_blank");
    expect(iyovLink).toHaveAttribute("rel", "noopener noreferrer");

    const playStoreLink = screen.getByRole("link", { name: /Play Store/i });
    expect(playStoreLink).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.tfg.medicaladvisor&pcampaignid=web_share",
    );
    expect(playStoreLink).toHaveAttribute("target", "_blank");
    expect(playStoreLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders quick actions navigation and print control", () => {
    render(<ResumePage />);

    expect(screen.getByRole("button", { name: /Download PDF/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back to Portfolio/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/#contact");
  });
});
