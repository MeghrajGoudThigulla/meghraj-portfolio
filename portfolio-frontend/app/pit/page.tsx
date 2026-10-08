import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Gauge, Zap, Activity, Wind } from "lucide-react";

export const metadata: Metadata = {
  title: "Telemetry Dossier // 100cc Roadster | Meghraj Goud",
  description: "Acoustic resonance harmonics and combustion dynamics of an air-cooled two-stroke single-cylinder roadster.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PitPage() {
  return (
    <main className="min-h-screen bg-[#080B10] text-slate-200 font-mono py-12 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="mx-auto max-w-5xl">
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-950/60 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO PORTFOLIO</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#00FF66]" />
            <span className="text-[11px] text-emerald-400/80 tracking-widest uppercase">
              ACOUSTIC DYNAMICS // 98CC 2-STROKE ROADSTER
            </span>
          </div>
        </div>

        {/* Title Section */}
        <div className="mt-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500">MECHANICAL RESONANCE SPECIFICATION</p>
          <h1 className="mt-1 text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            TWO-STROKE ROADSTER // 98CC AIR-COOLED
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            High-revving single-cylinder crankcase compression engine utilizing tuned acoustic expansion chamber
            scavenging to achieve volumetric efficiency exceeding 110% on the pipe.
          </p>
        </div>

        {/* Technical Vector Silhouette (Roadster Bike Profile) */}
        <div className="mt-8 relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-[#0c1017] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)] hud-bracket">
          <div className="flex items-center justify-between text-[10px] text-emerald-400/70 border-b border-emerald-950/80 pb-3 mb-4">
            <span>EXPANSION CHAMBER HARMONICS & CHASSIS GEOMETRY</span>
            <span>SCALE: 1:12 // SCHEMATIC BLUEPRINT</span>
          </div>

          <div className="relative w-full aspect-[21/9] flex items-center justify-center">
            {/* Background Grid Pattern */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,255,102,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,102,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />

            <svg
              viewBox="0 0 900 320"
              className="w-full h-full text-emerald-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              role="img"
              aria-label="Schematic vector blueprint of two-stroke lightweight motorcycle with tuned expansion chamber"
            >
              {/* Ground plane */}
              <line x1="30" y1="280" x2="870" y2="280" stroke="#1e293b" strokeDasharray="6 6" />

              {/* Front Wheel Spoke & Rim */}
              <circle cx="700" cy="215" r="60" stroke="#00FF66" strokeWidth="2.5" />
              <circle cx="700" cy="215" r="45" stroke="#00FF66" strokeOpacity="0.3" strokeDasharray="4 4" />
              <circle cx="700" cy="215" r="12" fill="#00FF66" fillOpacity="0.2" />

              {/* Rear Wheel Spoke & Rim */}
              <circle cx="200" cy="215" r="60" stroke="#00FF66" strokeWidth="2.5" />
              <circle cx="200" cy="215" r="45" stroke="#00FF66" strokeOpacity="0.3" strokeDasharray="4 4" />
              <circle cx="200" cy="215" r="18" stroke="#00FF66" strokeWidth="2" />

              {/* Double-Cradle Tubular Frame */}
              <path
                d="M 200,215 
                   L 340,215 
                   L 390,140 
                   L 600,100 
                   L 460,190 
                   L 340,215"
                stroke="#00FF66"
                strokeWidth="2"
              />

              {/* Telescopic Front Fork */}
              <line x1="600" y1="100" x2="700" y2="215" stroke="#00FF66" strokeWidth="2.5" />
              {/* Handlebar */}
              <path d="M 590,90 L 610,75 L 595,70" stroke="#00FF66" strokeWidth="2" />

              {/* Teardrop Fuel Tank & Bench Seat */}
              <path
                d="M 600,100 
                   C 570,80 500,80 460,95 
                   L 320,110 
                   C 300,110 290,125 310,135 
                   L 460,135 
                   Z"
                stroke="#34d399"
                strokeWidth="2"
                fill="rgba(52, 211, 153, 0.15)"
              />

              {/* 98cc Single Cylinder Fin Block */}
              <rect x="420" y="160" width="45" height="40" stroke="#00FF66" strokeWidth="1.5" rx="3" fill="rgba(0, 255, 102, 0.1)" />
              <line x1="415" y1="168" x2="470" y2="168" stroke="#00FF66" strokeWidth="1" />
              <line x1="415" y1="176" x2="470" y2="176" stroke="#00FF66" strokeWidth="1" />
              <line x1="415" y1="184" x2="470" y2="184" stroke="#00FF66" strokeWidth="1" />
              <line x1="415" y1="192" x2="470" y2="192" stroke="#00FF66" strokeWidth="1" />

              {/* Tuned Expansion Chamber Exhaust Pipe (Hydroformed Silhouette) */}
              {/* Header pipe -> Diffuser Cone -> Belly -> Baffle Cone -> Stinger */}
              <path
                d="M 465,195 
                   C 485,215 480,245 450,250 
                   L 360,250 
                   C 320,250 260,240 180,225"
                stroke="#00F0FF"
                strokeWidth="3.5"
                fill="none"
              />
              <path
                d="M 450,247 L 360,246 L 270,238"
                stroke="#00F0FF"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />

              {/* Acoustic Wave Vector */}
              <path
                d="M 465,195 Q 420,240 360,248 T 260,236"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <text x="360" y="270" fill="#f59e0b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                RESONANT REFLECTION WAVE (SCAVENGING PULSE)
              </text>
            </svg>
          </div>
        </div>

        {/* Telemetry Metric Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-emerald-900/40 bg-[#0c1017] p-4 hud-bracket">
            <div className="flex items-center gap-2 text-emerald-400">
              <Zap className="h-4 w-4" />
              <span className="text-[10px] font-bold tracking-wider uppercase">BORE × STROKE</span>
            </div>
            <div className="mt-2 text-xl font-bold text-white">50.0 × 50.0 MM</div>
            <p className="mt-1 text-[11px] text-slate-400">98 cc square stroke / 6.6:1 compression</p>
          </div>

          <div className="rounded-xl border border-emerald-900/40 bg-[#0c1017] p-4 hud-bracket">
            <div className="flex items-center gap-2 text-cyan-400">
              <Gauge className="h-4 w-4" />
              <span className="text-[10px] font-bold tracking-wider uppercase">PEAK POWERBAND</span>
            </div>
            <div className="mt-2 text-xl font-bold text-white">11.0 BHP @ 7,500 RPM</div>
            <p className="mt-1 text-[11px] text-slate-400">Expansion chamber boost threshold @ 5,800 RPM</p>
          </div>

          <div className="rounded-xl border border-emerald-900/40 bg-[#0c1017] p-4 hud-bracket">
            <div className="flex items-center gap-2 text-emerald-400">
              <Activity className="h-4 w-4" />
              <span className="text-[10px] font-bold tracking-wider uppercase">PREMIX OIL RATIO</span>
            </div>
            <div className="mt-2 text-xl font-bold text-white">32:1 (3.125%)</div>
            <p className="mt-1 text-[11px] text-slate-400">JASO-FD fully synthetic two-stroke oil</p>
          </div>

          <div className="rounded-xl border border-emerald-900/40 bg-[#0c1017] p-4 hud-bracket">
            <div className="flex items-center gap-2 text-cyan-400">
              <Wind className="h-4 w-4" />
              <span className="text-[10px] font-bold tracking-wider uppercase">CURB WEIGHT</span>
            </div>
            <div className="mt-2 text-xl font-bold text-white">98 KG (DRY)</div>
            <p className="mt-1 text-[11px] text-slate-400">Power-to-weight ratio: 112 BHP/ton</p>
          </div>
        </div>

        {/* 2-Stroke Powerband Spike Graph */}
        <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-[#090d14] p-6">
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-emerald-950 pb-3 mb-4">
            <span className="font-bold text-emerald-400">DYNAMOMETER // TWO-STROKE ON-THE-PIPE POWERBAND CURVE</span>
            <span>MIKUNI 20MM FLATSIDE CARBURETOR</span>
          </div>

          <div className="relative h-48 w-full">
            <svg
              viewBox="0 0 800 200"
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              role="img"
              aria-label="Powerband spike graph showing sudden surge in horsepower when expansion chamber hits resonant frequency"
            >
              {/* Horizontal Gridlines */}
              <line x1="60" y1="30" x2="760" y2="30" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="60" y1="80" x2="760" y2="80" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="60" y1="130" x2="760" y2="130" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="60" y1="180" x2="760" y2="180" stroke="#334155" />

              {/* Powerband Spike (Emerald Green) */}
              <path
                d="M 60,175 C 200,172 350,165 420,150 C 470,120 520,40 600,45 C 680,60 720,120 740,165"
                stroke="#00FF66"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Scavenging Efficiency Vector (Cyan) */}
              <path
                d="M 60,160 C 200,155 350,145 440,110 C 500,75 580,70 660,110 C 710,140 740,170"
                stroke="#00F0FF"
                strokeWidth="2"
                strokeDasharray="5 3"
                strokeLinecap="round"
              />

              {/* High Powerband Hit Point Label */}
              <circle cx="560" cy="42" r="4" fill="#00FF66" />
              <text x="560" y="28" fill="#00FF66" fontSize="10" fontFamily="monospace" textAnchor="middle">
                11.0 BHP @ 7,500 RPM (ON THE PIPE)
              </text>

              {/* RPM Ticks */}
              <text x="60" y="195" fill="#64748b" fontSize="9" fontFamily="monospace">3,000 RPM</text>
              <text x="360" y="195" fill="#64748b" fontSize="9" fontFamily="monospace">5,500 RPM</text>
              <text x="560" y="195" fill="#64748b" fontSize="9" fontFamily="monospace">7,500 RPM</text>
              <text x="720" y="195" fill="#64748b" fontSize="9" fontFamily="monospace">9,500 RPM</text>
            </svg>
          </div>
          <div className="mt-3 flex items-center justify-end gap-6 text-[10px]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-0.5 w-4 bg-emerald-400 inline-block" /> BRAKE HORSEPOWER (BHP)
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="h-0.5 w-4 bg-cyan-400 inline-block" /> VOLUMETRIC TRAPPING EFFICIENCY
            </span>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-[10px] text-slate-500 border-t border-emerald-950/40 pt-6">
          <p>
            EASTER EGG // ACOUSTIC HARMONICS DOSSIER · NO TRADEMARKS INTENDED OR IMPLIED.
          </p>
        </div>
      </div>
    </main>
  );
}
