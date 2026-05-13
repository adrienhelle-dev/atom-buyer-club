"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Capacité d'emprunt",
    description: "Validation banque ou courtier Atom",
  },
  {
    number: "02",
    title: "Sélection",
    description: "Fiche projet WhatsApp + visite",
  },
  {
    number: "03",
    title: "Offre d'achat",
    description: "Au nom de Microsurfaces avec substitution",
  },
  {
    number: "04",
    title: "Promesse",
    description: "Notaire + devis affinés",
  },
  {
    number: "05",
    title: "Financement + acte",
    description: "2-3 mois dossier banque",
  },
  {
    number: "06",
    title: "Travaux + location",
    description: "3-4 mois chantier puis mise en location",
  },
];

export default function Process() {

  return (
    <section
      id="processus"
      style={{
        padding: "120px 24px",
        background: "#1A1A1A",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: "300px" }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "80px" }}
        >
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "#B8975A",
              fontFamily: "'DM Sans', sans-serif",
              display: "block",
              marginBottom: "16px",
            }}
          >
            PROCESSUS
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300,
              color: "#F5F2ED",
              margin: 0,
              letterSpacing: "-0.02em",
              maxWidth: "560px",
              lineHeight: 1.15,
            }}
          >
            De la sélection à la mise en location
          </h2>
        </motion.div>

        {/* Steps — responsive grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "0",
            position: "relative",
          }}
        >
          {/* Connecting line (desktop) */}
          <div
            style={{
              position: "absolute",
              top: "28px",
              left: "5%",
              right: "5%",
              height: "1px",
              background: "rgba(245,242,237,0.1)",
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: "300px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                padding: "0 24px 48px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Node */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  border: `1px solid ${i < 2 ? "#5C6BC0" : "rgba(245,242,237,0.2)"}`,
                  background: i < 2 ? "rgba(92,107,192,0.1)" : "#1A1A1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "16px",
                    fontWeight: 300,
                    color: i < 2 ? "#5C6BC0" : "rgba(245,242,237,0.5)",
                  }}
                >
                  {step.number}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "20px",
                  fontWeight: 400,
                  color: "#F5F2ED",
                  margin: "0 0 10px",
                  letterSpacing: "-0.01em",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(245,242,237,0.5)",
                  margin: 0,
                  lineHeight: 1.6,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: "300px" }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{
            marginTop: "40px",
            padding: "24px 32px",
            border: "1px solid rgba(245,242,237,0.1)",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#B8975A",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontSize: "14px",
              color: "rgba(245,242,237,0.6)",
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "#F5F2ED", fontWeight: 500 }}>
              Délai total : 6 à 7 mois.
            </strong>{" "}
            Rétractation possible sans frais jusqu&apos;à 10 jours après compromis.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
