"use client";

import {
  type CSSProperties,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type DefinitionTermProps = {
  label: string;
  slug: string;
  term: string;
  shortDefinition: string;
};

type DefinitionPlacement = {
  anchorX: number;
  left: number;
  ready: boolean;
  side: "top" | "bottom";
  top: number;
};

const initialPlacement: DefinitionPlacement = {
  anchorX: 0,
  left: -9999,
  ready: false,
  side: "top",
  top: -9999,
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function DefinitionTerm({
  label,
  slug,
  term,
  shortDefinition,
}: DefinitionTermProps) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DefinitionPlacement>(initialPlacement);
  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const suppressNextFocusOpen = useRef(false);
  const generatedId = useId().replace(/:/g, "");
  const descriptionId = `definition-${slug}-${generatedId}`;

  const clearScheduledClose = () => {
    if (closeTimerRef.current === null) return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const containsInteractiveTarget = (target: EventTarget | null) => {
    if (!(target instanceof Node)) return false;
    return Boolean(
      rootRef.current?.contains(target) || popoverRef.current?.contains(target),
    );
  };

  const scheduleClose = () => {
    clearScheduledClose();
    closeTimerRef.current = window.setTimeout(() => {
      if (!containsInteractiveTarget(document.activeElement)) setOpen(false);
      closeTimerRef.current = null;
    }, 140);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containsInteractiveTarget(event.target)) setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;

    let frame = 0;
    const positionPopover = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = rootRef.current;
        const popover = popoverRef.current;
        if (!root || !popover) return;

        const rootRect = root.getBoundingClientRect();
        const popoverRect = popover.getBoundingClientRect();
        const viewportPadding = 16;
        const gap = 16;
        const maximumLeft = Math.max(
          viewportPadding,
          window.innerWidth - viewportPadding - popoverRect.width,
        );
        const left = clamp(
          rootRect.left + rootRect.width / 2 - popoverRect.width / 2,
          viewportPadding,
          maximumLeft,
        );
        const roomAbove = rootRect.top - viewportPadding - gap;
        const roomBelow = window.innerHeight - rootRect.bottom - viewportPadding - gap;
        const side = roomAbove >= popoverRect.height || roomAbove >= roomBelow
          ? "top"
          : "bottom";
        const idealTop = side === "top"
          ? rootRect.top - popoverRect.height - gap
          : rootRect.bottom + gap;
        const maximumTop = Math.max(
          viewportPadding,
          window.innerHeight - viewportPadding - popoverRect.height,
        );
        const top = clamp(idealTop, viewportPadding, maximumTop);
        const anchorX = clamp(
          rootRect.left + rootRect.width / 2 - left,
          20,
          Math.max(20, popoverRect.width - 20),
        );

        setPlacement({ anchorX, left, ready: true, side, top });
      });
    };

    positionPopover();
    window.addEventListener("resize", positionPopover);
    window.addEventListener("scroll", positionPopover, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", positionPopover);
      window.removeEventListener("scroll", positionPopover, true);
    };
  }, [open]);

  const popoverStyle = {
    "--definition-anchor-x": `${placement.anchorX}px`,
    "--definition-left": `${placement.left}px`,
    "--definition-top": `${placement.top}px`,
  } as CSSProperties;

  const closeAndReturnFocus = () => {
    clearScheduledClose();
    if (document.activeElement !== triggerRef.current) suppressNextFocusOpen.current = true;
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleEscape = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") closeAndReturnFocus();
  };

  const popover = (
    <span
      aria-hidden={!open}
      aria-label={`${term} definition`}
      className={`definition-term__popover${open ? " definition-term__popover--open" : ""}`}
      data-ready={placement.ready ? "true" : "false"}
      data-side={placement.side}
      id={descriptionId}
      onBlurCapture={(event) => {
        if (!containsInteractiveTarget(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={handleEscape}
      onMouseEnter={clearScheduledClose}
      onMouseLeave={scheduleClose}
      ref={popoverRef}
      role="group"
      style={popoverStyle}
    >
      <span aria-hidden="true" className="definition-term__ornament">
        <i />
        <i />
        <i />
        <i />
      </span>
      <button
        aria-label={`Close ${term} definition`}
        className="definition-term__close"
        onClick={closeAndReturnFocus}
        tabIndex={open ? 0 : -1}
        type="button"
      >
        ×
      </button>
      <span className="definition-term__heading">
        <span aria-hidden="true" className="definition-term__badge">?</span>
        <strong>{term}</strong>
      </span>
      <span className="definition-term__definition">{shortDefinition}</span>
      <a href={`/learn/glossary/#term-${slug}`} tabIndex={open ? 0 : -1}>
        <span>Read the full definition</span>
        <span aria-hidden="true">↗</span>
      </a>
    </span>
  );

  return (
    <span
      className="definition-term"
      data-open={open ? "true" : "false"}
      onBlurCapture={(event) => {
        if (!containsInteractiveTarget(event.relatedTarget)) setOpen(false);
      }}
      onFocusCapture={() => {
        if (suppressNextFocusOpen.current) {
          suppressNextFocusOpen.current = false;
          return;
        }
        setOpen(true);
      }}
      onKeyDown={handleEscape}
      onMouseEnter={() => {
        clearScheduledClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      ref={rootRef}
    >
      <button
        aria-controls={descriptionId}
        aria-expanded={open}
        className="definition-term__trigger"
        onClick={() => setOpen(true)}
        ref={triggerRef}
        type="button"
      >
        {label}
        <span aria-hidden="true" className="definition-term__mark">?</span>
      </button>
      {open && typeof document !== "undefined" ? createPortal(popover, document.body) : popover}
    </span>
  );
}
