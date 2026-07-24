import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { primaryNavigation } from "../content/navigation";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileMenu } from "./MobileMenu";

type LocalHref = "/" | `/${string}` | `#${string}` | `mailto:${string}`;

type LocalLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  href: LocalHref;
  children: ReactNode;
};

type ButtonLinkProps = LocalLinkProps & {
  variant?: "primary" | "secondary";
};

type BreadcrumbItem = {
  label: string;
  href?: LocalHref;
};

type LinkItem = {
  label: string;
  href: LocalHref;
};

type LinkCard = {
  title: string;
  href: LocalHref;
  description?: string;
};

type FieldBase = {
  id: string;
  name: string;
  label: string;
  hint?: ReactNode;
  error?: ReactNode;
  className?: string;
};

type InputFieldProps = FieldBase &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "name" | "className"
  > & {
    as?: "input";
  };

type TextareaFieldProps = FieldBase &
  Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "id" | "name" | "className"
  > & {
    as: "textarea";
  };

type SelectFieldProps = FieldBase &
  Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "id" | "name" | "className"
  > & {
    as: "select";
    options: ReadonlyArray<{ label: string; value: string }>;
    placeholder?: string;
  };

type FormFieldProps =
  | InputFieldProps
  | TextareaFieldProps
  | SelectFieldProps;

type StatusKind = "success" | "error" | "info";

type EvidenceStatus =
  | "verified-current"
  | "demonstrated-public"
  | "internal-working-system"
  | "prototype-or-experiment"
  | "planned"
  | "historical-or-archived"
  | "prohibited-claim";

const footerGroups: ReadonlyArray<{
  title: string;
  links: ReadonlyArray<LinkItem>;
}> = [
  {
    title: "Services",
    links: [
      { label: "All services", href: "/services/" },
      {
        label: "Ongoing SEO & Search Growth",
        href: "/services/ongoing-seo/",
      },
      {
        label: "Web Design & Website Redesign",
        href: "/services/web-design-redesign/",
      },
      {
        label: "Website Migration & Provider Rescue",
        href: "/services/provider-rescue/",
      },
      {
        label: "Custom Web & Digital Solutions",
        href: "/services/custom-digital-solutions/",
      },
      {
        label: "Digital Research, SEO Audits & Strategy",
        href: "/services/research-audits-strategy/",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resources overview", href: "/resources/" },
      { label: "Practical guides", href: "/learn/" },
      { label: "Plain-language glossary", href: "/learn/glossary/" },
      { label: "Website buying", href: "/learn/website-buying/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "Contact", href: "/contact/" },
      { label: "Emergency Help", href: "/emergency/" },
    ],
  },
];

const legalLinks: ReadonlyArray<LinkItem> = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Accessibility", href: "/accessibility/" },
];

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function mergeDescriptionIds(...ids: Array<string | undefined>) {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...anchorProps
}: ButtonLinkProps) {
  return (
    <a
      className={classNames(
        "button-link",
        `button-link--${variant}`,
        className,
      )}
      {...anchorProps}
    >
      <span className="button-link__label">{children}</span>
      <span className="button-link__arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}

export function TextLink({
  className,
  children,
  ...anchorProps
}: LocalLinkProps) {
  return (
    <a className={classNames("text-link", className)} {...anchorProps}>
      <span>{children}</span>
      <span className="text-link__arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={classNames("eyebrow", className)}>{children}</p>;
}

export function EditorialHeadline({
  as: Heading = "h2",
  children,
  className,
}: {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
}) {
  return (
    <Heading className={classNames("editorial-headline", className)}>
      {children}
    </Heading>
  );
}

export function ReadingWidthBody({
  as: Container = "div",
  children,
  className,
}: {
  as?: "div" | "p";
  children: ReactNode;
  className?: string;
}) {
  return (
    <Container className={classNames("reading-width-body", className)}>
      {children}
    </Container>
  );
}

export function MosaicCard({
  eyebrow,
  title,
  children,
  href,
  linkLabel = "Explore",
  tone = "ivory",
  className,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  href?: LocalHref;
  linkLabel?: string;
  tone?: "ivory" | "parchment" | "gold" | "verdigris" | "copper" | "plum" | "blue";
  className?: string;
}) {
  return (
    <article
      className={classNames(
        "mosaic-card",
        `mosaic-card--${tone}`,
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h3 className="mosaic-card__title">{title}</h3>
      <div className="mosaic-card__body">{children}</div>
      {href ? (
        <TextLink className="mosaic-card__link" href={href}>
          {linkLabel}
        </TextLink>
      ) : null}
    </article>
  );
}

export function ResearchCard({
  status = "planned",
  title,
  children,
  href,
  linkLabel = "View the work",
  className,
}: {
  status?: EvidenceStatus;
  title: string;
  children: ReactNode;
  href?: LocalHref;
  linkLabel?: string;
  className?: string;
}) {
  return (
    <article className={classNames("research-card", className)}>
      <EvidenceBadge status={status} />
      <h3 className="research-card__title">{title}</h3>
      <div className="research-card__body">{children}</div>
      {href ? (
        <TextLink className="research-card__link" href={href}>
          {linkLabel}
        </TextLink>
      ) : null}
    </article>
  );
}

export function BuyerBucketPanel({
  index,
  title,
  children,
  href,
  linkLabel = "Explore this business type",
  className,
}: {
  index?: number | string;
  title: string;
  children: ReactNode;
  href?: LocalHref;
  linkLabel?: string;
  className?: string;
}) {
  return (
    <article className={classNames("buyer-bucket-panel", className)}>
      {index !== undefined ? (
        <span className="buyer-bucket-panel__index" aria-hidden="true">
          {index}
        </span>
      ) : null}
      <h3 className="buyer-bucket-panel__title">{title}</h3>
      <div className="buyer-bucket-panel__body">{children}</div>
      {href ? (
        <TextLink className="buyer-bucket-panel__link" href={href}>
          {linkLabel}
        </TextLink>
      ) : null}
    </article>
  );
}

export function ServiceModule({
  eyebrow,
  title,
  children,
  href,
  linkLabel = "View service",
  className,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  href: LocalHref;
  linkLabel?: string;
  className?: string;
}) {
  return (
    <article className={classNames("service-module", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h3 className="service-module__title">{title}</h3>
      <div className="service-module__body">{children}</div>
      <TextLink className="service-module__link" href={href}>
        {linkLabel}
      </TextLink>
    </article>
  );
}

export function PullQuote({
  children,
  attribution,
  className,
}: {
  children: ReactNode;
  attribution?: ReactNode;
  className?: string;
}) {
  return (
    <figure className={classNames("pull-quote", className)}>
      <blockquote className="pull-quote__text">{children}</blockquote>
      {attribution ? (
        <figcaption className="pull-quote__attribution">
          {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function MarginNote({
  label,
  children,
  className,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside className={classNames("margin-note", className)}>
      {label ? <strong className="margin-note__label">{label}</strong> : null}
      <div className="margin-note__body">{children}</div>
    </aside>
  );
}

export function ArticleMetadata({
  items,
  className,
}: {
  items: ReadonlyArray<{ label: string; value: ReactNode }>;
  className?: string;
}) {
  return (
    <dl className={classNames("article-metadata", className)}>
      {items.map((item, index) => (
        <div className="article-metadata__item" key={`${item.label}-${index}`}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function GlossaryCrossLink({
  term,
  href,
  children,
  className,
}: {
  term: string;
  href: LocalHref;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <aside className={classNames("glossary-cross-link", className)}>
      <Eyebrow>Glossary</Eyebrow>
      <TextLink className="glossary-cross-link__term" href={href}>
        {term}
      </TextLink>
      {children ? (
        <div className="glossary-cross-link__body">{children}</div>
      ) : null}
    </aside>
  );
}

function BrandBee() {
  return (
    <span className="brand-bee" aria-hidden="true">
      <img
        src="/brand/boho-bee-logo-v2-transparent.png"
        width="256"
        height="256"
        alt=""
      />
    </span>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-header__inner">
        <Link
          className="site-header__brand"
          href="/"
          aria-label="Boho Digital Services home"
        >
          <BrandBee />
          <span className="site-header__brand-copy">
            <span className="site-header__brand-word">Boho</span>
            <span className="site-header__brand-service">Digital Services</span>
          </span>
        </Link>

        <DesktopNavigation navigation={primaryNavigation} />

        <div className="site-header__desktop-actions">
          <Link className="site-header__utility-link" href="/contact/">
            Contact
          </Link>
          <ButtonLink className="site-header__desktop-cta" href="/contact/">
            Talk to Someone Technical
          </ButtonLink>
        </div>

        <div className="site-header__mobile-actions">
          <ButtonLink className="site-header__mobile-cta" href="/contact/">
            Talk Technical
          </ButtonLink>

          <MobileMenu
            action={{ label: "Send the Situation", href: "/start/" }}
            labels={{
              open: "Open the site menu",
              close: "Close the site menu",
              emergency: "Emergency Website Help",
            }}
            navigation={primaryNavigation}
          />
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand-block">
          <Link className="site-footer__brand" href="/">
            <BrandBee />
            <span>Boho Digital Services</span>
          </Link>
          <p className="site-footer__brand-statement">
            Digital engineering for businesses that need visibility, lead
            systems, websites, and operational tools they can understand.
          </p>
          <div className="site-footer__contact-links">
            <a href="mailto:contact@bohemiandigital.org">
              contact@bohemiandigital.org
            </a>
            <a href="mailto:webmaster@bohemiandigital.org">
              Webmaster
            </a>
          </div>
          <ButtonLink href="/contact/">Talk to Someone Technical</ButtonLink>
        </div>

        <div className="site-footer__link-groups">
          {footerGroups.map((group) => (
            <nav
              className="site-footer__link-group"
              aria-label={`Footer ${group.title}`}
              key={group.title}
            >
              <h2 className="site-footer__group-title">{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__system-line">
            Diagnose. Prioritize. Engineer. Deploy. Measure. Improve.
          </p>

          <nav className="site-footer__legal" aria-label="Legal">
            <ul>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            className="site-footer__github"
            href="https://github.com/bohodigital"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Boho Digital on GitHub"
            title="Boho Digital on GitHub"
          >
            <img
              src="/brand/github-invertocat-white.svg"
              width="24"
              height="24"
              loading="lazy"
              decoding="async"
              alt=""
            />
          </a>

          <p className="site-footer__copyright">
            {"©"} {currentYear} Boho Digital Services
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: ReadonlyArray<BreadcrumbItem>;
  className?: string;
}) {
  return (
    <nav
      className={classNames("breadcrumbs", className)}
      aria-label="Breadcrumb"
    >
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li className="breadcrumbs__item" key={`${item.label}-${index}`}>
              {isCurrent || !item.href ? (
                <span aria-current={isCurrent ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <a href={item.href}>{item.label}</a>
              )}
              {!isCurrent ? (
                <span className="breadcrumbs__separator" aria-hidden="true">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function FormField(props: FormFieldProps) {
  const { id, name, label, hint, error, className } = props;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  let control: ReactNode;

  if (props.as === "textarea") {
    const {
      as: _as,
      id: _id,
      name: _name,
      label: _label,
      hint: _hint,
      error: _error,
      className: _className,
      "aria-describedby": ariaDescribedBy,
      ...textareaProps
    } = props;

    control = (
      <textarea
        {...textareaProps}
        className="form-field__control form-field__control--textarea"
        id={id}
        name={name}
        aria-describedby={mergeDescriptionIds(
          ariaDescribedBy,
          hintId,
          errorId,
        )}
        aria-invalid={error ? true : textareaProps["aria-invalid"]}
      />
    );
  } else if (props.as === "select") {
    const {
      as: _as,
      id: _id,
      name: _name,
      label: _label,
      hint: _hint,
      error: _error,
      className: _className,
      options,
      placeholder,
      "aria-describedby": ariaDescribedBy,
      ...selectProps
    } = props;

    control = (
      <select
        {...selectProps}
        className="form-field__control form-field__control--select"
        id={id}
        name={name}
        aria-describedby={mergeDescriptionIds(
          ariaDescribedBy,
          hintId,
          errorId,
        )}
        aria-invalid={error ? true : selectProps["aria-invalid"]}
      >
        {placeholder ? (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else {
    const {
      as: _as,
      id: _id,
      name: _name,
      label: _label,
      hint: _hint,
      error: _error,
      className: _className,
      "aria-describedby": ariaDescribedBy,
      ...inputProps
    } = props;

    control = (
      <input
        {...inputProps}
        className="form-field__control form-field__control--input"
        id={id}
        name={name}
        aria-describedby={mergeDescriptionIds(
          ariaDescribedBy,
          hintId,
          errorId,
        )}
        aria-invalid={error ? true : inputProps["aria-invalid"]}
      />
    );
  }

  return (
    <div
      className={classNames(
        "form-field",
        Boolean(error) && "form-field--error",
        className,
      )}
    >
      <label className="form-field__label" htmlFor={id}>
        {label}
        {props.required ? (
          <>
            <span className="form-field__required-mark" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>
      {hint ? (
        <div className="form-field__hint" id={hintId}>
          {hint}
        </div>
      ) : null}
      {control}
      {error ? (
        <div className="form-field__error" id={errorId} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}

export function FormStatusMessage({
  status = "info",
  title,
  children,
  className,
}: {
  status?: StatusKind;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "form-status",
        `form-status--${status}`,
        className,
      )}
      role={status === "error" ? "alert" : "status"}
      aria-live={status === "error" ? "assertive" : "polite"}
      aria-atomic="true"
    >
      {title ? <strong className="form-status__title">{title}</strong> : null}
      <div className="form-status__message">{children}</div>
    </div>
  );
}

export function CtaBand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  className,
}: {
  eyebrow?: string;
  title: string;
  body?: ReactNode;
  primary: LinkItem;
  secondary?: LinkItem;
  className?: string;
}) {
  return (
    <section className={classNames("cta-band", className)}>
      <div className="cta-band__copy">
        {eyebrow ? <p className="cta-band__eyebrow">{eyebrow}</p> : null}
        <h2 className="cta-band__title">{title}</h2>
        {body ? <div className="cta-band__body">{body}</div> : null}
      </div>
      <div className="cta-band__actions">
        <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
        {secondary ? (
          <ButtonLink href={secondary.href} variant="secondary">
            {secondary.label}
          </ButtonLink>
        ) : null}
      </div>
    </section>
  );
}

export function FaqItem({
  question,
  children,
  className,
  open = false,
}: {
  question: string;
  children: ReactNode;
  className?: string;
  open?: boolean;
}) {
  return (
    <details className={classNames("faq-item", className)} open={open}>
      <summary className="faq-item__question">
        <span>{question}</span>
        <span className="faq-item__icon" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="faq-item__answer">{children}</div>
    </details>
  );
}

const evidenceLabels: Record<EvidenceStatus, string> = {
  "verified-current": "Verified current",
  "demonstrated-public": "Demonstrated public",
  "internal-working-system": "Internal working system",
  "prototype-or-experiment": "Prototype or experiment",
  planned: "Planned",
  "historical-or-archived": "Historical or archived",
  "prohibited-claim": "Prohibited claim",
};

export function EvidenceBadge({
  status = "planned",
  children,
  className,
}: {
  status?: EvidenceStatus;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={classNames(
        "evidence-badge",
        `evidence-badge--${status}`,
        className,
      )}
    >
      <span className="evidence-badge__dot" aria-hidden="true" />
      <span>{children ?? evidenceLabels[status]}</span>
    </span>
  );
}

export function RelatedPages({
  items,
  eyebrow = "Keep exploring",
  title = "Related pages",
  className,
}: {
  items: ReadonlyArray<LinkCard>;
  eyebrow?: string;
  title?: string;
  className?: string;
}) {
  return (
    <section className={classNames("related-pages", className)}>
      <div className="related-pages__heading">
        <p className="related-pages__eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <ul className="related-pages__grid">
        {items.map((item) => (
          <li className="related-pages__item" key={item.href}>
            <TextLink className="related-pages__link" href={item.href}>
              {item.title}
            </TextLink>
            {item.description ? <p>{item.description}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
