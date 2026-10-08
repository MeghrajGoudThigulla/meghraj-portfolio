"use client";

import dynamic from "next/dynamic";

const WorldScene3D = dynamic(() => import("@/components/WorldScene3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-[#06080e] font-mono text-cyan-400">
      <div className="flex flex-col items-center gap-3">
        <span className="h-4 w-4 rounded-full bg-cyan-400 animate-ping" />
        <p className="text-xs tracking-widest uppercase">INITIALIZING 3D SYSTEM MATRIX...</p>
      </div>
    </div>
  ),
});

export default function WorldClientWrapper() {
  return <WorldScene3D />;
}
