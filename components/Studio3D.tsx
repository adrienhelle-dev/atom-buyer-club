"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Studio3D() {
  const { lang } = useLanguage();
  const isFr = lang === "fr";

  // L'iframe Three.js avale wheel/touch dès le survol et bloque le scroll de
  // page : on la laisse inerte (pointer-events: none) tant que l'utilisateur
  // n'a pas cliqué, et on la désactive dès que la souris sort ou que la
  // section quitte le viewport (cas mobile).
  const [active, setActive] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !wrapRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) setActive(false); },
      { threshold: 0.1 }
    );
    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, [active]);

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
      <div
        ref={wrapRef}
        className="studio-iframe-wrap"
        onMouseLeave={() => setActive(false)}
      >
        <iframe
          src={`/studio-3d.html?lang=${lang}`}
          title={isFr ? "Visualisation 3D Atom Living" : "Atom Living 3D visualisation"}
          style={{ width: "100%", height: "100%", border: "none", display: "block", pointerEvents: active ? "auto" : "none" }}
          allow="accelerometer; autoplay"
        />

        {!active && (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={isFr ? "Activer la visualisation 3D" : "Activate the 3D viewer"}
            className="studio-activate-overlay"
          >
            <span className="studio-activate-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              {isFr ? "Cliquer pour explorer en 3D" : "Click to explore in 3D"}
            </span>
          </button>
        )}

        {active && (
          <button
            type="button"
            onClick={() => setActive(false)}
            aria-label={isFr ? "Quitter la 3D" : "Exit 3D"}
            className="studio-exit-chip"
          >
            ✕ {isFr ? "Quitter la 3D" : "Exit 3D"}
          </button>
        )}
      </div>
      <style jsx>{`
        .studio-iframe-wrap {
          width: 100%;
          height: clamp(600px, 90vh, 1100px);
          position: relative;
        }
        .studio-activate-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          margin: 0;
          cursor: pointer;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 0 0 28px;
        }
        .studio-activate-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          border-radius: 100px;
          background: rgba(15, 14, 12, 0.72);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(245, 242, 237, 0.18);
          color: rgba(245, 242, 237, 0.85);
          font-size: 12.5px;
          letter-spacing: 0.06em;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .studio-activate-overlay:hover .studio-activate-chip {
          background: rgba(184, 151, 90, 0.92);
          border-color: transparent;
          color: #0f0e0c;
        }
        .studio-exit-chip {
          position: absolute;
          top: 16px;
          right: 16px;
          padding: 8px 16px;
          border-radius: 100px;
          background: rgba(15, 14, 12, 0.72);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(245, 242, 237, 0.18);
          color: rgba(245, 242, 237, 0.85);
          font-size: 12px;
          letter-spacing: 0.05em;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .studio-exit-chip:hover {
          background: rgba(245, 242, 237, 0.12);
          color: #f5f2ed;
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
