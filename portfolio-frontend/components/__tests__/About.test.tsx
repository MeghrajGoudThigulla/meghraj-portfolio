import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import About from "../About";

describe("About", () => {
  it("renders value statement and operating model blocks", () => {
    render(<About />);

    expect(
      screen.getByRole("heading", { name: "Full-stack engineer focused on scalable systems." }),
    ).toBeInTheDocument();
    expect(screen.getByText("Value Statement")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How I operate" })).toBeInTheDocument();
    expect(screen.getByText("Ops & ROI Focus")).toBeInTheDocument();
  });
});
