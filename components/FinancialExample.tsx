"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function FinancialExample() {
  const { tr } = useLanguage();
  const f = tr.financial;

  return (
    <section style={{ padding: "120px 24px", background: "#F5F2ED" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "300px" }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "80px" }}
        >
          <span style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#5C6BC0", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "16px" }}>{f.label}</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: "#1A1A1A", margin: 0, letterSpacing: "-0.02em", maxWidth: "560px", lineHeight: 1.15 }}>
            {f.heading}
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "start" }}>
          {/* Cost table */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0, margin: "300px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ background: "#FFFFFF", borderRadius: "2px", overflow: "hidden" }}
          >
            <div style={{ padding: "24px 32px", borderBottom: "1px solid #E8E3DB", background: "#1A1A1A" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 400, color: "#F5F2ED", margin: 0 }}>{f.structureTitle}</h3>
            </div>
            {f.costItems.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: i < f.costItems.length - 1 ? "1px solid #E8E3DB" : "none", background: item.bold ? "#F5F2ED" : "transparent" }}>
                <span style={{ fontSize: "14px", color: item.bold ? "#1A1A1A" : "rgba(26,26,26,0.65)", fontWeight: item.bold ? 600 : 400, fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
                <span style={{ fontSize: item.bold ? "16px" : "14px", color: item.bold ? "#1A1A1A" : "rgba(26,26,26,0.8)", fontWeight: item.bold ? 600 : 500, fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.02em" }}>{item.value}</span>
              </div>
            ))}
            <div style={{ padding: "16px 32px", background: "#E8E3DB" }}>
              <p style={{ fontSize: "12px", color: "rgba(26,26,26,0.5)", margin: 0, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>{f.hypothesis}</p>
            </div>
          </motion.div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0, margin: "300px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}
            >
              <div style={{ padding: "32px 28px", background: "#FFFFFF", borderRadius: "2px 0 0 0" }}>
                <div style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(26,26,26,0.4)", fontFamily: "'DM Sans', sans-serif", marginBottom: "8px" }}>{f.loyerLabel}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 300, color: "#5C6BC0", lineHeight: 1 }}>770 €</div>
                <div style={{ fontSize: "12px", color: "rgba(26,26,26,0.4)", fontFamily: "'DM Sans', sans-serif", marginTop: "4px" }}>/mois</div>
              </div>
              <div style={{ padding: "32px 28px", background: "#FFFFFF", borderRadius: "0 2px 0 0" }}>
                <div style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(26,26,26,0.4)", fontFamily: "'DM Sans', sans-serif", marginBottom: "8px" }}>{f.mensLabel}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 300, color: "#1A1A1A", lineHeight: 1 }}>669 €</div>
                <div style={{ fontSize: "12px", color: "rgba(26,26,26,0.4)", fontFamily: "'DM Sans', sans-serif", marginTop: "4px" }}>/mois</div>
              </div>
              <div style={{ gridColumn: "1 / -1", padding: "20px 28px", background: "#1A1A1A", display: "flex", alignItems: "center", gap: "12px", borderRadius: "0 0 2px 2px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(92,107,192,0.2)", border: "1px solid rgba(92,107,192,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#5C6BC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 500, color: "#F5F2ED", fontFamily: "'DM Sans', sans-serif" }}>{f.autofinLabel}</div>
                  <div style={{ fontSize: "12px", color: "rgba(245,242,237,0.5)", fontFamily: "'DM Sans', sans-serif" }}>{f.autofinSub}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: "300px" }}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{ background: "#FFFFFF", borderRadius: "2px", padding: "32px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "8px" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: "#1A1A1A", margin: 0 }}>{f.feesTitle}</h3>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 500, color: "#5C6BC0" }}>{f.feesAmount}</span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {f.feeIncludes.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0", borderBottom: i < f.feeIncludes.length - 1 ? "1px solid #E8E3DB" : "none", fontSize: "13px", color: "rgba(26,26,26,0.7)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <path d="M5 12l5 5L20 7" stroke="#5C6BC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: "16px", fontSize: "12px", color: "rgba(26,26,26,0.45)", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", margin: "16px 0 0" }}>
                {f.feesNote}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
