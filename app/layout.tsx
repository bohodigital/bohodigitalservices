import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = new URL("https://bohodigitalservices.com");
const siteTitle =
  "Boho Digital Services | Digital Engineering for Visibility, Leads & Websites";
const siteDescription =
  "Digital engineering for local visibility and lead systems, websites and managed hosting, provider rescue, custom tools, automation, analytics, and improvement.";
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
      title: siteTitle,
      description:
        "Local visibility, lead systems, websites, provider rescue, and operational tools built by people who understand the machinery.",
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
      title: siteTitle,
      description:
        "Digital engineering for local visibility, lead systems, websites, and operational tools.",
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
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5CV8L2SE2R"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-5CV8L2SE2R');`,
          }}
        />
        <script
          defer
          src="https://analytics.bohodigitalservices.com/script.js"
          data-website-id="aecddac8-8ad4-49c4-b791-60b161c95155"
          data-domains="bohodigitalservices.com,www.bohodigitalservices.com"
          data-do-not-track="true"
          data-exclude-search="true"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
