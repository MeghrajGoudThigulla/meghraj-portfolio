'use client';

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { trackMetric } from "@/lib/metrics";

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const ROI_BASELINE = { hoursSaved: 6, hourlyRate: 85 };
const ROI_PRESETS = [
  { id: "startup", label: "Startup Scale", hoursSaved: 4, hourlyRate: 60, note: "Lean team with manual operations" },
  { id: "ops_team", label: "Ops & Scaling Team", hoursSaved: 10, hourlyRate: 95, note: "Cross-functional workflows and approvals" },
  { id: "consulting_team", label: "Consulting Operations", hoursSaved: 14, hourlyRate: 125, note: "Billable-hour efficiency focus" },
] as const;

export default function ROICalculator() {
  const [hoursSaved, setHoursSaved] = useState(ROI_BASELINE.hoursSaved);
  const [hourlyRate, setHourlyRate] = useState(ROI_BASELINE.hourlyRate);
  const trackedEngagementRef = useRef(false);
  useEffect(() => { trackMetric({ eventName: "roi_calculator_loaded", durationMs: typeof performance !== "undefined" ? Math.round(performance.now()) : undefined, meta: { source: "roi_section_mount" } }); }, []);
  const annualSavings = useMemo(() => Math.max(0, Math.round(hoursSaved * hourlyRate * 52)), [hoursSaved, hourlyRate]);
  const monthlySavings = useMemo(() => Math.max(0, Math.round(annualSavings / 12)), [annualSavings]);
  const yearlyHoursRecovered = useMemo(() => Math.max(0, hoursSaved * 52), [hoursSaved]);
  const fteEquivalent = useMemo(() => Math.max(0, yearlyHoursRecovered / 2080).toFixed(2), [yearlyHoursRecovered]);
  useEffect(() => {
    if (trackedEngagementRef.current || (hoursSaved === ROI_BASELINE.hoursSaved && hourlyRate === ROI_BASELINE.hourlyRate)) return;
    trackedEngagementRef.current = true;
    trackMetric({ eventName: "roi_calculator_engaged", value: annualSavings, meta: { hoursSaved, hourlyRate } });
  }, [annualSavings, hourlyRate, hoursSaved]);
  const applyPreset = (preset: (typeof ROI_PRESETS)[number]) => {
    setHoursSaved(preset.hoursSaved); setHourlyRate(preset.hourlyRate);
    trackMetric({ eventName: "roi_preset_selected", meta: { presetId: preset.id, hoursSaved: preset.hoursSaved, hourlyRate: preset.hourlyRate } });
  };
  return (
    <section className="relative overflow-hidden bg-brand-bg border-b border-brand-border/40 py-20 sm:py-24 lg:py-28" id="roi">
      <div className="pointer-events-none absolute -left-32 top-16 hidden h-72 w-72 rounded-full bg-brand-blue/5 blur-[120px] sm:block" aria-hidden />
      <div className="pointer-events-none absolute -right-40 bottom-10 hidden h-80 w-80 rounded-full bg-brand-accent/5 blur-[130px] sm:block" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Automation Value Explorer"
          description="Use this as a conversation starter, not a promise. Adjust the assumptions to estimate how much capacity a repetitive workflow might recover."
          eyebrow="BUSINESS CASE"
        />
        <div className="card fade-up grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr,0.8fr] lg:gap-8 border-brand-border/60 bg-brand-surface/40 backdrop-blur-md shadow-glass mt-12">
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-3">Example scenarios</p>
              <div className="flex flex-wrap gap-2.5">
                {ROI_PRESETS.map((preset) => <button key={preset.id} type="button" onClick={() => applyPreset(preset)} className="rounded-full border border-brand-border bg-brand-surface/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-brand-charcoal hover:border-brand-blue hover:text-brand-blue transition duration-300 shadow-sm">{preset.label}</button>)}
              </div>
              <p className="mt-3 text-xs text-brand-charcoal">Illustrative assumptions for comparing the value of automation, coordination, or rework reduction.</p>
            </div>
            <div className="space-y-6">
              <SliderInput id="roi-hours-saved" label="Hours saved per week" value={hoursSaved} min={0} max={40} step={1} onChange={setHoursSaved} />
              <SliderInput id="roi-hourly-rate" label="Blended hourly rate (USD)" value={hourlyRate} min={20} max={250} step={5} onChange={setHourlyRate} />
            </div>
            <div className="rounded-xl border border-brand-border/60 bg-brand-surface/30 p-4 space-y-2">
              <p className="text-xs text-brand-charcoal">Try including time spent on manual reporting, data entry, repetitive checks, coordination, and rework.</p>
              <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-slate-500">Formula: Hours Saved × Hourly Rate × 52 Weeks.</p>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-2xl border border-brand-border/60 bg-brand-surface/60 p-6 shadow-sm">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Illustrative annual capacity value</p>
              <p className="mt-3 text-4xl font-extrabold text-brand-blue lg:text-5xl font-serif text-glow leading-none">{formatter.format(annualSavings)}</p>
              <div className="mt-6 grid gap-3 grid-cols-3">
                <div className="rounded-xl border border-brand-border bg-brand-surface/50 px-3 py-3 text-center"><p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">Monthly</p><p className="mt-1 text-sm font-bold text-brand-navy">{formatter.format(monthlySavings)}</p></div>
                <div className="rounded-xl border border-brand-border bg-brand-surface/50 px-3 py-3 text-center"><p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">Hours / Year</p><p className="mt-1 text-sm font-bold text-brand-navy">{yearlyHoursRecovered}</p></div>
                <div className="rounded-xl border border-brand-border bg-brand-surface/50 px-3 py-3 text-center"><p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">FTE equivalent</p><p className="mt-1 text-sm font-bold text-brand-navy">{fteEquivalent}</p></div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-brand-charcoal">At {hoursSaved} hours saved per week and a {formatter.format(hourlyRate)}/hour blended rate, this model estimates {formatter.format(annualSavings)} of annual capacity value. Actual results depend on the workflow, adoption, and implementation.</p>
              <ul className="mt-5 space-y-2.5 text-xs text-brand-charcoal"><li className="flex gap-2.5 items-start"><span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue" /><span>Useful for framing a discovery conversation around measurable operational leverage.</span></li><li className="flex gap-2.5 items-start"><span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue" /><span>Not a guaranteed ROI, savings estimate, or financial forecast.</span></li></ul>
            </div>
            <Link href="/#contact" className="btn btn-primary mt-6 w-full text-xs font-bold tracking-[0.12em] py-3.5" onClick={() => trackMetric({ eventName: "roi_estimate_cta_click", value: annualSavings, meta: { source: "roi_section", hoursSaved, hourlyRate, estimateKey: `${hoursSaved}:${hourlyRate}` } })}>Discuss the problem</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

type SliderInputProps = { id: string; label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void };
function SliderInput({ id, label, value, min, max, step, onChange }: SliderInputProps) {
  return <div className="space-y-4"><div className="flex items-center justify-between"><label htmlFor={id} className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">{label}</label><span className="text-sm font-bold text-brand-navy font-serif">{value}</span></div><div className="relative flex items-center"><input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-blue" style={{ background: `linear-gradient(to right, #38BDF8 0%, #38BDF8 ${((value - min) / (max - min)) * 100}%, var(--brand-border) ${((value - min) / (max - min)) * 100}%, var(--brand-border) 100%)` }} /></div><div className="flex justify-between text-[10px] font-semibold text-slate-500"><span>{min}</span><span>{max}</span></div></div>;
}
