import type { Metadata, Viewport } from "next";
import { DefinitionPopoverProvider } from "./components/DefinitionPopoverProvider";
import "./globals.css";

const siteUrl = new URL("https://bohodigitalservices.com");
const siteTitle = "Boho Digital Services | Web Design, Technical SEO & Digital Engineering";
const siteDescription =
  "Chicago-based Boho Digital Services builds and repairs websites, search visibility, provider migrations, analytics, and focused digital systems with public starting prices and documented work.";
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://bohodigitalservices.com/#organization",
  name: "Boho Digital Services",
  url: "https://bohodigitalservices.com/",
  description: siteDescription,
  logo: {
    "@type": "ImageObject",
    url: "https://bohodigitalservices.com/brand/boho-organization-logo-v2.png",
    contentUrl:
      "https://bohodigitalservices.com/brand/boho-organization-logo-v2.png",
    width: 720,
    height: 720,
  },
  sameAs: ["https://github.com/bohodigital"],
};

export function generateMetadata(): Metadata {
  const socialImage = new URL(
    "/og-boho-digital-engineering-20260714.png",
    siteUrl,
  ).toString();

  return {
    metadataBase: siteUrl,
    title: {
      default: siteTitle,
      template: "%s | Boho Digital Services",
    },
    description: siteDescription,
    icons: {
      icon: [
        {
          url: "/brand/boho-search-icon-v2.png",
          type: "image/png",
          sizes: "256x256",
        },
      ],
      shortcut: "/brand/boho-search-icon-v2.png",
      apple: "/brand/boho-bee-logo-v2-256.png",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: "Elegant websites and technical SEO, without the agency fog.",
      description:
        "Boho builds and repairs the systems that help people find a business, understand it, trust it, and take the next step.",
      type: "website",
      url: siteUrl,
      images: [
        {
          url: socialImage,
          width: 1536,
          height: 1024,
          alt: "Warm editorial collage representing Boho Digital Services digital engineering systems",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Elegant websites and technical SEO, without the agency fog.",
      description:
        "Boho builds and repairs the systems that help people find a business, understand it, trust it, and take the next step.",
      images: [socialImage],
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#111214",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          defer
          src="/analytics-bootstrap.js"
          data-analytics-bootstrap="boho-v2"
          data-umami-script-url="https://analytics.bohodigitalservices.com/script.js"
          data-umami-website-id="aecddac8-8ad4-49c4-b791-60b161c95155"
          data-umami-domains="bohodigitalservices.com,www.bohodigitalservices.com"
          data-ga-id="G-5CV8L2SE2R"
          data-ga-public-hosts="bohodigitalservices.com,www.bohodigitalservices.com"
        />
      </head>
      <body>
        <DefinitionPopoverProvider>{children}</DefinitionPopoverProvider>
      </body>
    </html>
  );
}
