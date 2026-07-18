"use client";

import Link, { type LinkProps } from "next/link";
import type {
  AnchorHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

export const INDUSTRY_ANALYTICS_EVENTS = [
  "industry_selector_click",
  "industry_page_click",
  "industry_pricing_click",
  "industry_evidence_click",
  "industry_review_start",
  "industry_review_complete",
] as const;

export type IndustryAnalyticsEvent =
  (typeof INDUSTRY_ANALYTICS_EVENTS)[number];

export const INDUSTRY_BUSINESS_MODELS = [
  "project-business",
  "local-service",
  "retail-hospitality",
  "ecommerce",
  "professional-b2b",
  "hybrid",
] as const;

export type IndustryBusinessModel =
  (typeof INDUSTRY_BUSINESS_MODELS)[number];

export type IndustryAnalyticsAttributes = Readonly<{
  business_model?: IndustryBusinessModel;
  source_section?: string;
  destination_type?: string;
  cta_label?: string;
}>;

type AnchorProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "href"
>;

export type IndustryTrackedLinkProps = LinkProps &
  AnchorProps & {
    children: ReactNode;
    event: IndustryAnalyticsEvent;
    analytics?: IndustryAnalyticsAttributes;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  };

/**
 * Emits only the approved Industries event name and the four approved,
 * non-personal dimensions. Umami's existing click listener reads these data
 * attributes; this component does not add another analytics transport.
 */
export function IndustryTrackedLink({
  event,
  analytics,
  children,
  ...linkProps
}: IndustryTrackedLinkProps) {
  return (
    <Link
      {...linkProps}
      data-umami-event={event}
      data-umami-event-business_model={analytics?.business_model}
      data-umami-event-source_section={analytics?.source_section}
      data-umami-event-destination_type={analytics?.destination_type}
      data-umami-event-cta_label={analytics?.cta_label}
    >
      {children}
    </Link>
  );
}

export default IndustryTrackedLink;
