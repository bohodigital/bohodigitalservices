import { canonicalServices } from "../content/commercialReset";
import type { IndustryModel } from "../content/industries";
import { ButtonLink, Footer, Header } from "./SiteChrome";

const aboutSteps = [
  ["Define the business job", "Identify what customers or operators need to do and what problem is preventing it."],
  ["Inspect the system", "Review the website, search presence, content, accounts, data, providers, and technical dependencies relevant to that job."],
  ["Build the smallest complete solution", "Repair, integrate, redesign, or build only what the evidence and scope justify."],
  ["Verify and document", "Test the agreed result, record what changed, explain known limitations, and preserve an understandable handoff."],
] as const;

export function BuyerFacingAboutPage() {
  return (
    <>
      <Header />
      <main className="reset-about-page" id="main-content" tabIndex={-1}>
        <section className="reset-interior-hero" aria-labelledby="about-title">
          <div className="reset-shell reset-interior-hero__grid">
            <div>
              <p className="reset-eyebrow">ABOUT BOHO</p>
              <h1 id="about-title">The person explaining the work is responsible for the result.</h1>
              <p>Boho Digital Services is an owner-operated digital engineering company. Its founder comes from professional scientific research involving mathematical modeling, behavioral science, medical-image processing, scientific programming, software engineering, and technical problem-solving.</p>
              <p>That background shapes a straightforward operating method: define the problem, inspect the evidence, build the smallest complete solution, test it, document what changed, and keep the business in control of the assets it depends on.</p>
              <div className="reset-actions"><ButtonLink href="/work/">See Boho’s work</ButtonLink><ButtonLink href="/start/" variant="secondary">Get a free website review</ButtonLink></div>
            </div>
            <aside className="reset-interior-hero__receipt"><ul><li>Owner-operated</li><li>Direct technical responsibility</li><li>Public starting prices</li><li>Client-owned durable accounts</li></ul></aside>
          </div>
        </section>

        <section className="reset-section" aria-labelledby="about-why-title"><div className="reset-shell reset-reading-layout"><div><p className="reset-eyebrow">WHY BOHO EXISTS</p><h2 id="about-why-title">Digital work should become cheaper when the production system becomes more efficient.</h2></div><div><p>Many digital providers use established platforms, reusable templates, automated reporting, outsourced production, and artificial intelligence. There is nothing inherently wrong with using effective tools.</p><p>The problem is that the client often receives neither the savings nor the clarity. The provider lowers its delivery cost while the client continues paying for sales commissions, account-management layers, unnecessary meetings, repackaged software, automated reports, and systems the business does not understand or control.</p><p>Boho uses a leaner model. Technical responsibility stays close to the work. Repeated problems become tested methods and reusable systems. Mature infrastructure handles ordinary capabilities. Custom engineering is reserved for the part that genuinely needs it.</p><p>The resulting efficiency should improve the client’s price, the quality of the implementation, or both.</p></div></div></section>

        <section className="reset-section" aria-labelledby="about-background-title"><div className="reset-shell reset-reading-layout"><div><p className="reset-eyebrow">RELEVANT BACKGROUND</p><h2 id="about-background-title">Scientific research, software engineering, and original problem-solving.</h2></div><div><p>The founder’s professional background includes mathematical and quantitative modeling, behavioral-science research, medical-image processing, scientific programming, software development, data and image-processing workflows, method validation, technical debugging, quantitative interpretation, and research documentation.</p><p>That work required more than operating software. It required understanding the question, making assumptions explicit, building or adapting the method, testing whether it worked, identifying failure modes, interpreting the result, and documenting the limits clearly.</p><p>Websites, search, analytics, and digital infrastructure are different subject matter, but they reward the same professional habits.</p></div></div></section>

        <section className="reset-section reset-process" aria-labelledby="about-process-title"><div className="reset-shell"><header className="reset-heading"><p className="reset-eyebrow">HOW BOHO WORKS</p><h2 id="about-process-title">Direct, scoped, and accountable.</h2></header><ol className="reset-process__grid">{aboutSteps.map(([title, copy], index) => <li key={title}><span aria-hidden="true">{index + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></div></section>

        <section className="reset-section" aria-labelledby="about-ai-title"><div className="reset-shell reset-reading-layout"><div><p className="reset-eyebrow">AUTOMATION AND AI</p><h2 id="about-ai-title">Modern tools assist the work. They do not own the responsibility.</h2></div><div><p>Boho uses automation and AI-assisted tools where they reduce repetitive work, improve comparison, support testing, organize research, or accelerate implementation.</p><p>A human technical lead remains responsible for defining the problem, evaluating evidence, checking business facts, approving public copy, protecting private information, testing consequential behavior, and standing behind the deliverable.</p><p>Clients receive reviewed work, not raw generated output.</p></div></div></section>

        <section className="reset-section" aria-labelledby="about-ownership-title"><div className="reset-shell reset-reading-layout"><div><p className="reset-eyebrow">OWNERSHIP</p><h2 id="about-ownership-title">The business should control the assets it depends on.</h2></div><div><p>Boho’s preferred operating model keeps domains, production accounts, recovery methods, analytics properties, source code, and agreed business content under client control.</p><p>Boho works through authorized access that can be changed or revoked. The written proposal defines what the client owns, what Boho manages, what third parties provide, and what happens when the relationship ends.</p></div></div></section>

        <section className="reset-section" aria-labelledby="about-proof-title"><div className="reset-shell reset-reading-layout"><div><p className="reset-eyebrow">PROOF WITHOUT FICTION</p><h2 id="about-proof-title">Boho will not invent the history it has not earned.</h2></div><div><p>Boho is a new service company. It does not yet have a long list of publishable client case studies, customer logos, testimonials, or commercial outcomes.</p><p>That absence will not be disguised. Until outside work can be published accurately and with any required permission, the public proof is the quality of Boho-owned websites, public tools, technical systems, documentation, and delivery process.</p><p>Real client results will be published only when the work exists, the evidence supports the claim, and publication is appropriate.</p><ButtonLink href="/work/" variant="secondary">Inspect Boho’s work</ButtonLink></div></div></section>

        <section className="reset-section reset-final" aria-labelledby="about-final-title"><div className="reset-shell reset-final__grid"><div><h2 id="about-final-title">Bring the website, the problem, or the repeated work.</h2><p>You do not need to arrive with the correct technical diagnosis. Send the visible situation and Boho will explain whether there is a sensible next step.</p></div><ButtonLink href="/start/">Get a free website review</ButtonLink></div></section>
      </main>
      <Footer />
    </>
  );
}

const industryCards = [
  ["Project businesses", "Contractors, trades, restoration firms, home-improvement companies, and other project-based businesses need to establish service, location, project, and proof fit before requesting an estimate or inspection.", "Qualified estimate, inspection, or project consultation", "/industries/home-improvement-contractors/", "Explore project businesses"],
  ["Local service businesses", "Appointment-based, service-area, recurring, and location-based businesses need to make the service, availability, people, policies, and correct contact route easy to understand.", "Call, booking, visit, or service request", "/industries/local-service-businesses/", "Explore local service businesses"],
  ["Physical locations", "Retailers, venues, studios, offices, hospitality businesses, and other destinations need current information that makes a visit easy to plan.", "Directions, visit, registration, pickup, or reservation", "/industries/brick-and-mortar-retail-hospitality/", "Explore physical locations"],
  ["Product and ecommerce businesses", "Product sellers need useful category structure, clear product information, trustworthy policies, working purchase paths, and measurement that distinguishes browsing from completed business.", "Cart, checkout, purchase, or product inquiry", "/industries/online-retail-ecommerce/", "Explore product businesses"],
  ["Professional and B2B services", "Professional firms, consultants, specialists, and B2B providers need to communicate the problem they solve, who is responsible, how the work proceeds, and what proof supports the next conversation.", "Qualified inquiry or proposal discussion", "/industries/professional-b2b-services/", "Explore professional services"],
] as const;

const operatingStandards = [
  ["Be found", "Important services, products, locations, and expertise need clear, accessible public pages."],
  ["Be understood", "Visitors should quickly recognize whether the business fits their need."],
  ["Be trusted", "Claims, proof, people, policies, ownership, and next steps should be accurate and current."],
  ["Make the next action easy", "Calls, forms, bookings, purchases, visits, estimates, and discussions should reflect the way the business can actually respond."],
] as const;

export function BuyerFacingIndustriesPage() {
  return (
    <><Header /><main className="reset-industries-page" id="main-content" tabIndex={-1}>
      <section className="reset-interior-hero" aria-labelledby="industries-title"><div className="reset-shell reset-interior-hero__grid"><div><p className="reset-eyebrow">WHO BOHO HELPS</p><h1 id="industries-title">Different businesses need different customer paths.</h1><p>A project business may need qualified estimate requests. A local service company may need calls or bookings. A physical location may need visits. A product business may need completed purchases. A professional firm may need a serious, well-qualified conversation.</p><p>Boho starts with the action that creates value, then examines the website, search presence, content, systems, and ownership around it.</p><div className="reset-actions"><ButtonLink href="/start/">Get a free website review</ButtonLink><ButtonLink href="/services/" variant="secondary">Compare services</ButtonLink></div></div></div></section>
      <section className="reset-section" aria-labelledby="customer-paths-title"><div className="reset-shell"><header className="reset-heading"><h2 id="customer-paths-title">Common customer paths</h2></header><div className="reset-industry-grid">{industryCards.map(([title, copy, action, href, label]) => <article className="reset-service-card" key={title}><a aria-label={`${title}: ${label}`} className="reset-industry-card__link" href={href}><h3>{title}</h3><p>{copy}</p><p><strong>Useful action</strong><br />{action}</p><span className="reset-card-action">{label} <span aria-hidden="true">→</span></span></a></article>)}</div></div></section>
      <section className="reset-section" aria-labelledby="standards-title"><div className="reset-shell"><header className="reset-heading"><h2 id="standards-title">The business model changes the route. The operating standard stays consistent.</h2></header><div className="reset-services__grid">{operatingStandards.map(([title, copy]) => <article className="reset-service-card" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      <section className="reset-section" aria-labelledby="starting-services-title"><div className="reset-shell"><header className="reset-heading"><h2 id="starting-services-title">Starting services</h2></header><ul className="reset-price-list">{canonicalServices.map((service) => <li key={service.key}><a href={service.route}><span>{service.label}</span><strong>{service.priceDisplay}</strong></a></li>)}</ul><p>The industry does not determine the price. Pages, content, markets, locations, integrations, access, technical condition, risk, and required work determine the written scope.</p></div></section>
      <section className="reset-section reset-final" aria-labelledby="industries-final-title"><div className="reset-shell reset-final__grid"><div><h2 id="industries-final-title">Which customer action matters most to the business?</h2><p>Send the current website and describe what a useful customer or operator should be able to do. Boho will identify the smallest responsible starting point.</p></div><ButtonLink href="/start/">Get a free website review</ButtonLink></div></section>
    </main><Footer /></>
  );
}

type DetailCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  decisions: readonly string[];
  problems: readonly string[];
  improvements: readonly string[];
  boundary?: string;
};

const detailCopy: Record<IndustryModel["id"], DetailCopy> = {
  "project-business": { eyebrow: "PROJECT BUSINESSES", title: "Turn the right project interest into a qualified estimate request.", intro: "Contractors, trades, restoration firms, remodelers, and other project businesses need to make service, location, property, project, and proof fit clear before asking for an estimate or inspection.", decisions: ["Does this company handle the project I have?", "Does it serve my location and property type?", "Can I inspect relevant work and understand the process?", "What information should I provide for the correct next step?"], problems: ["Broad service descriptions", "Unclear service areas", "Project galleries without context", "Weak mobile estimate paths", "Forms that fail to qualify the project"], improvements: ["Service and project architecture", "Service-area clarity", "Permissioned proof with useful context", "Estimate, inspection, and call paths", "Search, analytics, and provider ownership"] },
  "local-service": { eyebrow: "LOCAL SERVICE BUSINESSES", title: "Make the service easy to understand, trust, and request.", intro: "Appointment-based, service-area, recurring, and location-based businesses need to communicate service fit, availability, people, policies, location, and the correct next action without forcing every customer through the same generic form.", decisions: ["Is this the right service?", "Is it available where and when I need it?", "Who provides it, and what should I expect?", "Should I call, book, visit, or request service?"], problems: ["Inconsistent public information", "Vague service descriptions", "Weak team or operator information", "Booking or inquiry friction", "Forms collecting unnecessary information"], improvements: ["Service and audience clarity", "Website and profile consistency", "Booking and contact paths", "Team, policy, and location information", "Local visibility and measurement"] },
  "retail-hospitality": { eyebrow: "PHYSICAL LOCATIONS", title: "Make the visit easy to plan and worth taking.", intro: "Retailers, venues, studios, offices, hospitality businesses, galleries, and other destinations need current public information that helps people decide whether, when, and how to visit.", decisions: ["Is this place relevant to what I need?", "Is the information current?", "How do I get there, enter, register, or arrange the visit?", "What should I know before leaving?"], problems: ["Conflicting hours or contact information", "Weak mobile navigation", "Missing parking or accessibility information", "Stale events, products, or availability", "Complicated visit or registration paths"], improvements: ["Website and profile consistency", "Location and arrival information", "Mobile directions and customer actions", "Current content structure", "Local search presentation and measurement"] },
  ecommerce: { eyebrow: "PRODUCT AND ECOMMERCE BUSINESSES", title: "Help the right product get found, understood, trusted, and purchased.", intro: "Product sellers need clear category structure, complete product information, usable navigation, trustworthy policies, working purchase paths, and measurement that distinguishes discovery from completed business.", decisions: ["Is this the right product?", "Can I compare the important options?", "Are price, availability, delivery, and policies clear?", "Is the purchase path trustworthy and usable?"], problems: ["Categories based on internal inventory rather than customer intent", "Important products buried in navigation", "Incomplete product information", "Duplicate or confusing URLs", "Broken or conflicting analytics"], improvements: ["Category and product architecture", "Product-page information", "Internal search and navigation", "Technical access and duplicate handling", "Purchase-path measurement"], boundary: "Ecommerce and payment-enabled systems do not qualify for the $850 informational-site starting scope. They require a specific written quote." },
  "professional-b2b": { eyebrow: "PROFESSIONAL AND B2B SERVICES", title: "Make the expertise clear enough for the right buyer to continue.", intro: "Professional firms, consultants, specialists, and B2B providers need to explain the problem they solve, who is responsible, how the work proceeds, what evidence supports it, and what a qualified next conversation requires.", decisions: ["Does this expertise fit the problem?", "Who is responsible for the work?", "What method or process will be used?", "What proof supports the next conversation?"], problems: ["Vague positioning", "Services organized around internal terminology", "Unsupported authority claims", "Proof disconnected from the offer", "Generic inquiry forms"], improvements: ["Positioning and service architecture", "Buyer-question coverage", "Operator and team information", "Method and proof presentation", "Qualified inquiry paths"] },
};

export function BuyerFacingIndustryDetailPage({ model }: { model: IndustryModel }) {
  const copy = detailCopy[model.id];
  return (
    <><Header /><main className="reset-industry-detail" id="main-content" tabIndex={-1}>
      <section className="reset-interior-hero" aria-labelledby="industry-title"><div className="reset-shell reset-interior-hero__grid"><div><p className="reset-eyebrow">{copy.eyebrow}</p><h1 id="industry-title">{copy.title}</h1><p>{copy.intro}</p><ButtonLink href="/start/">Get a free website review</ButtonLink></div></div></section>
      <section className="reset-section"><div className="reset-shell reset-service-detail__split"><article><h2>What customers need to decide</h2><ul>{copy.decisions.map((item) => <li key={item}>{item}</li>)}</ul></article><article><h2>Common problems</h2><ul>{copy.problems.map((item) => <li key={item}>{item}</li>)}</ul></article></div></section>
      <section className="reset-section"><div className="reset-shell reset-service-detail__split"><article><h2>What Boho may improve</h2><ul>{copy.improvements.map((item) => <li key={item}>{item}</li>)}</ul></article><article><h2>Relevant limitations</h2><ul>{model.operationalConstraints.map((item) => <li key={item}>{item}</li>)}</ul>{copy.boundary ? <p className="reset-boundary-note">{copy.boundary}</p> : null}</article></div></section>
      <section className="reset-section" aria-label="Industry guidance"><div className="reset-shell reset-industry-guidance">{model.detailSections.map((section) => <article key={section.title}><h2>{section.title}</h2>{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}</article>)}</div></section>
      <section className="reset-section"><div className="reset-shell"><header className="reset-heading"><h2>Likely starting services</h2></header><ul className="reset-price-list">{canonicalServices.map((service) => <li key={service.key}><a href={service.route}><span>{service.label}</span><strong>{service.priceDisplay}</strong></a></li>)}</ul><p>The industry does not determine the price. Pages, content, markets, locations, integrations, access, technical condition, risk, and required work determine the written scope.</p></div></section>
      <section className="reset-section reset-final" aria-label="Free website review"><div className="reset-shell"><ButtonLink href="/start/">Get a free website review</ButtonLink></div></section>
    </main><Footer /></>
  );
}
