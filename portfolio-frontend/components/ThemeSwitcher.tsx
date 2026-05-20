'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { trackMetric } from '@/lib/metrics';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'dark';
    
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const timer = setTimeout(() => {
      setTheme(initialTheme);
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    trackMetric({
      eventName: 'theme_toggle',
      meta: { theme: nextTheme },
    });
  };

  const shouldReduceMotion = useReducedMotion();

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-xl border border-brand-border bg-brand-surface/40" />
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.9, rotate: 15 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="relative h-9 w-9 flex items-center justify-center rounded-xl border border-brand-border bg-brand-surface/40 hover:bg-brand-surface hover:border-brand-blue/40 text-brand-charcoal hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 shadow-glass"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={shouldReduceMotion ? { opacity: 0 } : { y: 8, opacity: 0, rotate: -40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: -8, opacity: 0, rotate: 40 }}
            transition={shouldReduceMotion ? { duration: 0.05 } : { type: 'spring', stiffness: 200, damping: 10 }}
          >
            <Moon className="h-4 w-4 text-sky-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={shouldReduceMotion ? { opacity: 0 } : { y: 8, opacity: 0, rotate: -40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: -8, opacity: 0, rotate: 40 }}
            transition={shouldReduceMotion ? { duration: 0.05 } : { type: 'spring', stiffness: 200, damping: 10 }}
          >
            <Sun className="h-4 w-4 text-amber-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
