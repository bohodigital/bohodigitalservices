export type InHouseBrand = {
  id: "how-biscuit" | "rank-builder-seo" | "better-grades";
  name: string;
  url: string;
  displayUrl: string;
  labPath: string;
  role: string;
  focus: string;
  accent: "gold" | "verdigris" | "plum";
};

export const inHouseBrands: readonly InHouseBrand[] = [
  {
    id: "how-biscuit",
    name: "How Biscuit",
    url: "https://howbiscuit.com/",
    displayUrl: "howbiscuit.com",
    labPath: "/lab/in-house-brands/how-biscuit/",
    role: "An owned publishing property used to develop and document practical content systems.",
    focus: "Editorial systems, useful publishing, and clear information architecture.",
    accent: "gold",
  },
  {
    id: "rank-builder-seo",
    name: "RankBuilder SEO",
    url: "https://rankbuilderseo.com/",
    displayUrl: "rankbuilderseo.com",
    labPath: "/lab/in-house-brands/rank-builder-seo/",
    role: "An owned search-focused property used for technical, publishing, and visibility work.",
    focus: "Search tooling, technical SEO, and repeatable visibility workflows.",
    accent: "verdigris",
  },
  {
    id: "better-grades",
    name: "Better Grades",
    url: "https://bettergrades.net/",
    displayUrl: "bettergrades.net",
    labPath: "/lab/in-house-brands/better-grades/",
    role: "An owned learning property used to build and inspect educational web experiences.",
    focus: "Learning tools, approachable explanations, and student-centered interaction design.",
    accent: "plum",
  },
] as const;

export const inHouseBrandsByLabPath = new Map(
  inHouseBrands.map((brand) => [brand.labPath, brand]),
);
