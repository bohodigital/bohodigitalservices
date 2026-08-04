"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import Link from "next/link";
import { demoProjects, demoTierOptions, type DemoTier } from "../content/demoLibrary";

type DemoFilter = "all" | DemoTier;

export function DemoLibrary() {
  const [filter, setFilter] = useState<DemoFilter>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const visibleDemos = demoProjects.filter((demo) => filter === "all" || demo.tier === filter);

  const selectFilter = (nextFilter: DemoFilter) => {
    setFilter(nextFilter);
    setActiveIndex(0);
    trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-demo-card]");
    if (!track || !card) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || "0");
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
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
    <div className="demo-library">
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
          <button aria-label="Previous demo" disabled={activeIndex === 0} onClick={() => move(-1)} type="button">←</button>
          <button aria-label="Next demo" disabled={activeIndex === visibleDemos.length - 1} onClick={() => move(1)} type="button">→</button>
        </div>
      </div>

      <div
        className="demo-library__track"
        onScroll={updateActiveIndex}
        ref={trackRef}
        tabIndex={0}
      >
        {visibleDemos.map((demo) => (
          <article className="demo-library__card" data-demo-card key={demo.id}>
            <a
              className="demo-library__preview"
              data-analytics-destination-type="live_demo"
              data-analytics-event="work_demo_click"
              data-analytics-project-name={demo.name}
              href={demo.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img alt={demo.alt} height="630" loading="lazy" src={demo.image} width="1200" />
              <span>Open live demo ↗</span>
            </a>
            <div className="demo-library__card-body">
              <div>
                <p className="reset-eyebrow">{demo.tierLabel} · {demo.businessType}</p>
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
                >Explore this demo ↗</a>
                <Link href="/start/">Build something like this</Link>
              </div>
            </div>
          </article>
        ))}
      </div>

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
    </div>
  );
}
