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
    <section className="section-shell relative overflow-hidden bg-brand-bg shadow-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full bg-brand-blue/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 bottom-0 h-[400px] w-[400px] rounded-full bg-brand-accent/10 blur-[100px]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr,0.85fr] lg:items-start">
          <div className="flex flex-col gap-5">
            <p className="fade-up stagger-1 max-w-prose text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
              {HERO_EYEBROW}
            </p>
            <h1 className="fade-up stagger-2 text-3xl font-bold leading-[1.08] text-brand-navy sm:text-4xl lg:text-6xl tracking-tight">
              {HERO_HEADLINE}
            </h1>
            <p className="fade-up stagger-3 max-w-prose text-base leading-relaxed text-brand-charcoal lg:text-xl">
              {HERO_PROOF_LINE}
            </p>
            <div className="fade-up stagger-2 w-full max-w-xl rounded-2xl border border-brand-border/60 bg-brand-surface/40 backdrop-blur-md p-4 shadow-glass sm:p-5 mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Strategic Partnerships
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Link
                  href="/#contact"
                  className="btn bg-brand-blue text-white hover:bg-sky-400 px-5 py-2.5 rounded-lg font-medium shadow-md transition-all"
                >
                  Consult With Me
                </Link>
                <Link
                  href="/#cases"
                  className="btn border border-brand-border text-brand-navy hover:bg-brand-muted px-5 py-2.5 rounded-lg font-medium transition-all"
                >
                  View Case Studies
                </Link>
              </div>
              <Link href="/resume" className="mt-4 inline-flex text-sm font-semibold text-brand-accent hover:text-brand-blue hover:underline underline-offset-4 transition-colors">
                Review Technical Résumé →
              </Link>
            </div>
            <HeroTrustBadges badges={HERO_TRUST_BADGES} />
          </div>

          <div className="fade-in rounded-2xl border border-brand-border/60 bg-brand-surface/60 backdrop-blur-md p-4 shadow-glass sm:p-6 lg:mt-6">
            <div className="mb-5 border-b border-brand-border/80 pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">
                Impact Snapshot
              </p>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                Execution metrics demonstrating scale, quality, and business value.
              </p>
            </div>
            <div className="grid gap-4">
            {HERO_METRIC_CARDS.map((metric) => (
              <div
                key={metric.label}
                className="card card-hover bg-brand-surface/80 border border-brand-border/40 border-l-4 border-l-brand-blue px-5 py-4 rounded-xl shadow-sm transition hover:shadow-md hover:border-l-brand-accent"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {metric.label}
                </p>
                <p className="mt-1 text-3xl font-bold leading-none text-brand-navy">
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
      </div>
    </section>
  );
}
