import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Projects from "../Projects";
import { projectsData, PROJECTS_SECTION_HEADER } from "@/data/projects";
import { resetProjectExpand } from "../ProjectDetailsToggle";

const trackMetricMock = vi.fn();
vi.mock("@/lib/metrics", () => ({
  trackMetric: (payload: unknown) => trackMetricMock(payload),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

describe("Projects", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    resetProjectExpand();
    trackMetricMock.mockClear();
  });
  afterEach(() => cleanup());

  it("renders section heading via accessible role matching header data", () => {
    render(<Projects />);
    const heading = screen.getByRole("heading", { level: 2, name: PROJECTS_SECTION_HEADER.title });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute("id", "projects-heading");
  });

  it("renders project articles matching data length and strict project order", () => {
    render(<Projects />);
    const articles = screen.getAllByTestId("project-article");
    expect(articles).toHaveLength(projectsData.length);

    projectsData.forEach((project, index) => {
      const article = articles[index];
      const titleHeading = screen.getByRole("heading", { level: 3, name: project.title });
      expect(titleHeading).toBeInTheDocument();
      expect(article).toContainElement(titleHeading);
    });
  });

  it("verifies all external links have rel='noopener noreferrer' and target='_blank'", () => {
    const { container } = render(<Projects />);
    const links = Array.from(container.querySelectorAll("a[href^='http']"));
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("toggles disclosure details, reveals action bullets, and fires project_expand telemetry", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const toggles = screen.getAllByRole("button", { name: /details/i });
    expect(toggles.length).toBeGreaterThan(0);

    const firstToggle = toggles[0];
    expect(firstToggle).toHaveAttribute("aria-expanded", "false");
    const panelId = firstToggle.getAttribute("aria-controls");
    expect(panelId).toBeTruthy();

    await user.click(firstToggle);
    expect(firstToggle).toHaveAttribute("aria-expanded", "true");

    const firstProject = projectsData[0];
    firstProject.action.forEach((bullet) => {
      expect(screen.getByText(bullet)).toBeInTheDocument();
    });

    const expandEvents = trackMetricMock.mock.calls
      .map(([p]) => p as { eventName?: string; meta?: Record<string, unknown> })
      .filter((p) => p.eventName === "project_expand");
    expect(expandEvents).toHaveLength(1);
    expect(expandEvents[0].meta).toEqual(
      expect.objectContaining({
        projectTitle: firstProject.title,
        itemCount: firstProject.action.length,
      })
    );
  });

  it("verifies diagram containers have overflow-x-auto to prevent mobile blowout", () => {
    render(<Projects />);
    const diagramWrappers = screen.getAllByTestId("api-diagram-wrapper");
    expect(diagramWrappers).toHaveLength(projectsData.length);
    diagramWrappers.forEach((wrapper) => {
      expect(wrapper).toHaveClass("overflow-x-auto");
    });
  });
});
