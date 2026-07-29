import type { ServiceAsset } from "../../content/serviceAssets";

export function ServiceVisualFigure({
  asset,
  className = "",
  priority = false,
  captionPrefix,
}: {
  asset: ServiceAsset;
  className?: string;
  priority?: boolean;
  captionPrefix?: string;
}) {
  return (
    <figure
      className={`service-asset-figure ${className}`.trim()}
      data-service-asset-id={asset.id}
      data-service-visual-job={asset.role === "proof" ? "PROVE" : asset.role === "hero" ? "ORIENT" : "DIFFERENTIATE"}
    >
      <div className="service-asset-figure__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={asset.alt}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
          height={asset.height}
          loading={priority ? "eager" : "lazy"}
          sizes={priority ? "(max-width: 72rem) 100vw, 52vw" : "(max-width: 54rem) 100vw, 46vw"}
          src={asset.src}
          width={asset.width}
        />
      </div>
      {asset.caption ? (
        <figcaption>
          {captionPrefix ? <strong>{captionPrefix}</strong> : null}
          <span>{asset.caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
