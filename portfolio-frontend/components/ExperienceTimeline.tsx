'use client';

import { motion, Variants } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';

const TIMELINE_EVENTS = [
  {
    type: 'work',
    icon: Briefcase,
    role: "Senior AI Developer & Full-Stack Architect",
    company: "Threshing Floor Group",
    period: "2024 - Present",
    description: "Served as technical lead across six separate product platforms, aligning customer needs with production-ready execution. Championed transition from flat data schemas to clean relational structures.",
    achievements: [
      "Designed real-time dual-write data synchronization layer between PostgreSQL and Firestore for emergency responder dispatcher interfaces.",
      "Engineered automated compliance onboarding engines utilizing OCR text parsing and semantic embeddings, reducing verification times from hours to minutes.",
      "Oversaw team-wide typescript type safety and modular backend architectures using Express/FastAPI."
    ]
  },
  {
    type: 'education',
    icon: GraduationCap,
    role: "Bachelor of Technology in Information Technology",
    company: "Vignana Bharathi Institute of Technology (VBIT)",
    period: "2020 - 2024",
    description: "Specialized in data structures, database management systems, and web architecture. Balanced core computer science theory with practical hackathon leadership.",
    achievements: [
      "Elected Coordinator for Samu Sangathan, driving cross-functional student project collaborations.",
      "Built mock bank ledgers and e-commerce models to master concurrency, session management, and transaction isolation."
    ]
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const eventVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 14 }
  }
};

export default function ExperienceTimeline() {
  return (
    <section id="journey" className="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-brand-bg">
      <div className="absolute right-[-10%] bottom-[-10%] h-[50%] w-[50%] rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Professional Journey"
          description="A timeline highlighting technical leadership, full-stack systems engineering, and strategic transition towards consulting."
        />

        <motion.div 
          className="relative mt-16 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-brand-border/60 sm:before:left-1/2 sm:before:-ml-[1px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TIMELINE_EVENTS.map((event, index) => {
            const Icon = event.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={event.role}
                variants={eventVariants}
                className="relative mb-12 sm:mb-16 last:mb-0 group"
              >
                {/* Connector Dot */}
                <div className="absolute left-4 top-2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-brand-blue group-hover:text-brand-accent group-hover:border-brand-accent transition-colors duration-300 sm:left-1/2">
                  <Icon className="h-4 w-4 stroke-[1.75]" />
                </div>

                {/* Timeline Card */}
                <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] ${isEven ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto'}`}>
                  <div className="card p-6 sm:p-8 bg-brand-surface/50 border-brand-border/40 relative border-glow-hover">
                    {/* Period Indicator */}
                    <span className="inline-block rounded-full bg-brand-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-brand-blue mb-4">
                      {event.period}
                    </span>

                    <h3 className="text-xl font-bold tracking-tight text-brand-navy mb-1 group-hover:text-brand-accent transition-colors">
                      {event.role}
                    </h3>
                    <p className="text-sm font-semibold text-slate-400 mb-4">
                      {event.company}
                    </p>

                    <p className="text-sm leading-relaxed text-brand-charcoal mb-6">
                      {event.description}
                    </p>

                    {/* Achievement Bullet Points */}
                    <ul className={`space-y-3 text-sm text-brand-charcoal text-left ${isEven ? 'sm:flex sm:flex-col sm:items-end' : ''}`}>
                      {event.achievements.map((ach, idx) => (
                        <li key={idx} className="flex gap-2.5 max-w-prose">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue" />
                          <span className="leading-relaxed">{ach}</span>
                        </li>
                      ))}
                    </ul>
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
