"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type LocalHref = "/" | `/${string}` | `#${string}`;

type NavigationItem = {
  label: string;
  href: LocalHref;
};

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
}: {
  navigation: ReadonlyArray<NavigationItem>;
}) {
  const [open, setOpen] = useState(false);
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const panelId = `mobile-menu-${reactId}`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
          aria-label="Site navigation"
          aria-modal="true"
        >
          <div className="mobile-menu__panel-inner">
            <Link
              className="button-link button-link--primary mobile-menu__primary-cta"
              href="/start/"
              onClick={closeMenu}
            >
              <span className="button-link__label">Get a Visibility Check</span>
              <span className="button-link__arrow" aria-hidden="true">
                {"\u2192"}
              </span>
            </Link>

            <nav aria-label="Mobile navigation">
              <ul className="mobile-menu__nav-list">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      className="mobile-menu__nav-link"
                      href={item.href}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mobile-menu__utility" aria-label="Help and contact">
              <Link className="text-link" href="/contact/" onClick={closeMenu}>
                <span>Contact</span>
                <span className="text-link__arrow" aria-hidden="true">
                  {"\u2192"}
                </span>
              </Link>
              <Link className="text-link" href="/emergency/" onClick={closeMenu}>
                <span>Emergency Help</span>
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
