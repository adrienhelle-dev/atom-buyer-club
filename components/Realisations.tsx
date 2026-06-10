"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { JOIN_LANDING_URL, SHOWROOM_URL } from "@/lib/config";
import { trackLead, trackViewContent } from "@/lib/track";

const featuredProjects = [
  {
    name: "Tiquetonne",
    location: "Paris 2e · Sentier",
    surface: "14 m²",
    rendement: "5,7%",
    loyer: "900 €/mois",
    photo: "/realisations/realisation-02.jpg",
  },
  {
    name: "Saint-Antoine",
    location: "Paris 4e · Marais",
    surface: "13 m²",
    rendement: "5,8%",
    loyer: "850 €/mois",
    photo: "/realisations/realisation-05.jpg",
  },
  {
    name: "Ziem",
    location: "Paris 18e · Montmartre",
    surface: "13 m²",
    rendement: "5,8%",
    loyer: "800 €/mois",
    photo: "/realisations/realisation-08.jpg",
  },
];

export default function Realisations() {
  const { lang } = useLanguage();
  const isFr = lang === "fr";

  return (
    <section className="section-main" style={{ padding: "120px 0", background: "#141412", overflow: "hidden" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "300px" }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "56px", textAlign: "center" }}
        >
          <span style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#B8975A", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "20px" }}>
            {isFr ? "NOS RÉALISATIONS" : "OUR PROJECTS"}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 300, color: "#F5F2ED", margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {isFr ? "Livrés, loués, performants." : "Delivered, rented, performing."}
          </h2>
          <p style={{ fontSize: "clamp(14px, 1.8vw, 17px)", color: "rgba(245,242,237,0.45)", fontFamily: "'DM Sans', sans-serif", maxWidth: "440px", margin: "0 auto", lineHeight: 1.7 }}>
            {isFr
              ? "Des micro-logements rénovés et mis en location dans les meilleures rues de Paris."
              : "Renovated micro-apartments rented out in the best streets of Paris."}
          </p>
        </motion.div>

        {/* Stats band */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "300px" }}
          transition={{ duration: 0.6, delay: 0.12 }}
          style={{ display: "flex", maxWidth: "620px", margin: "0 auto 64px", border: "1px solid rgba(245,242,237,0.07)", borderRadius: "2px", overflow: "hidden" }}
        >
          {[
            { value: "13", label: isFr ? "PROJETS LIVRÉS" : "COMPLETED" },
            { value: "~6,2%", label: isFr ? "RENDEMENT MOYEN" : "AVG YIELD" },
            { value: "100%", label: isFr ? "TAUX D'OCCUPATION" : "OCCUPANCY" },
          ].map((stat, i, arr) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "clamp(16px, 2.5vw, 28px) clamp(12px, 2vw, 20px)",
                textAlign: "center",
                borderRight: i < arr.length - 1 ? "1px solid rgba(245,242,237,0.07)" : "none",
              }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: "#B8975A", lineHeight: 1, marginBottom: "6px" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "10px", letterSpacing: "0.12em", color: "rgba(245,242,237,0.28)", fontFamily: "'DM Sans', sans-serif" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="real-grid">
          {featuredProjects.map((proj, i) => (
            <motion.div
              key={proj.name}
              className="real-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: "200px" }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              style={{ borderRadius: "2px", overflow: "hidden", background: "#1A1A1A" }}
            >
              {/* Photo with overlay */}
              <div style={{ position: "relative", height: "clamp(260px, 32vw, 400px)", overflow: "hidden" }}>
                <Image
                  src={proj.photo}
                  alt={`${proj.name} — ${proj.location}`}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  className="real-photo"
                  style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
                />
                {/* Gradient overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.9) 100%)" }} />
                {/* Loué badge */}
                <div style={{ position: "absolute", top: "16px", right: "16px", padding: "5px 13px", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.35)", borderRadius: "100px", fontSize: "10px", color: "#4ade80", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em", fontWeight: 500 }}>
                  {isFr ? "LOUÉ" : "RENTED"}
                </div>
                {/* Content overlay */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(16px, 2vw, 24px)" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 300, color: "#F5F2ED", marginBottom: "3px", lineHeight: 1.1 }}>
                    {proj.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(245,242,237,0.5)", fontFamily: "'DM Sans', sans-serif", marginBottom: "14px", letterSpacing: "0.02em" }}>
                    {proj.location} · {proj.surface}
                  </div>
                  <div style={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 2.6vw, 30px)", color: "#B8975A", fontWeight: 300, lineHeight: 1 }}>
                        {proj.rendement}
                      </div>
                      <div style={{ fontSize: "9px", color: "rgba(245,242,237,0.35)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em", marginTop: "4px" }}>
                        {isFr ? "RENDEMENT" : "YIELD"}
                      </div>
                    </div>
                    <div style={{ width: "1px", height: "34px", background: "rgba(245,242,237,0.15)", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 2.6vw, 30px)", color: "#F5F2ED", fontWeight: 300, lineHeight: 1 }}>
                        {proj.loyer}
                      </div>
                      <div style={{ fontSize: "9px", color: "rgba(245,242,237,0.35)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em", marginTop: "4px" }}>
                        {isFr ? "LOYER GARANTI" : "GUARANTEED RENT"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA strip */}
              <a
                href={JOIN_LANDING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLead(`realisations_${proj.name.toLowerCase()}`)}
                className="real-cta"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", background: "rgba(255,255,255,0.025)", borderTop: "1px solid rgba(245,242,237,0.06)", textDecoration: "none", transition: "background 0.25s" }}
              >
                <span style={{ fontSize: "12px", color: "rgba(245,242,237,0.5)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>
                  {isFr ? "Investir dans un projet similaire" : "Invest in a similar project"}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: "rgba(245,242,237,0.25)", flexShrink: 0 }}>
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "200px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: "center", marginTop: "56px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}
        >
          <a
            href={SHOWROOM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackViewContent("realisations_showroom")}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 36px", background: "transparent", color: "rgba(245,242,237,0.6)", border: "1px solid rgba(245,242,237,0.15)", borderRadius: "2px", textDecoration: "none", fontSize: "13px", fontWeight: 400, letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,242,237,0.4)"; e.currentTarget.style.color = "#F5F2ED"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,242,237,0.15)"; e.currentTarget.style.color = "rgba(245,242,237,0.6)"; }}
          >
            {isFr ? "Voir toutes nos réalisations" : "See all our projects"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <p style={{ fontSize: "11px", color: "rgba(245,242,237,0.25)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em", margin: 0 }}>
            {isFr ? "13 projets livrés · Rénovations complètes · DPE amélioré" : "13 completed projects · Full renovations · Improved EPC"}
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .real-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        .real-card:hover .real-photo {
          transform: scale(1.04);
        }
        .real-card:hover .real-cta {
          background: rgba(92, 107, 192, 0.1);
        }
        @media (max-width: 1000px) {
          .real-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }
        }
        @media (max-width: 600px) {
          .real-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
}
