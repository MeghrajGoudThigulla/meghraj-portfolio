"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type OperatorResult = {
  answer: string;
  sourceIds: string[];
  confidence: number;
};

const PRESET_KEYS = [
  { label: "01 // ROLE", query: "What is Meghraj's current role and company background?", color: "border-cyan-500/40 text-cyan-400" },
  { label: "02 // METRICS", query: "What is the verified production scale and metrics (endpoints, models)?", color: "border-emerald-500/40 text-emerald-400" },
  { label: "03 // TFGENAPI", query: "Tell me about the TFGenAPI OCR inference pipeline and stack.", color: "border-blue-500/40 text-blue-400" },
  { label: "04 // IYOV AI", query: "What was built for the IYOV AI statutory payroll engine and Flutter apps?", color: "border-cyan-500/40 text-cyan-400" },
  { label: "05 // SECUREBANK", query: "Explain the TFG SecureBank credit rules engine and multi-tenant backend.", color: "border-emerald-500/40 text-emerald-400" },
  { label: "06 // AVAILABILITY", query: "What is Meghraj's consulting and role availability scope?", color: "border-amber-500/40 text-amber-400" },
];

const FALLBACK_GROUNDED_RESPONSES: Record<string, OperatorResult> = {
  role: {
    answer: "Thigulla Meghraj Goud is a Senior AI Developer & Full Stack Engineer at Threshing Floor Group (TFG) Pvt Ltd, Hyderabad. Since July 2024, he architects and delivers production backend platforms, ML model serving gateways, and mobile applications.",
    sourceIds: ["profile_identity"],
    confidence: 1.0,
  },
  metrics: {
    answer: "Across verified production systems, Meghraj has delivered 286 endpoints, 61+ database models, and 30+ Alembic/Prisma schema migrations. He has shipped 80+ mobile screens and 96+ web interfaces, published 4+ Flutter apps, and led knowledge transfer for 8 engineers.",
    sourceIds: ["profile_metrics"],
    confidence: 1.0,
  },
  tfgenapi: {
    answer: "TFGenAPI is a custom verification and API platform built from scratch. Meghraj engineered the AI inference pipeline using PyTesseract for OCR and Sentence Transformers for dense vector embeddings, with Motor/MongoDB for high-throughput ingestion and Celery/Redis for task queues.",
    sourceIds: ["project_tfgenapi"],
    confidence: 1.0,
  },
  iyov: {
    answer: "For IYOV AI, Meghraj built the India statutory tax compliance and payroll engine from scratch, automated batch jobs and alerts with Redis queues, and released 4+ companion Flutter applications to the App Store and Google Play Store.",
    sourceIds: ["project_iyov_ai"],
    confidence: 1.0,
  },
  securebank: {
    answer: "TFG SecureBank is a digital fintech application featuring a 70 REST endpoint FastAPI backend routing between PostgreSQL/Supabase and legacy MySQL. Meghraj created an automated spreadsheet-driven credit rules engine and generated tamper-evident loan agreement documents with WeasyPrint.",
    sourceIds: ["project_securebank"],
    confidence: 1.0,
  },
  availability: {
    answer: "Meghraj is available for enterprise technical consulting and senior AI/backend engineering roles (Remote or Hybrid). His core domain covers high-concurrency APIs, ML inference pipelines, and end-to-end mobile app delivery.",
    sourceIds: ["profile_availability"],
    confidence: 1.0,
  },
};

const INITIAL_WELCOME =
  "OPERATOR TERMINAL INITIALIZED. Select a tactile directive keycap below or transmit a custom query to inspect verified architectural dossiers.";

export default function OperatorConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeResult, setActiveResult] = useState<OperatorResult | null>(null);
  const [displayedText, setDisplayedText] = useState(INITIAL_WELCOME);
  const [activeKeyIndex, setActiveKeyIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typewriterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter effect matching the debbie console design specification
  const startTypewriter = useCallback((fullText: string) => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }

    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedText(fullText);
      return;
    }

    setDisplayedText("");
    let currentIdx = 0;
    const speedMs = 18;

    const typeNextChar = () => {
      if (currentIdx < fullText.length) {
        currentIdx += 1;
        setDisplayedText(fullText.slice(0, currentIdx));
        typewriterTimeoutRef.current = setTimeout(typeNextChar, speedMs);
      }
    };

    typeNextChar();
  }, []);

  const handleSendQuery = useCallback(async (customQuery: string) => {
    const trimmed = customQuery.trim();
    if (!trimmed) return;

    setLoading(true);
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }
    setDisplayedText("QUERYING DOSSIER...");

    const apiBase = process.env.NEXT_PUBLIC_RENDER_API_URL || "";

    try {
      if (apiBase) {
        const res = await fetch(`${apiBase}/api/operator`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: trimmed }),
        });

        if (res.ok) {
          const data = (await res.json()) as OperatorResult;
          setActiveResult(data);
          startTypewriter(data.answer);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fall through to deterministic local fallback
    }

    // Deterministic fallback matching query intent
    const lower = trimmed.toLowerCase();
    let fallback = FALLBACK_GROUNDED_RESPONSES.role;
    if (lower.includes("metric") || lower.includes("scale") || lower.includes("number")) {
      fallback = FALLBACK_GROUNDED_RESPONSES.metrics;
    } else if (lower.includes("tfgenapi") || lower.includes("ocr")) {
      fallback = FALLBACK_GROUNDED_RESPONSES.tfgenapi;
    } else if (lower.includes("iyov") || lower.includes("payroll") || lower.includes("flutter")) {
      fallback = FALLBACK_GROUNDED_RESPONSES.iyov;
    } else if (lower.includes("securebank") || lower.includes("credit") || lower.includes("rule")) {
      fallback = FALLBACK_GROUNDED_RESPONSES.securebank;
    } else if (lower.includes("avail") || lower.includes("hire") || lower.includes("consult")) {
      fallback = FALLBACK_GROUNDED_RESPONSES.availability;
    } else if (lower.includes("garage") || lower.includes("coupe") || lower.includes("endurance")) {
      fallback = {
        answer: "Accessing Endurance Chassis Telemetry: Inspect the 40-inch aerodynamic silhouette, V8 powertrain curve, and downforce polar at /garage.",
        sourceIds: ["telemetry_garage"],
        confidence: 1.0,
      };
    } else if (lower.includes("pit") || lower.includes("roadster") || lower.includes("2-stroke") || lower.includes("two-stroke")) {
      fallback = {
        answer: "Accessing Acoustic Dynamics Telemetry: Inspect the 98cc two-stroke expansion chamber resonance and dyno powerband curve at /pit.",
        sourceIds: ["telemetry_pit"],
        confidence: 1.0,
      };
    }

    setActiveResult(fallback);
    startTypewriter(fallback.answer);
    setLoading(false);
  }, [startTypewriter]);

  // Global keyboard shortcut: Ctrl+K / Cmd+K / Esc + custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleOpenConsole = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      setIsOpen(true);
      if (customEvent.detail?.query) {
        setQuery(customEvent.detail.query);
        void handleSendQuery(customEvent.detail.query);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-operator-console", handleOpenConsole);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-operator-console", handleOpenConsole);
    };
  }, [isOpen, handleSendQuery]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleKeyPress = (presetQuery: string, index: number) => {
    setActiveKeyIndex(index);
    setQuery(presetQuery);
    void handleSendQuery(presetQuery);
  };

  return (
    <>
      {/* Floating 3D HUD Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full border border-cyan-500/40 bg-[#080B10]/90 px-4 py-2.5 text-xs font-mono font-semibold tracking-wider text-cyan-300 shadow-[0_4px_20px_rgba(0,240,255,0.25)] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-cyan-400 hover:shadow-[0_6px_25px_rgba(0,240,255,0.4)] active:scale-95"
        aria-label="Open Operator RAG Terminal (Ctrl+K)"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span>THE OPERATOR</span>
        <kbd className="hidden sm:inline-block rounded border border-cyan-500/30 bg-cyan-950/40 px-1.5 py-0.5 text-[10px] text-cyan-400">
          ⌘K
        </kbd>
      </button>

      {/* 3D Console Dialog Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="operator-console-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#05070a]/85 backdrop-blur-md"
            />

            {/* 3D Hardware Console Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: "spring", damping: 24, stiffness: 300 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#080B10] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(0,240,255,0.15)] flex flex-col max-h-[90vh]"
            >
              {/* Top HUD Frame Header */}
              <div className="flex items-center justify-between border-b border-cyan-900/40 bg-[#0c1017] px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#00FF66]" />
                  <div>
                    <h2 id="operator-console-title" className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
                      THE OPERATOR // ARCHITECTURAL DOSSIER
                    </h2>
                    <p className="text-[10px] font-mono text-slate-400">
                      RAG V1.0 · GEMINI GROUNDED · IN-MEMORY RETRIEVAL
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block text-[10px] font-mono text-cyan-400/60 uppercase">
                    PRESS [ESC] TO CLOSE
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg border border-slate-700/60 bg-slate-800/40 px-2 py-1 text-xs font-mono text-slate-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-400"
                    aria-label="Close terminal"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* CRT Terminal Screen */}
              <div className="relative border-b border-cyan-900/30 bg-[#05070a] p-4 sm:p-6 font-mono text-xs leading-relaxed text-cyan-100 min-h-[160px] sm:min-h-[190px] flex flex-col justify-between">
                {/* Scanline and Grid Texture */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,240,255,0.05),transparent_70%)]" />

                <div className="relative z-10 space-y-3 overflow-y-auto max-h-[220px]">
                  <div className="flex items-center gap-2 text-[10px] text-cyan-400/70">
                    <span className="font-bold">&gt;&gt; STATUS:</span>
                    <span className="text-emerald-400">{loading ? "COMPUTING..." : "READY"}</span>
                    {activeResult?.confidence !== undefined && (
                      <span className="text-slate-400">· CONFIDENCE: {(activeResult.confidence * 100).toFixed(0)}%</span>
                    )}
                  </div>

                  <p className="text-sm font-mono text-slate-200">
                    {displayedText}
                    <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-1 translate-y-0.5" />
                  </p>

                  {/* Grounded Source Badges */}
                  {activeResult && activeResult.sourceIds.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">CITATIONS:</span>
                      {activeResult.sourceIds.map((src) => (
                        <span
                          key={src}
                          className="rounded border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 text-[10px] text-cyan-300 font-mono"
                        >
                          [{src}]
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 3D Skeuomorphic Mechanical Switches / Keycaps Panel */}
              <div className="border-b border-cyan-900/30 bg-[#090d14] p-4 sm:p-5">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                    TACTILE DIRECTIVES // MECHANICAL KEYCAPS
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400/60">CLICK OR SELECT</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PRESET_KEYS.map((key, idx) => (
                    <button
                      key={key.label}
                      type="button"
                      onClick={() => handleKeyPress(key.query, idx)}
                      className={`group relative select-none rounded-xl border bg-[#0f1520] p-3 text-left font-mono transition-all duration-150 shadow-[0_4px_0_#05080c,0_6px_12px_rgba(0,0,0,0.5)] active:translate-y-[3px] active:shadow-[0_1px_0_#05080c] ${
                        activeKeyIndex === idx
                          ? "border-cyan-400 bg-cyan-950/30 shadow-[0_2px_0_#05080c] translate-y-[2px]"
                          : `${key.color} hover:border-cyan-400 hover:bg-[#141b29]`
                      }`}
                    >
                      <div className="text-[11px] font-bold tracking-wider">{key.label}</div>
                      <div className="mt-1 line-clamp-1 text-[9px] text-slate-400 group-hover:text-slate-200">
                        {key.query}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Command Prompt Input Field */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSendQuery(query);
                }}
                className="flex items-center gap-2 bg-[#0c1017] p-3 sm:p-4"
              >
                <span className="font-mono text-cyan-400 text-sm pl-2 font-bold">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask the Operator about architecture, scale, or engineering..."
                  className="flex-1 bg-transparent px-2 py-1.5 font-mono text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 font-mono text-xs font-bold text-cyan-300 transition-all hover:bg-cyan-500/20 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                >
                  TRANSMIT
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
