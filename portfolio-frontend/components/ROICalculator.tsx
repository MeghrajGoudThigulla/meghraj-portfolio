'use client';

import { useMemo, useState } from "react";
import SectionHeading from "./SectionHeading";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function ROICalculator() {
  const [hoursSaved, setHoursSaved] = useState(6);
  const [hourlyRate, setHourlyRate] = useState(85);

  const annualSavings = useMemo(() => {
    const weeks = 52;
    return Math.max(0, Math.round(hoursSaved * hourlyRate * weeks));
  }, [hoursSaved, hourlyRate]);

  return (
    <section
      className="relative overflow-hidden border-y border-brand-charcoal/10 bg-gradient-to-b from-white to-sky-50 py-20 sm:py-24 lg:py-28"
      id="roi"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 h-64 w-64 rounded-full bg-sky-100/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-10 h-72 w-72 rounded-full bg-white/70 blur-3xl"
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Project ROI calculator"
          description="Model the annual savings from automation, refactoring, or process improvements. Adjust inputs to match your environment."
        />

        <div className="card fade-up grid gap-6 p-5 lg:grid-cols-[1.1fr,0.9fr] lg:gap-8">
          <div className="space-y-6">
            <SliderInput
              label="Hours saved per week"
              value={hoursSaved}
              min={0}
              max={40}
              step={1}
              onChange={(val) => setHoursSaved(val)}
            />
            <SliderInput
              label="Blended hourly rate (USD)"
              value={hourlyRate}
              min={20}
              max={250}
              step={5}
              onChange={(val) => setHourlyRate(val)}
            />
            <p className="text-sm text-slate-500">
              Tip: For consulting teams, include people-hours saved from
              automated reporting, fewer context switches, and reduced rework.
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-lg border border-dashed border-brand-charcoal/20 bg-white/90 px-5 py-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
              Estimated annual savings
            </p>
            <p className="mt-3 text-4xl font-bold text-brand-blue lg:text-5xl">
              {formatter.format(annualSavings)}
            </p>
            <p className="mt-3 max-w-prose text-base leading-relaxed text-brand-charcoal">
              Based on {hoursSaved} hours saved each week at a blended rate of{" "}
              {formatter.format(hourlyRate)} / hr. Use this to anchor stakeholder
              discussions in tangible outcomes.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-brand-charcoal">
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                <span>Helps prioritize initiatives and quantify payback.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                <span>Pairs with the contact form to scope a pilot.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

type SliderInputProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: SliderInputProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500">
          {label}
        </p>
        <span className="text-sm font-semibold text-brand-navy">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-blue"
      />
      <div className="flex justify-between text-xs text-slate-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
