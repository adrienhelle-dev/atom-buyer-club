"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import BookingModal from "./BookingModal";

function FAQItem({ question, answer, index, delay }: { question: string; answer: string; index: number; delay: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ borderBottom: "1px solid #E8E3DB" }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "24px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "11px", color: "rgba(26,26,26,0.3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", flexShrink: 0 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.3 }}>
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #E8E3DB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: open ? "#5C6BC0" : "#1A1A1A" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ padding: "0 0 24px 40px", fontSize: "15px", lineHeight: 1.75, color: "rgba(26,26,26,0.65)", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { tr } = useLanguage();
  const f = tr.faq;
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section id="faq" className="section-main" style={{ padding: "120px 24px", background: "#F5F2ED" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Mobile header — shown only on small screens */}
        <div className="faq-mobile-header">
          <span style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#5C6BC0", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "16px" }}>{f.label}</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 8vw, 48px)", fontWeight: 300, color: "#1A1A1A", margin: "0 0 40px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            {f.heading}
          </h2>
        </div>

        <div className="faq-grid">
          {/* Sidebar — hidden on mobile */}
          <div className="faq-sidebar">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "300px" }}
            transition={{ duration: 0.7 }}
          >
            <span style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#5C6BC0", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "16px" }}>{f.label}</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 48px)", fontWeight: 300, color: "#1A1A1A", margin: "0 0 24px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              {f.heading}
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(26,26,26,0.55)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, margin: "0 0 32px" }}>
              {f.notFound}
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "#1A1A1A", color: "#F5F2ED", borderRadius: "2px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", fontFamily: "'DM Sans', sans-serif" }}
            >
              {f.contact}
            </button>
          </motion.div>
          </div>

          {/* Accordion */}
          <div>
            {f.items.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} index={i} delay={i * 0.05} />
            ))}

            {/* Mobile-only contact CTA below accordion */}
            <div className="faq-mobile-cta">
              <p style={{ fontSize: "14px", color: "rgba(26,26,26,0.55)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, margin: "0 0 16px" }}>
                {f.notFound}
              </p>
              <button
                onClick={() => setBookingOpen(true)}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "#1A1A1A", color: "#F5F2ED", borderRadius: "2px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", fontFamily: "'DM Sans', sans-serif" }}
              >
                {f.contact}
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

      <style jsx>{`
        .faq-mobile-header { display: none; }
        .faq-mobile-cta { display: none; }
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 80px;
          align-items: start;
        }
        .faq-sidebar {
          position: sticky;
          top: 120px;
        }
        @media (max-width: 768px) {
          .faq-mobile-header { display: block; }
          .faq-mobile-cta { display: block; padding-top: 40px; border-top: 1px solid #E8E3DB; margin-top: 8px; }
          .faq-grid { grid-template-columns: 1fr; gap: 0; }
          .faq-sidebar { display: none; }
        }
      `}</style>
    </section>
  );
}
