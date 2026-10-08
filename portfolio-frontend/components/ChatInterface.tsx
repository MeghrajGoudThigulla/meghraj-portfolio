"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles, Volume2, VolumeX, Bot, User, RotateCcw } from "lucide-react";
import { soundFX } from "@/lib/sound";

type Message = {
  id: string;
  sender: "user" | "operator";
  text: string;
  sourceIds?: string[];
  timestamp: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    sender: "operator",
    text: "THE OPERATOR V1.0 INITIALIZED. I am Meghraj's architectural assistant, grounded in his verified engineering history across Threshing Floor Group and production systems. Ask me about backend architecture, TFGenAPI inference, IYOV AI payroll, or verified production metrics.",
    sourceIds: ["profile_identity", "profile_metrics"],
    timestamp: "SYSTEM READY",
  },
];

const PRESET_QUESTIONS = [
  "What is Meghraj's current role and engineering stack?",
  "What is his verified production scale (endpoints, models)?",
  "How does the TFGenAPI OCR inference pipeline work?",
  "Tell me about the IYOV AI statutory payroll engine.",
  "Explain the TFG SecureBank fintech rules architecture.",
  "What is his consulting & role availability scope?",
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messageCounterRef = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (typeof messagesEndRef.current?.scrollIntoView === "function") {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (queryToSend: string) => {
    const trimmed = queryToSend.trim();
    if (!trimmed || loading) return;

    soundFX.playKeyClick();
    messageCounterRef.current += 1;
    const userMsg: Message = {
      id: `user-${messageCounterRef.current}`,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setLoading(true);

    const apiBase = process.env.NEXT_PUBLIC_RENDER_API_URL || "";
    let answer = "Meghraj Goud is a Senior AI Developer & Full Stack Engineer at Threshing Floor Group (TFG). He delivers production backend platforms, ML model serving gateways, and mobile applications.";
    let sourceIds: string[] = ["profile_identity"];

    try {
      if (apiBase) {
        const res = await fetch(`${apiBase}/api/operator`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: trimmed }),
        });
        if (res.ok) {
          const data = await res.json();
          answer = data.answer;
          sourceIds = data.sourceIds || [];
        }
      }
    } catch {
      // Fallback local heuristic
      const lower = trimmed.toLowerCase();
      if (lower.includes("scale") || lower.includes("metric") || lower.includes("endpoint")) {
        answer = "Across verified production environments, Meghraj has delivered 286 production endpoints, 61+ database models, and 30+ schema migrations. He has shipped 80+ mobile screens and 4+ commercial Flutter applications.";
        sourceIds = ["profile_metrics"];
      } else if (lower.includes("tfgenapi") || lower.includes("ocr")) {
        answer = "TFGenAPI is an automated verification platform. Meghraj designed the inference pipeline using PyTesseract for OCR and Sentence Transformers for dense vector embeddings, with Celery and Redis worker pools for background task processing.";
        sourceIds = ["project_tfgenapi"];
      } else if (lower.includes("iyov") || lower.includes("payroll")) {
        answer = "For IYOV AI, Meghraj built the India statutory payroll and tax compliance engine from scratch, automating PF, ESI, PT, and TDS calculations with scheduled worker pools, alongside 4 companion Flutter apps.";
        sourceIds = ["project_iyov_ai"];
      } else if (lower.includes("securebank") || lower.includes("credit")) {
        answer = "TFG SecureBank is a digital fintech application featuring a 70 REST endpoint FastAPI backend routing between PostgreSQL and MySQL, an automated credit rules engine, and WeasyPrint tamper-evident loan agreements.";
        sourceIds = ["project_securebank"];
      } else if (lower.includes("avail") || lower.includes("hire") || lower.includes("consult")) {
        answer = "Meghraj is available for enterprise technical consulting and senior AI/backend engineering roles (Remote or Hybrid). His core domain covers high-concurrency APIs, ML inference pipelines, and mobile app delivery.";
        sourceIds = ["profile_availability"];
      }
    }

    messageCounterRef.current += 1;
    const operatorMsg: Message = {
      id: `operator-${messageCounterRef.current}`,
      sender: "operator",
      text: answer,
      sourceIds,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, operatorMsg]);
    setLoading(false);
    speakText(answer);
    soundFX.playCyberChime();
  };

  const handleResetChat = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="flex h-screen flex-col bg-[#06080e] font-mono text-slate-100">
      {/* Top HUD Header */}
      <header className="flex items-center justify-between border-b border-cyan-950/60 bg-[#080B10] px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-[#0c1017] px-3 py-1.5 text-xs font-bold text-cyan-300 hover:border-cyan-400 hover:text-white transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>RETURN TO PORTFOLIO</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => {
              const next = !voiceEnabled;
              setVoiceEnabled(next);
              if (!next && typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
              }
            }}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs transition-colors ${
              voiceEnabled
                ? "border-emerald-500/50 bg-emerald-950/30 text-emerald-300"
                : "border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200"
            }`}
          >
            {voiceEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{voiceEnabled ? "VOICE ON" : "VOICE OFF"}</span>
          </button>

          <button
            type="button"
            onClick={handleResetChat}
            className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/50 px-2 py-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          <Link
            href="/world"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/30 px-3 py-1 text-xs font-bold text-cyan-400 hover:border-cyan-400 hover:text-white transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>3D WORLD ◎</span>
          </Link>
        </div>
      </header>

      {/* Main Chat Stream Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4 max-w-4xl w-full mx-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 sm:gap-4 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "operator" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-950/40 text-cyan-400">
                <Bot className="h-4 w-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 sm:p-5 shadow-lg ${
                msg.sender === "user"
                  ? "border border-cyan-500/40 bg-cyan-950/30 text-cyan-100 rounded-br-none"
                  : "border border-slate-800 bg-[#0b1018] text-slate-200 rounded-bl-none hud-bracket"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2">
                <span className="font-bold text-cyan-400/80">
                  {msg.sender === "user" ? "YOU" : "THE OPERATOR"}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-mono">
                {msg.text}
              </p>

              {msg.sourceIds && msg.sourceIds.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-cyan-950/60 pt-2.5">
                  <span className="text-[9px] font-bold uppercase text-slate-500">CITATIONS:</span>
                  {msg.sourceIds.map((src) => (
                    <span
                      key={src}
                      className="rounded border border-cyan-500/30 bg-cyan-950/50 px-2 py-0.5 text-[9px] font-mono text-cyan-300"
                    >
                      [{src}]
                    </span>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === "user" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center text-xs text-cyan-400 font-mono">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>OPERATOR RETRIEVING ARCHITECTURAL CITATIONS...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Question Chips */}
      <div className="border-t border-cyan-950/60 bg-[#080B10] px-4 py-2 sm:px-6">
        <div className="mx-auto max-w-4xl flex items-center gap-2 overflow-x-auto py-1 text-xs no-scrollbar">
          <span className="text-[10px] text-slate-500 shrink-0 uppercase font-bold flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            PROMPTS:
          </span>
          {PRESET_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleSend(q)}
              className="shrink-0 rounded-lg border border-cyan-500/20 bg-[#0d131e] px-2.5 py-1 text-[11px] text-slate-300 hover:border-cyan-400 hover:text-cyan-200 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Prompt Box */}
      <div className="border-t border-cyan-950 bg-[#0a0e16] p-4 sm:p-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSend(inputQuery);
          }}
          className="mx-auto max-w-4xl flex items-center gap-2 rounded-2xl border border-cyan-500/30 bg-[#06080e] p-2 shadow-inner"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask the Operator about architecture, scale, or engineering..."
            className="flex-1 bg-transparent px-3 py-1.5 font-mono text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2 font-mono text-xs font-bold text-black transition-all hover:bg-cyan-400 disabled:opacity-40 disabled:pointer-events-none"
          >
            <span>TRANSMIT</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
