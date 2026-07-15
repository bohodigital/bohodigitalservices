import type { PageConfig } from "./types";

export const audiencePages: PageConfig[] = [
  {
    slug: "/industries/",
    title: "Industries | Websites, SEO & Lead Generation by Business Type",
    metaDescription:
      "Boho adapts website design, SEO, migration, research, and lead-generation work for contractors, local services, retail, hospitality, ecommerce, and professional firms.",
    eyebrow: "Industries",
    headline: "Different businesses need different success signals.",
    intro: [
      "Boho does not force every company into the same website or SEO plan. We study how the business earns attention, trust, and customer action, then build around that.",
    ],
    theme: "editorial",
    primaryCta: { label: "Find Your Business Type", href: "#business-types" },
    secondaryCta: { label: "Get a Visibility Check", href: "/start/" },
    sections: [
      {
        eyebrow: "Business-model fit",
        title: "A strategy that ignores the business model is not a strategy.",
        body: [
          "A contractor selling large projects does not need the same website as a café. A clinic does not need the same conversion path as an ecommerce store. A boutique retailer does not need the same search system as a restoration company. A B2B consultant does not earn trust the same way a plumber does.",
          "The category helps us ask better questions. The actual strategy comes from the market, offer, customer, and value of the action.",
        ],
        layout: "split",
        tone: "parchment",
      },
      {
        id: "business-types",
        eyebrow: "Five buyer buckets",
        title: "Start with the economics and customer behavior.",
        note: "These categories are useful starting points, not one-size-fits-all prescriptions.",
        layout: "grid",
        items: [
          {
            title: "Home Improvement & Contractors",
            body: "For project-based and trade businesses where one strong lead can be worth thousands. Boho helps make high-value services easier to find, understand, trust, and request through stronger service pages, project proof, local visibility, quote paths, reviews, migration, and ongoing growth.",
            href: "/industries/home-improvement-contractors/",
            linkLabel: "Explore Home Improvement & Contractors",
          },
          {
            title: "Local Service Businesses",
            body: "For appointment-based, service-area, and trust-heavy businesses that need calls, bookings, visits, or inquiries. Boho aligns service clarity, local visibility, trust, contact paths, and the website with the way the business actually operates.",
            href: "/industries/local-service-businesses/",
            linkLabel: "Explore Local Service Businesses",
          },
          {
            title: "Brick-and-Mortar Retail & Hospitality",
            body: "For businesses that depend on discovery, reputation, reservations, directions, events, and in-person attention. Boho makes local information, products, menus, events, offers, and visits easier to discover and act on.",
            href: "/industries/brick-and-mortar-retail-hospitality/",
            linkLabel: "Explore Retail & Hospitality",
          },
          {
            title: "Online Retail & Ecommerce",
            body: "For stores that need product discovery, category clarity, technical health, trust, and a better path from browsing to purchase. Boho improves structure, content, internal discovery, measurement, and conversion without turning every page into a keyword landfill.",
            href: "/industries/online-retail-ecommerce/",
            linkLabel: "Explore Ecommerce",
          },
          {
            title: "Professional & B2B Services",
            body: "For firms that need credibility, clear positioning, useful education, and qualified conversations. Boho helps explain complex services, demonstrate credible expertise, improve search visibility, and create better inquiry paths.",
            href: "/industries/professional-b2b-services/",
            linkLabel: "Explore Professional & B2B Services",
          },
        ],
      },
      {
        eyebrow: "The next question",
        title: "Your category is the beginning, not the diagnosis.",
        body: [
          "The real work is understanding the market, the customer, the valuable action, and the weakest part of the current digital system.",
        ],
        items: [
          {
            title: "Start with a focused review",
            body: "Share the website and the customer action that matters most.",
            href: "/start/",
            linkLabel: "Get a Visibility Check",
          },
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/industries/home-improvement-contractors/",
    title: "Websites, Local SEO & Lead Generation for Contractors and Home Improvement",
    metaDescription:
      "Boho helps contractors and home improvement businesses improve websites, local SEO, quote paths, service pages, provider migrations, reviews, and ongoing growth.",
    eyebrow: "Home Improvement & Contractors",
    headline: "When one project can be worth thousands, lead quality matters more than decorative traffic.",
    intro: [
      "Boho helps contractors and home improvement companies strengthen the websites, local signals, trust, and estimate paths that support serious project inquiries.",
    ],
    theme: "mosaic",
    primaryCta: { label: "Review My Market", href: "/start/" },
    secondaryCta: {
      label: "Plan a Better Website",
      href: "/services/website-design-redesign/",
    },
    sections: [
      {
        eyebrow: "Market reality",
        title: "High-value local work creates a different optimization problem.",
        body: [
          "A roofing, remodeling, restoration, HVAC, plumbing, electrical, landscaping, flooring, or similar project may carry meaningful revenue. The website does not need to attract everyone. It needs to help the right homeowner or property decision-maker understand the service, trust the company, and request the next step.",
          "That often makes service-page quality, service-area clarity, project proof, reviews, mobile contact paths, and local visibility more important than a large volume of low-intent content.",
          "Boho studies which services matter most, how competitors present themselves, and where the path from search to estimate is weak.",
        ],
        layout: "split",
        tone: "parchment",
      },
      {
        eyebrow: "Annotated project path",
        title: "Common success signals",
        quote: "The strongest signal depends on how the company sells, schedules, qualifies, and closes work.",
        layout: "steps",
        items: [
          {
            title: "Get discovered for the right work",
            body: "Visibility for high-value services, Google Business Profile actions, service-area page engagement, and branded search can help show whether serious demand is finding the business.",
          },
          {
            title: "Earn confidence",
            body: "Project-gallery engagement, proof, review quality, and clear service information help a property decision-maker evaluate fit.",
          },
          {
            title: "Reach the estimate path",
            body: "Qualified phone calls, estimate requests, consultation or inspection bookings, lead-source clarity, and lead quality by service are closer to the business event that matters.",
          },
        ],
      },
      {
        eyebrow: "What Boho may improve",
        title: "Strengthen the full path, not one isolated page.",
        layout: "grid",
        items: [
          {
            title: "Website and offer",
            body: "Service hierarchy, high-value service pages, project pages, process explanations, financing or warranty information when real, calls to action, and mobile usability.",
          },
          {
            title: "Local visibility",
            body: "Business-profile alignment, service-area pages, local competitors, reviews, public information, citations, and relevant local content.",
          },
          {
            title: "Trust",
            body: "Project proof, team and ownership information, credentials where real, insurance or licensing statements where verified, warranties or guarantees where real, reviews, process, and customer expectations.",
          },
          {
            title: "Lead path",
            body: "Click-to-call, estimate forms, project-type qualification, location qualification, booking or consultation routes, and confirmation messages.",
          },
          {
            title: "Provider and platform",
            body: "Website redesign, migration, domain and hosting inventory, redirect planning, analytics continuity, and escape from bad SEO or web providers.",
          },
          {
            title: "Ongoing growth",
            body: "Seasonal service priorities, local content, technical monitoring, market changes, review systems, and conversion improvements.",
          },
        ],
      },
      {
        eyebrow: "Common fits",
        title: "One project-based category, not a maze of doorway pages.",
        body: [
          "Common fits include roofing, remodeling, HVAC, plumbing, electrical, restoration, landscaping, flooring, fencing, concrete, painting, windows, doors, insulation, and related project-based services.",
          "Boho does not claim equal expertise in every trade. Industry-specific depth should be built through research reports and real projects over time.",
        ],
        tone: "blue",
      },
      {
        title: "Find the leaks between local search and the estimate request.",
        body: [
          "Send the website, service area, and the projects that matter most. Boho will review the visible market, website, trust signals, and contact path.",
        ],
        items: [
          {
            title: "Review the path",
            body: "Begin with the public signals available for a focused first look.",
            href: "/start/",
            linkLabel: "Get a Contractor Visibility Check",
          },
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/industries/local-service-businesses/",
    title: "Websites, Local SEO & Booking Growth for Local Service Businesses",
    metaDescription:
      "Boho helps local service businesses improve websites, bookings, calls, local search visibility, reviews, provider migrations, service pages, and ongoing growth.",
    eyebrow: "Local Service Businesses",
    headline: "Make the service easier to find, understand, trust, and book.",
    intro: [
      "Boho helps appointment-based and service-area businesses improve websites, local visibility, service explanations, reviews, booking paths, calls, and ongoing digital growth.",
    ],
    theme: "editorial",
    primaryCta: { label: "Review My Local Visibility", href: "/start/" },
    secondaryCta: {
      label: "Plan a Better Website",
      href: "/services/website-design-redesign/",
    },
    sections: [
      {
        eyebrow: "Before the appointment",
        title: "Local services compete on clarity and trust before the appointment begins.",
        body: [
          "Customers often compare several nearby providers quickly. They want to know whether the service fits, where the business operates, what the experience may involve, whether the provider appears credible, and how to book or ask a question.",
          "A confusing site, inconsistent public information, weak mobile contact path, or vague service page creates hesitation at exactly the wrong moment.",
          "Boho helps align the website, local search presence, business information, content, and conversion path with the way the business actually works.",
        ],
        layout: "split",
        tone: "parchment",
      },
      {
        eyebrow: "Valuable actions",
        title: "Measure the next useful step.",
        body: [
          "Depending on the operating model, a valuable action may be a phone call, appointment request, online booking, consultation, form submission, direction request, membership inquiry, service-area inquiry, repeat booking, or visit to a high-value service page.",
        ],
        note: "The useful action is defined by how the business schedules, serves, and earns value—not by a generic marketing dashboard.",
        tone: "verdigris",
      },
      {
        eyebrow: "What Boho may improve",
        title: "A calmer route from local discovery to action.",
        layout: "grid",
        items: [
          {
            title: "Clarity",
            body: "Service descriptions, who the service is for, location or service area, expectations, and pricing context when appropriate.",
          },
          {
            title: "Trust",
            body: "Real reviews, team information, process, policies, credentials when verified, photography, and clear ownership.",
          },
          {
            title: "Local visibility",
            body: "Business profile, categories, local pages, public information, review process, competitors, and search structure.",
          },
          {
            title: "Booking and contact",
            body: "Forms, phone links, scheduling links, mobile behavior, confirmation, and routing.",
          },
          {
            title: "Website foundation",
            body: "Design, accessibility, technical health, content structure, migration, and ownership.",
          },
        ],
      },
      {
        eyebrow: "Common fits",
        title: "Appointment-based and trust-heavy businesses.",
        body: [
          "Common fits include clinics, med spas, salons, cleaning companies, auto services, repair businesses, tutors, fitness studios, pet services, wellness providers, and other appointment-based or local service companies.",
          "Boho does not make medical or legal outcome claims. Regulated or health-related businesses require careful review of claims, privacy, and platform rules.",
        ],
        tone: "blue",
      },
      {
        title: "Make the next appointment easier to earn.",
        body: [
          "Send the website, location or service area, and the actions customers should take. Boho will review the path from discovery to booking or inquiry.",
        ],
        items: [
          {
            title: "Review the local path",
            body: "Start with the website, public business information, and intended customer action.",
            href: "/start/",
            linkLabel: "Get a Local Service Visibility Check",
          },
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/industries/brick-and-mortar-retail-hospitality/",
    title: "Websites & Local Visibility for Retail, Restaurants and Hospitality",
    metaDescription:
      "Boho helps brick-and-mortar retail and hospitality businesses improve websites, local discovery, menus, products, events, reviews, directions, reservations, and visits.",
    eyebrow: "Brick-and-Mortar Retail & Hospitality",
    headline: "Turn local discovery into visits, reservations, directions, and real-world attention.",
    intro: [
      "Boho helps shops, restaurants, venues, and hospitality businesses make essential information, offers, products, events, and locations easier to discover and act on.",
    ],
    theme: "mosaic",
    primaryCta: { label: "Review My Local Presence", href: "/start/" },
    secondaryCta: {
      label: "Plan a Better Website",
      href: "/services/website-design-redesign/",
    },
    sections: [
      {
        eyebrow: "From screen to storefront",
        title: "The website should help people decide where to go and what to expect.",
        body: [
          "For a physical business, digital visibility often precedes a real-world visit. Customers check hours, location, products, menu, reservations, events, reviews, accessibility, parking, policies, and whether the place feels worth the trip.",
          "Boho helps organize that information around the moment of decision. The site should not make a customer search three platforms to learn whether the business is open or whether the product, table, event, or service they want exists.",
        ],
        layout: "split",
        tone: "parchment",
      },
      {
        eyebrow: "Valuable actions",
        title: "Digital signals that can support a real-world visit.",
        body: [
          "Depending on the business, useful actions may include direction requests, calls, reservations, event registrations, menu or product views, store visits, local pickup actions, gift-card purchases, branded search, review activity, or email signups when strategically useful.",
        ],
        note: "The useful signal should connect to how the location attracts, serves, and retains customers.",
        tone: "plum",
      },
      {
        eyebrow: "What Boho may improve",
        title: "Make essential details current, discoverable, and actionable.",
        layout: "grid",
        items: [
          {
            title: "Local information",
            body: "Hours, location, directions, accessibility details, parking context, contact information, and profile consistency.",
          },
          {
            title: "Discovery",
            body: "Local search structure, categories, product or menu pages, event pages, location relevance, and internal linking.",
          },
          {
            title: "Experience",
            body: "Visual identity, mobile navigation, page speed, current information, photography treatment, and customer expectations.",
          },
          {
            title: "Action",
            body: "Reservations, calls, directions, pickup, product inquiry, event registration, gift cards, and newsletter signup.",
          },
          {
            title: "Reputation",
            body: "Reviews, responses, press or awards when verified, customer photos when authorized, and public proof.",
          },
        ],
      },
      {
        eyebrow: "Common fits",
        title: "Businesses where local attention becomes a visit.",
        body: [
          "Common fits include restaurants, cafés, bars, boutiques, specialty shops, local retailers, showrooms, venues, galleries, and hospitality businesses.",
        ],
        tone: "blue",
      },
      {
        title: "Make the digital first impression support the real-world visit.",
        body: [
          "Send the website, location, and the actions customers should take before arriving. Boho will review visibility, information clarity, trust, and the path to visit or reserve.",
        ],
        items: [
          {
            title: "Review the local presence",
            body: "Begin with the public information and path customers use before arriving.",
            href: "/start/",
            linkLabel: "Get a Retail or Hospitality Review",
          },
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/industries/online-retail-ecommerce/",
    title: "Ecommerce Website Design, SEO & Product Discovery | Boho",
    metaDescription:
      "Boho helps ecommerce and online retail businesses improve product and category structure, technical SEO, content, search visibility, trust, analytics, and conversion paths.",
    eyebrow: "Online Retail & Ecommerce",
    headline: "Help the right product get discovered, understood, trusted, and bought.",
    intro: [
      "Boho helps online retailers improve site structure, product and category discovery, technical health, content, trust, measurement, and the path from browsing to purchase.",
    ],
    theme: "research",
    primaryCta: { label: "Review My Store", href: "/start/" },
    secondaryCta: {
      label: "Plan an Ecommerce Redesign",
      href: "/services/website-design-redesign/",
    },
    sections: [
      {
        eyebrow: "Catalog logic",
        title: "Ecommerce growth depends on structure as much as promotion.",
        body: [
          "Products need clear categories, useful descriptions, sensible internal links, fast and usable pages, trustworthy policies, and search access. A store can have excellent products and still make discovery unnecessarily difficult.",
          "Boho helps smaller and growing retailers identify whether the main constraint is design, product information, category architecture, technical SEO, trust, measurement, or the shopping path.",
          "The objective is not to stuff every product page with keywords. It is to make the catalog easier for customers and search systems to understand.",
        ],
        layout: "split",
        tone: "parchment",
      },
      {
        eyebrow: "Valuable actions",
        title: "Follow discovery through the shopping path.",
        body: [
          "Useful signals may include product discovery, category-page visibility, product-page visits, internal search use, add-to-cart activity, checkout initiation, purchases, local pickup or delivery selection, repeat purchase, product inquiries, and revenue by landing page when measurement is valid.",
        ],
        note: "Email signup belongs in the model only when it serves a real customer and retention strategy.",
        tone: "verdigris",
      },
      {
        eyebrow: "What Boho may improve",
        title: "A clearer route through the catalog.",
        layout: "grid",
        items: [
          {
            title: "Architecture",
            body: "Categories, collections, product relationships, navigation, filters when supported, internal links, and URL structure.",
          },
          {
            title: "Product clarity",
            body: "Titles, descriptions, specifications, imagery direction, FAQs, variants, shipping, returns, and trust information.",
          },
          {
            title: "Search visibility",
            body: "Category and product metadata, crawlability, duplicate handling, structured data, content support, and index control.",
          },
          {
            title: "Conversion",
            body: "Calls to action, product-page hierarchy, proof, shipping clarity, returns, checkout friction observations, and mobile use.",
          },
          {
            title: "Measurement",
            body: "Product views, cart events, checkout steps, purchases, landing pages, internal search, and attribution limitations.",
          },
        ],
      },
      {
        eyebrow: "Common fits",
        title: "Smaller and growing online catalogs.",
        body: [
          "Common fits include Shopify stores, WooCommerce stores, niche ecommerce brands, product catalogs, hybrid local/online retailers, and stores offering local pickup or delivery.",
          "Boho does not claim support for a platform or integration until the required access and technical feasibility are confirmed.",
        ],
        tone: "blue",
      },
      {
        title: "Find the friction between product discovery and purchase.",
        body: [
          "Send the store, platform, product structure, and the categories or products that matter most. Boho will help identify the strongest first improvement.",
        ],
        items: [
          {
            title: "Review the store",
            body: "Start with the catalog structure, priority products, and current shopping path.",
            href: "/start/",
            linkLabel: "Ask About Ecommerce Growth",
          },
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/industries/professional-b2b-services/",
    title: "Websites, SEO & Qualified Lead Generation for Professional and B2B Services",
    metaDescription:
      "Boho helps professional and B2B firms improve positioning, websites, search visibility, content, proof, provider migrations, and qualified inquiry paths.",
    eyebrow: "Professional & B2B Services",
    headline: "Explain the expertise clearly enough for the right buyer to start a serious conversation.",
    intro: [
      "Boho helps professional and B2B firms improve positioning, websites, search visibility, educational content, proof, and qualified inquiry paths.",
    ],
    theme: "editorial",
    primaryCta: { label: "Review My Positioning", href: "/start/" },
    secondaryCta: {
      label: "Plan a Better Website",
      href: "/services/website-design-redesign/",
    },
    sections: [
      {
        eyebrow: "Buyer confidence",
        title: "Complex services still need a clear first explanation.",
        body: [
          "Professional buyers may need more information before contacting a firm. They want to understand the problem, process, fit, risk, expertise, and expected next step.",
          "A vague ‘solutions’ website makes that work harder. So does thin thought leadership, unsupported authority language, confusing navigation, and a generic contact form that asks nothing useful.",
          "Boho helps structure the website and content around buyer questions, credible proof, qualified inquiries, and the services the firm most wants to grow.",
        ],
        layout: "split",
        tone: "parchment",
      },
      {
        eyebrow: "Valuable actions",
        title: "Measure progress toward a qualified conversation.",
        body: [
          "Depending on the firm, useful signals may include consultation requests, qualified forms, proposal requests, calls, service-page engagement, case-study or proof views, content-assisted inquiries, branded search, target-account visits when lawfully measured, and lead quality by service.",
        ],
        note: "An email signup only matters when the content program justifies it.",
        tone: "plum",
      },
      {
        eyebrow: "What Boho may improve",
        title: "Make expertise legible without flattening it.",
        layout: "grid",
        items: [
          {
            title: "Positioning",
            body: "Clear services, audience, problems, differentiators, limits, and next steps.",
          },
          {
            title: "Website",
            body: "Visual authority, service architecture, proof, process, team, contact paths, accessibility, and mobile use.",
          },
          {
            title: "Search and content",
            body: "Commercial pages, educational guides, internal links, niche search visibility, technical health, and content systems.",
          },
          {
            title: "Qualification",
            body: "Forms, consultation context, fit language, project or service type, and routing.",
          },
          {
            title: "Ownership and migration",
            body: "Provider rescue, platform moves, analytics, domains, content, and documentation.",
          },
        ],
      },
      {
        eyebrow: "Common fits",
        title: "Firms that sell trust, expertise, and complex services.",
        body: [
          "Common fits include accountants, consultants, agencies, staffing firms, logistics companies, specialty B2B providers, and local or regional professional-services firms.",
          "Legal, financial, medical, and other regulated sectors require review of claims, privacy, disclaimers, and applicable professional rules before publication.",
        ],
        tone: "blue",
      },
      {
        title: "Make the expertise easier to understand and the inquiry easier to qualify.",
        body: [
          "Send the website, services, audience, and the conversations the firm wants more of. Boho will review positioning, proof, search structure, and the path to contact.",
        ],
        items: [
          {
            title: "Review the positioning",
            body: "Begin with the service architecture, public proof, and current inquiry path.",
            href: "/start/",
            linkLabel: "Get a Professional Services Review",
          },
        ],
        tone: "dark",
      },
    ],
  },
  {
    pageKind: "resources",
    slug: "/resources/",
    title: "Buyer Resources | Boho Digital Services",
    metaDescription:
      "Buyer guides and plain-language definitions for website, provider, ownership, visibility, continuity, and technical decisions.",
    eyebrow: "Resources",
    headline: "Buyer guidance for decisions that change ownership, cost, or risk.",
    intro: [
      "Focused guidance for website buying, provider exits, ownership, local lead systems, and technical language.",
    ],
    theme: "research",
    primaryCta: { label: "Choose a resource", href: "#resource-collections" },
    secondaryCta: { label: "Talk to Someone Technical", href: "/contact/" },
    sections: [],
  },
  {
    slug: "/lab/",
    title: "The Boho Lab | Market Research, Work Logs, Experiments & Tools",
    metaDescription:
      "Explore Boho market reports, success-signal studies, website teardowns, example reports, in-house experiments, tools, and documented digital work.",
    eyebrow: "Resources · The Boho Lab",
    headline: "Research, proof, and public work without the trophy-wall theater.",
    intro: [
      "Boho uses the Lab to document market research, in-house experiments, website teardowns, technical breakdowns, example reports, tools, and the decisions behind the work.",
    ],
    theme: "research",
    primaryCta: { label: "Explore the Lab", href: "#lab-categories" },
    secondaryCta: { label: "Browse Practical Guides", href: "/learn/" },
    draftLabel: "Secondary research archive — no verified proof profiles",
    sections: [
      {
        eyebrow: "Method before theater",
        title: "Show the method. Label the uncertainty.",
        body: [
          "Boho is building proof in public rather than manufacturing a polished history that does not exist.",
          "The Lab contains work we can inspect: market maps, research notes, in-house brands, website concepts, audit formats, technical decisions, tools, and experiments.",
          "A published result should explain what was tested, what changed, which signals moved, what remains uncertain, and what should happen next.",
        ],
        layout: "split",
        tone: "dark",
      },
      {
        id: "lab-categories",
        eyebrow: "Evidence shelves",
        title: "Research routes with their status visible.",
        note: "Draft shelves contain no synthetic findings. They remain retired until real, reviewable material exists.",
        layout: "grid",
        items: [
          {
            title: "Local Market Reports",
            body: "Studies of defined markets, including visible competitors, websites, profiles, reviews, service areas, result types, trust signals, and gaps. Map the terrain before prescribing the work.",
            href: "/lab/local-market-reports/",
            linkLabel: "View the draft shelf",
            status: "Planned",
          },
          {
            title: "Market Map Examples",
            body: "Visual demonstrations of competitor density, service coverage, website quality, local visibility, and potential opportunity. A map should expose a decision, not merely decorate a report.",
            href: "/lab/market-map-examples/",
            linkLabel: "View the draft shelf",
            status: "Planned",
          },
          {
            title: "Website Quality Surveys",
            body: "Structured reviews of common website strengths and failures across a market or business category. The purpose is to learn what the market treats as normal and where better execution may stand out.",
            href: "/lab/website-quality-surveys/",
            linkLabel: "View the draft shelf",
            status: "Planned",
          },
          {
            title: "Success Signal Studies",
            body: "Research notes on possible relationships among visibility, page quality, trust, customer action, and business value. Correlation forms a hypothesis; it does not prove causation.",
            href: "/lab/success-signal-studies/",
            linkLabel: "View the draft shelf",
            status: "Planned",
          },
          {
            title: "Public Experiments",
            body: "Owned tests involving content systems, publishing workflows, technical structure, internal linking, design, conversion, and search visibility—with maturity and constraints clearly labeled.",
            href: "/lab/public-experiments/",
            linkLabel: "View the draft shelf",
            status: "Planned",
          },
          {
            title: "Work Log",
            body: "A chronological record of meaningful design, technical, research, and content work: what changed, why it changed, and what should be watched next.",
            href: "/lab/work-log/",
            linkLabel: "View the draft shelf",
            status: "Planned",
          },
          {
            title: "In-House Brands",
            body: "Properties Boho controls and may use for testing and proof. Owned experiments are not client case studies; they require a transparent ownership disclosure.",
            href: "/lab/in-house-brands/",
            linkLabel: "View the draft shelf",
            status: "Planned",
          },
          {
            title: "Example Reports",
            body: "Sanitized or fictionalized formats showing how findings, priorities, maps, and recommendations may be presented. Formats demonstrate deliverable quality, not client results.",
            href: "/lab/example-reports/",
            linkLabel: "View the draft shelf",
            status: "Planned",
          },
          {
            title: "Public Teardowns",
            body: "Evidence-based critiques of public websites or market patterns, focused on observable issues and practical lessons rather than personal attacks or unsupported claims.",
            href: "/lab/public-teardowns/",
            linkLabel: "View the draft shelf",
            status: "Planned",
          },
          {
            title: "Tools & Templates",
            body: "Free checklists, calculators, templates, or small code tools where they provide practical value.",
            href: "/lab/tools-and-templates/",
            linkLabel: "View the draft shelf",
            status: "Planned",
          },
          {
            title: "Claims We Refuse to Make",
            body: "A standing record of unsupported promises Boho will not sell. Trust is easier when the boundaries are visible.",
            href: "/lab/claims-we-refuse-to-make/",
            linkLabel: "Read the operating boundaries",
          },
        ],
      },
      {
        eyebrow: "Current status",
        title: "The Lab is being assembled in public.",
        body: [
          "The first entries will include example market reports, website-quality surveys, in-house experiments, and technical work logs. Boho will not fill the shelves with synthetic articles merely to make the room look occupied.",
        ],
        items: [
          {
            title: "Practical education is available separately",
            body: "The practical guides explain concepts and buying decisions while the Lab documents research and work.",
            href: "/learn/",
            linkLabel: "Browse practical guides",
          },
        ],
        tone: "blue",
      },
      {
        title: "Start with the evidence you need.",
        body: [
          "Boho can build a focused market, website, provider, or success-signal review before larger work begins.",
        ],
        items: [
          {
            title: "Focused research",
            body: "Define the market or decision that needs clearer evidence.",
            href: "/contact/",
            linkLabel: "Ask About Research",
          },
          {
            title: "Visible first review",
            body: "Start with a website and public market signals.",
            href: "/start/",
            linkLabel: "Get a Visibility Check",
          },
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/lab/claims-we-refuse-to-make/",
    title: "Claims We Refuse to Make | Boho Digital Services",
    metaDescription:
      "Boho does not guarantee rankings, traffic, leads, revenue, AI citations, or secret search advantages. See the boundaries behind our work.",
    eyebrow: "Operating boundaries",
    headline: "Some promises are popular because they are easy to sell and hard to prove.",
    intro: [
      "Boho will not turn uncertainty into a fake guarantee simply because certainty looks attractive on a sales page.",
    ],
    theme: "research",
    primaryCta: { label: "See How Boho Works", href: "/about/" },
    secondaryCta: { label: "Read the Bad SEO Field Guide", href: "/learn/bad-seo-field-guide/" },
    draftLabel: "Secondary operating-boundary reference",
    sections: [
      {
        eyebrow: "We refuse to promise",
        title: "Outcomes no responsible provider controls.",
        layout: "grid",
        items: [
          {
            title: "Guaranteed outcomes",
            body: "Guaranteed rankings, traffic, lead volume, revenue, instant SEO results, or magic AI citations.",
          },
          {
            title: "Secret advantage",
            body: "Secret search-engine access, fake deadlines, fake scarcity, or certainty dressed up as proprietary knowledge.",
          },
          {
            title: "Invented proof",
            body: "Invented case studies, invented reviews, fabricated analytics, or bulk AI content presented as expertise.",
          },
          {
            title: "Universal prescriptions",
            body: "Strategies that ignore the market, claims that a redesign alone will fix the business, or the assumption that every company needs ongoing SEO.",
          },
          {
            title: "Metrics without purpose",
            body: "The idea that every metric deserves attention. Measurement should follow the business question and the valuable action.",
          },
        ],
        tone: "dark",
      },
      {
        eyebrow: "What honest work can do",
        title: "Uncertainty is a reason for discipline, not paralysis.",
        body: [
          "Search, design, visibility, trust, customer behavior, competition, and business operations interact. That uncertainty does not make useful work impossible. It makes disciplined research, transparent assumptions, measurement, and honest reporting more important.",
        ],
        quote: "We will tell you what we believe, why we believe it, what could make us wrong, and what we recommend doing next.",
        tone: "parchment",
      },
    ],
  },
  {
    slug: "/learn/",
    title: "Practical Buyer Guides | Websites, Ownership & Provider Rescue",
    metaDescription:
      "Plain-language buyer guides for website planning, digital ownership, provider rescue, continuity, and common technical terms.",
    eyebrow: "Resources · Buyer guides",
    headline: "Make the expensive digital decision with fewer unknowns.",
    intro: [
      "Focused guidance for buying a website, protecting ownership, changing providers, and translating technical language before it becomes leverage.",
    ],
    theme: "editorial",
    primaryCta: { label: "Choose a Guide", href: "#guide-shelves" },
    secondaryCta: { label: "Open the Glossary", href: "/learn/glossary/" },
    sections: [
      {
        eyebrow: "Buyer guidance",
        title: "Start with the decision, the ownership risk, and the continuity plan.",
        body: [
          "These resources help business owners inspect a proposal, identify the access and assets they must control, and plan a provider change without losing the parts that still work.",
        ],
        tone: "parchment",
      },
      {
        id: "guide-shelves",
        eyebrow: "Choose a guide",
        title: "Three focused references for common buying and ownership decisions.",
        layout: "grid",
        items: [
          {
            title: "Website buying",
            body: "Plan scope, content responsibility, accessibility, hosting, ownership, and migration risk before comparing proposals.",
            href: "/learn/website-buying/",
            linkLabel: "Read the buyer guide",
          },
          {
            title: "Provider rescue",
            body: "Map the domain, hosting, source, data, forms, analytics, useful URLs, and recovery paths before changing providers.",
            href: "/learn/provider-rescue/",
            linkLabel: "Read the provider rescue guide",
          },
          {
            title: "Plain-language glossary",
            body: "Translate website, ownership, migration, search, analytics, and provider language into the business decision underneath it.",
            href: "/learn/glossary/",
            linkLabel: "Open the glossary",
          },
        ],
      },
      {
        eyebrow: "Before you commit",
        title: "A second opinion is cheaper than rebuilding around the wrong assumption.",
        body: [
          "Send the proposal, provider situation, website, or ownership concern. Boho will help identify the useful question, the missing evidence, and the smallest credible next step.",
        ],
        tone: "blue",
      },
    ],
  },
  {
    slug: "/learn/glossary/",
    pageKind: "glossary",
    title: "Digital Marketing and Website Glossary | Boho",
    metaDescription:
      "Plain-language definitions for website, SEO, migration, local search, analytics, and digital-growth terms used by business owners and providers.",
    eyebrow: "Glossary",
    headline: "Digital terms translated into language a business owner can use.",
    intro: [
      "Short definitions for the terms that tend to appear right before a website, SEO, migration, or analytics project becomes harder to understand than necessary.",
    ],
    theme: "editorial",
    primaryCta: { label: "Choose a Buyer Guide", href: "/learn/" },
    secondaryCta: { label: "Ask a Project Question", href: "/contact/" },
    sections: [
      {
        eyebrow: "Use the glossary",
        title: "Translate the term, then inspect the decision underneath it.",
        body: [
          "Use a definition to clarify a proposal, understand an ownership or migration risk, or ask a provider a more useful question.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "Common decisions",
        title: "The language usually matters because money, access, or continuity is attached to it.",
        layout: "grid",
        items: [
          {
            title: "Website and hosting",
            body: "Clarify domains, DNS, hosting, servers, redirects, and the systems that keep a website available.",
          },
          {
            title: "Ownership and access",
            body: "Understand who controls the domain, source, accounts, data, credentials, and recovery paths.",
          },
          {
            title: "Search and measurement",
            body: "Separate crawl, index, visibility, analytics, and conversion language before judging a report or recommendation.",
          },
          {
            title: "Provider changes",
            body: "Identify the terminology tied to migration scope, continuity, rollback, and what the business must receive at handoff.",
          },
        ],
      },
    ],
  },
  {
    slug: "/tools/",
    pageKind: "tools",
    title: "Custom Tools and Automation | Boho Digital Services",
    metaDescription:
      "Focused workflow automation, reporting, monitoring, integrations, and internal tools designed around a real operational problem.",
    eyebrow: "Tools",
    headline: "When the right tool does not exist, we build it.",
    intro: [
      "Focused digital systems for repeated work that is too important, too specific, or too fragmented for the tools already in place.",
    ],
    theme: "research",
    primaryCta: { label: "See What Boho Builds", href: "#capabilities" },
    secondaryCta: { label: "Build the Missing Tool", href: "/contact/" },
    sections: [],
  },
  {
    slug: "/learn/bad-seo-field-guide/",
    title: "Bad SEO Field Guide | Warnings for Business Owners",
    metaDescription:
      "A practical guide to ranking guarantees, vague SEO reports, bulk content, suspicious links, provider lock-in, mystery retainers, and panic audits.",
    eyebrow: "Bad SEO Field Guide",
    headline: "How to recognize the work that sounds impressive and explains nothing.",
    intro: [
      "A practical guide to vague retainers, fake urgency, ranking guarantees, meaningless reports, provider lock-in, bulk content, suspicious links, and other expensive forms of digital fog.",
    ],
    theme: "editorial",
    primaryCta: { label: "Request a Second Opinion", href: "/contact/" },
    secondaryCta: {
      label: "Read the Claims Boho Refuses to Make",
      href: "/lab/claims-we-refuse-to-make/",
    },
    draftLabel: "Broad SEO education — deferred for Rank Builder review",
    sections: [
      {
        eyebrow: "Field notes",
        title: "Seven patterns worth questioning.",
        layout: "grid",
        items: [
          {
            title: "The guarantee",
            body: "No provider controls the search results. Treat guaranteed rankings, leads, traffic, or AI citations as a warning sign.",
          },
          {
            title: "The report",
            body: "A report full of charts is not useful unless it explains what changed, why it matters, and what happens next.",
          },
          {
            title: "The content machine",
            body: "Publishing large amounts of generic content can create noise, duplication, and maintenance cost. Ask how each page supports a real service, customer question, or search need.",
          },
          {
            title: "The link scheme",
            body: "Links may matter, but undisclosed paid schemes, irrelevant placements, and volume promises can create platform and reputation risk.",
          },
          {
            title: "The ownership problem",
            body: "The business should understand who owns the domain, website, analytics, search accounts, content, and profiles.",
          },
          {
            title: "The mystery retainer",
            body: "Recurring work should have named priorities, completed tasks, observed signals, and a reason to continue.",
          },
          {
            title: "The panic audit",
            body: "Tool warnings should be prioritized by impact and risk. A red icon is not automatically a business emergency.",
          },
        ],
        tone: "parchment",
      },
      {
        eyebrow: "A better question",
        title: "Can the provider explain the decision in plain language?",
        body: [
          "Useful work names the problem, evidence, priority, action, limitation, and next check. If the explanation depends on fear, mystery, or a promise nobody controls, ask for a second opinion before making a larger commitment.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/lab/local-market-reports/",
    title: "Local Market Reports | Boho Lab Draft",
    metaDescription:
      "A retired draft shelf reserved for future Boho local market reports built from defined questions, documented sources, and honest limitations.",
    eyebrow: "The Boho Lab · Draft shelf",
    headline: "Local market reports will publish here after the research is complete.",
    intro: [
      "This route is reserved for studies of how businesses appear in a defined market. It contains no synthetic findings and remains retired until a real report is ready for review.",
    ],
    theme: "research",
    primaryCta: { label: "Return to the Lab", href: "/lab/" },
    secondaryCta: { label: "Ask About a Market Review", href: "/contact/" },
    draftLabel: "Draft — awaiting real research",
    sections: [
      {
        eyebrow: "Publication standard",
        title: "A market report needs a defined place, question, method, and date.",
        body: [
          "A finished report may examine visible competitors, websites, business profiles, reviews, service areas, result types, trust signals, and gaps. It must also document sources, collection method, known limitations, opportunity hypotheses, recommendations, and what the report does not prove.",
        ],
        note: "No companies, observations, rankings, or results are listed here because no completed report has been supplied.",
        tone: "dark",
      },
    ],
  },
  {
    slug: "/lab/market-map-examples/",
    title: "Market Map Examples | Boho Lab Draft",
    metaDescription:
      "A retired draft shelf for future market maps that connect visible competitor, service-area, website-quality, and local-search patterns to decisions.",
    eyebrow: "The Boho Lab · Draft shelf",
    headline: "A market map should expose a decision, not merely decorate a report.",
    intro: [
      "This route is reserved for real map examples. No locations, competitors, coverage claims, or opportunity findings have been invented for the draft.",
    ],
    theme: "research",
    primaryCta: { label: "Return to the Lab", href: "/lab/" },
    secondaryCta: { label: "Ask About a Market Map", href: "/contact/" },
    draftLabel: "Draft — awaiting a documented map",
    sections: [
      {
        eyebrow: "What belongs here",
        title: "A defined geography, visible source trail, and business question.",
        body: [
          "Future examples may visualize competitor density, service coverage, website quality, local visibility, and possible opportunity. Each map must explain how information was collected, when it was collected, its limitations, and the decision it is meant to support.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/lab/website-quality-surveys/",
    title: "Website Quality Surveys | Boho Lab Draft",
    metaDescription:
      "A retired draft shelf for structured reviews of observable website strengths and failures across a defined market or business category.",
    eyebrow: "The Boho Lab · Draft shelf",
    headline: "Website-quality surveys need a repeatable rubric and a real sample.",
    intro: [
      "This route is reserved for completed surveys of observable website patterns. It does not contain invented scores, companies, examples, or conclusions.",
    ],
    theme: "research",
    primaryCta: { label: "Return to the Lab", href: "/lab/" },
    secondaryCta: { label: "Ask About a Website Review", href: "/contact/" },
    draftLabel: "Draft — awaiting a real survey",
    sections: [
      {
        eyebrow: "Publication standard",
        title: "Define quality before comparing the market.",
        body: [
          "A future survey should state the sample, date, observable criteria, review method, limitations, and the practical decision behind the comparison. The goal is to understand what the market treats as normal and where better execution may stand out—not to manufacture a leaderboard.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/lab/success-signal-studies/",
    title: "Success Signal Studies | Boho Lab Draft",
    metaDescription:
      "A retired draft shelf for future research into possible relationships among visibility, page quality, trust, customer action, and business value.",
    eyebrow: "The Boho Lab · Draft shelf",
    headline: "A visible signal can support a hypothesis without proving the outcome.",
    intro: [
      "This route is reserved for documented success-signal studies. No correlations, rankings, traffic, leads, or business results are claimed in this draft.",
    ],
    theme: "research",
    primaryCta: { label: "Return to the Lab", href: "/lab/" },
    secondaryCta: { label: "Ask About a Signal Review", href: "/contact/" },
    draftLabel: "Draft — awaiting measured evidence",
    sections: [
      {
        eyebrow: "Publication standard",
        title: "Label the signal, method, uncertainty, and alternative explanations.",
        body: [
          "Future studies may examine possible relationships among visibility, page quality, trust, customer action, and business value. Each must distinguish observation from causation, describe the measurement window, disclose limitations, and say what the evidence does not establish.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/lab/public-experiments/",
    title: "Public Experiments | Boho Lab Draft",
    metaDescription:
      "A retired draft shelf for owned digital experiments with an ownership disclosure, baseline, change, measurement window, result, and limitations.",
    eyebrow: "The Boho Lab · Draft shelf",
    headline: "Public experiments need a real property, baseline, change, and measurement window.",
    intro: [
      "No experiment or result is presented here yet. This route remains retired until Boho can disclose ownership and document a real test from question through next decision.",
    ],
    theme: "research",
    primaryCta: { label: "Return to the Lab", href: "/lab/" },
    secondaryCta: { label: "See Boho's Operating Boundaries", href: "/lab/claims-we-refuse-to-make/" },
    draftLabel: "Draft — no experiment published",
    sections: [
      {
        eyebrow: "Experiment record",
        title: "Question → baseline → change → observation → next test.",
        body: [
          "A published experiment should name the property and ownership, question, baseline, change, measurement window, signals observed, result, alternative explanations, decision, and next test. Maturity and constraints should remain visible.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/lab/work-log/",
    title: "Work Log | Boho Lab Draft",
    metaDescription:
      "A retired draft route reserved for dated records of meaningful Boho design, technical, research, and content work.",
    eyebrow: "The Boho Lab · Draft shelf",
    headline: "The work log will record what changed, why, and what should be watched next.",
    intro: [
      "There are no fabricated milestones or retrospective entries here. This route remains retired until dated, verifiable work records are ready.",
    ],
    theme: "research",
    primaryCta: { label: "Return to the Lab", href: "/lab/" },
    secondaryCta: { label: "See How Boho Works", href: "/about/" },
    draftLabel: "Draft — work records not yet published",
    sections: [
      {
        eyebrow: "Entry standard",
        title: "A useful work log is more than a changelog.",
        body: [
          "Each future entry should identify the date, scope, meaningful change, reason for the decision, expected signal, known limitation, and next observation. Client information must not appear without permission.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/lab/in-house-brands/",
    pageKind: "brands",
    title: "In-House Brands | Owned Boho Properties",
    metaDescription:
      "Live previews and transparent Lab files for How Biscuit, Rank Builder SEO, and Better Grades, three in-house Boho properties.",
    eyebrow: "The Boho Lab · Draft shelf",
    headline: "Owned properties can support experiments when ownership stays visible.",
    intro: [
      "How Biscuit, Rank Builder SEO, and Better Grades are operated in-house. They are shown as owned working properties, not clients or evidence that a result will transfer to another business.",
    ],
    theme: "research",
    primaryCta: { label: "Return to the Lab", href: "/lab/" },
    secondaryCta: { label: "See Boho's Operating Boundaries", href: "/lab/claims-we-refuse-to-make/" },
    draftLabel: "Owned entities confirmed · live previews available",
    sections: [
      {
        eyebrow: "Disclosure standard",
        title: "State ownership, purpose, test conditions, and limits.",
        body: [
          "A future property page should explain what Boho controls, what the property is for, which changes are being tested, what evidence is available, and what the experiment cannot establish. It must never be framed as a client result.",
        ],
        tone: "dark",
      },
      {
        eyebrow: "Confirmed owned entities",
        title: "Placeholders now. Documentation later.",
        layout: "split",
        items: [
          {
            title: "Rank Builder SEO",
            body: "Owned by Boho. Reserved for a future reviewed entity description and selected technical research. No public link, performance claim, or implied client result is included in this draft.",
            status: "Planned",
          },
          {
            title: "How Biscuit",
            body: "Owned by Boho. Reserved for a future reviewed entity description or transparently documented experiment. No public link, audience claim, or result is included in this draft.",
            status: "Planned",
          },
        ],
        tone: "parchment",
      },
    ],
  },
  {
    slug: "/lab/in-house-brands/how-biscuit/",
    pageKind: "brand",
    title: "How Biscuit | In-House Brand Lab File | Boho",
    metaDescription: "Live non-interactive preview and owned-property Lab file for How Biscuit.",
    eyebrow: "The Boho Lab · Owned property",
    headline: "How Biscuit",
    intro: ["An owned publishing property used to develop and document practical content systems."],
    theme: "research",
    primaryCta: { label: "All in-house brands", href: "/lab/in-house-brands/" },
    secondaryCta: { label: "Open the Lab", href: "/lab/" },
    sections: [],
  },
  {
    slug: "/lab/in-house-brands/rank-builder-seo/",
    pageKind: "brand",
    title: "RankBuilder SEO | In-House Brand Lab File | Boho",
    metaDescription: "Live non-interactive preview and owned-property Lab file for RankBuilder SEO.",
    eyebrow: "The Boho Lab · Owned property",
    headline: "RankBuilder SEO",
    intro: ["An owned search-focused property used for technical, publishing, and visibility work."],
    theme: "research",
    primaryCta: { label: "All in-house brands", href: "/lab/in-house-brands/" },
    secondaryCta: { label: "Open the Lab", href: "/lab/" },
    sections: [],
  },
  {
    slug: "/lab/in-house-brands/better-grades/",
    pageKind: "brand",
    title: "Better Grades | In-House Brand Lab File | Boho",
    metaDescription: "Live non-interactive preview and owned-property Lab file for Better Grades.",
    eyebrow: "The Boho Lab · Owned property",
    headline: "Better Grades",
    intro: ["An owned learning property used to build and inspect educational web experiences."],
    theme: "research",
    primaryCta: { label: "All in-house brands", href: "/lab/in-house-brands/" },
    secondaryCta: { label: "Open the Lab", href: "/lab/" },
    sections: [],
  },
  {
    slug: "/lab/example-reports/",
    title: "Example Reports | Boho Lab Draft",
    metaDescription:
      "A retired draft shelf for sanitized or clearly fictionalized report formats that demonstrate organization without inventing client results.",
    eyebrow: "The Boho Lab · Draft shelf",
    headline: "An example can show the format without pretending a client result exists.",
    intro: [
      "No report sample has been supplied for this draft. This route remains retired until a sanitized real format or clearly fictionalized presentation example is ready.",
    ],
    theme: "research",
    primaryCta: { label: "Return to the Lab", href: "/lab/" },
    secondaryCta: { label: "Ask About a Research Deliverable", href: "/contact/" },
    draftLabel: "Draft — example format pending",
    sections: [
      {
        eyebrow: "Presentation boundary",
        title: "Demonstrate how decisions are organized, not a result that never happened.",
        body: [
          "A future example may show findings, priorities, maps, and recommendations. It must identify whether the content is sanitized or fictionalized, avoid real-looking invented client data, and make clear that presentation quality is not evidence of an outcome.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/lab/public-teardowns/",
    title: "Public Teardowns | Boho Lab Draft",
    metaDescription:
      "A retired draft shelf for evidence-based critiques of observable website or market patterns, with scope, evidence, practical fixes, and limitations.",
    eyebrow: "The Boho Lab · Draft shelf",
    headline: "Critique the artifact, not the character of the owner.",
    intro: [
      "No company or public website is reviewed in this draft. This route remains retired until an evidence-based teardown can be published responsibly.",
    ],
    theme: "research",
    primaryCta: { label: "Return to the Lab", href: "/lab/" },
    secondaryCta: { label: "Request a Private Review", href: "/start/" },
    draftLabel: "Draft — no teardown published",
    sections: [
      {
        eyebrow: "Teardown standard",
        title: "Observable issue, practical lesson, visible limitation.",
        body: [
          "A future teardown should state the public page or market, scope, date, observable issue, why it may matter, evidence, practical fix, priority, limitation, and general lesson. A weak website alone is not evidence of misconduct.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/lab/tools-and-templates/",
    title: "Tools & Templates | Boho Lab Draft",
    metaDescription:
      "A retired draft shelf reserved for useful Boho checklists, calculators, templates, and small tools that can be verified before release.",
    eyebrow: "The Boho Lab · Draft shelf",
    headline: "A free tool should solve a real problem before it earns a public page.",
    intro: [
      "No calculators, downloads, or templates are claimed in this draft. This route remains retired until a working resource can be tested and described accurately.",
    ],
    theme: "research",
    primaryCta: { label: "Return to the Lab", href: "/lab/" },
    secondaryCta: { label: "Read Practical Guides", href: "/learn/" },
    draftLabel: "Draft — no tool released",
    sections: [
      {
        eyebrow: "Release standard",
        title: "Useful, testable, accessible, and honest about its limits.",
        body: [
          "A future resource should name the job it helps complete, explain how to use it, identify required inputs, disclose meaningful limitations, protect user privacy, and work accessibly. Proprietary systems can remain private when they create a real operational advantage.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/learn/small-business-seo/",
    title: "Small-Business SEO | Planned Guide Shelf | Boho",
    metaDescription:
      "A retired guide-shelf draft for practical small-business SEO concepts, priorities, measurement, and buying decisions without guarantees or filler articles.",
    eyebrow: "Resources · Planned guide shelf",
    headline: "Small-business SEO should start with the business, not a universal checklist.",
    intro: [
      "This is an honest route reservation, not a finished article library. It remains retired while Boho develops substantial guidance around services, customers, markets, search access, trust, and valuable actions.",
    ],
    theme: "editorial",
    primaryCta: { label: "Back to practical guides", href: "/learn/" },
    secondaryCta: { label: "Explore SEO Services", href: "/services/local-seo-search-visibility/" },
    draftLabel: "Draft guide shelf — no thin articles",
    sections: [
      {
        eyebrow: "What this shelf will clarify",
        title: "Priorities, constraints, and useful signals.",
        body: [
          "Future guides will separate search visibility from guaranteed outcomes, explain how commercial pages and useful education serve different jobs, and connect measurement to calls, bookings, estimates, purchases, or qualified inquiries where those signals are valid.",
        ],
        note: "Until those guides are reviewed, the service pages and Bad SEO Field Guide provide the more complete public guidance.",
        tone: "parchment",
      },
    ],
  },
  {
    slug: "/learn/local-search/",
    title: "Local Search | Planned Guide Shelf | Boho",
    metaDescription:
      "A retired guide-shelf draft for practical local search, business profiles, reviews, service areas, location pages, and reporting guidance.",
    eyebrow: "Resources · Planned guide shelf",
    headline: "Local search is a system of clarity, relevance, trust, and technical support.",
    intro: [
      "This planned shelf contains no filler articles or ranking promises. It remains retired until useful guides to local profiles, reviews, service areas, location information, competitors, and reporting are ready.",
    ],
    theme: "editorial",
    primaryCta: { label: "Back to practical guides", href: "/learn/" },
    secondaryCta: { label: "Explore Local SEO", href: "/services/local-seo-search-visibility/" },
    draftLabel: "Draft guide shelf — content in development",
    sections: [
      {
        eyebrow: "Planned practical questions",
        title: "What local SEO can do—and what it cannot promise.",
        body: [
          "Future guides will cover business-profile basics, service-area pages without fake-location spam, review trust, competitor comparison, and the information a useful local SEO report should show.",
        ],
        tone: "parchment",
      },
    ],
  },
  {
    slug: "/learn/website-buying/",
    title: "Website Buying & Redesign Guide | Boho Digital Services",
    metaDescription:
      "A practical guide to buying, repairing, redesigning, and hosting a business website while preserving ownership, useful content, search value, and operating clarity.",
    eyebrow: "Resources · Buyer guide",
    headline: "Buy the website around the job it needs to do.",
    intro: [
      "Use this guide to test whether a website proposal names the real job, ownership model, hosting boundary, content responsibility, migration risk, verification plan, and exit path.",
    ],
    theme: "editorial",
    primaryCta: { label: "Talk to Someone Technical", href: "/contact/" },
    secondaryCta: { label: "Explore Website Design", href: "/services/website-design-redesign/" },
    sections: [
      {
        eyebrow: "Before comparing proposals",
        title: "Repair or redesign? Who owns what? What must survive the move?",
        body: [
          "Start with the website's commercial job: which services, products, locations, proof, questions, and customer actions must the site support? A redesign should solve a named weakness, not merely produce a different style.",
          "Inventory the domain, DNS, hosting, source, content, images, forms, analytics, search accounts, integrations, email dependencies, important URLs, and existing agreements before assuming a new platform can replace them safely.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "Proposal checklist",
        title: "A credible scope makes responsibility visible.",
        layout: "grid",
        items: [
          { title: "Outcome and audience", body: "Name the primary offers, buyers, locations, useful actions, and what should become easier when the work is complete." },
          { title: "Pages and content", body: "List the routes, content responsibilities, revisions, images, product or service data, redirects, and what is specifically excluded." },
          { title: "Ownership and access", body: "State who owns the domain, source, production account, analytics, content, licenses, credentials, backups, and recovery path." },
          { title: "Hosting and support", body: "State the platform, eligibility, third-party costs, traffic or storage limits, update boundary, monitoring, support response, exit process, and what happens when a retainer ends." },
          { title: "Quality and verification", body: "Include responsive behavior, accessibility, performance, forms or fallback paths, metadata, analytics readiness, link checks, launch checks, and documented exceptions." },
          { title: "Change and rollback", body: "Explain how the current site is preserved, how URLs move, which approvals gate launch, and how the prior state can be restored if the cutover fails." },
        ],
      },
      {
        eyebrow: "Managed hosting language",
        title: "Read the provision and the boundary together.",
        body: [
          "Standard managed hosting is included at no separate hosting charge for eligible websites while an active qualifying retainer remains in good standing.",
          "That provision still requires a written definition of eligibility, platform limits, third-party charges, support, maintenance, ownership, termination, migration assistance, and any work outside the retainer. Included must not be translated into unlimited or permanent.",
        ],
        tone: "verdigris",
      },
      {
        title: "Buy the accountable operating system, not only the homepage mockup.",
        body: [
          "A strong proposal connects the design to content, ownership, hosting, search continuity, customer action, measurement, deployment, and maintenance. Ask for the explanation before approving the change.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/learn/provider-rescue/",
    title: "Provider Rescue & Website Migration Guide | Boho",
    metaDescription:
      "A practical guide to leaving a web, hosting, or SEO provider while protecting ownership, access, URLs, analytics, forms, and working assets.",
    eyebrow: "Resources · Buyer guide",
    headline: "Leave the provider without abandoning the parts that still work.",
    intro: [
      "A provider exit is a systems change. Inventory what exists, secure authorized control, preserve useful value, plan the move, verify the launch, and leave a rollback path.",
    ],
    theme: "editorial",
    primaryCta: { label: "Request a Technical Second Opinion", href: "/contact/" },
    secondaryCta: {
      label: "Explore Provider Rescue",
      href: "/services/website-migration-provider-rescue/",
    },
    sections: [
      {
        eyebrow: "Before giving notice",
        title: "Inventory access, preserve value, verify the launch.",
        body: [
          "Record the domain registrar, DNS, hosting, website platform, source, content, media, forms, notification inboxes, analytics, search properties, business profiles, integrations, email dependencies, important URLs, redirects, licenses, invoices, contacts, and account owners.",
          "Do not copy passwords into a planning document. Use authorized platform invitations, client-owned accounts, least-privilege access, and a separate recovery process for anything the business does not control.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "Migration control points",
        title: "Separate what must be preserved from what should be replaced.",
        layout: "steps",
        items: [
          { title: "1. Diagnose", body: "Confirm the business reason for leaving, the systems involved, ownership gaps, current failures, and any contractual or timing constraints." },
          { title: "2. Preserve", body: "Export authorized content and data, record important URLs and settings, capture baselines, and identify the working parts that should survive." },
          { title: "3. Plan", body: "Define the destination, responsibilities, redirect map, form and analytics behavior, DNS or domain dependencies, approval gates, cutover window, and rollback." },
          { title: "4. Build and test", body: "Prepare the destination in a non-production environment and test routes, assets, content, accessibility, forms or fallback paths, metadata, and integrations." },
          { title: "5. Cut over with approval", body: "Only the authorized owner approves production changes. Record the exact configuration and preserve the prior working state." },
          { title: "6. Verify and document", body: "Check critical URLs, redirects, forms, analytics, search access, mobile behavior, logs, ownership, and what remains unresolved after launch." },
        ],
      },
      {
        eyebrow: "Stop conditions",
        title: "A rescue does not authorize account seizure or reckless cutover.",
        body: [
          "Stop when ownership cannot be verified, a required backup is missing, the destination is untested, email or another critical dependency could be affected, the rollback path is unclear, or the owner has not approved the production change.",
          "Boho cannot bypass credentials, impersonate an owner, guarantee provider cooperation, or replace legal advice about a disputed contract or asset.",
        ],
        tone: "plum",
      },
      {
        title: "Leave with cleaner ownership and better records than you inherited.",
        body: [
          "The useful outcome is not merely a new provider. It is a working system the business can understand, access, verify, and move again without reconstructing everything from memory.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/learn/ai-search-visibility/",
    title: "AI Search Visibility | Planned Guide Shelf | Boho",
    metaDescription:
      "A retired guide-shelf draft for sober, practical guidance on answer-ready content, entity clarity, citations, consistent information, and measurement limits.",
    eyebrow: "Resources · Planned guide shelf",
    headline: "AI search does not replace a clear, credible website.",
    intro: [
      "This planned shelf contains no AI-citation promises, secret access claims, or invented visibility results. It remains retired until reviewed guidance is ready.",
    ],
    theme: "editorial",
    primaryCta: { label: "Back to practical guides", href: "/learn/" },
    secondaryCta: { label: "Read Boho's Claim Boundaries", href: "/lab/claims-we-refuse-to-make/" },
    draftLabel: "Draft guide shelf — content in development",
    sections: [
      {
        eyebrow: "Planned practical questions",
        title: "Clarity, consistency, sources, and honest measurement.",
        body: [
          "Future guides will explain answer-ready content, entity clarity for local businesses, the role of citations and consistent information, the limits of AI-visibility measurement, and questions to ask an AI SEO provider.",
        ],
        tone: "parchment",
      },
    ],
  },
  {
    slug: "/learn/featured-rank-builder/",
    title: "Featured Rank Builder Research | Planned Shelf | Boho",
    metaDescription:
      "A retired planned shelf for selected, verified Rank Builder research with plain-language Boho summaries and no implied client results.",
    eyebrow: "Resources · Planned research shelf",
    headline: "Technical research belongs here only when a business owner can understand why it matters.",
    intro: [
      "No Rank Builder articles or findings are claimed in this draft because verified published links have not been supplied. This route remains retired until a curated selection can be reviewed.",
    ],
    theme: "editorial",
    primaryCta: { label: "Back to practical guides", href: "/learn/" },
    secondaryCta: { label: "Explore the Boho Lab", href: "/lab/" },
    draftLabel: "Draft shelf — verified links required",
    sections: [
      {
        eyebrow: "Selection standard",
        title: "Real article, clear summary, visible boundary.",
        body: [
          "Only real published articles should appear here. Each needs a short Boho-written summary explaining why it matters to a business owner. Links should behave accessibly, outbound measurement should respect privacy, and Rank Builder findings must never be presented as proof of Boho client results.",
        ],
        tone: "parchment",
      },
    ],
  },
];
