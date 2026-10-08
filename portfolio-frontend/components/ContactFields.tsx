import FieldError from "./FieldError";
import {
  type ContactFieldName,
  type ContactFields,
  type ContactValidationErrors,
} from "./contactValidation";

type ContactFieldsProps = {
  formFields: ContactFields;
  fieldErrors: ContactValidationErrors;
  website?: string;
  setWebsite?: (value: string) => void;
  setFieldValue: (fieldName: ContactFieldName, fieldValue: string) => void;
  handleFieldBlur: (fieldName: ContactFieldName) => void;
  trackFormStart: () => void;
};

export default function ContactFields({
  formFields,
  fieldErrors,
  website = "",
  setWebsite,
  setFieldValue,
  handleFieldBlur,
  trackFormStart,
}: ContactFieldsProps) {
  return (
    <>
      {/* Honeypot field (hidden from real users, attractive to bots) */}
      <div
        className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite?.(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-cyan-400"
          htmlFor="contact-name"
        >
          Name
        </label>
        <input
          required
          id="contact-name"
          value={formFields.name}
          onChange={(event) => setFieldValue("name", event.target.value)}
          onBlur={() => handleFieldBlur("name")}
          onFocus={trackFormStart}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          className="w-full rounded-xl border border-cyan-500/30 bg-[#080B10] px-4 py-3 text-slate-100 font-mono text-sm outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/60 focus:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          placeholder="Client Identity"
          name="name"
        />
        <FieldError id="contact-name-error" message={fieldErrors.name} />
      </div>

      <div className="space-y-2">
        <label
          className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-cyan-400"
          htmlFor="contact-email"
        >
          Email
        </label>
        <input
          required
          type="email"
          id="contact-email"
          value={formFields.email}
          onChange={(event) => setFieldValue("email", event.target.value)}
          onBlur={() => handleFieldBlur("email")}
          onFocus={trackFormStart}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          className="w-full rounded-xl border border-cyan-500/30 bg-[#080B10] px-4 py-3 text-slate-100 font-mono text-sm outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/60 focus:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          placeholder="vector@organization.com"
          name="email"
        />
        <FieldError id="contact-email-error" message={fieldErrors.email} />
      </div>

      <div className="lg:col-span-2 space-y-2">
        <div className="flex items-center justify-between">
          <label
            className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-cyan-400"
            htmlFor="contact-message"
          >
            What problem are we solving?
          </label>
          <span className="font-mono text-[10px] text-slate-500">
            {formFields.message.length} chars
          </span>
        </div>
        <textarea
          required
          id="contact-message"
          value={formFields.message}
          onChange={(event) => setFieldValue("message", event.target.value)}
          onBlur={() => handleFieldBlur("message")}
          onFocus={trackFormStart}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={
            fieldErrors.message
              ? "contact-message-error contact-message-guidance"
              : "contact-message-guidance"
          }
          className="min-h-[140px] w-full rounded-xl border border-cyan-500/30 bg-[#080B10] px-4 py-3 text-slate-100 font-mono text-sm outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/60 focus:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          placeholder="System context, architecture bottleneck, throughput target, and timeline constraints."
          name="message"
        />
        <p id="contact-message-guidance" className="text-xs text-slate-600 dark:text-slate-400">
          Include team context, key problem, and timeline so I can reply with a clear plan.
        </p>
        <FieldError id="contact-message-error" message={fieldErrors.message} />
      </div>
    </>
  );
}
