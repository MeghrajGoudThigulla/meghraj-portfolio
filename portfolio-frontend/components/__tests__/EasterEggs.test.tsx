import { render, screen, cleanup } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import GaragePage from "../../app/garage/page";
import PitPage from "../../app/pit/page";

describe("Easter Egg Telemetry Panels", () => {
  afterEach(() => {
    cleanup();
  });
  describe("/garage (Endurance Coupe)", () => {
    it("renders main landmark and accessible heading hierarchy", () => {
      render(<GaragePage />);
      expect(screen.getByRole("main")).toBeInTheDocument();
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it("renders return link back to home portfolio", () => {
      render(<GaragePage />);
      const returnLink = screen.getByRole("link", { name: /RETURN TO PORTFOLIO/i });
      expect(returnLink).toHaveAttribute("href", "/");
    });

    it("renders vector schematic image with accessible label", () => {
      render(<GaragePage />);
      const schematic = screen.getByRole("img", { name: /Side profile vector blueprint/i });
      expect(schematic).toBeInTheDocument();
    });
  });

  describe("/pit (100cc Roadster)", () => {
    it("renders main landmark and accessible heading hierarchy", () => {
      render(<PitPage />);
      expect(screen.getByRole("main")).toBeInTheDocument();
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it("renders return link back to home portfolio", () => {
      render(<PitPage />);
      const returnLink = screen.getByRole("link", { name: /RETURN TO PORTFOLIO/i });
      expect(returnLink).toHaveAttribute("href", "/");
    });

    it("renders acoustic schematic image with accessible label", () => {
      render(<PitPage />);
      const schematic = screen.getByRole("img", { name: /Schematic vector blueprint/i });
      expect(schematic).toBeInTheDocument();
    });
  });
});
