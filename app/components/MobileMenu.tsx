"use client";

import Link from "next/link";
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
    device_context: "mobile",
  });
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function MobileMenu({
  navigation,
  action,
  labels,
}: {
  navigation: ReadonlyArray<PrimaryNavigationItem>;
  action: { label: string; href: string };
  labels: {
    open: string;
    close: string;
    emergency: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const panelId = `mobile-menu-${reactId}`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const main = document.querySelector<HTMLElement>("#main-content");
    const footer = document.querySelector<HTMLElement>("footer");
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    if (main) main.inert = true;
    if (footer) footer.inert = true;

    const firstFocusable = panel?.querySelector<HTMLElement>(focusableSelector);
    requestAnimationFrame(() => firstFocusable?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = false;
      if (footer) footer.inert = false;
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="mobile-menu" data-open={open ? "true" : "false"}>
      <button
        ref={triggerRef}
        className="mobile-menu__trigger"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <div
          ref={panelRef}
          className="mobile-menu__panel"
          id={panelId}
          role="dialog"
          aria-label={labels.open}
          aria-modal="true"
        >
          <div className="mobile-menu__panel-inner">
            <Link
              className="button-link button-link--primary mobile-menu__primary-cta"
              data-analytics-event="free_review_click"
              data-analytics-source-page="global"
              data-analytics-source-section="mobile_menu"
              data-analytics-service-context="general"
              href={action.href}
              onClick={closeMenu}
            >
              <span className="button-link__label">{action.label}</span>
              <span className="button-link__arrow" aria-hidden="true">
                {"\u2192"}
              </span>
            </Link>

            <nav>
              <ul className="mobile-menu__nav-list">
                {navigation.map((item) => (
                  <li key={item.href}>
                    {item.children?.length ? (
                      <details
                        className="mobile-menu__group"
                        onToggle={(event) => {
                          if (event.currentTarget.open && item.label === "Services") {
                            trackServiceNavigationOpen();
                          }
                        }}
                      >
                        <summary aria-current={currentState(item.href, pathname, true)}>
                          <span>{item.label}</span>
                          <ChevronDown aria-hidden="true" size={21} strokeWidth={2} />
                        </summary>
                        <ul className="mobile-menu__subnav">
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
                                onClick={closeMenu}
                              >
                                <strong>{child.label}</strong>
                                {child.description ? (
                                  <span className="mobile-menu__service-description">
                                    {child.description.split("\n").map((line) => (
                                      <span key={line}>{line}</span>
                                    ))}
                                  </span>
                                ) : null}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <a
                        className="mobile-menu__nav-link"
                        href={item.href}
                        aria-current={currentState(item.href, pathname)}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mobile-menu__utility">
              <Link className="text-link" href="/emergency/" onClick={closeMenu}>
                <span>{labels.emergency}</span>
                <span className="text-link__arrow" aria-hidden="true">
                  {"\u2192"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
