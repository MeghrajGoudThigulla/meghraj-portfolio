import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import AssistantPromptBanner from "../AssistantPromptBanner";
import TactileKeyboard from "../TactileKeyboard";
import ChatInterface from "../ChatInterface";
import WorldScene3D from "../WorldScene3D";

describe("Interactive AI and 3D Showcase Components", () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  describe("AssistantPromptBanner", () => {
    it("renders headline and directive prompt pills", () => {
      render(<AssistantPromptBanner />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();

      const pills = screen.getAllByRole("button");
      expect(pills.length).toBeGreaterThanOrEqual(6);
    });

    it("dispatches open-operator-console custom event when prompt pill is clicked", () => {
      const dispatchSpy = vi.spyOn(window, "dispatchEvent");
      render(<AssistantPromptBanner />);

      const firstPill = screen.getByRole("button", { name: /Quick overview/i });
      fireEvent.click(firstPill);

      expect(dispatchSpy).toHaveBeenCalled();
    });

    it("renders link to 3D System World", () => {
      render(<AssistantPromptBanner />);
      const worldLink = screen.getByRole("link", { name: /EXPLORE 3D SYSTEM WORLD/i });
      expect(worldLink).toHaveAttribute("href", "/world");
    });
  });

  describe("TactileKeyboard", () => {
    it("renders 3D tactile keyboard with accessible key buttons", () => {
      render(<TactileKeyboard />);
      const pKey = screen.getByRole("button", { name: /Selected Work/i });
      expect(pKey).toBeInTheDocument();

      const enterKey = screen.getByRole("button", { name: /Let's Talk/i });
      expect(enterKey).toBeInTheDocument();
    });

    it("opens dialog modal when keycap is clicked", () => {
      render(<TactileKeyboard />);
      const pKey = screen.getByRole("button", { name: /Selected Work/i });
      fireEvent.click(pKey);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute("aria-modal", "true");
    });
  });

  describe("ChatInterface (/chat)", () => {
    it("renders initial Operator greeting and preset prompt questions", () => {
      render(<ChatInterface />);
      const input = screen.getByPlaceholderText(/Ask the Operator/i);
      expect(input).toBeInTheDocument();

      const transmitBtn = screen.getByRole("button", { name: /TRANSMIT/i });
      expect(transmitBtn).toBeInTheDocument();
    });

    it("allows typing and submitting a query", async () => {
      render(<ChatInterface />);
      const input = screen.getByPlaceholderText(/Ask the Operator/i);
      fireEvent.change(input, { target: { value: "Tell me about your scale" } });

      const transmitBtn = screen.getByRole("button", { name: /TRANSMIT/i });
      fireEvent.click(transmitBtn);

      expect(screen.getByText("Tell me about your scale")).toBeInTheDocument();
    });
  });

  describe("WorldScene3D (/world)", () => {
    it("renders boot loading screen and enters digital headquarters", () => {
      render(<WorldScene3D />);
      const enterBtn = screen.getByRole("button", { name: /ENTER OPERATIONS CENTER/i });
      expect(enterBtn).toBeInTheDocument();

      fireEvent.click(enterBtn);

      // After entering, top header and zone navigation are rendered
      expect(screen.getByRole("navigation", { name: /Zone Navigation/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /OPERATOR \[O\]/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /TERMINAL \[T\]/i })).toBeInTheDocument();
    });

    it("opens in-world Operator Console when operator button is clicked", () => {
      render(<WorldScene3D />);
      const enterBtn = screen.getByRole("button", { name: /ENTER OPERATIONS CENTER/i });
      fireEvent.click(enterBtn);

      const opBtn = screen.getByRole("button", { name: /OPERATOR \[O\]/i });
      fireEvent.click(opBtn);

      expect(screen.getByRole("complementary", { name: /Operator Console/i })).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Ask about scale, architecture.../i)).toBeInTheDocument();
    });

    it("opens in-world Terminal Shell when terminal button is clicked", () => {
      render(<WorldScene3D />);
      const enterBtn = screen.getByRole("button", { name: /ENTER OPERATIONS CENTER/i });
      fireEvent.click(enterBtn);

      const termBtn = screen.getByRole("button", { name: /TERMINAL \[T\]/i });
      fireEvent.click(termBtn);

      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/type 'help'/i)).toBeInTheDocument();
    });

    it("toggles exploded architecture view when explode button is clicked", () => {
      render(<WorldScene3D />);
      const enterBtn = screen.getByRole("button", { name: /ENTER OPERATIONS CENTER/i });
      fireEvent.click(enterBtn);

      const explodeBtn = screen.getByRole("button", { name: /EXPLODE \[E\]/i });
      expect(explodeBtn).toBeInTheDocument();

      fireEvent.click(explodeBtn);
      expect(screen.getByRole("button", { name: /ASSEMBLE \[E\]/i })).toBeInTheDocument();
    });
  });
});

