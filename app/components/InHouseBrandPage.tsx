import Link from "next/link";

import { inHouseBrands, type InHouseBrand } from "../content/inHouseBrands";
import { BrandPreviewFrame } from "./BrandPreviewCarousel";
import { DefinedText } from "./DefinedText";
import { Footer, Header, TextLink } from "./SiteChrome";

export function InHouseBrandPage({ brand }: { brand: InHouseBrand }) {
  const siblings = inHouseBrands.filter((candidate) => candidate.id !== brand.id);
  const seenTerms = new Set<string>();
  const define = (text: string) => <DefinedText autoDefine seenTerms={seenTerms} text={text} />;

  return (
    <>
      <Header />
      <main className={`brand-detail brand-detail--${brand.accent}`} id="main-content" tabIndex={-1}>
        <section className="brand-detail__hero">
          <div className="section-shell brand-detail__hero-grid">
            <div>
              <p className="eyebrow eyebrow--on-dark">The Boho Lab · Owned property</p>
              <h1>{brand.name}</h1>
              <p className="brand-detail__domain">{brand.displayUrl}</p>
            </div>
            <div className="brand-detail__intro">
              <p>{define(brand.role)}</p>
              <TextLink href="/lab/in-house-brands/" className="text-link--on-dark">
                View all in-house brands
              </TextLink>
            </div>
          </div>
        </section>

        <section className="section-shell brand-detail__preview" aria-label={`${brand.name} preview`}>
          <BrandPreviewFrame brand={brand} />
        </section>

        <section className="section-shell brand-detail__notes">
          <article>
            <p className="eyebrow">Current focus</p>
            <h2>What this property helps us study.</h2>
            <p>{define(brand.focus)}</p>
          </article>
          <article>
            <p className="eyebrow">Boundary</p>
            <h2>Owned work, not a client claim.</h2>
            <p>This live, non-interactive preview documents an in-house property. It is not a testimonial, case study, or promise of a specific result.</p>
          </article>
        </section>

        <nav className="section-shell brand-detail__related" aria-label="Other in-house brand files">
          <span>Keep exploring the Lab</span>
          {siblings.map((sibling) => (
            <Link href={sibling.labPath} key={sibling.id}>{sibling.name}</Link>
          ))}
        </nav>
      </main>
      <Footer />
    </>
  );
}
