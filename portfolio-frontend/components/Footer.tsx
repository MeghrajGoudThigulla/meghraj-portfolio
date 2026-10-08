'use client';

import { useState, useEffect } from "react";
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
  const [timeString, setTimeString] = useState<{ ist: string; utc: string }>({
    ist: "00:00:00",
    utc: "00:00:00",
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const ist = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false });
      const utc = now.toLocaleTimeString("en-GB", { timeZone: "UTC", hour12: false });
      setTimeString({ ist, utc });
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-cyan-500/30 bg-[#06080E] text-slate-300 py-12 sm:py-16 font-sans">
      {/* Laser Wire Accent */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 shadow-[0_0_12px_rgba(0,240,255,0.6)]" />

      {/* Decorative ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-cyan-500/5 blur-[120px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.35fr,0.65fr,0.65fr] lg:gap-12">
          <div>
            <Link href="/#top" className="text-lg font-extrabold tracking-wider text-white hover:text-cyan-400 font-mono transition-colors" aria-label="Meghraj Goud home">
              MEGHRAJ GOUD<span className="text-cyan-400">{" // ARCHITECT"}</span>
            </Link>
            <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-slate-400">
              Senior AI Developer & Full Stack Engineer building practical systems across AI/ML, distributed backends, Flutter mobile apps, and production infrastructure.
            </p>

            {/* Live Telemetry Heartbeat Pill */}
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-cyan-500/25 bg-cyan-950/20 px-3 py-1.5 font-mono text-[10px] text-cyan-300 w-fit">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="font-bold text-emerald-400">{"CORE STATUS //"}</span>
              <span className="text-slate-300">286 ENDPOINTS · 61+ MODELS · 4 MOBILE APPS · VERIFIED</span>
            </div>

            {/* Live Dual World Clocks */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2.5 font-mono text-[10px]">
              <div className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-[#080B10] px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-slate-400 font-bold">HYDERABAD [IST]:</span>
                <span className="text-cyan-300 font-bold tracking-wider">{timeString.ist}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-[#080B10] px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                <span className="text-slate-500 font-bold">UTC [ZULU]:</span>
                <span className="text-slate-300 font-bold tracking-wider">{timeString.utc}</span>
              </div>
            </div>

            <p className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              HYDERABAD, INDIA · ASIA/KOLKATA (UTC+5:30) · REMOTE / HYBRID
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Magnetic radius={24} strength={0.2}>
                <Link href="/#contact" className="btn btn-primary text-xs font-mono font-bold tracking-wider px-4 py-2.5 shadow-[0_0_18px_rgba(0,240,255,0.25)]">
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
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-950/20 text-slate-300 transition-all hover:border-cyan-400 hover:bg-cyan-900/40 hover:text-white hover:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
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

        {/* Terminal CLI Status Ribbon */}
        <div className="mt-10 rounded-2xl border border-cyan-500/25 bg-[#04060A] p-3 sm:p-4 font-mono text-[11px] text-slate-300 shadow-inner flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-emerald-400 font-bold shrink-0">guest@meghraj-core:~$</span>
            <span className="text-cyan-300 shrink-0">systemctl --status active</span>
            <span className="h-3 w-1.5 bg-cyan-400 animate-pulse shrink-0" />
          </div>
          <div className="flex items-center gap-2.5 text-[10px] text-slate-400 shrink-0">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
            <span>{"//"}</span>
            <span>UPTIME: 99.98%</span>
            <span>{"//"}</span>
            <span className="text-cyan-400 font-semibold">ALL PRODUCTION CLAIMS FACTUAL</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-cyan-950/80 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between font-mono">
          <p>© {new Date().getFullYear()} Meghraj Goud. All production claims verified.</p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/resume" className="font-sans font-semibold text-slate-300 hover:text-cyan-400 transition-colors">
              Résumé
            </Link>
            <Link href="/world" className="font-mono text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors" title="3D System World">
              [WORLD]
            </Link>
            <Link href="/chat" className="font-mono text-[10px] text-amber-400 hover:text-amber-300 transition-colors" title="Operator Console">
              [OPERATOR]
            </Link>
            <Link href="/garage" className="font-mono text-[10px] text-slate-500 hover:text-cyan-400 transition-colors opacity-60 hover:opacity-100" title="Endurance Telemetry">
              [GARAGE]
            </Link>
            <Link href="/pit" className="font-mono text-[10px] text-slate-500 hover:text-cyan-400 transition-colors opacity-60 hover:opacity-100" title="Roadster Telemetry">
              [PIT]
            </Link>
            <Magnetic radius={15} strength={0.3}>
              <Link href="/#top" className="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                <span>Top</span>
                <ArrowUp className="h-3 w-3 animate-bounce" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
