import type { Metadata } from "next";
import Homepage from "./Homepage";

export const metadata: Metadata = {
  title: {
    absolute:
      "Boho Digital Services | Websites, SEO, Migration & Lead Generation",
  },
  description:
    "Boho Digital Services designs websites, rescues businesses from bad providers, improves search visibility, and builds research-led lead-generation and ongoing growth systems.",
};

export default function Home() {
  return <Homepage />;
}
