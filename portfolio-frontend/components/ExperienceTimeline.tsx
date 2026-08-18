'use client';

import { motion, Variants } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';

const TIMELINE_EVENTS = [
  {
    type: 'work',
    icon: Briefcase,
    role: 'Senior AI Developer & Full-Stack Architect',
    company: 'Threshing Floor Group',
    period: '2024 — Present',
    description: 'Technical lead across multiple production platforms, translating product requirements into secure, scalable full-stack systems.',
    achievements: [
      'Designed real-time PostgreSQL and Firestore synchronization for emergency responder workflows.',
      'Built OCR and semantic-matching onboarding systems that moved verification work from hours toward minutes.',
      'Standardized TypeScript, Express, and FastAPI architecture across product teams.'
    ]
  },
  {
    type: 'education',
    icon: GraduationCap,
    role: 'B.Tech, Information Technology',
    company: 'Vignana Bharathi Institute of Technology',
    period: '2020 — 2024',
    description: 'Built a foundation in data structures, databases, software architecture, and practical product development.',
    achievements: [
      'Coordinated cross-functional student project collaborations through Samu Sangathan.',
      'Applied concurrency, transactions, session management, and database design through hands-on systems projects.'
    ]
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const eventVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function ExperienceTimeline() {
  return (
    <section id="journey" className="section-shell bg-brand-bg">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience & Education"
          description="The work and training behind the systems shown above, with emphasis on ownership, architecture, and measurable delivery."
          eyebrow="BACKGROUND"
        />

        <motion.div
          className="relative mt-12 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-brand-border sm:before:left-1/2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {TIMELINE_EVENTS.map((event, index) => {
            const Icon = event.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div key={event.role} variants={eventVariants} className="relative mb-10 last:mb-0 sm:mb-14">
                <div className="absolute left-4 top-5 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-brand-blue sm:left-1/2">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>

                <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] ${isEven ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
                  <article className="card card-hover p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
                        {event.period}
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                        {event.type === 'work' ? 'Professional' : 'Education'}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-brand-navy sm:text-2xl">
                      {event.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-brand-blue">{event.company}</p>
                    <p className="mt-4 text-sm leading-relaxed text-brand-charcoal">{event.description}</p>

                    <ul className="mt-5 space-y-3 border-t border-brand-border pt-5 text-sm text-brand-charcoal">
                      {event.achievements.map((achievement) => (
                        <li key={achievement} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue" />
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
