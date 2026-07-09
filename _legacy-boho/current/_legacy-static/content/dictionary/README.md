# Owl Dictionary Governance

The Owl Dictionary is a maintained content product, not a loose pile of tooltips.

## Source of truth

- Keep short definitions in `assets/js/owl-dictionary-data.js`.
- Keep full dictionary entry pages in `ask-the-owl/dictionary/<slug>/index.html`.
- If a term is highlighted inline, it should have one source definition and one canonical full-entry URL.

## How to add a term

1. Add the term object to `assets/js/owl-dictionary-data.js`.
2. Use a stable kebab-case `slug`.
3. Add useful aliases when the phrase appears in multiple forms.
4. Set `tone` to `owl` for educational terms or `fox` for red-flag terms.
5. Add `fullEntryUrl` when the term is highlighted inline or promoted on the site.
6. Create a full entry page when the term needs a popover link or deserves its own URL.

## Full entry checklist

Each published dictionary page should include:

- a unique title
- a unique meta description
- a short definition
- a plain-English explanation
- why it matters
- one concrete example, mistake, or warning
- related terms or a related service

Do not publish thin, mass-generated pages.

## How to use glossary terms in page copy

- Use `<button class="glossary-term" data-glossary="slug">Visible term</button>`.
- Highlight the first meaningful mention only in most pages.
- Keep highlighted terms out of nav, headings, buttons, legal boilerplate, and form labels.
- Never wrap glossary terms inside another clickable link.

## When not to highlight

- Do not highlight common words just because they exist in the dictionary.
- Do not highlight the same term repeatedly on short pages.
- Do not turn service copy into tooltip clutter.
- Do not add fox-tone warnings unless the term actually signals risk.

## Tone rules

- Plain-English first.
- Forest metaphor second.
- Technical detail third.
- No fake certainty.
- No keyword stuffing.

## Accessibility rules

- Hover cannot be the only path.
- Keyboard focus must expose the definition.
- Escape must close the open popover.
- Mobile tap must work.
- Popover content must exist in the DOM, not only in CSS pseudo-elements.

## SEO rules

- Dictionary pages should help people first.
- Use canonical URLs and unique metadata.
- Link full entries back into relevant services or Ask the Owl routes.
- Avoid creating glossary pages for terms that do not need explanation.

