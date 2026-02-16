'use client';

import { useState } from "react";
import SectionHeading from "./SectionHeading";

type Status = "idle" | "sending" | "success" | "error";

const apiBase = process.env.NEXT_PUBLIC_RENDER_API_URL;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    if (!apiBase) {
      setStatus("error");
      setError("Contact endpoint not configured yet. Add NEXT_PUBLIC_RENDER_API_URL.");
      return;
    }

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          segment: "Consulting",
        }),
      });

      if (!response.ok) {
        throw new Error("Bad response");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Unable to send right now. Please try again or email directly.");
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-brand-bg py-20 sm:py-24 lg:py-28"
      id="contact"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-36 top-10 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl"
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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

          <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr] lg:gap-8">
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                  What helps me respond fast
                </p>
                <h3 className="mt-2 text-xl font-semibold text-brand-navy">
                  Share the key inputs and I will reply with a clear next step.
                </h3>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-brand-charcoal">
                  I typically respond within one business day with a short plan,
                  scope questions, and timelines.
                </p>
              </div>
              <ul className="space-y-3 text-sm text-brand-charcoal">
                {[
                  "Team size and stakeholders involved.",
                  "Target metric (cost, latency, adoption, compliance).",
                  "Current stack or infrastructure constraints.",
                  "Timeline or launch milestone.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Response time", value: "Within 1 business day" },
                  { label: "Focus areas", value: "MVPs, performance, data flows" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-brand-charcoal/10 bg-brand-bg px-4 py-3"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-brand-navy">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <form className="grid gap-5 lg:grid-cols-2" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-600">
                  Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-brand-charcoal/20 bg-white px-3 py-2 text-brand-navy outline-none transition focus:border-brand-blue"
                  placeholder="Your name"
                  name="name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-600">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-brand-charcoal/20 bg-white px-3 py-2 text-brand-navy outline-none transition focus:border-brand-blue"
                  placeholder="you@company.com"
                  name="email"
                />
              </div>
              <div className="lg:col-span-2 space-y-2">
                <label className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-600">
                  What problem are we solving?
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[140px] w-full rounded-md border border-brand-charcoal/20 bg-white px-3 py-2 text-brand-navy outline-none transition focus:border-brand-blue"
                  placeholder="Describe the team, metrics, and urgency."
                  name="message"
                />
              </div>

              <div className="flex flex-col gap-3 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between">
                <p className="max-w-prose text-sm text-brand-charcoal">
                  Prefer email? Reach me at{" "}
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

              {status === "success" ? (
                <div className="lg:col-span-2 rounded border border-green-500/50 bg-green-50 px-3 py-2 text-sm text-green-800">
                  Message received. I will reply within one business day.
                </div>
              ) : null}
              {status === "error" && error ? (
                <div className="lg:col-span-2 rounded border border-amber-600/50 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                  {error}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
