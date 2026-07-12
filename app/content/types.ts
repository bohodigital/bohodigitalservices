export type InteriorTheme = "cinematic" | "editorial" | "research" | "mosaic";

export type ContentItem = {
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
  status?: "In progress" | "Example format" | "Public experiment" | "Draft";
};

export type ContentSection = {
  id?: string;
  eyebrow?: string;
  title: string;
  body?: string[];
  quote?: string;
  note?: string;
  items?: ContentItem[];
  layout?: "grid" | "steps" | "split" | "list";
  tone?: "ivory" | "parchment" | "dark" | "verdigris" | "plum" | "blue";
};

export type DraftField = {
  name: string;
  label: string;
  type: "text" | "email" | "url" | "textarea" | "select" | "checkbox";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  hint?: string;
};

export type DraftFormConfig = {
  title: string;
  body: string;
  submitLabel: string;
  fields: DraftField[];
  privacyNote: string;
  consent?: string;
};

export type PageConfig = {
  pageKind?: "standard" | "glossary" | "tools";
  slug: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  intro: string[];
  theme: InteriorTheme;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  sections: ContentSection[];
  form?: DraftFormConfig;
  noIndex?: boolean;
  draftLabel?: string;
};
