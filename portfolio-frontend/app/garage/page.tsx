import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Gauge, Zap, Activity, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Telemetry Dossier // Endurance Coupe | Meghraj Goud",
  description: "Architectural telemetry and powertrain dynamics of a prototype endurance racing chassis.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GaragePage() {
  return (
    <main className="min-h-screen bg-[#080B10] text-slate-200 font-mono py-12 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/30 selection:text-cyan-200">
      <div className="mx-auto max-w-5xl">
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-950/60 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO PORTFOLIO</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00F0FF]" />
            <span className="text-[11px] text-cyan-400/80 tracking-widest uppercase">
              CHASSIS TELEMETRY // MK-IV COUPE
            </span>
          </div>
        </div>

        {/* Title Section */}
        <div className="mt-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-500">ENGINEERING PROTOTYPE SPECIFICATION</p>
          <h1 className="mt-1 text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            ENDURANCE COUPE // 40-INCH SILHOUETTE
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            High-downforce ground-effect endurance chassis engineered for 24-hour thermal equilibrium.
            Mid-mounted 90° V8 naturally aspirated architecture paired with a 5-speed transaxle.
          </p>
        </div>

        {/* Technical Vector Silhouette (Endurance Coupe Profile) */}
        <div className="mt-8 relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#0c1017] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)] hud-bracket">
          <div className="flex items-center justify-between text-[10px] text-cyan-400/70 border-b border-cyan-950/80 pb-3 mb-4">
            <span>AERODYNAMIC PROFILE & GROUND EFFECT CONTOUR</span>
            <span>SCALE: 1:18 // CAD WIREFRAME</span>
          </div>

          <div className="relative w-full aspect-[21/9] flex items-center justify-center">
            {/* Background Grid Pattern */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />

            <svg
              viewBox="0 0 900 320"
              className="w-full h-full text-cyan-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              role="img"
              aria-label="Side profile vector blueprint of 40-inch endurance racing coupe"
            >
              {/* Ground plane */}
              <line x1="30" y1="280" x2="870" y2="280" stroke="#1e293b" strokeDasharray="6 6" />

              {/* Front Wheel & Brake Assembly */}
              <circle cx="230" cy="235" r="45" stroke="#00F0FF" strokeWidth="2.5" />
              <circle cx="230" cy="235" r="28" stroke="#00F0FF" strokeOpacity="0.4" strokeDasharray="3 3" />
              <circle cx="230" cy="235" r="10" fill="#00F0FF" fillOpacity="0.2" />

              {/* Rear Wheel & Brake Assembly */}
              <circle cx="670" cy="235" r="45" stroke="#00F0FF" strokeWidth="2.5" />
              <circle cx="670" cy="235" r="28" stroke="#00F0FF" strokeOpacity="0.4" strokeDasharray="3 3" />
              <circle cx="670" cy="235" r="10" fill="#00F0FF" fillOpacity="0.2" />

              {/* Chassis Contour (Aerodynamic Profile) */}
              <path
                d="M 60,260 
                   L 120,255 
                   C 140,210 170,180 230,180 
                   C 260,180 280,210 290,225 
                   L 370,205 
                   C 420,150 480,120 540,120 
                   C 600,120 630,150 670,180 
                   L 760,195 
                   C 800,200 840,240 850,260 
                   L 830,260 
                   C 810,215 750,215 725,245 
                   L 300,250 
                   C 285,215 220,215 200,250 
                   Z"
                stroke="#00F0FF"
                strokeWidth="2"
                fill="rgba(0, 240, 255, 0.04)"
              />

              {/* Greenhouse / Cockpit Canopy */}
              <path
                d="M 370,200 
                   C 410,155 450,128 510,125 
                   C 570,125 610,150 645,185 
                   L 550,190 
                   Z"
                stroke="#38bdf8"
                strokeWidth="1.5"
                fill="rgba(56, 189, 248, 0.12)"
              />

              {/* NACA Duct Indication on rear quarter */}
              <polygon points="570,165 610,158 605,170" stroke="#00F0FF" strokeWidth="1" fill="rgba(0, 240, 255, 0.2)" />

              {/* Aerodynamic Airflow Streamlines */}
              <path d="M 40,220 C 130,210 210,150 380,140 C 550,130 650,150 860,210" stroke="#00FF66" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="8 4" />
              <path d="M 40,240 C 130,240 180,240 290,245 C 500,248 640,245 860,250" stroke="#00FF66" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 4" />

              {/* Dimension markers */}
              <line x1="60" y1="295" x2="850" y2="295" stroke="#64748b" strokeWidth="1" />
              <text x="440" y="310" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">
                WHEELBASE 2,413 MM // OVERALL LENGTH 4,064 MM
              </text>
            </svg>
          </div>
        </div>

        {/* Telemetry Metric Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-cyan-900/40 bg-[#0c1017] p-4 hud-bracket">
            <div className="flex items-center gap-2 text-cyan-400">
              <Zap className="h-4 w-4" />
              <span className="text-[10px] font-bold tracking-wider uppercase">POWERTRAIN</span>
            </div>
            <div className="mt-2 text-xl font-bold text-white">4,942 CC // V8</div>
            <p className="mt-1 text-[11px] text-slate-400">485 BHP @ 6,500 RPM / Dual Webers</p>
          </div>

          <div className="rounded-xl border border-cyan-900/40 bg-[#0c1017] p-4 hud-bracket">
            <div className="flex items-center gap-2 text-emerald-400">
              <Gauge className="h-4 w-4" />
              <span className="text-[10px] font-bold tracking-wider uppercase">DOWNFORCE COEFFICIENT</span>
            </div>
            <div className="mt-2 text-xl font-bold text-white">0.37 Cd // -280 KG</div>
            <p className="mt-1 text-[11px] text-slate-400">Negative lift across rear spoiler at 200 MPH</p>
          </div>

          <div className="rounded-xl border border-cyan-900/40 bg-[#0c1017] p-4 hud-bracket">
            <div className="flex items-center gap-2 text-cyan-400">
              <Activity className="h-4 w-4" />
              <span className="text-[10px] font-bold tracking-wider uppercase">DRY MASS</span>
            </div>
            <div className="mt-2 text-xl font-bold text-white">998 KG (42:58 F/R)</div>
            <p className="mt-1 text-[11px] text-slate-400">Steel monocoque with fiberglass panels</p>
          </div>

          <div className="rounded-xl border border-cyan-900/40 bg-[#0c1017] p-4 hud-bracket">
            <div className="flex items-center gap-2 text-emerald-400">
              <Cpu className="h-4 w-4" />
              <span className="text-[10px] font-bold tracking-wider uppercase">TOP SPEED</span>
            </div>
            <div className="mt-2 text-xl font-bold text-white">212 MPH (341 KM/H)</div>
            <p className="mt-1 text-[11px] text-slate-400">Mulsanne Straight terminal velocity</p>
          </div>
        </div>

        {/* Dyno Powerband & Torque Graph */}
        <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-[#090d14] p-6">
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-cyan-950 pb-3 mb-4">
            <span className="font-bold text-cyan-400">DYNAMOMETER BENCH // TORQUE & BRAKE POWER CURVE</span>
            <span>DYNO-JET AMBIENT 24°C // 101.3 KPA</span>
          </div>

          <div className="relative h-48 w-full">
            <svg
              viewBox="0 0 800 200"
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              role="img"
              aria-label="Dynamometer power curve graph plotting horsepower and torque against engine RPM"
            >
              {/* Horizontal Gridlines */}
              <line x1="60" y1="30" x2="760" y2="30" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="60" y1="80" x2="760" y2="80" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="60" y1="130" x2="760" y2="130" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="60" y1="180" x2="760" y2="180" stroke="#334155" />

              {/* BHP Curve (Cyan) */}
              <path
                d="M 60,170 C 200,160 350,110 500,65 C 600,40 680,35 740,45"
                stroke="#00F0FF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Torque Curve (Phosphor Green) */}
              <path
                d="M 60,130 C 200,85 350,60 500,55 C 620,65 680,85 740,110"
                stroke="#00FF66"
                strokeWidth="2"
                strokeDasharray="5 3"
                strokeLinecap="round"
              />

              {/* Labels */}
              <text x="745" y="42" fill="#00F0FF" fontSize="10" fontFamily="monospace">485 BHP</text>
              <text x="745" y="112" fill="#00FF66" fontSize="10" fontFamily="monospace">475 FT-LB</text>
              <text x="60" y="195" fill="#64748b" fontSize="9" fontFamily="monospace">2,000 RPM</text>
              <text x="380" y="195" fill="#64748b" fontSize="9" fontFamily="monospace">4,500 RPM</text>
              <text x="700" y="195" fill="#64748b" fontSize="9" fontFamily="monospace">7,000 RPM</text>
            </svg>
          </div>
          <div className="mt-3 flex items-center justify-end gap-6 text-[10px]">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="h-0.5 w-4 bg-cyan-400 inline-block" /> BHP (BRAKE HORSEPOWER)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-0.5 w-4 bg-emerald-400 inline-block" /> TORQUE (FT-LB)
            </span>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-[10px] text-slate-500 border-t border-cyan-950/40 pt-6">
          <p>
            EASTER EGG // ARCHITECTURAL TELEMETRY REFERENCE · NO TRADEMARKS INTENDED OR IMPLIED.
          </p>
        </div>
      </div>
    </main>
  );
}
