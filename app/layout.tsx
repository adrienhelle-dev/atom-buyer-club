import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cormorant_Garamond, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const memberCount = process.env.NEXT_PUBLIC_MEMBER_COUNT ?? "713";
const siteDescription = `Club privé · ${memberCount}+ investisseurs · Micro-logements parisiens clé-en-main — sourcing, rénovation premium et loyer garanti en bail société.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.atombuyersclub.fr"),
  title: "Atom Buyers Club — Investissement micro-logement parisien",
  description: siteDescription,
  keywords: [
    "investissement immobilier Paris",
    "micro-logement",
    "studio Paris",
    "investissement locatif clé en main",
    "bail société",
    "atom buyers club",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Atom Buyers Club — Micro-logement parisien clé-en-main",
    description: siteDescription,
    type: "website",
    url: "https://www.atombuyersclub.fr",
    locale: "fr_FR",
    siteName: "Atom Buyers Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atom Buyers Club — Micro-logement parisien clé-en-main",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${dmSans.variable} ${playfair.variable}`}
      style={{ background: "#F5F2ED" }}
    >
      <body
        style={{
          background: "#F5F2ED",
          color: "#1A1A1A",
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        }}
      >
        {children}
        <Script src="/meta-pixel.js" strategy="afterInteractive" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
