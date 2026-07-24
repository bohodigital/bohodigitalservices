"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";

export type CommercialFormField = {
  publicName: string;
  backendName: string;
  type: "text" | "email" | "url" | "textarea" | "select";
  label: string;
  placeholder?: string;
  hint?: string;
  requirement: string;
  required: boolean;
  maxLength: number;
  options?: ReadonlyArray<string>;
  backendOptions?: Readonly<Record<string, string>>;
};

type NoticeContent = {
  heading: string;
  body: string;
  retry?: string;
  emailLabel?: string;
  emailHref?: string;
  links?: ReadonlyArray<{ label: string; href: string }>;
};

export type CommercialFormPresentation = {
  kind: "start" | "emergency";
  heading: { title: string; body: string; requiredNote: string };
  fields: ReadonlyArray<CommercialFormField>;
  privacy: string;
  consent: { label: string; requirement: string };
  authority?: { label: string; requirement: string };
  submit: { idle: string; pending: string };
  disclosure?: { closed: string; open: string };
  validation: {
    required: string;
    maximum: string;
    email: string;
    url: string;
    consent: string;
    heading: string;
    body: string;
  };
  notices: {
    success: NoticeContent;
    failure: NoticeContent;
    rateLimit: NoticeContent;
    network: NoticeContent;
  };
  compatibilityFallback: string;
};

type TurnstileApi = {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: "light";
      appearance: "always";
      "response-field": false;
      callback(token: string): void;
      "expired-callback"(): void;
      "timeout-callback"(): void;
      "error-callback"(): void;
    },
  ): string;
  reset(widgetId?: string): void;
  remove(widgetId: string): void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type Notice = NoticeContent & { kind: "success" | "error" };
type FormValue = string | boolean;

const FORM_ENDPOINT =
  "https://boho-forms-intake.local1agent0.workers.dev/v1/submissions";
const TURNSTILE_SITEKEY = "0x4AAAAAAD2AbgQjicGIajbI";
const TURNSTILE_SCRIPT =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const REQUEST_TIMEOUT_MS = 20_000;

function trackCommercialEvent(event: string) {
  const analyticsWindow = window as unknown as {
    umami?: { track(eventName: string): void };
  };
  analyticsWindow.umami?.track(event);
}

function fieldId(formId: string, name: string) {
  return `${formId}-${name}`;
}

export function CommercialInquiryFormClient({
  presentation,
}: {
  presentation: CommercialFormPresentation;
}) {
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const formId = `commercial-${presentation.kind}-${reactId}`;
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const submissionIdRef = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isStart = presentation.kind === "start";

  useEffect(() => {
    if (presentation.kind === "start") {
      trackCommercialEvent("commercial_start_form_open");
    }
  }, [presentation.kind]);

  useEffect(() => {
    let disposed = false;
    const render = () => {
      if (disposed || !window.turnstile || !turnstileRef.current || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITEKEY,
        action: isStart ? "boho_contact" : "boho_emergency",
        theme: "light",
        appearance: "always",
        "response-field": false,
        callback(token) {
          if (!disposed) setTurnstileToken(token);
        },
        "expired-callback"() {
          if (!disposed) setTurnstileToken("");
        },
        "timeout-callback"() {
          if (!disposed) setTurnstileToken("");
        },
        "error-callback"() {
          if (!disposed) setTurnstileToken("");
        },
      });
    };
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SCRIPT}"]`);
    let script = existing;
    if (!script) {
      script = document.createElement("script");
      script.src = TURNSTILE_SCRIPT;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", render);
    render();
    const poll = window.setInterval(render, 250);
    return () => {
      disposed = true;
      window.clearInterval(poll);
      script?.removeEventListener("load", render);
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [isStart]);

  function resetTurnstile() {
    setTurnstileToken("");
    if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current);
  }

  function validate(form: HTMLFormElement) {
    const next: Record<string, string> = {};
    const data = new FormData(form);
    for (const field of presentation.fields) {
      const value = String(data.get(field.publicName) ?? "").trim();
      if (field.required && !value) next[field.publicName] = presentation.validation.required;
      else if (value.length > field.maxLength) {
        next[field.publicName] = presentation.validation.maximum.replace("{maximum}", String(field.maxLength));
      } else if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        next[field.publicName] = presentation.validation.email;
      } else if (field.type === "url" && value) {
        try {
          const url = new URL(value);
          if (!["http:", "https:"].includes(url.protocol)) throw new Error();
        } catch {
          next[field.publicName] = presentation.validation.url;
        }
      }
    }
    if (!isStart && data.get("authority") !== "yes") {
      next.authority = presentation.validation.required;
    }
    if (data.get("consent") !== "yes") {
      next.consent = presentation.validation.consent;
    }
    return next;
  }

  function payloadFields(data: FormData): Record<string, FormValue> {
    const output: Record<string, FormValue> = {};
    for (const field of presentation.fields) {
      const value = String(data.get(field.publicName) ?? "").trim();
      if (!value) continue;
      const mapped = field.backendOptions?.[value] ?? value;
      if (!isStart && field.publicName === "description") {
        const incidentType = String(data.get("incidentType") ?? "").trim();
        output.problem = `${incidentType}\n\n${mapped}`;
      } else if (!(!isStart && field.publicName === "incidentType")) {
        output[field.backendName] = mapped;
      }
    }
    if (isStart) {
      output.businessType = presentation.compatibilityFallback;
    } else {
      output.priorChange = output.priorChange || presentation.compatibilityFallback;
      output.platform = output.website || presentation.compatibilityFallback;
      output.authorizedAccess = "Yes";
    }
    return output;
  }

  function failureNotice(status?: number): Notice {
    const content = status === 429
      ? presentation.notices.rateLimit
      : presentation.notices.failure;
    return { kind: "error", ...content };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setNotice({
        kind: "error",
        heading: presentation.validation.heading,
        body: presentation.validation.body,
      });
      window.requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    if (!turnstileToken) {
      setNotice(failureNotice());
      return;
    }

    setErrors({});
    setNotice(null);
    setSubmitting(true);
    const data = new FormData(form);
    const submissionId = submissionIdRef.current ?? crypto.randomUUID();
    submissionIdRef.current = submissionId;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "cors",
        cache: "no-store",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submission_id: submissionId,
          form_id: isStart ? "contact" : "emergency",
          turnstile_action: isStart ? "boho_contact" : "boho_emergency",
          turnstile_token: turnstileToken,
          consent: data.get("consent") === "yes",
          honeypot: String(data.get("companyWebsite") ?? ""),
          fields: payloadFields(data),
        }),
        signal: controller.signal,
      });
      const payload = await response.json().catch(() => ({})) as { ok?: boolean };
      if ([200, 201, 202].includes(response.status) && payload.ok === true) {
        setNotice({ kind: "success", ...presentation.notices.success });
        trackCommercialEvent(isStart ? "commercial_standard_inquiry_success" : "commercial_emergency_inquiry_success");
        form.reset();
        submissionIdRef.current = null;
        resetTurnstile();
      } else {
        setNotice(failureNotice(response.status));
        resetTurnstile();
      }
    } catch {
      setNotice({ kind: "error", ...presentation.notices.network });
      resetTurnstile();
    } finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  const primaryFields = isStart
    ? presentation.fields.slice(0, 6)
    : presentation.fields;
  const optionalFields = isStart
    ? presentation.fields.slice(6)
    : [];

  function renderField(field: CommercialFormField) {
    const id = fieldId(formId, field.publicName);
    const error = errors[field.publicName];
    const describedBy = [
      field.hint ? `${id}-hint` : "",
      error ? `${id}-error` : "",
    ].filter(Boolean).join(" ") || undefined;
    const common = {
      id,
      name: field.publicName,
      required: field.required,
      maxLength: field.maxLength,
      placeholder: field.placeholder,
      disabled: submitting,
      "aria-invalid": error ? true as const : undefined,
      "aria-describedby": describedBy,
    };
    return (
      <div className="commercial-form__field" key={field.publicName}>
        <label htmlFor={id}>{field.label}<span className="commercial-form__requirement">{field.requirement}</span></label>
        {field.type === "textarea" ? <textarea {...common} rows={6} /> :
          field.type === "select" ? (
            <select {...common} defaultValue="">
              <option value="" disabled>{field.label}</option>
              {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          ) : <input {...common} type={field.type} autoComplete={field.publicName === "name" ? "name" : field.publicName === "email" ? "email" : field.publicName === "businessName" ? "organization" : field.publicName === "website" ? "url" : "off"} />}
        {field.hint ? <p id={`${id}-hint`}>{field.hint}</p> : null}
        {error ? <p id={`${id}-error`} role="alert">{error}</p> : null}
      </div>
    );
  }

  const consentError = errors.consent;
  const authorityError = errors.authority;
  return (
    <div className="commercial-form" id={isStart ? "project-inquiry" : "emergency-request"}>
      <header>
        <h2>{presentation.heading.title}</h2>
        <p>{presentation.heading.body}</p>
        <p>{presentation.heading.requiredNote}</p>
      </header>
      <form ref={formRef} noValidate onSubmit={handleSubmit} aria-busy={submitting}>
        <div className="commercial-form__grid">{primaryFields.map(renderField)}</div>
        {presentation.disclosure ? (
          <div className="commercial-form__disclosure">
            <button type="button" aria-expanded={detailsOpen} onClick={() => setDetailsOpen((open) => !open)}>
              {detailsOpen ? presentation.disclosure.open : presentation.disclosure.closed}
            </button>
            {detailsOpen ? <div className="commercial-form__grid">{optionalFields.map(renderField)}</div> : null}
          </div>
        ) : null}
        {presentation.authority ? (
          <div className="commercial-form__check">
            <input id={`${formId}-authority`} name="authority" type="checkbox" value="yes" aria-invalid={authorityError ? true : undefined} />
            <label htmlFor={`${formId}-authority`}>{presentation.authority.label}<span>{presentation.authority.requirement}</span></label>
            {authorityError ? <p role="alert">{authorityError}</p> : null}
          </div>
        ) : null}
        <p className="commercial-form__privacy">{presentation.privacy}</p>
        <div className="commercial-form__check">
          <input id={`${formId}-consent`} name="consent" type="checkbox" value="yes" aria-invalid={consentError ? true : undefined} />
          <label htmlFor={`${formId}-consent`}>{presentation.consent.label}<span>{presentation.consent.requirement}</span></label>
          {consentError ? <p role="alert">{consentError}</p> : null}
        </div>
        <input className="commercial-form__honeypot" aria-hidden="true" name="companyWebsite" tabIndex={-1} autoComplete="off" />
        <div ref={turnstileRef} />
        <button className="button-link button-link--primary" type="submit" disabled={submitting}>
          {submitting ? presentation.submit.pending : presentation.submit.idle}
        </button>
        {notice ? (
          <div className={`commercial-form__notice commercial-form__notice--${notice.kind}`} role={notice.kind === "error" ? "alert" : "status"} tabIndex={-1}>
            <h3>{notice.heading}</h3>
            <p>{notice.body}</p>
            <div className="commercial-form__notice-links">
              {notice.retry ? <button type="button" onClick={() => setNotice(null)}>{notice.retry}</button> : null}
              {notice.emailLabel && notice.emailHref ? <a href={notice.emailHref}>{notice.emailLabel}</a> : null}
              {notice.links?.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
}
