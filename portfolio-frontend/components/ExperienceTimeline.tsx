'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';

const TIMELINE_EVENTS = [
  {
    type: 'work',
    icon: Briefcase,
    role: 'Senior AI Developer & Full Stack Engineer',
    company: 'Threshing Floor Group Pvt Ltd',
    period: 'July 2024 — Oct 2026',
    description: 'Hands-on engineering across AI/ML, backend systems, Flutter applications, infrastructure, R&D, product demonstrations, and technical enablement.',
    impactMetrics: [
      { label: "BACKEND SURFACE", value: "286 Endpoints · 61+ Schemas" },
      { label: "MOBILE ECOSYSTEM", value: "4+ Production Flutter Apps" },
      { label: "ENGINEERING ENABLEMENT", value: "8 Developers Mentored" },
    ],
    achievements: [
      'Built TFGenAPI from scratch and contribute to difficult backend, R&D, and infrastructure problems across the product portfolio.',
      'Developed the IYOV AI payroll module, translating India-specific legal and payroll requirements into an automated product workflow.',
      'Helped ship Medical Advisor and became a key technical onboarding resource, delivering knowledge transfer to 8 team members.',
      'Manage production deployments, AWS/GCP pipelines, and release publishing (Apple App Store & Google Play) for 4+ Flutter mobile apps (Portal, HRMS, LMS, and Care Navigator).'
    ]
  },
  {
    type: 'education',
    icon: GraduationCap,
    role: 'B.Tech, Information Technology',
    company: 'Vignana Bharathi Institute of Technology',
    period: '2020 — 2024',
    description: 'Built a foundation in software engineering, databases, machine learning, and practical application development.',
    impactMetrics: [
      { label: "FOUNDATIONAL RIGOR", value: "Algorithms & Distributed Systems" },
      { label: "PRACTICAL LABS", value: "AI/ML, Mobile & Web Prototyping" },
      { label: "GRADUATION", value: "Class of 2024 · IT Department" },
    ],
    achievements: [
      'Developed academic and independent projects across AI/ML, web development, mobile applications, and blockchain.',
      'Graduated in 2024 and transitioned into professional software development.'
    ]
  }
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const eventVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function ExperienceTimeline() {
  const [filterType, setFilterType] = useState<'all' | 'work' | 'education'>('all');

  return (
    <section id="journey" className="section-shell bg-brand-bg">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience & Education"
          description="A practical engineering journey shaped by production systems, difficult problems, continuous R&D, and helping other people get productive faster."
          eyebrow="BACKGROUND"
        />

        {/* Mission Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-2 font-mono text-xs border-b border-brand-border/50 pb-4">
          <span className="text-[10px] uppercase font-bold text-slate-500 mr-2 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{"TIMELINE FILTER //"}</span>
          </span>
          {[
            { id: 'all', label: 'COMPLETE TIMELINE' },
            { id: 'work', label: 'PRODUCTION MISSIONS (2024-2026)' },
            { id: 'education', label: 'ACADEMIC FOUNDATION (2020-2024)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id as 'all' | 'work' | 'education')}
              className={`rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-all ${
                filterType === tab.id
                  ? 'border border-cyan-400 bg-cyan-950/80 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'border border-cyan-500/15 bg-[#080B10]/60 text-slate-400 hover:border-cyan-400/40 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          className="relative mt-12 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-cyan-400 before:via-blue-500 before:to-emerald-400 before:shadow-[0_0_10px_rgba(0,240,255,0.5)] sm:before:left-1/2 sm:before:-translate-x-1/2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {TIMELINE_EVENTS.map((event, index) => {
            const Icon = event.icon;
            const isEven = index % 2 === 0;
            const isWork = event.type === 'work';
            const isVisible = filterType === 'all' || filterType === event.type;

            return (
              <motion.div
                key={event.role}
                variants={eventVariants}
                className={`group/timeline relative mb-12 last:mb-0 sm:mb-16 transition-all duration-300 ${
                  isVisible ? 'opacity-100' : 'opacity-25 grayscale-[0.7] scale-[0.98]'
                }`}
              >
                {/* Arc Reactor Center Marker */}
                <div className="absolute left-4 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-cyan-400/80 bg-[#06080E] text-cyan-300 sm:left-1/2 transition-all duration-300 group-hover/timeline:scale-125 group-hover/timeline:border-cyan-300 group-hover/timeline:shadow-[0_0_24px_rgba(0,240,255,0.7)]">
                  <span className="absolute inset-0 rounded-full border border-cyan-500/30 animate-ping opacity-30" />
                  <Icon className="h-4.5 w-4.5 transition-transform duration-300 group-hover/timeline:rotate-[12deg]" aria-hidden="true" />
                </div>

                <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${isEven ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
                  <article className={`rounded-3xl border ${isWork ? 'border-cyan-500/30 hover:border-cyan-400/80' : 'border-emerald-500/30 hover:border-emerald-400/80'} bg-[#080B10]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.15)] hud-bracket relative overflow-hidden`}>
                    {/* Top ambient color flare */}
                    <div className={`pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full blur-[60px] opacity-15 ${isWork ? 'bg-cyan-500' : 'bg-emerald-500'}`} />

                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-950/70 pb-3 font-mono text-[10px]">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="font-bold text-cyan-400">[{event.period}]</span>
                      </div>
                      <span className={`rounded-full px-2.5 py-0.5 font-bold uppercase tracking-widest ${
                        isWork 
                          ? 'border border-cyan-500/30 bg-cyan-950/60 text-cyan-300' 
                          : 'border border-emerald-500/30 bg-emerald-950/60 text-emerald-300'
                      }`}>
                        {isWork ? 'MISSION // IN PRODUCTION' : 'ACADEMIC // COMPLETED'}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-extrabold text-white sm:text-2xl font-sans tracking-tight">{event.role}</h3>
                    <p className="mt-1 font-mono text-sm font-bold text-cyan-300">{event.company}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 font-sans">{event.description}</p>

                    {/* Impact Telemetry Matrix */}
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[10px]">
                      {event.impactMetrics.map((metric) => (
                        <div key={metric.label} className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-2.5">
                          <p className="font-bold uppercase tracking-wider text-cyan-400">{metric.label}</p>
                          <p className="mt-1 text-slate-200 font-semibold">{metric.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 border-t border-cyan-950/70 pt-4">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">{"KEY DELIVERABLES & OUTCOMES // "}</p>
                      <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-mono">
                        {event.achievements.map((achievement, aIdx) => (
                          <li key={achievement} className="flex items-start gap-3 rounded-lg p-1.5 transition-colors hover:bg-cyan-950/20">
                            <span className="mt-0.5 font-bold text-cyan-400 shrink-0 text-[10px]">
                              0{aIdx + 1}&gt;
                            </span>
                            <span className="leading-relaxed font-sans text-slate-200">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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

