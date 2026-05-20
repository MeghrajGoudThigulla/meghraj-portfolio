'use client';

import Link from "next/link";
import MobileNav from "./MobileNav";
import ThemeSwitcher from "./ThemeSwitcher";
import { navItems } from "./navItems";

export default function Navbar() {
  const desktopSectionItems = navItems.filter((item) => item.group === "section");
  const desktopUtilityItems = navItems.filter((item) => item.group !== "section");

  return (
    <header className="sticky top-0 z-30 border-b border-brand-border/60 bg-brand-bg/75 backdrop-blur-md shadow-glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link 
          href="/#top" 
          className="text-base font-bold tracking-[0.08em] text-brand-navy hover:text-brand-blue transition-colors font-serif"
        >
          Meghraj Goud
        </Link>
        
        <nav className="hidden items-center gap-4 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-charcoal/80 lg:flex">
          {desktopSectionItems.map((item) => (
            <Link
              key={item.href}
              href={`/${item.href}`}
              className="rounded-lg px-2.5 py-1.5 transition-all duration-300 hover:bg-brand-surface/60 hover:text-brand-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {desktopUtilityItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hidden lg:inline-flex ${
                item.group === "primary" 
                  ? "btn btn-secondary btn-sm font-bold border border-brand-border/80 hover:border-brand-blue/30" 
                  : "text-xs font-bold uppercase tracking-[0.1em] text-brand-blue hover:text-brand-accent transition-colors"
              }`}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noreferrer" : undefined}
            >
              {item.label}
            </Link>
          ))}
          
          <ThemeSwitcher />
          
          <MobileNav />
          
          <Link
            href="/#contact"
            className="btn btn-primary btn-sm font-bold tracking-[0.1em] px-4 py-2"
          >
            Consult With Me
          </Link>
        </div>
      </div>
    </header>
  );
}
