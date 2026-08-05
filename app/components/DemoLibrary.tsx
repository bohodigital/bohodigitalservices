"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { demoProjects, demoTierOptions, type DemoTier } from "../content/demoLibrary";

type DemoFilter = "all" | DemoTier;

type DemoLibraryProps = {
  compact?: boolean;
};

export function DemoLibrary({ compact = false }: DemoLibraryProps) {
  const [filter, setFilter] = useState<DemoFilter>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const visibleDemos = demoProjects.filter((demo) => filter === "all" || demo.tier === filter);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  const goTo = useCallback((nextIndex: number, behavior: ScrollBehavior = "smooth") => {
    const count = visibleDemos.length;
    if (!count) return;
    const wrappedIndex = (nextIndex + count) % count;
    const card = trackRef.current?.querySelectorAll<HTMLElement>("[data-demo-card]")[wrappedIndex];
    trackRef.current?.scrollTo({ left: card?.offsetLeft ?? 0, behavior });
    setActiveIndex(wrappedIndex);
  }, [visibleDemos.length]);

  useEffect(() => {
    if (isPaused || isInteracting || prefersReducedMotion || visibleDemos.length < 2) return;
    const timer = window.setTimeout(() => goTo(activeIndex + 1), 6500);
    return () => window.clearTimeout(timer);
  }, [activeIndex, goTo, isInteracting, isPaused, prefersReducedMotion, visibleDemos.length]);

  const selectFilter = (nextFilter: DemoFilter) => {
    setActiveIndex(0);
    setFilter(nextFilter);
  };

  const move = (direction: -1 | 1) => {
    goTo(activeIndex + direction);
  };

  const updateActiveIndex = () => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-demo-card]");
    if (!track || !card) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || "0");
    const nextIndex = Math.round(track.scrollLeft / (card.offsetWidth + gap));
    setActiveIndex(Math.max(0, Math.min(nextIndex, visibleDemos.length - 1)));
  };

  return (
    <div className={`demo-library${compact ? " demo-library--compact" : ""}`}>
      <div className="demo-library__toolbar">
        <div className="demo-library__filters" aria-label="Filter website demos by project level">
          {demoTierOptions.map((option) => (
            <button
              aria-pressed={filter === option.id}
              key={option.id}
              onClick={() => selectFilter(option.id)}
              type="button"
            >
              <span>{option.label}</span>
              <small>{option.count}</small>
            </button>
          ))}
        </div>
        <div className="demo-library__controls">
          <output aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / {String(visibleDemos.length).padStart(2, "0")}
          </output>
          <button aria-label="Previous demo" disabled={visibleDemos.length < 2} onClick={() => move(-1)} type="button">←</button>
          <button aria-label="Next demo" disabled={visibleDemos.length < 2} onClick={() => move(1)} type="button">→</button>
          <button
            aria-label={isPaused ? "Resume automatic demo rotation" : "Pause automatic demo rotation"}
            aria-pressed={isPaused}
            className="demo-library__pause"
            onClick={() => setIsPaused((current) => !current)}
            type="button"
          >{isPaused ? "▶" : "Ⅱ"}</button>
        </div>
      </div>

      <div
        aria-label="Boho Digital website demo carousel"
        aria-roledescription="carousel"
        className="demo-library__track"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsInteracting(false);
        }}
        onFocus={() => setIsInteracting(true)}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onScroll={updateActiveIndex}
        key={filter}
        ref={trackRef}
        tabIndex={0}
      >
        {visibleDemos.map((demo, index) => (
          <article
            aria-label={`${index + 1} of ${visibleDemos.length}: ${demo.name}`}
            aria-roledescription="slide"
            className="demo-library__card"
            data-demo-card
            key={demo.id}
          >
            <a
              className="demo-library__preview"
              data-analytics-destination-type="live_demo"
              data-analytics-event="work_demo_click"
              data-analytics-project-name={demo.name}
              href={demo.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="demo-library__browser-bar" aria-hidden="true">
                <i /><i /><i />
                <b>{new URL(demo.href).hostname}</b>
              </span>
              <span className="demo-library__homepage-frame">
                <img alt={demo.alt} height={demo.imageHeight} loading={index === 0 ? "eager" : "lazy"} src={demo.image} width="960" />
              </span>
              <span className="demo-library__preview-label">Full homepage preview · scroll to explore</span>
            </a>
            <aside className="demo-library__card-body demo-library__notes" aria-label={`Boho's notes about ${demo.name}`}>
              <div className="demo-library__notes-header">
                <span>Boho&apos;s notes</span>
              </div>
              <div>
                <p className="demo-library__slide-label">Demo {String(index + 1).padStart(2, "0")} · {demo.tierLabel}</p>
                <p className="reset-eyebrow">{demo.businessType}</p>
                <h3>{demo.name}</h3>
                <p>{demo.summary}</p>
              </div>
              <ul>{demo.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <div className="demo-library__actions">
                <a
                  data-analytics-destination-type="live_demo"
                  data-analytics-event="work_demo_click"
                  data-analytics-project-name={demo.name}
                  href={demo.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >Visit the full live demo ↗</a>
                <Link href="/start/">Start a similar project</Link>
              </div>
            </aside>
          </article>
        ))}
      </div>

      {visibleDemos.length > 1 ? (
        <div className="demo-library__dots" aria-label="Choose a website demo">
          {visibleDemos.map((demo, index) => (
            <button
              aria-label={`Show ${demo.name}`}
              aria-pressed={activeIndex === index}
              key={demo.id}
              onClick={() => goTo(index)}
              type="button"
            ><span /></button>
          ))}
        </div>
      ) : null}

      {!compact ? (
        <div className="demo-library__levels" aria-label="Website project levels">
          <article>
            <span>01</span>
            <h3>$850 brochure sites</h3>
            <p>Focused, polished sites for straightforward local businesses that need to explain the offer and make the next step obvious.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Expanded sites</h3>
            <p>Deeper service, location, project, and educational content for businesses with more search opportunities and customer paths.</p>
          </article>
          <article>
            <span>03</span>
            <h3>High-end sites</h3>
            <p>Multi-location experiences with custom discovery tools, scheduling concepts, portals, business-system integrations, and LLM assistants.</p>
          </article>
        </div>
      ) : null}
    </div>
  );
}
