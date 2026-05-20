'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Dot = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

export default function AnimatedGridBackground() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    // Generate random dots safely on the client side only to prevent SSR mismatches
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -20,
    }));
    
    const timer = setTimeout(() => {
      setDots(generated);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-brand-bg">
      {/* Dynamic Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #38BDF8 1px, transparent 1px),
            linear-gradient(to bottom, #38BDF8 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)',
        }}
      />

      {/* Radial Gradient Mesh Glows */}
      <div className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-brand-blue/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[65%] w-[65%] rounded-full bg-brand-accent/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[30%] left-[45%] h-[40%] w-[40%] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />

      {/* Floating Animated Nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
              background: dot.id % 2 === 0 ? '#38BDF8' : '#8B5CF6',
              boxShadow: dot.id % 2 === 0 
                ? '0 0 10px rgba(56, 189, 248, 0.8), 0 0 20px rgba(56, 189, 248, 0.4)' 
                : '0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(139, 92, 246, 0.4)',
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(dot.id) * 30, 0],
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: dot.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Interactive cursor tracking grid spotlight glow (CSS Radial Gradient overlay) */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30"
        style={{
          background: 'radial-gradient(circle 350px at 50% 30%, rgba(56, 189, 248, 0.08), transparent 80%)',
        }}
      />
    </div>
  );
}
