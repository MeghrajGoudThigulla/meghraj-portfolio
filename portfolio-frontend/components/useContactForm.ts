'use client';

import { useRef, useState } from "react";
import { trackMetric } from "@/lib/metrics";
import {
  hasContactValidationErrors,
  type ContactFieldName,
  type ContactFields,
  type ContactValidationErrors,
  validateContactField,
  validateContactFields,
} from "./contactValidation";

export type ContactFormStatus = "idle" | "sending" | "success" | "error";

type UseContactFormOptions = {
  apiBase?: string;
};

export const useContactForm = ({ apiBase }: UseContactFormOptions) => {
  const [formFields, setFormFields] = useState<ContactFields>({
    name: "",
    email: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<ContactValidationErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const formStartTrackedRef = useRef(false);

  const setFieldValue = (fieldName: ContactFieldName, fieldValue: string) => {
    setFormFields((current) => ({ ...current, [fieldName]: fieldValue }));
    if (!fieldErrors[fieldName]) return;

    const nextError = validateContactField(fieldName, fieldValue);
    setFieldErrors((current) => {
      const updated = { ...current };
      if (nextError) {
        updated[fieldName] = nextError;
      } else {
        delete updated[fieldName];
      }
      return updated;
    });
  };

  const handleFieldBlur = (fieldName: ContactFieldName) => {
    const nextError = validateContactField(fieldName, formFields[fieldName]);
    setFieldErrors((current) => {
      const updated = { ...current };
      if (nextError) {
        updated[fieldName] = nextError;
      } else {
        delete updated[fieldName];
      }
      return updated;
    });
  };

  const trackFormStart = () => {
    if (formStartTrackedRef.current) return;

    formStartTrackedRef.current = true;
    trackMetric({
      eventName: "contact_form_start",
      meta: { source: "contact_form" },
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError(null);
    const startedAt = performance.now();

    trackMetric({
      eventName: "contact_submit_attempt",
      meta: { segment: "Consulting" },
    });

    const validationErrors = validateContactFields(formFields);
    if (hasContactValidationErrors(validationErrors)) {
      setStatus("error");
      setFieldErrors(validationErrors);
      setError("Please fix the highlighted fields and submit again.");
      trackMetric({
        eventName: "contact_submit_error",
        success: false,
        durationMs: performance.now() - startedAt,
        meta: { reason: "validation_failed" },
      });
      return;
    }

    if (!apiBase) {
      setStatus("error");
      setError("Contact endpoint not configured yet. Add NEXT_PUBLIC_RENDER_API_URL.");
      trackMetric({
        eventName: "contact_submit_error",
        success: false,
        durationMs: performance.now() - startedAt,
        meta: { reason: "missing_api_base" },
      });
      return;
    }

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formFields.name.trim(),
          email: formFields.email.trim(),
          message: formFields.message.trim(),
          segment: "Consulting",
        }),
      });

      if (!response.ok) {
        trackMetric({
          eventName: "contact_submit_error",
          success: false,
          durationMs: performance.now() - startedAt,
          meta: { statusCode: response.status },
        });
        throw new Error("Bad response");
      }

      setStatus("success");
      setFormFields({ name: "", email: "", message: "" });
      setFieldErrors({});
      trackMetric({
        eventName: "contact_submit_success",
        success: true,
        durationMs: performance.now() - startedAt,
        meta: { segment: "Consulting" },
      });
    } catch (submitError) {
      console.error(submitError);
      setStatus("error");
      setError("Unable to send right now. Please try again or email directly.");
      trackMetric({
        eventName: "contact_submit_error",
        success: false,
        durationMs: performance.now() - startedAt,
        meta: { reason: "request_failed" },
      });
    }
  };

  return {
    formFields,
    fieldErrors,
    status,
    error,
    setFieldValue,
    handleFieldBlur,
    trackFormStart,
    handleSubmit,
  };
};
