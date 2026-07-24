import Link from "next/link";

import {
  approvedServiceNames,
  commercialContractSection,
  commercialSection,
} from "../../content/commercial/presentation";
import { primaryNavigation } from "../../content/navigation";
import { DesktopNavigation } from "../DesktopNavigation";
import { MobileMenu } from "../MobileMenu";

type ContractLink = { label: string; href: "/" | `/${string}` | `mailto:${string}` };

function pairedLinks(sectionKey: "explore" | "company" | "policies"): ReadonlyArray<ContractLink> {
  const section = commercialContractSection("navigation-footer", sectionKey);
  const labels = section.records.filter(({ classification }) => classification === "navigation");
  const routes = section.records.filter(({ classification }) => classification === "route");
  if (labels.length !== routes.length) throw new Error(`Chrome mapping is incomplete: ${sectionKey}`);
  return labels.map(({ exactValue }, index) => ({
    label: exactValue,
    href: routes[index].exactValue as ContractLink["href"],
  }));
}

function BrandBee() {
  return (
    <span className="brand-bee" aria-hidden="true">
      <img src="/brand/boho-bee-logo-v2-transparent.png" width="256" height="256" alt="" />
    </span>
  );
}

function headerAction() {
  const section = commercialContractSection("navigation-footer", "part-a-primary-navigation");
  const label = section.records.find(({ field, classification }) => field === "Header primary action" && classification === "navigation")?.exactValue;
  const href = section.records.find(({ field, classification }) => field === "Header primary action" && classification === "route")?.exactValue as ContractLink["href"] | undefined;
  if (!label || !href) throw new Error("Header action mapping is incomplete.");
  return { label, href };
}

export function CommercialHeader() {
  const identity = commercialContractSection("navigation-footer", "identity-block");
  const accessibility = commercialContractSection("navigation-footer", "navigation-accessibility-labels");
  const action = headerAction();
  const emergency = pairedLinks("company").find(({ href }) => href === "/emergency/");
  const contact = pairedLinks("company").find(({ href }) => href === "/contact/");
  if (!contact || !emergency) throw new Error("Header contact mapping is incomplete.");
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">{accessibility.one("Skip link")}</a>
      <div className="site-header__inner">
        <Link className="site-header__brand" href="/" aria-label={identity.one("Heading")}>
          <BrandBee />
          <span className="site-header__brand-copy"><span>{identity.one("Heading")}</span></span>
        </Link>
        <DesktopNavigation
          controlLabels={{
            Services: accessibility.one("Desktop services control"),
            Resources: accessibility.one("Desktop resources control"),
          }}
          navigation={primaryNavigation}
        />
        <div className="site-header__desktop-actions">
          <Link className="site-header__utility-link" href={contact.href}>{contact.label}</Link>
          <a className="button-link button-link--primary site-header__desktop-cta" data-umami-event="commercial_primary_cta" href={action.href}>{action.label}</a>
        </div>
        <div className="site-header__mobile-actions">
          <a className="button-link button-link--primary site-header__mobile-cta" data-umami-event="commercial_primary_cta" href={action.href}>{action.label}</a>
          <MobileMenu
            action={action}
            labels={{
              open: accessibility.one("Mobile menu control when closed"),
              close: accessibility.one("Mobile menu control when open"),
              emergency: emergency.label,
            }}
            navigation={primaryNavigation}
          />
        </div>
      </div>
    </header>
  );
}

export function CommercialFooter() {
  const identity = commercialContractSection("navigation-footer", "identity-block");
  const servicesTitle = commercialContractSection("navigation-footer", "services-navigation").one("Group label");
  const explore = pairedLinks("explore");
  const company = pairedLinks("company");
  const policies = pairedLinks("policies");
  const action = company.find(({ href }) => href === "/start/");
  const contactHref = commercialSection("contact", "path-2").one("Destination");
  const webmasterHref = commercialSection("contact", "path-3").one("Destination");
  const copyright = commercialContractSection("navigation-footer", "copyright-pattern").one("value")
    .replace("{current year}", String(new Date().getFullYear()));
  const serviceSections = [
    ["service-local-visibility", "local-visibility-lead-systems"],
    ["service-websites-hosting", "websites-managed-hosting"],
    ["service-provider-rescue", "provider-rescue-migration"],
    ["service-custom-tools", "custom-tools-automation"],
    ["service-research-analytics", "research-analytics-improvement"],
  ] as const;
  if (!action) throw new Error("Footer action mapping is incomplete.");
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand-block">
          <Link className="site-footer__brand" href="/"><BrandBee /><span>{identity.one("Heading")}</span></Link>
          <p className="site-footer__brand-statement">{identity.one("Body line 1")}</p>
          <p>{identity.one("Body line 2")}</p>
          <p>{identity.one("Legal identity")}</p>
          <div className="site-footer__contact-links">
            <a href={contactHref}>{identity.one("General inquiry line")}</a>
            <a href={webmasterHref}>{identity.one("Website issue line")}</a>
          </div>
          <a className="button-link button-link--primary" data-umami-event="commercial_primary_cta" href={action.href}>{action.label}</a>
        </div>
        <div className="site-footer__link-groups">
          <nav className="site-footer__link-group" aria-labelledby="footer-services-title">
            <h2 className="site-footer__group-title" id="footer-services-title">{servicesTitle}</h2>
            <ul>{approvedServiceNames.map((label, index) => {
              const [pageKey, sectionKey] = serviceSections[index];
              return (
                <li key={label}>
                  <a href={commercialSection(pageKey, sectionKey).one("Canonical route")}>{label}</a>
                </li>
              );
            })}</ul>
          </nav>
          <nav className="site-footer__link-group">
            <ul>{explore.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
          </nav>
          <nav className="site-footer__link-group">
            <ul>{company.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
          </nav>
        </div>
        <div className="site-footer__bottom">
          <nav className="site-footer__legal"><ul>{policies.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul></nav>
          <p className="site-footer__copyright">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}

export { CommercialFooter as Footer, CommercialHeader as Header };
