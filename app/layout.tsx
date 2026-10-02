import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/content";
import SmoothScroll from "@/components/SmoothScroll";
import MotionProvider from "@/components/MotionProvider";
import CursorLoader from "@/components/CursorLoader";

// Self-hosted variable fonts (SIL OFL): no third-party request, no layout shift.
const display = localFont({
  src: [
    { path: "./fonts/bodoni-moda-latin-opsz-normal.woff2", weight: "400 900", style: "normal" },
    { path: "./fonts/bodoni-moda-latin-opsz-italic.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Didot", "Georgia", "serif"],
});

const body = localFont({
  src: [{ path: "./fonts/hanken-grotesk-latin-wght-normal.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Tasting room cooking over embers`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [{ url: "/images/hero.jpg", width: 2816, height: 990, alt: "Beef tenderloin and red wine on a table in the dining room" }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/images/hero.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#10201b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  url: site.url,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  servesCuisine: "Modern, wood-fired tasting menu",
  priceRange: "$$$$",
  acceptsReservations: true,
  image: `${site.url}/images/hero.jpg`,
  address: { "@type": "PostalAddress", streetAddress: site.address.join(", ") },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <noscript>
          <style>{`.split-char,.reveal-line>span{transform:none!important}`}</style>
        </noscript>
        <MotionProvider>
          <SmoothScroll />
          <CursorLoader />
          {children}
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
