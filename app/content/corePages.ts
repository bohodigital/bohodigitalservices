import type { PageConfig } from "./types";
import { operatingCycle } from "./operatingCycle";

export const corePages: PageConfig[] = [
  {
    slug: "/services/",
    title: "Digital Engineering Services | Boho Digital Services",
    metaDescription:
      "Explore Boho local visibility and lead systems, websites and managed hosting, provider rescue and migration, custom tools and automation, and research-led improvement.",
    eyebrow: "Services",
    headline: "Five service lanes for businesses that need the whole system explained.",
    intro: [
      "Boho is a digital-engineering firm. We connect commercial goals to the websites, visibility systems, lead paths, provider infrastructure, operational tools, and measurements underneath them.",
    ],
    theme: "mosaic",
    primaryCta: { label: "Talk to Someone Technical", href: "/contact/" },
    secondaryCta: { label: "See What We Build", href: "/tools/" },
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
        eyebrow: "Five governed service lanes",
        title: "Choose the lane after naming the problem.",
        layout: "grid",
        items: [
          {
            title: "Local Visibility & Lead Systems",
            body: "Connect local discovery, business-profile accuracy, service pages, trust, calls to action, inquiry paths, and measurement around the qualified actions that matter.",
            href: "/services/local-seo-search-visibility/",
            linkLabel: "Build the Lead System",
          },
          {
            title: "Websites & Managed Hosting",
            body: "Design and operate useful, distinctive websites around ownership, search structure, accessibility, performance, customer action, and clearly bounded managed hosting.",
            href: "/services/website-design-redesign/",
            linkLabel: "Plan the Website System",
          },
          {
            title: "Provider Rescue & Migration",
            body: "Inventory ownership and dependencies, recover authorized control, preserve useful URLs and assets, plan the move, verify the launch, and leave readable records.",
            href: "/services/website-migration-provider-rescue/",
            linkLabel: "Plan the Rescue",
          },
          {
            title: "Custom Tools & Automation",
            body: "Engineer focused tools, integrations, and automations for repeated operational work that is slow, fragile, or difficult to audit by hand.",
            href: "/services/custom-tools-automation/",
            linkLabel: "Explore Practical Automation",
          },
          {
            title: "Research, Analytics & Improvement",
            body: "Diagnose systems, map markets, inspect technical health, review measurement, prioritize the work, and run an accountable improvement cycle.",
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
            title: "The website is outdated, unclear, or difficult to operate.",
            body: "Start with Websites & Managed Hosting.",
            href: "/services/website-design-redesign/",
            linkLabel: "See the design service",
          },
          {
            title: "We need to leave our current provider.",
            body: "Start with Provider Rescue & Migration.",
            href: "/services/website-migration-provider-rescue/",
            linkLabel: "See provider rescue",
          },
          {
            title: "Competitors are easier to find and easier to contact.",
            body: "Start with Local Visibility & Lead Systems.",
            href: "/services/local-seo-search-visibility/",
            linkLabel: "See local visibility",
          },
          {
            title: "Repeated internal work is slow or unreliable.",
            body: "Start with Custom Tools & Automation.",
            href: "/services/custom-tools-automation/",
            linkLabel: "See operational engineering",
          },
          {
            title: "We do not know what is actually wrong.",
            body: "Start with Research, Analytics & Improvement.",
            href: "/services/research-audits-analytics/",
            linkLabel: "Begin with diagnosis",
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
    title: "Websites & Managed Hosting | Boho Digital Services",
    metaDescription:
      "Boho designs, builds, and maintains useful websites around ownership, search structure, accessibility, performance, customer action, and a clearly governed hosting provision.",
    eyebrow: "Websites & Managed Hosting",
    headline: "Websites built to explain the business, earn trust, and remain understandable to operate.",
    intro: [
      "Boho designs, redesigns, and supports websites for businesses that need clearer services, stronger identity, better search foundations, cleaner lead paths, and less infrastructure fog.",
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
        eyebrow: "Managed hosting provision",
        title: "Hosting is part of the operating system, not a vague add-on.",
        body: [
          "Standard managed hosting is included at no separate hosting charge for eligible websites while an active qualifying retainer remains in good standing.",
          "Eligibility, platform limits, traffic or storage constraints, third-party costs, support boundaries, ownership, exit handling, and any work outside the qualifying retainer must be stated in the project agreement. This sentence is a commercial provision, not a promise of unlimited infrastructure or support.",
        ],
        tone: "verdigris",
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
        title: "A six-stage engineering method with one clear record.",
        layout: "steps",
        items: operatingCycle.map(({ title, body, href, linkLabel }) => ({ title, body, href, linkLabel })),
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
    slug: "/services/custom-tools-automation/",
    title: "Custom Tools & Automation | Boho Digital Services",
    metaDescription:
      "Boho engineers focused internal tools, integrations, and automations for repeated operational work that is slow, fragile, or difficult to audit by hand.",
    eyebrow: "Custom Tools & Automation",
    headline: "Build the smallest dependable tool for the repeated work that keeps wasting time.",
    intro: [
      "Boho engineers focused internal tools, integrations, validation utilities, reporting workflows, and automations when the business case is clearer than another manual checklist or disconnected subscription.",
      "This is scoped engineering, not a promise that every process should become software.",
    ],
    theme: "mosaic",
    primaryCta: { label: "Build the Missing Tool", href: "/contact/" },
    secondaryCta: { label: "See the Systems and Proof", href: "/tools/" },
    sections: [
      {
        eyebrow: "The right starting point",
        title: "Automate a stable decision, not a vague frustration.",
        body: [
          "A useful custom tool starts with a repeated task, a responsible owner, known inputs, an observable output, and a consequence worth improving. If the underlying decision is still unclear, diagnosis comes before code.",
          "Boho prefers the smallest maintainable intervention: sometimes a script, a guarded workflow, a validation check, or a narrow interface is more valuable than a custom application.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "Potential scopes",
        title: "Practical operational engineering.",
        layout: "grid",
        items: [
          { title: "Workflow automation", body: "Reduce repeated copying, routing, reconciliation, or status work while preserving approvals and useful records." },
          { title: "Internal utilities", body: "Create focused interfaces or command-line tools for a specific team process instead of a broad speculative platform." },
          { title: "Integrations", body: "Connect approved systems through documented interfaces, least-privilege access, clear error handling, and observable data movement." },
          { title: "Validation and reporting", body: "Check files, routes, data, deployments, or recurring operational conditions and report failures in language someone can act on." },
          { title: "Dashboards, analytics, and monitoring", body: "Build a decision-focused view of approved data, important operating signals, and visible collection or process failures." },
          { title: "APIs, data normalization, and publishing", body: "Move or reshape approved information through bounded interfaces and publishing systems with clear source, ownership, and retry rules." },
          { title: "Calculators, research, and lead utilities", body: "Create focused calculators, research utilities, or lead-system helpers when inputs, limitations, and the intended user action are explicit." },
          { title: "Client-specific operational tools", body: "Adapt the smallest dependable interface or workflow to a documented client process without presenting it as a general public product." },
        ],
      },
      {
        eyebrow: "Engineering boundaries",
        title: "Ownership, security, and failure behavior are part of the scope.",
        layout: "list",
        tone: "blue",
        items: [
          { title: "Data and access", body: "Name the data involved, minimize what is collected, use approved credentials and secret storage, and avoid copying sensitive material into the wrong system." },
          { title: "Human approvals", body: "Keep meaningful external, destructive, financial, or irreversible actions behind an explicit human decision." },
          { title: "Failure handling", body: "Make errors visible, preserve safe retry behavior where possible, and document recovery instead of silently dropping work." },
          { title: "Ownership and exit", body: "Record the repository, runtime, accounts, dependencies, operating instructions, and what happens when support ends." },
        ],
      },
      {
        eyebrow: "Method",
        title: "Diagnose → Prioritize → Engineer → Deploy → Measure → Improve",
        layout: "steps",
        items: operatingCycle.map(({ title, body, href, linkLabel }) => ({ title, body, href, linkLabel })),
      },
      {
        eyebrow: "Repair, integrate, or build",
        title: "Custom software is one option, not the opening assumption.",
        body: [
          "We repair before replacing, integrate before rebuilding, and write custom software only when the missing capability is worth owning.",
        ],
        layout: "grid",
        tone: "plum",
        items: [
          { title: "Review the decision model", body: "Follow the repair, integrate, or build path before adding another system.", href: "/tools/#repair-integrate-build", linkLabel: "Open the decision model" },
          { title: "Inspect selected proof", body: "Keep named Boho systems separate from the mature infrastructure that supports them.", href: "/tools/#selected-tools", linkLabel: "View selected tools" },
          { title: "Translate the technical layer", body: "Use the glossary for deeper explanations of APIs, access, automation, delivery, and ownership.", href: "/learn/glossary/#cluster-apis-and-integrations", linkLabel: "Open the glossary cluster" },
        ],
      },
      {
        title: "Bring the repeated task, its owner, and the cost of getting it wrong.",
        body: [
          "Boho will help determine whether the useful next step is process clarification, a small automation, an integration, a custom tool, or no new software at all.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/services/local-seo-search-visibility/",
    title: "Local Visibility & Lead Systems | Boho Digital Services",
    metaDescription:
      "Boho connects local discovery, website clarity, business-profile accuracy, trust, lead paths, and measurement into one accountable system.",
    eyebrow: "Local Visibility & Lead Systems",
    headline: "Make the business easier to find, trust, and contact locally.",
    intro: [
      "Boho improves the local signals and customer-action paths that help people understand where you work, what you do, why you are credible, and how to take the next useful step.",
    ],
    theme: "research",
    primaryCta: { label: "Talk to Someone Technical", href: "/contact/" },
    secondaryCta: { label: "See the Lead-System View", href: "/services/lead-generation-conversion/" },
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
        eyebrow: "From discovery to qualified action",
        title: "Visibility without a usable lead path is incomplete.",
        body: [
          "The system must continue after a search result or business profile click. Service pages, phone links, estimate or booking paths, trust signals, response expectations, and measurement all affect whether useful attention becomes a qualified business event.",
          "No connected form endpoint has been approved for this site review, so Boho does not pretend a disconnected form is a working lead system. The current public fallback is contact@bohemiandigital.org.",
        ],
        layout: "grid",
        items: [
          { title: "Discover", body: "Help the right local buyer encounter a coherent, accurate business." },
          { title: "Understand", body: "Explain services, coverage, fit, proof, and limitations without agency fog." },
          { title: "Act", body: "Provide a clear call, email, booking, visit, estimate, or purchase path that actually works." },
          { title: "Learn", body: "Measure useful actions and lead quality where real data and consent allow it." },
        ],
        tone: "verdigris",
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
    secondaryCta: { label: "Talk About Ongoing Work", href: "/contact/" },
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
    title: "Research, Analytics & Improvement | Boho Digital Services",
    metaDescription:
      "Boho traces data sources, collection limits, market evidence, website behavior, and business-specific events to support a useful next decision.",
    eyebrow: "Research, Analytics & Improvement",
    headline: "A dashboard is not a decision.",
    intro: [
      "Boho studies the business, market, competitors, website, search presence, data sources, collection methods, exclusions, platform disagreement, and measurement system to identify which improvements are most likely to deserve attention.",
      "The useful output is a decision rule, failure signal, prioritized action, or clearer question—not more report volume.",
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
        title: "A dashboard is not a decision.",
        body: [
          "Boho reporting focuses on signals the business can interpret and act on: calls, forms, bookings, purchases, profile actions, high-value pages, query patterns, index coverage, or lead quality where real data exists.",
          "The review should name where data comes from, how it was collected or normalized, what was excluded, where platforms disagree, how collection failure becomes visible, and which business-specific event or rule changes the next action.",
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
    title: "Pricing Status | Boho Digital Services",
    metaDescription:
      "Boho pricing is scoped after diagnosis; this retired review page does not publish unapproved rates or automatic quotes.",
    eyebrow: "Pricing",
    headline: "No public rate is current until the business approves it.",
    intro: [
      "This route remains available for review, but the prior planning ranges are withdrawn because the current governance record does not verify them as approved public offers.",
    ],
    theme: "editorial",
    primaryCta: { label: "Discuss the Actual Problem", href: "/contact/" },
    secondaryCta: { label: "View the Five Service Lanes", href: "/services/" },
    draftLabel: "Historical pricing draft — no current public rates are approved.",
    sections: [
      {
        title: "Scope follows diagnosis.",
        body: [
          "Boho is built around direct technical work, research, reusable systems, automation-assisted workflows, documentation, and a small operating structure.",
          "The responsible scope still depends on the site, market, access, platform, urgency, data, content, dependencies, implementation depth, and cost of failure.",
          "No number on a previous draft should be treated as a current quote, minimum, package, or promise of availability.",
        ],
        tone: "parchment",
      },
      {
        eyebrow: "Scope inputs",
        title: "Start with the problem, then price the accountable work.",
        note: "The items below are scoping categories, not packages or published prices.",
        layout: "grid",
        items: [
          { title: "Local Visibility & Lead Systems", body: "Market, service area, profile state, page and content scope, lead-path condition, measurement access, and implementation depth all affect the work.", href: "/services/local-seo-search-visibility/", linkLabel: "Review the lane" },
          { title: "Websites & Managed Hosting", body: "Page count, content readiness, platform, integrations, migration risk, accessibility, performance, hosting eligibility, and support boundaries affect the scope.", href: "/services/website-design-redesign/", linkLabel: "Review the lane" },
          { title: "Provider Rescue & Migration", body: "Ownership, access, provider cooperation, data, URLs, redirects, integrations, downtime risk, and rollback requirements must be diagnosed first.", href: "/services/website-migration-provider-rescue/", linkLabel: "Review the lane" },
          { title: "Custom Tools & Automation", body: "Users, workflows, data, integrations, security, approvals, failure handling, operating environment, and maintenance responsibilities define the engineering cost.", href: "/services/custom-tools-automation/", linkLabel: "Review the lane" },
          { title: "Research, Analytics & Improvement", body: "Decision stakes, market size, data availability, technical depth, sample requirements, implementation, and the measurement period determine scope.", href: "/services/research-audits-analytics/", linkLabel: "Review the lane" },
        ],
      },
      {
        eyebrow: "Questions before scope",
        title: "Pricing without theater.",
        layout: "list",
        items: [
          { title: "Why are no rates shown?", body: "The prior draft ranges are not verified as current approved offers under the active governance record. Publishing them would create a commercial claim without support." },
          { title: "Can we start small?", body: "Yes. Boho prefers the smallest project capable of improving the decision or fixing the actual problem." },
          { title: "Do you require long contracts?", body: "No. Ongoing work should continue because it is useful, not because leaving is painful." },
          { title: "How does Boho keep scope efficient?", body: "Fewer layers, direct technical work, reusable systems, research workflows, and documentation reduce avoidable overhead without predetermining a price." },
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
    title: "About Boho Digital Services | Research-Led Digital Engineering",
    metaDescription:
      "Learn how professional experience in mathematical modeling, behavioral science, medical-image processing, scientific programming, and software engineering shaped Boho Digital Services and its direct, research-led approach to websites, search, analytics, and digital infrastructure.",
    eyebrow: "ABOUT BOHO DIGITAL SERVICES",
    headline: "I come from professional scientific research. I built Boho because this problem has a clear answer.",
    intro: [],
    theme: "editorial",
    primaryCta: { label: "Talk to Someone Technical", href: "/contact/" },
    secondaryCta: { label: "Review Boho’s Services", href: "/services/" },
    sections: [],
  },
  {
    slug: "/contact/",
    title: "Contact Boho Digital Services",
    metaDescription:
      "Contact Boho about local visibility and lead systems, websites, managed hosting, provider rescue, migration, custom tools, automation, research, analytics, or improvement.",
    eyebrow: "Contact",
    headline: "Talk to someone who can explain the machinery.",
    intro: [
      "Send the business, website, market, system, and the problem you are trying to solve. Boho will help identify the most useful first step.",
      "Use the project inquiry below, or the contact links in the site footer. Website issues can go directly to the webmaster link.",
    ],
    theme: "editorial",
    primaryCta: { label: "Start a Project", href: "#project-inquiry" },
    secondaryCta: { label: "See What We Build", href: "/tools/" },
    sections: [
      {
        title: "Bring the actual situation.",
        body: [
          "You do not need perfect documentation. Share what you know: the website, business type, market, current provider, what has been tried, what feels broken, and which customer actions matter most.",
          "Do not email passwords, payment data, private customer records, health information, or private keys. Access can be arranged through authorized platform invitations when needed.",
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
      formId: "contact",
      sectionId: "project-inquiry",
      title: "Project inquiry",
      body: "Share enough context to help Boho identify the right starting point.",
      submitLabel: "Send inquiry",
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
            "Local Visibility and Lead Systems",
            "Websites and Managed Hosting",
            "Provider Rescue and Migration",
            "Custom Tools and Automation",
            "Research, Analytics, and Improvement",
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
          options: ["A focused first project", "A broader implementation", "An ongoing qualifying engagement", "Not sure yet"],
        },
        { name: "timing", label: "Desired timing", type: "text" },
      ],
      privacyNote:
        "Boho uses this information to review and respond to the inquiry. Do not submit passwords, payment data, private customer information, health information, private keys, or other sensitive records.",
      consent:
        "I agree that Boho may use this information to review and respond to my inquiry. I understand that submission does not create a client relationship or guarantee availability.",
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
    primaryCta: { label: "Request a Visibility Check", href: "#visibility-check-request" },
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
        eyebrow: "Focused diagnosis",
        title: "Find the next useful investigation.",
        body: [
          "The Local Visibility Check looks for an obvious problem, a plausible opportunity, and the next investigation most likely to improve the decision.",
          "The result is a clear recommendation: investigate further, scope a focused project, or stop spending attention on the wrong signal.",
        ],
        tone: "plum",
      },
    ],
    form: {
      formId: "visibility-check",
      sectionId: "visibility-check-request",
      title: "Visibility Check request",
      body: "Give Boho enough context to understand the business and the visible problem.",
      submitLabel: "Request visibility check",
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
        "Boho uses this information only to review the request and respond about the project. Do not submit passwords, private customer information, health information, payment data, private keys, or other sensitive material.",
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
    primaryCta: { label: "Request Emergency Review", href: "#emergency-triage" },
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
        eyebrow: "Calm triage",
        title: "Stabilize the highest-impact failure first.",
        body: [
          "Boho begins with business impact, recent changes, access, and the fastest safe way to stop further damage.",
          "If the issue can safely move into a normal project, that recommendation will be clear. Account access always stays within authorized platform and provider processes.",
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
      formId: "emergency",
      sectionId: "emergency-triage",
      title: "Emergency website triage",
      body: "Describe the incident with facts, timing, business impact, and the systems involved.",
      submitLabel: "Send emergency request",
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
        "Do not submit passwords, private keys, private customer records, payment data, or health information. Boho requests access through authorized platform invitations or another secure method. Screenshot upload is not available; describe the visible error instead.",
    },
  },
  {
    slug: "/privacy/",
    title: "Privacy Policy | Boho Digital Services",
    metaDescription: "How Boho Digital Services handles website analytics, form and email inquiries, operational data, and privacy requests.",
    eyebrow: "Privacy",
    headline: "Privacy",
    intro: [
      "This notice explains the information involved when you visit the Boho Digital Services website or contact the business through a form or email.",
    ],
    theme: "editorial",
    primaryCta: { label: "Review accessibility", href: "/accessibility/" },
    secondaryCta: { label: "Return home", href: "/" },
    sections: [
      {
        title: "Business identity and contact",
        body: [
          "Boho Digital Services is operated by Republic of Bohemia LLC. Privacy questions and requests may be sent to contact@bohemiandigital.org.",
        ],
        tone: "plum",
      },
      {
        title: "Information you send",
        body: [
          "When you submit a form or email Boho, the message may include your name, email address, business name, website, service area, provider details, timing, and the project or problem you describe.",
          "Please do not submit passwords, payment data, private customer information, health information, private keys, or other sensitive records. Secure access can be arranged through authorized platform invitations when needed.",
        ],
      },
      {
        title: "Forms, verification, and delivery",
        body: [
          "The project inquiry, Local Visibility Check, and Emergency forms use Cloudflare Turnstile to reduce automated abuse. Cloudflare may process network, browser, and security information needed to perform that check under its own privacy terms.",
          "Accepted form fields, submission and consent timestamps, the website origin, the verified Turnstile hostname and action, and notification status are stored in a Cloudflare D1 database before a notification is sent to Boho's approved operational inbox. The form database does not intentionally store your IP address, browser user agent, or Turnstile token.",
        ],
        tone: "plum",
      },
      {
        title: "Analytics, cookies, hosting, and processors",
        body: [
          "The website uses Google Analytics and a first-party analytics service at analytics.bohodigitalservices.com to understand broad traffic and interaction patterns. The first-party tracker honors the browser's Do Not Track setting. Google may process device, browser, approximate location, referral, page-view, and interaction information according to its own privacy terms.",
          "The site is delivered through Cloudflare, which may process network, security, and request-log information needed to serve and protect the website. Browser storage or cookies may be used by these services.",
        ],
        tone: "parchment",
      },
      {
        title: "Use, retention, and security",
        body: [
          "Information is used to respond to inquiries, evaluate potential work, operate and secure the website, understand site performance, and maintain business records connected to a conversation or project.",
          "Form intake database records are scheduled for deletion after 90 days. A notification copy delivered to business email, later correspondence, and records connected to an active or completed engagement may be retained only as long as reasonably useful for the conversation, contractual or accounting needs, security, or applicable legal obligations. Access is limited to people and providers that need it for the relevant work.",
        ],
      },
      {
        title: "Your choices and requests",
        body: [
          "You may use browser controls to limit cookies or tracking. Blocking some technology can change how a site behaves.",
          "To ask about information connected to an email conversation, request a correction, or request deletion where appropriate, contact contact@bohemiandigital.org. External sites linked from this website follow their own privacy practices.",
        ],
      },
      {
        title: "Updates and effective date",
        body: [
          "Effective July 15, 2026. Material changes will be reflected on this page with an updated effective date.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/terms/",
    title: "Website Terms | Boho Digital Services",
    metaDescription: "Terms for using the Boho Digital Services website and contacting the business about potential work.",
    eyebrow: "Website terms",
    headline: "Website Terms",
    intro: [
      "These terms cover use of the Boho Digital Services website. Project work is governed by the separate agreement accepted for that engagement.",
    ],
    theme: "editorial",
    primaryCta: { label: "Review privacy", href: "/privacy/" },
    secondaryCta: { label: "Return home", href: "/" },
    sections: [
      {
        title: "Informational site",
        body: [
          "The website describes Boho's services, approach, resources, and ways to begin a conversation. Content is provided for general business information.",
          "A website page, email exchange, or conversation does not replace a written project scope, quote, or agreement.",
        ],
      },
      {
        title: "Starting a client relationship",
        body: [
          "Browsing the site or sending an inquiry does not create a client relationship. A project begins through a separately accepted agreement that defines scope, responsibilities, price, timing, ownership, access, and other terms.",
        ],
        tone: "parchment",
      },
      {
        title: "No guarantee of results",
        body: [
          "Search visibility, traffic, leads, conversion, revenue, platform behavior, and account recovery depend on factors beyond a single provider's control.",
          "Each engagement defines the work Boho is responsible for, the assumptions behind it, and the signals that can reasonably be measured.",
        ],
        tone: "plum",
      },
      {
        title: "Intellectual property and permitted use",
        body: [
          "Original Boho site text, design, marks, and other materials may not be copied, republished, or used commercially without permission, except where a separate license applies.",
          "Project deliverables and client ownership are governed by the separate project agreement, including any platform, font, stock, open-source, or third-party limitations.",
        ],
      },
      {
        title: "Third-party services and links",
        body: [
          "Links to third-party websites are provided for convenience. Those services control their own content, availability, security, and privacy practices.",
        ],
      },
      {
        title: "Contact and effective date",
        body: [
          "Boho Digital Services is operated by Republic of Bohemia LLC. General inquiries may be sent to contact@bohemiandigital.org and website issues to webmaster@bohemiandigital.org.",
          "Effective July 14, 2026.",
        ],
        tone: "dark",
      },
    ],
  },
  {
    slug: "/accessibility/",
    title: "Accessibility | Boho Digital Services",
    metaDescription: "Accessibility approach and barrier-reporting contact for the Boho Digital Services website.",
    eyebrow: "Accessibility",
    headline: "Accessibility",
    intro: [
      "Boho Digital Services aims to make this website usable by a broad range of visitors and to improve accessibility over time.",
      "If you encounter a barrier, email webmaster@bohemiandigital.org with the page, device, browser, and problem so it can be investigated.",
    ],
    theme: "editorial",
    primaryCta: { label: "Review the site", href: "/" },
    secondaryCta: { label: "Contact page", href: "/contact/" },
    sections: [
      {
        title: "The current target",
        body: [
          "The site uses WCAG 2.2 AA principles as its design and testing target, including keyboard access, readable contrast, useful structure, and adaptable layouts.",
        ],
        tone: "parchment",
      },
      {
        title: "What the review includes",
        layout: "grid",
        items: [
          { title: "Structure and navigation", body: "Heading hierarchy, landmarks, skip navigation, reading order, descriptive links, keyboard operation, visible focus, and an accessible mobile menu." },
          { title: "Readable presentation", body: "Color contrast, text sizing, touch targets, reduced-motion support, and no essential information available only on hover." },
          { title: "Links and media", body: "Descriptive links, useful alternatives for meaningful images, decorative-image handling, and no essential body text embedded in imagery." },
          { title: "Real output", body: "Testing the rendered site and its key routes instead of assuming a builder or component handled accessibility automatically." },
        ],
      },
      {
        title: "Report a barrier",
        body: [
          "Email webmaster@bohemiandigital.org with the page address, device, browser, assistive technology if relevant, what you tried to do, and what happened.",
        ],
        tone: "plum",
      },
      {
        title: "Ongoing improvement",
        body: [
          "Accessibility is reviewed as the site changes. Reported barriers are investigated and prioritized according to impact and the practical path to correction.",
          "Statement updated July 14, 2026.",
        ],
        tone: "dark",
      },
    ],
  },
];
