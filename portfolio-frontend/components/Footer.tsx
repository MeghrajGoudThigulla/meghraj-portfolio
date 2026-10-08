'use client';

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import Magnetic from "./Magnetic";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

const quickLinks = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/#journey", label: "Experience" },
  { href: "/#skills", label: "Capabilities" },
];

const profileLinks = [
  { href: "mailto:meghraj.thigulla@outlook.com", icon: MailIcon, label: "Email", ariaLabel: "Email Meghraj" },
  { href: "https://github.com/MeghrajGoudThigulla", icon: GithubIcon, label: "GitHub", ariaLabel: "Open Meghraj GitHub profile" },
  { href: "https://www.linkedin.com/in/meghraj-goud-thigulla", icon: LinkedinIcon, label: "LinkedIn", ariaLabel: "Open Meghraj LinkedIn profile" },
  { href: "/resume", icon: FileTextIcon, label: "Résumé", ariaLabel: "Open Meghraj resume" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-border/60 bg-gradient-to-b from-brand-surface to-slate-950/40 dark:to-slate-950/90 py-12 sm:py-16">
      {/* Decorative ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-brand-blue/5 dark:bg-brand-blue/8 blur-[100px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.35fr,0.65fr,0.65fr] lg:gap-12">
          <div>
            <Link href="/#top" className="text-base font-bold tracking-[0.06em] text-brand-navy hover:text-brand-blue" aria-label="Meghraj Goud home">
              Meghraj Goud<span className="text-brand-blue">.</span>
            </Link>
            <p className="mt-4 max-w-xl text-base leading-7 text-brand-charcoal">
              AI & technical consultant building practical software across AI/ML, backend systems, Flutter, infrastructure, and product R&D.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Hyderabad, India · Remote / Hybrid
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Magnetic radius={24} strength={0.2}>
                <Link href="/#contact" className="btn btn-primary text-xs font-bold tracking-[0.08em] px-4 py-2.5">
                  Start a Conversation
                </Link>
              </Magnetic>
              
              <div className="flex items-center gap-2">
                {profileLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Magnetic key={link.href} radius={18} strength={0.25}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={link.ariaLabel}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-border bg-brand-surface/60 text-brand-charcoal transition-all hover:border-brand-blue/30 hover:bg-brand-surface hover:text-brand-blue hover:shadow-sm"
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </a>
                    </Magnetic>
                  );
                })}
              </div>
            </div>
          </div>

          <nav aria-label="Footer quick links">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-blue">Explore</p>
            <ul className="mt-4 grid gap-3 text-sm font-semibold">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-brand-charcoal hover:text-brand-blue transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Professional profiles">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-blue">Connect</p>
            <ul className="mt-4 grid gap-3 text-sm font-semibold">
              {profileLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-brand-charcoal hover:text-brand-blue transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-brand-border/60 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Meghraj Goud. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/resume" className="font-semibold text-brand-charcoal hover:text-brand-blue transition-colors">
              Résumé
            </Link>
            <Magnetic radius={15} strength={0.3}>
              <Link href="/#top" className="inline-flex items-center gap-1 font-semibold text-brand-blue hover:text-brand-accent transition-colors">
                <span>Back to top</span>
                <ArrowUp className="h-3 w-3 animate-bounce" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
