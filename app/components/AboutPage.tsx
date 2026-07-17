import { DefinedText } from "./DefinedText";
import { ButtonLink, Footer, Header } from "./SiteChrome";

const professionalCompetencies = [
  "Mathematical and quantitative modeling",
  "Behavioral-science research",
  "Medical-image processing",
  "Scientific programming",
  "Software engineering",
  "Data and image-processing workflows",
  "Method development and validation",
  "Technical debugging",
  "Quantitative interpretation",
  "Research documentation",
  "Novel problem-solving",
] as const;

const digitalServiceCosts = [
  "Unnecessary communication layers",
  "Standardized work presented as mysterious expertise",
  "Automated reports without useful decisions",
  "Technical systems nobody will explain",
  "Repeated work that should already have become a reliable process",
  "Provider relationships that obscure ownership and control",
] as const;

const structuralAnswer = [
  "Keep technical responsibility close to the client",
  "Remove overhead that does not improve delivery",
  "Begin with the business rather than a predetermined package",
  "Use mature infrastructure instead of manufacturing fake complexity",
  "Build reusable systems when problems repeat",
  "Create custom solutions when standard ones are inadequate",
  "Automate reliable repetitive work",
  "Review consequential outputs",
  "Document what changed",
  "Preserve client control",
  "Pass the economic benefits of a leaner structure to the customer",
] as const;

const reusableSystems = [
  "Diagnostic methods",
  "Technical checklists",
  "Research workflows",
  "Deployment processes",
  "Analytics components",
  "Monitoring systems",
  "Publishing systems",
  "Content structures",
  "Documentation patterns",
  "Automation",
  "Software tools",
] as const;

const ownedProjects = [
  {
    id: "rank-builder-seo",
    title: "Rank Builder SEO",
    url: "https://rankbuilderseo.com/",
    image: "/proof/about/rank-builder-seo-homepage.png",
    alt: "Rank Builder SEO homepage showing its independent SEO research desk masthead and Clear SEO Answers editorial hero.",
    description:
      "Rank Builder SEO is a practical SEO research and education property focused on explaining search systems, documenting experiments, testing methods, and separating useful optimization from industry folklore.",
    researchUses: [
      "Search-focused editorial architecture",
      "Technical SEO explanations",
      "Experiment and research formats",
      "Content refresh and consolidation",
      "Internal linking between specialized topics",
      "Visibility for technical informational content",
      "Methods for turning public research into useful proof",
    ],
    cta: "Explore Rank Builder SEO",
  },
  {
    id: "how-biscuit",
    title: "How Biscuit",
    url: "https://howbiscuit.com/",
    image: "/proof/about/how-biscuit-homepage.png",
    alt: "How Biscuit homepage showing category navigation, a practical guide hero, and supporting article sections.",
    description:
      "How Biscuit is a practical how-to publication covering affordable solutions, home technology, home and cooking topics, and useful ways to accomplish ordinary things without unnecessary expense.",
    researchUses: [
      "Broad informational search demand",
      "Practical how-to article structures",
      "Search intent across consumer questions",
      "Topic clusters and content navigation",
      "Publishing efficiency",
      "Affiliate readiness without editorial corruption",
      "Paths from one specific question into related material",
    ],
    cta: "Explore How Biscuit",
  },
  {
    id: "better-grades",
    title: "Better Grades",
    url: "https://bettergrades.net/",
    image: "/proof/about/better-grades-homepage.png",
    alt: "Better Grades homepage showing its math-help search interface and interactive calculus method card.",
    description:
      "Better Grades is a free educational property built around mathematics, structured lessons, worked explanations, practice material, calculators, and tools designed to help students understand rather than merely retrieve an answer.",
    researchUses: [
      "Structured educational content",
      "Large interconnected knowledge systems",
      "Sequential and nonlinear navigation",
      "Interactive learning components",
      "Calculator and practice-tool integration",
      "Search behavior around academic questions",
      "Internal linking across lessons, definitions, examples, and exercises",
    ],
    cta: "Explore Better Grades",
  },
] as const;

const portfolioUses = [
  "Observe search behavior across different subjects and content types",
  "Study changes in search visibility and indexing across multiple properties",
  "Test information architecture, internal linking, metadata, structured content, and conversion paths",
  "Validate analytics and monitoring systems",
  "Test publishing workflows and reusable software",
  "Deploy new tools under real operating conditions",
  "Identify maintenance burdens and failure modes",
  "Gather evidence before introducing a method into client workflows",
] as const;

const testbedStages = [
  {
    title: "Observe",
    body: "Monitor owned properties for changes in discovery, indexing, technical health, traffic patterns, visitor behavior, and content performance.",
  },
  {
    title: "Experiment",
    body: "Introduce new methods, structures, publishing workflows, analytics components, or internal tools on an appropriate owned property.",
  },
  {
    title: "Validate",
    body: "Examine whether the system works as intended, where it fails, what maintenance it creates, and whether the apparent result is supported by the available evidence.",
  },
  {
    title: "Transfer carefully",
    body: "Adapt useful methods to a client’s business, market, infrastructure, risk level, and commercial objective. Do not copy an experiment blindly merely because it appeared to work somewhere else.",
  },
] as const;

const scientificHabits = [
  "Define the problem",
  "Understand the system",
  "Inspect how the evidence was produced",
  "Build or adapt the method",
  "Test the result",
  "Locate failure points",
  "Connect technical observations to meaningful decisions",
] as const;

const clientCosts = [
  "Sales commissions",
  "Account-management layers",
  "Internal handoffs",
  "Meetings required by the provider’s structure",
  "Repackaged software",
  "Automated reports presented as bespoke analysis",
  "Technical questions routed away from technical staff",
  "Dependence on systems the client does not understand or control",
] as const;

const clientPath = [
  {
    title: "Explain the situation",
    body: "Begin with what is happening, what matters commercially, what has already been attempted, and what feels stuck. You do not need to arrive with a correct technical diagnosis.",
  },
  {
    title: "Review the relevant system",
    body: "Depending on the problem, Boho may review the website, search presence, analytics, infrastructure, ownership arrangement, current provider, customer path, market, or technical dependencies.",
  },
  {
    title: "Connect the work to the business",
    body: "A ranking, redesign, traffic increase, report, or software project has little value unless it supports something commercially useful.",
  },
  {
    title: "Define the recommendation",
    body: "The proposal should explain the work, reasoning, scope, assumptions, dependencies, limitations, price, and how completion will be evaluated.",
  },
  {
    title: "Perform and verify the work",
    body: "Reusable systems and automation may support delivery, but consequential work remains reviewed and accountable.",
  },
  {
    title: "Leave an understandable record",
    body: "Important changes, ownership information, known limitations, and future actions should not exist solely inside the provider’s memory.",
  },
] as const;

const systemAssistance = [
  "Repetition",
  "Scale",
  "Monitoring",
  "Comparison",
  "Drafting",
  "Mechanical validation",
  "Pattern detection",
] as const;

const humanResponsibility = [
  "Defining the problem",
  "Evaluating evidence and sources",
  "Identifying weak assumptions",
  "Understanding the business context",
  "Interpreting the result",
  "Protecting private information",
  "Approving consequential changes",
  "Standing behind the deliverable",
] as const;

const caseStudyConditions = [
  "Real client work has been completed",
  "The evidence supports the claim",
  "The result can be described accurately",
  "The client has approved publication where approval is required",
] as const;

const honestInspection = [
  "The quality of its owned websites and systems",
  "The specificity of its technical explanations",
  "The clarity of its proposals and agreements",
  "The professionalism of its work",
  "The care given to ownership and documentation",
  "Its willingness to distinguish proven capability from ambition",
] as const;

const scientificImages = [
  {
    alt: "A structural brain MRI reference plate showing axial, sagittal, and coronal views alongside segmented tissue and lobe maps.",
    className: "about-science-plate--mri",
    credit: "Vladimir Fonov · CC BY 3.0",
    image: "/proof/about/science/brain-mri.jpg",
    label: "STRUCTURAL MRI",
    source: "https://commons.wikimedia.org/wiki/File:Mni_icbm152_sym_09c_small.jpg",
  },
  {
    alt: "A multicolor lateral rendering of a human brain created from functional MRI data.",
    className: "about-science-plate--fmri",
    credit: "NIMH / NIH · Public domain",
    image: "/proof/about/science/brain-fmri.jpg",
    label: "FUNCTIONAL MRI",
    source: "https://ocw.mit.edu/courses/res-9-005-fmri-bootcamp-fall-2017/resources/mitres9_005_f17_jpg/",
  },
  {
    alt: "A Lotka-Volterra ordinary differential equation phase portrait with a vector field and nested trajectories.",
    className: "about-science-plate--ode",
    credit: "Wiso · CC BY-SA 3.0 · tonal treatment",
    image: "/proof/about/science/ode-phase-field.png",
    label: "ODE PHASE FIELD",
    source: "https://commons.wikimedia.org/wiki/File:Lotka-Volterra.svg",
  },
  {
    alt: "Santiago Ramón y Cajal’s drawing of a Purkinje neuron from the human cerebellum.",
    className: "about-science-plate--cajal",
    credit: "Santiago Ramón y Cajal · Public domain · tonal treatment",
    image: "/proof/about/science/cajal-purkinje-neuron.jpg",
    label: "NEURAL ARCHITECTURE",
    source: "https://commons.wikimedia.org/wiki/File:Cajal_-_a_purkinje_neuron_from_the_human_cerebellum.jpg",
  },
] as const;

const operatingBeliefs = [
  "The person recommending the fix should understand the system being fixed.",
  "Research should change the recommendation.",
  "Repeated problems should become better methods and reusable tools.",
  "Custom engineering should solve a real need, not decorate a sales pitch.",
  "Automation should reduce waste rather than disguise it.",
  "Clients should benefit when technology lowers the provider’s cost.",
  "Reports should lead to decisions.",
  "Technical language should clarify the system rather than protect the provider.",
  "Clients should understand and control the assets their businesses depend on.",
  "Uncertainty should be explained rather than converted into a guarantee.",
  "Better value should come from a better operating model, not careless work performed cheaply.",
] as const;

export function AboutPage() {
  const seenTerms = new Set<string>();
  const define = (text: string) => (
    <DefinedText autoDefine excludeSlugs={["lead"]} seenTerms={seenTerms} text={text} />
  );

  return (
    <>
      <Header />
      <main className="about-page" id="main-content" tabIndex={-1}>
        <section className="about-hero" aria-labelledby="about-hero-title">
          <div className="section-shell about-hero__grid">
            <div className="about-hero__copy">
              <p className="eyebrow eyebrow--on-dark">ABOUT BOHO DIGITAL SERVICES</p>
              <h1 id="about-hero-title">
                I come from professional scientific research. I built Boho because this problem has a clear answer.
              </h1>
              <div className="about-prose about-prose--hero">
                <p>{define("I am the owner and technical lead of Boho Digital Services.")}</p>
                <p>{define("My professional background is in scientific research involving mathematical modeling, behavioral science, and medical-image processing. That work required strong quantitative reasoning, scientific programming, software engineering, data analysis, technical documentation, and the ability to solve novel problems for which no established answer or ready-made procedure existed.")}</p>
                <p>{define("I founded Boho to apply that experience to websites, search, analytics, infrastructure, customer behavior, and the digital systems businesses increasingly depend on.")}</p>
                <p>{define("Boho combines direct technical responsibility with reusable tools, documented methods, modern automation, and custom engineering where the problem genuinely requires it.")}</p>
                <p>{define("We do not rebuild every solution from an empty folder. When a problem repeats, we preserve what works, develop a reliable method or tool, and use that accumulated capability to deliver the next project more efficiently.")}</p>
                <p>{define("I am accustomed to working on difficult problems without known answers.")}</p>
                <p>{define("The central problem with conventional digital services is much less mysterious.")}</p>
              </div>
              <div className="button-row about-hero__actions">
                <ButtonLink href="/contact/">Talk to Someone Technical</ButtonLink>
                <ButtonLink href="#why-i-built-boho" variant="secondary">Why I Built Boho</ButtonLink>
              </div>
              <p className="about-trust-line">Owner-operated · Research-led · Reusable systems · Direct technical access</p>
            </div>

            <figure className="about-electron-cloud">
              <img
                alt="Simulated hydrogen-like electron probability clouds across several atomic orbitals."
                height={1600}
                src="/proof/about/science/electron-cloud.png"
                width={1600}
              />
              <figcaption>
                <span>SIMULATED ELECTRON DENSITY · |ψ|²</span>
                <a href="https://commons.wikimedia.org/wiki/File:Atomic-orbital-clouds_spdf_m0.png" rel="noreferrer" target="_blank">
                  Geek3 · CC BY-SA 4.0<span aria-hidden="true">↗</span>
                </a>
              </figcaption>
            </figure>
          </div>

          <nav className="about-proof-strip" aria-label="Boho-owned live project previews">
            <div className="section-shell about-proof-strip__inner">
              <span>BOHO-OWNED LIVE PROJECTS</span>
              <a href="#rank-builder-seo">Rank Builder SEO</a>
              <a href="#how-biscuit">How Biscuit</a>
              <a href="#better-grades">Better Grades</a>
            </div>
          </nav>
        </section>

        <section className="about-beliefs" aria-labelledby="beliefs-title">
          <div className="section-shell">
            <p className="eyebrow eyebrow--on-dark">WHAT BOHO BELIEVES</p>
            <h2 className="sr-only" id="beliefs-title">Boho operating beliefs</h2>
            <div className="about-beliefs__list">
              {operatingBeliefs.map((belief) => <p key={belief}>{define(belief)}</p>)}
            </div>
            <p className="about-beliefs__closing">That is the company I built.</p>
          </div>
        </section>

        <section className="about-section about-background" aria-labelledby="professional-background-title">
          <div className="section-shell about-background__grid">
            <aside className="about-background__aside">
              <p className="eyebrow">PROFESSIONAL BACKGROUND</p>
              <p className="about-list-label">Professional experience included:</p>
              <ul className="about-plain-list">
                {professionalCompetencies.map((item) => <li key={item}>{define(item)}</li>)}
              </ul>
            </aside>
            <div className="about-background__main">
              <h2 id="professional-background-title">Scientific research, software engineering, and original technical problem-solving.</h2>
              <div className="about-prose">
                <p>{define("Before founding Boho Digital Services, my professional work centered on scientific research involving mathematical modeling, behavioral science, and medical-image processing.")}</p>
                <p>{define("This work required translating complex research questions into formal and computational methods. It involved scientific programming, software development, data processing, image analysis, workflow design, quantitative interpretation, validation, debugging, and clear technical documentation.")}</p>
                <p>{define("Mathematical modeling required identifying the relevant variables, making assumptions explicit, evaluating uncertainty, testing alternative explanations, and understanding where a model stopped representing reality adequately.")}</p>
                <p>{define("Behavioral-science research required working with noisy and incomplete measurements shaped by human perception, attention, decisions, context, incentives, and individual variation.")}</p>
                <p>{define("Medical-image processing required developing and adapting computational workflows, processing complex data, validating methods, and solving technical problems that could not always be addressed with existing software or standard procedures.")}</p>
                <p>{define("The work demanded more than operating tools.")}</p>
                <p>{define("It required understanding the underlying question, designing an appropriate method, writing or adapting the necessary software, testing whether the method worked, identifying failure modes, interpreting the result, and documenting the process clearly enough to withstand scrutiny.")}</p>
                <p>{define("My background is not in selling marketing packages.")}</p>
                <p>{define("It is in studying complex systems, building methods to understand them, developing the software required to perform the work, and solving problems when the answer is not already available.")}</p>
              </div>
            </div>
            <div className="about-science-gallery" aria-label="Scientific research image references">
              {scientificImages.map((image, index) => (
                <figure className={`about-science-plate ${image.className}`} key={image.label}>
                  <div className="about-science-plate__image">
                    <img
                      alt={image.alt}
                      height={index === 0 ? 276 : 1024}
                      loading="lazy"
                      src={image.image}
                      width={index === 0 ? 700 : 1024}
                    />
                  </div>
                  <figcaption>
                    <strong>{image.label}</strong>
                    <a href={image.source} rel="noreferrer" target="_blank">
                      {image.credit}<span aria-hidden="true">↗</span>
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
            <blockquote className="about-pullquote">The software was never the entire solution. The work was understanding the problem well enough to build and validate the right method.</blockquote>
          </div>
        </section>

        <section className="about-pivot" id="why-i-built-boho" aria-labelledby="why-built-title">
          <div className="section-shell about-pivot__inner">
            <p className="eyebrow eyebrow--on-dark">THIS PROBLEM IS NOT UNSOLVED</p>
            <h2 id="why-built-title">I am used to problems without known answers. This one already has an answer.</h2>
            <div className="about-pivot__columns">
              <div className="about-prose">
                <p>{define("Scientific research often begins where the instructions end.")}</p>
                <p>{define("The question may be clear while the correct method is not. Existing tools may solve only part of the problem. The first approach may fail. The available evidence may contradict the original assumption.")}</p>
                <p>{define("The work is to define the problem, build or adapt a method, test it, identify its limitations, document it, and revise it when reality disagrees.")}</p>
                <p>{define("The structural problem in digital services is easier to diagnose.")}</p>
                <p>{define("Too many businesses are paying for:")}</p>
                <ul>{digitalServiceCosts.map((item) => <li key={item}>{define(item)}</li>)}</ul>
              </div>
              <div className="about-prose about-pivot__answer">
                <p>{define("The answer is comparatively straightforward:")}</p>
                <ul>{structuralAnswer.map((item) => <li key={item}>{define(item)}</li>)}</ul>
                <p>{define("None of this requires a revolutionary theory.")}</p>
                <p>{define("It requires building the company around the work and the client rather than around the habits of the agency industry.")}</p>
              </div>
            </div>
            <p className="about-pivot__closing">That is what I built Boho to do.</p>
          </div>
        </section>

        <section className="about-section about-builds" aria-labelledby="how-builds-title">
          <div className="section-shell">
            <p className="eyebrow">HOW BOHO BUILDS</p>
            <h2 id="how-builds-title">Custom where necessary. Reusable where sensible.</h2>
            <div className="about-builds__grid">
              <div className="about-prose">
                <p>{define("Professional problem-solving does not mean inventing an entirely new solution every time.")}</p>
                <p>{define("When a problem has already been solved well, the responsible approach is to preserve the solution, test it, improve it, and reuse it appropriately.")}</p>
                <p>{define("Boho develops reusable:")}</p>
                <ul>{reusableSystems.map((item) => <li key={item}>{define(item)}</li>)}</ul>
                <p>{define("These systems reduce repeated labor, improve consistency, and allow lessons from one project to strengthen the next.")}</p>
                <p>{define("They are not rigid packages imposed on every business.")}</p>
                <p>{define("The reusable system handles the portion of the problem that genuinely repeats. The client’s business, market, customers, priorities, constraints, and existing infrastructure determine how it should be applied.")}</p>
                <p>{define("When an existing tool or method does not solve the problem adequately, Boho can adapt it, connect systems together, or build the missing component.")}</p>
              </div>

              <div className="about-two-path" aria-label="Two ways Boho reaches an appropriate client solution">
                <div className="about-two-path__branch">
                  <span className="about-two-path__index">01</span>
                  <strong>Repeated problem</strong>
                  <p>Apply a tested method or reusable tool, then adapt it to the business.</p>
                </div>
                <div className="about-two-path__branch">
                  <span className="about-two-path__index">02</span>
                  <strong>Unusual or unresolved problem</strong>
                  <p>Use focused research and custom engineering to build the missing method, integration, or component.</p>
                </div>
                <div className="about-two-path__merge"><span>ONE STANDARD</span>Appropriate for the client</div>
              </div>
            </div>
            <blockquote className="about-pullquote">The goal is not to make every solution unique. The goal is to make every solution appropriate.</blockquote>
          </div>
        </section>

        <section className="about-section about-properties" id="owned-projects" aria-labelledby="owned-projects-title">
          <div className="section-shell">
            <p className="eyebrow">BOHO-OWNED LIVE PROJECTS</p>
            <h2 id="owned-projects-title">We test on our own properties before asking clients to carry the risk.</h2>
            <div className="about-prose about-properties__intro">
              <p>{define("Boho operates several public brands alongside the primary service business.")}</p>
              <p>{define("These are not disposable demonstration sites. Each is being developed as a useful independent property with its own audience, content strategy, search environment, publishing system, and long-term commercial purpose.")}</p>
              <p>{define("Together, they give Boho live environments in which to study how websites are discovered, indexed, interpreted, navigated, measured, and improved.")}</p>
              <p>{define("They allow us to:")}</p>
              <ul>{portfolioUses.map((item) => <li key={item}>{define(item)}</li>)}</ul>
              <p>{define("No owned portfolio can predict every algorithm or platform change before it affects a client.")}</p>
              <p>{define("It can provide an early-warning and investigation layer.")}</p>
              <p>{define("When search behavior changes, Boho can examine the effects across multiple owned properties, compare different site structures, test possible responses, and gather evidence before recommending that clients make consequential changes.")}</p>
            </div>

            <div className="about-project-list">
              {ownedProjects.map((project, index) => (
                <article className="about-project" id={project.id} key={project.id}>
                  <figure className="about-project__visual">
                    <img
                      alt={project.alt}
                      height={1000}
                      loading={index === 0 ? "eager" : "lazy"}
                      src={project.image}
                      width={1440}
                    />
                  </figure>
                  <div className="about-project__copy">
                    <p className="about-project__index">{String(index + 1).padStart(2, "0")} · LIVE PROPERTY</p>
                    <h3>{project.title}</h3>
                    <p>{define(project.description)}</p>
                    <p className="about-list-label">What Boho studies here</p>
                    <ul>{project.researchUses.map((item) => <li key={item}>{define(item)}</li>)}</ul>
                    <a className="about-external-link" href={project.url} rel="noreferrer" target="_blank">
                      {project.cta}<span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="about-testbed" aria-labelledby="testbed-title">
              <p className="eyebrow">TESTBED PROCESS</p>
              <h3 id="testbed-title">Observe. Experiment. Validate. Transfer carefully.</h3>
              <ol className="about-testbed__ledger">
                {testbedStages.map((stage, index) => (
                  <li key={stage.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h4>{stage.title}</h4>
                    <p>{define(stage.body)}</p>
                  </li>
                ))}
              </ol>
            </div>

            <blockquote className="about-pullquote">Client websites should not be the first place we discover whether an unproven system works.</blockquote>
            <div className="about-prose about-properties__closing">
              <p>{define("The owned portfolio creates a practical feedback loop:")}</p>
              <p><strong>{define("Research improves the properties. The properties improve the methods. The methods improve client delivery. Client work identifies new problems worth solving.")}</strong></p>
              <p>{define("This is how Boho builds reusable capability without treating every engagement as an isolated custom project or every client as an involuntary laboratory.")}</p>
              <ButtonLink href="/tools/" variant="secondary">Review Boho’s Tools</ButtonLink>
            </div>
          </div>
        </section>

        <section className="about-section about-digital-systems" aria-labelledby="digital-systems-title">
          <div className="section-shell">
            <p className="eyebrow">WHY DIGITAL SYSTEMS</p>
            <h2 id="digital-systems-title">The subject changed. The underlying work did not.</h2>
            <div className="about-prose about-prose--wide">
              <p>{define("Websites, search, analytics, and digital infrastructure involve interacting technical and behavioral systems.")}</p>
              <p>{define("A website is a designed information environment.")}</p>
              <p>{define("People arrive with limited attention, incomplete information, prior expectations, uncertainty, and a reason for visiting. They scan, interpret, compare, hesitate, trust, distrust, and decide whether to act.")}</p>
              <p>{define("Search is an information-retrieval and competition system.")}</p>
              <p>{define("A business must communicate its meaning to both people and machines while competing for visibility against other businesses, platforms, directories, advertisements, and changing search interfaces.")}</p>
              <p>{define("Analytics is a measurement system.")}</p>
              <p>{define("Its numbers are produced through tracking configurations, platform definitions, browser behavior, consent systems, attribution models, and imperfect sensors. A dashboard is evidence about some portion of reality. It is not reality itself.")}</p>
              <p>{define("Infrastructure determines whether the entire system remains fast, available, maintainable, measurable, and controlled by the business that depends on it.")}</p>
              <p>{define("The same professional habits remain useful:")}</p>
              <ul>{scientificHabits.map((item) => <li key={item}>{define(item)}</li>)}</ul>
              <p>{define("This is why Boho is positioned as a digital-engineering firm rather than a conventional marketing agency.")}</p>
              <p>{define("Marketing is one application of the systems being engineered.")}</p>
            </div>
          </div>
        </section>

        <section className="about-section about-rejected-model" aria-labelledby="rejected-model-title">
          <div className="section-shell about-rejected-model__grid">
            <div>
              <p className="eyebrow">WHY BOHO EXISTS</p>
              <h2 id="rejected-model-title">Too much digital work is expensive because of the organization around it, not the difficulty of the work itself.</h2>
              <div className="about-prose">
                <p>{define("Many digital providers use established platforms, reusable templates, automated reporting, standardized processes, outsourced production, and artificial intelligence.")}</p>
                <p>{define("There is nothing inherently wrong with that.")}</p>
                <p>{define("Reliable tools, repeatable systems, and automation should be used when they improve quality and reduce waste.")}</p>
                <p>{define("The problem is what often happens to the resulting efficiency.")}</p>
                <p>{define("The provider lowers its own delivery cost while the client continues paying for:")}</p>
                <ul>{clientCosts.map((item) => <li key={item}>{define(item)}</li>)}</ul>
                <p>{define("The provider may be operating efficiently.")}</p>
                <p>{define("The client receives neither the savings nor the clarity.")}</p>
                <p>{define("Boho uses modern infrastructure, reusable systems, and automation with a different objective:")}</p>
                <blockquote className="about-inline-quote">Reduce avoidable cost, keep responsibility close to the work, and direct more of the client’s budget toward useful implementation.</blockquote>
              </div>
            </div>

            <div className="about-artifacts" aria-label="Three common provider problems">
              <article className="about-artifact about-artifact--report">
                <p className="about-artifact__number">01 / REPORT WITHOUT DECISION</p>
                <div className="about-artifact__ledger" aria-hidden="true">
                  <span><b>Observation</b><i>Supplied</i></span>
                  <span><b>Meaning</b><i>Unclear</i></span>
                  <span><b>Next move</b><i>Missing</i></span>
                </div>
                <h3>Data without direction.</h3>
                <p>A useful report should explain what changed, why it matters, and what deserves action.</p>
              </article>
              <article className="about-artifact about-artifact--relay">
                <p className="about-artifact__number">02 / RESPONSIBILITY RELAY</p>
                <div className="about-artifact__ledger" aria-hidden="true">
                  <span><b>Question</b><i>Technical</i></span>
                  <span><b>Owner</b><i>Unclear</i></span>
                  <span><b>Status</b><i>Forwarded</i></span>
                </div>
                <h3>Access without accountability.</h3>
                <p>Direct technical responsibility removes the mystery around who is finding the answer.</p>
              </article>
              <article className="about-artifact about-artifact--ownership">
                <p className="about-artifact__number">03 / OWNERSHIP UNKNOWN</p>
                <div className="about-artifact__ledger" aria-hidden="true">
                  <span><b>Domain</b><i>Unconfirmed</i></span>
                  <span><b>Hosting</b><i>Unconfirmed</i></span>
                  <span><b>Analytics</b><i>Unconfirmed</i></span>
                </div>
                <h3>A business should know what it controls.</h3>
                <p>Ownership, access, and portability should be documented before they become an emergency.</p>
              </article>
            </div>

            <div className="about-supporting-statements">
              <article><h3>Reports are not decisions.</h3><p>{define("A useful report should change understanding, priorities, or action.")}</p></article>
              <article><h3>Software is not expertise.</h3><p>{define("The value lies in understanding what the system does, where it fails, and what should happen next.")}</p></article>
              <article><h3>Activity is not value.</h3><p>{define("Work should not exist merely because it can be listed on a recurring invoice.")}</p></article>
            </div>
          </div>
        </section>

        <section className="about-client-path" aria-labelledby="client-path-title">
          <div className="section-shell">
            <p className="eyebrow eyebrow--on-dark">OWNER-OPERATED IN PRACTICE</p>
            <h2 id="client-path-title">You do not meet a salesperson and disappear into a delivery system.</h2>
            <div className="about-prose about-client-path__intro">
              <p>{define("When you contact Boho, you begin with the person responsible for understanding the situation, developing the recommendation, and overseeing the technical work.")}</p>
              <p>{define("That does not mean every problem receives an immediate answer.")}</p>
              <p>{define("Serious diagnosis may require research, access, testing, comparison, and technical review.")}</p>
              <p>{define("It means responsibility is not hidden.")}</p>
            </div>
            <ol className="about-client-path__steps">
              {clientPath.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{step.title}</h3><p>{define(step.body)}</p></div>
                </li>
              ))}
            </ol>
            <blockquote className="about-pullquote about-pullquote--dark">Direct access does not mean pretending every answer is immediate. It means knowing who is responsible for finding it.</blockquote>
            <div className="button-row">
              <ButtonLink href="/services/">Review Boho’s Services</ButtonLink>
              <ButtonLink href="/contact/" variant="secondary">Talk to Someone Technical</ButtonLink>
            </div>
          </div>
        </section>

        <section className="about-section about-ai" aria-labelledby="ai-title">
          <div className="section-shell">
            <p className="eyebrow">MODERN METHODS, PROFESSIONAL RESPONSIBILITY</p>
            <h2 id="ai-title">Boho uses automation and artificial intelligence because useful tools should be used.</h2>
            <div className="about-prose about-prose--wide">
              <p>{define("Automation may assist with repeated collection, monitoring, validation, testing, data transformation, research organization, development, and documentation.")}</p>
              <p>{define("Artificial intelligence may assist with comparison, drafting, coding, classification, exploration, and identifying questions that deserve closer investigation.")}</p>
              <p>{define("These systems help a lean technical company accomplish more without recreating a bloated agency structure.")}</p>
              <p>{define("They do not eliminate the need for understanding or review.")}</p>
            </div>
            <div className="about-ai__split">
              <article><h3>What systems can assist with</h3><ul>{systemAssistance.map((item) => <li key={item}>{define(item)}</li>)}</ul></article>
              <article><h3>What remains under human responsibility</h3><ul>{humanResponsibility.map((item) => <li key={item}>{define(item)}</li>)}</ul></article>
            </div>
            <blockquote className="about-pullquote">The client should benefit from the efficiency without being asked to pretend the efficiency does not exist.</blockquote>
          </div>
        </section>

        <section className="about-section about-honest-start" aria-labelledby="honest-start-title">
          <div className="section-shell about-honest-start__grid">
            <div>
              <p className="eyebrow">BUILDING THE RECORD HONESTLY</p>
              <h2 id="honest-start-title">Boho is new. The professional background is real. The missing client history will not be invented.</h2>
              <div className="about-prose">
                <p>{define("Boho does not yet have a long list of client case studies, customer logos, testimonials, or published commercial outcomes.")}</p>
                <p>{define("My prior scientific and technical experience is real, but it should not be misrepresented as client work completed by Boho.")}</p>
                <p>{define("Likewise, Boho’s owned websites, tools, experiments, and internal systems demonstrate relevant capability, but they should not be presented as outside client results.")}</p>
                <p>{define("Real case studies will be published when:")}</p>
                <ul>{caseStudyConditions.map((item) => <li key={item}>{define(item)}</li>)}</ul>
                <p>{define("Until then, Boho should be judged by what can honestly be inspected:")}</p>
                <ul>{honestInspection.map((item) => <li key={item}>{define(item)}</li>)}</ul>
              </div>
            </div>
            <div className="about-case-study-frame" aria-label="Reserved case-study space">
              <span>CASE STUDY / RESERVED</span>
              <div aria-hidden="true" />
              <p>Reserved for evidence that has actually been earned.</p>
            </div>
            <blockquote className="about-pullquote">A new company should be hungry enough to prove itself and disciplined enough not to invent the proof.</blockquote>
          </div>
        </section>

        <section className="about-final" aria-labelledby="about-final-title">
          <div className="section-shell about-final__panel">
            <p className="eyebrow eyebrow--on-dark">START WITH THE PROBLEM</p>
            <h2 id="about-final-title">Tell Boho what your business is facing.</h2>
            <div className="about-prose">
              <p>{define("You do not need to identify the correct service before reaching out.")}</p>
              <p>{define("Explain what is happening with the business, website, search presence, current provider, analytics, infrastructure, or customer path.")}</p>
              <p>{define("Include what matters commercially, what has already been attempted, and what feels stuck.")}</p>
              <p>{define("Boho will review the situation, help identify the actual problem, and explain whether there is a sensible next step.")}</p>
            </div>
            <div className="button-row">
              <ButtonLink href="/contact/">Talk to Someone Technical</ButtonLink>
              <ButtonLink href="/services/" variant="secondary">Review Boho’s Services</ButtonLink>
            </div>
            <p className="about-final__trust">No sales relay. No obligation to buy a package. No need to arrive with a technical diagnosis.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
