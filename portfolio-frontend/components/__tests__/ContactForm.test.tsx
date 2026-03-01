import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ContactForm from "../ContactForm";

const trackMetricMock = vi.fn();

vi.mock("@/lib/metrics", () => ({
  trackMetric: (payload: unknown) => trackMetricMock(payload),
}));

const API_BASE = "https://api.example.com";

type ContactValues = {
  name: string;
  email: string;
  message: string;
};

const fillContactForm = async (user: ReturnType<typeof userEvent.setup>, values: ContactValues) => {
  await user.type(screen.getByLabelText("Name"), values.name);
  await user.type(screen.getByLabelText("Email"), values.email);
  await user.type(screen.getByLabelText("What problem are we solving?"), values.message);
};

describe("ContactForm", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_RENDER_API_URL = API_BASE;
    trackMetricMock.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    delete process.env.NEXT_PUBLIC_RENDER_API_URL;
  });

  it("shows inline validation messages and does not submit invalid input", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Send Proposal" }));

    expect(await screen.findByText("Please fix the highlighted fields and submit again.")).toBeInTheDocument();
    expect(screen.getByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByText("Message is required.")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("validates email format on blur", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Email"), "invalid-email");
    await user.tab();

    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
  });

  it("submits to the configured endpoint and shows success feedback", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 } as Response);
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm />);

    await fillContactForm(user, {
      name: " Meghraj ",
      email: " meghraj@example.com ",
      message: " Need help with API performance and rollout reliability. ",
    });
    await user.click(screen.getByRole("button", { name: "Send Proposal" }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(requestUrl).toBe("https://api.example.com/api/contact");
    expect(requestInit).toEqual(
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );

    const body = JSON.parse(String(requestInit.body));
    expect(body).toEqual({
      name: "Meghraj",
      email: "meghraj@example.com",
      message: "Need help with API performance and rollout reliability.",
      segment: "Consulting",
    });

    expect(
      await screen.findByText(
        "Message received. I will reply within one business day with next-step options.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows request failure feedback when backend returns a non-2xx response", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 } as Response);
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm />);

    await fillContactForm(user, {
      name: "Meghraj",
      email: "meghraj@example.com",
      message: "Need support with a project.",
    });
    await user.click(screen.getByRole("button", { name: "Send Proposal" }));

    expect(
      await screen.findByText("Unable to send right now. Please try again or email directly."),
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
