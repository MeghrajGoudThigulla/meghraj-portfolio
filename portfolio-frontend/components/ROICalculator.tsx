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
    label: "Startup",
    hoursSaved: 4,
    hourlyRate: 60,
    note: "Lean team with manual operations",
  },
  {
    id: "ops_team",
    label: "Ops Team",
    hoursSaved: 10,
    hourlyRate: 95,
    note: "Cross-functional workflows and approvals",
  },
  {
    id: "consulting_team",
    label: "Consulting Team",
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
      className="relative overflow-hidden border-y border-brand-charcoal/10 bg-gradient-to-b from-white to-sky-50 py-20 sm:py-24 lg:py-28"
      id="roi"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 hidden h-64 w-64 rounded-full bg-sky-100/60 blur-3xl sm:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-10 hidden h-72 w-72 rounded-full bg-white/70 blur-3xl sm:block"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Project ROI calculator"
          description="Model the annual savings from automation, refactoring, or process improvements. Adjust inputs to match your environment."
        />

        <div className="card fade-up grid gap-6 p-5 lg:grid-cols-[1.2fr,0.8fr] lg:gap-8">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Quick presets
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {ROI_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="rounded-full border border-brand-charcoal/15 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-brand-navy transition hover:border-brand-blue hover:text-brand-blue"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Presets help you benchmark quickly before fine-tuning inputs.
              </p>
            </div>

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
            <p className="text-sm text-slate-500">
              Tip: For consulting teams, include people-hours saved from
              automated reporting, fewer context switches, and reduced rework.
            </p>
            <p className="rounded-lg border border-brand-charcoal/10 bg-brand-bg px-3 py-2 text-xs text-brand-charcoal">
              Assumption: 52 work weeks/year, blended rates, and direct hours
              recovered from recurring workflows.
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-xl border border-brand-charcoal/10 bg-brand-bg px-5 py-6">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
              Estimated annual savings
            </p>
            <p className="mt-3 text-4xl font-bold text-brand-blue lg:text-5xl">
              {formatter.format(annualSavings)}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-brand-charcoal/10 bg-white px-3 py-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  Monthly
                </p>
                <p className="mt-1 text-base font-semibold text-brand-navy">
                  {formatter.format(monthlySavings)}
                </p>
              </div>
              <div className="rounded-lg border border-brand-charcoal/10 bg-white px-3 py-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  Hours / Year
                </p>
                <p className="mt-1 text-base font-semibold text-brand-navy">
                  {yearlyHoursRecovered}
                </p>
              </div>
              <div className="rounded-lg border border-brand-charcoal/10 bg-white px-3 py-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  FTE Equivalent
                </p>
                <p className="mt-1 text-base font-semibold text-brand-navy">
                  {fteEquivalent}
                </p>
              </div>
            </div>
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
            <Link
              href="/#contact"
              className="btn btn-primary mt-5 w-full sm:w-fit"
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
              Use this estimate in a discovery call
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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500"
        >
          {label}
        </label>
        <span className="text-sm font-semibold text-brand-navy">{value}</span>
      </div>
      <input
        id={id}
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
