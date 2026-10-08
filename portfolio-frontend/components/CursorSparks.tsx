"use client";

import { useEffect, useRef, useState } from "react";

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function CursorSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener?.("change", handleChange);
    return () => {
      mediaQuery.removeEventListener?.("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let sparks: Spark[] = [];
    let animationFrameId: number | null = null;
    let isRunning = false;
    let nextId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const stopLoop = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      isRunning = false;
    };

    const animate = () => {
      if (document.hidden) {
        stopLoop();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparks.forEach((spark) => {
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.life++;

        const progress = spark.life / spark.maxLife;
        const opacity = Math.max(0, 1 - Math.pow(progress, 1.8));

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, Math.max(0.1, spark.size * (1 - progress * 0.4)), 0, Math.PI * 2);

        let r = 2,
          g = 132,
          b = 199; // default #0284c7
        if (spark.color === "#38bdf8") {
          r = 56;
          g = 189;
          b = 248;
        } else if (spark.color === "#2dd4bf") {
          r = 45;
          g = 212;
          b = 191;
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = spark.color;
        ctx.fill();
      });

      sparks = sparks.filter((s) => s.life < s.maxLife);

      if (sparks.length > 0) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Idle stop: no active sparks, clear canvas and stop RAF
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stopLoop();
      }
    };

    const startLoop = () => {
      if (!isRunning && sparks.length > 0 && !document.hidden) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      if (document.hidden) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
        sparks.push({
          id: nextId++,
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.3,
          life: 0,
          maxLife: 15 + Math.random() * 25,
          size: 0.8 + Math.random() * 1.8,
          color: ["#0284c7", "#38bdf8", "#2dd4bf"][Math.floor(Math.random() * 3)],
        });
      }

      startLoop();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (sparks.length > 0) {
        startLoop();
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("mousemove", handlePointerMove);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopLoop();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      aria-hidden="true"
      data-testid="cursor-sparks-canvas"
    />
  );
}
