import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import About from "../About";

describe("About", () => {
  it("renders the adaptive engineering profile and operating principles", () => {
    render(<About />);

    expect(
      screen.getByRole("heading", {
        name: "An adaptive engineer who makes difficult technical work easier to move through.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("How I work")).toBeInTheDocument();
    expect(screen.getByText("Working principles")).toBeInTheDocument();
    expect(screen.getByText("Adaptive R&D")).toBeInTheDocument();
    expect(screen.getByText("Use AI for leverage")).toBeInTheDocument();
  });
});
