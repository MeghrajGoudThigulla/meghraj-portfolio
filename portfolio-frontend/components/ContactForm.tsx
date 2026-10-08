'use client';

import Link from "next/link";
import { useEffect } from "react";
import SectionHeading from "./SectionHeading";
import ContactAside from "./ContactAside";
import ContactFields from "./ContactFields";
import { useContactForm } from "./useContactForm";
import { useToast } from "./Toast";

type ContactFormProps = {
  minElapsedMs?: number;
};

export default function ContactForm({ minElapsedMs }: ContactFormProps = {}) {
  const apiBase = process.env.NEXT_PUBLIC_RENDER_API_URL;
  const {
    formFields,
    fieldErrors,
    status,
    error,
    website,
    setWebsite,
    setFieldValue,
    handleFieldBlur,
    trackFormStart,
    handleSubmit,
    isWakingServer,
  } = useContactForm({ apiBase, minElapsedMs });
  const { success: toastSuccess, error: toastError } = useToast();

  useEffect(() => {
    if (status === "success") {
      toastSuccess("Message sent successfully!");
    } else if (status === "error" && error) {
      if (error.includes("Please fix the highlighted fields")) {
        toastError("Form validation failed. Please check the highlighted fields.");
      } else if (error.includes("Please take a moment before submitting")) {
        toastError("Please take a moment before submitting.");
      } else if (error.includes("Too many requests")) {
        toastError("Too many requests, try again later.");
      } else if (error.includes("not configured yet")) {
        toastError("Contact API endpoint is not configured.");
      } else {
        toastError("Submission failed. Please try again or email directly.");
      }
    }
  }, [status, error, toastSuccess, toastError]);

  return (
    <section className="section-shell bg-brand-bg" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="WORK TOGETHER" title="Have a difficult technical problem worth exploring?" description="Tell me what you are trying to build, what is getting in the way, and what a useful outcome looks like. I prefer to understand the problem before proposing a solution." />
        <div className="grid gap-5 lg:grid-cols-[1.15fr,0.85fr] lg:gap-6">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-[#080B10]/95 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl hud-bracket">
            {/* Top ambient color glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-[80px]" />

            {/* Encrypted Channel Header */}
            <div className="flex items-center justify-between border-b border-cyan-950/70 pb-4 mb-6 font-mono text-[10px]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00F0FF]" />
                <span className="font-bold text-cyan-400 tracking-wider">{"SECURE DIRECT TRANSMISSION //"}</span>
              </div>
              <span className="text-slate-500 font-semibold hidden sm:inline">{"PORT: 443 // TLS 1.3 SECURE"}</span>
            </div>

            {/* Dynamic Security Uplink Readiness Bar */}
            {(() => {
              const isNameFilled = Boolean(formFields.name?.trim());
              const isEmailValid = Boolean(formFields.email?.trim() && /^\S+@\S+\.\S+$/.test(formFields.email.trim()));
              const isMessageFilled = Boolean(formFields.message?.trim().length >= 10);
              const uplinkProgress = (isNameFilled ? 33 : 0) + (isEmailValid ? 33 : 0) + (isMessageFilled ? 34 : 0);
              return (
                <div className="mb-6 rounded-2xl border border-cyan-500/25 bg-cyan-950/20 p-3.5 font-mono text-[11px] shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{"UPLINK READINESS //"}</span>
                      <span className={`text-[10px] font-bold ${uplinkProgress === 100 ? 'text-emerald-400' : 'text-cyan-300'}`}>
                        {uplinkProgress}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className={isNameFilled ? "text-cyan-400 font-bold" : "text-slate-500"}>[01 ID]</span>
                      <span className="text-slate-600">→</span>
                      <span className={isEmailValid ? "text-cyan-400 font-bold" : "text-slate-500"}>[02 CHN]</span>
                      <span className="text-slate-600">→</span>
                      <span className={isMessageFilled ? "text-cyan-400 font-bold" : "text-slate-500"}>[03 SPEC]</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-900 border border-cyan-500/30">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-300 shadow-[0_0_8px_#00F0FF]"
                      style={{ width: `${uplinkProgress}%` }}
                    />
                  </div>
                </div>
              );
            })()}

            {/* Direct Consultation Quick-Fill Presets */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span className="uppercase tracking-wider font-bold text-cyan-400">{"QUICK DIRECTIVE INTAKE // "}</span>
                <span className="hidden sm:inline text-slate-400">Prefill architecture template:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  {
                    label: "⚡ OCR & AI",
                    desc: "PyTesseract & Vectors",
                    prompt: "Looking to architect an OCR extraction and dense vector embedding pipeline with resilient worker queues and low latency.",
                  },
                  {
                    label: "🏛️ Dual-DB Core",
                    desc: "Postgres + MySQL Routing",
                    prompt: "Looking to design a high-throughput backend with PostgreSQL/MySQL routing, dedupe CTE workers, and automated migrations.",
                  },
                  {
                    label: "📱 Flutter Suite",
                    desc: "Mobile App Production",
                    prompt: "Looking to build or scale production Flutter mobile apps with secure keystore authentication and App Store/Play Store rollout.",
                  },
                  {
                    label: "🛡️ Advisory R&D",
                    desc: "Architecture & Scale",
                    prompt: "Looking for senior technical review of our system architecture, performance bottlenecks, and production rollout strategy.",
                  },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      trackFormStart();
                      setFieldValue("message", preset.prompt);
                    }}
                    className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-2.5 text-left font-mono text-[10px] text-slate-300 transition-all hover:border-cyan-400 hover:bg-cyan-900/40 hover:text-white hover:shadow-[0_0_12px_rgba(0,240,255,0.2)] focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    <span className="block font-bold text-cyan-400 truncate">{preset.label}</span>
                    <span className="block text-[9px] text-slate-400 truncate mt-0.5">{preset.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {!apiBase ? (
              <div className="mb-5 rounded-xl border border-dashed border-amber-600/40 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
                Contact submissions are not configured yet. Set <code className="font-mono text-xs">NEXT_PUBLIC_RENDER_API_URL</code> before publishing the live form.
              </div>
            ) : null}
            <form className="grid gap-5 lg:grid-cols-2" noValidate onSubmit={handleSubmit}>
              <ContactFields
                formFields={formFields}
                fieldErrors={fieldErrors}
                website={website}
                setWebsite={setWebsite}
                setFieldValue={setFieldValue}
                handleFieldBlur={handleFieldBlur}
                trackFormStart={trackFormStart}
              />
              <div className="flex flex-col gap-3 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-1">
                  <p id="contact-response-sla" className="text-xs leading-5 text-slate-600 dark:text-slate-400">I review messages with the technical context in mind and reply with a practical next step.</p>
                  <p className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>SSL Secure transmission directly to private API endpoint. No trackers.</span>
                  </p>
                </div>
                <div className="w-full lg:w-auto">
                  <button 
                    type="submit" 
                    disabled={status === "sending"} 
                    className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70 lg:w-auto inline-flex items-center justify-center gap-2" 
                    aria-describedby="contact-response-sla"
                  >
                    {status === "sending" && (
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    )}
                    {status === "sending" ? (isWakingServer ? "Waking server..." : "Sending...") : "Start the conversation"}
                  </button>
                  {isWakingServer && status === "sending" && (
                    <p className="text-xs text-brand-muted mt-2 text-center lg:text-left" aria-live="polite">
                      Backend instance is waking up (~30s)...
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm lg:col-span-2">
                <a href="mailto:meghraj.thigulla@outlook.com" className="font-semibold text-brand-blue underline-offset-4 hover:text-brand-accent hover:underline">Email directly</a>
                <Link href="/#projects" className="font-semibold text-brand-blue underline-offset-4 hover:text-brand-accent hover:underline">Review selected work</Link>
              </div>
              {status === "success" ? (
                <div role="status" aria-live="polite" className="lg:col-span-2 rounded-xl border border-green-500/40 bg-green-50 px-4 py-3 text-sm leading-6 text-green-800">Message received. I&apos;ll review the context and get back to you with a practical next step.</div>
              ) : null}
              {status === "error" && error ? (
                <div role="alert" className="lg:col-span-2 rounded-xl border border-amber-600/40 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">{error}</div>
              ) : null}
            </form>
          </div>
          <ContactAside />
        </div>
      </div>
    </section>
  );
}
