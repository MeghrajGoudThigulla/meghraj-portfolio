import Link from "next/link";
import MobileNav from "./MobileNav";
import { navItems } from "./navItems";

export default function Navbar() {
  const desktopSectionItems = navItems.filter((item) => item.group === "section");
  const desktopUtilityItems = navItems.filter((item) => item.group !== "section");

  return (
    <header className="sticky top-0 z-30 border-b border-brand-border/80 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/#top" className="text-base font-semibold tracking-[0.06em] text-brand-navy">
          Meghraj Goud
        </Link>
        <nav className="hidden items-center gap-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 lg:flex">
          {desktopSectionItems.map((item) => (
            <Link
              key={item.href}
              href={`/${item.href}`}
              className="rounded-md px-2 py-1 transition hover:bg-brand-muted hover:text-brand-blue"
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
                item.group === "primary" ? "btn btn-secondary btn-sm" : "text-sm font-semibold text-brand-blue hover:text-brand-navy"
              }`}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noreferrer" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <MobileNav />
          <Link
            href="/#contact"
            className="btn btn-primary btn-sm"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
