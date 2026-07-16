"use client";

import {
  type CSSProperties,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type DefinitionTermProps = {
  label: string;
  slug: string;
  term: string;
  shortDefinition: string;
};

type DefinitionPlacement = {
  shiftX: number;
  side: "top" | "bottom";
};

export function DefinitionTerm({
  label,
  slug,
  term,
  shortDefinition,
}: DefinitionTermProps) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DefinitionPlacement>({ shiftX: 0, side: "top" });
  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const suppressNextFocusOpen = useRef(false);
  const generatedId = useId().replace(/:/g, "");
  const descriptionId = `definition-${slug}-${generatedId}`;

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
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
        const idealLeft = rootRect.left + rootRect.width / 2 - popoverRect.width / 2;
        const idealRight = idealLeft + popoverRect.width;
        let shiftX = 0;

        if (idealLeft < viewportPadding) shiftX = viewportPadding - idealLeft;
        if (idealRight > window.innerWidth - viewportPadding) {
          shiftX = window.innerWidth - viewportPadding - idealRight;
        }

        const side = rootRect.top < popoverRect.height + 24 ? "bottom" : "top";
        setPlacement((current) => (
          current.shiftX === shiftX && current.side === side
            ? current
            : { shiftX, side }
        ));
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

  const style = {
    "--definition-shift-x": `${placement.shiftX}px`,
  } as CSSProperties;

  const closeAndReturnFocus = () => {
    if (document.activeElement !== triggerRef.current) suppressNextFocusOpen.current = true;
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <span
      className="definition-term"
      data-open={open ? "true" : "false"}
      data-side={placement.side}
      onBlurCapture={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
      onFocusCapture={() => {
        if (suppressNextFocusOpen.current) {
          suppressNextFocusOpen.current = false;
          return;
        }
        setOpen(true);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          closeAndReturnFocus();
        }
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        if (!rootRef.current?.contains(document.activeElement)) setOpen(false);
      }}
      ref={rootRef}
      style={style}
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
      <span
        aria-hidden={!open}
        aria-label={`${term} definition`}
        className="definition-term__popover"
        id={descriptionId}
        ref={popoverRef}
        role="group"
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
    </span>
  );
}
