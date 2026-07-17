"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";

import { FORM_CONTRACTS } from "../content/formContract";
import type { DraftField, DraftFormConfig } from "../content/types";
import { DefinedText } from "./DefinedText";
import { FormField, FormStatusMessage } from "./SiteChrome";

type DraftFormProps = {
  config: DraftFormConfig;
  className?: string;
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

type ApiResponse = {
  ok?: boolean;
  submission_id?: string;
  notification?: string;
  error?: string | { code?: string; field?: string };
};

type Notice = {
  status: "success" | "error" | "info";
  title: string;
  message: string;
  reference?: string;
};

const FORM_ENDPOINT =
  "https://boho-forms-intake.local1agent0.workers.dev/v1/submissions";
const TURNSTILE_SITEKEY = "0x4AAAAAAD2AbgQjicGIajbI";
const TURNSTILE_SCRIPT =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const REQUEST_TIMEOUT_MS = 20_000;
const CONTACT_EMAIL_FALLBACK_HTML =
  'Prefer email? <!--email_off--><a href="mailto:contact@bohemiandigital.org">contact@bohemiandigital.org</a><!--/email_off-->.';

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function fieldId(formId: string, field: DraftField, index: number) {
  const safeName = field.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${formId}-${safeName || `field-${index + 1}`}`;
}

function autoCompleteFor(field: DraftField) {
  switch (field.name) {
    case "name":
      return "name";
    case "email":
      return "email";
    case "businessName":
      return "organization";
    case "website":
      return "url";
    default:
      return "off";
  }
}

function RequiredMark() {
  return (
    <>
      <span className="form-field__required-mark" aria-hidden="true">
        *
      </span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

function apiError(response: ApiResponse, status: number) {
  const error = response.error;
  const code = typeof error === "string" ? error : error?.code;

  if (status === 400 && code === "verification_failed") {
    return "Verification was not accepted. Complete the security check again and retry.";
  }
  if (status === 400) {
    return "Please check the highlighted information and try again.";
  }
  if (status === 403) {
    return "This form is unavailable from the current website address. Email contact@bohemiandigital.org instead.";
  }
  if (status === 413) {
    return "The request is too large. Shorten the longer answers and try again.";
  }
  if (status === 429) {
    return "Too many requests arrived at once. Wait a minute, then retry this same submission.";
  }
  if (status === 503) {
    return "The security check is temporarily unavailable. Wait a moment and retry.";
  }
  return "The form could not be submitted. Retry once, or email contact@bohemiandigital.org.";
}

export function DraftForm({ config, className }: DraftFormProps) {
  const reactId = useId();
  const formId = `boho-form-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const privacyId = `${formId}-privacy`;
  const statusId = `${formId}-status`;
  const consentId = `${formId}-consent`;
  const honeypotId = `${formId}-company-website`;
  const contract = FORM_CONTRACTS[config.formId];
  const fieldRules = contract.fields as Record<
    string,
    { type: string; required: boolean; maxLength: number }
  >;
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const submissionIdRef = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileState, setTurnstileState] = useState<
    "loading" | "ready" | "error"
  >("loading");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const glossaryTerms = new Set<string>();

  useEffect(() => {
    let disposed = false;
    const renderWidget = () => {
      if (
        disposed
        || !window.turnstile
        || !turnstileRef.current
        || widgetIdRef.current
      ) {
        return;
      }
      try {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITEKEY,
          action: contract.action,
          theme: "light",
          appearance: "always",
          "response-field": false,
          callback(token) {
            if (disposed) return;
            setTurnstileToken(token);
            setTurnstileState("ready");
            setNotice((current) =>
              current?.title === "Complete the security check" ? null : current,
            );
          },
          "expired-callback"() {
            if (disposed) return;
            setTurnstileToken("");
            setTurnstileState("loading");
            setNotice({
              status: "error",
              title: "Security check expired",
              message: "Complete the security check again before submitting.",
            });
          },
          "timeout-callback"() {
            if (disposed) return;
            setTurnstileToken("");
            setTurnstileState("loading");
          },
          "error-callback"() {
            if (disposed) return;
            setTurnstileToken("");
            setTurnstileState("error");
            setNotice({
              status: "error",
              title: "Security check unavailable",
              message:
                "Reload the page and try again, or email contact@bohemiandigital.org.",
            });
          },
        });
      } catch {
        setTurnstileState("error");
      }
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      "script[data-boho-turnstile]",
    );
    let script = existingScript;
    if (!script) {
      script = document.createElement("script");
      script.src = TURNSTILE_SCRIPT;
      script.async = true;
      script.defer = true;
      script.dataset.bohoTurnstile = "true";
      document.head.appendChild(script);
    }
    script.addEventListener("load", renderWidget);
    if (window.turnstile) renderWidget();

    return () => {
      disposed = true;
      script?.removeEventListener("load", renderWidget);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [contract.action]);

  function resetTurnstile() {
    setTurnstileToken("");
    setTurnstileState("loading");
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setFieldErrors({});
    setNotice(null);

    if (!turnstileToken) {
      setNotice({
        status: "error",
        title: "Complete the security check",
        message: "Use the verification control, then submit the form again.",
      });
      turnstileRef.current?.focus();
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const fields: Record<string, string | boolean> = {};
    for (const field of config.fields) {
      if (field.type === "checkbox") {
        fields[field.name] = data.get(field.name) === "yes";
        continue;
      }
      const value = data.get(field.name);
      if (typeof value === "string" && value.trim()) {
        fields[field.name] = value.trim();
      }
    }
    const submissionId = submissionIdRef.current ?? crypto.randomUUID();
    submissionIdRef.current = submissionId;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    setSubmitting(true);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "cors",
        cache: "no-store",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submission_id: submissionId,
          form_id: config.formId,
          turnstile_action: contract.action,
          turnstile_token: turnstileToken,
          consent: data.get("consent") === "yes",
          honeypot: String(data.get("companyWebsite") ?? ""),
          fields,
        }),
        signal: controller.signal,
      });
      const payload = (await response.json().catch(() => ({}))) as ApiResponse;
      if ([200, 201, 202].includes(response.status) && payload.ok === true) {
        const reference = payload.submission_id ?? submissionId;
        setNotice({
          status: "success",
          title: "Request received",
          message:
            "Thanks. Boho will review the information and respond when appropriate. Sending a request does not create a client relationship or guarantee availability.",
          reference,
        });
        form.reset();
        submissionIdRef.current = null;
        resetTurnstile();
        return;
      }

      const error = payload.error;
      const field = typeof error === "object" ? error?.field : undefined;
      if (field && fieldRules[field]) {
        setFieldErrors({ [field]: "Check this field and try again." });
        window.requestAnimationFrame(() => {
          const control = form.elements.namedItem(field);
          if (control instanceof HTMLElement) control.focus();
        });
      }
      setNotice({
        status: "error",
        title: response.status === 400 ? "Check the request" : "Request not sent",
        message: apiError(payload, response.status),
        reference: submissionId,
      });
      resetTurnstile();
    } catch (error) {
      setNotice({
        status: "error",
        title: "Request not sent",
        message:
          error instanceof DOMException && error.name === "AbortError"
            ? "The request timed out. Retry this same submission, or email contact@bohemiandigital.org."
            : "The form could not reach Boho. Retry once, or email contact@bohemiandigital.org.",
        reference: submissionId,
      });
      resetTurnstile();
    } finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  return (
    <div className={classNames("draft-form", className)}>
      <div className="draft-form__heading">
        <h2 className="draft-form__title" id={`${formId}-title`}>
          {config.title}
        </h2>
        <p className="draft-form__body">{config.body}</p>
        {config.fields.some((field) => field.name === "website") ? (
          <p className="draft-form__body">
            <DefinedText
              autoDefine
              seenTerms={glossaryTerms}
              text="Use the website URL field for the page address Boho should review."
            />
          </p>
        ) : null}
        <p
          className="draft-form__body"
          dangerouslySetInnerHTML={{ __html: CONTACT_EMAIL_FALLBACK_HTML }}
        />
      </div>

      <form
        ref={formRef}
        className="draft-form__form"
        aria-labelledby={`${formId}-title`}
        aria-describedby={`${privacyId} ${statusId}`}
        aria-busy={submitting}
        data-form-id={config.formId}
        data-turnstile-action={contract.action}
        onSubmit={handleSubmit}
      >
        <div className="draft-form__fields">
          {config.fields.map((field, index) => {
            const id = fieldId(formId, field, index);
            const rule = fieldRules[field.name];
            const error = fieldErrors[field.name];

            if (field.type === "checkbox") {
              const hintId = field.hint ? `${id}-hint` : undefined;
              const errorId = error ? `${id}-error` : undefined;

              return (
                <div
                  className={classNames(
                    "form-field form-field--checkbox",
                    Boolean(error) && "form-field--error",
                  )}
                  key={`${field.name}-${index}`}
                >
                  <div className="draft-form__checkbox-control">
                    <input
                      className="draft-form__checkbox"
                      id={id}
                      name={field.name}
                      type="checkbox"
                      value="yes"
                      required={field.required}
                      disabled={submitting}
                      aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
                      aria-invalid={error ? true : undefined}
                    />
                    <label className="draft-form__checkbox-label" htmlFor={id}>
                      {field.label}
                      {field.required ? <RequiredMark /> : null}
                    </label>
                  </div>
                  {field.hint ? (
                    <p className="form-field__hint" id={hintId}>
                      {field.hint}
                    </p>
                  ) : null}
                  {error ? (
                    <p className="form-field__error" id={errorId} role="alert">
                      {error}
                    </p>
                  ) : null}
                </div>
              );
            }

            const shared = {
              id,
              name: field.name,
              label: field.label,
              hint: field.hint,
              placeholder: field.placeholder,
              required: field.required,
              disabled: submitting,
              error,
              autoComplete: autoCompleteFor(field),
            };

            if (field.type === "textarea") {
              return (
                <FormField
                  {...shared}
                  as="textarea"
                  key={`${field.name}-${index}`}
                  maxLength={rule?.maxLength || undefined}
                  rows={6}
                />
              );
            }

            if (field.type === "select") {
              return (
                <FormField
                  {...shared}
                  as="select"
                  defaultValue=""
                  key={`${field.name}-${index}`}
                  options={(field.options ?? []).map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  placeholder={field.placeholder ?? "Choose an option"}
                />
              );
            }

            return (
              <FormField
                {...shared}
                key={`${field.name}-${index}`}
                maxLength={rule?.maxLength || undefined}
                type={field.type}
              />
            );
          })}
        </div>

        <div className="form-field form-field--honeypot" aria-hidden="true">
          <label htmlFor={honeypotId}>Company website verification</label>
          <input
            id={honeypotId}
            name="companyWebsite"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="draft-form__privacy" id={privacyId}>
          <p>{config.privacyNote}</p>
        </div>

        <div className="form-field form-field--checkbox draft-form__consent">
          <div className="draft-form__checkbox-control">
            <input
              className="draft-form__checkbox"
              id={consentId}
              name="consent"
              type="checkbox"
              value="yes"
              required
              disabled={submitting}
            />
            <label className="draft-form__checkbox-label" htmlFor={consentId}>
              {config.consent
                ?? "I agree that Boho may use this information to review and respond to my inquiry."}
              <RequiredMark /> Read the <Link href="/privacy/">privacy notice</Link>.
            </label>
          </div>
        </div>

        <div className="draft-form__turnstile">
          <div
            ref={turnstileRef}
            className="draft-form__turnstile-widget"
            data-turnstile-sitekey={TURNSTILE_SITEKEY}
            tabIndex={-1}
          />
          <p className="draft-form__idle-status">
            {turnstileState === "ready"
              ? "Security check complete."
              : turnstileState === "error"
                ? "Security check unavailable."
                : "Completing the security check…"}
          </p>
        </div>

        <button
          className="button-link button-link--primary draft-form__submit"
          type="submit"
          disabled={submitting}
        >
          <span className="button-link__label">
            {submitting ? "Sending…" : config.submitLabel}
          </span>
          <span className="button-link__arrow" aria-hidden="true">
            {"\u2192"}
          </span>
        </button>

        <noscript>
          <p className="draft-form__noscript">
            JavaScript is required for the security check. Email
            contact@bohemiandigital.org instead.
          </p>
        </noscript>

        <div className="draft-form__result" id={statusId}>
          {notice ? (
            <FormStatusMessage status={notice.status} title={notice.title}>
              <p>{notice.message}</p>
              {notice.reference ? (
                <p>
                  Reference: <code>{notice.reference}</code>
                </p>
              ) : null}
            </FormStatusMessage>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default DraftForm;
