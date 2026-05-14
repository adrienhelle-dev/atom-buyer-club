"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Studio3D() {
  const { lang } = useLanguage();
  const isFr = lang === "fr";

  return (
    <section style={{ background: "#0f0e0c", padding: "0" }}>
      {/* Section header */}
      <div style={{ padding: "80px 24px 48px", maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "200px" }}
          transition={{ duration: 0.7 }}
        >
          <span style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#B8975A", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "16px" }}>
            {isFr ? "CAS CONCRET" : "CASE STUDY"}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: "#F5F2ED", margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {isFr ? "Avant / Après en 3D" : "Before / After in 3D"}
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(245,242,237,0.5)", fontFamily: "'DM Sans', sans-serif", margin: 0, maxWidth: "480px" }}>
            {isFr
              ? "Explorez la transformation d'un studio de 9 m² — faites glisser pour comparer, orbitez pour visualiser."
              : "Explore the transformation of a 9 m² studio — drag the slider to compare, orbit to visualise."}
          </p>
        </motion.div>
      </div>

      {/* 3D viewer iframe */}
      <div className="studio-iframe-wrap">
        <iframe
          src={`/studio-3d.html?lang=${lang}`}
          title={isFr ? "Visualisation 3D Atom Living" : "Atom Living 3D visualisation"}
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          allow="accelerometer; autoplay"
        />
      </div>
      <style jsx>{`
        .studio-iframe-wrap {
          width: 100%;
          height: clamp(600px, 90vh, 1100px);
          position: relative;
        }
        @media (max-width: 900px) and (orientation: landscape) {
          .studio-iframe-wrap {
            height: min(480px, 85vw);
          }
        }
      `}</style>

      {/* Bottom padding */}
      <div style={{ height: "80px" }} />
    </section>
  );
}
