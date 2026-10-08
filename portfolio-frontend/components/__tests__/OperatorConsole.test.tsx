import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import OperatorConsole from "../OperatorConsole";

describe("OperatorConsole", () => {
  beforeEach(() => {
    vi.useFakeTimers();
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
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders floating trigger button with accessible name", () => {
    render(<OperatorConsole />);
    const triggerBtn = screen.getByRole("button", { name: /Operator/i });
    expect(triggerBtn).toBeInTheDocument();
  });

  it("opens modal dialog when trigger button is clicked", () => {
    render(<OperatorConsole />);
    const triggerBtn = screen.getByRole("button", { name: /Operator/i });

    act(() => {
      fireEvent.click(triggerBtn);
    });

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("toggles open state with keyboard shortcut Ctrl+K / Cmd+K and closes with Escape", () => {
    render(<OperatorConsole />);

    // Press Cmd+K to open
    act(() => {
      fireEvent.keyDown(window, { key: "k", metaKey: true });
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Press Escape to close
    act(() => {
      fireEvent.keyDown(window, { key: "Escape" });
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens via custom event open-operator-console", () => {
    render(<OperatorConsole />);

    act(() => {
      window.dispatchEvent(new CustomEvent("open-operator-console"));
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders tactile directive keycaps and input field when open", () => {
    render(<OperatorConsole />);

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /Operator/i }));
    });

    const roleKeycap = screen.getByRole("button", { name: /01 \/\/ ROLE/i });
    expect(roleKeycap).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/Ask the Operator/i);
    expect(input).toBeInTheDocument();

    const transmitBtn = screen.getByRole("button", { name: /TRANSMIT/i });
    expect(transmitBtn).toBeInTheDocument();
  });
});
