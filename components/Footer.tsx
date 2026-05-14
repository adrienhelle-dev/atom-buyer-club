"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useLanguage } from "@/context/LanguageContext";

function MicrosurfacesLogo() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "80px", height: "80px", color: "rgba(245,242,237,0.55)" }}
      fill="currentColor"
    >
      <rect x="3" y="3" width="194" height="194" stroke="currentColor" strokeWidth="3" fill="none"/>
      <text
        x="18"
        y="96"
        fontFamily="'Cormorant Garamond', Georgia, 'Times New Roman', serif"
        fontSize="46"
        fontWeight="400"
        letterSpacing="-1"
      >
        micro
      </text>
      <text
        x="26"
        y="152"
        fontFamily="'Cormorant Garamond', Georgia, 'Times New Roman', serif"
        fontSize="46"
        fontWeight="400"
        letterSpacing="-1"
      >
        surfaces
      </text>
    </svg>
  );
}

export default function Footer() {
  const { tr } = useLanguage();
  const f = tr.footer;

  return (
    <footer
      style={{
        background: "#111111",
        borderTop: "1px solid rgba(245,242,237,0.06)",
        padding: "80px 24px 40px",
        color: "#F5F2ED",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Top row */}
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", marginBottom: "64px" }}>
          {/* Left */}
          <div>
            <Logo variant="light" />
            <p style={{ fontSize: "13px", color: "rgba(245,242,237,0.4)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, margin: "20px 0 0", maxWidth: "280px" }}>
              {f.tagline}
            </p>

            {/* Microsurfaces logo */}
            <div style={{ marginTop: "28px", display: "inline-flex", alignItems: "center", gap: "14px" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "rgba(245,242,237,0.3)", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", textTransform: "uppercase" }}>
                {f.brandOf}
              </span>
              <MicrosurfacesLogo />
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
              <a
                href="https://chat.whatsapp.com/FgUjjDMT6ofKptPEHBxocp?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Groupe WhatsApp"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", border: "1px solid rgba(245,242,237,0.15)", borderRadius: "50%", color: "rgba(245,242,237,0.5)", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,242,237,0.5)"; e.currentTarget.style.color = "#F5F2ED"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,242,237,0.15)"; e.currentTarget.style.color = "rgba(245,242,237,0.5)"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/atom.living?igsh=MXh4aWtudno0NW43MA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @atom.living"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", border: "1px solid rgba(245,242,237,0.15)", borderRadius: "50%", color: "rgba(245,242,237,0.5)", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,242,237,0.5)"; e.currentTarget.style.color = "#F5F2ED"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,242,237,0.15)"; e.currentTarget.style.color = "rgba(245,242,237,0.5)"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="mailto:contact@atom-capital.fr"
                aria-label="Email"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", border: "1px solid rgba(245,242,237,0.15)", borderRadius: "50%", color: "rgba(245,242,237,0.5)", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,242,237,0.5)"; e.currentTarget.style.color = "#F5F2ED"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,242,237,0.15)"; e.currentTarget.style.color = "rgba(245,242,237,0.5)"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Legal mentions */}
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(245,242,237,0.3)", fontFamily: "'DM Sans', sans-serif", marginBottom: "16px" }}>
              {f.legalTitle}
            </div>
            <div style={{ fontSize: "12px", color: "rgba(245,242,237,0.4)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.9 }}>
              <p style={{ margin: "0 0 4px" }}>Atom Buyers Club est une marque commerciale de :</p>
              <p style={{ margin: "0 0 4px", color: "rgba(245,242,237,0.6)", fontWeight: 500 }}>SAS MICROSURFACES</p>
              <p style={{ margin: "0 0 4px" }}>RCS Paris 937 663 052 — Capital social : 1 000 €</p>
              <p style={{ margin: "0 0 4px" }}>Siège social : 97 rue de Turenne, 75003 Paris</p>
              <p style={{ margin: "0 0 4px" }}>Président : Adrien Helle</p>
              <p style={{ margin: "0 0 4px" }}>Carte professionnelle « Transactions sur immeubles et fonds de commerce »</p>
              <p style={{ margin: "0 0 4px" }}>N° CPI 7501 2025 000 000 458</p>
              <p style={{ margin: "0 0 4px" }}>Délivrée par la CCI de Paris Île-de-France</p>
              <p style={{ margin: "0 0 4px" }}>Garantie financière : Axa France IARD S.A. — 150 000 €</p>
              <p style={{ margin: 0 }}>Ne détient pas de fonds pour le compte de la clientèle.</p>
            </div>
          </div>
        </div>

        <div style={{ height: "1px", background: "rgba(245,242,237,0.06)", marginBottom: "32px" }}/>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <span style={{ fontSize: "12px", color: "rgba(245,242,237,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
            {f.copyright}
          </span>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {[
              { label: f.links.legal, href: "/mentions-legales" },
              { label: f.links.privacy, href: "/politique-de-confidentialite" },
              { label: f.links.cgu, href: "/cgu" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontSize: "12px", color: "rgba(245,242,237,0.3)", fontFamily: "'DM Sans', sans-serif", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,242,237,0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,242,237,0.3)")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}
