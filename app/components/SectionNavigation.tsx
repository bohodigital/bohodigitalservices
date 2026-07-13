"use client";

import {
  ArrowRight,
  BookOpenCheck,
  ChevronDown,
  FlaskConical,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  resourceNavigationGroups,
  type LocalHref,
} from "../content/navigation";

type SectionNavigationItem = {
  label: string;
  href: LocalHref;
};

export type SectionAnchor = {
  label: string;
  href: `#${string}`;
};

const sectionMenus: Record<
  "services" | "industries" | "company",
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

function isResourcePath(path: string) {
  return (
    path.startsWith("/resources/") ||
    path.startsWith("/learn/") ||
    path.startsWith("/lab/") ||
    path === "/tools/"
  );
}

function menuForPath(path: string) {
  if (path.startsWith("/services/")) return sectionMenus.services;
  if (path.startsWith("/industries/")) return sectionMenus.industries;
  return sectionMenus.company;
}

function hrefPath(href: string) {
  return href.split("#", 1)[0];
}

function isCurrentItem(href: string, currentPath: string) {
  return !href.includes("#") && hrefPath(href) === currentPath;
}

const resourceIcons = {
  guides: BookOpenCheck,
  tools: Wrench,
  lab: FlaskConical,
};

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
  const resourceMode = isResourcePath(currentPath) && !items;
  const defaultMenu = menuForPath(currentPath);
  const menuTitle = title ?? (resourceMode ? "Resources" : defaultMenu.title);
  const menuItems = items ?? defaultMenu.items;
  const [panelOpen, setPanelOpen] = useState(false);
  const [groupState, setGroupState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const query = window.matchMedia("(min-width: 72.01rem)");
    const sync = () => setPanelOpen(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <aside className="section-sidebar" aria-label={`${menuTitle} section navigation`}>
      <details
        className="section-sidebar__panel"
        open={panelOpen}
        onToggle={(event) => setPanelOpen(event.currentTarget.open)}
      >
        <summary>
          <span>Section menu</span>
          <strong>{menuTitle}</strong>
          <ChevronDown className="section-sidebar__summary-icon" aria-hidden="true" size={20} />
        </summary>
        <div className="section-sidebar__body">
          {resourceMode ? (
            <nav aria-label="Resource collections">
              <Link
                className="section-sidebar__home-link"
                aria-current={currentPath === "/resources/" ? "page" : undefined}
                href="/resources/"
              >
                <BookOpenCheck aria-hidden="true" size={18} />
                <span>Resources overview</span>
              </Link>
              <div className="section-sidebar__groups">
                {resourceNavigationGroups.map((group) => {
                  const Icon = resourceIcons[group.icon];
                  const containsCurrent = group.items.some(
                    (item) => isCurrentItem(item.href, currentPath),
                  );
                  const open = groupState[group.label] ?? containsCurrent;

                  return (
                    <details
                      className="section-sidebar__group"
                      key={group.label}
                      open={open}
                      onToggle={(event) => {
                        const next = event.currentTarget.open;
                        setGroupState((current) => ({ ...current, [group.label]: next }));
                      }}
                    >
                      <summary>
                        <Icon aria-hidden="true" size={18} />
                        <span>{group.label}</span>
                        <ChevronDown aria-hidden="true" size={16} />
                      </summary>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <a
                              aria-current={isCurrentItem(item.href, currentPath) ? "page" : undefined}
                              href={item.href}
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  );
                })}
              </div>
              {currentPath !== "/lab/" ? (
                <Link className="section-sidebar__lab-link" href="/lab/">
                  <span>Open the Lab</span>
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              ) : null}
            </nav>
          ) : (
            <nav aria-label={`${menuTitle} pages`}>
              <p className="section-sidebar__label">Explore this section</p>
              <ul>
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <a
                      aria-current={isCurrentItem(item.href, currentPath) ? "page" : undefined}
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {anchors.length ? (
            <nav className="section-sidebar__on-page" aria-label="On this page">
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
