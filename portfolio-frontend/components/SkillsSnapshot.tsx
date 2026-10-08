'use client';

import { motion, Variants, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { resumeData } from '@/data/resume';

export default function SkillsSnapshot() {
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
    <section className="section-shell border-y border-brand-border/40 bg-brand-bg" id="skills">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Engineering Capabilities"
          description="A direct inventory of technologies and domain architecture I work across in production systems, sourced directly from verified experience."
          eyebrow="CORE SKILLS"
        />

        <motion.div
          className="mt-12 divide-y divide-brand-border/60 border-y border-brand-border/60"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {resumeData.skills.map((item, index) => (
            <motion.div
              key={item.category}
              variants={rowVariants}
              className="group grid gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6 sm:items-baseline transition-colors hover:bg-brand-surface/40 px-2 sm:px-4 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] font-semibold text-brand-blue">
                  0{index + 1}
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-navy group-hover:text-brand-blue transition-colors">
                  {item.category}
                </h3>
              </div>
              <p className="font-mono text-sm leading-relaxed text-brand-charcoal">
                {item.skills}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
