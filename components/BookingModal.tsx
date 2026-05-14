"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BOOKING_LINKS } from "@/lib/bookingLinks";
import { useLanguage } from "@/context/LanguageContext";

const team = [
  {
    key: "adrien" as const,
    name: "Adrien Helle",
    role: "Fondateur",
    roleEn: "Founder",
    phone: "+33 6 86 47 56 56",
    email: "adrien.helle@atom-capital.fr",
    initial: "A",
  },
  {
    key: "thierry" as const,
    name: "Thierry Vignal",
    role: "Fondateur",
    roleEn: "Founder",
    phone: "+33 6 37 12 47 96",
    email: "thierry.vignal@atom-capital.fr",
    initial: "T",
  },
  {
    key: "alexandre" as const,
    name: "Alexandre Kiman",
    role: "Fondateur",
    roleEn: "Founder",
    phone: "+33 6 22 05 73 64",
    email: "alexandre.kiman@atom-capital.fr",
    initial: "A",
  },
];

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const { lang } = useLanguage();
  const isFr = lang === "fr";

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0, zIndex: 999,
              background: "rgba(26,26,26,0.7)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, x: "-50%", y: "calc(-50% + 16px)" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.97, x: "-50%", y: "calc(-50% + 8px)" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", zIndex: 1000,
              top: "50%", left: "50%",
              width: "min(480px, 92vw)",
              background: "#F5F2ED",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
            }}
          >
            {/* Header */}
            <div style={{ padding: "28px 32px 20px", borderBottom: "1px solid #E8E3DB", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 300, color: "#1A1A1A", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
                  {isFr ? "Prendre rendez-vous" : "Book a meeting"}
                </h3>
                <p style={{ fontSize: "13px", color: "rgba(26,26,26,0.5)", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
                  {isFr ? "Choisissez un membre de l'équipe" : "Choose a team member"}
                </p>
              </div>
              <button
                onClick={onClose}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(26,26,26,0.4)", padding: "4px", borderRadius: "4px", marginTop: "-2px" }}
                aria-label="Fermer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Team members */}
            <div style={{ padding: "16px 24px 28px" }}>
              {team.map((person) => (
                <div
                  key={person.key}
                  style={{
                    display: "flex", alignItems: "center", gap: "16px",
                    padding: "16px", borderRadius: "2px",
                    border: "1px solid #E8E3DB", marginBottom: "10px",
                    background: "#FFFFFF",
                  }}
                >
                  {/* Avatar */}
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg, #5C6BC0, #B8975A)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 300, color: "#FFFFFF" }}>{person.initial}</span>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>{person.name}</div>
                    <div style={{ fontSize: "12px", color: "rgba(26,26,26,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
                      {isFr ? person.role : person.roleEn}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={BOOKING_LINKS[person.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      padding: "9px 16px", background: "#1A1A1A", color: "#F5F2ED",
                      borderRadius: "2px", textDecoration: "none",
                      fontSize: "12px", fontWeight: 500, letterSpacing: "0.04em",
                      fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
                      transition: "background 0.2s",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#5C6BC0"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#1A1A1A"; }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {isFr ? "Réserver" : "Book"}
                  </a>
                </div>
              ))}

              {/* Or direct contact */}
              <p style={{ fontSize: "12px", color: "rgba(26,26,26,0.4)", fontFamily: "'DM Sans', sans-serif", textAlign: "center", margin: "12px 0 0" }}>
                {isFr ? "Ou écrivez-nous directement : " : "Or email us directly: "}
                <a href="mailto:contact@atom-capital.fr" style={{ color: "#5C6BC0", textDecoration: "none" }}>contact@atom-capital.fr</a>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
