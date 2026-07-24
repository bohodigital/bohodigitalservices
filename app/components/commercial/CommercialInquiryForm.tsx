import {
  commercialCorrections,
  commercialSection,
  correctionValue,
} from "../../content/commercial/presentation";
import {
  CommercialInquiryFormClient,
  type CommercialFormField,
  type CommercialFormPresentation,
} from "./CommercialInquiryFormClient";

function startFields(): ReadonlyArray<CommercialFormField> {
  const name = commercialSection("start", "name");
  const email = commercialSection("start", "email");
  const business = commercialSection("start", "business-or-organization");
  const website = commercialSection("start", "website-or-public-page");
  const service = commercialSection("start", "service-category");
  const situation = commercialSection("start", "main-situation");
  const location = commercialSection("start", "location-or-market");
  const provider = commercialSection("start", "provider-or-platform");
  const action = commercialSection("start", "valuable-action");
  const offer = commercialSection("start", "valuable-offer-or-workflow");
  const budget = commercialSection("start", "budget-context");
  const timing = commercialSection("start", "time-sensitivity");
  const serviceOptions = commercialCorrections.contact.standardInquiry.options
    .map(correctionValue);
  const backendOptions = Object.fromEntries(serviceOptions.map((option) => [
    option,
    option
      .replaceAll(" & ", " and ")
      .replace("Research, Analytics and Improvement", "Research, Analytics, and Improvement"),
  ]));
  return [
    { publicName: "name", backendName: "name", type: "text", label: name.one("Label"), placeholder: name.one("Placeholder"), requirement: name.one("Required text"), required: true, maxLength: 120 },
    { publicName: "email", backendName: "email", type: "email", label: email.one("Label"), placeholder: email.one("Placeholder"), requirement: email.one("Required text"), required: true, maxLength: 254 },
    { publicName: "businessName", backendName: "businessName", type: "text", label: business.one("Label"), placeholder: business.one("Placeholder"), requirement: business.one("Required text"), required: true, maxLength: 180 },
    { publicName: "website", backendName: "website", type: "url", label: website.one("Label"), placeholder: website.one("Placeholder"), hint: website.one("Hint"), requirement: website.one("Optional text"), required: false, maxLength: 500 },
    { publicName: "service", backendName: "service", type: "select", label: service.one("Label"), requirement: service.one("Required text"), required: true, maxLength: 120, options: serviceOptions, backendOptions },
    { publicName: "message", backendName: "message", type: "textarea", label: situation.one("Label"), placeholder: situation.one("Placeholder"), hint: situation.one("Hint"), requirement: situation.one("Required text"), required: true, maxLength: 8000 },
    { publicName: "serviceArea", backendName: "serviceArea", type: "text", label: location.one("Label"), requirement: location.one("Optional text"), required: false, maxLength: 500 },
    { publicName: "provider", backendName: "provider", type: "text", label: provider.one("Label"), hint: provider.one("Hint"), requirement: provider.one("Optional text"), required: false, maxLength: 500 },
    { publicName: "valuableAction", backendName: "valuableAction", type: "text", label: action.one("Label"), placeholder: action.one("Placeholder"), requirement: action.one("Optional text"), required: false, maxLength: 500 },
    { publicName: "valuableOffer", backendName: "valuableOffer", type: "text", label: offer.one("Label"), requirement: offer.one("Optional text"), required: false, maxLength: 500 },
    { publicName: "budget", backendName: "budget", type: "select", label: budget.one("Label"), hint: budget.one("Hint"), requirement: budget.one("Optional text"), required: false, maxLength: 120, options: [budget.one("Options, in this order"), ...budget.many("value")] },
    { publicName: "timing", backendName: "timing", type: "text", label: timing.one("Label"), placeholder: timing.one("Placeholder"), requirement: timing.one("Optional text"), required: false, maxLength: 500 },
  ];
}

function emergencyFields(): ReadonlyArray<CommercialFormField> {
  const name = commercialSection("emergency", "name");
  const email = commercialSection("emergency", "email");
  const business = commercialSection("emergency", "business-or-organization");
  const website = commercialSection("emergency", "website-or-affected-public-system");
  const incidentType = commercialSection("emergency", "incident-type");
  const began = commercialSection("emergency", "incident-start");
  const change = commercialSection("emergency", "known-change");
  const impact = commercialSection("emergency", "impact");
  const description = commercialSection("emergency", "incident-description");
  return [
    { publicName: "name", backendName: "name", type: "text", label: name.one("Label"), placeholder: name.one("Placeholder"), requirement: name.one("Required text"), required: true, maxLength: 120 },
    { publicName: "email", backendName: "email", type: "email", label: email.one("Label"), placeholder: email.one("Placeholder"), requirement: email.one("Required text"), required: true, maxLength: 254 },
    { publicName: "businessName", backendName: "businessName", type: "text", label: business.one("Label"), requirement: business.one("Required text"), required: true, maxLength: 180 },
    { publicName: "website", backendName: "website", type: "url", label: website.one("Label"), placeholder: website.one("Placeholder"), requirement: website.one("Required text"), required: true, maxLength: 500 },
    { publicName: "incidentType", backendName: "problem", type: "select", label: incidentType.one("Label"), requirement: incidentType.one("Required text"), required: true, maxLength: 500, options: [incidentType.one("Options, in this order"), ...incidentType.many("value")] },
    { publicName: "began", backendName: "began", type: "text", label: began.one("Label"), placeholder: began.one("Placeholder"), requirement: began.one("Required text"), required: true, maxLength: 500 },
    { publicName: "priorChange", backendName: "priorChange", type: "text", label: change.one("Label"), placeholder: change.one("Placeholder"), requirement: change.one("Optional text"), required: false, maxLength: 8000 },
    { publicName: "impact", backendName: "impact", type: "textarea", label: impact.one("Label"), placeholder: impact.one("Placeholder"), requirement: impact.one("Required text"), required: true, maxLength: 8000 },
    { publicName: "description", backendName: "problem", type: "textarea", label: description.one("Label"), hint: description.one("Hint"), requirement: description.one("Required text"), required: true, maxLength: 7500 },
  ];
}

function presentation(kind: "start" | "emergency"): CommercialFormPresentation {
  const isStart = kind === "start";
  const heading = commercialSection(kind, isStart ? "form-heading" : "emergency-request-form");
  const consent = commercialSection(kind, "consent");
  const submit = isStart ? commercialSection("start", "submit") : consent;
  const validation = commercialSection("start", "field-validation-messages");
  const summary = commercialSection("start", "validation-summary");
  const success = commercialSection(kind, isStart ? "success-state" : "success");
  const failure = commercialSection(kind, isStart ? "generic-failure-state" : "failure");
  const rate = commercialSection(kind, isStart ? "rate-limit-state" : "rate-limit");
  const network = commercialSection(kind, isStart ? "offline-or-network-state" : "network-failure");
  const successDestinations = success.many("Destination");
  const disclosure = isStart
    ? commercialSection("start", "progressive-disclosure-control")
    : null;
  const budgetValues = commercialSection("start", "budget-context").many("value");
  const compatibilityFallback = budgetValues.at(-1);
  if (!compatibilityFallback) throw new Error("Form compatibility fallback is missing.");
  return {
    kind,
    heading: {
      title: heading.one(isStart ? "Title" : "Heading"),
      body: heading.one(isStart ? "Body" : "Introduction"),
      requiredNote: heading.one("Required-fields note"),
    },
    fields: isStart ? startFields() : emergencyFields(),
    privacy: isStart
      ? commercialSection("start", "privacy-note").one("value")
      : consent.one("Privacy note"),
    consent: {
      label: consent.one("Checkbox label"),
      requirement: consent.one("Required text"),
    },
    authority: isStart ? undefined : {
      label: commercialSection("emergency", "authority").one("Checkbox label"),
      requirement: commercialSection("emergency", "authority").one("Required text"),
    },
    submit: {
      idle: submit.one("Submit label"),
      pending: submit.one("Submitting label"),
    },
    disclosure: disclosure ? {
      closed: disclosure.one("Closed label"),
      open: disclosure.one("Open label"),
    } : undefined,
    validation: {
      required: validation.one("Required-field message"),
      maximum: validation.one("Maximum-length message pattern"),
      email: validation.one("Email message"),
      url: validation.one("URL message"),
      consent: validation.one("Consent message"),
      heading: summary.one("Heading"),
      body: summary.one("Body"),
    },
    notices: {
      success: {
        heading: success.one("Heading"),
        body: success.one("Body"),
        links: [
          { label: success.one("Primary link"), href: successDestinations[0] },
          { label: success.one("Secondary link"), href: successDestinations[1] },
        ],
      },
      failure: {
        heading: failure.one("Heading"),
        body: failure.one("Body"),
        retry: failure.one("Retry label"),
        emailLabel: failure.one("Email fallback label"),
        emailHref: failure.one("Email fallback destination"),
      },
      rateLimit: {
        heading: rate.one("Heading"),
        body: rate.one("Body"),
        emailLabel: rate.optional("Email fallback label"),
        emailHref: rate.optional("Email fallback destination"),
      },
      network: {
        heading: network.one("Heading"),
        body: network.one("Body"),
      },
    },
    compatibilityFallback,
  };
}

export function CommercialInquiryForm({
  kind,
}: {
  kind: "start" | "emergency";
}) {
  return <CommercialInquiryFormClient presentation={presentation(kind)} />;
}
