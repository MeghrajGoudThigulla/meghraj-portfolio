"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CornerDownLeft, X, ExternalLink } from "lucide-react";
import { soundFX } from "@/lib/sound";

type KeyDef = {
  id: string;
  letter: string;
  caption: string;
  accessibleName: string;
  x: number;
  y: number;
  w: number;
  h: number;
  faceColor: string;
  baseColor: string;
  textColor: string;
  isEnter?: boolean;
  action: "dialog" | "contact" | "link";
  dialogTitle?: string;
  dialogContent?: string;
  dialogTags?: string[];
  linkHref?: string;
};

const KEYS: KeyDef[] = [
  // Top Row (y=0, w=146, h=161)
  {
    id: "key-p",
    letter: "P",
    caption: "SELECTED WORK",
    accessibleName: "Selected Work",
    x: 73,
    y: 0,
    w: 146,
    h: 161,
    faceColor: "#7dd3fc", // sky-300
    baseColor: "#0284c7", // sky-600
    textColor: "#082f49",
    action: "dialog",
    dialogTitle: "Selected Architecture & Systems",
    dialogContent: "Production systems delivered end-to-end: TFGenAPI (OCR & vector embedding gateway), IYOV AI (India statutory payroll computation engine), TFG SecureBank (credit scoring engine), and 4+ commercial Flutter applications.",
    dialogTags: ["FastAPI", "Express 5", "PyTesseract", "Celery", "PostgreSQL", "Flutter"],
    linkHref: "/#projects",
  },
  {
    id: "key-o1",
    letter: "O",
    caption: "ABOUT ME",
    accessibleName: "About Me",
    x: 219,
    y: 0,
    w: 146,
    h: 161,
    faceColor: "#c4b5fd", // violet-300
    baseColor: "#7c3aed", // violet-600
    textColor: "#2e1065",
    action: "dialog",
    dialogTitle: "Engineering Philosophy & Background",
    dialogContent: "Senior AI Developer & Full Stack Engineer at Threshing Floor Group (TFG). I own systems from database migration and distributed API design down to mobile client rendering. Backend-first, AI-augmented, and ships solo.",
    dialogTags: ["Distributed Systems", "RAG Pipelines", "Database Design", "Knowledge Transfer"],
    linkHref: "/#about",
  },
  {
    id: "key-r",
    letter: "R",
    caption: "MY PROCESS",
    accessibleName: "My Process",
    x: 365,
    y: 0,
    w: 146,
    h: 161,
    faceColor: "#6ee7b7", // emerald-300
    baseColor: "#059669", // emerald-600
    textColor: "#064e3b",
    action: "dialog",
    dialogTitle: "Architecture & Delivery Lifecycle",
    dialogContent: "1. Contract-first schema design & migration planning. 2. Low-latency asynchronous pipeline implementation with queue decoupling. 3. End-to-end telemetry and automated regression testing. 4. Zero-downtime deployment.",
    dialogTags: ["Contract-First", "Observability", "Zero-Downtime", "Alembic / Prisma"],
    linkHref: "/#services",
  },
  {
    id: "key-t",
    letter: "T",
    caption: "WHAT I DO",
    accessibleName: "What I Do",
    x: 511,
    y: 0,
    w: 146,
    h: 161,
    faceColor: "#fde047", // yellow-300
    baseColor: "#ca8a04", // yellow-600
    textColor: "#713f12",
    action: "dialog",
    dialogTitle: "Core Technical Capabilities",
    dialogContent: "High-throughput REST and GraphQL APIs, ML model serving gateways with embedding retrieval, India statutory compliance automation, fintech credit scoring rules, and production mobile Flutter apps.",
    dialogTags: ["FastAPI", "Node.js", "Python", "MongoDB", "PostgreSQL", "Docker"],
    linkHref: "/#skills",
  },

  // Lower Row (y=139, w=146, h=161)
  {
    id: "key-f",
    letter: "F",
    caption: "EXPLORE",
    accessibleName: "Explore Projects",
    x: 0,
    y: 139,
    w: 146,
    h: 161,
    faceColor: "#93c5fd", // blue-300
    baseColor: "#2563eb", // blue-600
    textColor: "#172554",
    action: "link",
    linkHref: "/#projects",
  },
  {
    id: "key-o2",
    letter: "O",
    caption: "SYSTEM ARCH",
    accessibleName: "System Architecture",
    x: 146,
    y: 139,
    w: 146,
    h: 161,
    faceColor: "#f472b6", // pink-400
    baseColor: "#db2777", // pink-600
    textColor: "#500724",
    action: "dialog",
    dialogTitle: "High-Concurrency Backend Architecture",
    dialogContent: "286 endpoints and 61+ database models architected with dual-database routing (PostgreSQL & MySQL), deduplication CTEs, Redis worker pools, and Celery asynchronous task distribution.",
    dialogTags: ["High Availability", "PostgreSQL Dedupe CTE", "Redis Pools", "Celery"],
    linkHref: "/#projects",
  },
  {
    id: "key-l",
    letter: "L",
    caption: "THE PROCESS",
    accessibleName: "The Engineering Process",
    x: 292,
    y: 139,
    w: 146,
    h: 161,
    faceColor: "#fdba74", // orange-300
    baseColor: "#ea580c", // orange-600
    textColor: "#431407",
    action: "dialog",
    dialogTitle: "Reliability & Quality Standards",
    dialogContent: "Decoupled testing contracts protecting API status codes and roles, strict type safety with tsc --noEmit, and automated CI sanity checks enforcing zero unverified claims and zero credential leaks.",
    dialogTags: ["Vitest", "Testing Contracts", "Strict TypeScript", "CI Gates"],
    linkHref: "/#services",
  },
  {
    id: "key-i",
    letter: "I",
    caption: "INFERENCE",
    accessibleName: "Inference Pipelines",
    x: 438,
    y: 139,
    w: 146,
    h: 161,
    faceColor: "#c084fc", // purple-400
    baseColor: "#9333ea", // purple-600
    textColor: "#3b0764",
    action: "dialog",
    dialogTitle: "AI & ML Model Serving Gateways",
    dialogContent: "PyTesseract OCR extraction pipelines, dense vector embeddings with Sentence Transformers, RAG vector retrieval with cosine similarity, and Gemini LLM prompt-injection defense layers.",
    dialogTags: ["Sentence Transformers", "PyTesseract", "Gemini 2.0", "Cosine Similarity"],
    linkHref: "/#projects",
  },
  {
    id: "key-o3",
    letter: "O",
    caption: "CONTACT ME",
    accessibleName: "Contact Me",
    x: 584,
    y: 139,
    w: 146,
    h: 161,
    faceColor: "#bef264", // lime-300
    baseColor: "#65a30d", // lime-600
    textColor: "#1a2e05",
    action: "contact",
    linkHref: "/#contact",
  },

  // Enter Key on Right (x=657, y=0, w=218, h=300)
  {
    id: "key-enter",
    letter: "ENTER",
    caption: "LET’S TALK",
    accessibleName: "Let's Talk",
    x: 657,
    y: 0,
    w: 218,
    h: 300,
    faceColor: "#facc15", // yellow-400
    baseColor: "#a16207", // yellow-700
    textColor: "#422006",
    isEnter: true,
    action: "contact",
    linkHref: "/#contact",
  },
];

export default function TactileKeyboard() {
  const router = useRouter();
  const [scale, setScale] = useState(1);
  const [pressedKeyId, setPressedKeyId] = useState<string | null>(null);
  const [hoveredKeyId, setHoveredKeyId] = useState<string | null>(null);
  const [activeDialog, setActiveDialog] = useState<KeyDef | null>(null);
  const [isAutoPaused, setIsAutoPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const keySequenceIndexRef = useRef(0);

  // Responsive scale calculation to fit container without overflowing
  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      // 900px composition width + 30px side clearance
      const newScale = Math.min(1, Math.max(0.35, (containerWidth - 24) / 900));
      setScale(newScale);
    }
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  // Automatic typewriter pressing sequence
  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || isAutoPaused || activeDialog) {
      const timer = setTimeout(() => {
        setPressedKeyId(null);
      }, 0);
      return () => clearTimeout(timer);
    }

    const runAutoSequence = () => {
      const currentKey = KEYS[keySequenceIndexRef.current];
      setPressedKeyId(currentKey.id);

      // Depress duration ~160ms, release, then advance
      setTimeout(() => {
        setPressedKeyId(null);
      }, 160);

      keySequenceIndexRef.current = (keySequenceIndexRef.current + 1) % KEYS.length;

      // Rest briefly after Enter (last key)
      const nextDelay = keySequenceIndexRef.current === 0 ? 1200 : 340;
      autoPressTimerRef.current = setTimeout(runAutoSequence, nextDelay);
    };

    autoPressTimerRef.current = setTimeout(runAutoSequence, 800);

    return () => {
      if (autoPressTimerRef.current) {
        clearTimeout(autoPressTimerRef.current);
      }
    };
  }, [isAutoPaused, activeDialog]);

  const handleKeyInteraction = (key: KeyDef) => {
    soundFX.playKeyClick();
    if (key.action === "dialog") {
      setActiveDialog(key);
    } else if (key.action === "contact" || key.action === "link") {
      if (key.linkHref) {
        router.push(key.linkHref);
      }
    }
  };

  return (
    <section className="relative w-full overflow-hidden border-b border-brand-border/60 bg-[#080B10] py-14 sm:py-20">
      {/* Background ambient texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={containerRef}>
        {/* Section Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>3D TACTILE DIRECTIVE KEYBOARD</span>
          </div>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Pick a directive keycap. Inspect the architecture.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Tactile physical switch matrix. Click any keycap below to trigger deep dossier inspection modals.
          </p>
        </div>

        {/* 3D Keyboard Frame Container (900px base composition) */}
        <div
          className="relative mx-auto flex items-center justify-center select-none"
          style={{
            height: `${320 * scale}px`,
            width: "100%",
            maxWidth: "920px",
          }}
          onMouseEnter={() => setIsAutoPaused(true)}
          onMouseLeave={() => setIsAutoPaused(false)}
        >
          <div
            className="absolute left-1/2 top-0 origin-top -translate-x-1/2"
            style={{
              width: "900px",
              height: "312px",
              transform: `translateX(-50%) scale(${scale})`,
            }}
          >
            {KEYS.map((key) => {
              const isPressed = pressedKeyId === key.id;
              const isHovered = hoveredKeyId === key.id;

              // Physical depth travel calculation
              const faceDepressY = isPressed ? 14 : isHovered ? 8 : 0;
              const baseDepressY = isPressed ? 4 : 0;

              // Physical stacking order:
              // - Top row (P, O, R, T at y=0): zIndex 10
              // - Enter key (x=657, y=0, w=218, h=300): zIndex 15 (behind lower row & O3)
              // - Lower row (F, O, L, I at y=139): zIndex 20 (overlaps top row by 22px)
              // - Final lower O (key-o3 at x=584, y=139, w=146): zIndex 30 (overlaps left 73px of Enter)
              let baseZ = 10;
              if (key.id === "key-o3") {
                baseZ = 30;
              } else if (key.y > 0) {
                baseZ = 20;
              } else if (key.isEnter) {
                baseZ = 15;
              } else {
                baseZ = 10;
              }

              // Preserve stacking relation during press/hover so Enter never clips O3
              const zIndex = (isPressed || isHovered)
                ? (key.isEnter ? 18 : baseZ + 6)
                : baseZ;

              return (
                <div
                  key={key.id}
                  style={{
                    position: "absolute",
                    left: `${key.x}px`,
                    top: `${key.y}px`,
                    width: `${key.w}px`,
                    height: `${key.h}px`,
                    zIndex,
                  }}
                >
                  {/* Outer Base with Wall and Bottom Shadow */}
                  <div
                    className="relative w-full h-full transition-transform duration-100 ease-out"
                    style={{
                      transform: `translateY(${baseDepressY}px)`,
                      borderRadius: "38px",
                      backgroundColor: key.baseColor,
                      border: "2px solid #0f172a",
                      boxShadow: "0 6px 0 #020617, 0 12px 24px rgba(0,0,0,0.7)",
                    }}
                  >
                    {/* Raised Key Face */}
                    <button
                      type="button"
                      aria-label={key.accessibleName}
                      onClick={() => handleKeyInteraction(key)}
                      onMouseEnter={() => setHoveredKeyId(key.id)}
                      onMouseLeave={() => setHoveredKeyId(null)}
                      className="absolute inset-x-2.5 top-2 flex flex-col justify-between overflow-hidden cursor-pointer transition-transform duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                      style={{
                        height: key.isEnter ? "252px" : "118px",
                        borderRadius: "29px",
                        backgroundColor: key.faceColor,
                        border: "2px solid #0f172a",
                        transform: `translateY(${faceDepressY}px)`,
                        color: key.textColor,
                        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      {key.isEnter ? (
                        /* Tall Stepped Enter Key Layout */
                        <div className="relative h-full w-full select-none p-4">
                          {/* Top Row: RETURN directive label + corner return icon */}
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-black tracking-widest text-[#422006]">
                              RETURN
                            </span>
                            <CornerDownLeft className="h-5 w-5 stroke-[2.5] text-[#422006]" />
                          </div>

                          {/* Vertical LET'S TALK caption along the right side (clear of overlapping O3 key) */}
                          <div
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[11px] font-black tracking-[0.25em] uppercase text-[#422006] pointer-events-none select-none"
                            style={{
                              writingMode: "vertical-rl",
                            }}
                          >
                            {key.caption}
                          </div>

                          {/* Large Return Arrow Symbol in the exposed bottom-right zone */}
                          <div className="absolute right-3.5 bottom-3.5 pointer-events-none select-none">
                            <span className="font-mono text-4xl sm:text-5xl font-black leading-none text-[#422006]">
                              ↵
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* Normal Key Layout */
                        <div className="flex h-full w-full flex-col justify-between p-3.5">
                          <div className="text-left font-mono text-[10px] font-black tracking-wider uppercase leading-tight line-clamp-1">
                            {key.caption}
                          </div>

                          <div className="text-center font-sans font-black text-[58px] tracking-tighter leading-none my-auto select-none">
                            {key.letter}
                          </div>

                          <div className="h-1 w-6 rounded-full bg-black/20 mx-auto" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Continuous Edge-to-Edge Editorial Marquee Strip */}
        <div className="mt-10 relative w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-[#ffd98e] text-[#5c330a] py-3.5 shadow-lg">
          <div className="flex w-max animate-marquee whitespace-nowrap font-serif text-sm sm:text-base font-bold italic tracking-wide">
            <span className="mx-4">
              Backend-First. AI-Augmented. Ships Solo. · 286 Production Endpoints · 61+ Database Models · 30+ Schema Migrations · 4+ Commercial Flutter Apps · Grounded & Verified · Pick a keycap to inspect. ·
            </span>
            <span className="mx-4" aria-hidden="true">
              Backend-First. AI-Augmented. Ships Solo. · 286 Production Endpoints · 61+ Database Models · 30+ Schema Migrations · 4+ Commercial Flutter Apps · Grounded & Verified · Pick a keycap to inspect. ·
            </span>
          </div>
        </div>
      </div>

      {/* Accessible Interactive Dialog Modal */}
      {activeDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tactile-dialog-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveDialog(null)}
          />

          {/* Dialog Container */}
          <div className="relative w-full max-w-lg rounded-2xl border border-cyan-500/40 bg-[#080B10] p-6 sm:p-8 text-slate-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.2)] hud-bracket">
            <div className="flex items-start justify-between gap-4 border-b border-cyan-950 pb-4">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  KEYCAP DIRECTIVE // [{activeDialog.letter}]
                </span>
                <h3 id="tactile-dialog-title" className="mt-1 text-xl font-bold font-sans text-white">
                  {activeDialog.dialogTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDialog(null)}
                className="rounded-lg border border-slate-700 bg-slate-800/50 p-1.5 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed font-mono">
              {activeDialog.dialogContent}
            </p>

            {activeDialog.dialogTags && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {activeDialog.dialogTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 font-mono text-[10px] text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-cyan-950 pt-4">
              <button
                type="button"
                onClick={() => setActiveDialog(null)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300 hover:bg-slate-700 transition-colors"
              >
                CLOSE
              </button>
              {activeDialog.linkHref && (
                <Link
                  href={activeDialog.linkHref}
                  onClick={() => setActiveDialog(null)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 font-mono text-xs font-bold text-black hover:bg-cyan-400 transition-colors"
                >
                  <span>VIEW SECTION</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
