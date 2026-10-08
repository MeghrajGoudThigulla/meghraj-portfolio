import { cleanup, render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import CursorSparks from "../CursorSparks";

describe("CursorSparks", () => {
  let matchMediaMock: (query: string) => MediaQueryList;

  beforeEach(() => {
    // Setup default matchMedia mock
    matchMediaMock = (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList);

    window.matchMedia = vi.fn().mockImplementation(matchMediaMock);

    // Mock HTMLCanvasElement.getContext
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      fillStyle: "",
      shadowBlur: 0,
      shadowColor: "",
    }) as unknown as typeof HTMLCanvasElement.prototype.getContext;
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders canvas when reduced-motion is not preferred", () => {
    render(<CursorSparks />);
    const canvas = screen.getByTestId("cursor-sparks-canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });

  it("renders null and attaches no canvas when prefers-reduced-motion is true", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList));

    render(<CursorSparks />);
    expect(screen.queryByTestId("cursor-sparks-canvas")).not.toBeInTheDocument();
  });

  it("does not start animation frame loop while idle until pointer movement occurs", () => {
    const rafSpy = vi.spyOn(window, "requestAnimationFrame");

    render(<CursorSparks />);

    // Initially idle, no RAF calls
    expect(rafSpy).not.toHaveBeenCalled();

    // Trigger pointermove
    act(() => {
      fireEvent(
        window,
        new MouseEvent("pointermove", {
          clientX: 100,
          clientY: 100,
        })
      );
    });

    // Loop should start on user motion
    expect(rafSpy).toHaveBeenCalled();
  });

  it("tears down RAF loop when sparks expire and enters idle state", () => {
    let currentRafCb: FrameRequestCallback | null = null;
    let nextRafId = 10;
    const rafSpy = vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      currentRafCb = cb;
      return nextRafId++;
    });

    render(<CursorSparks />);

    act(() => {
      fireEvent(
        window,
        new MouseEvent("pointermove", {
          clientX: 100,
          clientY: 100,
        })
      );
    });

    expect(rafSpy).toHaveBeenCalledTimes(1);

    // Step frames until all sparks expire (maxLife is at most 40 frames)
    for (let frame = 0; frame < 50; frame++) {
      if (typeof currentRafCb !== "function") break;
      const executeFrame: FrameRequestCallback = currentRafCb;
      currentRafCb = null;
      act(() => {
        executeFrame(performance.now());
      });
    }

    // After all sparks expire, the loop should not schedule any further RAFs
    expect(currentRafCb).toBeNull();
  });

  it("stops loop when document becomes hidden and cancels pending RAF on unmount", () => {
    let nextRafId = 20;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => nextRafId++);
    const cancelRafSpy = vi.spyOn(window, "cancelAnimationFrame");

    const { unmount } = render(<CursorSparks />);

    act(() => {
      fireEvent(
        window,
        new MouseEvent("pointermove", {
          clientX: 100,
          clientY: 100,
        })
      );
    });

    // Trigger visibility change to hidden
    Object.defineProperty(document, "hidden", { value: true, configurable: true });
    act(() => {
      fireEvent(document, new Event("visibilitychange"));
    });

    expect(cancelRafSpy).toHaveBeenCalled();

    // Reset document.hidden and unmount
    Object.defineProperty(document, "hidden", { value: false, configurable: true });
    unmount();
    expect(cancelRafSpy).toHaveBeenCalled();
  });
});
