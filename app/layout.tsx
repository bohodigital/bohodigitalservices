import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = new URL("https://bohodigitalservices.com");
const siteTitle =
  "Boho Digital Services | Website Design, Local SEO & Digital Growth";
const siteDescription =
  "Research-led website design, local SEO, provider migration, technical SEO, lead generation, and digital growth services for businesses across the United States.";

export function generateMetadata(): Metadata {
  const socialImage = new URL(
    "/boho-digital-services-social-v2.png",
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
        { url: "/favicon.ico", sizes: "any" },
        { url: "/brand/boho-bee-logo-v2-256.png", type: "image/png", sizes: "256x256" },
      ],
      apple: "/brand/boho-bee-logo-v2-256.png",
    },
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: siteTitle,
      description:
        "Website design, local SEO, provider rescue, lead generation, and practical digital growth built from research.",
      type: "website",
      url: siteUrl,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Boho Digital Services — research-led website design, local SEO, and digital growth",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description:
        "Research-led website design, local SEO, and digital growth.",
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
