"use client";

import { useRef, ReactNode, CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type TiltCardProps = {
  as?: string;
  children: ReactNode;
  className?: string;
  max?: number;
  liftScale?: number;
  glare?: boolean;
  style?: CSSProperties;
  [key: string]: unknown;
};

export default function TiltCard({
  as = "div",
  children,
  className = "",
  max = 6,
  liftScale = 1.015,
  glare = true,
  style: extraStyle,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 260, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  
  // High-fidelity glare highlight that follows the pointer
  const glareBg = useTransform([px, py], (values) => {
    const gx = values[0] as number;
    const gy = values[1] as number;
    return `radial-gradient(circle 220px at ${gx * 100}% ${gy * 100}%, rgba(255, 255, 255, 0.08), transparent 80%)`;
  });

  // Retrieve pre-declared motion components to avoid creating components on render
  const MotionComponent = ((motion as unknown) as Record<string, React.ElementType>)[as] || motion.div;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: liftScale }}
      whileTap={{ scale: 0.985 }}
      style={{ rotateX, rotateY, transformPerspective: 1000, ...extraStyle }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`relative overflow-hidden group ${className}`}
      {...rest}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glareBg }}
        />
      )}
    </MotionComponent>
  );
}
