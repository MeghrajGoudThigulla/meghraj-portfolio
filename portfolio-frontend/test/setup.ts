import "@testing-library/jest-dom/vitest";
import * as axeMatchers from "vitest-axe/matchers";
import "vitest-axe/extend-expect";
import React from "react";
import { expect, vi } from "vitest";

expect.extend(axeMatchers);

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];

  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

if (typeof window !== "undefined") {
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
}

interface ComponentProps {
  children?: React.ReactNode;
  [key: string]: unknown;
}

// Mock framer-motion components dynamically via Proxy to handle any element tag (e.g. motion.section, motion.ul)
vi.mock("framer-motion", async (importOriginal) => {
  const original = await importOriginal<typeof import("framer-motion")>();
  const motionBase = (original as unknown as { motion: Record<string, unknown> }).motion || {};
  
  return {
    ...original,
    motion: new Proxy(motionBase, {
      get(target, prop) {
        if (typeof prop === "string") {
          // Pass-through standard React properties/symbols
          if (prop === "displayName" || prop === "$$typeof") {
            return Reflect.get(target, prop);
          }
          // Return a mock element for any HTML tag requested (e.g., motion.div, motion.section)
          const Component = (props: ComponentProps) => {
            const { children, ...rest } = props;
            const cleanProps: Record<string, unknown> = {};
            
            // Clean motion-specific props so they don't leak to native DOM elements
            const motionProps = new Set([
              "whileHover", "whileTap", "whileInView", "viewport",
              "animate", "initial", "exit", "transition", "layout"
            ]);

            Object.keys(rest).forEach((key) => {
              if (!motionProps.has(key)) {
                cleanProps[key] = rest[key];
              }
            });

            return React.createElement(prop, cleanProps, children);
          };
          Component.displayName = `motion.${prop}`;
          return Component;
        }
        return Reflect.get(target, prop);
      }
    }),
    AnimatePresence: ({ children }: { children?: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    useReducedMotion: () => true,
  };
});
