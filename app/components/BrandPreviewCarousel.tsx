"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, FlaskConical } from "lucide-react";
import { useState } from "react";

import { inHouseBrands, type InHouseBrand } from "../content/inHouseBrands";

export function BrandPreviewFrame({ brand }: { brand: InHouseBrand }) {
  return (
    <div className={`brand-preview-frame brand-preview-frame--${brand.accent}`}>
      <div className="brand-preview-frame__bar" aria-hidden="true">
        <span className="brand-preview-frame__lights"><i /><i /><i /></span>
        <span className="brand-preview-frame__address">{brand.displayUrl}</span>
        <span className="brand-preview-frame__live">Live</span>
      </div>
      <div className="brand-preview-frame__viewport">
        <iframe
          aria-hidden="true"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-same-origin allow-scripts"
          src={brand.url}
          tabIndex={-1}
          title={`${brand.name} live website preview`}
        />
        <div className="brand-preview-frame__guard" aria-hidden="true">
          <span>Live, non-interactive preview</span>
        </div>
      </div>
    </div>
  );
}

export function BrandPreviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBrand = inHouseBrands[activeIndex];

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) =>
      (current + direction + inHouseBrands.length) % inHouseBrands.length,
    );
  };

  return (
    <section className="brand-carousel" aria-labelledby="brand-carousel-title">
      <div className="brand-carousel__heading">
        <div>
          <span className="brand-carousel__eyebrow">
            <FlaskConical size={16} strokeWidth={1.8} aria-hidden="true" />
            In-house brands
          </span>
          <h3 id="brand-carousel-title">Working sites, not invented case studies.</h3>
        </div>
        <div className="brand-carousel__controls" aria-label="Choose an in-house brand preview">
          <button type="button" onClick={() => move(-1)} aria-label="Show previous brand">
            <ArrowLeft size={19} aria-hidden="true" />
          </button>
          <span aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / {String(inHouseBrands.length).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => move(1)} aria-label="Show next brand">
            <ArrowRight size={19} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        aria-live="polite"
        className="brand-carousel__stage"
        id="brand-preview-panel"
        role="tabpanel"
      >
        <BrandPreviewFrame key={activeBrand.id} brand={activeBrand} />
        <div className="brand-carousel__caption">
          <div>
            <span>{activeBrand.displayUrl}</span>
            <h4>{activeBrand.name}</h4>
            <p>{activeBrand.role}</p>
          </div>
          <Link href={`/lab/in-house-brands/#${activeBrand.id}`}>
            Open the Lab file
          </Link>
        </div>
      </div>

      <div className="brand-carousel__tabs" role="tablist" aria-label="In-house brands">
        {inHouseBrands.map((brand, index) => (
          <button
            aria-controls="brand-preview-panel"
            aria-selected={index === activeIndex}
            className={index === activeIndex ? "is-active" : undefined}
            key={brand.id}
            onClick={() => setActiveIndex(index)}
            role="tab"
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {brand.name}
          </button>
        ))}
      </div>
    </section>
  );
}
