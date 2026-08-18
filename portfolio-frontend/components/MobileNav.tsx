'use client';

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackMetric } from "@/lib/metrics";
import useActiveSection from "@/hooks/useActiveSection";
import { navItems, navSectionIds } from "./navItems";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSectionId = useActiveSection(navSectionIds);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const internalSectionHref = activeSectionId ? `#${activeSectionId}` : "";
  const sectionLinks = navItems.filter((item) => item.group === "section");
  const utilityLinks = navItems.filter((item) => item.group !== "section");

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => openButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    firstLinkRef.current?.focus();
    trackMetric({ eventName: "mobile_nav_open", meta: { source: "navbar" } });

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;
      const panelElement = panelRef.current;
      if (!panelElement) return;
      const focusableElements = Array.from(panelElement.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter((element) => !element.hasAttribute("disabled"));
      if (!focusableElements.length) return;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;
      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [closeMenu, isOpen]);

  return (
    <>
      <button ref={openButtonRef} type="button" className="lg:hidden inline-flex h-10 px-4 items-center justify-center rounded-xl border border-brand-border bg-brand-surface/80 text-brand-navy shadow-sm transition hover:border-brand-blue hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40" aria-label="Open navigation menu" aria-expanded={isOpen} aria-controls="mobile-nav-panel" onClick={() => setIsOpen((previous) => !previous)}>
        <span aria-hidden className="text-[10px] uppercase tracking-[0.14em] font-bold">Menu</span>
      </button>

      {isOpen && (
        <div className="lg:hidden">
          <button type="button" aria-label="Close navigation menu backdrop" className="fixed inset-0 z-40 bg-slate-950/75 backdrop-blur-sm" onClick={closeMenu} />
          <div ref={panelRef} id="mobile-nav-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation" data-testid="mobile-nav-panel" className="fixed right-0 top-0 z-50 flex h-full w-[86%] max-w-sm flex-col justify-between border-l border-brand-border bg-brand-surface p-6 shadow-elev-2 sm:p-7">
            <div>
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="font-sans text-sm font-bold text-brand-navy">Meghraj Goud<span className="text-brand-blue">.</span></p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400">Portfolio navigation</p>
                </div>
                <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-brand-border text-brand-navy transition hover:border-brand-blue hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40" aria-label="Close navigation menu" onClick={closeMenu}>
                  <span aria-hidden className="text-sm font-semibold">×</span>
                </button>
              </div>

              <nav aria-label="Mobile primary navigation" className="space-y-6">
                <div>
                  <p className="px-3 mb-2 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">Explore</p>
                  <div className="flex flex-col gap-1">
                    {sectionLinks.map((item, index) => {
                      const isActive = item.href.startsWith("#") && item.href === internalSectionHref;
                      return (
                        <Link key={item.href} href={item.href.startsWith("#") ? `/${item.href}` : item.href} ref={index === 0 ? firstLinkRef : undefined} aria-current={isActive ? "location" : undefined} className={`rounded-xl px-3 py-3 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${isActive ? "border border-brand-blue/20 bg-brand-blue/10 text-brand-blue" : "text-brand-charcoal hover:bg-brand-muted hover:text-brand-blue"}`} onClick={closeMenu}>
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="px-3 mb-2 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">Links</p>
                  <div className="flex flex-col gap-1">
                    {utilityLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="rounded-xl px-3 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-charcoal transition-colors hover:bg-brand-muted hover:text-brand-blue" target={item.isExternal ? "_blank" : undefined} rel={item.isExternal ? "noreferrer" : undefined} onClick={closeMenu}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>

            <div className="border-t border-brand-border/60 pt-6">
              <Link href="/#contact" className="btn btn-primary w-full py-3.5 text-xs" onClick={closeMenu}>
                Let&apos;s Connect
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
