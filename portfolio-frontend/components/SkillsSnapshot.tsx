'use client';

import { motion, Variants } from 'framer-motion';
import SectionHeading from './SectionHeading';

const SKILL_GROUPS = [
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Flutter', 'Dart', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'Express', 'REST APIs', 'Prisma'] },
  { label: 'Data & Infrastructure', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase', 'Docker'] },
  { label: 'AI & Automation', items: ['LLM Integration', 'NLP', 'OCR', 'Semantic Matching', 'AI Workflows'] },
  { label: 'Delivery', items: ['Git', 'GitHub Actions', 'AWS', 'Render', 'NGINX', 'Linux'] },
  { label: 'Product Domains', items: ['Healthcare', 'Lending', 'Verification', 'E-commerce', 'Admin Platforms'] },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function SkillsSnapshot() {
  return (
    <section className="section-shell border-y border-brand-border/40 bg-brand-bg" id="skills">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Engineering Capabilities"
          description="A focused view of the technologies I use to design, build, ship, and maintain production software."
          eyebrow="TECH STACK"
        />

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SKILL_GROUPS.map((group, index) => (
            <motion.article
              key={group.label}
              variants={cardVariants}
              className="card card-hover p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue">
                  0{index + 1}
                </span>
                <span className="h-px flex-1 bg-brand-border" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-brand-navy">{group.label}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-brand-border bg-brand-muted/60 px-2.5 py-1.5 font-mono text-[10px] font-medium text-brand-charcoal transition-colors hover:border-brand-blue/40 hover:text-brand-blue"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
