"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { trackMetric } from "@/lib/metrics";
import useActiveSection from "@/hooks/useActiveSection";
import { navItems, navSectionIds } from "./navItems";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSectionId = useActiveSection(navSectionIds);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const internalSectionHref = activeSectionId ? `#${activeSectionId}` : "";

  useEffect(() => {
    if (!isOpen) return;

    firstLinkRef.current?.focus();
    trackMetric({
      eventName: "mobile_nav_open",
      meta: { source: "navbar" },
    });

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand-charcoal/20 bg-white text-brand-navy transition hover:border-brand-blue hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <span aria-hidden className="text-sm leading-none font-semibold">Menu</span>
      </button>

      {isOpen && (
        <div className="sm:hidden">
          <button
            type="button"
            aria-label="Close navigation menu backdrop"
            className="fixed inset-0 z-40 bg-brand-charcoal/40"
            onClick={() => setIsOpen(false)}
          />
          <div
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            data-testid="mobile-nav-panel"
            className="fixed right-0 top-0 z-50 h-full w-[82%] max-w-xs border-l border-brand-charcoal/10 bg-white p-5 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                Menu
              </p>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-brand-charcoal/20 text-brand-navy transition hover:border-brand-blue hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
                aria-label="Close navigation menu"
                onClick={() => setIsOpen(false)}
              >
                <span aria-hidden className="text-lg leading-none">X</span>
              </button>
            </div>
            <nav className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-[0.12em]">
              {navItems.map((item, index) => {
                const isActive = item.href.startsWith("#") && item.href === internalSectionHref;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    ref={index === 0 ? firstLinkRef : undefined}
                    aria-current={isActive ? "location" : undefined}
                    className={`rounded-md px-3 py-2 transition ${
                      isActive
                        ? "bg-brand-blue/10 text-brand-blue"
                        : "text-slate-700 hover:bg-brand-bg hover:text-brand-navy"
                    }`}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noreferrer" : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
