import { glossaryEntries } from "../content/knowledge";
import { Footer, Header } from "./SiteChrome";
import { GlossaryExplorer } from "./GlossaryExplorer";
import { KnowledgeHero } from "./KnowledgePages";
import { SectionSidebar } from "./SectionNavigation";

export function GlossaryPage() {
  return (
    <>
      <Header />
      <main className="knowledge-page glossary-page" id="main-content" tabIndex={-1}>
        <KnowledgeHero
          eyebrow="Glossary"
          title="Technical language, translated before it becomes leverage."
          intro={[
            "This glossary gives the short version first, then explains why the term changes an ownership, website, search, measurement, or automation decision.",
            "Search by term or topic, then use the related links to move between the concepts that shape the same business decision.",
          ]}
          primary={{ label: "Browse definitions", href: "#common-terms" }}
          secondary={{ label: "Read how Boho uses the tools", href: "/tools/" }}
        />
        <div className="knowledge-section-layout">
          <SectionSidebar
            currentPath="/learn/glossary/"
            anchors={[
              { label: "Common terms", href: "#common-terms" },
              { label: `All ${glossaryEntries.length} terms`, href: "#all-terms" },
            ]}
            note="Search first, scan by letter, then expand only the definition you need."
          />
          <div className="knowledge-section-layout__content">
            <GlossaryExplorer />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
