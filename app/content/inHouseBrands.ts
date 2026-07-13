export type InHouseBrand = {
  id: "how-biscuit" | "rank-builder-seo" | "better-grades";
  name: string;
  url: string;
  displayUrl: string;
  role: string;
  accent: "gold" | "verdigris" | "plum";
};

export const inHouseBrands: readonly InHouseBrand[] = [
  {
    id: "how-biscuit",
    name: "How Biscuit",
    url: "https://howbiscuit.com/",
    displayUrl: "howbiscuit.com",
    role: "An owned publishing property used to develop and document practical content systems.",
    accent: "gold",
  },
  {
    id: "rank-builder-seo",
    name: "RankBuilder SEO",
    url: "https://rankbuilderseo.com/",
    displayUrl: "rankbuilderseo.com",
    role: "An owned search-focused property used for technical, publishing, and visibility work.",
    accent: "verdigris",
  },
  {
    id: "better-grades",
    name: "Better Grades",
    url: "https://bettergrades.net/",
    displayUrl: "bettergrades.net",
    role: "An owned learning property used to build and inspect educational web experiences.",
    accent: "plum",
  },
] as const;
