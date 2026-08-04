export type DemoTier = "brochure" | "expanded" | "high-end";

export type DemoProject = {
  id: string;
  name: string;
  businessType: string;
  tier: DemoTier;
  tierLabel: string;
  href: string;
  image: string;
  alt: string;
  summary: string;
  features: readonly string[];
};

export const demoProjects: readonly DemoProject[] = [
  {
    id: "junk-removal",
    name: "Junk Removal Service",
    businessType: "Local service business",
    tier: "brochure",
    tierLabel: "$850 brochure site",
    href: "https://junkremoval.demos.bohodigitalservices.com/",
    image: "/demos/junk-removal.webp",
    alt: "Preview card for Boho's junk removal website demo, with a cleanup crew beside a hauling trailer.",
    summary: "A direct, high-energy local-service site built to explain the offer, establish service-area fit, and turn a visitor into a quote request.",
    features: ["Service and pricing clarity", "Local trust signals", "Quote-focused customer path"],
  },
  {
    id: "cafe",
    name: "Juniper & Finch",
    businessType: "Boutique local café",
    tier: "brochure",
    tierLabel: "$850 brochure site",
    href: "https://cafe.demos.bohodigitalservices.com/",
    image: "/demos/cafe.webp",
    alt: "Preview card for the Juniper and Finch boutique café website demo, showing coffee and pastries in a warm café interior.",
    summary: "A warm neighborhood café site with a useful menu, location details, social paths, photography, and a clear reason to visit.",
    features: ["Menu and location", "Social and hashtag promotion", "Atmosphere-led design"],
  },
  {
    id: "salon",
    name: "Honey & Ash",
    businessType: "Boutique hair studio",
    tier: "brochure",
    tierLabel: "$850 brochure site",
    href: "https://salon.demos.bohodigitalservices.com/",
    image: "/demos/salon.webp",
    alt: "Preview card for the Honey and Ash salon website demo, showing a polished studio and styled copper hair.",
    summary: "A personality-rich salon site that organizes services, pricing, team context, visual proof, and booking calls to action without feeling generic.",
    features: ["Service menu", "Team presentation", "Booking-ready calls to action"],
  },
  {
    id: "pet-grooming",
    name: "Fuzz & Fern",
    businessType: "Local pet groomer",
    tier: "brochure",
    tierLabel: "$850 brochure site",
    href: "https://grooming.demos.bohodigitalservices.com/",
    image: "/demos/pet-grooming.webp",
    alt: "Preview card for the Fuzz and Fern pet grooming website demo, featuring a cheerful freshly groomed dog.",
    summary: "A playful but practical service site with grooming packages, policies, team introductions, customer preparation, and strong mobile navigation.",
    features: ["Packages and policies", "Friendly local branding", "Mobile-first inquiries"],
  },
  {
    id: "auto-detailing",
    name: "Chrome & Clover",
    businessType: "Mobile auto detailing",
    tier: "brochure",
    tierLabel: "$850 brochure site",
    href: "https://detailing.demos.bohodigitalservices.com/",
    image: "/demos/auto-detailing.webp",
    alt: "Preview card for the Chrome and Clover mobile auto detailing website demo, featuring a polished black performance car.",
    summary: "A sharp mobile-detailing site that separates packages, residential and fleet needs, coverage information, and the path to a booking request.",
    features: ["Service packages", "Mobile coverage", "Residential and fleet paths"],
  },
  {
    id: "landscaping",
    name: "Field & Stone",
    businessType: "Landscape design and build",
    tier: "expanded",
    tierLabel: "Expanded website",
    href: "https://landscaping.demos.bohodigitalservices.com/",
    image: "/demos/landscaping.webp",
    alt: "Preview card for the Field and Stone expanded landscaping website demo, showing a refined garden stair and patio design.",
    summary: "A deeper regional website with detailed service paths, project storytelling, commercial and residential audiences, local pages, and educational content.",
    features: ["Service-area architecture", "Project and process depth", "Search-ready local content"],
  },
  {
    id: "pest-control",
    name: "Sentinel Pest & Property",
    businessType: "Multi-location pest control",
    tier: "high-end",
    tierLabel: "High-end custom website",
    href: "https://pestcontrol.demos.bohodigitalservices.com/",
    image: "/demos/pest-control.webp",
    alt: "Preview card for the Sentinel Pest and Property high-end website demo, showing a protected suburban home and service messaging.",
    summary: "A multi-location service platform with residential and commercial journeys, scheduling, service-area logic, careers, franchising, education, and a configurable LLM assistant prototype.",
    features: ["Multi-location customer paths", "Scheduling and coverage tools", "LLM assistant and integration concepts"],
  },
  {
    id: "dentistry",
    name: "Aurelia Dental & Orthodontics",
    businessType: "Multi-location dentistry group",
    tier: "high-end",
    tierLabel: "High-end custom website",
    href: "https://dentistry.demos.bohodigitalservices.com/",
    image: "/demos/dentistry.webp",
    alt: "Preview card for the Aurelia Dental and Orthodontics high-end website demo, showing its premium patient-centered design.",
    summary: "A premium multi-location healthcare demonstration with deep care pathways, team and location filtering, maps, appointment planning, referrals, careers, education, and responsible assistant concepts.",
    features: ["Team and location discovery", "Referral and scheduling prototypes", "Deep service and education architecture"],
  },
] as const;

export const demoTierOptions = [
  { id: "all", label: "All demos", count: demoProjects.length },
  { id: "brochure", label: "$850 brochure sites", count: demoProjects.filter((demo) => demo.tier === "brochure").length },
  { id: "expanded", label: "Expanded sites", count: demoProjects.filter((demo) => demo.tier === "expanded").length },
  { id: "high-end", label: "High-end sites", count: demoProjects.filter((demo) => demo.tier === "high-end").length },
] as const;
