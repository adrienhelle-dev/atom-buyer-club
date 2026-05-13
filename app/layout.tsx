import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Atom Buyer Club — Investissement micro-logement parisien",
  description:
    "Rejoignez le club d'investisseurs Atom. Micro-logements parisiens clé-en-main : sourcing, rénovation premium, gestion locative en bail société.",
  keywords: [
    "investissement immobilier Paris",
    "micro-logement",
    "studio Paris",
    "investissement locatif clé en main",
    "bail société",
    "atom buyer club",
  ],
  openGraph: {
    title: "Atom Buyer Club — Investissement micro-logement parisien",
    description:
      "Rejoignez le club d'investisseurs Atom. Micro-logements parisiens clé-en-main : sourcing, rénovation premium, gestion locative en bail société.",
    type: "website",
    locale: "fr_FR",
    siteName: "Atom Buyer Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atom Buyer Club — Investissement micro-logement parisien",
    description:
      "Rejoignez le club d'investisseurs Atom. Micro-logements parisiens clé-en-main.",
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
      </body>
    </html>
  );
}
