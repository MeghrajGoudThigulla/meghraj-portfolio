'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import ThemeSwitcher from "./ThemeSwitcher";
import { navItems } from "./navItems";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const desktopSectionItems = navItems.filter((item) => item.group === "section");
  const desktopUtilityItems = navItems.filter((item) => item.group !== "section");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-30 border-b transition-all duration-300 ease-out ${
      scrolled 
        ? "border-brand-border bg-brand-bg/92 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-lg"
        : "border-brand-border/40 bg-brand-bg/70 shadow-none backdrop-blur-md"
    }`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 ${
        scrolled ? "py-2.5 sm:px-6 lg:px-8" : "py-4 sm:px-6 lg:px-8"
      }`}>
        <Link href="/#top" className="text-base font-bold tracking-[0.08em] text-brand-navy hover:text-brand-blue transition-colors font-serif" aria-label="Meghraj Goud home">
          Meghraj Goud
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-charcoal/80 lg:flex">
          {desktopSectionItems.map((item) => (
            <Magnetic key={item.href} radius={18} strength={0.22}>
              <Link href={`/${item.href}`} className="group relative px-2.5 py-1.5 transition-colors duration-200 hover:text-brand-blue block">
                {item.label}
                <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 scale-x-0 bg-brand-blue transition-transform duration-300 origin-center group-hover:scale-x-100" />
              </Link>
            </Magnetic>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {desktopUtilityItems.map((item) => (
            <Magnetic key={item.href} radius={22} strength={0.2}>
              <Link
                href={item.href}
                className={`hidden lg:inline-flex ${item.group === "primary" ? "btn btn-secondary btn-sm font-bold border border-brand-border/80 hover:border-brand-blue/30" : "text-xs font-bold uppercase tracking-[0.1em] text-brand-blue hover:text-brand-accent transition-colors"}`}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noreferrer" : undefined}
              >
                {item.label}
              </Link>
            </Magnetic>
          ))}
          <Magnetic radius={18} strength={0.25}>
            <div className="inline-block">
              <ThemeSwitcher />
            </div>
          </Magnetic>
          <MobileNav />
          <Magnetic radius={24} strength={0.22}>
            <Link href="/#contact" className="btn btn-primary btn-sm font-bold tracking-[0.08em] px-4 py-2 block">
              Start a Conversation
            </Link>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
