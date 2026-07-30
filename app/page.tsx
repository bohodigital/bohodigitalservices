import type { Metadata } from "next";
import Homepage from "./Homepage";

export const metadata: Metadata = {
  title: {
    absolute: "Business Websites from $850 | Free Hosting | Boho",
  },
  description:
    "Custom business websites from $850 with eligible hosting at $0 per month in a Cloudflare account your business owns. Ongoing SEO, website help, and custom systems from Boho.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Business Websites from $850 | Free Hosting | Boho",
    description:
      "Custom business websites from $850 with eligible hosting at $0 per month in a Cloudflare account your business owns. Ongoing SEO, website help, and custom systems from Boho.",
    url: "/",
    images: [
      {
        url: "/og-boho-commercial-reset-20260730.webp",
        width: 1200,
        height: 630,
        alt: "Boho Digital Services: Business websites from $850. Hosting stays free.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Websites from $850 | Free Hosting | Boho",
    description:
      "Custom business websites from $850 with eligible hosting at $0 per month in a Cloudflare account your business owns. Ongoing SEO, website help, and custom systems from Boho.",
    images: ["/og-boho-commercial-reset-20260730.webp"],
  },
};

export default function Home() {
  return <Homepage />;
}
