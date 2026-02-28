import Link from "next/link";
import MobileNav from "./MobileNav";
import { navItems } from "./navItems";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-brand-charcoal/10 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="#top" className="text-base font-semibold text-brand-navy">
          Meghraj Goud
        </Link>
        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-brand-blue"
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noreferrer" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link
            href="#contact"
            className="btn btn-primary btn-sm"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
