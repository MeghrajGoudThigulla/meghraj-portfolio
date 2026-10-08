import Link from "next/link";
import { Terminal, Home, Globe, MessageSquare } from "lucide-react";

export const metadata = {
  title: "404: Vector Route Disconnected | Meghraj Goud",
  description: "The requested coordinate does not exist in the active architecture perimeter.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#06080E] px-4 py-16 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Ambient Matrix Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08),transparent_70%)]" />

      <div className="relative mx-auto flex w-full max-w-xl flex-col items-center text-center">
        {/* HUD Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/30 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-ping" />
          <span>STATUS // 404 UNRESOLVED VECTOR</span>
        </div>

        {/* Giant Monospace Glitch Code */}
        <h1 className="mt-6 font-mono text-7xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 drop-shadow-[0_0_35px_rgba(0,240,255,0.25)]">
          404
        </h1>

        <h2 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-white">
          Vector Route Disconnected
        </h2>

        <p className="mt-3 max-w-md text-xs sm:text-sm text-slate-400 font-mono leading-relaxed">
          The requested coordinate or endpoint does not exist in the deployment cluster. Return to verified perimeter systems below.
        </p>

        {/* Action Grid */}
        <div className="mt-8 grid w-full grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-950/30 px-4 py-3 font-bold text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-900/50 hover:text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
          >
            <Home className="h-4 w-4" />
            <span>RETURN TO BASE</span>
          </Link>

          <Link
            href="/#projects"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 font-bold text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-white"
          >
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span>ARCHITECTURE</span>
          </Link>

          <Link
            href="/world"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 font-bold text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-white"
          >
            <Globe className="h-4 w-4 text-cyan-400" />
            <span>3D SYSTEM WORLD</span>
          </Link>

          <Link
            href="/chat"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 font-bold text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-white"
          >
            <MessageSquare className="h-4 w-4 text-amber-400" />
            <span>CONSULT OPERATOR</span>
          </Link>
        </div>

        {/* Footer Diagnostic Line */}
        <div className="mt-12 flex items-center gap-2 text-[10px] font-mono text-slate-600">
          <span>HOST: RENDER // CLUSTER: FIREBASE OUT // PROTOCOL: HTTP/2</span>
        </div>
      </div>
    </main>
  );
}
