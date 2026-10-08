"use client";

import Link from "next/link";
import { Sparkles, Terminal, ArrowRight, Box } from "lucide-react";
import { soundFX } from "@/lib/sound";

const PROMPT_SUGGESTIONS = [
  { label: "Quick overview", query: "What is Meghraj's current role, seniority, and engineering background?" },
  { label: "What’s your verified scale?", query: "What is the verified production scale and metrics (endpoints, models)?" },
  { label: "Tell me about TFGenAPI OCR", query: "Tell me about the TFGenAPI OCR inference pipeline and stack." },
  { label: "How does IYOV AI payroll work?", query: "What was built for the IYOV AI statutory payroll engine and Flutter apps?" },
  { label: "Explain TFG SecureBank rules", query: "Explain the TFG SecureBank credit rules engine and multi-tenant backend." },
  { label: "Consulting & role availability", query: "What is Meghraj's consulting and role availability scope?" },
];

export default function AssistantPromptBanner() {
  const handleTriggerQuery = (presetQuery: string) => {
    soundFX.playKeyClick();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-operator-console", {
          detail: { query: presetQuery },
        })
      );
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-brand-border/60 bg-gradient-to-b from-brand-bg via-brand-surface/40 to-brand-bg py-12 sm:py-16">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-[#080B10]/95 p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.08)] hud-bracket">
          {/* Top Bar Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-950/60 pb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00F0FF] animate-pulse" />
              <span className="font-mono text-xs font-bold tracking-widest text-cyan-300 uppercase">
                THE OPERATOR // GROUNDED ARCHITECTURAL ASSISTANT
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
              <span className="hidden sm:inline-block rounded border border-cyan-500/20 bg-cyan-950/30 px-2 py-0.5 text-cyan-400">
                GEMINI GROUNDED
              </span>
              <span className="rounded border border-emerald-500/20 bg-emerald-950/30 px-2 py-0.5 text-emerald-400">
                IN-MEMORY RAG
              </span>
            </div>
          </div>

          {/* Main Hook & Copy */}
          <div className="mt-6 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-sans flex items-center gap-3">
              <span>Too lazy to scroll? Let the Operator do the talking.</span>
              <Sparkles className="h-6 w-6 text-cyan-400 shrink-0 hidden sm:inline-block" />
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Ask about high-concurrency API gateways, TFGenAPI OCR inference, IYOV AI statutory payroll, verified production scale, or engineering availability. Grounded in architecture, zero hallucinations.
            </p>
          </div>

          {/* Preset Directive Question Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            {PROMPT_SUGGESTIONS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleTriggerQuery(item.query)}
                className="group flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-[#0d131e] px-3.5 py-2 text-xs font-mono font-medium text-slate-200 transition-all duration-150 shadow-[0_3px_0_#05080d] hover:border-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-200 active:translate-y-[2px] active:shadow-[0_1px_0_#05080d] cursor-pointer"
              >
                <Terminal className="h-3 w-3 text-cyan-400/70 group-hover:text-cyan-300" />
                <span>“{item.label}”</span>
              </button>
            ))}
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-cyan-950/60 pt-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleTriggerQuery(PROMPT_SUGGESTIONS[0].query)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-5 py-2.5 font-mono text-xs font-bold text-black shadow-[0_4px_20px_rgba(0,240,255,0.35)] transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>LAUNCH OPERATOR TERMINAL</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-cyan-500/30 bg-cyan-950/40 px-2 py-1 text-[11px] font-mono text-cyan-400">
                PRESS ⌘K
              </kbd>
            </div>

            <Link
              href="/world"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <Box className="h-4 w-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>EXPLORE 3D SYSTEM WORLD ↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
