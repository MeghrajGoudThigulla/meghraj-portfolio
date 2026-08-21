"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

type CountUpProps = {
  value: string;
  duration?: number;
  className?: string;
};

export default function CountUp({ value, duration = 0.9, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const hasAnimated = useRef(false);

  // Initialize state based on whether the value contains numeric prefixes to avoid layout flashing
  const [displayValue, setDisplayValue] = useState(() => {
    const match = String(value).match(/^(\d+)(.*)$/);
    return match ? "0" : value;
  });

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;

    const match = String(value).match(/^(\d+)(.*)$/);
    if (!match) return;

    const targetNumber = parseInt(match[1], 10);
    const suffix = match[2];

    hasAnimated.current = true;

    const controls = animate(0, targetNumber, {
      duration,
      ease: [0.16, 1, 0.3, 1], // Premium ease-out curve
      onUpdate: (latest) => {
        setDisplayValue(`${Math.round(latest)}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [value, duration, isInView]);

  return (
    <span ref={ref} className={className}>
      {isInView ? displayValue : (String(value).match(/^(\d+)(.*)$/) ? "0" : value)}
    </span>
  );
}
