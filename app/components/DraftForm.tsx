"use client";

import { useId, useState, type FormEvent } from "react";

import type { DraftField, DraftFormConfig } from "../content/types";
import { FormField, FormStatusMessage } from "./SiteChrome";

type DraftFormProps = {
  config: DraftFormConfig;
  className?: string;
};

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

export function DraftForm({ config, className }: DraftFormProps) {
  const reactId = useId();
  const [localChecks, setLocalChecks] = useState(0);
  const formId = `draft-form-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const privacyId = `${formId}-privacy`;
  const statusId = `${formId}-status`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLocalChecks((count) => count + 1);
  }

  return (
    <div className={classNames("draft-form", className)}>
      <div className="draft-form__heading">
        <p className="draft-form__status-label">
          <span className="draft-form__status-dot" aria-hidden="true" />
          Preview form — not connected
        </p>
        <h2 className="draft-form__title" id={`${formId}-title`}>
          {config.title}
        </h2>
        <p className="draft-form__body">{config.body}</p>
        <p className="draft-form__body">
          This form cannot send a message. Use the working fallback: {" "}
          <a href="mailto:contact@bohemiandigital.org">contact@bohemiandigital.org</a>.
        </p>
      </div>

      <form
        className="draft-form__form"
        aria-labelledby={`${formId}-title`}
        aria-describedby={`${privacyId} ${statusId}`}
        onSubmit={handleSubmit}
      >
        <div className="draft-form__fields">
          {config.fields.map((field, index) => {
            const id = fieldId(formId, field, index);

            if (field.type === "checkbox") {
              const hintId = field.hint ? `${id}-hint` : undefined;

              return (
                <div
                  className="form-field form-field--checkbox"
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
                      aria-describedby={hintId}
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
                </div>
              );
            }

            if (field.type === "textarea") {
              return (
                <FormField
                  as="textarea"
                  id={id}
                  key={`${field.name}-${index}`}
                  name={field.name}
                  label={field.label}
                  hint={field.hint}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={6}
                />
              );
            }

            if (field.type === "select") {
              return (
                <FormField
                  as="select"
                  id={id}
                  key={`${field.name}-${index}`}
                  name={field.name}
                  label={field.label}
                  hint={field.hint}
                  placeholder={field.placeholder ?? "Choose an option"}
                  required={field.required}
                  defaultValue=""
                  options={(field.options ?? []).map((option) => ({
                    label: option,
                    value: option,
                  }))}
                />
              );
            }

            return (
              <FormField
                id={id}
                key={`${field.name}-${index}`}
                name={field.name}
                label={field.label}
                hint={field.hint}
                placeholder={field.placeholder}
                required={field.required}
                type={field.type}
              />
            );
          })}
        </div>

        <div className="draft-form__privacy" id={privacyId}>
          <p>{config.privacyNote}</p>
          {config.consent ? <p>{config.consent}</p> : null}
        </div>

        <button
          className="button-link button-link--primary draft-form__submit"
          type="submit"
        >
          <span className="button-link__label">{config.submitLabel}</span>
          <span className="button-link__arrow" aria-hidden="true">
            {"\u2192"}
          </span>
        </button>

        <div className="draft-form__result" id={statusId}>
          {localChecks > 0 ? (
            <FormStatusMessage
              key={localChecks}
              status="info"
              title="Nothing was sent."
            >
              This preview does not transmit or store entries.
              Use contact@bohemiandigital.org to send the inquiry.
            </FormStatusMessage>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default DraftForm;
