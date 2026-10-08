import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Navbar from "../Navbar";
import { navItems, navSectionIds } from "../navItems";

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

vi.mock("../MobileNav", () => ({
  default: () => <div data-testid="mobile-nav-mock" />,
}));

vi.mock("../ThemeSwitcher", () => ({
  default: () => <div data-testid="theme-switcher-mock" />,
}));

type ObserverInstance = {
  observe: (element: Element) => void;
  unobserve: (element: Element) => void;
  disconnect: () => void;
  trigger: (entries: IntersectionObserverEntry[]) => void;
};
const observers: ObserverInstance[] = [];

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    observers.push(this);
  }

  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  trigger(entries: IntersectionObserverEntry[]) {
    this.callback(entries, this);
  }
}

function createSectionAnchors() {
  document.body.insertAdjacentHTML(
    "afterbegin",
    navSectionIds.map((id) => `<section id="${id}"></section>`).join("")
  );
}

function makeIntersectionEntry(element: Element): IntersectionObserverEntry {
  return {
    boundingClientRect: element.getBoundingClientRect(),
    intersectionRatio: 0.9,
    intersectionRect: element.getBoundingClientRect(),
    isIntersecting: true,
    rootBounds: null,
    target: element,
    time: performance.now(),
  };
}

describe("Navbar", () => {
  beforeEach(() => {
    observers.length = 0;
    document.body.innerHTML = "";
    createSectionAnchors();
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  it("renders desktop navigation landmark and links from navItems", () => {
    render(<Navbar />);
    const primaryNav = screen.getByRole("navigation", { name: /primary navigation/i });
    expect(primaryNav).toBeInTheDocument();

    const desktopSectionItems = navItems.filter((i) => i.group === "section");
    desktopSectionItems.forEach((item) => {
      const link = screen.getByRole("link", { name: item.label });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/${item.href}`);
    });
  });

  it("highlights active section with aria-current on intersection observer entry", async () => {
    render(<Navbar />);
    expect(observers.length).toBeGreaterThan(0);

    const targetSectionId = "projects";
    const targetSection = document.getElementById(targetSectionId);
    expect(targetSection).toBeInTheDocument();

    const targetNavItem = navItems.find((i) => i.href === `#${targetSectionId}`);
    expect(targetNavItem).toBeTruthy();

    observers[0].trigger([makeIntersectionEntry(targetSection!)]);

    await waitFor(() => {
      const activeLink = screen.getByRole("link", { name: targetNavItem!.label });
      expect(activeLink).toHaveAttribute("aria-current", "location");
    });
  });
});
