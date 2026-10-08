'use client';

import { useState } from 'react';
import { motion, Variants, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { resumeData } from '@/data/resume';

const ARSENAL_PILLARS = [
  {
    code: "PIL-01",
    title: "NEURAL & INGESTION",
    summary: "PyTesseract OCR · Dense Vectors · ONNX",
    gradient: "from-emerald-400 to-teal-500",
    border: "border-emerald-500/30",
  },
  {
    code: "PIL-02",
    title: "DISTRIBUTED BACKEND",
    summary: "286 Endpoints · FastAPI · Celery Workers",
    gradient: "from-cyan-400 to-blue-500",
    border: "border-cyan-500/30",
  },
  {
    code: "PIL-03",
    title: "ENTERPRISE STORAGE",
    summary: "PostgreSQL · Redis Caching · 30+ Migrations",
    gradient: "from-indigo-400 to-purple-500",
    border: "border-indigo-500/30",
  },
  {
    code: "PIL-04",
    title: "CROSS-PLATFORM CLIENTS",
    summary: "4+ Flutter Apps · Next.js 16 · App/Play Stores",
    gradient: "from-sky-400 to-emerald-400",
    border: "border-sky-500/30",
  },
];

export default function SkillsSnapshot() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const shouldReduceMotion = useReducedMotion();
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.04 } },
  };

  const rowVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0.05 }
        : { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="section-shell border-y border-brand-border/40 bg-brand-bg" id="skills" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          titleId="skills-heading"
          title="Engineering Capabilities"
          description="A direct inventory of technologies and domain architecture I work across in production systems, sourced directly from verified experience."
          eyebrow="CORE SKILLS"
        />

        {/* Tactical Arsenal Radar Pods */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-[11px]">
          {ARSENAL_PILLARS.map((pillar) => (
            <div
              key={pillar.code}
              className={`rounded-2xl border ${pillar.border} bg-[#080B10]/90 p-3.5 sm:p-4 shadow-lg backdrop-blur-md hud-bracket transition-all hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span className="font-bold text-cyan-400">[{pillar.code}]</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="mt-2 font-bold tracking-wider text-white text-xs sm:text-sm font-sans uppercase">
                {pillar.title}
              </p>
              <p className="mt-1 text-[10px] text-slate-400 font-semibold truncate">
                {pillar.summary}
              </p>
            </div>
          ))}
        </div>

        {/* Category Spotlight Filter Bar */}
        <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs border-b border-brand-border/50 pb-4">
          <span className="text-[10px] uppercase font-bold text-slate-500 mr-2 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>{"SPOTLIGHT //"}</span>
          </span>
          {['ALL', ...resumeData.skills.map((s) => s.category)].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-all ${
                activeCategory === cat
                  ? 'border border-cyan-400 bg-cyan-950/80 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'border border-cyan-500/15 bg-[#080B10]/60 text-slate-400 hover:border-cyan-400/40 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? 'ALL ARCHITECTURES' : cat}
            </button>
          ))}
        </div>

        <motion.div
          className="mt-6 space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {resumeData.skills.map((item, index) => {
            const skillChips = item.skills.split(", ");
            const isHighlighted = activeCategory === 'ALL' || activeCategory === item.category;
            return (
              <motion.div
                key={item.category}
                data-testid="skill-row"
                variants={rowVariants}
                className={`group relative overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-300 hud-bracket ${
                  isHighlighted
                    ? 'border-cyan-500/40 bg-[#080B10]/95 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_15px_rgba(0,240,255,0.08)]'
                    : 'border-brand-border/30 bg-brand-surface/30 opacity-30 grayscale-[0.6]'
                }`}
              >
                <div className="grid gap-3 sm:grid-cols-[14rem_1fr] sm:gap-6 sm:items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                        DOMAIN // [{String(index + 1).padStart(2, "0")}]
                      </span>
                    </div>
                    <h3 className="mt-1 text-base font-bold uppercase tracking-wider text-white group-hover:text-cyan-300 transition-colors font-mono">
                      {item.category}
                    </h3>
                  </div>

                  <div>
                    {/* Interactive Tactical Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {skillChips.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-cyan-500/20 bg-cyan-950/25 px-2.5 py-1 font-mono text-[11px] font-semibold text-cyan-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-900/40 hover:text-white hover:shadow-[0_0_10px_rgba(0,240,255,0.25)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Accessible text representation */}
                    <p className="font-mono text-[11px] leading-relaxed text-slate-400 border-t border-brand-border/40 pt-2 opacity-80">
                      {item.skills}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
