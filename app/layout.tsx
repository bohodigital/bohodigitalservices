import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const siteTitle =
  "Boho Digital Services | Website Design, Local SEO & Digital Growth";
const siteDescription =
  "Research-led website design, local SEO, provider migration, technical SEO, lead generation, and digital growth services for local and growing businesses.";

function requestOrigin(headerList: Headers) {
  const rawHost =
    headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "";
  const host = rawHost.split(",")[0]?.trim();
  const rawProtocol = headerList.get("x-forwarded-proto") ?? "";
  const protocol =
    rawProtocol.split(",")[0]?.trim() ||
    (host?.startsWith("localhost") || host?.startsWith("127.0.0.1")
      ? "http"
      : "https");

  if (!host || !/^[a-z0-9.:[\]-]+$/i.test(host)) {
    return new URL("http://localhost:3000");
  }

  try {
    return new URL(`${protocol}://${host}`);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const origin = requestOrigin(await headers());
  const socialImage = new URL(
    "/boho-digital-services-social.png",
    origin,
  ).toString();

  return {
    metadataBase: origin,
    title: {
      default: siteTitle,
      template: "%s | Boho Digital Services",
    },
    description: siteDescription,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: siteTitle,
      description:
        "Website design, local SEO, provider rescue, lead generation, and practical digital growth built from research.",
      type: "website",
      url: origin,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Boho Digital Services editorial mosaic-wing social card",
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
