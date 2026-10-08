"use client";

import { useEffect, useRef } from "react";

interface MatrixRainCanvasProps {
  opacity?: number;
  colorScheme?: "green" | "cyan" | "gold";
}

const CHARACTERS =
  "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ1234567890ABCDEF@#$%&*+-=<>{}[]/\\";

export default function MatrixRainCanvas({
  opacity = 0.22,
  colorScheme = "green",
}: MatrixRainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
    };

    window.addEventListener("resize", handleResize);

    const primaryColor =
      colorScheme === "green"
        ? "#00ff66"
        : colorScheme === "cyan"
        ? "#00f0ff"
        : "#ffd98e";

    const fadeBg = "rgba(6, 8, 14, 0.12)";

    let lastDrawTime = 0;
    const fpsInterval = 1000 / 30; // 30 FPS for authentic CRT cinematic pacing

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const elapsed = currentTime - lastDrawTime;
      if (elapsed < fpsInterval) return;
      lastDrawTime = currentTime - (elapsed % fpsInterval);

      // Trail decay
      ctx.fillStyle = fadeBg;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head glyph glows bright white/cyan
        ctx.fillStyle = "#ffffff";
        ctx.fillText(char, x, y);

        // Body glyph in primary phosphor color
        ctx.fillStyle = primaryColor;
        ctx.fillText(char, x, y - fontSize);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [colorScheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full transition-opacity duration-700"
      style={{ opacity }}
    />
  );
}
