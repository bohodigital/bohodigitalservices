type SectionNavigationItem = {
  label: string;
  href: `/${string}` | `#${string}`;
};

export type SectionAnchor = {
  label: string;
  href: `#${string}`;
};

const sectionMenus: Record<
  "services" | "industries" | "learn" | "lab" | "company",
  { title: string; items: SectionNavigationItem[] }
> = {
  services: {
    title: "Services",
    items: [
      { label: "Service overview", href: "/services/" },
      { label: "Website design", href: "/services/website-design-redesign/" },
      { label: "Migration & provider rescue", href: "/services/website-migration-provider-rescue/" },
      { label: "Local SEO", href: "/services/local-seo-search-visibility/" },
      { label: "Lead generation", href: "/services/lead-generation-conversion/" },
      { label: "Ongoing growth", href: "/services/ongoing-seo-growth/" },
      { label: "Technical SEO", href: "/services/technical-seo-site-health/" },
      { label: "Research & analytics", href: "/services/research-audits-analytics/" },
    ],
  },
  industries: {
    title: "Industries",
    items: [
      { label: "Industry overview", href: "/industries/" },
      { label: "Home improvement", href: "/industries/home-improvement-contractors/" },
      { label: "Local services", href: "/industries/local-service-businesses/" },
      { label: "Retail & hospitality", href: "/industries/brick-and-mortar-retail-hospitality/" },
      { label: "Ecommerce", href: "/industries/online-retail-ecommerce/" },
      { label: "Professional & B2B", href: "/industries/professional-b2b-services/" },
    ],
  },
  learn: {
    title: "Learn",
    items: [
      { label: "Learn overview", href: "/learn/" },
      { label: "Glossary", href: "/learn/glossary/" },
      { label: "Tools documentation", href: "/tools/" },
      { label: "Bad SEO Field Guide", href: "/learn/bad-seo-field-guide/" },
      { label: "Small-business SEO", href: "/learn/small-business-seo/" },
      { label: "Local search", href: "/learn/local-search/" },
      { label: "Website buying", href: "/learn/website-buying/" },
      { label: "Provider rescue", href: "/learn/provider-rescue/" },
      { label: "AI search visibility", href: "/learn/ai-search-visibility/" },
      { label: "Rank Builder research", href: "/learn/featured-rank-builder/" },
    ],
  },
  lab: {
    title: "The Boho Lab",
    items: [
      { label: "Lab overview", href: "/lab/" },
      { label: "Claims we refuse", href: "/lab/claims-we-refuse-to-make/" },
      { label: "Local market reports", href: "/lab/local-market-reports/" },
      { label: "Market maps", href: "/lab/market-map-examples/" },
      { label: "Website surveys", href: "/lab/website-quality-surveys/" },
      { label: "Success-signal studies", href: "/lab/success-signal-studies/" },
      { label: "Public experiments", href: "/lab/public-experiments/" },
      { label: "Work log", href: "/lab/work-log/" },
      { label: "In-house brands", href: "/lab/in-house-brands/" },
      { label: "Example reports", href: "/lab/example-reports/" },
      { label: "Public teardowns", href: "/lab/public-teardowns/" },
      { label: "Tools & templates", href: "/lab/tools-and-templates/" },
    ],
  },
  company: {
    title: "Plan a project",
    items: [
      { label: "Pricing", href: "/pricing/" },
      { label: "About", href: "/about/" },
      { label: "Contact", href: "/contact/" },
      { label: "Visibility Check", href: "/start/" },
      { label: "Emergency help", href: "/emergency/" },
      { label: "Privacy draft", href: "/privacy/" },
      { label: "Terms draft", href: "/terms/" },
      { label: "Accessibility", href: "/accessibility/" },
    ],
  },
};

function menuForPath(path: string) {
  if (path.startsWith("/services/")) return sectionMenus.services;
  if (path.startsWith("/industries/")) return sectionMenus.industries;
  if (path.startsWith("/learn/") || path === "/tools/") return sectionMenus.learn;
  if (path.startsWith("/lab/")) return sectionMenus.lab;
  return sectionMenus.company;
}

export function SectionSidebar({
  currentPath,
  anchors = [],
  title,
  items,
  note,
}: {
  currentPath: string;
  anchors?: SectionAnchor[];
  title?: string;
  items?: SectionNavigationItem[];
  note?: string;
}) {
  const defaultMenu = menuForPath(currentPath);
  const menuTitle = title ?? defaultMenu.title;
  const menuItems = items ?? defaultMenu.items;

  return (
    <aside className="section-sidebar" aria-label={`${menuTitle} section navigation`}>
      <details className="section-sidebar__panel" open>
        <summary>
          <span>Section menu</span>
          <strong>{menuTitle}</strong>
        </summary>
        <div className="section-sidebar__body">
          <nav aria-label={`${menuTitle} pages`}>
            <p className="section-sidebar__label">Explore this section</p>
            <ul>
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a
                    aria-current={item.href === currentPath ? "page" : undefined}
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {anchors.length ? (
            <nav aria-label="On this page">
              <p className="section-sidebar__label">On this page</p>
              <ul className="section-sidebar__anchors">
                {anchors.map((anchor) => (
                  <li key={anchor.href}>
                    <a href={anchor.href}>{anchor.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          {note ? <p className="section-sidebar__note">{note}</p> : null}
        </div>
      </details>
    </aside>
  );
}
