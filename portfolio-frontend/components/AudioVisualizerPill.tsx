"use client";

import { useEffect, useState } from "react";
import { soundFX } from "@/lib/sound";
import { Volume2, VolumeX, Sparkles, Globe } from "lucide-react";
import Link from "next/link";

export default function AudioVisualizerPill() {
  const [isMuted, setIsMuted] = useState(() => soundFX.getMuted());
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    // Listen for custom audio pulses
    const handleAudioTrigger = () => {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 240);
    };

    window.addEventListener("pointerdown", handleAudioTrigger);
    return () => window.removeEventListener("pointerdown", handleAudioTrigger);
  }, []);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    soundFX.setMuted(nextMuted);
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundFX.playCyberChime();
    }
  };

  const openDossier = () => {
    soundFX.playTargetLock();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-operator-console"));
    }
  };

  return (
    <aside aria-label="Tactical HUD Navigation Dock" className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex items-center gap-1 sm:gap-2 rounded-2xl border border-cyan-500/40 bg-[#080B10]/95 p-1 sm:p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.15)] backdrop-blur-xl font-mono text-[10px] sm:text-[11px]">
      {/* 3D World Quick Pill */}
      <Link
        href="/world"
        aria-label="Launch 3D System World"
        className="flex items-center gap-1 sm:gap-1.5 rounded-xl border border-cyan-500/20 bg-cyan-950/30 px-2 sm:px-3 py-1 sm:py-1.5 text-cyan-300 transition-all hover:border-cyan-400 hover:text-white hover:bg-cyan-900/40"
      >
        <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-spin" style={{ animationDuration: "12s" }} />
        <span className="font-bold">3D WORLD</span>
      </Link>

      {/* Operator AI Quick Trigger */}
      <button
        type="button"
        onClick={openDossier}
        aria-label="Open Operator Dossier (⌘K)"
        className="flex items-center gap-1 sm:gap-1.5 rounded-xl border border-cyan-500/20 bg-cyan-950/30 px-2 sm:px-3 py-1 sm:py-1.5 text-cyan-300 transition-all hover:border-cyan-400 hover:text-white hover:bg-cyan-900/40 cursor-pointer"
      >
        <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-400" />
        <span className="font-bold">DOSSIER</span>
        <kbd className="hidden sm:inline-block rounded bg-black/40 px-1 py-0.2 text-[9px] text-cyan-500">⌘K</kbd>
      </button>

      {/* Audio Mute & Visualizer Equalizer Toggle */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={isMuted ? "Enable sound effects" : "Mute sound effects"}
        className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 transition-all cursor-pointer ${
          isMuted
            ? "border-slate-800 bg-slate-900/50 text-slate-500 hover:text-slate-300"
            : "border-cyan-500/40 bg-cyan-950/50 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
        }`}
      >
        {isMuted ? (
          <VolumeX className="h-3.5 w-3.5" />
        ) : (
          <Volume2 className="h-3.5 w-3.5 text-cyan-400" />
        )}

        {/* Animated Equalizer Waves */}
        <div className="flex items-end gap-0.5 h-3">
          <span
            className={`w-0.5 rounded-full bg-cyan-400 transition-all duration-150 ${
              isMuted
                ? "h-1 opacity-20"
                : isPlayingAudio
                ? "h-3 animate-pulse"
                : "h-1.5"
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-cyan-400 transition-all duration-150 ${
              isMuted
                ? "h-1 opacity-20"
                : isPlayingAudio
                ? "h-3.5 animate-pulse"
                : "h-2.5"
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-cyan-400 transition-all duration-150 ${
              isMuted
                ? "h-1 opacity-20"
                : isPlayingAudio
                ? "h-2 animate-pulse"
                : "h-1.5"
            }`}
          />
        </div>

        <span className="font-bold text-[10px]">
          {isMuted ? "MUTED" : "AUDIO ON"}
        </span>
      </button>
    </aside>
  );
}
