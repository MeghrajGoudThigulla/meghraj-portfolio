'use client';

import { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import HeroTrustBadges from "./HeroTrustBadges";
import AnimatedGridBackground from "./AnimatedGridBackground";
import CountUp from "./CountUp";
import MatrixRainCanvas from "./MatrixRainCanvas";
import StarkArcVisualizer from "./StarkArcVisualizer";
import TacticalHudControls, { ThemeProtocol } from "./TacticalHudControls";
import {
  HERO_CTA_LINKS,
  HERO_EYEBROW,
  HERO_HEADLINE,
  HERO_METRIC_CARDS,
  HERO_PROOF_LINE,
  HERO_TRUST_BADGES,
} from "@/content/heroProof";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const [protocol, setProtocol] = useState<ThemeProtocol>("stark");

  return (
    <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden border-b border-brand-border/50 bg-[#06080e] py-12 sm:py-20 lg:min-h-[92vh] lg:py-24">
      {/* Background Matrix Rain Layer */}
      <MatrixRainCanvas
        opacity={protocol === "matrix" ? 0.38 : protocol === "hybrid" ? 0.22 : 0.09}
        colorScheme={protocol === "matrix" ? "green" : protocol === "hybrid" ? "gold" : "cyan"}
      />

      <AnimatedGridBackground />

      {/* Atmospheric Radial Gradients */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full blur-[140px] transition-colors duration-700 ${
          protocol === "matrix" ? "bg-emerald-500/15" : "bg-cyan-500/15"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -left-48 bottom-0 h-80 w-80 rounded-full blur-[130px] transition-colors duration-700 ${
          protocol === "matrix" ? "bg-emerald-600/10" : "bg-cyan-600/10"
        }`}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tactical HUD Header Bar */}
        <div className="mb-8">
          <TacticalHudControls
            currentProtocol={protocol}
            onProtocolChange={setProtocol}
          />
        </div>

        <motion.div
          className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:items-center lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Tactical Identity & Directives */}
          <div className="flex max-w-4xl flex-col">
            <motion.div variants={textVariants} className="flex items-center gap-3">
              <span
                aria-hidden
                className={`h-px w-10 transition-colors duration-500 ${
                  protocol === "matrix" ? "bg-emerald-400" : "bg-cyan-400"
                }`}
              />
              <p
                className={`text-[11px] font-mono font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                  protocol === "matrix" ? "text-emerald-400" : "text-cyan-400"
                }`}
              >
                {protocol === "matrix"
                  ? `[NEBUCHADNEZZAR] · ${HERO_EYEBROW}`
                  : `[STARK // MK-85] · ${HERO_EYEBROW}`}
              </p>
            </motion.div>

            <motion.h1
              variants={textVariants}
              className="mt-6 max-w-4xl text-[clamp(2.75rem,6.5vw,6.5rem)] font-black leading-[0.94] tracking-[-0.055em] text-white"
            >
              {HERO_HEADLINE}
            </motion.h1>

            <motion.p
              variants={textVariants}
              className="mt-6 max-w-2xl leading-relaxed text-slate-300 font-sans"
              style={{ fontSize: "clamp(0.95rem, 0.92rem + 0.18vw, 1.15rem)" }}
            >
              {HERO_PROOF_LINE}
            </motion.p>

            {/* Action CTA Buttons */}
            <motion.div variants={textVariants} className="mt-8 flex flex-wrap items-center gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 450, damping: 14 }}>
                <Link
                  href={HERO_CTA_LINKS[0].href}
                  data-testid={HERO_CTA_LINKS[0].testId}
                  className="btn btn-primary px-6 py-3.5 text-xs font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                  {HERO_CTA_LINKS[0].label}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 450, damping: 14 }}>
                <Link
                  href={HERO_CTA_LINKS[1].href}
                  data-testid={HERO_CTA_LINKS[1].testId}
                  className="btn btn-secondary px-6 py-3.5 text-xs font-semibold"
                >
                  {HERO_CTA_LINKS[1].label}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06, x: 2 }} whileTap={{ scale: 0.94 }} transition={{ type: "spring", stiffness: 450, damping: 14 }}>
                <Link
                  href={HERO_CTA_LINKS[2].href}
                  data-testid={HERO_CTA_LINKS[2].testId}
                  className="inline-block px-2 py-3.5 text-xs font-semibold text-slate-300 underline decoration-slate-600 underline-offset-4 transition-colors hover:text-cyan-400 hover:decoration-cyan-400 font-mono"
                >
                  {HERO_CTA_LINKS[2].label}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 450, damping: 14 }}>
                <Link
                  href="/world"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/50 bg-cyan-950/30 px-5 py-3.5 text-xs font-mono font-bold text-cyan-300 hover:border-cyan-300 hover:bg-cyan-900/40 hover:text-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>Interactive 3D: Enter System World ◎</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={textVariants} className="mt-10 max-w-3xl">
              <HeroTrustBadges badges={HERO_TRUST_BADGES} />
            </motion.div>
          </div>

          {/* Right Column: Holographic Arc Reactor Visualizer & System Signals */}
          <motion.aside
            variants={cardVariants}
            className="flex flex-col items-center rounded-3xl border border-cyan-500/20 bg-[#080B10]/70 p-6 shadow-2xl backdrop-blur-xl hud-bracket lg:p-7"
          >
            {/* Embedded Interactive Arc Reactor / Neural Core */}
            <StarkArcVisualizer mode={protocol} />

            {/* Selected Signals Header */}
            <div className="mt-6 flex w-full items-baseline justify-between gap-4 border-t border-cyan-950 pt-5">
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400">
                  {"// TELEMETRY SIGNALS"}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-300 font-sans">
                  Concrete operational indicators behind the architecture.
                </p>
              </div>
              <span aria-hidden className="font-mono text-[10px] text-cyan-500/70">
                01—04
              </span>
            </div>

            {/* Metric Signal Cards */}
            <div className="mt-4 w-full divide-y divide-cyan-950/80 border-y border-cyan-950/80">
              {HERO_METRIC_CARDS.map((metric, index) => (
                <div
                  key={metric.label}
                  className="group relative grid grid-cols-[auto_1fr] gap-4 py-4 pl-3 -ml-3 transition-all duration-300 hover:bg-cyan-950/20 rounded-xl border-l-2 border-transparent hover:border-cyan-400/80"
                >
                  <span className="pt-1 font-mono text-[10px] text-cyan-500/80 transition-transform duration-300 group-hover:translate-x-1">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="text-2xl font-bold tracking-tight text-white font-mono transition-all duration-300 group-hover:text-cyan-300 text-glow">
                        <CountUp value={metric.value} />
                      </p>
                      <p className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-slate-400">
                        {metric.label}
                      </p>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      {metric.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
