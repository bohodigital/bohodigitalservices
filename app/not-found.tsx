import {
  ButtonLink,
  EditorialHeadline,
  Footer,
  Header,
  TextLink,
} from "./components/SiteChrome";
import { DefinedText } from "./components/DefinedText";

export default function NotFound() {
  const seenTerms = new Set<string>();

  return (
    <>
      <Header />
      <main className="not-found" id="main-content" tabIndex={-1}>
        <div className="not-found__signal" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="section-shell not-found__inner">
          <p className="eyebrow">
            <DefinedText autoDefine seenTerms={seenTerms} text="404 / Signal lost" />
          </p>
          <EditorialHeadline as="h1" className="not-found__title">
            This path wandered off the map.
          </EditorialHeadline>
          <div className="not-found__copy reading-width">
            <p>
              The page may have moved, the address may be incomplete, or this
              part of the draft may not exist yet.
            </p>
            <p>
              Head home, browse the services, or start with a visibility check
              and we will help you find the useful route forward.
            </p>
          </div>
          <div className="button-row">
            <ButtonLink href="/">Return home</ButtonLink>
            <TextLink href="/services/">Browse services</TextLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
