import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkipLink from "../SkipLink";

describe("SkipLink", () => {
  it("renders a skip link targeting #main-content", () => {
    render(
      <>
        <SkipLink />
        <main id="main-content" />
      </>,
    );

    const link = screen.getByRole("link", { name: "Skip to content" });
    expect(link).toHaveAttribute("href", "#main-content");
  });
});
