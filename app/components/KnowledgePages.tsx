import {
  BookOpenCheck,
  FlaskConical,
  SearchCheck,
  ServerCog,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import {
  Breadcrumbs,
  ButtonLink,
  EditorialHeadline,
  Footer,
  Header,
} from "./SiteChrome";
import { DefinedText } from "./DefinedText";
import { SectionSidebar } from "./SectionNavigation";

export function KnowledgeHero({
  eyebrow,
  title,
  intro,
  primary,
  secondary,
  breadcrumbMode = "resource-child",
}: {
  eyebrow: string;
  title: string;
  intro: string[];
  primary: { label: string; href: `/${string}` | `#${string}` };
  secondary: { label: string; href: `/${string}` | `#${string}` };
  breadcrumbMode?: "resources-root" | "tools-root" | "resource-child";
}) {
  const seenTerms = new Set<string>();

  return (
    <section className="knowledge-hero" aria-labelledby="knowledge-hero-title">
      <div className="knowledge-hero__constellation" aria-hidden="true">
        <span><BookOpenCheck size={42} strokeWidth={1.6} /></span>
        <span><SearchCheck size={34} strokeWidth={1.7} /></span>
        <span><Wrench size={38} strokeWidth={1.6} /></span>
        <span><FlaskConical size={44} strokeWidth={1.6} /></span>
        <span><ServerCog size={32} strokeWidth={1.7} /></span>
      </div>
      <div className="section-shell knowledge-hero__inner">
        <Breadcrumbs
          items={
            breadcrumbMode === "resources-root"
              ? [{ label: "Home", href: "/" }, { label: "Resources" }]
              : breadcrumbMode === "tools-root"
                ? [{ label: "Home", href: "/" }, { label: "Tools" }]
              : [
                  { label: "Home", href: "/" },
                  { label: "Resources", href: "/resources/" },
                  { label: eyebrow },
                ]
          }
        />
        <div className="knowledge-hero__copy">
          <p className="eyebrow">{eyebrow}</p>
          <EditorialHeadline as="h1" className="knowledge-hero__title">
            <span id="knowledge-hero-title">{title}</span>
          </EditorialHeadline>
          <div className="knowledge-hero__intro reading-width">
            {intro.map((paragraph) => (
              <p key={paragraph.slice(0, 30)}>
                <DefinedText text={paragraph} seenTerms={seenTerms} />
              </p>
            ))}
          </div>
          <div className="button-row">
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            <ButtonLink href={secondary.href} variant="secondary">
              {secondary.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ToolsPage() {
  return (
    <>
      <Header />
      <main className="knowledge-page tools-page" id="main-content" tabIndex={-1}>
        <KnowledgeHero
          eyebrow="Tools"
          breadcrumbMode="tools-root"
          title="When the right tool does not exist, we build it."
          intro={[
            "Boho engineers focused dashboards, monitoring, publishing systems, APIs, and workflow automation around real operational problems.",
            "The work starts with the workflow: who owns it, where it breaks, what the useful output is, and how the business will operate it after launch.",
          ]}
          primary={{ label: "Build the missing tool", href: "/contact/" }}
          secondary={{ label: "Explore the service", href: "/services/custom-tools-automation/" }}
        />

        <div className="knowledge-section-layout">
          <SectionSidebar
            currentPath="/tools/"
            title="Tools"
            items={[
              { label: "Tools overview", href: "/tools/" },
              { label: "Custom tools & automation", href: "/services/custom-tools-automation/" },
              { label: "Research & analytics", href: "/services/research-audits-analytics/" },
              { label: "Contact", href: "/contact/" },
            ]}
            anchors={[
              { label: "Good tool fit", href: "#first-scope" },
              { label: "Systems Boho engineers", href: "#capabilities" },
              { label: "Working method", href: "#how-it-works" },
              { label: "Start a conversation", href: "#custom-engineering" },
            ]}
            note="A useful tool begins with one repeated problem, a clear owner, and a result the business can check."
          />

          <div className="knowledge-section-layout__content">
            <section className="tools-principles" id="first-scope" aria-labelledby="tool-fit-title">
              <div className="section-shell tools-principles__inner">
                <p className="eyebrow">Good tool fit</p>
                <EditorialHeadline as="h2">
                  <span id="tool-fit-title">Custom software should earn its place in the workflow.</span>
                </EditorialHeadline>
                <p className="reading-width">
                  A custom build makes sense when the repeated friction costs more than the system will take to build, operate, and maintain. If an existing product solves the problem cleanly, using it is usually the better engineering decision.
                </p>
                <div className="tools-principles__grid">
                  <article><h3><strong>Repeated cost</strong></h3><p>The same handoff, copy-and-paste task, blind spot, or error keeps consuming time or money.</p></article>
                  <article><h3><strong>Clear owner</strong></h3><p>Someone understands the process, owns the result, and can decide when the workflow changes.</p></article>
                  <article><h3><strong>Checkable result</strong></h3><p>The system produces an output, decision, alert, or completed action that can be verified.</p></article>
                  <article><h3><strong>Sustainable operation</strong></h3><p>Access, documentation, failure handling, maintenance, and portability fit the business that will run it.</p></article>
                </div>
              </div>
            </section>

            <section className="tools-principles" id="capabilities" aria-labelledby="systems-title">
              <div className="section-shell tools-principles__inner">
                <p className="eyebrow">Practical systems</p>
                <EditorialHeadline as="h2">
                  <span id="systems-title">What Boho can engineer around the workflow.</span>
                </EditorialHeadline>
                <div className="tools-principles__grid">
                  <article><h3><strong>Workflow automation</strong></h3><p>Move intake, routing, approval, publishing, and follow-up through a visible process with deliberate human checkpoints.</p></article>
                  <article><h3><strong>Analytics and reporting</strong></h3><p>Connect useful data sources, make assumptions visible, and turn measurements into decisions instead of another export.</p></article>
                  <article><h3><strong>Validation and monitoring</strong></h3><p>Check important pages, records, feeds, and integrations so failures are easier to find, explain, and recover from.</p></article>
                  <article><h3><strong>Integrations and APIs</strong></h3><p>Connect the systems the business already uses while keeping access boundaries, ownership, and failure behavior understandable.</p></article>
                </div>
              </div>
            </section>

            <section className="tools-principles" id="how-it-works" aria-labelledby="method-title">
              <div className="section-shell tools-principles__inner">
                <p className="eyebrow">Working method</p>
                <EditorialHeadline as="h2">
                  <span id="method-title">Diagnose before you automate.</span>
                </EditorialHeadline>
                <div className="tools-principles__grid">
                  <article><h3><strong>01 · Map</strong></h3><p>Document users, inputs, decisions, handoffs, sensitive data, current systems, and the failure worth fixing.</p></article>
                  <article><h3><strong>02 · Choose</strong></h3><p>Compare a process change, an existing product, an integration, and a custom build before adding software.</p></article>
                  <article><h3><strong>03 · Engineer</strong></h3><p>Build the smallest useful system with visible errors, bounded access, testable outputs, and review points.</p></article>
                  <article><h3><strong>04 · Operate</strong></h3><p>Deploy, document, monitor, measure, and improve the system with a clear owner and recovery path.</p></article>
                </div>
              </div>
            </section>

            <section className="owned-entities-note" id="custom-engineering" aria-labelledby="custom-engineering-title">
              <div className="section-shell owned-entities-note__inner">
                <p className="eyebrow">Custom tools and automation</p>
                <EditorialHeadline as="h2">
                  <span id="custom-engineering-title">Bring the repeated work, the current tools, and the part that keeps breaking.</span>
                </EditorialHeadline>
                <div>
                  <article>
                    <h3>Start with the operational problem</h3>
                    <p>Describe the handoffs, spreadsheets, missed checks, disconnected data, or reporting gap. Boho will help identify the smallest credible intervention.</p>
                  </article>
                  <article>
                    <h3>Build only what earns the maintenance</h3>
                    <p>The answer may be an integration, a focused internal tool, a reporting layer, automation, or a simpler process change.</p>
                    <p><Link href="/contact/">Build the missing tool →</Link></p>
                  </article>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
