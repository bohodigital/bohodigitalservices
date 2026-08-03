"use client";

import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import type { PrimaryNavigationItem } from "../content/navigation";

function normalizedPath(path: string) {
  return path === "/" ? path : `${path.replace(/\/+$/, "")}/`;
}

function currentState(href: string, pathname: string, hasChildren = false) {
  const target = normalizedPath(href);
  const current = normalizedPath(pathname);
  if (target === current) return "page" as const;
  if (hasChildren && target !== "/" && current.startsWith(target)) return "location" as const;
  return undefined;
}

function trackServiceNavigationOpen() {
  const analyticsWindow = window as unknown as {
    bohoTrackCommercialEvent?: (
      event: string,
      properties: Readonly<Record<string, string>>,
    ) => void;
  };
  analyticsWindow.bohoTrackCommercialEvent?.("service_nav_open", {
    device_context: "desktop",
  });
}

export function DesktopNavigation({
  navigation,
  controlLabels,
}: {
  navigation: ReadonlyArray<PrimaryNavigationItem>;
  controlLabels?: Readonly<Record<string, string>>;
}) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const dropdownToggleRefs = useRef(new Map<string, HTMLButtonElement>());
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const pathname = usePathname();

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenLabel(null);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && openLabel) {
        const trigger = dropdownToggleRefs.current.get(openLabel);
        setOpenLabel(null);
        requestAnimationFrame(() => trigger?.focus());
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openLabel]);

  return (
    <nav
      ref={navRef}
      className="site-header__desktop-nav"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpenLabel(null);
      }}
    >
      <ul className="site-header__nav-list">
        {navigation.map((item) => {
          if (!item.children?.length) {
            return (
              <li key={item.href}>
                <a
                  className="site-header__nav-link"
                  href={item.href}
                  aria-current={currentState(item.href, pathname)}
                >
                  {item.label}
                </a>
              </li>
            );
          }

          const open = openLabel === item.label;
          const menuId = `primary-menu-${rawId}-${item.label.toLowerCase()}`;

          return (
            <li className="site-header__nav-item site-header__nav-item--dropdown" key={item.href}>
              <div className="site-header__nav-cluster">
                <a
                  className="site-header__nav-link"
                  href={item.href}
                  aria-current={currentState(item.href, pathname, true)}
                >
                  {item.label}
                </a>
                <button
                  ref={(node) => {
                    if (node) {
                      dropdownToggleRefs.current.set(item.label, node);
                    } else {
                      dropdownToggleRefs.current.delete(item.label);
                    }
                  }}
                  type="button"
                  className="site-header__dropdown-toggle"
                  aria-expanded={open}
                  aria-controls={menuId}
                  aria-label={controlLabels?.[item.label] ?? item.label}
                  onClick={() => {
                    if (!open && item.label === "Services") trackServiceNavigationOpen();
                    setOpenLabel(open ? null : item.label);
                  }}
                >
                  <ChevronDown aria-hidden="true" size={16} strokeWidth={2.2} />
                </button>
              </div>

              {open ? (
                <div className="site-header__dropdown" id={menuId}>
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          aria-current={currentState(child.href, pathname)}
                          data-overview={child.overview ? "true" : undefined}
                          data-analytics-event={child.serviceName ? "service_nav_click" : undefined}
                          data-analytics-service-name={child.serviceName}
                          data-analytics-price-display={child.priceDisplay}
                          data-analytics-source-page={pathname}
                          onClick={() => setOpenLabel(null)}
                        >
                          <strong>{child.label}</strong>
                          {child.description ? (
                            <span className="desktop-nav__service-description">
                              {child.description.split("\n").map((line) => (
                                <span key={line}>{line}</span>
                              ))}
                            </span>
                          ) : null}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
