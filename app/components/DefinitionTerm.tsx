"use client";

import { useEffect, useId, useRef, useState } from "react";

type DefinitionTermProps = {
  label: string;
  slug: string;
  term: string;
  shortDefinition: string;
};

export function DefinitionTerm({
  label,
  slug,
  term,
  shortDefinition,
}: DefinitionTermProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
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

  return (
    <span
      className="definition-term"
      data-open={open ? "true" : "false"}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
      ref={rootRef}
    >
      <button
        aria-controls={descriptionId}
        aria-expanded={open}
        className="definition-term__trigger"
        onBlur={(event) => {
          if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
            setOpen(false);
          }
        }}
        onClick={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        ref={triggerRef}
        type="button"
      >
        {label}
        <span aria-hidden="true" className="definition-term__mark">
          ?
        </span>
      </button>
      <span
        className="definition-term__popover"
        id={descriptionId}
        role="group"
        aria-label={`${term} definition`}
      >
        <strong>{term}</strong>
        <span>{shortDefinition}</span>
        <a href={`/learn/glossary/#term-${slug}`}>Read the full definition</a>
      </span>
    </span>
  );
}
