import FieldError from "./FieldError";
import {
  type ContactFieldName,
  type ContactFields,
  type ContactValidationErrors,
} from "./contactValidation";

type ContactFieldsProps = {
  formFields: ContactFields;
  fieldErrors: ContactValidationErrors;
  setFieldValue: (fieldName: ContactFieldName, fieldValue: string) => void;
  handleFieldBlur: (fieldName: ContactFieldName) => void;
  trackFormStart: () => void;
};

export default function ContactFields({
  formFields,
  fieldErrors,
  setFieldValue,
  handleFieldBlur,
  trackFormStart,
}: ContactFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <label
          className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-600"
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
          className="w-full rounded-md border border-brand-charcoal/20 bg-white px-3 py-2 text-brand-navy outline-none transition focus:border-brand-blue"
          placeholder="Your name"
          name="name"
        />
        <FieldError id="contact-name-error" message={fieldErrors.name} />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-600"
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
          className="w-full rounded-md border border-brand-charcoal/20 bg-white px-3 py-2 text-brand-navy outline-none transition focus:border-brand-blue"
          placeholder="you@company.com"
          name="email"
        />
        <FieldError id="contact-email-error" message={fieldErrors.email} />
      </div>

      <div className="lg:col-span-2 space-y-2">
        <label
          className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-600"
          htmlFor="contact-message"
        >
          What problem are we solving?
        </label>
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
          className="min-h-[140px] w-full rounded-md border border-brand-charcoal/20 bg-white px-3 py-2 text-brand-navy outline-none transition focus:border-brand-blue"
          placeholder="Describe the team, metrics, and urgency."
          name="message"
        />
        <p id="contact-message-guidance" className="text-xs text-slate-500">
          Include team context, key problem, and timeline so I can reply with a clear plan.
        </p>
        <FieldError id="contact-message-error" message={fieldErrors.message} />
      </div>
    </>
  );
}
