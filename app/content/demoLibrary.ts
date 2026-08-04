export type DemoTier = "brochure" | "expanded" | "high-end";

export type DemoProject = {
  id: string;
  name: string;
  businessType: string;
  tier: DemoTier;
  tierLabel: string;
  href: string;
  image: string;
  imageHeight: number;
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
    image: "/demos/junk-removal-homepage.webp",
    imageHeight: 4255,
    alt: "Full homepage preview of Boho's junk removal website demo.",
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
    image: "/demos/cafe-homepage.webp",
    imageHeight: 3057,
    alt: "Full homepage preview of the Juniper and Finch boutique café website demo.",
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
    image: "/demos/salon-homepage.webp",
    imageHeight: 3666,
    alt: "Full homepage preview of the Honey and Ash salon website demo.",
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
    image: "/demos/pet-grooming-homepage.webp",
    imageHeight: 3388,
    alt: "Full homepage preview of the Fuzz and Fern pet grooming website demo.",
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
    image: "/demos/auto-detailing-homepage.webp",
    imageHeight: 3787,
    alt: "Full homepage preview of the Chrome and Clover mobile auto detailing website demo.",
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
    image: "/demos/landscaping-homepage.webp",
    imageHeight: 6468,
    alt: "Full homepage preview of the Field and Stone expanded landscaping website demo.",
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
    image: "/demos/pest-control-homepage.webp",
    imageHeight: 5777,
    alt: "Full homepage preview of the Sentinel Pest and Property high-end website demo.",
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
    image: "/demos/dentistry-homepage.webp",
    imageHeight: 7328,
    alt: "Full homepage preview of the Aurelia Dental and Orthodontics high-end website demo.",
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
