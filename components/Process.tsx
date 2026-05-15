"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// Per-step detail bullets (bilingual, inline)
const STEP_DETAILS = {
  fr: [
    ["Validation par banque ou courtier partenaire Atom", "Simulation de capacité d'emprunt", "Structuration : nom propre, SCI ou SAS"],
    ["30 micro-logements visités par semaine", "1 à 2 dossiers transmis au club", "Analyse rendement + risques incluse"],
    ["Offre rédigée en votre nom", "Négociation prix & conditions suspensives", "Délai de réponse vendeur : 24–48h"],
    ["Notaire partenaire dédié Atom", "Devis artisans verrouillés avant signature", "Délai légal de rétractation : 10 jours"],
    ["Plans 2D + projections 3D incluses", "Sélection mobilier & matériaux premium", "Allers-retours architecte jusqu'à validation"],
    ["Financement coordonné avec la banque", "Délai dossier banque : 2 à 3 mois", "Signature notariale, remise des clés"],
    ["Chantier piloté par Atom, 0% de marge", "AMO dédiée avec reporting hebdomadaire", "Durée moyenne : 6 à 10 semaines"],
    ["Photos & visite virtuelle professionnelles", "Délai de mise en location moyen : 11 jours", "Loyer garanti dès la première mise en location"],
  ],
  en: [
    ["Bank or Atom partner broker validation", "Borrowing capacity simulation", "Structure: personal, SCI or SAS company"],
    ["30 micro-apartments visited per week", "1 to 2 files shared with the club", "Yield & risk analysis included"],
    ["Offer written in your name", "Price & suspensive condition negotiation", "Seller response time: 24–48h"],
    ["Dedicated Atom partner notary", "Contractor quotes locked before signing", "Legal withdrawal period: 10 days"],
    ["2D plans + 3D renderings included", "Premium furniture & material selection", "Back-and-forth with architect until approved"],
    ["Financing coordinated with the bank", "Bank file timeline: 2–3 months", "Notarial signing, key handover"],
    ["Site managed by Atom, 0% margin", "Dedicated project manager, weekly reports", "Average duration: 6–10 weeks"],
    ["Professional photos & virtual tour", "Average rental time: 11 days", "Rent guaranteed from first tenancy"],
  ],
};

const PHASE_LABELS = {
  fr: ["Acquisition", "Acquisition", "Acquisition", "Acquisition", "Rénovation", "Rénovation", "Rénovation", "Location"],
  en: ["Acquisition", "Acquisition", "Acquisition", "Acquisition", "Renovation", "Renovation", "Renovation", "Rental"],
};

export default function Process() {
  const { tr, lang } = useLanguage();
  const steps = tr.process.steps;
  const details = STEP_DETAILS[lang];
  const phases = PHASE_LABELS[lang];

  return (
    <section
      id="processus"
      style={{ padding: "120px 0", background: "#1A1A1A", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "300px" }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "80px" }}
        >
          <span style={{
            fontSize: "11px", letterSpacing: "0.15em", color: "#B8975A",
            fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "16px",
          }}>
            {tr.process.label}
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(28px, 3.5vw, 46px)",
            fontWeight: 300, color: "#F5F2ED", margin: 0,
            letterSpacing: "-0.02em", lineHeight: 1.15, whiteSpace: "nowrap",
          }}>
            {tr.process.heading}
          </h2>
        </motion.div>

        {/* ── Timeline ───────────────────────────────────── */}
        <div style={{ position: "relative" }}>

          {/* Vertical gold line */}
          <div style={{
            position: "absolute",
            left: "28px",
            top: "28px",
            bottom: "28px",
            width: "1px",
            background: "linear-gradient(to bottom, #B8975A 0%, rgba(184,151,90,0.15) 100%)",
          }} />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              style={{
                position: "relative",
                paddingLeft: "76px",
                paddingBottom: i < steps.length - 1 ? "0" : "0",
              }}
            >
              {/* Node */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.4, delay: i * 0.05 + 0.15, type: "spring", stiffness: 300 }}
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "32px",
                  width: "17px",
                  height: "17px",
                  borderRadius: "50%",
                  border: "1.5px solid #B8975A",
                  background: "#1A1A1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                }}
              >
                <div style={{
                  width: "5px", height: "5px",
                  borderRadius: "50%", background: "#B8975A",
                }} />
              </motion.div>

              {/* Step card */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px 80px",
                alignItems: "start",
                padding: "28px 0 28px",
                borderBottom: i < steps.length - 1 ? "1px solid rgba(245,242,237,0.07)" : "none",
              }}
              className="process-step-grid"
              >
                {/* Left */}
                <div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "80px",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(184,151,90,0.2)",
                    letterSpacing: "-3px",
                    marginBottom: "2px",
                    userSelect: "none",
                  }}>
                    {step.number}
                  </div>
                  <span style={{
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: "#B8975A",
                    fontFamily: "'DM Sans', sans-serif",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "12px",
                  }}>
                    {phases[i]}
                  </span>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 2.8vw, 38px)",
                    fontWeight: 300,
                    color: "#F5F2ED",
                    margin: 0,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}>
                    {step.title}
                  </h3>
                </div>

                {/* Right */}
                <div style={{ paddingTop: "8px" }}>
                  <p style={{
                    fontSize: "15px",
                    color: "rgba(245,242,237,0.55)",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.7,
                    fontWeight: 300,
                    margin: "0 0 20px",
                  }}>
                    {step.description}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                    {details[i].map((d, j) => (
                      <div key={j} style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontSize: "13px",
                        color: "rgba(245,242,237,0.38)",
                        fontFamily: "'DM Sans', sans-serif",
                        lineHeight: 1.5,
                      }}>
                        <span style={{
                          flexShrink: 0,
                          width: "4px", height: "4px",
                          borderRadius: "50%",
                          background: "#B8975A",
                          marginTop: "6px",
                          opacity: 0.7,
                        }} />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom note ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "300px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            marginTop: "48px",
            padding: "24px 32px",
            border: "1px solid rgba(245,242,237,0.1)",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div style={{
            width: "8px", height: "8px",
            borderRadius: "50%", background: "#B8975A", flexShrink: 0,
          }} />
          <p style={{
            fontSize: "14px", color: "rgba(245,242,237,0.6)",
            margin: 0, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6,
          }}>
            <strong style={{ color: "#F5F2ED", fontWeight: 500 }}>
              {tr.process.noteBold}
            </strong>{" "}
            {tr.process.noteDetail}
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .process-step-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 600px) {
          section {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
