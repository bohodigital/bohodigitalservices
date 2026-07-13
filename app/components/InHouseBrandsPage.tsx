import { Beaker, BookOpenCheck, SearchCheck } from "lucide-react";

import { inHouseBrands } from "../content/inHouseBrands";
import { BrandPreviewCarousel } from "./BrandPreviewCarousel";
import { Footer, Header, TextLink } from "./SiteChrome";

const brandIcons = [BookOpenCheck, SearchCheck, Beaker] as const;

export function InHouseBrandsPage() {
  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <Header />
      <main className="brand-lab" id="main-content" tabIndex={-1}>
        <section className="brand-lab__hero" aria-labelledby="brand-lab-title">
          <div className="section-shell brand-lab__hero-grid">
            <div>
              <p className="eyebrow eyebrow--on-dark">The Boho Lab · In-house brands</p>
              <h1 id="brand-lab-title">Three owned sites. One place to inspect the work.</h1>
            </div>
            <div className="brand-lab__intro">
              <p>
                These properties are operated in-house. They are not client projects, testimonials,
                or proof that the same outcome will happen elsewhere.
              </p>
              <TextLink href="/lab/" className="text-link--on-dark">
                Return to the Lab
              </TextLink>
            </div>
          </div>
        </section>

        <div className="section-shell brand-lab__carousel-wrap">
          <BrandPreviewCarousel />
        </div>

        <section className="brand-lab__files" aria-labelledby="brand-files-title">
          <div className="section-shell">
            <div className="brand-lab__files-heading">
              <p className="eyebrow">Individual Lab files</p>
              <h2 id="brand-files-title">A subsection for every property.</h2>
              <p>
                Descriptions stay intentionally short for now. Each file can grow as reviewed
                experiments, decisions, and work logs are ready.
              </p>
            </div>

            <div className="brand-lab__file-list">
              {inHouseBrands.map((brand, index) => {
                const Icon = brandIcons[index];
                return (
                  <article
                    className={`brand-lab__file brand-lab__file--${brand.accent}`}
                    id={brand.id}
                    key={brand.id}
                  >
                    <div className="brand-lab__file-marker" aria-hidden="true">
                      <Icon size={30} strokeWidth={1.6} />
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <p className="brand-lab__domain">{brand.displayUrl}</p>
                      <h3>{brand.name}</h3>
                      <p>{brand.role}</p>
                      <p className="brand-lab__boundary">
                        Owned property · live preview above · no client-result claim
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
