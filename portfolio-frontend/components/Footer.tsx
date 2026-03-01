import Link from "next/link";

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#cases", label: "Case Studies" },
  { href: "#contact", label: "Contact" },
];

const profileLinks = [
  {
    href: "mailto:meghraj.thigulla@outlook.com",
    label: "Email",
    ariaLabel: "Email Meghraj",
  },
  {
    href: "https://github.com/MeghrajGoudThigulla",
    label: "GitHub",
    ariaLabel: "Open Meghraj GitHub profile",
  },
  {
    href: "https://www.linkedin.com/in/meghraj-goud-thigulla",
    label: "LinkedIn",
    ariaLabel: "Open Meghraj LinkedIn profile",
  },
  {
    href: "/resume",
    label: "Résumé",
    ariaLabel: "Open Meghraj resume",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand-charcoal/10 bg-white py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr,0.8fr,0.9fr] lg:px-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Meghraj Goud
          </p>
          <p className="text-xl font-semibold text-brand-navy">
            Backend-first engineering systems for fintech and operations teams.
          </p>
          <p className="max-w-prose text-sm text-brand-charcoal">
            Built for recruiter scanability and technical deep-dives. Metrics,
            case studies, and contact workflows are tracked for iteration.
          </p>
        </div>

        <nav aria-label="Footer quick links" className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Quick Links
          </p>
          <ul className="grid gap-2 text-sm font-semibold text-brand-blue">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-brand-navy hover:underline underline-offset-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Profiles
          </p>
          <ul className="grid gap-2 text-sm font-semibold text-brand-blue">
            {profileLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={link.ariaLabel}
                  className="hover:text-brand-navy hover:underline underline-offset-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500">
            Hyderabad, India • Available for remote and hybrid delivery.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-4 text-xs text-slate-500 sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Meghraj Goud. All rights reserved.</p>
      </div>
    </footer>
  );
}
