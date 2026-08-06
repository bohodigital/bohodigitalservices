import type { Metadata } from "next";
import Homepage from "./Homepage";

export const metadata: Metadata = {
  title: {
    absolute: "Provider Rescue & Website Help | Boho Digital Services",
  },
  description:
    "Recover control of your domain, hosting, content, analytics, and accounts before changing website providers. Chicago-based website help starts at $200.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Provider Rescue & Website Help | Boho Digital Services",
    description:
      "Recover control before making the move. Boho maps ownership, access, dependencies, backups, migration, verification, and rollback needs.",
    siteName: "Boho Digital Services",
    type: "website",
    url: "/",
    images: [
      {
        url: "/boho-provider-rescue-social-20260806.webp",
        width: 1200,
        height: 630,
        alt: "Boho Digital Services Provider Rescue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Provider Rescue & Website Help | Boho Digital Services",
    description:
      "Recover control before making the move. Website help starts at $200.",
    images: ["/boho-provider-rescue-social-20260806.webp"],
  },
  robots: { index: true, follow: true },
};

export default function Home() {
  return <Homepage />;
}
