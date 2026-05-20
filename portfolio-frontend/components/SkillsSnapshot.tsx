'use client';

import { motion, Variants } from 'framer-motion';
import SectionHeading from './SectionHeading';

const SKILL_GROUPS = [
  {
    label: "Frontend Systems",
    items: ["React", "Next.js", "Flutter", "Dart", "Tailwind CSS", "UI/UX Implementation", "Responsive Views"],
    color: "group-hover:border-blue-500/30"
  },
  {
    label: "Backend & Databases",
    items: ["FastAPI", "Python", "Express", "Node.js", "PostgreSQL", "MySQL", "Redis", "REST APIs", "Prisma"],
    color: "group-hover:border-purple-500/30"
  },
  {
    label: "AI, ML & Automation",
    items: ["AI Workflows", "LLM Integration", "Sentence Transformers", "OCR processing", "pyTesseract", "Semantic Matching"],
    color: "group-hover:border-pink-500/30"
  },
  {
    label: "DevOps & Deployment",
    items: ["AWS", "Firebase", "Docker", "NGINX", "Linux", "Git", "GitHub Actions", "Firebase App Hosting"],
    color: "group-hover:border-emerald-500/30"
  },
  {
    label: "Product & Domains",
    items: ["Admin Dashboards", "Verification Systems", "Healthcare Tech", "Lending Systems", "E-commerce Workflows"],
    color: "group-hover:border-amber-500/30"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const badgeVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { type: "spring", stiffness: 150, damping: 12 }
  }
};

export default function SkillsSnapshot() {
  return (
    <section
      className="section-shell relative bg-brand-bg border-y border-brand-border/40"
      id="skills"
    >
      <div className="absolute right-10 top-1/3 -z-10 h-72 w-72 rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-10 bottom-1/3 -z-10 h-72 w-72 rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Production-Ready Technology Capabilities"
          description="Grouped by what I build with most often across enterprise full-stack deployments and AI-assisted workflows."
          eyebrow="Capabilities"
        />

        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SKILL_GROUPS.map((group) => (
            <motion.article
              key={group.label}
              variants={cardVariants}
              className={`card card-hover p-6 sm:p-7 border border-brand-border/50 bg-brand-surface/40 backdrop-blur-md shadow-glass flex flex-col group`}
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400 mb-5 pb-3 border-b border-brand-border/50 group-hover:text-brand-blue transition-colors">
                {group.label}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <motion.span 
                    key={item} 
                    variants={badgeVariants}
                    className="rounded-full border border-brand-blue/15 bg-brand-surface/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-charcoal hover:border-brand-blue/40 hover:text-brand-blue transition-all duration-300 shadow-sm"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
