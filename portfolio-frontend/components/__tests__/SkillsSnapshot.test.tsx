import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkillsSnapshot from "../SkillsSnapshot";
import { resumeData } from "@/data/resume";

describe("SkillsSnapshot", () => {
  it("renders verified engineering capabilities categories", () => {
    render(<SkillsSnapshot />);
    expect(screen.getByRole("heading", { name: "Engineering Capabilities" })).toBeInTheDocument();
    resumeData.skills.forEach((item) => {
      expect(screen.getByRole("heading", { name: item.category })).toBeInTheDocument();
    });
  });
});
