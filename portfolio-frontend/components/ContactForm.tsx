'use client';

import SectionHeading from "./SectionHeading";
import ContactAside from "./ContactAside";
import ContactFields from "./ContactFields";
import { useContactForm } from "./useContactForm";

export default function ContactForm() {
  const apiBase = process.env.NEXT_PUBLIC_RENDER_API_URL;
  const {
    formFields,
    fieldErrors,
    status,
    error,
    setFieldValue,
    handleFieldBlur,
    trackFormStart,
    handleSubmit,
  } = useContactForm({ apiBase });

  return (
    <section
      className="relative overflow-hidden bg-brand-bg py-20 sm:py-24 lg:py-28"
      id="contact"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-36 top-10 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Ready for a pilot or discovery call?"
          description="Tell me about the team, target metrics, and constraints. I respond within one business day."
        />

        <div className="card fade-up p-5 lg:p-6">
          {!apiBase ? (
            <div className="mb-4 rounded border border-dashed border-amber-600/40 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              API URL is set to placeholder. Configure{" "}
              <code className="font-mono">NEXT_PUBLIC_RENDER_API_URL</code> for
              live submissions.
            </div>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr] lg:gap-8">
            <div className="rounded-xl border border-brand-charcoal/10 bg-white px-4 py-5">
              <form
                className="grid gap-5 lg:grid-cols-2"
                noValidate
                onSubmit={handleSubmit}
              >
                <ContactFields
                  formFields={formFields}
                  fieldErrors={fieldErrors}
                  setFieldValue={setFieldValue}
                  handleFieldBlur={handleFieldBlur}
                  trackFormStart={trackFormStart}
                />

                <div className="flex flex-col gap-3 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between">
                  <p className="max-w-prose text-sm text-brand-charcoal">
                    Prefer a faster async route? Reach me at{" "}
                    <a
                      href="mailto:meghraj.thigulla@outlook.com"
                      className="font-semibold text-brand-blue hover:text-brand-navy hover:underline underline-offset-4"
                    >
                      meghraj.thigulla@outlook.com
                    </a>
                    .
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70 lg:w-auto"
                  >
                    {status === "sending" ? "Sending..." : "Send Proposal"}
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 text-sm lg:col-span-2">
                  <a
                    href="mailto:meghraj.thigulla@outlook.com?subject=Discovery%20Call%20Request"
                    className="font-semibold text-brand-blue transition hover:text-brand-navy hover:underline underline-offset-4"
                  >
                    Book discovery call
                  </a>
                  <a
                    href="mailto:meghraj.thigulla@outlook.com"
                    className="font-semibold text-brand-blue transition hover:text-brand-navy hover:underline underline-offset-4"
                  >
                    Email directly
                  </a>
                </div>

                {status === "success" ? (
                  <div className="lg:col-span-2 rounded border border-green-500/50 bg-green-50 px-3 py-2 text-sm text-green-800">
                    Message received. I will reply within one business day with next-step options.
                  </div>
                ) : null}
                {status === "error" && error ? (
                  <div className="lg:col-span-2 rounded border border-amber-600/50 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                    {error}
                  </div>
                ) : null}
              </form>
            </div>

            <ContactAside />
          </div>
        </div>
      </div>
    </section>
  );
}
