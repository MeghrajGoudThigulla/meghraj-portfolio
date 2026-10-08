import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import About from "../About";
import { ABOUT_CONTENT, PRINCIPLES, STRENGTHS } from "@/data/about";

describe("About", () => {
  it("renders section landmark, heading hierarchy, and data-driven principles without copy literals", () => {
    const { container } = render(<About />);

    const section = container.querySelector("#about");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("aria-labelledby", "about-heading");

    const sectionLandmark = screen.getByRole("region", { name: ABOUT_CONTENT.title });
    expect(sectionLandmark).toBeInTheDocument();

    const h2Headings = screen.getAllByRole("heading", { level: 2 });
    expect(h2Headings).toHaveLength(1);
    expect(h2Headings[0]).toHaveAttribute("id", "about-heading");
    expect(h2Headings[0]).toHaveTextContent(ABOUT_CONTENT.title);

    const principleItems = screen.getAllByTestId("principle-item");
    expect(principleItems).toHaveLength(PRINCIPLES.length);

    const strengthItems = screen.getAllByTestId("strength-item");
    expect(strengthItems).toHaveLength(STRENGTHS.length);
  });
});
