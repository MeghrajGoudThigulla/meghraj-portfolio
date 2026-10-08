"use client";

import { useEffect, useState } from "react";
import { soundFX } from "@/lib/sound";
import { Crosshair, ShieldAlert, Terminal } from "lucide-react";

export type ThemeProtocol = "stark" | "matrix" | "hybrid";

interface TacticalHudControlsProps {
  currentProtocol: ThemeProtocol;
  onProtocolChange: (protocol: ThemeProtocol) => void;
}

export default function TacticalHudControls({
  currentProtocol,
  onProtocolChange,
}: TacticalHudControlsProps) {
  const [coordinates, setCoordinates] = useState({ x: 842, y: 419 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoordinates({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSelectProtocol = (proto: ThemeProtocol) => {
    if (proto === currentProtocol) return;

    if (proto === "matrix") {
      soundFX.playMatrixGlitch();
    } else if (proto === "stark") {
      soundFX.playArcPulse();
    } else {
      soundFX.playTargetLock();
    }

    onProtocolChange(proto);
  };

  return (
    <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-500/30 bg-[#080B10]/90 px-4 py-2.5 font-mono text-xs shadow-xl backdrop-blur-md">
      {/* Left: Tactical Diagnostic Coordinates */}
      <div className="flex items-center gap-3 text-[11px] text-slate-300">
        <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
          <Crosshair className="h-3.5 w-3.5 animate-pulse" />
          <span>HUD [X:{coordinates.x.toString().padStart(4, "0")} Y:{coordinates.y.toString().padStart(4, "0")}]</span>
        </span>
        <span className="hidden sm:inline text-slate-500">|</span>
        <span className="hidden sm:inline font-mono text-emerald-400 font-medium">
          ALL SYSTEMS NOMINAL
        </span>
      </div>

      {/* Right: Theme Protocol Switcher */}
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-slate-400 uppercase font-bold mr-1 hidden sm:inline">
          PROTOCOL:
        </span>

        {/* Stark Mode Button */}
        <button
          type="button"
          onClick={() => handleSelectProtocol("stark")}
          className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
            currentProtocol === "stark"
              ? "border border-cyan-400 bg-cyan-950/80 text-cyan-200 shadow-[0_0_12px_rgba(0,240,255,0.4)]"
              : "border border-transparent bg-slate-900/60 text-slate-400 hover:text-slate-200"
          }`}
        >
          <ShieldAlert className="h-3 w-3 text-cyan-400" />
          <span>STARK HUD</span>
        </button>

        {/* Matrix Mode Button */}
        <button
          type="button"
          onClick={() => handleSelectProtocol("matrix")}
          className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
            currentProtocol === "matrix"
              ? "border border-emerald-400 bg-emerald-950/80 text-emerald-200 shadow-[0_0_12px_rgba(0,255,102,0.4)]"
              : "border border-transparent bg-slate-900/60 text-slate-400 hover:text-slate-200"
          }`}
        >
          <Terminal className="h-3 w-3 text-emerald-400" />
          <span>MATRIX</span>
        </button>

        {/* Hybrid Mode Button */}
        <button
          type="button"
          onClick={() => handleSelectProtocol("hybrid")}
          className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
            currentProtocol === "hybrid"
              ? "border border-amber-400 bg-amber-950/80 text-amber-200 shadow-[0_0_12px_rgba(255,217,142,0.4)]"
              : "border border-transparent bg-slate-900/60 text-slate-400 hover:text-slate-200"
          }`}
        >
          <span>HYBRID</span>
        </button>
      </div>
    </div>
  );
}
