import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkillsSnapshot from "../SkillsSnapshot";
import { resumeData } from "@/data/resume";

describe("SkillsSnapshot", () => {
  it("renders skills rows matching data length with label and items from data", () => {
    const { container } = render(<SkillsSnapshot />);

    const section = container.querySelector("#skills");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("aria-labelledby", "skills-heading");

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute("id", "skills-heading");

    const rows = screen.getAllByTestId("skill-row");
    expect(rows).toHaveLength(resumeData.skills.length);

    resumeData.skills.forEach((item, index) => {
      const row = rows[index];
      const category = within(row).getByRole("heading", { level: 3, name: item.category });
      expect(category).toBeInTheDocument();
      expect(within(row).getByText(item.skills)).toBeInTheDocument();
    });
  });
});
