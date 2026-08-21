"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
};

export default function Magnetic({ children, className, strength = 0.24, radius = 25 }: MagneticProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.45 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);
    
    // Calculates a smooth pull factor that decreases as the pointer moves further from the center
    const pull = Math.max(0, 1 - distance / Math.max(rect.width, rect.height, radius));

    x.set(Math.max(-radius, Math.min(radius, dx * strength * pull)));
    y.set(Math.max(-radius, Math.min(radius, dy * strength * pull)));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}
