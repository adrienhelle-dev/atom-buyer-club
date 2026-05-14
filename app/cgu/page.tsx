import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CGU — Atom Buyers Club",
  description: "Conditions générales d'utilisation du site Atom Buyers Club",
};

export default function CGU() {
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
            margin: "0 0 16px",
            letterSpacing: "-0.02em",
          }}
        >
          Conditions générales d&apos;utilisation
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(26,26,26,0.4)",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: "48px",
          }}
        >
          Dernière mise à jour : janvier 2025
        </p>

        <div
          style={{
            fontSize: "15px",
            lineHeight: 1.8,
            color: "rgba(26,26,26,0.75)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <Section title="1. Objet">
            <p>
              Les présentes conditions générales d&apos;utilisation (CGU) régissent
              l&apos;accès et l&apos;utilisation du site web atomliving.fr (ci-après
              « le Site ») édité par Microsurfaces SAS.
            </p>
          </Section>

          <Section title="2. Accès au site">
            <p>
              L&apos;accès au Site est gratuit et ouvert à tout utilisateur disposant
              d&apos;un accès à Internet. Les coûts de connexion et d&apos;équipement
              nécessaires à l&apos;accès au Site sont à la charge exclusive de
              l&apos;utilisateur.
            </p>
          </Section>

          <Section title="3. Nature de l'information">
            <p>
              Les contenus présentés sur ce site sont fournis à titre indicatif
              et informatif. Ils ne constituent en aucun cas un conseil en
              investissement, une recommandation personnalisée ou une offre de
              service financier. Tout investissement comporte des risques de perte
              en capital.
            </p>
          </Section>

          <Section title="4. Propriété intellectuelle">
            <p>
              L&apos;ensemble des éléments constitutifs du Site (textes, images,
              logos, structure, code) est la propriété exclusive de Microsurfaces SAS.
              Toute reproduction totale ou partielle est interdite sans accord
              préalable écrit.
            </p>
          </Section>

          <Section title="5. Responsabilité">
            <p>
              Microsurfaces SAS s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à
              jour des informations diffusées sur le Site. Toutefois, elle ne peut
              garantir l&apos;exactitude, la complétude ou l&apos;actualité des
              informations. L&apos;utilisation des informations du Site est faite sous
              la responsabilité exclusive de l&apos;utilisateur.
            </p>
          </Section>

          <Section title="6. Liens hypertextes">
            <p>
              Le Site peut contenir des liens vers des sites tiers. Microsurfaces
              SAS n&apos;exerce aucun contrôle sur ces sites et décline toute
              responsabilité quant à leur contenu.
            </p>
          </Section>

          <Section title="7. Droit applicable">
            <p>
              Les présentes CGU sont soumises au droit français. En cas de litige,
              les tribunaux de Paris seront seuls compétents.
            </p>
          </Section>

          <Section title="8. Contact">
            <p>
              Pour toute question :{" "}
              <a
                href="mailto:contact@microsurfaces.fr"
                style={{ color: "#5C6BC0", textDecoration: "none" }}
              >
                contact@microsurfaces.fr
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
