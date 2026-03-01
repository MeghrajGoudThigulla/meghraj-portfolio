import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkillsSnapshot from "../SkillsSnapshot";

describe("SkillsSnapshot", () => {
  it("renders grouped capability cards for recruiter scan", () => {
    render(<SkillsSnapshot />);

    expect(
      screen.getByRole("heading", { name: "Skills snapshot for fast recruiter scan." }),
    ).toBeInTheDocument();
    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getByText("Frameworks")).toBeInTheDocument();
    expect(screen.getByText("FastAPI")).toBeInTheDocument();
  });
});
