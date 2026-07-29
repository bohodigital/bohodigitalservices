import type { CSSProperties, ReactNode } from "react";

export function ResponsiveDiagramViewport({
  children,
  label,
  minimumWidth = "54rem",
}: {
  children: ReactNode;
  label: string;
  minimumWidth?: string;
}) {
  return (
    <div
      aria-label={label}
      className="responsive-diagram-viewport"
      style={{ "--diagram-min-width": minimumWidth } as CSSProperties}
      tabIndex={0}
    >
      <div className="responsive-diagram-viewport__canvas">{children}</div>
    </div>
  );
}
