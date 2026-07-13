import type { Metadata } from "next";
import Homepage from "./Homepage";

export const metadata: Metadata = {
  title: {
    absolute:
      "Boho Digital Services | Website Design, Local SEO & Migration",
  },
  description:
    "Research-led website design, local SEO, website migration, provider rescue, and lead-generation services for businesses across the United States.",
};

export default function Home() {
  return <Homepage />;
}
