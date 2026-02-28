import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import MobileNav from "../MobileNav";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const trackMetricMock = vi.fn();

vi.mock("@/lib/metrics", () => ({
  trackMetric: (payload: unknown) => trackMetricMock(payload),
}));

type ObserverInstance = {
  observe: (element: Element) => void;
  unobserve: (element: Element) => void;
  disconnect: () => void;
  trigger: (entries: IntersectionObserverEntry[]) => void;
  observedElements: Set<Element>;
};

const observers: ObserverInstance[] = [];

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  readonly observedElements = new Set<Element>();
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    observers.push(this);
  }

  disconnect() {
    this.observedElements.clear();
  }

  observe(element: Element) {
    this.observedElements.add(element);
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve(element: Element) {
    this.observedElements.delete(element);
  }

  trigger(entries: IntersectionObserverEntry[]) {
    this.callback(entries, this);
  }
}

function createSectionAnchors() {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
      <section id="about"></section>
      <section id="skills"></section>
      <section id="cases"></section>
      <section id="roi"></section>
      <section id="contact"></section>
    `,
  );
}

function makeIntersectionEntry(element: Element): IntersectionObserverEntry {
  return {
    boundingClientRect: element.getBoundingClientRect(),
    intersectionRatio: 0.8,
    intersectionRect: element.getBoundingClientRect(),
    isIntersecting: true,
    rootBounds: null,
    target: element,
    time: performance.now(),
  };
}

describe("MobileNav", () => {
  beforeEach(() => {
    observers.length = 0;
    trackMetricMock.mockReset();
    document.body.innerHTML = "";
    createSectionAnchors();
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  it("opens and closes the drawer via menu and close controls", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    expect(screen.queryByTestId("mobile-nav-panel")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
    expect(screen.getByTestId("mobile-nav-panel")).toBeInTheDocument();
    expect(trackMetricMock).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Close navigation menu" }));
    expect(screen.queryByTestId("mobile-nav-panel")).not.toBeInTheDocument();
  });

  it("closes the drawer on Escape key press", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
    expect(screen.getByTestId("mobile-nav-panel")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByTestId("mobile-nav-panel")).not.toBeInTheDocument();
  });

  it("renders all expected navigation links", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));

    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skills" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Case Studies" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ROI" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Resume" })).toBeInTheDocument();
  });

  it("highlights active section based on intersection updates", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));

    const skillsSection = document.getElementById("skills");
    expect(skillsSection).not.toBeNull();

    if (!skillsSection || observers.length === 0) {
      throw new Error("IntersectionObserver not initialized for skills section.");
    }

    observers[0].trigger([makeIntersectionEntry(skillsSection)]);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Skills" })).toHaveAttribute(
        "aria-current",
        "location",
      );
    });
  });
});
