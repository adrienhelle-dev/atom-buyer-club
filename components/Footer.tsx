"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            marginBottom: "64px",
            flexWrap: "wrap",
          }}
        >
          {/* Left: Logo + tagline */}
          <div>
            <Logo variant="light" />
            <p
              style={{
                fontSize: "13px",
                color: "rgba(245,242,237,0.4)",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.7,
                margin: "20px 0 0",
                maxWidth: "280px",
              }}
            >
              Micro-logements parisiens clé-en-main. De l&apos;acquisition à la gestion locative.
            </p>

            {/* Microsurfaces logo placeholder */}
            <div
              style={{
                marginTop: "28px",
                padding: "12px 20px",
                border: "1px solid rgba(245,242,237,0.1)",
                borderRadius: "2px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "rgba(245,242,237,0.3)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                UNE MARQUE DE
              </span>
              <span
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  color: "rgba(245,242,237,0.6)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                }}
              >
                MICROSURFACES
              </span>
            </div>
          </div>

          {/* Right: Legal mentions */}
          <div>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "rgba(245,242,237,0.3)",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: "16px",
              }}
            >
              MENTIONS LÉGALES
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "rgba(245,242,237,0.4)",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.9,
              }}
            >
              <p style={{ margin: "0 0 4px" }}>
                Atom Buyer Club est une marque commerciale de :
              </p>
              <p style={{ margin: "0 0 4px", color: "rgba(245,242,237,0.6)", fontWeight: 500 }}>
                SAS MICROSURFACES
              </p>
              <p style={{ margin: "0 0 4px" }}>
                RCS Paris 937 663 052 — Capital social : 1 000 €
              </p>
              <p style={{ margin: "0 0 4px" }}>
                Siège social : 97 rue de Turenne, 75003 Paris
              </p>
              <p style={{ margin: "0 0 4px" }}>Président : Adrien Helle</p>
              <p style={{ margin: "0 0 4px" }}>
                Carte professionnelle « Transactions sur immeubles et fonds de commerce »
              </p>
              <p style={{ margin: "0 0 4px" }}>N° CPI 7501 2025 000 000 458</p>
              <p style={{ margin: "0 0 4px" }}>
                Délivrée par la CCI de Paris Île-de-France
              </p>
              <p style={{ margin: "0 0 4px" }}>
                Garantie financière : Axa France IARD S.A. — 150 000 €
              </p>
              <p style={{ margin: 0 }}>
                Ne détient pas de fonds pour le compte de la clientèle.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(245,242,237,0.06)",
            marginBottom: "32px",
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "rgba(245,242,237,0.25)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            © 2025 Atom Buyer Club — Microsurfaces SAS. Tous droits réservés.
          </span>

          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {[
              { label: "Mentions légales", href: "/mentions-legales" },
              {
                label: "Politique de confidentialité",
                href: "/politique-de-confidentialite",
              },
              { label: "CGU", href: "/cgu" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "12px",
                  color: "rgba(245,242,237,0.3)",
                  fontFamily: "'DM Sans', sans-serif",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(245,242,237,0.7)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(245,242,237,0.3)")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}
