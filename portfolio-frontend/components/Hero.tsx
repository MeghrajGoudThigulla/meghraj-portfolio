import Link from "next/link";
import HeroTrustBadges from "./HeroTrustBadges";
import {
  HERO_EYEBROW,
  HERO_HEADLINE,
  HERO_METRIC_CARDS,
  HERO_PROOF_LINE,
  HERO_TRUST_BADGES,
} from "@/content/heroProof";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-sky-50 py-20 shadow-sm sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-sky-100/50 blur-3xl"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="flex flex-col gap-4">
            <p className="fade-up stagger-1 max-w-prose text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              {HERO_EYEBROW}
            </p>
            <h1 className="fade-up stagger-2 text-3xl font-bold leading-tight text-brand-navy sm:text-4xl lg:text-6xl">
              {HERO_HEADLINE}
            </h1>
            <p className="fade-up stagger-3 max-w-prose text-lg leading-relaxed text-brand-charcoal lg:text-xl">
              {HERO_PROOF_LINE}
            </p>
            <div className="fade-up stagger-2 flex flex-wrap items-center gap-3">
              <Link
                href="#contact"
                className="btn btn-primary"
              >
                Contact Me
              </Link>
              <Link
                href="#cases"
                className="btn btn-secondary"
              >
                View Case Studies
              </Link>
            </div>
            <Link href="/resume" className="fade-up stagger-3 btn btn-ghost w-fit">
              View Resume
            </Link>
            <HeroTrustBadges badges={HERO_TRUST_BADGES} />
          </div>

          <div className="grid gap-4">
            {HERO_METRIC_CARDS.map((metric) => (
              <div
                key={metric.label}
                className="card card-hover fade-in border-t-4 border-t-brand-blue/60 px-4 py-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-3 text-3xl font-bold text-brand-blue">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
