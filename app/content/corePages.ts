import type { PageConfig } from "./types";
import { operatingCycle } from "./operatingCycle";

export const corePages: PageConfig[] = [
  {
    slug: "/services/",
    title: "Services | Website Design, SEO, Migration, Growth & Lead Generation",
    metaDescription:
      "Explore Boho website design, provider rescue, migration, local SEO, lead generation, ongoing growth, technical SEO, research, audits, and analytics.",
    eyebrow: "Services",
    headline: "Digital services built around the business problem, not the agency package.",
    intro: [
      "Boho designs websites, rescues messy provider situations, improves search visibility, builds lead-generation paths, and supports ongoing growth with research-led priorities.",
    ],
    theme: "mosaic",
    primaryCta: { label: "Get a Visibility Check", href: "/start/" },
    secondaryCta: { label: "See Pricing", href: "/pricing/" },
    sections: [
      {
        eyebrow: "How the work is chosen",
        title: "The service menu is not the strategy.",
        body: [
          "Website design, SEO, analytics, content, migration, and conversion work are tools. The strategy comes from understanding the business.",
          "What does the business sell? Which customers or projects matter most? Where do people search? What makes them trust the company? Which competitors appear stronger? Which signals are weak? Which fixes are worth their cost?",
          "Boho uses the smallest useful combination of services to improve the system in front of us. Sometimes that means a new website. Sometimes it means repairing the current one. Sometimes the real problem is ownership, migration risk, unclear tracking, weak service pages, or a provider that has made ordinary work impossible to understand.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "Seven connected capabilities",
        title: "Choose the tool after naming the problem.",
        layout: "grid",
        items: [
          {
            title: "Website Design & Redesign",
            body: "Build a website that understands its job. Boho designs distinctive, search-aware websites around the business model, services, trust signals, customer questions, desired actions, mobile use, and ownership.",
            href: "/services/website-design-redesign/",
            linkLabel: "Explore Website Design",
          },
          {
            title: "Website Migration & Provider Rescue",
            body: "Move away without losing the trail. Boho inventories access, identifies ownership risks, preserves useful URLs and content, plans redirects, protects measurement continuity, and verifies the move.",
            href: "/services/website-migration-provider-rescue/",
            linkLabel: "Plan the Rescue",
          },
          {
            title: "Local SEO & Search Visibility",
            body: "Make the business easier to find where customers actually look by strengthening the consistency, relevance, trust, website, profile, and technical signals that support local discovery.",
            href: "/services/local-seo-search-visibility/",
            linkLabel: "Improve Local Visibility",
          },
          {
            title: "Lead Generation & Conversion",
            body: "Improve the route from discovery to inquiry: service pages, offers, calls to action, forms, phone links, booking paths, trust signals, and measurement. The goal is the right next step, not every possible click.",
            href: "/services/lead-generation-conversion/",
            linkLabel: "Improve Lead Paths",
          },
          {
            title: "Ongoing SEO & Growth",
            body: "Build a visible operating rhythm with named priorities, completed work, observed signals, and the next decision—when continuous work has a clear business reason.",
            href: "/services/ongoing-seo-growth/",
            linkLabel: "Explore Ongoing Support",
          },
          {
            title: "Technical SEO & Site Health",
            body: "Inspect crawlability, indexing, metadata, redirects, internal links, structured data, performance, mobile behavior, and architecture to remove friction worth caring about.",
            href: "/services/technical-seo-site-health/",
            linkLabel: "Inspect Site Health",
          },
          {
            title: "Research, Audits & Analytics",
            body: "Map markets, compare competitors, study visible signals, review measurement, and turn the findings into prioritized decisions—not screenshot acreage.",
            href: "/services/research-audits-analytics/",
            linkLabel: "Start With Evidence",
          },
        ],
      },
      {
        eyebrow: "A practical chooser",
        title: "Start with the problem you can already see.",
        layout: "grid",
        tone: "ivory",
        items: [
          {
            title: "“The website is outdated or unclear.”",
            body: "Start with Website Design & Redesign.",
            href: "/services/website-design-redesign/",
            linkLabel: "See the design service",
          },
          {
            title: "“We need to leave our current provider.”",
            body: "Start with Website Migration & Provider Rescue.",
            href: "/services/website-migration-provider-rescue/",
            linkLabel: "See provider rescue",
          },
          {
            title: "“Competitors are easier to find locally.”",
            body: "Start with Local SEO or a Market Audit.",
            href: "/services/local-seo-search-visibility/",
            linkLabel: "See local visibility",
          },
          {
            title: "“People visit, but they do not contact us.”",
            body: "Start with Lead Generation & Conversion.",
            href: "/services/lead-generation-conversion/",
            linkLabel: "See lead-path work",
          },
          {
            title: "“We need steady improvement, not another one-time report.”",
            body: "Start with Ongoing SEO & Growth.",
            href: "/services/ongoing-seo-growth/",
            linkLabel: "See ongoing support",
          },
          {
            title: "“We do not know what is actually wrong.”",
            body: "Start with a Visibility Check or a Research & Audit project.",
            href: "/start/",
            linkLabel: "Get a first look",
          },
        ],
      },
      {
        title: "Bring the business problem. Boho will help name the service.",
        body: [
          "You do not need to diagnose the website, search market, provider setup, or measurement system before contacting us. Send the situation as it exists. The first useful decision is often choosing what not to buy.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/services/website-design-redesign/",
    title: "Website Design & Redesign for Local and Growing Businesses | Boho",
    metaDescription:
      "Boho designs distinctive, search-aware websites around services, trust, mobile usability, lead generation, technical foundations, and client ownership.",
    eyebrow: "Website Design & Redesign",
    headline: "Websites built to explain the business, earn trust, and make the next step obvious.",
    intro: [
      "Boho designs and redesigns websites for businesses that need clearer services, stronger visual identity, better search foundations, and cleaner paths from interest to action.",
    ],
    theme: "cinematic",
    primaryCta: { label: "Plan a Website", href: "/contact/" },
    secondaryCta: { label: "See the Design Approach", href: "#design-approach" },
    sections: [
      {
        eyebrow: "The website's job",
        title: "A business website has a job.",
        body: [
          "It should explain what the company does, who it helps, where it works, why someone should trust it, and what the visitor should do next.",
          "It should also behave like a durable business asset: readable on mobile, structured for search, fast enough to use, measurable, maintainable, and owned by the business.",
          "Visual quality matters. A distinctive site can communicate confidence before a visitor reads a paragraph. But design has to support the business. A beautiful page that hides the service, buries the phone number, or collapses on mobile is a poster with hosting fees.",
        ],
        quote: "The site should look like the business understands itself.",
        tone: "parchment",
      },
      {
        eyebrow: "Design inputs",
        title: "What Boho designs around",
        layout: "grid",
        items: [
          { title: "The offer", body: "The visitor should understand what the business sells and why it matters without excavating the navigation." },
          { title: "The customer", body: "Structure, language, proof, and calls to action should match what the customer needs before acting." },
          { title: "The market", body: "The site should respond to the actual competitive environment without becoming a copy of it." },
          { title: "Search structure", body: "Services, locations, internal links, metadata, headings, and architecture should make the site easier to understand." },
          { title: "Conversion paths", body: "Calls, forms, estimates, bookings, visits, purchases, and consultations should have clear routes." },
          { title: "Ownership", body: "The client should understand the platform, accounts, content, and handoff. The site should not become a new hostage situation." },
        ],
      },
      {
        eyebrow: "Concept range",
        title: "Adaptive by industry. Consistent in quality.",
        body: [
          "Boho does not force every business into one house style. A contractor, boutique, clinic, professional firm, and ecommerce shop ask different things of design because their customers and business models are different.",
        ],
        note: "Every fictional example below is a Concept interface, not client work or a claimed result.",
        layout: "grid",
        tone: "blue",
        items: [
          { title: "Concept interface — Home improvement", body: "Strong project-image fields, service-area clarity, estimate CTA, credentials, and review-proof placements." },
          { title: "Concept interface — Local service", body: "Calm service navigation, appointment path, local proof, and practitioner or team information." },
          { title: "Concept interface — Retail & hospitality", body: "Rich visual identity, location details, hours, discovery, and a reservation or visit action." },
          { title: "Concept interface — Ecommerce", body: "Product hierarchy, category discovery, trust, shipping clarity, and focused product pages." },
        ],
      },
      {
        eyebrow: "Design approach",
        title: "A five-stage build with one clear record.",
        layout: "steps",
        items: [
          { title: "1. Define the job", body: "Clarify the offer, audience, valuable customer actions, constraints, and what the current site is failing to do." },
          { title: "2. Map the structure", body: "Plan pages, navigation, service hierarchy, internal links, conversion paths, and content responsibilities." },
          { title: "3. Establish the visual system", body: "Create typography, color, layout, imagery, components, and page patterns that fit the business rather than the template library." },
          { title: "4. Build and verify", body: "Implement responsive pages, forms, technical basics, accessibility, search metadata, performance, and measurement readiness." },
          { title: "5. Launch with records", body: "Test key actions, preserve necessary URLs, document ownership, verify analytics and search access, and provide a readable handoff." },
        ],
      },
      {
        eyebrow: "Potential deliverables",
        title: "A scope assembled around the actual site.",
        layout: "list",
        items: [
          { title: "Strategy and content", body: "Sitemap and page plan; homepage and service-page copy; local-search foundations; metadata; internal linking." },
          { title: "Design and build", body: "Responsive visual system; core page design and build; forms and CTA paths; performance and accessibility review." },
          { title: "Launch and ownership", body: "Analytics and Search Console readiness; redirect planning when replacing a site; handoff and ownership documentation." },
        ],
        note: "Final scope depends on the business, current platform, content readiness, and whether Boho is designing, building, migrating, or repairing.",
      },
      {
        eyebrow: "Restraint is part of design",
        title: "Not every website needs a reinvention.",
        body: [
          "Boho will not recommend a full redesign simply because redesign work is easier to sell than careful repair. If the current site has a sound foundation, a focused improvement sprint may be the better investment.",
        ],
        layout: "list",
        items: [
          { title: "No borrowed credibility", body: "No copied competitor design, fabricated testimonials, project images, or placeholder claims." },
          { title: "No ownership fog", body: "Essential ownership stays visible to the client; platform limitations must be disclosed." },
          { title: "No decorative sabotage", body: "Usability, mobile behavior, and core contact paths come before visual tricks." },
        ],
        tone: "plum",
      },
      {
        title: "Build the website around what customers need to understand and do.",
        body: [
          "Send the current website, business model, service area, and the products or services that matter most. Boho will help determine whether the right move is a redesign, a rebuild, or a focused improvement project.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/services/website-migration-provider-rescue/",
    title: "Website Migration & Provider Rescue | Leave a Bad SEO or Web Provider",
    metaDescription:
      "Boho helps businesses recover ownership, leave bad SEO or web providers, preserve useful content and URLs, plan redirects, migrate platforms, and verify launches.",
    eyebrow: "Website Migration & Provider Rescue",
    headline: "Leave the bad provider without setting the useful parts on fire.",
    intro: [
      "Boho helps businesses move away from messy SEO companies, unclear hosting, fragile websites, undocumented systems, and provider lock-in while protecting the assets and visibility worth keeping.",
    ],
    theme: "cinematic",
    primaryCta: { label: "Plan the Rescue", href: "/contact/" },
    secondaryCta: { label: "Request Emergency Help", href: "/emergency/" },
    sections: [
      {
        title: "A website can look simple and still hide a complicated ownership problem.",
        body: [
          "Many businesses do not discover how fragile their setup is until they try to leave. The domain may be registered under the wrong account. Hosting may be bundled into a provider relationship nobody understands. Analytics may belong to someone else. Forms, plugins, redirects, or search properties may depend on undocumented access.",
          "A rushed move can break working pages, erase measurement history, lose search visibility, interrupt leads, or leave the business unable to control its own site.",
          "Boho maps the system before changing it. The objective is not merely to move files. It is to recover control, preserve value, reduce risk, and leave clearer records behind.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "Common rescue scenarios",
        title: "Different symptoms. One need for a careful map.",
        layout: "grid",
        items: [
          { title: "Leaving a bad SEO company", body: "Review visible work, inventory accounts, identify ownership gaps, preserve useful assets, and plan a cleaner next system when work, reporting, or access cannot be verified." },
          { title: "Moving to a new website or platform", body: "Inventory content, plan URL changes, specify redirects, protect important pages, and verify the new launch instead of treating every current asset as disposable." },
          { title: "Recovering ownership", body: "Create an access map and identify the smallest practical recovery path. Recovery may still require the owner, provider, registrar, or a legal process." },
          { title: "Cleaning up after a bad launch", body: "Inspect broken forms, changed rankings, missing pages, lost tracking, and other visible damage; prioritize corrections and document what remains uncertain." },
        ],
      },
      {
        eyebrow: "Migration map",
        title: "Move in six documented stages.",
        layout: "steps",
        items: [
          { title: "1. Inventory", body: "Document the [[domain-name|domain]], [[dns|DNS]], [[hosting|hosting]], CMS, analytics, search accounts, forms, email tools, [[api|integrations]], content, [[url|URLs]], and provider dependencies." },
          { title: "2. Secure ownership", body: "Confirm what the client owns, which access is missing, and which recovery actions require client involvement." },
          { title: "3. Preserve value", body: "Identify useful pages, links and rankings when legitimate data exists, content, forms, tracking, and public information that should survive." },
          { title: "4. Plan the move", body: "Define platform, URL behavior, redirects, content migration, launch sequence, rollback considerations, responsibilities, and dependencies." },
          { title: "5. Launch and verify", body: "Test critical pages, forms, phone links, redirects, analytics, indexability, mobile behavior, and search properties." },
          { title: "6. Document", body: "Leave an owner-facing record of accounts, changes, known limitations, and follow-up checks." },
        ],
        tone: "blue",
      },
      {
        eyebrow: "What may be reviewed",
        title: "Follow the whole trail, not just the page files.",
        layout: "grid",
        items: [
          { title: "Ownership layer", body: "[[domain-name|Domain registration]], [[dns|DNS]], [[hosting|hosting]], CMS or builder, administrator access, backups, provider reports, and [[api|integrations]]." },
          { title: "Measurement layer", body: "Analytics, Search Console, business profile when relevant, forms, notification routing, and call tracking when present." },
          { title: "Content and search layer", body: "URLs, redirects, content inventory, metadata, sitemaps, robots rules, and important link paths." },
          { title: "Governance layer", body: "Legal and privacy pages, account responsibility, launch records, and any platform-specific limits." },
        ],
      },
      {
        eyebrow: "Honest limits",
        title: "Provider rescue is technical work, not account theft with nicer branding.",
        body: [
          "Boho will only use authorized access and lawful recovery methods. We cannot bypass credentials, seize accounts, impersonate owners, or guarantee cooperation from a former provider.",
          "Where access is missing, Boho will document what is known, identify the responsible platform or party, and outline the smallest next recovery step.",
        ],
        tone: "plum",
      },
      {
        title: "Move carefully. Keep what matters. Leave cleaner records.",
        body: [
          "Send the website, provider name, known accounts, platform, and what you are trying to change. Boho will help determine whether the next move is an access inventory, migration plan, emergency repair, or full rebuild.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/services/local-seo-search-visibility/",
    title: "Local SEO & Search Visibility for Local Businesses | Boho",
    metaDescription:
      "Boho improves local search visibility through website structure, service and location pages, business-profile alignment, reviews, market research, and technical cleanup.",
    eyebrow: "Local SEO & Search Visibility",
    headline: "Help nearby customers find the business that actually deserves the call.",
    intro: [
      "Boho improves the local signals that help customers and search systems understand where you work, what you do, why you are credible, and how to contact you.",
    ],
    theme: "research",
    primaryCta: { label: "Improve Local Visibility", href: "/contact/" },
    secondaryCta: { label: "Request a Market Review", href: "/start/" },
    sections: [
      {
        title: "Local SEO is not a monthly ritual.",
        body: [
          "It is the work of making a business consistent, relevant, useful, and trustworthy in the places local customers search.",
          "The website, business profile, reviews, service areas, location information, categories, photos, service pages, citations, and content should tell a coherent story. When they do not, customers hesitate and search systems receive mixed signals.",
          "Boho studies the local market before recommending a large list of tasks. The market helps decide whether service pages, profile cleanup, review systems, location clarity, technical repairs, or website credibility should come first.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "Local visibility system",
        title: "Four groups of signals that should reinforce one another.",
        quote: "Local visibility is rarely one switch. It is a system of signals that should reinforce one another.",
        layout: "grid",
        items: [
          { title: "Business clarity", body: "Clear name, services, categories, locations, service areas, hours, contact information, and public descriptions." },
          { title: "Local relevance", body: "Useful service and location pages, local context, accurate coverage, and content that matches how customers search." },
          { title: "Trust", body: "Reviews, responses, real project or product proof, credentials where relevant, photos, policies, team information, and consistent public facts." },
          { title: "Technical support", body: "[[web-crawling|Crawlable pages]], sensible internal links, metadata, structured information, mobile usability, and measurement." },
        ],
      },
      {
        eyebrow: "What may improve",
        title: "Treat local visibility as a coordinated system.",
        layout: "grid",
        tone: "blue",
        items: [
          { title: "Business profile", body: "Categories, services, descriptions, photos, hours, links, service areas, and profile-to-website consistency." },
          { title: "Website", body: "Service pages, location pages, contact information, internal links, trust sections, calls to action, and useful local context." },
          { title: "Reputation", body: "Review-request process, response guidance, proof placement, and patterns competitors use to earn trust." },
          { title: "Market intelligence", body: "Local competitors, result types, directory presence, website quality, review patterns, and missed opportunities." },
          { title: "Measurement", body: "Profile actions, calls, forms, page visits, direction requests, local queries, and lead quality when data exists." },
        ],
      },
      {
        eyebrow: "No fake local scale",
        title: "Local reach without fake location-page sprawl.",
        body: [
          "Boho will not manufacture dozens of thin city pages that pretend the business has a unique story in every suburb. Location pages should exist when they help customers, reflect real service coverage, and contain meaningful local information.",
          "The same rule applies to addresses, teams, reviews, offices, and service claims: do not invent local proof.",
        ],
        tone: "plum",
      },
      {
        eyebrow: "Potential deliverables",
        title: "A local plan built from visible evidence.",
        layout: "list",
        items: [
          { title: "Audit and comparison", body: "Local visibility audit, business-profile review, website/profile consistency notes, competitor comparison, and service-area strategy." },
          { title: "Content and trust", body: "Service and location page plan, review-process recommendations, and citation or listing notes." },
          { title: "Technical and measurement", body: "Technical local SEO observations, tracking recommendations, implementation support, and ongoing local visibility work when justified." },
        ],
      },
      {
        title: "Make the business easier to find, understand, and trust locally.",
        body: [
          "Send the website, business profile, service area, and the services or products that matter most. Boho will identify the local signals worth strengthening first.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/services/lead-generation-conversion/",
    title: "Lead Generation & Website Conversion for Local Businesses | Boho",
    metaDescription:
      "Boho improves service pages, calls to action, forms, booking paths, trust signals, local visibility, and measurement to help businesses earn more qualified inquiries.",
    eyebrow: "Lead Generation & Conversion",
    headline: "Turn more useful attention into calls, quote requests, bookings, purchases, and qualified inquiries.",
    intro: [
      "Boho improves the pages, offers, trust signals, calls to action, forms, and measurement paths that help the right customer take the next step.",
    ],
    theme: "mosaic",
    primaryCta: { label: "Improve Lead Paths", href: "/contact/" },
    secondaryCta: { label: "Get a Visibility Check", href: "/start/" },
    sections: [
      {
        title: "A lead is not just a form submission. It is a business event.",
        body: [
          "For many local and project-based businesses, a qualified lead can be worth hundreds, thousands, or tens of thousands of dollars. That changes the optimization problem.",
          "The objective is not more traffic in the abstract. It is more of the right people taking a useful action: calling, requesting an estimate, booking, scheduling a consultation, visiting, or buying.",
          "Boho works backward from those actions. We study what the visitor needs to understand, what creates trust, where friction appears, and whether the current path can be measured.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "The path to action",
        title: "Six connected moments between need and follow-through.",
        layout: "steps",
        items: [
          { title: "1. Discovery", body: "Can the right customer find the relevant page or profile when the need appears?" },
          { title: "2. Understanding", body: "Can the visitor quickly tell what the business offers, where it works, and whether the service fits?" },
          { title: "3. Trust", body: "Does the page show credible proof, reviews, process, policies, credentials where relevant, and enough detail to reduce hesitation?" },
          { title: "4. Comparison", body: "Does the business give a clear reason to choose it without unsupported “best” claims?" },
          { title: "5. Action", body: "Are phone, form, quote, booking, store, or purchase paths obvious and usable on the visitor's device?" },
          { title: "6. Follow-through", body: "Does the inquiry reach the right person, and can the business understand where it came from?" },
        ],
      },
      {
        eyebrow: "High-value service logic",
        title: "Some pages deserve more attention because some services are worth more.",
        body: [
          "A roof-replacement page usually has a different business role from a general maintenance article. An HVAC-installation page matters differently from a company-history page. A product category matters differently from a casual announcement.",
          "Boho identifies the pages and actions most closely connected to value, then evaluates whether visibility, clarity, trust, or conversion is the limiting factor.",
        ],
        quote: "Traffic is a means. Qualified customer action is the point.",
        tone: "blue",
      },
      {
        eyebrow: "What may improve",
        title: "Fix the whole route, not one isolated button.",
        layout: "grid",
        items: [
          { title: "Offer clarity", body: "Service positioning, valuable offers, audience fit, pricing context where appropriate, and the next step." },
          { title: "Page structure", body: "Headlines, explanations, objections, proof, FAQs, internal links, and CTA placement." },
          { title: "Contact paths", body: "Phone links, forms, quote requests, bookings, consultations, purchases, directions, and confirmation messages." },
          { title: "Trust", body: "Real reviews, proof, process, team, policies, guarantees when real, credentials when real, and ownership signals." },
          { title: "Measurement", body: "Form events, phone clicks, booking clicks, product actions, landing pages, profile actions, and lead-source context." },
        ],
      },
      {
        eyebrow: "Lead quality",
        title: "More inquiries are not useful when every inquiry is wrong.",
        body: [
          "Boho may recommend clearer qualification, service-area language, minimum project context, better offer boundaries, or more precise service pages when the problem is lead quality rather than volume.",
          "Forms should collect enough context to help the business respond, but not so much that serious prospects abandon them.",
        ],
        tone: "plum",
      },
      {
        title: "Find the leaks between interest and inquiry.",
        body: [
          "Send the website, the customer actions that matter most, and what a valuable lead looks like for this business. Boho will identify the strongest first improvements.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/services/ongoing-seo-growth/",
    title: "Ongoing SEO & Growth Support for Local and Growing Businesses | Boho",
    metaDescription:
      "Boho provides ongoing SEO, content, local visibility, technical monitoring, reporting, research, and lead-focused optimization with clear monthly priorities.",
    eyebrow: "Ongoing SEO & Growth",
    headline: "Steady improvement without the mystery-retainer fog.",
    intro: [
      "Boho provides ongoing search, content, technical, local, reporting, and conversion support when continuous work has a clear business reason.",
    ],
    theme: "editorial",
    primaryCta: { label: "Ask About Ongoing Support", href: "/contact/" },
    secondaryCta: { label: "See Pricing", href: "/pricing/" },
    sections: [
      {
        title: "A monthly retainer should earn its right to exist.",
        body: [
          "Ongoing work makes sense when competitors are active, the website needs steady improvement, useful content supports real services, technical health needs monitoring, local visibility changes, or lead paths need continued testing.",
          "It does not make sense when the business needs one focused repair and the provider has to invent monthly chores afterward.",
          "Boho would rather start with a smaller project than sell recurring work without a visible operating reason.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "The monthly rhythm",
        title: "Discover → Prioritize → Build → Measure → Improve",
        layout: "steps",
        items: operatingCycle.map(({ title, body, href, linkLabel }) => ({ title, body, href, linkLabel })),
      },
      {
        eyebrow: "Possible work categories",
        title: "A monthly plan selects from the system.",
        body: [
          "The plan should not pretend every category receives deep work every month.",
        ],
        layout: "grid",
        tone: "blue",
        items: [
          { title: "Visibility and content", body: "Local SEO, business-profile support, service and location pages, content briefs, editing, publishing support, and internal linking." },
          { title: "Technical and measurement", body: "Technical monitoring, Search Console review, analytics and conversion-event review, and website updates." },
          { title: "Growth and coordination", body: "Lead-path improvement, market monitoring, provider coordination, reporting notes, and adjustments." },
          { title: "Proof and research", body: "Public proof or research support when relevant and supported by real work." },
        ],
      },
      {
        eyebrow: "Reporting",
        title: "The report should explain the decision.",
        body: [
          "Boho reporting should answer what we intended to improve, what work was completed, which signals changed, what remains uncertain, what should happen next, and what is not worth doing yet.",
          "A dashboard may support that conversation, but the dashboard is not the product.",
        ],
      },
      {
        eyebrow: "Fit check",
        title: "Not every business needs a retainer.",
        layout: "split",
        items: [
          { title: "A better fit", body: "Competitive markets, valuable services or products, active publishing, steady local work, a new site needing observation, coordinated services or locations, and capacity to respond to more leads." },
          { title: "A poor fit", body: "One repair solves the problem; the business cannot handle demand; nobody can approve content; the expectation is guaranteed rankings; budget cannot support meaningful work; or the foundation needs repair first." },
        ],
        tone: "plum",
      },
      {
        title: "Build a growth rhythm around the signals that matter.",
        body: [
          "Send the business, website, market, and the customer actions that matter most. Boho will help determine whether ongoing work makes sense or whether a smaller first project is the smarter move.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/services/technical-seo-site-health/",
    title: "Technical SEO & Website Health | Crawl, Indexing, Redirects & Structure",
    metaDescription:
      "Boho reviews and improves crawlability, indexing, metadata, redirects, internal links, structured data, performance, mobile behavior, and website architecture.",
    eyebrow: "Technical SEO & Site Health",
    headline: "Remove the technical friction worth caring about.",
    intro: [
      "Boho inspects the machinery that affects whether a website can be crawled, understood, used, measured, and maintained.",
    ],
    theme: "research",
    primaryCta: { label: "Inspect Site Health", href: "/contact/" },
    secondaryCta: { label: "Ask About a Migration", href: "/services/website-migration-provider-rescue/" },
    sections: [
      {
        title: "Technical SEO is not glamorous. It is still part of the foundation.",
        body: [
          "Important pages can be buried, duplicated, redirected badly, blocked, omitted from internal navigation, or published without useful metadata. Forms can fail. Mobile layouts can break. Measurement can disappear after a launch.",
          "Technical repair does not guarantee rankings. It removes avoidable friction so content, authority, local relevance, and customer experience have a better system to work through.",
          "Boho prioritizes issues by likely impact and business risk, not by how dramatic the audit tool colors them.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "Four issue classes",
        title: "Sort the warning before prescribing the fix.",
        layout: "grid",
        items: [
          { title: "Blocking issues", body: "Problems that may prevent important pages from being crawled, indexed, loaded, submitted, or used." },
          { title: "Value leaks", body: "Broken redirects, weak internal paths, duplicate versions, lost URLs, or tracking gaps that waste existing value." },
          { title: "Clarity problems", body: "Metadata, headings, canonical signals, structured information, or architecture that makes the site harder to interpret." },
          { title: "Maintenance debt", body: "Fragile plugins, unclear ownership, undocumented systems, inaccessible accounts, or configurations likely to make future work more expensive." },
        ],
      },
      {
        eyebrow: "What may be inspected",
        title: "A site-health review follows the system end to end.",
        layout: "grid",
        tone: "blue",
        items: [
          { title: "Discovery and indexing", body: "Robots directives, XML sitemaps, coverage, canonical signals, status codes, orphaned pages, duplicate paths, and crawl access." },
          { title: "Architecture", body: "Navigation, hierarchy, internal links, URL patterns, service/location structure, pagination where relevant, and content relationships." },
          { title: "Page signals", body: "Titles, descriptions, headings, structured information, image alternatives, and content duplication." },
          { title: "Performance and experience", body: "Page weight, image handling, scripts, mobile layout, interaction problems, and obvious performance bottlenecks." },
          { title: "Migration and redirects", body: "Old URLs, redirect chains, launch changes, platform transitions, broken links, and important route preservation." },
          { title: "Measurement and ownership", body: "Analytics, Search Console, tags, form events, business profiles, platform access, and documentation." },
        ],
      },
      {
        eyebrow: "Deliverable format",
        title: "A roadmap, not a pile of warnings.",
        body: [
          "Technical findings should name the issue, evidence, likely impact, recommended fix, priority, implementation difficulty, responsible party, and validation method.",
          "Where Boho cannot implement a fix directly, the roadmap should be clear enough for the relevant developer or provider to act.",
        ],
        tone: "ivory",
      },
      {
        title: "Find the technical problems worth fixing first.",
        body: [
          "Send the site, any known warnings, and recent launch or provider history. Boho will help separate real technical risk from decorative panic.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/services/research-audits-analytics/",
    title: "SEO Audits, Market Research & Analytics for Better Digital Decisions",
    metaDescription:
      "Boho maps markets, reviews competitors, studies success signals, audits websites and SEO, and turns analytics into prioritized business decisions.",
    eyebrow: "Research, Audits & Analytics",
    headline: "Find the strongest case before buying the largest project.",
    intro: [
      "Boho studies the business, market, competitors, website, search presence, and measurement system to identify which digital improvements are most likely to deserve attention.",
    ],
    theme: "research",
    primaryCta: { label: "Start With Evidence", href: "/contact/" },
    secondaryCta: { label: "Get a Visibility Check", href: "/start/" },
    sections: [
      {
        title: "Audits should create decisions.",
        body: [
          "A useful audit does not merely describe everything a tool can detect. It explains what appears weak, why it may matter, what evidence supports the concern, how difficult the fix is, and what should happen first.",
          "Boho combines technical review with business context. A missing title tag, weak service page, unclear conversion path, poor review profile, or inaccessible analytics account may all be problems. They are not automatically equal problems.",
          "The work is to rank them intelligently.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "Audit types",
        title: "Choose the smallest research scope capable of improving the decision.",
        layout: "grid",
        items: [
          { title: "Local Visibility Check", body: "A focused first look at the website, local presence, competitors, trust, contact paths, and obvious technical risks. Best when a business needs a starting point." },
          { title: "Growth Signal Audit", body: "A broader review of website, search visibility, lead paths, content, competitors, measurement, and likely opportunity before meaningful spending." },
          { title: "Local Market Report", body: "A study of competitor websites, profiles, reviews, service areas, result types, website quality, and visible gaps for a high-value service or new market." },
          { title: "Technical Site Audit", body: "A prioritized review of crawlability, indexing, architecture, redirects, metadata, performance, measurement, and migration risk." },
          { title: "Analytics and Reporting Review", body: "A review of what is measured, whether tracking supports business decisions, and which signals should be added, removed, or interpreted differently." },
        ],
      },
      {
        eyebrow: "Success-signal theory",
        title: "Measure the chain, not just the first number.",
        body: [
          "Visibility → relevant visit → understanding → trust → action → business outcome.",
          "A traffic increase may fail to create leads. A ranking may attract the wrong intent. A service page may generate calls even when it is not the most visited page. A review improvement may increase trust without producing a clean attribution path.",
          "The report should acknowledge those limits while still helping the business decide.",
        ],
        quote: "Correlation helps form the hypothesis. Customer behavior tests whether the hypothesis is useful.",
        tone: "blue",
      },
      {
        eyebrow: "Report structure",
        title: "Evidence with a readable sequence.",
        layout: "steps",
        items: [
          { title: "1–3. Frame the work", body: "Executive summary, business and market context, and known data limitations." },
          { title: "4–6. Show the evidence", body: "Success signals and desired actions, findings by category, and competitor or market comparison." },
          { title: "7–9. Make the decision", body: "Priority model, recommended sequence, and measurement plan." },
          { title: "10–11. Name the constraints", body: "Risks and dependencies, followed by an optional implementation scope." },
        ],
      },
      {
        eyebrow: "Analytics philosophy",
        title: "If the report does not change the next decision, it may be decoration.",
        body: [
          "Boho reporting focuses on signals the business can interpret and act on: calls, forms, bookings, purchases, profile actions, high-value pages, query patterns, index coverage, or lead quality where real data exists.",
          "Do not overload owners with every available metric. Preserve access to underlying data, but lead with the decisions.",
        ],
        tone: "plum",
      },
      {
        title: "See the market and the system before spending more.",
        body: [
          "Send the business, website, market, and what you are considering. Boho will help choose the smallest research scope capable of improving the decision.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/pricing/",
    title: "Pricing | Website Design, SEO, Migration, Audits & Growth Support",
    metaDescription:
      "See planning ranges for Boho website design, provider rescue, migration, SEO audits, lead-generation work, technical cleanup, research, and ongoing support.",
    eyebrow: "Pricing",
    headline: "Clear planning ranges. No mystery retainers.",
    intro: [
      "Start with the smallest useful step. Scale only when the work has a clear business case.",
    ],
    theme: "editorial",
    primaryCta: { label: "Get a Visibility Check", href: "/start/" },
    draftLabel: "Provisional planning ranges — business approval is required before production publication.",
    sections: [
      {
        title: "Lower prices because the operating model is leaner, not because the work is weaker.",
        body: [
          "Boho is built around direct work, research, reusable systems, automation-assisted workflows, documentation, and a small operating structure.",
          "You are not paying for a giant sales department, an account-management maze, expensive office theater, or reports designed to make ordinary work look mysterious.",
          "The final scope still depends on the site, market, access, platform, urgency, content, and implementation depth. These ranges are planning anchors, not automatic quotes.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "Planning ranges",
        title: "Start with the problem, then scope the work.",
        note: "Every amount below is provisional and for planning only. It is not an automatic quote, promise of availability, or guarantee of results.",
        layout: "grid",
        items: [
          { title: "Local Visibility Check", body: "Free initial screen or low-cost expanded review, depending on depth. A first look at the website, local presence, lead path, provider risks, and the next useful diagnostic.", href: "/start/", linkLabel: "Start Here" },
          { title: "Growth Signal Audit · $350–$750", body: "For businesses that need to understand what may be holding back visibility, leads, website clarity, or growth. Scope may cover the site, local visibility, technical observations, competitors, signals, and priorities.", href: "/contact/", linkLabel: "Request an Audit" },
          { title: "Technical SEO & Site Health · $750–$1,500", body: "Planning range for focused small-site work. May include a technical roadmap, agreed fixes, redirects, metadata, internal-link cleanup, validation, and documentation.", href: "/services/technical-seo-site-health/", linkLabel: "Ask About Site Health" },
          { title: "Lead Generation & Conversion Sprint · $750–$2,500", body: "For service pages, calls to action, forms, phone or booking paths, trust, mobile use, and conversion measurement on an existing site.", href: "/services/lead-generation-conversion/", linkLabel: "Improve Lead Paths" },
          { title: "Website Design or Redesign · $1,200–$3,500", body: "Planning range for early, focused small-business scopes. Larger catalogs, custom integrations, advanced ecommerce, complex migrations, custom applications, and extensive content require separate scope.", href: "/services/website-design-redesign/", linkLabel: "Plan a Website" },
          { title: "Website Migration & Provider Rescue · scoped after discovery", body: "For provider exits, platform changes, ownership recovery, URL preservation, and bad-launch cleanup. Discovery is required before pricing risk and responsibility.", href: "/services/website-migration-provider-rescue/", linkLabel: "Plan the Rescue" },
          { title: "Local Market Report or Research · $500–$2,000", body: "Range depends on geography, category, sample size, and deliverable depth. May include a market definition, competitor sample, signal comparison, opportunity hypotheses, priorities, and limitations.", href: "/services/research-audits-analytics/", linkLabel: "Map the Market" },
          { title: "Ongoing SEO & Growth · $300–$900/month", body: "Early small-business planning range. The lower end supports a narrow maintenance scope; it is not unlimited SEO, content, design, research, and development.", href: "/services/ongoing-seo-growth/", linkLabel: "Ask About Ongoing Support" },
          { title: "Emergency Website Help · rush pricing after triage", body: "For legitimate urgent failures involving forms, launches, access, redirects, indexing, DNS, tracking, or migration. Availability and scope cannot be promised before triage.", href: "/emergency/", linkLabel: "Request Emergency Help" },
        ],
      },
      {
        eyebrow: "Questions before scope",
        title: "Pricing without theater.",
        layout: "list",
        items: [
          { title: "Why are these ranges?", body: "Site size, platform, market, access, content readiness, urgency, integrations, and whether Boho is diagnosing, implementing, migrating, or rebuilding all change the real scope." },
          { title: "Can we start small?", body: "Yes. Boho prefers the smallest project capable of improving the decision or fixing the actual problem." },
          { title: "Do you require long contracts?", body: "No. Ongoing work should continue because it is useful, not because leaving is painful." },
          { title: "Why can Boho cost less than a large agency?", body: "Fewer layers, direct technical work, reusable systems, research workflows, and documentation keep overhead lower." },
          { title: "Are results guaranteed?", body: "No. Search visibility, leads, traffic, conversion, and revenue depend on many variables. Boho defines the hypothesis, explains the evidence, implements agreed work, and measures what can reasonably be measured." },
          { title: "Does the client own the website and accounts?", body: "The default goal is client ownership and documented access. Any platform-specific limitations must be disclosed before work begins." },
        ],
      },
      {
        title: "Start with a scope that has a reason to exist.",
        body: [
          "Send the website, business model, problem, and budget context. Boho will help identify the smallest useful first project.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/about/",
    title: "About Boho Digital Services | Creative, Research-Led Digital Work",
    metaDescription:
      "Boho is a small, research-led digital shop combining website design, SEO, migration, provider rescue, lead generation, and ongoing growth support.",
    eyebrow: "About Boho",
    headline: "Independent thinking, careful craft, and digital work tied to the business in front of us.",
    intro: [
      "Boho Digital Services is a small, research-led shop that combines website design, SEO, provider rescue, migration, lead generation, and ongoing growth support.",
      "Boho currently serves businesses across the United States without presenting a public office address.",
    ],
    theme: "editorial",
    primaryCta: { label: "See How Boho Works", href: "#how-boho-operates" },
    secondaryCta: { label: "Start a Conversation", href: "/contact/" },
    sections: [
      {
        title: "Small businesses are often sold digital work that is too vague, too expensive, or too generic.",
        body: [
          "The package arrives before the diagnosis. Reports show activity without explaining the decision. Websites are redesigned without understanding how the business earns trust. SEO becomes a recurring ritual nobody can clearly defend.",
          "Boho exists to work differently: study the business and market, identify the useful signals, choose the smallest credible intervention, do the work, document it, and adjust when the evidence changes.",
          "That may mean building a distinctive new website. It may mean repairing the current site, rescuing the business from a bad provider, improving local visibility, strengthening lead paths, or supporting steady growth over time.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "The name",
        title: "Bohemian is an operating philosophy, not a costume.",
        body: [
          "For Boho, bohemian means independent, adaptive, curious, multidisciplinary, and willing to reject stale agency habits when they do not serve the business.",
          "It means meeting each company where it is rather than forcing every company through the same package. It means combining design, research, code, content, SEO, measurement, and practical business reasoning when the problem crosses boundaries.",
          "It means staying lean enough to change direction when the evidence changes. It does not mean every page needs a bee joke.",
        ],
        tone: "blue",
      },
      {
        eyebrow: "Operating principles",
        title: "Seven ways the philosophy enters the work.",
        layout: "list",
        items: [
          { title: "Research before prescription", body: "Understand the business, market, customer, valuable actions, and constraints before recommending the largest project." },
          { title: "Creativity with a job", body: "Use visual and strategic creativity to solve the real problem, not to decorate around it." },
          { title: "Signals before vanity", body: "Pay attention to visibility, trust, customer action, lead quality, ownership, and business value—not a metric merely because software can chart it." },
          { title: "Small by design", body: "Keep the work close to the people doing it. Reduce layers, overhead, and translation loss." },
          { title: "Client ownership", body: "Prefer client-owned accounts, portable assets, readable documentation, and relationships that continue because they are useful." },
          { title: "Show the work", body: "Explain assumptions, actions, limitations, and next steps. Build public proof through owned experiments and documented projects." },
          { title: "Honest uncertainty", body: "Do not turn probability into a guarantee. State what is known, what is inferred, and what needs testing." },
        ],
      },
      {
        eyebrow: "How Boho operates",
        title: "Discover → Prioritize → Build → Measure → Improve",
        layout: "steps",
        items: operatingCycle.map(({ title, body, href, linkLabel }) => ({ title, body, href, linkLabel })),
      },
      {
        eyebrow: "Lean by design",
        title: "Low overhead is part of the product.",
        body: [
          "Boho uses a small operating structure, reusable workflows, automation-assisted research, direct technical work, and clear documentation. The goal is to put more of the client's budget into useful output.",
          "This does not mean every project is cheap. It means the price should reflect the actual work rather than a large internal machine.",
        ],
        tone: "plum",
      },
      {
        title: "Bring the real situation, not a polished brief.",
        body: [
          "Boho is built for businesses that need clarity before they spend more on websites, SEO, migration, or growth.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/contact/",
    title: "Contact Boho Digital Services",
    metaDescription:
      "Contact Boho about website design, migration, provider rescue, local SEO, lead generation, technical cleanup, research, analytics, or ongoing growth support.",
    eyebrow: "Contact",
    headline: "Tell us what is stuck.",
    intro: [
      "Send the business, website, market, and the problem you are trying to solve. Boho will help identify the most useful first step.",
      "For a direct email, use contact@bohemiandigital.org. Website issues may be reported to webmaster@bohemiandigital.org. These public links do not promise a response time.",
    ],
    theme: "editorial",
    primaryCta: { label: "Go to the inquiry form", href: "#request-form" },
    secondaryCta: { label: "Get a Visibility Check", href: "/start/" },
    sections: [
      {
        title: "Bring the actual situation.",
        body: [
          "You do not need perfect documentation. Share what you know: the website, business type, market, current provider, what has been tried, what feels broken, and which customer actions matter most.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "Useful context",
        title: "Three good ways to begin.",
        layout: "grid",
        items: [
          { title: "Planning a website?", body: "Tell us what the business sells, which pages or actions matter most, what is wrong with the current site, and whether content or branding already exists." },
          { title: "Leaving a provider?", body: "Share the current site, provider, known platform, registrar if known, analytics access if known, and what needs to change. Do not send passwords." },
          { title: "Need growth or leads?", body: "Tell us which services or products are most valuable, where the business operates, what a qualified inquiry looks like, and what is currently measured." },
        ],
      },
    ],
    form: {
      title: "Project inquiry",
      body: "Share enough context to help Boho identify the right starting point.",
      submitLabel: "Review inquiry",
      fields: [
        { name: "name", label: "Name", type: "text", required: true, placeholder: "Your name" },
        { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
        { name: "businessName", label: "Business name", type: "text", required: true },
        { name: "website", label: "Website URL (if one exists)", type: "url", placeholder: "https://" },
        { name: "businessType", label: "Business type", type: "text", required: true },
        {
          name: "service",
          label: "What do you need help with?",
          type: "select",
          required: true,
          options: [
            "Website Design or Redesign",
            "Website Migration and Provider Rescue",
            "Local SEO and Search Visibility",
            "Lead Generation and Conversion",
            "Ongoing SEO and Growth",
            "Technical SEO and Site Health",
            "Research, Audit, or Analytics",
            "Emergency Website Help",
            "Not sure yet",
          ],
        },
        { name: "message", label: "Message", type: "textarea", required: true, hint: "What is stuck, what has been tried, and what would a useful outcome look like?" },
        { name: "serviceArea", label: "City, region, or service area", type: "text" },
        { name: "provider", label: "Current provider or platform", type: "text" },
        { name: "valuableAction", label: "Most valuable customer action", type: "text", placeholder: "Call, estimate, booking, purchase, visit…" },
        { name: "valuableOffer", label: "Most valuable service or product", type: "text" },
        {
          name: "budget",
          label: "Budget range",
          type: "select",
          hint: "Budget helps route scope; it does not automatically reject an inquiry.",
          options: ["Under $500", "$500–$1,000", "$1,000–$2,500", "$2,500–$5,000", "$5,000+", "Not sure yet"],
        },
        { name: "timing", label: "Desired timing", type: "text" },
      ],
      privacyNote:
        "Do not submit passwords, payment data, private customer information, health information, or other sensitive records. Boho will request authorized access through the appropriate platform if a project moves forward. This preview form does not transmit or retain entries.",
      consent:
        "By submitting a future connected form, you would agree that Boho may use the information to review and respond to your inquiry. Submission would not create a client relationship or guarantee availability.",
    },
  },
  {
    slug: "/start/",
    title: "Local Visibility Check | Boho Digital Services",
    metaDescription:
      "Request an initial Boho review of your website, local search presence, provider risks, visible competitors, trust signals, and lead-generation path.",
    eyebrow: "Local Visibility Check",
    headline: "Find the obvious leaks before buying a larger digital package.",
    intro: [
      "Boho will take a focused first look at the website, local presence, visible competitors, lead path, and provider risks to identify the most useful next diagnostic.",
    ],
    theme: "research",
    primaryCta: { label: "Start the Check", href: "#request-form" },
    secondaryCta: { label: "See all services", href: "/services/" },
    sections: [
      {
        eyebrow: "What the check covers",
        title: "A focused first look at five visible signal groups.",
        layout: "grid",
        items: [
          { title: "Website clarity", body: "Can a visitor understand the main services, location or coverage, trust, and next action?" },
          { title: "Local presence", body: "Is the public business information coherent across the website and major local profile?" },
          { title: "Lead path", body: "Are calls, forms, bookings, estimates, visits, or purchases easy to reach and use?" },
          { title: "Visible competition", body: "Do nearby or relevant competitors appear clearer, more credible, or easier to act on?" },
          { title: "Obvious risks", body: "Are there visible technical, ownership, provider, migration, or measurement concerns worth investigating?" },
        ],
      },
      {
        eyebrow: "Scope boundary",
        title: "A first look, not a free consulting novel.",
        body: [
          "The Local Visibility Check asks whether there is an obvious problem, a plausible opportunity, a useful next investigation, a justified paid project, or something the business should ignore for now.",
          "It is not a complete technical crawl, full market report, custom strategy, redesign plan, or implementation scope. It does not guarantee results.",
        ],
        tone: "plum",
      },
    ],
    form: {
      title: "Visibility Check request",
      body: "Give Boho enough context to understand the business and the visible problem.",
      submitLabel: "Review request",
      fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "businessName", label: "Business name", type: "text", required: true },
        { name: "website", label: "Website URL", type: "url", required: true, placeholder: "https://" },
        { name: "businessType", label: "Business type", type: "text", required: true },
        { name: "serviceArea", label: "City, region, or service area", type: "text", required: true },
        { name: "stuck", label: "What feels stuck?", type: "textarea", required: true },
        { name: "valuableAction", label: "Most valuable customer action", type: "text", required: true, placeholder: "Call, estimate, booking, purchase, visit…" },
        { name: "provider", label: "Current website, SEO, or hosting provider", type: "text" },
        { name: "topOffer", label: "Top service or product", type: "text" },
        { name: "competitors", label: "Known competitors", type: "textarea" },
        { name: "budget", label: "Budget context", type: "text" },
        { name: "timing", label: "Time sensitivity", type: "text" },
        {
          name: "scopeAcknowledgement",
          label: "I understand this is an initial review, not a complete audit or guarantee of results.",
          type: "checkbox",
          required: true,
        },
      ],
      privacyNote:
        "Boho would use this information only to review the request and respond about the project. Do not submit passwords, private customer information, health information, payment data, or other sensitive material. This preview form does not transmit or retain entries.",
    },
  },
  {
    slug: "/emergency/",
    title: "Emergency Website Help | Launch, Forms, Access, Redirects & SEO Problems",
    metaDescription:
      "Request urgent help for broken website forms, bad launches, provider lockout, redirect mistakes, indexing problems, DNS confusion, tracking loss, or migration failures.",
    eyebrow: "Emergency Website Help",
    headline: "Something broke. Stop it from getting worse.",
    intro: [
      "Boho helps triage urgent website, launch, migration, provider, tracking, form, redirect, and access problems when waiting politely is not a strategy.",
    ],
    theme: "cinematic",
    primaryCta: { label: "Request Emergency Review", href: "#request-form" },
    secondaryCta: { label: "Provider rescue", href: "/services/website-migration-provider-rescue/" },
    sections: [
      {
        eyebrow: "Common emergencies",
        title: "Urgent, specific, and worth triaging calmly.",
        layout: "grid",
        items: [
          { title: "Leads stopped", body: "Contact forms, booking links, phone links, checkout, or notifications are broken." },
          { title: "Launch went wrong", body: "Important pages disappeared, redirects failed, mobile layouts broke, or useful URLs were replaced without a plan." },
          { title: "Search access changed", body: "Pages are blocked, removed, deindexed, redirected incorrectly, or Search Console reports a serious change." },
          { title: "Provider access failed", body: "The business lost access to the website, domain, hosting, analytics, or another critical account." },
          { title: "DNS or domain problem", body: "The domain stopped resolving, records changed, or a provider transition interrupted the site or email. Email repair may require the relevant IT or email provider." },
          { title: "Measurement disappeared", body: "Analytics, tags, forms, or conversion events stopped working after a change." },
        ],
      },
      {
        eyebrow: "Triage boundaries",
        title: "Urgent does not mean unlimited.",
        body: [
          "Emergency work is priced differently because it interrupts planned work and may require rapid investigation. Boho will not pretend every warning is an emergency; if the issue can safely wait for a standard project, we will say so.",
          "Boho cannot promise immediate availability, unauthorized account recovery, platform cooperation, or repair of systems outside the agreed access and competence.",
        ],
        tone: "plum",
      },
      {
        title: "Send the facts before the panic multiplies them.",
        body: [
          "Include the website, what changed, when the problem started, what the business is losing, and which provider or platform is involved.",
        ],
        tone: "dark",
      },
    ],
    form: {
      title: "Emergency website triage",
      body: "Describe the incident with facts, timing, business impact, and the systems involved.",
      submitLabel: "Review emergency request",
      fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "businessName", label: "Business name", type: "text", required: true },
        { name: "website", label: "Website URL", type: "url", required: true, placeholder: "https://" },
        { name: "problem", label: "What broke?", type: "textarea", required: true },
        { name: "began", label: "When did it begin?", type: "text", required: true },
        { name: "priorChange", label: "What changed immediately before the problem?", type: "textarea", required: true },
        { name: "impact", label: "Business impact", type: "textarea", required: true },
        { name: "platform", label: "Platform or provider, if known", type: "text", required: true, hint: "Enter Unknown if it is not known." },
        { name: "authorizedAccess", label: "Authorized access available?", type: "select", required: true, options: ["Yes", "No", "Unknown"] },
        { name: "error", label: "Error message", type: "textarea" },
        { name: "providerContact", label: "Current developer or provider contact", type: "text" },
        { name: "deadline", label: "Deadline caused by the problem", type: "text" },
      ],
      privacyNote:
        "Do not submit passwords or private keys. Boho would request access through authorized platform invitations or another secure method. Screenshot upload is unavailable while this review form is disconnected, and no entries are transmitted or retained.",
    },
  },
  {
    slug: "/privacy/",
    title: "Privacy Policy Draft | Boho Digital Services",
    metaDescription: "Draft privacy notice for review before the Boho Digital Services website is published.",
    eyebrow: "Legal review draft",
    headline: "Privacy",
    intro: [
      "This is a restrained working draft, not a final privacy policy or legal advice. It must be reconciled with the actual business identity, jurisdiction, hosting, forms, analytics, cookies, email tools, and data flows before production publication.",
    ],
    theme: "editorial",
    primaryCta: { label: "Review accessibility", href: "/accessibility/" },
    secondaryCta: { label: "Return home", href: "/" },
    noIndex: true,
    draftLabel: "Draft — noindex — requires legal and operational review before publication.",
    sections: [
      {
        title: "Business identity and contact",
        body: [
          "The public-facing trade name is Boho Digital Services. The legal entity is identified in the Website Terms. No public street address is presented. A final privacy-contact and response process still requires operational and legal review.",
        ],
        tone: "plum",
      },
      {
        title: "Information collected through forms",
        body: [
          "The proposed contact, Visibility Check, and emergency forms ask for business and project context such as name, email, business name, website, service area, provider details, budget context, timing, and a description of the problem.",
          "The current review forms are disconnected and are not intended to transmit or retain entries. Visitors must not submit passwords, payment data, private customer information, health information, private keys, or other sensitive records.",
        ],
      },
      {
        title: "Analytics, cookies, hosting, and processors",
        body: [
          "No Boho analytics account or external form processor has been approved or activated for this draft. A final notice must name the analytics, cookies, hosting, form processing, spam protection, email tools, embeds, and operational logging actually used at launch.",
          "Do not infer that a service is absent merely because it is not named here; verify the production configuration and describe only what is actually active.",
        ],
        tone: "parchment",
      },
      {
        title: "Use, retention, and security",
        body: [
          "A final policy should state that submitted information is used to review and respond to inquiries and should define the approved retention period, deletion process, lawful basis where applicable, access controls, and reasonable security practices.",
          "No website can promise perfect security. Production handling should use HTTPS, least-privilege access, platform-native secret management, input validation, accessible spam protection, and authorized invitations for account access.",
        ],
      },
      {
        title: "Third-party links, rights, and contact process",
        body: [
          "External sites have their own practices. A final policy should explain relevant privacy rights for the applicable jurisdiction and provide a real way to request access, correction, deletion, restriction, or another supported action.",
          "An approved privacy contact method is still missing and must be added before publication.",
        ],
      },
      {
        title: "Updates and effective date",
        body: [
          "No effective date has been approved. Add one only after the policy matches the production site, and describe how material updates will be reflected.",
        ],
        note: "Required pre-publication review: business identity, jurisdiction, hosting, form processor, notification address, analytics, cookies, email tool, embeds, retention, contact process, and effective date.",
        tone: "dark",
      },
    ],
  },
  {
    slug: "/terms/",
    title: "Website Terms Draft | Boho Digital Services",
    metaDescription: "Draft website terms for review before the Boho Digital Services website is published.",
    eyebrow: "Legal review draft",
    headline: "Website Terms",
    intro: [
      "These restrained terms are a working draft for site review. They are not a substitute for a project agreement and require legal review, business identity, jurisdiction, contact details, and an effective date before publication.",
    ],
    theme: "editorial",
    primaryCta: { label: "Review privacy", href: "/privacy/" },
    secondaryCta: { label: "Return home", href: "/" },
    noIndex: true,
    draftLabel: "Draft — noindex — requires legal review before publication.",
    sections: [
      {
        title: "Informational site",
        body: [
          "The website describes Boho's proposed services, philosophy, planning ranges, and ways to begin a conversation. Site content is general information and is not legal, financial, security, or other regulated professional advice.",
          "Planning ranges are provisional anchors, not quotes or promises of availability.",
        ],
      },
      {
        title: "No client relationship from browsing or form submission",
        body: [
          "Browsing this site, using a draft form, or sending an inquiry does not create a client relationship. Any project begins only through a separately approved agreement that defines scope, responsibilities, price, timing, ownership, access, and other terms.",
          "The forms in this review build are disconnected and do not send or store submissions.",
        ],
        tone: "parchment",
      },
      {
        title: "No guarantee of results",
        body: [
          "Boho does not guarantee rankings, traffic, leads, conversion, revenue, platform cooperation, account recovery, or uninterrupted availability. Digital outcomes depend on many variables outside a single provider's control.",
          "Where work is approved, Boho should explain the hypothesis, evidence, scope, limitations, and what can reasonably be measured.",
        ],
        tone: "plum",
      },
      {
        title: "Intellectual property and permitted use",
        body: [
          "A final version should identify the owner of original site text, design, marks, and other materials, and explain the limited personal or business-reference use permitted to visitors. It should not claim rights Boho does not own.",
          "Project deliverables and client ownership are governed by the separate project agreement, including any platform, font, stock, open-source, or third-party limitations.",
        ],
      },
      {
        title: "Third-party links and limitation language",
        body: [
          "Links to third-party websites do not control or endorse those sites' availability, accuracy, security, or practices. Any warranty disclaimer, limitation of liability, indemnity, governing-law, or dispute language must be written or approved for the actual business and jurisdiction by qualified counsel.",
        ],
      },
      {
        title: "Contact and effective date",
        body: [
          "Boho Digital Services is operated by Republic of Bohemia LLC. The current service area is the United States, and no public street address is presented. General inquiries may be sent to contact@bohemiandigital.org and website issues to webmaster@bohemiandigital.org. These public email links do not create a client relationship, guarantee monitoring, or promise a response time. Governing law, jurisdiction, and an effective date still require legal review before these terms become final.",
        ],
        note: "These website terms do not replace estimates, statements of work, service agreements, privacy obligations, or project contracts.",
        tone: "dark",
      },
    ],
  },
  {
    slug: "/accessibility/",
    title: "Accessibility Draft | Boho Digital Services",
    metaDescription: "Draft accessibility statement for the Boho Digital Services website review build.",
    eyebrow: "Review draft",
    headline: "Accessibility",
    intro: [
      "Boho Digital Services aims to make this website usable by a broad range of visitors and to improve accessibility over time.",
      "If you encounter a barrier, contact Boho with the page, device, browser, and problem. We will review the issue and identify a practical correction where possible.",
    ],
    theme: "editorial",
    primaryCta: { label: "Review the site", href: "/" },
    secondaryCta: { label: "Contact page", href: "/contact/" },
    noIndex: true,
    draftLabel: "Draft — noindex — add a real accessibility contact method before publication.",
    sections: [
      {
        title: "The current target",
        body: [
          "The site is being built toward WCAG 2.2 AA principles. That is a practical design and testing target, not an unsupported certification claim or a promise that every barrier has already been found.",
        ],
        tone: "parchment",
      },
      {
        title: "What the review includes",
        layout: "grid",
        items: [
          { title: "Structure and navigation", body: "Heading hierarchy, landmarks, skip navigation, reading order, descriptive links, keyboard operation, visible focus, and an accessible mobile menu." },
          { title: "Readable presentation", body: "Color contrast, text sizing, touch targets, reduced-motion support, and no essential information available only on hover." },
          { title: "Forms and media", body: "Accessible labels, required and optional indication, adjacent validation, useful alternatives for images, and no normal body text embedded in imagery." },
          { title: "Real output", body: "Testing the rendered site and its key routes instead of assuming a builder or component handled accessibility automatically." },
        ],
      },
      {
        title: "Report a barrier",
        body: [
          "Provide the page address, device, browser, assistive technology if relevant, what you tried to do, and what happened. Do not include passwords or sensitive records.",
          "A real, monitored contact method and response process have not been approved. They must be added before this statement is published as final.",
        ],
        tone: "plum",
      },
      {
        title: "Status of this statement",
        body: [
          "This page describes the intended accessibility process for a review build. It requires an updated test date, known limitations if any, approved contact path, and final operational review before publication.",
        ],
        tone: "dark",
      },
    ],
  },
];
