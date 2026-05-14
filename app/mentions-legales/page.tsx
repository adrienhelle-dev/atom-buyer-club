import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Atom Buyers Club",
  description: "Mentions légales de Atom Buyers Club / Microsurfaces SAS",
};

export default function MentionsLegales() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F2ED",
        padding: "120px 24px 80px",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "rgba(26,26,26,0.5)",
            textDecoration: "none",
            marginBottom: "48px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ← Retour
        </Link>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "48px",
            fontWeight: 300,
            color: "#1A1A1A",
            margin: "0 0 48px",
            letterSpacing: "-0.02em",
          }}
        >
          Mentions légales
        </h1>

        <div
          style={{
            fontSize: "15px",
            lineHeight: 1.8,
            color: "rgba(26,26,26,0.75)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <Section title="Éditeur du site">
            <p>
              <strong>SAS MICROSURFACES</strong>
              <br />
              97 rue de Turenne, 75003 Paris
              <br />
              RCS Paris 937 663 052
              <br />
              Capital social : 1 000 €
              <br />
              Président : Adrien Helle
            </p>
          </Section>

          <Section title="Activité réglementée">
            <p>
              Atom Buyers Club est une marque commerciale de Microsurfaces SAS,
              titulaire de la carte professionnelle « Transactions sur immeubles
              et fonds de commerce » :
              <br />
              <strong>N° CPI 7501 2025 000 000 458</strong>
              <br />
              Délivrée par la CCI de Paris Île-de-France
              <br />
              Garantie financière : Axa France IARD S.A. — 150 000 €
              <br />
              Microsurfaces SAS ne détient pas de fonds pour le compte de la
              clientèle.
            </p>
          </Section>

          <Section title="Hébergement">
            <p>
              Ce site est hébergé par Vercel Inc., 340 Pine Street, Suite 900,
              San Francisco, CA 94104, États-Unis.
            </p>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, graphismes,
              logo, icônes, etc.) est la propriété exclusive de Microsurfaces SAS
              ou de ses partenaires. Toute reproduction, distribution, modification
              ou utilisation de ces contenus, sans autorisation préalable écrite,
              est strictement interdite.
            </p>
          </Section>

          <Section title="Limitation de responsabilité">
            <p>
              Les informations présentées sur ce site le sont à titre indicatif
              et ne constituent pas un conseil en investissement. Tout
              investissement immobilier comporte des risques, notamment de perte
              en capital. Les performances passées ne préjugent pas des
              performances futures.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Pour toute question relative aux présentes mentions légales :{" "}
              <a
                href="mailto:adrien.helle@microsurfaces.fr"
                style={{ color: "#5C6BC0", textDecoration: "none" }}
              >
                adrien.helle@microsurfaces.fr
              </a>
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "24px",
          fontWeight: 400,
          color: "#1A1A1A",
          margin: "0 0 16px",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
