'use client';

import Link from "next/link";
import { useEffect } from "react";
import SectionHeading from "./SectionHeading";
import ContactAside from "./ContactAside";
import ContactFields from "./ContactFields";
import { useContactForm } from "./useContactForm";
import { useToast } from "./Toast";

export default function ContactForm() {
  const apiBase = process.env.NEXT_PUBLIC_RENDER_API_URL;
  const { formFields, fieldErrors, status, error, setFieldValue, handleFieldBlur, trackFormStart, handleSubmit } = useContactForm({ apiBase });
  const { success: toastSuccess, error: toastError } = useToast();

  useEffect(() => {
    if (status === "success") {
      toastSuccess("Message sent successfully!");
    } else if (status === "error" && error) {
      if (error.includes("Please fix the highlighted fields")) {
        toastError("Form validation failed. Please check the highlighted fields.");
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
          <div className="card p-5 sm:p-7 lg:p-8">
            {!apiBase ? (
              <div className="mb-5 rounded-xl border border-dashed border-amber-600/40 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
                Contact submissions are not configured yet. Set <code className="font-mono text-xs">NEXT_PUBLIC_RENDER_API_URL</code> before publishing the live form.
              </div>
            ) : null}
            <form className="grid gap-5 lg:grid-cols-2" noValidate onSubmit={handleSubmit}>
              <ContactFields formFields={formFields} fieldErrors={fieldErrors} setFieldValue={setFieldValue} handleFieldBlur={handleFieldBlur} trackFormStart={trackFormStart} />
              <div className="flex flex-col gap-3 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-1">
                  <p id="contact-response-sla" className="text-xs leading-5 text-slate-500">I review messages with the technical context in mind and reply with a practical next step.</p>
                  <p className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>SSL Secure transmission directly to private API endpoint. No trackers.</span>
                  </p>
                </div>
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
                  {status === "sending" ? "Sending..." : "Start the conversation"}
                </button>
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
