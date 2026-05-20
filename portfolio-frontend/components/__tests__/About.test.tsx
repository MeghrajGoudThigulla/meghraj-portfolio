import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import About from "../About";

describe("About", () => {
  it("renders value statement and operating model blocks", () => {
    render(<About />);

    expect(
      screen.getByRole("heading", { name: "Product-Minded Systems Engineer & Consulting Catalyst" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Core Positioning")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Operating Philosophy" })).toBeInTheDocument();
    expect(screen.getByText("AI Integration & ML")).toBeInTheDocument();
  });
});
