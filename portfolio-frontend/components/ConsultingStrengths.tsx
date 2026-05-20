'use client';

import { motion, Variants } from 'framer-motion';
import { 
  Compass, 
  Layers, 
  MousePointerClick, 
  Zap, 
  Cpu, 
  MessageSquare 
} from 'lucide-react';
import SectionHeading from './SectionHeading';

const STRENGTHS = [
  {
    icon: Compass,
    title: "Product Understanding",
    description: "Deconstruct operational and business bottlenecks into logical feature flows, prioritizing strategic impact over raw lines of code.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: Layers,
    title: "System Architecture",
    description: "Design relational datalayers, caching clusters, background worker queues, and clean API gateways to build secure, highly scalable architectures.",
    color: "from-purple-500 to-indigo-400"
  },
  {
    icon: MousePointerClick,
    title: "UI/UX Thinking",
    description: "Bridge the gap between frontend beauty and functional usability. Craft fluid, keyboard-accessible interfaces that drive user adoption.",
    color: "from-pink-500 to-rose-400"
  },
  {
    icon: Zap,
    title: "Technical Execution",
    description: "Deliver battle-tested solutions using FastAPI, React/Next.js, Flutter, and PostgreSQL. Strict typing, robust test pipelines, and zero-downtime deploys.",
    color: "from-emerald-500 to-teal-400"
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    description: "Apply modern intelligent processing (semantic search, OCR document intelligence, batch worker pipelines) to digitize labor-intensive enterprise workflows.",
    color: "from-amber-500 to-orange-400"
  },
  {
    icon: MessageSquare,
    title: "Strategic Communication",
    description: "Translate deep architectural constraints, database schemas, and engineering compromises into actionable business choices for founders and stakeholders.",
    color: "from-sky-500 to-blue-400"
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
  hidden: { y: 24, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export default function ConsultingStrengths() {
  return (
    <section id="strengths" className="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-brand-bg">
      {/* Decorative Glow Elements */}
      <div className="absolute right-0 top-1/4 -z-10 h-72 w-72 rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-brand-blue/5 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Consulting-Oriented Strengths"
          description="Positioning technical expertise at the intersection of business strategy, system scalability, and practical product execution."
        />

        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {STRENGTHS.map((strength) => {
            const Icon = strength.icon;
            return (
              <motion.div
                key={strength.title}
                variants={cardVariants}
                className="card card-hover group border-glow-hover p-6 sm:p-8 flex flex-col justify-between min-h-[260px] bg-brand-surface/50 border-brand-border/40"
              >
                <div>
                  <div className={`inline-flex items-center justify-center rounded-xl p-3 bg-gradient-to-br ${strength.color} bg-opacity-10 text-white mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 stroke-[1.75]" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-brand-navy mb-3 group-hover:text-brand-blue transition-colors">
                    {strength.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-charcoal">
                    {strength.description}
                  </p>
                </div>
                
                {/* Visual Accent Corner Glow */}
                <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-bl from-brand-blue/10 to-transparent rounded-tr-2xl pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
