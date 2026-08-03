import {
  commercialSection,
} from "../../content/commercial/presentation";
import {
  commercialInquiryV2,
  freeReviewPage,
  freeReviewServiceOptions,
} from "../../content/commercialReset";
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
  const serviceOptions = freeReviewServiceOptions.map(({ label }) => label);
  const backendOptions = Object.fromEntries(
    freeReviewServiceOptions.map(({ label, backendValue }) => [
      label,
      backendValue,
    ]),
  );
  return [
    { publicName: "name", backendName: "name", type: "text", label: "Name", placeholder: name.one("Placeholder"), requirement: name.one("Required text"), required: true, maxLength: 120 },
    { publicName: "email", backendName: "email", type: "email", label: "Email", placeholder: email.one("Placeholder"), requirement: email.one("Required text"), required: true, maxLength: 254 },
    { publicName: "businessName", backendName: "businessName", type: "text", label: "Business or organization", placeholder: business.one("Placeholder"), requirement: business.one("Required text"), required: true, maxLength: 180 },
    { publicName: "website", backendName: "website", type: "url", label: "Existing website or public page", placeholder: website.one("Placeholder"), requirement: website.one("Optional text"), required: false, maxLength: 500 },
    { publicName: "service", backendName: "service", type: "radio-card", label: "What do you need?", requirement: service.one("Required text"), required: true, maxLength: 120, options: serviceOptions, optionDetails: commercialInquiryV2.serviceCards, backendOptions },
    { publicName: "message", backendName: "message", type: "textarea", label: "Brief description", hint: "Explain what is happening, what matters most, and what would make the next step useful. Do not include passwords, recovery codes, payment information, private customer records, or other secrets.", requirement: situation.one("Required text"), required: true, maxLength: 8000 },
    { publicName: "serviceArea", backendName: "serviceArea", type: "text", label: "City, region, or market", requirement: location.one("Optional text"), required: false, maxLength: 500 },
    { publicName: "provider", backendName: "provider", type: "text", label: "Current provider or platform", requirement: provider.one("Optional text"), required: false, maxLength: 500 },
    { publicName: "valuableAction", backendName: "valuableAction", type: "text", label: "Most valuable customer or operational action", placeholder: action.one("Placeholder"), requirement: action.one("Optional text"), required: false, maxLength: 500 },
    { publicName: "valuableOffer", backendName: "valuableOffer", type: "text", label: "Most important service, product, or workflow", requirement: offer.one("Optional text"), required: false, maxLength: 500 },
    { publicName: "budget", backendName: "budget", type: "select", label: "Budget context", requirement: budget.one("Optional text"), required: false, maxLength: 120, options: [budget.one("Options, in this order"), ...budget.many("value")] },
    { publicName: "timing", backendName: "timing", type: "text", label: "Real deadline or time sensitivity", placeholder: timing.one("Placeholder"), requirement: timing.one("Optional text"), required: false, maxLength: 500 },
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
    { publicName: "name", backendName: "name", type: "text", label: name.one("Label"), placeholder: name.one("Placeholder"), requirement: name.one("Required text"), required: true, maxLength: 120, group: "Contact and affected system" },
    { publicName: "email", backendName: "email", type: "email", label: email.one("Label"), placeholder: email.one("Placeholder"), requirement: email.one("Required text"), required: true, maxLength: 254, group: "Contact and affected system" },
    { publicName: "businessName", backendName: "businessName", type: "text", label: business.one("Label"), requirement: business.one("Required text"), required: true, maxLength: 180, group: "Contact and affected system" },
    { publicName: "website", backendName: "website", type: "url", label: "Website or affected public system", placeholder: website.one("Placeholder"), requirement: website.one("Required text"), required: true, maxLength: 500, group: "Contact and affected system" },
    { publicName: "incidentType", backendName: "problem", type: "select", label: incidentType.one("Label"), requirement: incidentType.one("Required text"), required: true, maxLength: 500, options: [incidentType.one("Options, in this order"), ...incidentType.many("value")], group: "Incident facts" },
    { publicName: "began", backendName: "began", type: "text", label: "When did it begin?", placeholder: "Example: Today around 2:30 PM Central", requirement: began.one("Required text"), required: true, maxLength: 500, group: "Incident facts" },
    { publicName: "priorChange", backendName: "priorChange", type: "text", label: "What changed immediately before it began?", placeholder: "Example: A new site launched, DNS changed, a plugin updated, or the provider changed account access.", requirement: change.one("Optional text"), required: false, maxLength: 8000, group: "Incident facts" },
    { publicName: "impact", backendName: "impact", type: "textarea", label: "What is the business impact?", placeholder: "Example: Customers cannot submit the estimate form, the domain does not load, or paid traffic is reaching a missing page.", requirement: impact.one("Required text"), required: true, maxLength: 8000, group: "Impact and description" },
    { publicName: "description", backendName: "problem", type: "textarea", label: "Describe what is happening", hint: "Include visible errors, affected pages, devices, providers, and troubleshooting already attempted. Do not include passwords, authentication codes, private customer information, payment data, or private keys.", requirement: description.one("Required text"), required: true, maxLength: 7500, group: "Impact and description" },
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
      title: isStart
        ? freeReviewPage.formHeading
        : heading.one("Heading"),
      body: isStart ? commercialInquiryV2.start.formBody : heading.one("Introduction"),
      requiredNote: isStart ? commercialInquiryV2.start.requiredNote : heading.one("Required-fields note"),
    },
    fields: isStart ? startFields() : emergencyFields(),
    privacy: isStart
      ? "Do not include passwords, recovery codes, payment information, private customer records, or other secrets."
      : consent.one("Privacy note"),
    consent: {
      label: isStart ? "I agree that Boho may use this information to review and respond to my inquiry. I understand that submission does not create a client relationship, quote, emergency response, or guarantee of availability." : consent.one("Checkbox label"),
      requirement: consent.one("Required text"),
    },
    authority: isStart ? undefined : {
      label: commercialSection("emergency", "authority").one("Checkbox label"),
      requirement: commercialSection("emergency", "authority").one("Required text"),
    },
    submit: {
      idle: isStart ? freeReviewPage.submitLabel : submit.one("Submit label"),
      pending: isStart
        ? `${freeReviewPage.submitLabel}…`
        : submit.one("Submitting label"),
    },
    disclosure: disclosure ? {
      closed: "Add optional project details",
      open: "Hide optional project details",
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
        heading: isStart ? "Your review request was sent." : success.one("Heading"),
        body: isStart ? commercialInquiryV2.start.success.body : success.one("Body"),
        links: [
          { label: success.one("Primary link"), href: successDestinations[0] },
          { label: success.one("Secondary link"), href: successDestinations[1] },
        ],
      },
      failure: {
        heading: isStart ? "The request could not be sent." : failure.one("Heading"),
        body: isStart ? "Your information has not been confirmed as delivered. Try again or contact Boho through the published email address." : failure.one("Body"),
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
