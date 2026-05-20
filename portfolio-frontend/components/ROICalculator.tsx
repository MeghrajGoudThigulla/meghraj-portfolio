'use client';

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { trackMetric } from "@/lib/metrics";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const ROI_BASELINE = {
  hoursSaved: 6,
  hourlyRate: 85,
};

const ROI_PRESETS = [
  {
    id: "startup",
    label: "Startup Scale",
    hoursSaved: 4,
    hourlyRate: 60,
    note: "Lean team with manual operations",
  },
  {
    id: "ops_team",
    label: "Ops & Scaling Team",
    hoursSaved: 10,
    hourlyRate: 95,
    note: "Cross-functional workflows and approvals",
  },
  {
    id: "consulting_team",
    label: "Consulting Operations",
    hoursSaved: 14,
    hourlyRate: 125,
    note: "Billable-hour efficiency focus",
  },
] as const;

export default function ROICalculator() {
  const [hoursSaved, setHoursSaved] = useState(ROI_BASELINE.hoursSaved);
  const [hourlyRate, setHourlyRate] = useState(ROI_BASELINE.hourlyRate);
  const trackedEngagementRef = useRef(false);

  useEffect(() => {
    const loadTimingMs =
      typeof performance !== "undefined" ? Math.round(performance.now()) : undefined;

    trackMetric({
      eventName: "roi_calculator_loaded",
      durationMs: loadTimingMs,
      meta: { source: "roi_section_mount" },
    });
  }, []);

  const annualSavings = useMemo(() => {
    const weeks = 52;
    return Math.max(0, Math.round(hoursSaved * hourlyRate * weeks));
  }, [hoursSaved, hourlyRate]);
  const monthlySavings = useMemo(
    () => Math.max(0, Math.round(annualSavings / 12)),
    [annualSavings],
  );
  const yearlyHoursRecovered = useMemo(() => Math.max(0, hoursSaved * 52), [hoursSaved]);
  const fteEquivalent = useMemo(
    () => Math.max(0, yearlyHoursRecovered / 2080).toFixed(2),
    [yearlyHoursRecovered],
  );

  useEffect(() => {
    if (trackedEngagementRef.current) return;
    if (
      hoursSaved === ROI_BASELINE.hoursSaved &&
      hourlyRate === ROI_BASELINE.hourlyRate
    )
      return;

    trackedEngagementRef.current = true;
    trackMetric({
      eventName: "roi_calculator_engaged",
      value: annualSavings,
      meta: { hoursSaved, hourlyRate },
    });
  }, [annualSavings, hourlyRate, hoursSaved]);

  const applyPreset = (preset: (typeof ROI_PRESETS)[number]) => {
    setHoursSaved(preset.hoursSaved);
    setHourlyRate(preset.hourlyRate);
    trackMetric({
      eventName: "roi_preset_selected",
      meta: {
        presetId: preset.id,
        hoursSaved: preset.hoursSaved,
        hourlyRate: preset.hourlyRate,
      },
    });
  };

  return (
    <section
      className="relative overflow-hidden bg-brand-bg border-b border-brand-border/40 py-20 sm:py-24 lg:py-28"
      id="roi"
    >
      {/* Glow overlays */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 hidden h-72 w-72 rounded-full bg-brand-blue/5 blur-[120px] sm:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-10 hidden h-80 w-80 rounded-full bg-brand-accent/5 blur-[130px] sm:block"
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Project ROI Calculator"
          description="Quantify the annual savings from automation, relayout migrations, relational refactoring, or process improvements."
          eyebrow="Calculators"
        />

        <div className="card fade-up grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr,0.8fr] lg:gap-8 border-brand-border/60 bg-brand-surface/40 backdrop-blur-md shadow-glass mt-12">
          {/* Controls column */}
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-3">
                Quick Benchmarks
              </p>
              <div className="flex flex-wrap gap-2.5">
                {ROI_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="rounded-full border border-brand-border bg-brand-surface/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-brand-charcoal hover:border-brand-blue hover:text-brand-blue transition duration-300 shadow-sm"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-brand-charcoal">
                Benchmarks estimate typical administrative, coordination, and rework bottlenecks.
              </p>
            </div>

            <div className="space-y-6">
              <SliderInput
                id="roi-hours-saved"
                label="Hours saved per week"
                value={hoursSaved}
                min={0}
                max={40}
                step={1}
                onChange={(val) => setHoursSaved(val)}
              />
              <SliderInput
                id="roi-hourly-rate"
                label="Blended hourly rate (USD)"
                value={hourlyRate}
                min={20}
                max={250}
                step={5}
                onChange={(val) => setHourlyRate(val)}
              />
            </div>
            
            <div className="rounded-xl border border-brand-border/60 bg-brand-surface/30 p-4 space-y-2">
              <p className="text-xs text-brand-charcoal">
                Tip: Include hours lost to manual PDF reporting, data entry synchronization, document fraud checks, and offline status coordination.
              </p>
              <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-slate-500">
                Formula: Hours Saved × Hourly Rate × 52 Weeks/Year.
              </p>
            </div>
          </div>

          {/* Results column */}
          <div className="flex flex-col justify-between rounded-2xl border border-brand-border/60 bg-brand-surface/60 p-6 shadow-sm">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Estimated Annual Savings
              </p>
              <p className="mt-3 text-4xl font-extrabold text-brand-blue lg:text-5xl font-serif text-glow leading-none">
                {formatter.format(annualSavings)}
              </p>
              
              <div className="mt-6 grid gap-3 grid-cols-3">
                <div className="rounded-xl border border-brand-border bg-brand-surface/50 px-3 py-3 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                    Monthly
                  </p>
                  <p className="mt-1 text-sm font-bold text-brand-navy">
                    {formatter.format(monthlySavings)}
                  </p>
                </div>
                
                <div className="rounded-xl border border-brand-border bg-brand-surface/50 px-3 py-3 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                    Hours / Year
                  </p>
                  <p className="mt-1 text-sm font-bold text-brand-navy">
                    {yearlyHoursRecovered}
                  </p>
                </div>
                
                <div className="rounded-xl border border-brand-border bg-brand-surface/50 px-3 py-3 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                    FTEs Recovered
                  </p>
                  <p className="mt-1 text-sm font-bold text-brand-navy">
                    {fteEquivalent}
                  </p>
                </div>
              </div>
              
              <p className="mt-6 text-sm leading-relaxed text-brand-charcoal">
                An automation pilot saving {hoursSaved} hr/week at a blended rate of {formatter.format(hourlyRate)}/hr recovers significant billable capacity, proving payback inside a single quarter.
              </p>
              
              <ul className="mt-5 space-y-2.5 text-xs text-brand-charcoal">
                <li className="flex gap-2.5 items-start">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue" />
                  <span>Aligns technical project scoping directly with financial accountability.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue" />
                  <span>Provides clear business leverage for CTO and CEO stakeholders.</span>
                </li>
              </ul>
            </div>

            <Link
              href="/#contact"
              className="btn btn-primary mt-6 w-full text-xs font-bold tracking-[0.12em] py-3.5"
              onClick={() =>
                trackMetric({
                  eventName: "roi_estimate_cta_click",
                  value: annualSavings,
                  meta: {
                    source: "roi_section",
                    hoursSaved,
                    hourlyRate,
                    estimateKey: `${hoursSaved}:${hourlyRate}`,
                  },
                })
              }
            >
              Consult On System Scope
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

type SliderInputProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

function SliderInput({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
}: SliderInputProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300"
        >
          {label}
        </label>
        <span className="text-sm font-bold text-brand-navy font-serif">{value}</span>
      </div>
      
      <div className="relative flex items-center">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-blue"
          style={{
            background: `linear-gradient(to right, #38BDF8 0%, #38BDF8 ${((value - min) / (max - min)) * 100}%, var(--brand-border) ${((value - min) / (max - min)) * 100}%, var(--brand-border) 100%)`
          }}
        />
      </div>
      
      <div className="flex justify-between text-[10px] font-semibold text-slate-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
