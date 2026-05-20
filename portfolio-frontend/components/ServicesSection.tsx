'use client';

import { motion, Variants, useReducedMotion } from 'framer-motion';
import { 
  Globe, 
  Smartphone, 
  Settings, 
  ShieldCheck, 
  Database,
  Activity
} from 'lucide-react';
import SectionHeading from './SectionHeading';

const SERVICES = [
  {
    icon: Globe,
    title: "Full-Stack Web Architectures",
    description: "Design and implement high-performance web systems using Next.js/React, TypeScript, and FastAPI, configured for static static hosting (Firebase) or standalone edge containers.",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Mobile Apps",
    description: "Build beautiful, native-performance iOS and Android applications in Flutter/Dart, incorporating secure authentication flows and low-latency offline sync layers.",
  },
  {
    icon: Activity,
    title: "Healthcare Tech Workflows",
    description: "Architect secure emergency care dispatching networks and coordinator consoles. Synchronize sensitive state real-time with zero-downtime client pipelines.",
  },
  {
    icon: ShieldCheck,
    title: "Background Verification Platforms",
    description: "Develop automated compliance-oriented onboarding portals featuring asynchronous OCR extraction, semantic vector comparisons, and robust security checks.",
  },
  {
    icon: Database,
    title: "API & Relational Database Design",
    description: "Migrate flat/NoSQL structures into optimized relational systems (PostgreSQL, MySQL). Design deep JSDoc schemas, custom trigger functions, and indexed queries.",
  },
  {
    icon: Settings,
    title: "Business Process Digitization",
    description: "Help companies transition legacy manual operations into responsive admin panels, structured workflow trackers, and intuitive automated email reports.",
  }
];

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0.05 } : { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="services" className="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-brand-muted/30 border-y border-brand-border/40">
      {/* Visual background details */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(56,189,248,0.05),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="High-Value Capabilities"
          description="Leveraging modern product experience, secure backend development, and AI engineering to solve operational bottlenecks."
        />

        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="card card-hover p-6 sm:p-8 bg-brand-surface/40 border-brand-border/30 hover:border-brand-accent/30 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-xl p-3 bg-brand-surface border border-brand-border/60 text-brand-blue group-hover:text-brand-accent transition-colors duration-300 shadow-sm">
                    <Icon className="h-6 w-6 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy tracking-tight mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-charcoal">
                      {service.description}
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
