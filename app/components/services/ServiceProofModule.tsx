import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

import type {
  OwnedWebsiteProfile,
  SelectedToolProfile,
} from "../../content/systems";

function ExternalRepositoryLink({
  href,
  children,
}: {
  href: `https://${string}`;
  children: ReactNode;
}) {
  return (
    <a href={href} rel="noopener noreferrer" target="_blank">
      {children}
      <ExternalLink aria-hidden="true" size={14} />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function ToolProofCard({
  tool,
  exampleData,
}: {
  tool: SelectedToolProfile;
  exampleData: boolean;
}) {
  return (
    <article className="service-proof-card" data-service-proof-id={tool.id}>
      <figure data-evidence-type={tool.image.evidenceType}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={tool.image.alt}
          decoding="async"
          height={tool.image.height}
          loading="lazy"
          sizes="(max-width: 54rem) 100vw, 42vw"
          src={tool.image.src}
          width={tool.image.width}
        />
        <figcaption>
          <strong>Public repository evidence from an owned Boho system.</strong>
          <span>Owned Boho system · Not a client project{exampleData ? " · Example data only" : ""}</span>
        </figcaption>
      </figure>
      <div className="service-proof-card__body">
        <p className="service-proof-card__label">Public repository evidence</p>
        <h4>{tool.displayName}</h4>
        <p>{tool.shortPublicSummary}</p>
        <dl>
          <div><dt>Evidence type</dt><dd>{tool.image.evidenceType}</dd></div>
          <div><dt>Last verified</dt><dd>{tool.lastVerified}</dd></div>
        </dl>
        <div className="service-proof-card__actions">
          <ExternalRepositoryLink href={tool.repositoryUrl}>Public repository</ExternalRepositoryLink>
          <ExternalRepositoryLink href={tool.image.sourceUrl}>Screenshot source</ExternalRepositoryLink>
          <a href={`/tools/#selected-tools`}>Deeper Tools profile</a>
        </div>
      </div>
    </article>
  );
}

function WebsiteProofCard({ website }: { website: OwnedWebsiteProfile }) {
  return (
    <article className="service-proof-card service-proof-card--property" data-owned-property-id={website.id}>
      <figure data-evidence-type={website.proofCategory}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={website.image.alt}
          decoding="async"
          height={website.image.height}
          loading="lazy"
          sizes="(max-width: 54rem) 100vw, 30vw"
          src={website.image.src}
          width={website.image.width}
        />
        <figcaption>
          <strong>Owned Boho property. Not a client project.</strong>
          <span>Public property evidence · No client performance claim</span>
        </figcaption>
      </figure>
      <div className="service-proof-card__body">
        <p className="service-proof-card__label">{website.domain}</p>
        <h4>{website.name}</h4>
        <p>{website.role}</p>
        <dl>
          <div><dt>Evidence type</dt><dd>{website.proofCategory}</dd></div>
          <div><dt>Last verified</dt><dd>{website.lastVerified}</dd></div>
        </dl>
        <div className="service-proof-card__actions">
          <ExternalRepositoryLink href={website.repositoryUrl}>Public repository</ExternalRepositoryLink>
          <ExternalRepositoryLink href={website.image.sourceUrl}>Proof source</ExternalRepositoryLink>
        </div>
      </div>
    </article>
  );
}

export function ServiceToolProofModule({
  title,
  intro,
  tools,
  exampleData = false,
}: {
  title: string;
  intro: string;
  tools: ReadonlyArray<SelectedToolProfile>;
  exampleData?: boolean;
}) {
  return (
    <div
      className="service-proof-module"
      data-service-visual-job="PROVE"
      data-service-visual-module="proof"
    >
      <header>
        <p className="eyebrow">Authentic proof</p>
        <h3>{title}</h3>
        <p>{intro}</p>
      </header>
      <div className={`service-proof-grid service-proof-grid--${tools.length}`}>
        {tools.map((tool) => <ToolProofCard exampleData={exampleData} key={tool.id} tool={tool} />)}
      </div>
    </div>
  );
}

export function WebsiteProofModule({
  websites,
}: {
  websites: ReadonlyArray<OwnedWebsiteProfile>;
}) {
  return (
    <div
      className="service-proof-module"
      data-service-visual-job="PROVE"
      data-service-visual-module="owned-properties"
    >
      <header>
        <p className="eyebrow">Owned property proof</p>
        <h3>Owned systems with different jobs</h3>
        <p>
          These are owned Boho properties, not client projects. They demonstrate different information architectures, content systems, tools, and user journeys; they do not establish client performance claims.
        </p>
      </header>
      <div className="service-proof-grid service-proof-grid--properties">
        {websites.map((website) => <WebsiteProofCard key={website.id} website={website} />)}
      </div>
    </div>
  );
}
