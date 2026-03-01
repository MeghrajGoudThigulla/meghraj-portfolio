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
    <section className="section-shell relative overflow-hidden bg-gradient-to-br from-white via-white to-sky-50 shadow-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-sky-100/50 blur-3xl"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr,0.85fr] lg:items-start">
          <div className="flex flex-col gap-5">
            <p className="fade-up stagger-1 max-w-prose text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {HERO_EYEBROW}
            </p>
            <h1 className="fade-up stagger-2 text-3xl font-bold leading-[1.08] text-brand-navy sm:text-4xl lg:text-6xl">
              {HERO_HEADLINE}
            </h1>
            <p className="fade-up stagger-3 max-w-prose text-base leading-relaxed text-brand-charcoal lg:text-xl">
              {HERO_PROOF_LINE}
            </p>
            <div className="fade-up stagger-2 w-full max-w-xl rounded-2xl border border-brand-border bg-white/90 p-4 shadow-elev-1 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Recruiter Path
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Link
                  href="/#contact"
                  className="btn btn-primary"
                >
                  Contact Me
                </Link>
                <Link
                  href="/#cases"
                  className="btn btn-secondary"
                >
                  View Case Studies
                </Link>
              </div>
              <Link href="/resume" className="mt-3 inline-flex text-sm font-semibold text-brand-blue hover:text-brand-navy hover:underline underline-offset-4">
                View Resume
              </Link>
            </div>
            <HeroTrustBadges badges={HERO_TRUST_BADGES} />
          </div>

          <div className="fade-in rounded-2xl border border-brand-border bg-white/90 p-4 shadow-elev-1 sm:p-5">
            <div className="mb-4 border-b border-brand-border pb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                Delivery Proof
              </p>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">
                Execution metrics from production and pre-release systems.
              </p>
            </div>
            <div className="grid gap-3">
            {HERO_METRIC_CARDS.map((metric) => (
              <div
                key={metric.label}
                className="card card-hover border-l-4 border-l-brand-blue/70 px-4 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-2 text-3xl font-bold leading-none text-brand-blue">
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
