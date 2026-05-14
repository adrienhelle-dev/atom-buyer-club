import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Atom Buyers Club",
  description: "Politique de confidentialité et protection des données personnelles (RGPD)",
};

export default function PolitiqueConfidentialite() {
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
          Politique de confidentialité
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
          <Section title="Responsable du traitement">
            <p>
              <strong>Microsurfaces SAS</strong> — 97 rue de Turenne, 75003 Paris
              <br />
              Président : Adrien Helle
            </p>
          </Section>

          <Section title="Données collectées">
            <p>
              Dans le cadre de nos services, nous collectons les données suivantes :
            </p>
            <ul style={{ paddingLeft: "20px" }}>
              <li>Nom, prénom</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone</li>
              <li>Informations relatives à votre situation financière (capacité d&apos;emprunt)</li>
              <li>Données de navigation (cookies analytiques)</li>
            </ul>
          </Section>

          <Section title="Finalités du traitement">
            <p>
              Les données collectées sont utilisées pour :
            </p>
            <ul style={{ paddingLeft: "20px" }}>
              <li>Vous contacter dans le cadre de notre offre d&apos;accompagnement</li>
              <li>Vous transmettre des opportunités d&apos;investissement</li>
              <li>Améliorer nos services et notre site web</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </Section>

          <Section title="Durée de conservation">
            <p>
              Vos données sont conservées pendant 3 ans à compter de votre dernier
              contact avec nos équipes, sauf obligation légale contraire.
            </p>
          </Section>

          <Section title="Vos droits (RGPD)">
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD),
              vous disposez des droits suivants : accès, rectification, effacement,
              portabilité, limitation et opposition. Pour exercer ces droits, contactez
              nous à :{" "}
              <a
                href="mailto:rgpd@microsurfaces.fr"
                style={{ color: "#5C6BC0", textDecoration: "none" }}
              >
                rgpd@microsurfaces.fr
              </a>
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              Notre site utilise des cookies techniques nécessaires au fonctionnement
              et des cookies analytiques (anonymisés) pour mesurer l&apos;audience. Vous
              pouvez désactiver les cookies analytiques dans les paramètres de votre
              navigateur.
            </p>
          </Section>

          <Section title="Réclamations">
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez
              adresser une réclamation à la{" "}
              <strong>CNIL</strong> (www.cnil.fr).
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
