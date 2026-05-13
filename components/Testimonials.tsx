"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#B8975A">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { tr } = useLanguage();
  const t = tr.testimonials;

  return (
    <section style={{ padding: "120px 24px", background: "#1A1A1A", overflow: "hidden" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "300px" }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "80px" }}
        >
          <span style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#B8975A", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "16px" }}>{t.label}</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: "#F5F2ED", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            {t.heading}
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2px" }}>
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: "300px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ padding: "36px 32px", background: "rgba(245,242,237,0.04)", borderRadius: "2px", display: "flex", flexDirection: "column" }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "64px", lineHeight: 1, color: "rgba(184,151,90,0.3)", marginBottom: "-8px" }}>"</div>
              <Stars count={5} />
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(245,242,237,0.75)", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", margin: "0 0 28px", flexGrow: 1 }}>
                {item.quote}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #5C6BC0, #B8975A)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300, color: "#FFFFFF" }}>{item.name[0]}</span>
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "#F5F2ED", fontFamily: "'DM Sans', sans-serif" }}>{item.name}</div>
                  <div style={{ fontSize: "12px", color: "rgba(245,242,237,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{item.role} — {item.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
