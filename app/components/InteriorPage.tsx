import type {
  ContentItem,
  ContentSection,
  PageConfig,
} from "../content/types";
import { BookOpenCheck, FlaskConical, PanelsTopLeft, SearchCheck } from "lucide-react";
import { DefinedText } from "./DefinedText";
import { DraftForm } from "./DraftForm";
import { SectionSidebar, type SectionAnchor } from "./SectionNavigation";
import {
  Breadcrumbs,
  ButtonLink,
  BuyerBucketPanel,
  CtaBand,
  EditorialHeadline,
  EvidenceBadge,
  Footer,
  Header,
  MarginNote,
  MosaicCard,
  PullQuote,
  TextLink,
} from "./SiteChrome";

type LocalHref = "/" | `/${string}` | `#${string}` | `mailto:${string}`;

type InteriorPageProps =
  | { page: PageConfig; config?: never }
  | { config: PageConfig; page?: never };

type EvidenceStatus =
  | "verified-current"
  | "demonstrated-public"
  | "internal-working-system"
  | "prototype-or-experiment"
  | "planned"
  | "historical-or-archived"
  | "prohibited-claim";

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function toLocalHref(href: string | undefined): LocalHref | undefined {
  if (!href) return undefined;
  if (href === "/") return "/";
  if (href.startsWith("#")) return href as `#${string}`;
  if (href.startsWith("mailto:")) return href as `mailto:${string}`;
  if (href.startsWith("/") && !href.startsWith("//")) {
    return href as `/${string}`;
  }

  return undefined;
}

function humanizeSlug(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function buildBreadcrumbs(page: PageConfig) {
  const segments = page.slug
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean);
  const items: Array<{ label: string; href?: LocalHref }> = [
    { label: "Home", href: "/" },
  ];

  if (segments[0] === "learn" || segments[0] === "lab") {
    const root = segments[0];
    const rootLabel = root === "learn" ? "Practical guides" : "The Lab";
    items.push({ label: "Resources", href: "/resources/" });

    if (segments.length === 1) {
      items.push({ label: rootLabel });
    } else {
      items.push({ label: rootLabel, href: `/${root}/` as `/${string}` });
      items.push({ label: humanizeSlug(segments.at(-1) ?? root) });
    }

    return items;
  }

  segments.forEach((segment, index) => {
    const isCurrent = index === segments.length - 1;
    items.push({
      label: isCurrent ? page.title : humanizeSlug(segment),
      href: isCurrent
        ? undefined
        : (`/${segments.slice(0, index + 1).join("/")}/` as `/${string}`),
    });
  });

  if (segments.length === 0) {
    items.push({ label: page.title });
  }

  return items;
}

function sectionId(section: ContentSection, index: number) {
  const title = (section.id ?? section.eyebrow ?? section.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return title || `section-${index + 1}-content`;
}

function evidenceStatus(status: ContentItem["status"]): EvidenceStatus {
  switch (status) {
    case "Verified current":
      return "verified-current";
    case "Demonstrated public":
      return "demonstrated-public";
    case "Internal working system":
      return "internal-working-system";
    case "Prototype or experiment":
      return "prototype-or-experiment";
    case "Historical or archived":
      return "historical-or-archived";
    case "Prohibited claim":
      return "prohibited-claim";
    case "Planned":
    default:
      return "planned";
  }
}

function cardTone(tone: ContentSection["tone"], index: number) {
  const toneOrders = {
    ivory: ["gold", "verdigris", "blue", "copper", "plum"],
    parchment: ["copper", "gold", "verdigris", "plum", "blue"],
    verdigris: ["verdigris", "gold", "blue", "copper", "plum"],
    plum: ["plum", "copper", "gold", "blue", "verdigris"],
    blue: ["blue", "verdigris", "gold", "plum", "copper"],
    dark: ["gold", "verdigris", "copper", "blue", "plum"],
  } as const;
  const order = toneOrders[tone ?? "ivory"];

  return order[index % order.length];
}

function ItemStatus({ item }: { item: ContentItem }) {
  if (!item.status) return null;

  return (
    <EvidenceBadge status={evidenceStatus(item.status)} />
  );
}

function ItemLink({ item }: { item: ContentItem }) {
  const href = toLocalHref(item.href);
  if (!href) return null;

  return <TextLink href={href}>{item.linkLabel ?? "Explore"}</TextLink>;
}

function SectionItems({
  section,
  seenTerms,
}: {
  section: ContentSection;
  seenTerms: Set<string>;
}) {
  if (!section.items?.length) return null;

  if (section.layout === "steps") {
    return (
      <ol className="interior-steps">
        {section.items.map((item, index) => (
          <li className="interior-steps__item" key={`${item.title}-${index}`}>
            <BuyerBucketPanel
              index={String(index + 1).padStart(2, "0")}
              title={item.title}
              href={toLocalHref(item.href)}
              linkLabel={item.linkLabel}
            >
              <ItemStatus item={item} />
              <p><DefinedText seenTerms={seenTerms} text={item.body} /></p>
            </BuyerBucketPanel>
          </li>
        ))}
      </ol>
    );
  }

  if (section.layout === "list") {
    return (
      <ul className="interior-list">
        {section.items.map((item, index) => (
          <li className="interior-list__item" key={`${item.title}-${index}`}>
            <article className="interior-list__card">
              <ItemStatus item={item} />
              <h3>{item.title}</h3>
              <p><DefinedText seenTerms={seenTerms} text={item.body} /></p>
              <ItemLink item={item} />
            </article>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      className={classNames(
        "interior-card-grid",
        section.layout === "split" && "interior-card-grid--split",
      )}
    >
      {section.items.map((item, index) => (
        <MosaicCard
          className="interior-card-grid__card"
          href={toLocalHref(item.href)}
          key={`${item.title}-${index}`}
          linkLabel={item.linkLabel}
          title={item.title}
          tone={cardTone(section.tone, index)}
        >
          <ItemStatus item={item} />
          <p><DefinedText seenTerms={seenTerms} text={item.body} /></p>
        </MosaicCard>
      ))}
    </div>
  );
}

function InteriorSection({
  section,
  index,
  seenTerms,
}: {
  section: ContentSection;
  index: number;
  seenTerms: Set<string>;
}) {
  const id = sectionId(section, index);
  const layout = section.layout ?? "split";
  const tone = section.tone ?? "ivory";

  return (
    <section
      className={classNames(
        "interior-section",
        `interior-section--${layout}`,
        `interior-section--tone-${tone}`,
      )}
      aria-labelledby={id}
    >
      <div className="section-shell interior-section__inner">
        <div className="interior-section__heading">
          <EditorialHeadline as="h2" className="interior-section__title">
            <span id={id}>{section.title}</span>
          </EditorialHeadline>
        </div>

        <div className="interior-section__content">
          {section.body?.length ? (
            <div className="interior-section__body reading-width">
              {section.body.map((paragraph, paragraphIndex) => (
                <p key={`${paragraph.slice(0, 32)}-${paragraphIndex}`}>
                  <DefinedText seenTerms={seenTerms} text={paragraph} />
                </p>
              ))}
            </div>
          ) : null}

          {section.quote ? (
            <PullQuote className="interior-section__quote">
              <DefinedText seenTerms={seenTerms} text={section.quote} />
            </PullQuote>
          ) : null}

          {section.note ? (
            <MarginNote className="interior-section__note" label="Field note">
              <p><DefinedText seenTerms={seenTerms} text={section.note} /></p>
            </MarginNote>
          ) : null}

          <SectionItems section={section} seenTerms={seenTerms} />
        </div>
      </div>
    </section>
  );
}

export function InteriorPage(props: InteriorPageProps) {
  const page = (props.page ?? props.config) as PageConfig;
  const primaryHref = toLocalHref(page.primaryCta.href);
  const secondaryHref = toLocalHref(page.secondaryCta?.href);
  const breadcrumbs = buildBreadcrumbs(page);
  const shouldRenderRelatedCta =
    Boolean(primaryHref) && !primaryHref?.startsWith("#") && !primaryHref?.startsWith("mailto:");
  const seenTerms = new Set<string>();
  const pageAnchors: SectionAnchor[] = page.sections.map((section, index) => ({
    label: section.title,
    href: `#${sectionId(section, index)}` as `#${string}`,
  }));
  if (page.form) {
    pageAnchors.push({
      label: page.form.title,
      href: `#${page.form.sectionId}` as `#${string}`,
    });
  }

  return (
    <>
      <Header />
      <main
        className={`interior-page interior-page--${page.theme}`}
        data-theme={page.theme}
        id="main-content"
        tabIndex={-1}
      >
        <section
          className={`interior-hero interior-hero--${page.theme}`}
          aria-labelledby="interior-hero-title"
        >
          <div className="interior-hero__motif" aria-hidden="true">
            <span><PanelsTopLeft size={32} strokeWidth={1.6} /></span>
            <span><SearchCheck size={30} strokeWidth={1.6} /></span>
            <span><BookOpenCheck size={31} strokeWidth={1.6} /></span>
            <span><FlaskConical size={33} strokeWidth={1.6} /></span>
          </div>
          <div className="section-shell interior-hero__inner">
            <Breadcrumbs items={breadcrumbs} />

            <div className="interior-hero__copy">
              <p className="eyebrow interior-hero__eyebrow">{page.eyebrow}</p>
              <EditorialHeadline
                as="h1"
                className="interior-hero__title"
              >
                <span id="interior-hero-title">{page.headline}</span>
              </EditorialHeadline>
              <div className="interior-hero__intro reading-width">
                {page.intro.map((paragraph, index) => (
                  <p key={`${paragraph.slice(0, 32)}-${index}`}><DefinedText seenTerms={seenTerms} text={paragraph} /></p>
                ))}
              </div>
              {primaryHref || secondaryHref ? (
                <div className="button-row interior-hero__actions">
                  {primaryHref ? (
                    <ButtonLink href={primaryHref}>
                      {page.primaryCta.label}
                    </ButtonLink>
                  ) : null}
                  {secondaryHref && page.secondaryCta ? (
                    <ButtonLink href={secondaryHref} variant="secondary">
                      {page.secondaryCta.label}
                    </ButtonLink>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <div className="section-navigation-layout">
          <SectionSidebar anchors={pageAnchors} currentPath={page.slug} />
          <div className="section-navigation-layout__content">
            {page.sections.map((section, index) => (
              <InteriorSection
                index={index}
                key={`${section.title}-${index}`}
                section={section}
                seenTerms={seenTerms}
              />
            ))}

            {page.form ? (
              <section
                className="interior-form-section"
                id={page.form.sectionId}
                aria-label={page.form.title}
              >
                <div className="section-shell">
                  <DraftForm config={page.form} />
                </div>
              </section>
            ) : null}

            {shouldRenderRelatedCta && primaryHref ? (
              <div className="section-shell interior-page__related-cta">
                <CtaBand
                  title="Choose a practical next step."
                  primary={{
                    label: page.primaryCta.label,
                    href: primaryHref,
                  }}
                  secondary={
                    secondaryHref && page.secondaryCta
                      ? {
                          label: page.secondaryCta.label,
                          href: secondaryHref,
                        }
                      : undefined
                  }
                />
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default InteriorPage;
