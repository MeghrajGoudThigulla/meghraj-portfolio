import { describe, expect, it } from "vitest";
import {
  hasContactValidationErrors,
  validateContactField,
  validateContactFields,
} from "../contactValidation";

describe("contactValidation", () => {
  it("validates required fields and email format", () => {
    expect(validateContactField("name", "")).toBe("Name is required.");
    expect(validateContactField("email", "invalid-email")).toBe("Enter a valid email address.");
    expect(validateContactField("message", "")).toBe("Message is required.");
  });

  it("returns no errors for valid payload", () => {
    const errors = validateContactFields({
      name: "Meghraj",
      email: "meghraj@example.com",
      message: "Need help improving API reliability and delivery timelines.",
    });

    expect(hasContactValidationErrors(errors)).toBe(false);
    expect(errors).toEqual({});
  });
});
