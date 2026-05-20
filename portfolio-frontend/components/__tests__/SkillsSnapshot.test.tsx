import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkillsSnapshot from "../SkillsSnapshot";

describe("SkillsSnapshot", () => {
  it("renders grouped capability cards for recruiter scan", () => {
    render(<SkillsSnapshot />);

    expect(
      screen.getByRole("heading", { name: "Production-Ready Technology Capabilities" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Frontend Systems")).toBeInTheDocument();
    expect(screen.getByText("Backend & Databases")).toBeInTheDocument();
    expect(screen.getByText("FastAPI")).toBeInTheDocument();
  });
});
