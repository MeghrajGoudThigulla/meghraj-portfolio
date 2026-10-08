import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ContactForm from "../ContactForm";
import { ToastProvider } from "../Toast";

const trackMetricMock = vi.fn();
vi.mock("@/lib/metrics", () => ({ trackMetric: (payload: unknown) => trackMetricMock(payload) }));

const API_BASE = "https://api.example.com";
type ContactValues = { name: string; email: string; message: string };

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

  it("shows validation errors via role=alert and aria-invalid on invalid submission", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    render(
      <ToastProvider>
        <ContactForm />
      </ToastProvider>
    );

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("What problem are we solving?");

    expect(nameInput).toHaveAttribute("aria-invalid", "false");
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
    expect(messageInput).toHaveAttribute("aria-invalid", "false");

    await user.click(screen.getByRole("button", { name: /start the conversation/i }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts.length).toBeGreaterThan(0);

    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(messageInput).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("validates email format on blur setting aria-invalid", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ContactForm />
      </ToastProvider>
    );

    const emailInput = screen.getByLabelText("Email");
    await user.type(emailInput, "not-an-email");
    await user.tab();

    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("submits exact payload contract on 200 and renders success status", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 } as Response);
    vi.stubGlobal("fetch", fetchMock);

    render(
      <ToastProvider>
        <ContactForm />
      </ToastProvider>
    );

    await fillContactForm(user, {
      name: " Meghraj ",
      email: " meghraj@example.com ",
      message: " Need help with API performance and rollout reliability. ",
    });

    const submitButton = screen.getByRole("button", { name: /start the conversation/i });
    await user.click(submitButton);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(requestUrl).toBe(`${API_BASE}/api/contact`);
    expect(requestInit.method).toBe("POST");

    const body = JSON.parse(String(requestInit.body));
    expect(body).toEqual({
      name: "Meghraj",
      email: "meghraj@example.com",
      message: "Need help with API performance and rollout reliability.",
      segment: "Consulting",
      website: "",
      elapsedMs: expect.any(Number),
    });

    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("renders off-screen honeypot input with aria-hidden and tabIndex -1", () => {
    render(
      <ToastProvider>
        <ContactForm />
      </ToastProvider>
    );

    const honeypot = screen.getByLabelText("Website");
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute("name", "website");
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot).toHaveAttribute("autocomplete", "off");
    const container = honeypot.closest("div");
    expect(container).toHaveAttribute("aria-hidden", "true");
  });

  it("disables button while request is pending", async () => {
    const user = userEvent.setup();
    let resolvePromise: (value: Response) => void;
    const pendingPromise = new Promise<Response>((resolve) => {
      resolvePromise = resolve;
    });
    const fetchMock = vi.fn().mockReturnValue(pendingPromise);
    vi.stubGlobal("fetch", fetchMock);

    render(
      <ToastProvider>
        <ContactForm />
      </ToastProvider>
    );

    await fillContactForm(user, {
      name: "Meghraj",
      email: "meghraj@example.com",
      message: "Infrastructure review inquiry.",
    });

    const submitButton = screen.getByRole("button", { name: /start the conversation/i });
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();

    resolvePromise!({ ok: true, status: 200 } as Response);
    await waitFor(() => expect(submitButton).not.toBeDisabled());
  });

  it("handles 400 bad request response showing alert role", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 400 } as Response);
    vi.stubGlobal("fetch", fetchMock);

    render(
      <ToastProvider>
        <ContactForm />
      </ToastProvider>
    );

    await fillContactForm(user, {
      name: "Meghraj",
      email: "meghraj@example.com",
      message: "Short request.",
    });

    await user.click(screen.getByRole("button", { name: /start the conversation/i }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts.length).toBeGreaterThan(0);
  });

  it("handles 429 rate limit response showing alert role", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 429 } as Response);
    vi.stubGlobal("fetch", fetchMock);

    render(
      <ToastProvider>
        <ContactForm />
      </ToastProvider>
    );

    await fillContactForm(user, {
      name: "Meghraj",
      email: "meghraj@example.com",
      message: "High frequency message.",
    });

    await user.click(screen.getByRole("button", { name: /start the conversation/i }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts.length).toBeGreaterThan(0);
  });

  it("handles 500 server error response showing alert role", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 } as Response);
    vi.stubGlobal("fetch", fetchMock);

    render(
      <ToastProvider>
        <ContactForm />
      </ToastProvider>
    );

    await fillContactForm(user, {
      name: "Meghraj",
      email: "meghraj@example.com",
      message: "Server test message.",
    });

    await user.click(screen.getByRole("button", { name: /start the conversation/i }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts.length).toBeGreaterThan(0);
  });

  it("handles network error rejection showing alert role", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
    vi.stubGlobal("fetch", fetchMock);

    render(
      <ToastProvider>
        <ContactForm />
      </ToastProvider>
    );

    await fillContactForm(user, {
      name: "Meghraj",
      email: "meghraj@example.com",
      message: "Offline test message.",
    });

    await user.click(screen.getByRole("button", { name: /start the conversation/i }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts.length).toBeGreaterThan(0);
  });
});
