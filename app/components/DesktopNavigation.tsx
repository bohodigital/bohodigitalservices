"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import type { PrimaryNavigationItem } from "../content/navigation";

export function DesktopNavigation({
  navigation,
}: {
  navigation: ReadonlyArray<PrimaryNavigationItem>;
}) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const dropdownToggleRef = useRef<HTMLButtonElement>(null);
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenLabel(null);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && openLabel) {
        setOpenLabel(null);
        requestAnimationFrame(() => dropdownToggleRef.current?.focus());
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
      aria-label="Primary navigation"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpenLabel(null);
      }}
    >
      <ul className="site-header__nav-list">
        {navigation.map((item) => {
          if (!item.children?.length) {
            return (
              <li key={item.href}>
                <a className="site-header__nav-link" href={item.href}>
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
                <a className="site-header__nav-link" href={item.href}>
                  {item.label}
                </a>
                <button
                  ref={dropdownToggleRef}
                  type="button"
                  className="site-header__dropdown-toggle"
                  aria-expanded={open}
                  aria-controls={menuId}
                  aria-label={`${open ? "Close" : "Open"} ${item.label} menu`}
                  onClick={() => setOpenLabel(open ? null : item.label)}
                >
                  <ChevronDown aria-hidden="true" size={16} strokeWidth={2.2} />
                </button>
              </div>

              {open ? (
                <div className="site-header__dropdown" id={menuId}>
                  <p className="site-header__dropdown-eyebrow">Browse Resources</p>
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a href={child.href} onClick={() => setOpenLabel(null)}>
                          <strong>{child.label}</strong>
                          {child.description ? <span>{child.description}</span> : null}
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
