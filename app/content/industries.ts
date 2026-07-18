export type IndustryModelId =
  | "project-business"
  | "local-service"
  | "retail-hospitality"
  | "ecommerce"
  | "professional-b2b";

export type IndustryModel = {
  id: IndustryModelId;
  slug: string;
  anchor: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  selectorAction: string;
  selectorDescription: string;
  recognition: string[];
  operatingModels?: Array<{ title: string; body: string }>;
  pathSteps: string[];
  comparison: {
    needs: string;
    trust: string;
    action: string;
  };
  commonLeaks: string[];
  inspect: string[];
  priceKeys: string[];
  ownershipNote?: string;
  childActionLabel: string;
  reviewActionLabel: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  concept: {
    title: string;
    purpose: string;
    labels: string[];
  };
  customerQuestions: string[];
  trustRequirements: string[];
  valuableActions: string[];
  operationalConstraints: string[];
  detailSections: Array<{
    eyebrow: string;
    title: string;
    body: string[];
    bullets?: string[];
  }>;
  serviceRoutes: Array<{
    title: string;
    body: string;
    href: string;
    linkLabel: string;
  }>;
  evidencePlan: {
    artifactType: string;
    demonstrates: string;
    doesNotDemonstrate: string;
  };
  faq: Array<{ question: string; answer: string }>;
};

export const industriesHubMetadata = {
  title: "Website & SEO Services by Industry | Boho Digital Services",
  metaDescription:
    "See how Boho adapts websites, SEO, reporting, provider rescue, and digital systems for contractors, local services, retail, ecommerce, and professional firms.",
  eyebrow: "WHO BOHO HELPS",
  headline: "Build around the way your customers actually decide.",
} as const;

export const industryModels: IndustryModel[] = [
  {
    id: "project-business",
    slug: "/industries/home-improvement-contractors/",
    anchor: "project-businesses",
    title:
      "Websites, Local SEO & Lead Generation for Contractors and Home Improvement",
    metaDescription:
      "Boho helps contractors and home improvement businesses improve websites, local SEO, quote paths, service pages, provider migrations, reviews, and ongoing growth.",
    eyebrow: "HIGH-VALUE PROJECT BUSINESSES",
    heading:
      "High-value project work needs qualified inquiries, not decorative traffic.",
    selectorAction: "Estimate a project",
    selectorDescription:
      "Contractors, trades, restoration, home improvement, and other high-value project businesses",
    recognition: [
      "Your best projects are valuable. The website should not treat every visitor, service, and inquiry as though they are equal.",
      "Contractors, remodelers, restoration firms, specialty trades, and related project businesses need to help the right prospect recognise the service, confirm the location and project fit, inspect credible proof, and request the correct estimate or consultation.",
    ],
    pathSteps: [
      "Project need",
      "Service and location fit",
      "Process and project proof",
      "Estimate or inspection",
    ],
    comparison: {
      needs: "Can this company handle the right project?",
      trust: "Project proof, process, area, verified credentials",
      action: "Estimate, inspection, consultation",
    },
    commonLeaks: [
      "Broad service descriptions that do not reflect actual project types",
      "Unclear service areas",
      "Project galleries without context",
      "Weak mobile estimate paths",
      "Forms that fail to qualify service, location, timing, or project type",
      "Planned and urgent work mixed together",
      "Poor lead-source visibility",
      "Unclear provider or account ownership",
    ],
    inspect: [
      "High-value service structure",
      "Service-area logic",
      "Project-proof quality",
      "Estimate and telephone paths",
      "Mobile usability",
      "Search and local presence",
      "Lead measurement",
      "Domain, hosting, analytics, and provider control",
    ],
    priceKeys: [
      "initial-review",
      "ongoing-seo",
      "focused-improvement",
      "provider-assessment",
      "migration-assistance",
    ],
    ownershipNote:
      "Provider Rescue can establish ownership, access, dependencies, and a responsible move before implementation begins.",
    childActionLabel: "Explore Contractors & Home Improvement",
    reviewActionLabel: "Start the free project-business review",
    image: {
      src: "/visuals/homepage-industry-contractors-v2.webp",
      alt: "An electrician working inside a residential renovation project",
      width: 1067,
      height: 1600,
    },
    concept: {
      title: "Estimate-path inspection",
      purpose:
        "A concept sequence showing the information a serious project inquiry may need before an estimate request.",
      labels: ["Service fit", "Area fit", "Project proof", "Request details"],
    },
    customerQuestions: [
      "Does this company do the exact kind of project I need?",
      "Do they serve my location and property type?",
      "Can I inspect comparable work and understand the process?",
      "What information should I provide to request the right next step?",
    ],
    trustRequirements: [
      "Context-rich project proof",
      "A clear process and realistic expectations",
      "Verified credentials only where they are relevant and current",
      "Visible ownership and contact routes",
    ],
    valuableActions: [
      "Qualified estimate request",
      "Inspection booking",
      "Project consultation",
      "Telephone inquiry for the correct service",
    ],
    operationalConstraints: [
      "Service areas and travel limits",
      "Seasonal or emergency capacity",
      "Project size, property type, and timing",
      "Provider, account, and lead-routing control",
    ],
    detailSections: [
      {
        eyebrow: "Start with project economics",
        title: "A useful contractor website filters for fit before it asks for a form.",
        body: [
          "Project businesses do not benefit from treating every click as equally valuable. A homeowner looking for a small repair, a property manager planning a multi-site program, and a family preparing for a full renovation may use similar search language while representing very different work. The website should help each person recognise the service, location, property type, likely process, and sensible next step. That clarity protects the visitor's time and helps the company focus on inquiries it can responsibly serve.",
          "The starting point is not a long list of search phrases. It is the way the company actually sells and delivers work: which projects matter, what information is needed before an estimate, where crews can travel, how urgent requests are handled, and which services require an inspection. Boho can then organise pages and calls to action around those realities. The result should feel simple to a customer even when the operation behind it is complex.",
        ],
        bullets: [
          "Separate planned projects from emergency or short-notice requests.",
          "State service-area and property-fit limits without creating empty location pages.",
          "Ask only for details that help route an inquiry to the right next step.",
          "Keep telephone, estimate, and inspection paths usable on a small screen.",
        ],
      },
      {
        eyebrow: "Service and location structure",
        title: "Match the site to the work customers are trying to buy.",
        body: [
          "A broad page labelled services rarely gives a serious property decision-maker enough information. Important project types may need their own clear explanation: who the work suits, the conditions that change the approach, the parts of the process the company controls, and what happens after an inquiry. Pages should use the language customers understand while remaining faithful to the services the company is prepared to offer. They should not promise availability, timelines, warranties, credentials, or outcomes that have not been verified.",
          "Location information needs the same discipline. A service-area page is useful when it explains a real operating area and connects it to a real service. It is not useful when dozens of near-identical pages merely swap place names. Boho can review the relationship among priority services, locations, project proof, public business information, and internal links so the site makes geographic fit clear without manufacturing local relevance.",
        ],
      },
      {
        eyebrow: "Proof with context",
        title: "A gallery becomes evidence only when the visitor can understand what it shows.",
        body: [
          "Project photography can help a prospect assess workmanship and fit, but an unexplained image grid leaves most of the reasoning to the visitor. Where the business has permission to publish, a stronger project record identifies the type of property, the service shown, the relevant starting condition, important constraints, and the portion of the work visible in the image. It can explain the process without disclosing an address, a customer's identity, or unsupported claims about cost, duration, savings, or performance.",
          "Reviews, credentials, manufacturer relationships, warranties, and financing information also require careful handling. Boho can help place verified material where it answers a real customer question, while leaving out fields the business cannot support. Credibility comes from accurate, current context and a clear process. It does not require turning every trust signal into a badge wall or implying that one past project predicts another customer's result.",
        ],
        bullets: [
          "Use permissioned project material and remove private customer details.",
          "Describe what is visible rather than claiming an unmeasured outcome.",
          "Connect relevant proof to the service page where a decision is being made.",
          "Keep credentials and policy language current and attributable to the business.",
        ],
      },
      {
        eyebrow: "The estimate path",
        title: "Reduce friction without accepting vague or risky inquiries.",
        body: [
          "A short form is not automatically a good form. The right estimate path gathers enough information to distinguish service type, location, property context, timing, and the requested next step, then sets an honest expectation for what happens after submission. Some businesses need a call, others an inspection request, and others a written project summary. The form should reflect the company's real qualification and scheduling process rather than forcing every prospect through a generic contact box.",
          "Measurement should follow that same path. Calls, form completions, inspection requests, and visits to important service pages can show where people continue or stop. They do not prove that a job was won, that revenue came from one source, or that every inquiry was suitable. Boho documents what is measured, where data can be lost, and which business feedback is needed to distinguish useful demand from noise.",
        ],
      },
      {
        eyebrow: "Control before change",
        title: "Provider ownership is part of the customer path.",
        body: [
          "A contractor can have a functional-looking site while lacking reliable control of the domain, hosting, business profiles, analytics, call routing, or form delivery. That becomes expensive when a page needs repair, an employee leaves, or a provider relationship changes. Before a redesign or migration, Boho can inventory access, dependencies, renewals, and ownership so the company knows what can be changed safely and what needs recovery first.",
          "This is especially important when the website supports active advertising or time-sensitive lead flow. A responsible move protects working routes, preserves useful content and URLs where appropriate, tests forms and telephone links, and records the new control model. The objective is continuity and clearer ownership, not migration for its own sake. Any implementation begins only after the required access and a specific written scope are confirmed.",
        ],
      },
    ],
    serviceRoutes: [
      {
        title: "Ongoing SEO & Search Growth",
        body: "For a contractor with a sound foundation, ongoing work can improve priority service pages, local visibility, internal links, public-information consistency, and reporting around qualified customer actions. The work follows the services and locations the company actually wants to support; it does not promise rankings, inquiry volume, or project revenue.",
        href: "/services/ongoing-seo/",
        linkLabel: "Review ongoing search work",
      },
      {
        title: "Web Design & Website Redesign",
        body: "A focused improvement or larger redesign can clarify project types, service areas, proof, mobile estimate paths, and the handoff after an inquiry. Scope depends on the current system, supplied content, required integrations, and the smallest complete solution that addresses the diagnosed problem.",
        href: "/services/web-design-redesign/",
        linkLabel: "Review website improvement",
      },
      {
        title: "Website Migration & Provider Rescue",
        body: "When access or ownership is uncertain, provider rescue can map the domain, hosting, website, analytics, business profiles, forms, and other dependencies before a move. Assessment comes before implementation so working lead paths are not casually placed at risk.",
        href: "/services/provider-rescue/",
        linkLabel: "Review provider rescue",
      },
    ],
    evidencePlan: {
      artifactType: "An annotated, permissioned project-path example linking one service page, one contextual project record, the service-area statement, and the estimate handoff.",
      demonstrates: "How Boho would organise verified business information so a property decision-maker can assess service, location, proof, and next-step fit without exposing private customer details.",
      doesNotDemonstrate: "It is not presented as client work, a traffic or lead result, a ranking claim, a promise of project quality, or evidence that the same structure will produce a particular commercial outcome.",
    },
    faq: [
      {
        question: "Does more traffic automatically mean better contractor leads?",
        answer:
          "No. The useful question is whether the right property decision-makers can find the right service, verify fit, and reach an appropriate estimate or inspection path.",
      },
      {
        question: "Can project galleries help without publishing client details?",
        answer:
          "Yes, when the business has permission and supplies accurate context. Useful proof explains the project type, relevant constraints, and work shown without inventing outcomes or exposing private information.",
      },
      {
        question: "Do we need a separate page for every town and service?",
        answer:
          "No. A page should exist because it helps a customer understand a real service and a real operating area, not because a list of place names can be published. Boho reviews demand, service fit, available evidence, and the usefulness of each page before recommending new location content. Thin, repetitive pages can create maintenance work without improving the decision path.",
      },
      {
        question: "Can Boho repair a site when the current provider controls the accounts?",
        answer:
          "Boho can first assess known ownership, access, and dependencies. What happens next depends on what the business can lawfully recover and what the existing providers permit. No migration or account change is assumed. A written rescue or implementation scope is prepared only after the necessary control, risks, and continuity requirements are understood.",
      },
    ],
  },
  {
    id: "local-service",
    slug: "/industries/local-service-businesses/",
    anchor: "local-services",
    title: "Websites, Local SEO & Booking Growth for Local Service Businesses",
    metaDescription:
      "Boho helps local service businesses improve websites, bookings, calls, local search visibility, reviews, provider migrations, service pages, and ongoing growth.",
    eyebrow: "APPOINTMENT AND LOCAL SERVICES",
    heading: "Make the service easy to understand, trust, and book.",
    selectorAction: "Book or request service",
    selectorDescription:
      "Appointment, service-area, recurring, and location-based local services",
    recognition: [
      "Customers can choose a nearby provider in less time than it takes to understand a confusing service page.",
      "Local service businesses must quickly communicate service fit, location or service area, availability, people, policies, trust, and the correct action.",
    ],
    operatingModels: [
      {
        title: "Appointment-based",
        body: "Clinics, salons, wellness providers, tutors, fitness businesses, and pet care",
      },
      {
        title: "Service-area",
        body: "Cleaning, repair, mobile services, home visits, and on-location work",
      },
      {
        title: "Location-based or recurring",
        body: "Studios, membership businesses, repeat-service providers, and local organisations",
      },
    ],
    pathSteps: [
      "Local discovery",
      "Service fit",
      "Trust, location, and availability",
      "Call, book, visit, or request",
    ],
    comparison: {
      needs: "Is the service suitable, available, and convenient?",
      trust: "Team, reviews, policies, fit, location",
      action: "Call, booking, request, visit",
    },
    commonLeaks: [
      "Inconsistent business information",
      "Vague service fit",
      "Weak practitioner or team information",
      "Booking friction",
      "Poor mobile call paths",
      "Missing confirmation expectations",
      "Privacy-sensitive forms collecting too much",
      "Calls and bookings not measured consistently",
    ],
    inspect: [
      "Service and audience clarity",
      "Website and public-profile consistency",
      "Booking and contact systems",
      "Team and trust information",
      "Service-area representation",
      "Review context",
      "Measurement quality",
      "Regulated-claim and privacy boundaries",
    ],
    priceKeys: [
      "initial-review",
      "analyst-reporting",
      "ongoing-seo",
      "focused-improvement",
    ],
    childActionLabel: "Explore Local Service Businesses",
    reviewActionLabel: "Start the free local-service review",
    image: {
      src: "/visuals/homepage-industry-local-service-v2.webp",
      alt: "A professional groomer providing an appointment-based local service",
      width: 1067,
      height: 1600,
    },
    concept: {
      title: "Public-information consistency map",
      purpose:
        "A concept check connecting the website, public profile, booking route, calls, and location information.",
      labels: ["Website", "Public profile", "Booking", "Location"],
    },
    customerQuestions: [
      "Is this the right service for my situation?",
      "Is the provider available where and when I need them?",
      "Who will provide the service and what should I expect?",
      "Should I call, book online, visit, or send a request?",
    ],
    trustRequirements: [
      "Accurate team and service information",
      "Current policies and expectations",
      "Relevant review context",
      "Consistent location and contact information",
    ],
    valuableActions: [
      "Telephone call",
      "Appointment or consultation request",
      "Online booking",
      "Visit or recurring-service inquiry",
    ],
    operationalConstraints: [
      "Appointment capacity and service areas",
      "Location, practitioner, or equipment availability",
      "Privacy-sensitive information",
      "Regulated claims that require appropriate client review",
    ],
    detailSections: [
      {
        eyebrow: "Choose the operating model",
        title: "A booking business, a mobile service, and a local destination need different paths.",
        body: [
          "Local service is not one operating model. An appointment business may need a customer to choose a service and practitioner before finding a time. A mobile provider may first need to confirm the address and work type. A studio or membership business may need to explain schedules, access, recurring commitments, or what a first visit involves. A useful website starts by showing the right path instead of pushing every visitor toward the same button.",
          "Boho maps the public experience to the way the business can actually accept and deliver work. That includes the services offered, the people or locations involved, service areas, appointment capacity, the information needed before scheduling, and the safest form of contact. The objective is not more form submissions at any cost. It is a clear, low-friction route for customers the business is equipped to serve.",
        ],
        bullets: [
          "Use booking when a customer can responsibly choose and schedule without staff review.",
          "Use a request when service, location, or availability must be confirmed first.",
          "Use a telephone path when conversation is the clearest next step.",
          "Explain visit, cancellation, arrival, and confirmation expectations before the customer commits.",
        ],
      },
      {
        eyebrow: "Local discovery",
        title: "Keep the website and public business information in agreement.",
        body: [
          "A customer may encounter the business through a map result, a review platform, a directory, a social profile, or the website. If the name, location, hours, telephone number, service area, or booking route disagree, the customer has to decide which source to trust. Boho can compare the most important public surfaces, identify material conflicts, and establish which owned page should carry the fuller explanation.",
          "Consistency does not mean copying the same paragraph everywhere. Each surface has a different role. A public profile may support quick discovery, while the website explains service fit, people, policies, location details, and what happens next. Local search work should connect those roles using current information supplied and controlled by the business. It should not create locations, services, credentials, or availability that do not exist.",
        ],
      },
      {
        eyebrow: "Service fit and trust",
        title: "Answer the questions that come before a call or appointment.",
        body: [
          "Customers often want to know who provides the service, what it includes, where it is available, how to prepare, what policies apply, and whether a particular situation is a fit. Leaving those questions unanswered can create avoidable calls, abandoned bookings, or mismatched expectations. Boho can shape service, team, location, and policy pages around the information the business can verify and keep current.",
          "Trust material needs context. Reviews may show how past customers described their experience, but they do not guarantee a future result. Team biographies should explain relevant roles without inflated expertise. Credentials, affiliations, prices, policies, and accessibility details should appear only when supplied and verified. The site can be reassuring without making medical, legal, safety, performance, or other regulated claims that have not received appropriate client-supplied review.",
        ],
        bullets: [
          "Explain who or what determines service suitability.",
          "Show location, service-area, parking, access, or arrival information where relevant.",
          "Keep team roles, policies, prices, and hours attributable and current.",
          "Separate customer education from professional advice or regulated claims.",
        ],
      },
      {
        eyebrow: "Responsible intake",
        title: "Ask for enough to route the request, and no more.",
        body: [
          "A public website form should not become an accidental record system for sensitive information. For ordinary local services, a request may need a name, a safe contact route, the general service of interest, broad location fit, and scheduling context. It usually does not need identity documents, financial details, detailed health information, patient information, or other sensitive personal data. The form and surrounding copy should tell people what not to send as clearly as it tells them what to include.",
          "For health-related, regulated, or privacy-sensitive businesses, the public website should remain a general information and routing layer unless the client supplies and approves an appropriate compliant system. Boho does not ask a visitor to send health, patient, or other sensitive personal data through the standard intake form. Claims about treatment, suitability, safety, outcomes, licensing, or professional obligations require the appropriate client-supplied review before publication.",
        ],
      },
      {
        eyebrow: "Measurement with capacity in mind",
        title: "A useful report connects discovery to the actions the team can serve.",
        body: [
          "Calls, booking starts, completed booking confirmations, directions, and service requests can help show how people move through a local service site. Those signals must be named carefully. A click on a telephone number is not a completed call, a booking start is not an attended appointment, and a directions request is not a visit. Where systems do not share reliable data, the report should show the limitation rather than quietly combining unlike events.",
          "Capacity changes the interpretation. More requests for a fully booked practitioner, unavailable time, or out-of-area service may not help the business. Boho can combine website evidence with client feedback about service fit, scheduling, and inquiry quality, then recommend the smallest useful change. That might be clearer availability language, a better service page, corrected public information, a safer request form, or an ongoing local search program.",
        ],
      },
    ],
    serviceRoutes: [
      {
        title: "Ongoing SEO & Search Growth",
        body: "Ongoing work can improve priority service and location information, public-profile consistency, local discovery, review context, and reporting around calls, bookings, visits, or requests. Recommendations stay tied to real services and capacity, and do not promise rankings, appointment volume, or revenue.",
        href: "/services/ongoing-seo/",
        linkLabel: "Review local search support",
      },
      {
        title: "Web Design & Website Redesign",
        body: "Website work can clarify services, team roles, locations, policies, booking choices, telephone paths, and mobile use. Boho scopes the smallest complete solution after confirming the operating model, supplied content, privacy boundaries, and any third-party scheduling system that must remain in the path.",
        href: "/services/web-design-redesign/",
        linkLabel: "Review website improvement",
      },
      {
        title: "Digital Research, SEO Audits & Strategy",
        body: "A standalone review can compare the website, public profiles, customer path, service structure, and available measurement before implementation begins. It is useful when the business needs a documented diagnosis or must decide which problem deserves attention first.",
        href: "/services/research-audits-strategy/",
        linkLabel: "Review audit and research options",
      },
    ],
    evidencePlan: {
      artifactType: "A fictional public-information consistency worksheet showing one service, one location or service area, one booking or request route, and the supporting policy fields.",
      demonstrates: "How Boho checks whether a local customer receives a coherent, privacy-conscious explanation across discovery, service-fit, trust, and contact stages.",
      doesNotDemonstrate: "It is not a client record, a regulated compliance review, proof of appointments or visits, a review of clinical suitability, or a promise that consistency will produce rankings or bookings.",
    },
    faq: [
      {
        question: "Should every local service use online booking?",
        answer:
          "No. The right route depends on how the business qualifies, schedules, and delivers the service. A call or request may be more responsible for complex work.",
      },
      {
        question: "What should regulated or health-related businesses send?",
        answer:
          "Do not send health, patient, or other sensitive personal data through the intake form. Regulated public claims require appropriate client-supplied review before publication.",
      },
      {
        question: "Can Boho update every public listing for the business?",
        answer:
          "The right work depends on which profiles matter, which accounts the business controls, and what each platform permits. Boho can identify important inconsistencies and scope supported corrections, but does not assume access to third-party accounts or promise that an external platform will accept or display a change. Ownership and authority are confirmed before account work begins.",
      },
      {
        question: "How should we decide between calls, requests, and bookings?",
        answer:
          "Use the action that matches the real service and staffing process. Direct booking can suit a clearly defined appointment with known availability. A request can suit work that needs location, service, or practitioner review. A call can suit time-sensitive or conversational decisions. Boho can make the choices clear while keeping every route usable and setting honest follow-up expectations.",
      },
    ],
  },
  {
    id: "retail-hospitality",
    slug: "/industries/brick-and-mortar-retail-hospitality/",
    anchor: "retail-hospitality",
    title: "Websites & Local Visibility for Retail, Hospitality, Food and Venues",
    metaDescription:
      "Boho helps retail, hospitality, food, and venue businesses improve local information, websites, reservations, events, visits, pickup paths, and search visibility.",
    eyebrow: "RETAIL, HOSPITALITY, FOOD, AND VENUES",
    heading:
      "Turn discovery into a confident visit, reservation, event, or pickup.",
    selectorAction: "Visit or reserve",
    selectorDescription:
      "Retail, food, hospitality, venues, events, and physical destinations",
    recognition: [
      "Customers should not need three platforms to determine whether you are open, available, accessible, or worth the trip.",
      "Physical businesses must keep hours, directions, accessibility, parking, menus, products, events, reservations, pickup, and seasonal information current across the customer’s decision path.",
    ],
    operatingModels: [
      { title: "Local retail and showrooms", body: "Products, pickup, visits, and in-person advice" },
      { title: "Food, drink, and reservations", body: "Menus, current hours, availability, and booking" },
      { title: "Venues, galleries, and events", body: "Schedules, access, registration, and arrival planning" },
      { title: "Hospitality and destinations", body: "Fit, availability, travel decisions, and current information" },
    ],
    pathSteps: [
      "Discover",
      "Check current information",
      "Decide whether the visit fits",
      "Reserve, register, visit, or pick up",
    ],
    comparison: {
      needs: "Is it worth making the trip?",
      trust: "Current information, experience, reputation",
      action: "Directions, reservation, event, pickup",
    },
    commonLeaks: [
      "Conflicting hours",
      "Stale menus, products, or events",
      "Poor mobile navigation",
      "Missing parking or accessibility information",
      "Complicated reservation paths",
      "Weak location pages",
      "Unclear pickup or ordering",
      "Seasonal changes not reflected consistently",
    ],
    inspect: [
      "Website and profile consistency",
      "Location information",
      "Menu, product, and event structure",
      "Mobile arrival planning",
      "Reservation and order paths",
      "Directions and accessibility",
      "Local search presentation",
      "Measurement of visits and reservations where reasonably available",
    ],
    priceKeys: [
      "initial-review",
      "one-time-review",
      "focused-improvement",
      "new-website",
    ],
    childActionLabel: "Explore Retail & Hospitality",
    reviewActionLabel: "Start the free location-business review",
    image: {
      src: "/visuals/homepage-industry-retail-v2.webp",
      alt: "An active cafe interior with customers at the counter",
      width: 1067,
      height: 1600,
    },
    concept: {
      title: "Visit-decision timeline",
      purpose:
        "A concept sequence for checking current information before leaving, in transit, on arrival, and after a visit.",
      labels: ["Before leaving", "In transit", "Arrival", "Follow-up"],
    },
    customerQuestions: [
      "Are the hours, menu, products, events, and availability current?",
      "Can I get there, park, enter, reserve, or collect an order?",
      "Does the experience fit the occasion and the people coming with me?",
      "What should I do before I leave?",
    ],
    trustRequirements: [
      "Current and consistent public information",
      "Clear arrival and accessibility details",
      "Useful photography and reputation context",
      "Reliable reservation, event, or pickup instructions",
    ],
    valuableActions: [
      "Directions request",
      "Reservation or registration",
      "In-person visit",
      "Pickup or event action",
    ],
    operationalConstraints: [
      "Seasonal hours and rapidly changing information",
      "Multiple locations or event calendars",
      "Third-party reservation and ordering platforms",
      "Accessibility, parking, capacity, and arrival details",
    ],
    detailSections: [
      {
        eyebrow: "The visit decision",
        title: "The website has to earn the trip before it can support the experience.",
        body: [
          "A physical business asks the customer to spend time getting there. Before leaving, that person may need to confirm current hours, location, parking, accessibility, product or menu fit, reservation requirements, event timing, pickup instructions, or whether a group can be accommodated. If those answers are scattered across several platforms or contradicted by an old page, the easiest decision may be not to go.",
          "Boho treats the site as the owned center of that decision path. The most useful page depends on the business: a store location, a current menu, a venue calendar, a reservation explanation, a collection or showroom page, or a concise arrival guide. The objective is to make the next physical action understandable without pretending the website can replace live inventory, seating, weather, event, or operating information that changes elsewhere.",
        ],
        bullets: [
          "Show the information a customer needs before leaving home.",
          "Make directions, telephone, reservation, pickup, and event routes easy to use on mobile.",
          "Name the authoritative source for information that changes rapidly.",
          "Explain parking, entrances, accessibility, age, capacity, or arrival limits when supplied.",
        ],
      },
      {
        eyebrow: "Current information",
        title: "Design for change instead of letting seasonal details decay.",
        body: [
          "Hours, menus, products, exhibitions, tickets, and events can change much faster than the surrounding website. A durable structure separates stable information from updates that need regular attention. It also gives the business a practical maintenance routine: who owns each field, which surface is updated first, and what should happen when a third-party reservation or ordering platform disagrees.",
          "Boho can identify the high-risk facts that influence a visit and make their update paths clearer. A seasonal notice should not hide an ordinary location page. An old event should not continue to look current. A PDF should not be the only usable version of a menu if customers cannot read it comfortably on a telephone. The design and content system should reduce the chance that yesterday's information becomes today's broken promise.",
        ],
      },
      {
        eyebrow: "Local discovery and destinations",
        title: "Help people recognise the right location, occasion, and experience.",
        body: [
          "Local visibility is more than appearing for a broad category. A customer may be choosing a lunch stop, a special-occasion reservation, a nearby showroom, an accessible event, a pickup option, or a venue with a particular atmosphere. Clear location and experience pages can answer those decisions with real information: address, hours, offerings, current imagery, access, reservations, pickup, and the relevant policies.",
          "Multiple locations need deliberate separation. Each page should represent a real place and help a customer understand what is different there. Repeating the same text under a different address does little for the visitor and becomes hard to maintain. Boho can align the website with verified public business information and connect related products, menus, events, and guides without inventing local claims or implying that every offering is available at every location.",
        ],
        bullets: [
          "Give each real location an accurate arrival and action path.",
          "Connect events, menus, products, and offers to the place where they apply.",
          "Use photography to clarify the setting, not to imply an unavailable experience.",
          "Retire or clearly archive expired events and seasonal information.",
        ],
      },
      {
        eyebrow: "Reservations, events, and pickup",
        title: "Make the handoff to another platform feel intentional.",
        body: [
          "Restaurants, venues, and retailers often depend on systems they do not fully control. A reservation link, ticket platform, ordering service, or delivery marketplace may be necessary, but the website should explain what the customer is about to do and where responsibility changes. Links need to reach the correct location, event, menu, or pickup flow, and the return path should remain clear if the customer needs policies or contact information.",
          "Boho can inspect those handoffs, reduce duplicate choices, and add plain-language context around them. It cannot guarantee the availability, performance, policies, or data practices of an external service. Where an integration or custom connection is needed, feasibility and access are confirmed before it is scoped. A simple, reliable link may be more responsible than a fragile feature that appears seamless until it fails during a busy period.",
        ],
      },
      {
        eyebrow: "Evidence and reporting",
        title: "Use digital signals without pretending they count every physical customer.",
        body: [
          "Directions clicks, reservation starts, event registrations, pickup actions, menu views, and calls can help describe interest. They do not necessarily show arrivals, completed reservations, in-store purchases, party size, or revenue. Third-party platforms may report different totals or expose only limited information. Boho labels each signal according to what it actually records and documents gaps instead of converting all activity into a made-up visit number.",
          "The business can add the operational context the website cannot see: changes in foot traffic, reservation quality, popular questions, missed calls, sold-out events, or products frequently requested in person. Together, those observations can guide focused improvements. The next step might be correcting hours, rebuilding a location page, simplifying a reservation handoff, clarifying access information, or establishing an ongoing local visibility and maintenance rhythm.",
        ],
      },
    ],
    serviceRoutes: [
      {
        title: "Web Design & Website Redesign",
        body: "Website work can organise locations, menus, products, events, arrival details, reservations, pickup, and mobile actions around the real visit decision. Boho scopes the smallest complete improvement after identifying which information is stable, which changes often, and which external platforms remain responsible for transactions.",
        href: "/services/web-design-redesign/",
        linkLabel: "Review website improvement",
      },
      {
        title: "Ongoing SEO & Search Growth",
        body: "Ongoing work can improve local discovery, location pages, public-information consistency, internal links, seasonal updates, and reporting around available reservation, direction, event, and pickup signals. It does not promise foot traffic, reservations, search positions, or sales.",
        href: "/services/ongoing-seo/",
        linkLabel: "Review ongoing search work",
      },
      {
        title: "Digital Research, SEO Audits & Strategy",
        body: "A focused review can compare location information, mobile arrival planning, website structure, public profiles, reservation or ordering handoffs, and available measurement. The documented findings help the business choose a repair, focused improvement, or larger rebuild without assuming the answer in advance.",
        href: "/services/research-audits-strategy/",
        linkLabel: "Review audit and research options",
      },
    ],
    evidencePlan: {
      artifactType: "A fictional visit-readiness board comparing one location's owned page, public profile, current-hours field, arrival notes, and reservation or pickup handoff.",
      demonstrates: "How Boho can trace the facts and actions a customer may check before travel, identify a contradiction, and document which source should be maintained.",
      doesNotDemonstrate: "It is not a client property, proof of visits or revenue, a live availability feed, a guarantee that an external platform will work, or evidence that corrected information will produce a particular ranking or sales result.",
    },
    faq: [
      {
        question: "Is a social profile enough for a physical business?",
        answer:
          "It can support discovery, but the business still needs a dependable place for current information, ownership, policies, and the actions customers should take.",
      },
      {
        question: "Can visits always be measured accurately?",
        answer:
          "No. Boho uses the signals reasonably available, explains their limits, and avoids turning directions or reservation clicks into unsupported claims about completed visits or revenue.",
      },
      {
        question: "How should changing hours, menus, or events be handled?",
        answer:
          "The site should distinguish stable information from fields that need regular updates and make ownership clear. Boho can improve the structure and document a maintenance path, but the business remains the source for current operating details. External platforms may update on their own schedules, so important discrepancies and the authoritative owned source should be made visible.",
      },
      {
        question: "Can Boho replace our reservation or ordering platform?",
        answer:
          "Not automatically. Boho can inspect the customer handoff, clarify links, and assess whether repair, integration, or replacement is warranted. A platform change depends on access, contracts, data portability, transaction needs, staff process, and technical feasibility. It requires a specific written scope; the industry review does not imply that a migration is available or advisable.",
      },
    ],
  },
  {
    id: "ecommerce",
    slug: "/industries/online-retail-ecommerce/",
    anchor: "ecommerce",
    title: "Ecommerce SEO, Product Discovery & Website Improvement",
    metaDescription:
      "Boho helps ecommerce and online retail businesses improve product discovery, category structure, technical health, product information, checkout paths, measurement, and website clarity.",
    eyebrow: "ECOMMERCE AND PRODUCT BUSINESSES",
    heading: "Help the right product get found, understood, trusted, and purchased.",
    selectorAction: "Buy a product",
    selectorDescription:
      "Ecommerce, online retail, catalogs, and hybrid product businesses",
    recognition: [
      "Good products cannot compensate for a catalog customers and search systems struggle to understand.",
      "Ecommerce work should connect category structure, product information, internal discovery, technical health, customer trust, checkout, and reliable measurement.",
    ],
    pathSteps: [
      "Category or product discovery",
      "Comparison",
      "Product, availability, and policy clarity",
      "Cart, checkout, and purchase",
    ],
    comparison: {
      needs: "Is this the right product and safe to purchase?",
      trust: "Product clarity, usability, policies, proof",
      action: "Cart, checkout, purchase",
    },
    commonLeaks: [
      "Categories reflecting internal inventory rather than customer intent",
      "Important products buried in navigation",
      "Incomplete product decision information",
      "Duplicate or confusing variant URLs",
      "Unclear shipping, returns, or availability",
      "Checkout friction",
      "Broken or conflicting analytics",
      "Repeated manual catalog work",
    ],
    inspect: [
      "Catalog architecture",
      "Category and product discovery",
      "Product-page information",
      "Internal links and navigation",
      "Technical access and duplicate handling",
      "Policies and trust",
      "Cart and checkout signals",
      "Data quality and platform disagreement",
    ],
    priceKeys: [
      "initial-review",
      "analyst-reporting",
      "one-time-review",
      "focused-improvement",
    ],
    ownershipNote:
      "Ecommerce does not qualify for the informational-website minimum. Builds, checkout systems, account functions, large migrations, and payment-enabled projects receive a specific quote.",
    childActionLabel: "Explore Ecommerce",
    reviewActionLabel: "Start the free ecommerce review",
    image: {
      src: "/visuals/homepage-industry-ecommerce-v2.webp",
      alt: "A small ecommerce business packing a customer order beside a laptop",
      width: 1600,
      height: 1068,
    },
    concept: {
      title: "Catalog relationship map",
      purpose:
        "A concept map showing how customer language, categories, products, variants, and policies support discovery and comparison.",
      labels: ["Customer need", "Category", "Product", "Policy"],
    },
    customerQuestions: [
      "Can I find the right category or product without knowing the store’s internal terms?",
      "Can I compare the options and understand variants?",
      "Are availability, shipping, returns, and policies clear?",
      "Can I complete the purchase without unnecessary friction?",
    ],
    trustRequirements: [
      "Complete product decision information",
      "Clear policies and availability",
      "Usable navigation and internal discovery",
      "Honest measurement with disagreements documented",
    ],
    valuableActions: [
      "Product discovery",
      "Cart addition",
      "Checkout progression",
      "Completed purchase",
    ],
    operationalConstraints: [
      "Catalog size, variants, and inventory changes",
      "Platform and payment boundaries",
      "Shipping, returns, tax, and account functions",
      "Multiple analytics sources that may disagree",
    ],
    detailSections: [
      {
        eyebrow: "Catalog before campaigns",
        title: "Make it possible to find the product before spending more to promote it.",
        body: [
          "An online store can attract attention and still lose customers inside its own catalog. Categories may follow an internal stock system rather than the way people shop. Similar products may be split without a useful comparison. Filters may expose too many choices or none of the distinctions that matter. Search may use different language from product titles. Before adding more campaigns or content, Boho can trace how a customer moves from a need to a category, a product, a variant, and the information required to buy.",
          "The right structure depends on the catalog. A small specialist store may need a few strong collections and buying explanations. A larger catalog may need careful category relationships, filters, internal search, product families, and rules for discontinued or unavailable items. The goal is not to force every possible search phrase into the navigation. It is to make the real inventory understandable to customers and accessible to search systems without creating duplicate, empty, or misleading paths.",
        ],
        bullets: [
          "Organise around customer choices while preserving workable catalog operations.",
          "Connect related categories, products, variants, and supporting guides deliberately.",
          "Handle unavailable and discontinued products with a clear customer path.",
          "Keep platform-generated URLs and duplicate views under review.",
        ],
      },
      {
        eyebrow: "Product decision information",
        title: "A product page should answer the purchase decision, not merely hold a description.",
        body: [
          "Customers may need dimensions, materials, compatibility, care, usage, included parts, variant differences, availability, delivery, pickup, returns, or other product-specific facts. Which details matter depends on what is sold. Boho can help create a repeatable information hierarchy so customers can compare choices and the business can maintain the catalog without rewriting every page from scratch.",
          "All product claims must come from a verified source. Descriptions should not invent performance, sustainability, origin, safety, compatibility, certifications, scarcity, or customer outcomes. Reviews and supplied imagery can support confidence, but they should not substitute for accurate specifications and policies. If important information is unknown, the responsible choice may be to omit the field or identify what the customer needs to confirm before purchase.",
        ],
      },
      {
        eyebrow: "Technical access and duplication",
        title: "Protect useful product paths from avoidable platform clutter.",
        body: [
          "Ecommerce platforms often create many addresses for filters, sorting, tags, variants, collections, tracking, and search results. Some are useful to customers; others repeat the same material or make important products harder for search systems to interpret. Boho can inspect which pages are reachable, which ones are intended for discovery, and where internal links, metadata, redirects, canonical signals, or index controls may need attention.",
          "Technical work begins with evidence because platform rules differ and changes can affect navigation, feeds, advertising, checkout, or integrations. Boho does not apply a generic cleanup recipe to a live store. The work is scoped around the verified platform, theme, apps, catalog process, and account access. Changes that touch payments, accounts, tax, inventory, shipping, or other transaction systems require explicit feasibility review and a specific written engagement.",
        ],
        bullets: [
          "Identify the product and category pages intended to earn discovery.",
          "Document duplicate paths before changing how a platform generates or exposes them.",
          "Preserve working feeds, transactions, and customer-account functions.",
          "Test important discovery and purchase paths after each bounded change.",
        ],
      },
      {
        eyebrow: "Cart, checkout, and policy clarity",
        title: "Reduce uncertainty before the customer reaches a transaction.",
        body: [
          "A customer should not have to begin checkout to discover a basic shipping, pickup, return, availability, or payment expectation. Important policy information should be easy to reach from product and cart decisions while remaining accurate to the business and platform. Product pages should also distinguish selectable variants, unavailable options, subscriptions, bundles, or other purchase types in plain language.",
          "Boho can review the path into checkout and report visible friction, broken links, unclear handoffs, and mobile usability problems. A complete checkout rebuild, payment change, customer account function, subscription system, catalog migration, or large integration is not covered by an informational website minimum. Those requirements receive a specific written scope and quote after access, risk, and technical feasibility are confirmed.",
        ],
      },
      {
        eyebrow: "Measurement without false certainty",
        title: "Keep product, platform, and analytics evidence in their proper roles.",
        body: [
          "Product views, internal searches, cart additions, checkout starts, and recorded purchases can help reveal where the shopping path changes. Different systems may count them differently. Consent choices, browser restrictions, devices, payment redirects, marketplace activity, returns, and reporting windows can all create disagreement. Boho can document event definitions and compare sources without silently treating one dashboard as complete truth.",
          "The store's operational data remains essential. Search terms that return nothing, customer questions, high-return items, unavailable variants, support requests, and merchandising priorities can explain behavior the website report cannot. Together, that evidence can guide a focused next move: category repair, better product information, internal links, technical cleanup, measurement correction, or a separately scoped redesign. The record should also name the reporting window, important exclusions, and known disagreements before a decision is made. It cannot prove why every person bought or guarantee that a change will increase sales.",
        ],
      },
    ],
    serviceRoutes: [
      {
        title: "Digital Research, SEO Audits & Strategy",
        body: "A standalone review can examine catalog structure, priority categories and products, technical access, product information, policy clarity, shopping paths, and measurement disagreement. It creates a documented basis for deciding what to repair before any store change is assumed.",
        href: "/services/research-audits-strategy/",
        linkLabel: "Review ecommerce audit options",
      },
      {
        title: "Web Design & Website Redesign",
        body: "Focused website work may improve catalog navigation, product-page hierarchy, mobile discovery, policy access, and the path into checkout. Ecommerce builds, account functions, payments, major migrations, and transaction systems are specifically scoped and quoted after platform access and feasibility are confirmed.",
        href: "/services/web-design-redesign/",
        linkLabel: "Review ecommerce website work",
      },
      {
        title: "Custom Web & Digital Solutions",
        body: "When the diagnosed problem is a missing workflow, catalog tool, data connection, or operational interface, a custom solution may be considered. Boho first checks whether the existing platform or a mature service can solve it more safely. Any build requires a specific written scope, verified access, and clear ownership boundaries.",
        href: "/services/custom-digital-solutions/",
        linkLabel: "Review custom solution boundaries",
      },
    ],
    evidencePlan: {
      artifactType: "A fictional catalog-decision map connecting a customer need to one category, two comparable product records, variant facts, policy information, and the handoff into checkout.",
      demonstrates: "How Boho would inspect findability, comparison, verified product information, and decision continuity while keeping platform and transaction boundaries visible.",
      doesNotDemonstrate: "It is not a client store, a functioning checkout, a platform integration, a conversion or revenue result, proof of product quality, or an offer to deliver ecommerce work without a specific written quote.",
    },
    faq: [
      {
        question: "Does the public website minimum cover a complete ecommerce build?",
        answer:
          "No. Ecommerce does not qualify for the $1,500 minimum. Payment, account, catalog, checkout, and migration requirements need a specific written scope and quote.",
      },
      {
        question: "Can analytics prove why every purchase happened?",
        answer:
          "No. Measurement can improve visibility into customer paths, but platform limits, consent, device changes, and source disagreement create uncertainty that should be documented.",
      },
      {
        question: "Should every product and filter be available to search systems?",
        answer:
          "No. Some pages support useful product discovery, while others are temporary combinations, duplicate views, internal results, or low-value platform output. The right treatment depends on the store, customer path, platform behavior, and existing search evidence. Boho documents the intended role before recommending links, metadata, canonical signals, redirects, or index controls.",
      },
      {
        question: "Can Boho change payments, checkout, or customer accounts during the review?",
        answer:
          "No. The review can identify visible friction and define questions, but transactional systems are not changed as part of an industry assessment. Payment, checkout, account, subscription, inventory, tax, shipping, integration, and migration work requires verified access, technical feasibility, risk review, and a specific written engagement and quote.",
      },
    ],
  },
  {
    id: "professional-b2b",
    slug: "/industries/professional-b2b-services/",
    anchor: "professional-b2b",
    title: "Websites, SEO & Qualified Inquiries for Professional and B2B Services",
    metaDescription:
      "Boho helps professional and B2B firms improve positioning, service clarity, educational content, search visibility, evidence, qualified inquiry paths, and website credibility.",
    eyebrow: "PROFESSIONAL AND B2B SERVICES",
    heading: "Make the expertise clear enough for the right buyer to continue.",
    selectorAction: "Start a qualified conversation",
    selectorDescription:
      "Professional firms, consultants, specialist providers, and B2B businesses",
    recognition: [
      "Serious expertise should not be hidden behind vague “solutions” language and an unqualified contact form.",
      "Professional and B2B buyers may need to understand the problem, fit, people, method, proof, risk, process, and next step before beginning a conversation.",
    ],
    pathSteps: [
      "Referral or search",
      "Service and problem fit",
      "People, method, and evidence",
      "Qualified conversation or proposal request",
    ],
    comparison: {
      needs: "Does this expertise fit the problem?",
      trust: "Positioning, people, method, evidence",
      action: "Qualified inquiry or proposal request",
    },
    commonLeaks: [
      "Vague positioning",
      "Services organised around internal terminology",
      "Unsupported authority claims",
      "Thin educational content",
      "Proof disconnected from the offer",
      "Generic inquiry forms",
      "No path for multiple stakeholders",
      "Referral visitors unable to validate the firm quickly",
    ],
    inspect: [
      "Positioning",
      "Service architecture",
      "Buyer questions",
      "Team and operator information",
      "Method and proof",
      "Educational content",
      "Qualified inquiry design",
      "Referral and branded-search paths",
    ],
    priceKeys: [
      "initial-review",
      "one-time-review",
      "ongoing-seo",
      "focused-improvement",
      "new-website",
    ],
    childActionLabel: "Explore Professional & B2B Services",
    reviewActionLabel: "Start the free professional-services review",
    image: {
      src: "/visuals/homepage-industry-b2b-v2.webp",
      alt: "A professional-services team reviewing work together around a table",
      width: 1600,
      height: 1068,
    },
    concept: {
      title: "Buyer and proof architecture",
      purpose:
        "A concept map connecting buyer questions, responsible people, the working method, evidence, and the qualified next step.",
      labels: ["Buyer question", "People", "Method", "Evidence"],
    },
    customerQuestions: [
      "Does this firm understand the problem and the stakes?",
      "Who will do the work and how do they work?",
      "What evidence supports the recommendation without overstating results?",
      "What should our stakeholders do next?",
    ],
    trustRequirements: [
      "Specific positioning and service fit",
      "Visible people and technical responsibility",
      "A clear method and inspectable evidence",
      "A qualified next step for multiple stakeholders",
    ],
    valuableActions: [
      "Qualified inquiry",
      "Consultation request",
      "Proposal request",
      "Referral validation and follow-up",
    ],
    operationalConstraints: [
      "Longer decisions and multiple stakeholders",
      "Sensitive or confidential subject matter",
      "Complex services that need plain language",
      "Proof boundaries and regulated or professional claims",
    ],
    detailSections: [
      {
        eyebrow: "Make the expertise legible",
        title: "A serious buyer should not have to decode what the firm actually does.",
        body: [
          "Professional and business-to-business websites often use broad words such as solutions, transformation, innovation, or advisory without naming the problem, the people served, or the work performed. That language may sound polished internally while giving a buyer very little to evaluate. Boho can help organise the site around specific services, buyer situations, responsible people, working method, evidence, limits, and next steps without flattening a complex practice into a slogan.",
          "Plain language does not mean oversimplifying the expertise. It means giving each level of the buying group an entry point. An executive may need the commercial purpose and risk. A technical reviewer may need assumptions, method, and delivery boundaries. A prospective day-to-day contact may need to understand collaboration, inputs, and what happens first. A clear architecture lets those readers reach the depth they need without forcing every detail into the opening page.",
        ],
        bullets: [
          "Name the buyer problem and the service response before introducing internal terminology.",
          "Show who is responsible for the work and what the client must provide.",
          "Explain the method at a useful level without exposing confidential material.",
          "State exclusions, dependencies, and next steps where they affect fit.",
        ],
      },
      {
        eyebrow: "Multiple stakeholders",
        title: "Support the internal conversation that happens before an inquiry.",
        body: [
          "A buyer may discover the firm and then share it with a partner, manager, procurement lead, technical reviewer, or other stakeholder. Each person may arrive on a different page and look for different evidence. If positioning changes from page to page, people and methods are hidden, or proof cannot be connected to a service, the buyer has to explain the firm on its behalf. That creates avoidable work at a point where confidence is still fragile.",
          "Boho can map likely questions across the decision group and build a coherent route among services, team information, methods, educational material, evidence, and inquiry expectations. The site should make it easy to send a relevant page to another reviewer. It should also distinguish a useful early conversation from a request for a formal proposal, because those actions require different context and may follow different internal processes.",
        ],
      },
      {
        eyebrow: "Evidence without theatre",
        title: "Show the reasoning and boundaries behind the work.",
        body: [
          "Professional proof can include permissioned case material, named methods, sample deliverables, credentials, publications, process explanations, or other artifacts the firm can substantiate. A list of logos, an unattributed claim, or a generic success percentage does not explain what was done or whether it relates to the service being considered. Boho helps connect verified evidence to the buyer question it answers while preserving client confidentiality and any professional or regulatory review requirements.",
          "Good evidence also says what it cannot establish. A sample deliverable can demonstrate structure and analytical care, but not a client's outcome. A past engagement can show the kind of problem addressed, but not guarantee the same result elsewhere. A credential can verify training or status, but not universal suitability. Clear limitations make the proof more useful because the buyer can inspect it without being asked to accept an inflated conclusion.",
        ],
        bullets: [
          "Use permissioned, attributable evidence and remove confidential details.",
          "Connect proof to a specific service, method, or buyer question.",
          "Avoid unsupported authority, market-leadership, outcome, and exclusivity claims.",
          "Require appropriate client-supplied review for regulated or professional statements.",
        ],
      },
      {
        eyebrow: "Search and education",
        title: "Publish material that helps a buyer think, not content made to fill a calendar.",
        body: [
          "Complex services can earn discovery through precise commercial pages and useful educational material. A service page should explain fit and the engagement path. A guide can explain a decision, risk, method, or common misunderstanding in greater depth. Internal links should help a reader move between those purposes. Publishing many shallow articles around loosely related phrases can dilute the firm's position and create a maintenance burden without supporting a serious buying decision.",
          "Boho can research buyer language, inspect existing content, identify gaps, and design a manageable system for creation, review, ownership, and updates. The firm remains the source of professional judgment and factual claims. Search visibility is treated as a route into a trustworthy explanation, not a substitute for expertise. No content program can guarantee rankings, authority, qualified inquiries, or a particular sales cycle.",
        ],
      },
      {
        eyebrow: "Qualified next steps",
        title: "Ask for the context needed to continue responsibly.",
        body: [
          "A generic contact form often produces a generic handoff. A better inquiry route can ask which service or problem is involved, the organisation context, the desired next step, relevant timing, and the safest way to respond. It should avoid collecting confidential, privileged, regulated, or otherwise sensitive material before an appropriate relationship and system exist. The surrounding page should explain whether the next step is an initial review, a consultation request, a discovery conversation, or a proposal discussion.",
          "Measurement can follow engagement with important services, people, methods, proof, guides, and inquiry paths, but those events need careful interpretation. A form submission is not a qualified opportunity, a document view is not buying intent, and a branded search is not proof that one page caused a referral. Boho combines available website evidence with the firm's own feedback about fit and progress, then documents uncertainty rather than manufacturing an attribution story.",
        ],
      },
    ],
    serviceRoutes: [
      {
        title: "Digital Research, SEO Audits & Strategy",
        body: "A focused review can examine positioning, buyer questions, service structure, content, people, proof, search visibility, inquiry paths, and available measurement. The result is a documented diagnosis that helps the firm choose the smallest useful next move before implementation is assumed.",
        href: "/services/research-audits-strategy/",
        linkLabel: "Review research and audit options",
      },
      {
        title: "Web Design & Website Redesign",
        body: "Website work can make complex services, people, methods, evidence, educational material, and qualified inquiry routes easier to understand. Scope depends on the current system, supplied and approved content, professional review needs, integrations, and the smallest complete solution that addresses the diagnosed gap.",
        href: "/services/web-design-redesign/",
        linkLabel: "Review website improvement",
      },
      {
        title: "Ongoing SEO & Search Growth",
        body: "Ongoing work can strengthen priority service pages, useful educational content, technical health, internal links, search discovery, and reporting around qualified customer paths. It does not promise rankings, authority, proposal volume, sales-cycle changes, or revenue.",
        href: "/services/ongoing-seo/",
        linkLabel: "Review ongoing search work",
      },
    ],
    evidencePlan: {
      artifactType: "A fictional buyer-question matrix connecting one business problem to an executive question, a technical question, a service explanation, a method note, a sample artifact, and a qualified inquiry route.",
      demonstrates: "How Boho would structure a multi-stakeholder validation path and label the role and limitation of each evidence item without disclosing confidential client material.",
      doesNotDemonstrate: "It is not client work, proof of professional suitability, a case result, a sales or attribution metric, regulated advice, or a guarantee that the structure will create qualified opportunities.",
    },
    faq: [
      {
        question: "Should a professional-services site explain every technical detail?",
        answer:
          "No. It should explain enough for the right buyer to understand fit, people, method, evidence, risk, and the next step without hiding behind jargon.",
      },
      {
        question: "How should referral traffic be treated?",
        answer:
          "A referred buyer often arrives to validate the firm. Clear positioning, people, method, and evidence should make that validation easier without inventing authority claims.",
      },
      {
        question: "What counts as credible proof for a complex service?",
        answer:
          "That depends on what the firm can verify and publish. Permissioned case context, named people, a clear method, sample artifact, current credential, or useful publication may answer different buyer questions. Each item should be attributable, connected to the relevant service, and honest about its limits. Boho does not invent results, clients, metrics, authority, or confidential details.",
      },
      {
        question: "Should the inquiry form ask for a full project brief?",
        answer:
          "Usually not at the first public step. The form should gather enough context to route and prepare a responsible response without inviting confidential, privileged, regulated, or sensitive material. A fuller brief can follow through an appropriate process once fit, authority, and information-handling expectations are established in a specific engagement.",
      },
    ],
  },
];

export const industryModelsBySlug = new Map(
  industryModels.map((model) => [model.slug, model]),
);

export const hybridReviewHref = "/start/?business_model=hybrid";

export function industryReviewHref(model: IndustryModel) {
  return `/start/?business_model=${model.id}`;
}
