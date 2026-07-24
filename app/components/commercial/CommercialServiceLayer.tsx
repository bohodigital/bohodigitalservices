import {
  commercialSection,
  commercialSharedSection,
} from "../../content/commercial/presentation";

const routeLayers = {
  "/services/ongoing-seo/": ["service-local-visibility", "local-visibility-lead-systems"],
  "/services/web-design-redesign/": ["service-websites-hosting", "websites-managed-hosting"],
  "/services/provider-rescue/": ["service-provider-rescue", "provider-rescue-migration"],
  "/services/custom-digital-solutions/": ["service-custom-tools", "custom-tools-automation"],
  "/services/research-audits-strategy/": ["service-research-analytics", "research-analytics-improvement"],
} as const;

type CommercialServiceRoute = keyof typeof routeLayers;

function valuesBetween(
  records: ReturnType<typeof commercialSection>["records"],
  startField: string,
  endField?: string,
) {
  const start = records.findIndex(({ field }) => field === startField);
  const end = endField
    ? records.findIndex(({ field }, index) => index > start && field === endField)
    : records.length;
  return records
    .slice(start + 1, end < 0 ? records.length : end)
    .filter(({ field }) => field === "value")
    .map(({ exactValue }) => exactValue);
}

export function isCommercialServiceRoute(
  route: string,
): route is CommercialServiceRoute {
  return route in routeLayers;
}

export function CommercialServiceLayer({
  route,
}: {
  route: CommercialServiceRoute;
}) {
  const [pageKey, sectionKey] = routeLayers[route];
  const layer = commercialSection(pageKey, sectionKey, "035");
  const shared = commercialSharedSection("shared-section-labels");
  const labels = shared.many("value");
  const prices = [
    layer.one("Starting-price copy"),
    ...valuesBetween(layer.records, "Starting-price copy", "Planning-range copy"),
  ];
  const timelines = [
    layer.one("Planning-range copy"),
    ...valuesBetween(layer.records, "Planning-range copy", "Fit bullets"),
  ];
  const fits = [
    layer.one("Fit bullets"),
    ...valuesBetween(layer.records, "Fit bullets", "Start-elsewhere bullets"),
  ];
  const elsewhere = [
    layer.one("Start-elsewhere bullets"),
    ...valuesBetween(layer.records, "Start-elsewhere bullets", "Usually-included bullets"),
  ];
  const included = [
    layer.one("Usually-included bullets"),
    ...valuesBetween(
      layer.records,
      "Usually-included bullets",
      layer.optional("May-be-added bullets") ? "May-be-added bullets" : "Not-included bullets",
    ),
  ];
  const mayBeAdded = layer.optional("May-be-added bullets")
    ? [
        layer.one("May-be-added bullets"),
        ...valuesBetween(layer.records, "May-be-added bullets", "Not-included bullets"),
      ]
    : [];
  const notIncluded = [
    layer.one("Not-included bullets"),
    ...valuesBetween(layer.records, "Not-included bullets", "Secondary CTA"),
  ];
  const limitation = [
    "Results limitation",
    "Hosting qualification",
    "Authority limitation",
    "Discovery limitation",
    "Audit limitation",
  ].map((field) => layer.optional(field)).find(Boolean);
  const start = commercialSection("homepage", "1-hero");

  return (
    <section className="commercial-service-layer" aria-labelledby="commercial-service-title">
      <div className="section-shell">
        <header className="commercial-service-layer__hero">
          <div>
            <p className="eyebrow">{layer.one("Eyebrow")}</p>
            <h1 id="commercial-service-title">{layer.one("Headline")}</h1>
            <p>{layer.one("Introduction")}</p>
          </div>
          <div className="commercial-service-layer__actions">
            <a className="button-link button-link--primary" data-umami-event="commercial_primary_cta" href={start.one("Primary destination")}>{shared.one("Shared primary CTA")}</a>
            <a className="button-link button-link--secondary" data-umami-event="commercial_pricing_cta" href={layer.one("Secondary destination")}>{layer.one("Secondary CTA")}</a>
          </div>
        </header>

        <div className="commercial-service-layer__decision">
          <article>
            <h2>{shared.one("Use exactly")}</h2>
            {prices.map((price) => <strong key={price}>{price}</strong>)}
            <p>{shared.one("Shared price qualification")}</p>
          </article>
          <article>
            <h2>{labels[0]}</h2>
            <ul>{timelines.map((timeline) => <li key={timeline}>{timeline}</li>)}</ul>
            <p>{shared.one("Shared timeline qualification")}</p>
          </article>
          <article>
            <h2>{labels[1]}</h2>
            <p>{shared.one("Shared first-step explanation")}</p>
          </article>
        </div>

        <div className="commercial-service-layer__boundaries">
          <article><h2>{labels[2]}</h2><ul>{fits.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article><h2>{labels[3]}</h2><ul>{elsewhere.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article><h2>{labels[4]}</h2><ul>{included.map((item) => <li key={item}>{item}</li>)}</ul></article>
          {mayBeAdded.length ? <article><h2>{labels[5]}</h2><ul>{mayBeAdded.map((item) => <li key={item}>{item}</li>)}</ul></article> : null}
          <article><h2>{labels[6]}</h2><ul>{notIncluded.map((item) => <li key={item}>{item}</li>)}</ul></article>
        </div>
        {limitation ? <p className="commercial-service-layer__limitation">{limitation}</p> : null}
      </div>
    </section>
  );
}
