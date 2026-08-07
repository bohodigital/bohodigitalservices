import Image from "next/image";

import styles from "./EvidencePlate.module.css";

export type EvidencePlateId =
  | "analytics-workspace"
  | "gsc-opportunity"
  | "provider-rescue-control-map"
  | "owned-demo-mosaic"
  | "custom-systems-workbench"
  | "measurement-ledger"
  | "customer-paths"
  | "proposal-anatomy";

type EvidencePlateRecord = {
  eyebrow: string;
  title: string;
  description: string;
  alt: string;
  disclosure: string;
};

const evidencePlates: Record<EvidencePlateId, EvidencePlateRecord> = {
  "analytics-workspace": {
    eyebrow: "Boho Analytics in practice",
    title: "One workspace. Separate evidence.",
    description:
      "Search visibility, website traffic, durable form records, and site structure can be reviewed together without pretending they are the same metric.",
    alt: "Editorial mosaic of three real Boho software screens showing the Analytics command center, Plot Builder, and Site Graph, all using synthetic demonstration data.",
    disclosure: "Actual Boho interfaces · Synthetic demonstration data · No client results",
  },
  "gsc-opportunity": {
    eyebrow: "How an SEO opportunity is found",
    title: "Visibility is rising. The click is not.",
    description:
      "Property-level trends reveal the symptom. Query and landing-page evidence identifies which title, page, link path, or offer deserves human review.",
    alt: "Two aligned trend charts show synthetic weekly search impressions rising while click-through rate falls, beside a five-row query and landing-page decision ledger.",
    disclosure: "Synthetic educational example · Not Boho or client performance · Not a forecast",
  },
  "provider-rescue-control-map": {
    eyebrow: "Provider Rescue control map",
    title: "Move the website without losing the business.",
    description:
      "A responsible rescue maps control of the domain, DNS, hosting, source, forms, and analytics before anyone starts moving files or changing records.",
    alt: "Website dependency map connecting domain, DNS, hosting, source, forms, and analytics with example control states and a five-step safe move order.",
    disclosure: "Illustrative control map · Every real rescue begins with a current inventory",
  },
  "owned-demo-mosaic": {
    eyebrow: "Boho-owned design proof",
    title: "Different businesses. Different websites.",
    description:
      "The demo library shows how visual identity, information hierarchy, and customer action change across business models without forcing every client into one house template.",
    alt: "Mosaic of four Boho-owned demonstration website designs for junk removal, a neighborhood cafe, landscaping, and a multi-location dental group.",
    disclosure: "Boho-owned fictional demonstrations · Not client work · No claimed results",
  },
  "custom-systems-workbench": {
    eyebrow: "Actual Boho-built interfaces",
    title: "We build the tools behind the work.",
    description:
      "Analytics, guarded transfer workflows, and revision-pinned site maps demonstrate the bounded interfaces and inspectable outputs behind Boho's technical work.",
    alt: "Dark editorial workbench combining actual Boho Analytics, Secret Broker, and Site Graph interfaces.",
    disclosure: "Real interfaces · Analytics and graph screens contain synthetic demo evidence",
  },
  "measurement-ledger": {
    eyebrow: "Source-labeled measurement",
    title: "Different sources answer different questions.",
    description:
      "Search Console, GA4, self-hosted Umami, and durable form records each observe a different part of the customer path. Their numbers should not be silently blended.",
    alt: "Four-row measurement ledger explaining what Search Console, GA4, Umami, and form-delivery evidence each observe and what decisions they can support.",
    disclosure: "Public architecture explanation · Provider counts retain their own meanings",
  },
  "customer-paths": {
    eyebrow: "Customer-path planning",
    title: "One website. Five kinds of next step.",
    description:
      "Every useful path must help a visitor discover, understand, and trust the business. The valuable next action depends on whether the business needs estimates, bookings, visits, purchases, or serious conversations.",
    alt: "Customer-path diagram showing a shared Discover, Understand, and Trust sequence branching to Estimate, Book, Visit, Buy, or Discuss.",
    disclosure: "Planning model · Not recorded visitor behavior",
  },
  "proposal-anatomy": {
    eyebrow: "Website buyer guidance",
    title: "A proposal should tell you who owns what.",
    description:
      "Before approving a website project, verify the scope, content responsibility, ownership, forms, analytics, migration plan, operating costs, and handoff—not only the homepage design.",
    alt: "Website proposal review ledger listing scope, content, domain, hosting, forms, analytics, migration, and handoff requirements with corresponding warning signs.",
    disclosure: "Buyer guidance · Not legal advice · Contract terms vary",
  },
};

export function EvidencePlate({ id }: { id: EvidencePlateId }) {
  const plate = evidencePlates[id];
  const titleId = `evidence-${id}-title`;
  const src = `/visuals/evidence-plates/${id}.webp`;

  return (
    <section
      aria-labelledby={titleId}
      className={`${styles.section} ${styles[id]}`}
      data-evidence-plate={id}
      id={`evidence-${id}`}
    >
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{plate.eyebrow}</p>
            <h2 id={titleId}>{plate.title}</h2>
          </div>
          <p className={styles.description}>{plate.description}</p>
        </header>

        <figure className={styles.figure}>
          <a
            aria-label={`Open “${plate.title}” at full size in a new tab`}
            className={styles.frame}
            href={src}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt={plate.alt}
              height={1000}
              sizes="(max-width: 720px) 94vw, (max-width: 1280px) 92vw, 1200px"
              src={src}
              unoptimized
              width={1600}
            />
          </a>
          <figcaption>
            <span>Boho evidence plate</span>
            <span className={styles.disclosure}>{plate.disclosure}</span>
            <span className={styles.fullSizeHint}>Open full-size plate ↗</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
