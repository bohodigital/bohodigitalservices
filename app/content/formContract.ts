export const FORM_CONTRACTS = {
  contact: {
    action: "boho_contact",
    fields: {
      name: { type: "text", required: true, maxLength: 120 },
      email: { type: "email", required: true, maxLength: 254 },
      businessName: { type: "text", required: true, maxLength: 180 },
      website: { type: "url", required: false, maxLength: 500 },
      businessType: { type: "text", required: true, maxLength: 300 },
      service: { type: "select", required: true, maxLength: 120 },
      message: { type: "textarea", required: true, maxLength: 8000 },
      serviceArea: { type: "text", required: false, maxLength: 500 },
      provider: { type: "text", required: false, maxLength: 500 },
      valuableAction: { type: "text", required: false, maxLength: 500 },
      valuableOffer: { type: "text", required: false, maxLength: 500 },
      budget: { type: "select", required: false, maxLength: 120 },
      timing: { type: "text", required: false, maxLength: 500 },
    },
  },
  "visibility-check": {
    action: "boho_visibility_check",
    fields: {
      name: { type: "text", required: true, maxLength: 120 },
      email: { type: "email", required: true, maxLength: 254 },
      businessName: { type: "text", required: true, maxLength: 180 },
      website: { type: "url", required: true, maxLength: 500 },
      businessType: { type: "text", required: true, maxLength: 300 },
      serviceArea: { type: "text", required: true, maxLength: 500 },
      stuck: { type: "textarea", required: true, maxLength: 8000 },
      valuableAction: { type: "text", required: true, maxLength: 500 },
      provider: { type: "text", required: false, maxLength: 500 },
      topOffer: { type: "text", required: false, maxLength: 500 },
      competitors: { type: "textarea", required: false, maxLength: 4000 },
      budget: { type: "text", required: false, maxLength: 500 },
      timing: { type: "text", required: false, maxLength: 500 },
      scopeAcknowledgement: { type: "checkbox", required: true, maxLength: 0 },
    },
  },
  emergency: {
    action: "boho_emergency",
    fields: {
      name: { type: "text", required: true, maxLength: 120 },
      email: { type: "email", required: true, maxLength: 254 },
      businessName: { type: "text", required: true, maxLength: 180 },
      website: { type: "url", required: true, maxLength: 500 },
      problem: { type: "textarea", required: true, maxLength: 8000 },
      began: { type: "text", required: true, maxLength: 500 },
      priorChange: { type: "textarea", required: true, maxLength: 8000 },
      impact: { type: "textarea", required: true, maxLength: 8000 },
      platform: { type: "text", required: true, maxLength: 500 },
      authorizedAccess: { type: "select", required: true, maxLength: 20 },
      error: { type: "textarea", required: false, maxLength: 4000 },
      providerContact: { type: "text", required: false, maxLength: 500 },
      deadline: { type: "text", required: false, maxLength: 500 },
    },
  },
} as const;

export type FormId = keyof typeof FORM_CONTRACTS;
export type FormFieldName =
  keyof (typeof FORM_CONTRACTS)["contact"]["fields"]
  | keyof (typeof FORM_CONTRACTS)["visibility-check"]["fields"]
  | keyof (typeof FORM_CONTRACTS)["emergency"]["fields"];
