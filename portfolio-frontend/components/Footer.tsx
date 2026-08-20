import Link from "next/link";

const quickLinks = [
  { href: "/#about", label: "About" },
  { href: "/#strengths", label: "Approach" },
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/#journey", label: "Experience" },
  { href: "/#skills", label: "Capabilities" },
];

const profileLinks = [
  { href: "mailto:meghraj.thigulla@outlook.com", label: "Email", ariaLabel: "Email Meghraj" },
  { href: "https://github.com/MeghrajGoudThigulla", label: "GitHub", ariaLabel: "Open Meghraj GitHub profile" },
  { href: "https://www.linkedin.com/in/meghraj-goud-thigulla", label: "LinkedIn", ariaLabel: "Open Meghraj LinkedIn profile" },
  { href: "/resume", label: "Résumé", ariaLabel: "Open Meghraj resume" },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-surface py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.35fr,0.65fr,0.65fr] lg:gap-12">
          <div>
            <Link href="/#top" className="text-sm font-bold tracking-[0.06em] text-brand-navy hover:text-brand-blue" aria-label="Meghraj Goud home">
              Meghraj Goud<span className="text-brand-blue">.</span>
            </Link>
            <p className="mt-4 max-w-xl text-base leading-7 text-brand-charcoal">
              AI & technical consultant building practical software across AI/ML, backend systems, Flutter, infrastructure, and product R&D.
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
              Hyderabad, India · Remote / Hybrid
            </p>
            <Link href="/#contact" className="btn btn-primary mt-6 inline-flex text-xs font-bold tracking-[0.08em]">
              Start a Conversation
            </Link>
          </div>

          <nav aria-label="Footer quick links">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue">Explore</p>
            <ul className="mt-4 grid gap-2.5 text-sm font-semibold">
              {quickLinks.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-brand-charcoal hover:text-brand-blue">{link.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Professional profiles">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue">Connect</p>
            <ul className="mt-4 grid gap-2.5 text-sm font-semibold">
              {profileLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} aria-label={link.ariaLabel} className="text-brand-charcoal hover:text-brand-blue">{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-brand-border pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Meghraj Goud.</p>
          <div className="flex items-center gap-4">
            <Link href="/resume" className="font-semibold text-brand-charcoal hover:text-brand-blue">Résumé</Link>
            <Link href="/#top" className="font-semibold text-brand-blue hover:text-brand-accent">Back to top ↑</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
