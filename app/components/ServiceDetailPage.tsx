import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import type { ServicePage, ServicePageBlock } from "../content/servicePages.generated";
import {
  CommercialServiceLayer,
  isCommercialServiceRoute,
} from "./commercial/CommercialServiceLayer";
import { DefinedText } from "./DefinedText";
import { Footer, Header } from "./commercial/CommercialChrome";

type BodySection = {
  heading: Extract<ServicePageBlock, { type: "heading" }>;
  blocks: readonly ServicePageBlock[];
};

function slugifyHeading(text: string) {
  return text
    .toLocaleLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function headingId(route: string, text: string) {
  if (route === "/services/ongoing-seo/" && text === "Local SEO and market relevance") {
    return "local-seo";
  }
  if (
    route === "/services/research-audits-strategy/" &&
    text === "Technical SEO Audit"
  ) {
    return "technical-seo-and-site-health";
  }
  return slugifyHeading(text);
}

function containsBlockedAnalyticsAvailability(value: unknown) {
  const text = JSON.stringify(value);
  return [
    /Supported dashboard access/i,
    /Boho Analytics Platform.{0,200}(?:free|public|open.source|self.host|dashboard|access)/i,
    /(?:free|public|open.source|self.host|dashboard|access).{0,200}Boho Analytics Platform/i,
    /free (?:public repository|platform) or paid report/i,
    /use the free (?:public repository|platform)/i,
    /recommend the free platform/i,
    /merely for access to the dashboard/i,
    /Boho Analytics Platform components/i,
    /Explore the (?:platform|public repository)/i,
  ].some((pattern) => pattern.test(text));
}

function sectionize(blocks: readonly ServicePageBlock[]): BodySection[] {
  const sections: BodySection[] = [];
  for (const block of blocks) {
    if (block.type === "heading" && block.level === 2) {
      sections.push({ heading: block, blocks: [] });
      continue;
    }
    const current = sections.at(-1);
    if (current) {
      (current.blocks as ServicePageBlock[]).push(block);
    }
  }
  return sections.flatMap((section) => {
    if (containsBlockedAnalyticsAvailability(section.heading)) return [];
    const safeBlocks = section.blocks.filter(
      (block) => !containsBlockedAnalyticsAvailability(block),
    );
    if (containsBlockedAnalyticsAvailability({
      heading: section.heading,
      blocks: safeBlocks,
    })) return [];
    return [{ ...section, blocks: safeBlocks }];
  });
}

function RichText({
  text,
  seenTerms,
}: {
  text: string;
  seenTerms: Set<string>;
}) {
  const standaloneLink = text.match(/^\*\*(.+?):\*\*\s+`(\/[^`\s]+)`$/);
  if (standaloneLink) {
    return (
      <Link className="service-document-link" href={standaloneLink[2]}>
        {standaloneLink[1]}
        <ArrowRight aria-hidden="true" size={16} />
      </Link>
    );
  }

  const segments = text.split(/(\*\*[^*]+\*\*|`\/[^`\s]+`)/g).filter(Boolean);
  return segments.map((segment, index) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong key={`${segment}-${index}`}>
          <DefinedText autoDefine seenTerms={seenTerms} text={segment.slice(2, -2)} />
        </strong>
      );
    }
    if (segment.startsWith("`/") && segment.endsWith("`")) {
      const href = segment.slice(1, -1);
      return (
        <Link href={href} key={`${segment}-${index}`}>
          {href}
        </Link>
      );
    }
    return (
      <DefinedText
        autoDefine
        key={`${segment.slice(0, 20)}-${index}`}
        seenTerms={seenTerms}
        text={segment}
      />
    );
  });
}

function renderContentBlock(
  block: ServicePageBlock,
  route: string,
  seenTerms: Set<string>,
  key: string,
): ReactNode {
  if (block.type === "heading") {
    return (
      <h3 id={headingId(route, block.text)} key={key}>
        <RichText seenTerms={seenTerms} text={block.text} />
      </h3>
    );
  }
  if (block.type === "paragraph") {
    return (
      <p key={key}>
        <RichText seenTerms={seenTerms} text={block.text} />
      </p>
    );
  }
  if (block.type === "blockquote") {
    return (
      <blockquote key={key}>
        <RichText seenTerms={seenTerms} text={block.text} />
      </blockquote>
    );
  }

  const List = block.ordered ? "ol" : "ul";
  return (
    <List className="service-document-list" key={key}>
      {block.items.map((item, index) => (
        <li key={`${item}-${index}`}>
          <span className="service-document-list__marker" aria-hidden="true">
            {block.ordered ? String(index + 1).padStart(2, "0") : <Check size={14} />}
          </span>
          <span><RichText seenTerms={seenTerms} text={item} /></span>
        </li>
      ))}
    </List>
  );
}

function FaqSection({
  section,
  route,
  seenTerms,
}: {
  section: BodySection;
  route: string;
  seenTerms: Set<string>;
}) {
  const questions: Array<{
    heading: Extract<ServicePageBlock, { type: "heading" }>;
    blocks: ServicePageBlock[];
  }> = [];

  for (const block of section.blocks) {
    if (block.type === "heading") {
      questions.push({ heading: block, blocks: [] });
      continue;
    }
    questions.at(-1)?.blocks.push(block);
  }

  return (
    <section className="service-document-section service-document-faq" id="frequently-asked-questions">
      <div className="section-shell service-document-section__layout">
        <header>
          <p className="eyebrow">Questions before scope</p>
          <h2>{section.heading.text}</h2>
          <p>Clear boundaries make the next decision easier.</p>
        </header>
        <div className="service-faq-list">
          {questions.map((question, questionIndex) => (
            <details key={question.heading.text} open={questionIndex === 0}>
              <summary>
                <span>{question.heading.text}</span>
                <span aria-hidden="true">+</span>
              </summary>
              <div>
                {question.blocks.map((block, blockIndex) =>
                  renderContentBlock(
                    block,
                    route,
                    seenTerms,
                    `${questionIndex}-${blockIndex}`,
                  ),
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceDetailPage({ page }: { page: ServicePage }) {
  const seenTerms = new Set<string>();
  const sections = sectionize(page.body);
  if (!isCommercialServiceRoute(page.metadata.canonicalRoute)) {
    throw new Error(`Missing commercial service layer for ${page.metadata.canonicalRoute}`);
  }
  return (
    <>
      <Header />
      <main className="service-document" id="main-content" tabIndex={-1}>
        <CommercialServiceLayer route={page.metadata.canonicalRoute} />

        <nav className="service-document-index">
          <div className="section-shell">
            {sections.map((section) => (
              <a href={`#${headingId(page.metadata.canonicalRoute, section.heading.text)}`} key={section.heading.text}>
                {section.heading.text}
              </a>
            ))}
          </div>
        </nav>

        <div className="service-document-body">
          {sections.map((section, sectionIndex) => {
            if (section.heading.text === "Frequently asked questions") {
              return (
                <FaqSection
                  key={section.heading.text}
                  route={page.metadata.canonicalRoute}
                  section={section}
                  seenTerms={seenTerms}
                />
              );
            }
            const sectionId = headingId(page.metadata.canonicalRoute, section.heading.text);
            return (
              <section
                className={`service-document-section service-document-section--${sectionIndex % 3}`}
                id={sectionId}
                key={section.heading.text}
              >
                <div className="section-shell service-document-section__layout">
                  <header>
                    <span aria-hidden="true">{String(sectionIndex + 1).padStart(2, "0")}</span>
                    <h2>{section.heading.text}</h2>
                  </header>
                  <div className="service-document-section__content">
                    {section.blocks.map((block, blockIndex) =>
                      renderContentBlock(
                        block,
                        page.metadata.canonicalRoute,
                        seenTerms,
                        `${sectionId}-${blockIndex}`,
                      ),
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

      </main>
      <Footer />
    </>
  );
}
