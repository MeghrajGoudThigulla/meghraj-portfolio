import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkillsSnapshot from "../SkillsSnapshot";

describe("SkillsSnapshot", () => {
  it("renders grouped engineering capabilities for recruiter scan", () => {
    render(<SkillsSnapshot />);
    expect(screen.getByRole("heading", { name: "Engineering Capabilities" })).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend & APIs")).toBeInTheDocument();
    expect(screen.getByText("FastAPI")).toBeInTheDocument();
    expect(screen.getByText("AI / ML")).toBeInTheDocument();
  });
});
