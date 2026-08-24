'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function AnimatedGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let dots: { x: number; y: number; baseRadius: number; currentRadius: number }[] = [];
    const dotSpacing = 32;

    const initDots = () => {
      const w = canvas.width = container.offsetWidth;
      const h = canvas.height = container.offsetHeight;
      dots = [];

      for (let x = dotSpacing / 2; x < w; x += dotSpacing) {
        for (let y = dotSpacing / 2; y < h; y += dotSpacing) {
          dots.push({
            x,
            y,
            baseRadius: 1,
            currentRadius: 1,
          });
        }
      }
    };

    initDots();

    const handleResize = () => {
      initDots();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      dots.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.hypot(dx, dy);
        const maxDist = 180;

        let targetRadius = dot.baseRadius;
        let opacity = 0.08;
        let color = 'rgba(148, 163, 184, '; // Slate color base

        if (dist < maxDist && !prefersReducedMotion) {
          const factor = 1 - dist / maxDist;
          targetRadius = dot.baseRadius + factor * 2.8;
          opacity = 0.08 + factor * 0.45;
          // Morph color towards Sky Blue/Teal when hovered
          color = factor > 0.5 ? 'rgba(56, 189, 248, ' : 'rgba(45, 212, 191, ';
        }

        // Smoothly interpolate radius to avoid jitter
        dot.currentRadius += (targetRadius - dot.currentRadius) * 0.15;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden bg-brand-bg">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none block" />
      
      {/* Decorative background radial color glows (Blue/Teal gradient halos) */}
      <div className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-brand-blue/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[65%] w-[65%] rounded-full bg-brand-accent/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[30%] left-[45%] h-[40%] w-[40%] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />
    </div>
  );
}
