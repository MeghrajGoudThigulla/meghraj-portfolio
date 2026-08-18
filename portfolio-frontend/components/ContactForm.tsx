'use client';

import Link from "next/link";
import SectionHeading from "./SectionHeading";
import ContactAside from "./ContactAside";
import ContactFields from "./ContactFields";
import { useContactForm } from "./useContactForm";

export default function ContactForm() {
  const apiBase = process.env.NEXT_PUBLIC_RENDER_API_URL;
  const { formFields, fieldErrors, status, error, setFieldValue, handleFieldBlur, trackFormStart, handleSubmit } = useContactForm({ apiBase });

  return (
    <section className="section-shell bg-brand-bg" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="WORK TOGETHER"
          title="Have a difficult technical problem worth exploring?"
          description="Tell me what you are trying to build, what is getting in the way, and what a useful outcome looks like. I prefer to understand the problem before proposing a solution."
        />

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
                <p id="contact-response-sla" className="text-xs leading-5 text-slate-500">
                  I review messages with the technical context in mind and reply with a practical next step.
                </p>
                <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70 lg:w-auto" aria-describedby="contact-response-sla">
                  {status === "sending" ? "Sending..." : "Start the conversation"}
                </button>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm lg:col-span-2">
                <a href="mailto:meghraj.thigulla@outlook.com" className="font-semibold text-brand-blue underline-offset-4 hover:text-brand-accent hover:underline">Email directly</a>
                <Link href="/#projects" className="font-semibold text-brand-blue underline-offset-4 hover:text-brand-accent hover:underline">Review selected work</Link>
              </div>

              {status === "success" ? (
                <div role="status" aria-live="polite" className="lg:col-span-2 rounded-xl border border-green-500/40 bg-green-50 px-4 py-3 text-sm leading-6 text-green-800">
                  Message received. I&apos;ll review the context and get back to you with a practical next step.
                </div>
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
