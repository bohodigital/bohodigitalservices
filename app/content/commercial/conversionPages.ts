export const startConversionPage = {
  hero: {
    eyebrow: "FREE WEBSITE REVIEW",
    heading: "Find out what your website actually needs.",
    lead:
      "Send your current website or describe the project. Boho will inspect the public experience, identify the most important visible problem, and recommend the smallest sensible next step.",
    support:
      "You will not receive a canned score, an unreviewed automated sales report, or a ten-page excuse to sell you everything.",
    primaryCta: "Request my free review",
    secondaryCta: "See work built by Boho",
    trust: [
      "Public-information review",
      "Reviewed before it is sent",
      "No obligation",
      "Normal reply within two business days",
    ],
    example: {
      label: "EXAMPLE REVIEW FORMAT",
      heading: "A useful answer, not a mystery score.",
      rows: [
        {
          heading: "What we found",
          body: "The clearest visible issue affecting trust, discovery, or customer action.",
        },
        {
          heading: "Why it matters",
          body: "The likely business consequence, with uncertainty stated honestly.",
        },
        {
          heading: "Best next move",
          body: "Repair, redesign, SEO, migration, custom work, or leave it alone for now.",
        },
        {
          heading: "What can wait",
          body: "Work that does not yet justify the cost.",
        },
      ],
      note: "Your review is based on the public website and the information you submit.",
    },
  },
  emergencyDetour: {
    heading: "Is the site down or actively losing inquiries?",
    body:
      "Use Emergency Help when a live website, form, launch, redirect, access problem, or provider action is actively affecting customers or operations.",
    cta: "Open Emergency Help",
  },
  value: {
    eyebrow: "WHAT THE FREE REVIEW GIVES YOU",
    heading: "Enough clarity to choose the next move.",
    intro:
      "The review is deliberately small. It should still tell you something useful before either side commits to a project.",
    cards: [
      {
        heading: "A prioritized problem",
        body: "The highest-value visible issue, not a pile of generic warnings.",
      },
      {
        heading: "A practical route",
        body: "The smallest service or action that appears capable of improving the situation.",
      },
      {
        heading: "A plain-English explanation",
        body: "What the technical issue means, why it matters, and which facts still require access or testing.",
      },
      {
        heading: "An honest no",
        body: "If the visible evidence does not support a project, Boho will not invent one.",
      },
    ],
  },
  proof: {
    eyebrow: "BUILT AND OPERATED BY BOHO",
    heading: "The people reviewing your site also build real ones.",
    body:
      "Boho owns and operates live publishing, education, research, and analytics properties. They are not client case studies, but they are inspectable proof that the work exists beyond a proposal.",
    cta: "Inspect Boho's work",
  },
  process: {
    eyebrow: "WHAT HAPPENS NEXT",
    heading: "Three steps. No discovery-call theater.",
    steps: [
      {
        heading: "1. Send the situation",
        body: "A website link and a candid paragraph are enough to begin. Optional details help Boho give a more specific answer.",
      },
      {
        heading: "2. Boho reviews the public experience",
        body: "The review looks for the clearest visible issue affecting trust, discovery, ownership, or customer action.",
      },
      {
        heading: "3. You receive a recommended next step",
        body: "Boho explains what appears worth doing, what can wait, and which facts would require deeper access or paid work.",
      },
    ],
  },
  boundary: {
    eyebrow: "USEFUL, NOT UNLIMITED",
    heading: "Free should still be useful. It is not unlimited.",
    goodHeading: "Good use of this review",
    goodItems: [
      "You have a current website and something feels weak, confusing, or outdated.",
      "You are deciding between repair, redesign, SEO, or migration.",
      "You want an outside opinion before paying a provider.",
      "You have a business idea and need to know what belongs in the first version.",
    ],
    paidHeading: "What requires paid work or secure access",
    paidItems: [
      "Private account inspection",
      "A complete technical audit or written strategy",
      "Provider recovery or migration execution",
      "Implementation, repair, or emergency response",
    ],
    note:
      "Submitting the form does not create a client relationship, guarantee acceptance, or reserve availability. Boho normally replies to a standard inquiry within two business days.",
  },
  form: {
    eyebrow: "REQUEST THE REVIEW",
    heading: "Show us the real situation.",
    body: "A link and a candid paragraph are enough to begin. Optional details help us give a more useful answer.",
    pricing:
      "If paid work makes sense, current starting points are $200 for focused Website Help, $850 for a Business Website, $450/month for Ongoing SEO & Local Growth, and $1,500 for a Custom System. The written scope controls the exact work and price.",
    submit: "Request my free review",
  },
} as const;

export const emergencyConversionPage = {
  hero: {
    eyebrow: "URGENT WEBSITE HELP",
    heading: "Your website is failing. Start with the safest next move.",
    body: [
      "Send the affected site, what changed, when it started, and what customers can no longer do. Boho will triage the visible incident, identify the most likely immediate risk, and determine whether we can act safely.",
      "Do not send passwords, recovery codes, private keys, payment information, or private customer records. Authorized access is arranged separately.",
    ],
    primaryCta: "Describe the emergency",
    secondaryCta: "This can wait",
    trust: "Calm diagnosis. Authorized access. Bounded action. Documented result.",
    response: {
      label: "FIRST RESPONSE",
      heading: "Reduce the damage before expanding the work.",
      steps: [
        "Stop random changes",
        "Preserve current evidence",
        "Identify the last known good state",
        "Restore the highest-value customer path",
      ],
      status: "Priority review subject to capacity",
    },
  },
  guidance: {
    eyebrow: "DO THESE THREE THINGS NOW",
    heading: "Before changing anything else",
    cards: [
      {
        heading: "1. Stop untracked changes",
        body: "Do not keep changing settings, deleting records, reinstalling plugins, or accepting conflicting provider instructions without recording what happened.",
      },
      {
        heading: "2. Capture the failure",
        body: "Save the affected URLs, exact error text, screenshots, start time, recent changes, and anything that still works.",
      },
      {
        heading: "3. Preserve owner access",
        body: "Confirm which owner-controlled domain, hosting, email, analytics, repository, and provider accounts still work. Do not send credentials through this form.",
      },
    ],
  },
  fit: {
    eyebrow: "WHAT COUNTS AS AN EMERGENCY",
    heading: "Use Emergency Help when the problem is active and consequential.",
    cards: [
      {
        heading: "The public site is unavailable",
        body: "The website is down, serving the wrong content, or failing for a meaningful share of visitors.",
      },
      {
        heading: "Customers cannot act",
        body: "A form, phone link, booking path, checkout, notification, or other valuable customer action stopped working.",
      },
      {
        heading: "A launch or migration failed",
        body: "Important pages, redirects, mobile layouts, tracking, or integrations broke during a production change.",
      },
      {
        heading: "The domain or DNS changed",
        body: "The domain stopped resolving correctly, records changed unexpectedly, or a provider transition interrupted the website or email.",
      },
      {
        heading: "Access disappeared during an incident",
        body: "The business lost authorized access to a critical website, domain, hosting, analytics, or provider account while operations are affected.",
      },
      {
        heading: "Search access was accidentally blocked",
        body: "Important pages were removed, redirected incorrectly, marked not to index, or otherwise made unavailable after a known change.",
      },
    ],
    standardNote:
      "A redesign, ordinary audit, SEO plan, content update, feature request, or frustrating provider relationship is important, but it belongs in the standard free review when the public system is still operating.",
    cta: "Use the standard review",
  },
  process: {
    eyebrow: "WHAT HAPPENS AFTER SUBMISSION",
    heading: "Triage before intervention.",
    stages: [
      {
        heading: "1. Confirm the incident",
        body: "Boho reviews the public failure, known change, affected customer path, timing, and the authority available to act.",
      },
      {
        heading: "2. Stabilize the highest-value path",
        body: "The first recommendation may be containment, a provider escalation, a known-good restore, or a bounded rollback rather than a broad repair.",
      },
      {
        heading: "3. Approve the action and price",
        body: "Paid work begins only after the immediate action, access, responsibility, billing basis, and verification target are understood as clearly as the incident allows.",
      },
      {
        heading: "4. Verify and document",
        body: "Boho checks the agreed recovery or stabilization target and records the action, known limits, unresolved dependencies, and next recommended step.",
      },
    ],
  },
  pricing: {
    eyebrow: "PRIORITY WORK",
    heading: "Urgent work is scoped before paid work begins.",
    body:
      "Focused Website Help starts at $200. Priority, after-hours, access-intensive, or work that displaces scheduled projects may cost more. Boho will explain the immediate action and billing basis before paid work begins whenever circumstances allow.",
    support:
      "Submitting an emergency request does not guarantee immediate response, acceptance, restoration, recovery, or a specific resolution time.",
  },
  form: {
    eyebrow: "EMERGENCY TRIAGE REQUEST",
    heading: "Describe the active failure.",
    body: "Use facts. We need the affected system, when the problem began, what changed, and what customers or operations can no longer do.",
    submit: "Send the emergency request",
  },
  boundaries: {
    heading: "Some incidents need another responsible party first.",
    items: [
      "Contact the registrar, host, platform, mailbox provider, payment processor, or software provider when only that provider can restore the affected service.",
      "Contact an attorney when ownership, contracts, legal demands, or access authority are disputed.",
      "Contact a cybersecurity or incident-response professional when unauthorized access, malware, data exposure, extortion, or a broader compromise is suspected.",
      "Contact the insurer when a policy may require notice or approved response providers.",
      "Contact the relevant regulated professional when medical, financial, legal, payment, privacy, or regulated data obligations are involved.",
    ],
    authorizationHeading: "Boho uses authorized access and lawful recovery methods.",
    authorizationBody:
      "Boho does not bypass credentials, impersonate an owner, falsify authority, or alter accounts without authorization. Provider cooperation, account recovery, data recovery, restored rankings, and resolution time cannot be guaranteed unless a written engagement expressly says otherwise.",
    finalHeading: "Urgent does not mean unbounded.",
    finalBody:
      "The safest first action may be containment, rollback, evidence preservation, provider escalation, or specialist referral. Boho will not make an incident larger merely to appear responsive.",
    primaryCta: "Describe the emergency",
    secondaryCta: "This can wait",
  },
} as const;
