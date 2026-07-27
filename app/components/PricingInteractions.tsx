"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type PricingSectionLink = {
  id: string;
  label: string;
  path?: "clarity" | "build_repair" | "ongoing";
};

type PricingEventProperties = Record<string, string>;

function trackPricingEvent(
  eventName: string,
  properties: PricingEventProperties,
) {
  try {
    const analyticsWindow = window as unknown as {
      umami?: {
        track(
          event: string,
          properties?: PricingEventProperties,
        ): void;
      };
    };
    analyticsWindow.umami?.track(eventName, properties);
  } catch {
    // Pricing analytics are non-sensitive, value-free, and best-effort.
  }
}

export function PricingSectionNav({
  links,
}: {
  links: ReadonlyArray<PricingSectionLink>;
}) {
  const [activeId, setActiveId] = useState(links[0]?.id ?? "");

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(({ isIntersecting }) => isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-24% 0px -62% 0px",
        threshold: [0, 0.15, 0.5],
      },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  return (
    <nav aria-label="Pricing sections">
      <div>
        {links.map((link) => (
          <a
            aria-current={activeId === link.id ? "location" : undefined}
            data-active={activeId === link.id ? "true" : "false"}
            data-umami-event={link.path ? "pricing_path_select" : undefined}
            data-umami-event-path={link.path}
            data-umami-event-source="sticky_nav"
            href={`#${link.id}`}
            key={link.id}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function PricingOfferTracker({
  children,
  className,
  offerId,
  chapter,
  price,
  billingType,
}: {
  children: ReactNode;
  className: string;
  offerId: string;
  chapter: string;
  price: string;
  billingType: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let timer: number | null = null;
    let recorded = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (recorded) return;
        if (entry?.isIntersecting && entry.intersectionRatio >= 0.55) {
          if (timer === null) {
            timer = window.setTimeout(() => {
              recorded = true;
              trackPricingEvent("pricing_offer_view", {
                offer_id: offerId,
                chapter,
                price,
                billing_type: billingType,
              });
              observer.disconnect();
            }, 800);
          }
        } else if (timer !== null) {
          window.clearTimeout(timer);
          timer = null;
        }
      },
      { threshold: [0, 0.55, 1] },
    );
    observer.observe(element);
    return () => {
      if (timer !== null) window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [billingType, chapter, offerId, price]);

  return (
    <article id={offerId} className={className} data-pricing-offer={offerId} ref={ref}>
      {children}
    </article>
  );
}
