import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ToastProvider } from "@/components/Toast";
import { vi } from "vitest";

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <ToastProvider>{children}</ToastProvider>;
  };

  return render(ui, { wrapper: Wrapper, ...options });
}

export function createMockIntersectionObserver() {
  const callbacks: IntersectionObserverCallback[] = [];
  const observedElements = new Set<Element>();

  class ActiveMockIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds = [];
    private cb: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
      this.cb = callback;
      callbacks.push(callback);
    }

    disconnect() {
      const idx = callbacks.indexOf(this.cb);
      if (idx !== -1) callbacks.splice(idx, 1);
      observedElements.clear();
    }

    observe(element: Element) {
      observedElements.add(element);
    }

    unobserve(element: Element) {
      observedElements.delete(element);
    }

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  const triggerIntersection = (entries: Partial<IntersectionObserverEntry>[]) => {
    callbacks.forEach((cb) => {
      cb(entries as IntersectionObserverEntry[], {} as IntersectionObserver);
    });
  };

  return {
    ObserverClass: ActiveMockIntersectionObserver,
    triggerIntersection,
    callbacks,
    observedElements,
  };
}

export function mockSendBeacon(impl?: (url: string | URL, data?: BodyInit | null) => boolean) {
  const fn = vi.fn(impl ?? (() => true));
  Object.defineProperty(navigator, "sendBeacon", {
    writable: true,
    configurable: true,
    value: fn,
  });
  return fn;
}

export function mockFetch(status = 200, responseData: unknown = {}) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => responseData,
    text: async () => (typeof responseData === "string" ? responseData : JSON.stringify(responseData)),
  } as Response);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}
