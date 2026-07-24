import type { Metadata } from "next";
import Homepage from "./Homepage";

export const metadata: Metadata = {
  title: {
    absolute: "Boho Digital Services | Web Design, Technical SEO & Digital Engineering",
  },
  description:
    "Chicago-based Boho Digital Services builds and repairs websites, search visibility, provider migrations, analytics, and focused digital systems with public starting prices and documented work.",
};

export default function Home() {
  return <Homepage />;
}
