"use client";

import { useState } from "react";
import { soundFX } from "@/lib/sound";
import { Activity, Cpu, Shield, Smartphone, Zap } from "lucide-react";

interface SystemNode {
  id: string;
  name: string;
  code: string;
  metric: string;
  spec: string;
  icon: typeof Cpu;
  color: string;
  angleDeg: number;
}

const SYSTEM_NODES: SystemNode[] = [
  {
    id: "gateway",
    name: "CORE GATEWAY",
    code: "STARK-GW // 286-EP",
    metric: "286 Production Endpoints",
    spec: "High-concurrency reverse proxy, rate-limiting tier, 61+ database models, and 30+ schema migrations.",
    icon: Activity,
    color: "#00f0ff",
    angleDeg: 0,
  },
  {
    id: "inference",
    name: "TFGenAPI INFERENCE",
    code: "REACTOR // OCR-VEC",
    metric: "PyTesseract & Transformers",
    spec: "Automated document verification pipeline with PyTesseract OCR, Sentence Transformers dense vector embeddings, and Celery/Redis worker queues.",
    icon: Cpu,
    color: "#00ff66",
    angleDeg: 90,
  },
  {
    id: "payroll",
    name: "COMPLIANCE ENGINE",
    code: "IYOV-AI // TAX-STAT",
    metric: "India Statutory Payroll",
    spec: "Zero-defect India statutory compliance engine built from scratch: automated PF, ESI, PT, and TDS schedules with background reconciliation.",
    icon: Shield,
    color: "#ffd98e",
    angleDeg: 180,
  },
  {
    id: "mobile",
    name: "FLUTTER FLEET",
    code: "CLIENT // 4-APPS",
    metric: "80+ Screens · 4+ Apps",
    spec: "Multi-tenant mobile architecture shipping 4+ commercial Flutter applications across iOS and Android with unified state pipelines.",
    icon: Smartphone,
    color: "#38bdf8",
    angleDeg: 270,
  },
];

interface StarkArcVisualizerProps {
  mode?: "stark" | "matrix" | "hybrid";
}

export default function StarkArcVisualizer({
  mode = "stark",
}: StarkArcVisualizerProps) {
  const [activeNode, setActiveNode] = useState<SystemNode>(SYSTEM_NODES[0]);
  const [isOvercharged, setIsOvercharged] = useState(false);

  const primaryGlow =
    mode === "matrix"
      ? "rgba(0, 255, 102, 0.4)"
      : "rgba(0, 240, 255, 0.4)";

  const accentColor =
    mode === "matrix" ? "#00ff66" : "#00f0ff";

  const handleSurge = () => {
    soundFX.playArcPulse();
    setIsOvercharged(true);
    setTimeout(() => {
      setIsOvercharged(false);
    }, 900);
  };

  const handleSelectNode = (node: SystemNode) => {
    soundFX.playTargetLock();
    setActiveNode(node);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Visualizer Shell with Tactical HUD Framing */}
      <div className="relative flex h-[340px] w-[340px] sm:h-[400px] sm:w-[400px] items-center justify-center">
        {/* Background Radar Radial Pulse */}
        <div
          className={`absolute inset-0 rounded-full border border-cyan-500/20 bg-radial from-cyan-950/20 to-transparent transition-transform duration-700 ${
            isOvercharged ? "scale-110 opacity-100" : "scale-100 opacity-60"
          }`}
          style={{
            boxShadow: `0 0 50px ${primaryGlow}, inset 0 0 40px ${primaryGlow}`,
          }}
        />

        {/* Outer Concentric HUD Ring (Slow Clockwise Rotation) */}
        <div
          className="absolute inset-4 rounded-full border border-dashed border-cyan-500/30 transition-transform duration-1000 ease-out"
          style={{
            animation: "spin 36s linear infinite",
          }}
        />

        {/* Middle HUD Ring with Degree Tick Marks (Counter-Clockwise Rotation) */}
        <div
          className="absolute inset-12 rounded-full border border-cyan-400/40"
          style={{
            animation: "spin 24s linear infinite reverse",
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-mono font-bold text-cyan-400">
            000°
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[8px] font-mono font-bold text-cyan-400">
            180°
          </div>
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-mono font-bold text-cyan-400">
            270°
          </div>
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-[8px] font-mono font-bold text-cyan-400">
            090°
          </div>
        </div>

        {/* Inner Tactical Flux Ring */}
        <div
          className={`absolute inset-20 rounded-full border-2 border-cyan-300/50 transition-all duration-300 ${
            isOvercharged ? "border-cyan-200 scale-105" : ""
          }`}
          style={{
            boxShadow: `0 0 25px ${primaryGlow}`,
          }}
        />

        {/* Central Arc Core Button */}
        <button
          type="button"
          onClick={handleSurge}
          aria-label="Arc Reactor Overcharge Surge"
          className="group relative z-20 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border-2 border-cyan-400 bg-[#06080e] shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          {/* Internal Tri-Arc Geometry */}
          <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-cyan-500/60 bg-cyan-950/40">
            <Zap
              className={`h-8 w-8 sm:h-9 sm:w-9 transition-all duration-300 ${
                isOvercharged
                  ? "text-white scale-125 rotate-12"
                  : "text-cyan-300 group-hover:text-white"
              }`}
            />
          </div>

          {/* Central Label */}
          <span className="absolute -bottom-6 font-mono text-[9px] font-black tracking-widest text-cyan-300 uppercase">
            {isOvercharged ? "SURGING..." : "ARC CORE"}
          </span>
        </button>

        {/* 4 Interactive System Nodes on Orbital Coordinates */}
        {SYSTEM_NODES.map((node) => {
          const isSelected = activeNode.id === node.id;
          const Icon = node.icon;

          // Coordinate calculation along orbital radius
          const radius = 135; // px from center
          const rad = (node.angleDeg * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => handleSelectNode(node)}
              aria-label={`Inspect ${node.name}`}
              className={`absolute z-30 flex h-11 w-11 sm:h-12 sm:w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border font-mono transition-all duration-300 hover:scale-115 focus:outline-none focus:ring-2 ${
                isSelected
                  ? "border-white bg-[#0f172a] text-white shadow-[0_0_20px_rgba(0,240,255,0.8)] scale-110"
                  : "border-cyan-500/40 bg-[#080B10]/90 text-cyan-300 hover:border-cyan-300 shadow-md"
              }`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </div>

      {/* Real-Time Tactical Node Dossier Card */}
      <div className="mt-4 w-full max-w-sm rounded-xl border border-cyan-500/30 bg-[#080B10]/95 p-3.5 shadow-xl backdrop-blur-md hud-bracket font-mono">
        <div className="flex items-center justify-between border-b border-cyan-950 pb-2">
          <span className="text-[10px] font-bold text-cyan-400">
            {activeNode.code}
          </span>
          <span className="rounded bg-cyan-950/80 px-2 py-0.5 text-[9px] font-black text-cyan-200">
            STATUS: NOMINAL
          </span>
        </div>

        <div className="mt-2.5">
          <p className="text-sm font-black text-white font-sans tracking-wide">
            {activeNode.metric}
          </p>
          <p className="mt-1 text-xs text-slate-300 font-mono leading-relaxed">
            {activeNode.spec}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between text-[9px] text-slate-400 border-t border-cyan-950/60 pt-2">
          <span>COORDINATES: {activeNode.angleDeg}° // POLAR</span>
          <span style={{ color: accentColor }}>CLICK TO ENGAGE</span>
        </div>
      </div>
    </div>
  );
}
