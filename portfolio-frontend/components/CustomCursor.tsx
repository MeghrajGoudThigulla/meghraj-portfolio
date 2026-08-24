'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Dynamic spring values: heavier pull when hovering interactive items
  const x = useSpring(rawX, { stiffness: active ? 120 : 380, damping: active ? 22 : 32, mass: active ? 0.6 : 0.3 });
  const y = useSpring(rawY, { stiffness: active ? 120 : 380, damping: active ? 22 : 32, mass: active ? 0.6 : 0.3 });

  useEffect(() => {
    // Disable custom cursor on mobile / touch devices
    const checkCoarse = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    
    checkCoarse();
    window.addEventListener('resize', checkCoarse);

    const handlePointerMove = (e: PointerEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        // Detect hovering over links, buttons, custom metrics, and interactive boxes
        const isHoverable = target.closest('a, button, [role="button"], input, select, textarea, .card-hover, [data-cursor="magnetic"]');
        setActive(!!isHoverable);
      }
    };

    const handlePointerLeave = () => {
      setVisible(false);
      setActive(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('resize', checkCoarse);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [rawX, rawY, visible]);

  if (prefersReducedMotion || isMobile || !visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white mix-blend-difference"
      style={{
        x,
        y,
        width: active ? 70 : 28,
        height: active ? 70 : 28,
        marginLeft: active ? -35 : -14,
        marginTop: active ? -35 : -14,
        boxShadow: active ? '0 0 10px rgba(255, 255, 255, 0.15)' : 'none',
        transition: 'width 220ms cubic-bezier(0.16, 1, 0.3, 1), height 220ms cubic-bezier(0.16, 1, 0.3, 1), margin 220ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    />
  );
}
