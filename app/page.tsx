import type { Metadata } from "next";
import Homepage from "./Homepage";

export const metadata: Metadata = {
  title: {
    absolute: "Boho Digital Services | Web Design, Technical SEO & Digital Engineering",
  },
  description:
    "Chicago-based Boho Digital Services builds and repairs websites, search visibility, provider migrations, analytics, and focused digital systems with public starting prices and documented work.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Elegant websites and technical SEO, without the agency fog.",
    description:
      "Boho builds and repairs the systems that help people find a business, understand it, trust it, and take the next step.",
    siteName: "Boho Digital Services",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1730,
        height: 909,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elegant websites and technical SEO, without the agency fog.",
    description:
      "Boho builds and repairs the systems that help people find a business, understand it, trust it, and take the next step.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function Home() {
  return <Homepage />;
}
