export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type ContactFieldName = keyof ContactFields;

export type ContactValidationErrors = Partial<Record<ContactFieldName, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateContactField = (
  fieldName: ContactFieldName,
  fieldValue: string,
): string | null => {
  const value = fieldValue.trim();

  if (fieldName === "name") {
    if (!value) return "Name is required.";
    if (value.length > 120) return "Name must be 120 characters or fewer.";
    return null;
  }

  if (fieldName === "email") {
    if (!value) return "Email is required.";
    if (!EMAIL_REGEX.test(value)) return "Enter a valid email address.";
    if (value.length > 254) return "Email must be 254 characters or fewer.";
    return null;
  }

  if (!value) return "Message is required.";
  if (value.length > 5000) return "Message must be 5000 characters or fewer.";
  return null;
};

export const validateContactFields = (
  fields: ContactFields,
): ContactValidationErrors => {
  const errors: ContactValidationErrors = {};
  (Object.keys(fields) as ContactFieldName[]).forEach((fieldName) => {
    const error = validateContactField(fieldName, fields[fieldName]);
    if (error) errors[fieldName] = error;
  });
  return errors;
};

export const hasContactValidationErrors = (
  errors: ContactValidationErrors,
) => Object.keys(errors).length > 0;
