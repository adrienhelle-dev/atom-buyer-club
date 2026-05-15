"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

function Stars() {
  return (
    <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#B8975A">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { tr } = useLanguage();
  const t = tr.testimonials;

  return (
    <section className="section-main" style={{ padding: "120px 24px", background: "#1A1A1A", overflow: "hidden" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "300px" }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "64px" }}
        >
          <span style={{
            fontSize: "11px", letterSpacing: "0.15em", color: "#B8975A",
            fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "16px",
          }}>
            {t.label}
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 300, color: "#F5F2ED", margin: 0,
            letterSpacing: "-0.02em", lineHeight: 1.15,
          }}>
            {t.heading}
          </h2>
        </motion.div>

        {/* Grid — 3 col desktop · 2 col tablet · 1 col mobile */}
        <div className="testimonials-grid">
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: "200px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{
                padding: "32px 28px",
                background: "rgba(245,242,237,0.04)",
                borderRadius: "2px",
                border: "1px solid rgba(245,242,237,0.06)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Quote mark */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "56px",
                lineHeight: 1,
                color: "rgba(184,151,90,0.25)",
                marginBottom: "-4px",
                userSelect: "none",
              }}>
                "
              </div>

              <Stars />

              {/* Quote text — flexGrow pushes avatar to bottom */}
              <p style={{
                fontSize: "14px",
                lineHeight: 1.75,
                color: "rgba(245,242,237,0.72)",
                fontFamily: "'DM Sans', sans-serif",
                fontStyle: "italic",
                margin: "0 0 28px",
                flexGrow: 1,
              }}>
                {item.quote}
              </p>

              {/* Avatar + identity */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "38px", height: "38px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #5C6BC0 0%, #B8975A 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "17px", fontWeight: 300, color: "#FFFFFF",
                  }}>
                    {item.name[0]}
                  </span>
                </div>
                <div>
                  <div style={{
                    fontSize: "13px", fontWeight: 500,
                    color: "#F5F2ED", fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "rgba(245,242,237,0.38)",
                    fontFamily: "'DM Sans', sans-serif",
                    marginTop: "2px",
                  }}>
                    {item.role} · {item.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        /* Tablet: 2 columns */
        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        /* Mobile: 1 column */
        @media (max-width: 600px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
}
