"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "En quoi consiste votre service ?",
    answer:
      "Un accompagnement 100% clé en main pour investir dans un micro-logement à fort potentiel, de l'achat à la mise en location : sourcing, négociation, suivi notarial, conception & design, devis, suivi de travaux et mise en exploitation.",
  },
  {
    question: "Êtes-vous propriétaires des biens proposés ?",
    answer:
      "Non. Nous sourçons des actifs directement sur le marché. Leur disponibilité dépend du vendeur et du timing de décision.",
  },
  {
    question: "Peut-on négocier le prix d'achat ?",
    answer:
      "Souvent, le prix est déjà pré-négocié au maximum. L'objectif est d'aller vite sur un prix juste de marché. Nous nous efforçons de ne vous présenter que des opportunités bien pricées, que nous serions fiers d'acquérir nous-mêmes.",
  },
  {
    question: "Comment sont définis les budgets travaux ?",
    answer:
      "Les budgets sont basés sur des chiffrages réels de nos artisans et sur un projet de conception détaillé (plans / 3D). Vous recevez des devis ajustables et restez libre de les challenger.",
  },
  {
    question: "Exploitation & location : comment ça se passe ?",
    answer:
      "Trois options au choix. Option 1 (recommandée) : Atom prend le bien à bail au loyer indiqué, avec autorisation de sous-location. Loyer fixe, vacance portée par Atom. Option 2 : gestion locative classique, vous percevez les loyers réels moins 10% de frais. Option 3 : vous récupérez le bien pour usage personnel ou mixte.",
  },
  {
    question: "Garantissez-vous le budget travaux ?",
    answer:
      "Les devis sont fermes et établis avant la signature du compromis. Les aléas de chantier sont pris en charge par Atom sans supplément sauf découverte structurelle imprévue (dans ce cas, vous êtes informé avant tout engagement).",
  },
  {
    question: "Que comprennent les frais d'accompagnement ?",
    answer:
      "Les 8 900 € TTC incluent : chasse et sourcing, analyse du deal, négociation, mise en relation courtier, suivi notarial, plans & 3D, pilotage des travaux, mise en location et gestion locative initiale.",
  },
  {
    question: "Quel est le coût de votre accompagnement ?",
    answer:
      "8 900 € TTC par projet, généralement financés par la banque comme frais d'agence et déductibles fiscalement.",
  },
  {
    question: "Qu'est-ce que le bail société ?",
    answer:
      "Le bail société est conclu avec une personne morale (Atom). Il n'est pas soumis à l'encadrement des loyers. Atom sous-loue ensuite à des entreprises pour du corporate housing. Vous percevez un loyer fixe quelles que soient les occupations.",
  },
];

function FAQItem({ faq, index, delay }: { faq: (typeof faqs)[0]; index: number; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{
        borderBottom: "1px solid #E8E3DB",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "24px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span
            style={{
              fontSize: "11px",
              color: "rgba(26,26,26,0.3)",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.05em",
              flexShrink: 0,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "20px",
              fontWeight: 400,
              color: "#1A1A1A",
              lineHeight: 1.3,
            }}
          >
            {faq.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1px solid #E8E3DB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: open ? "#5C6BC0" : "#1A1A1A",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
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
            <p
              style={{
                padding: "0 0 24px 40px",
                fontSize: "15px",
                lineHeight: 1.75,
                color: "rgba(26,26,26,0.65)",
                fontFamily: "'DM Sans', sans-serif",
                margin: 0,
              }}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {

  return (
    <section
      id="faq"
      style={{
        padding: "120px 24px",
        background: "#F5F2ED",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: "300px" }}
            transition={{ duration: 0.7 }}
            style={{ position: "sticky", top: "120px" }}
          >
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "#5C6BC0",
                fontFamily: "'DM Sans', sans-serif",
                display: "block",
                marginBottom: "16px",
              }}
            >
              FAQ
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 4vw, 48px)",
                fontWeight: 300,
                color: "#1A1A1A",
                margin: "0 0 24px",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Questions fréquentes
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(26,26,26,0.55)",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.7,
                margin: "0 0 32px",
              }}
            >
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <a
              href="https://chat.whatsapp.com/FgUjjDMT6ofKptPEHBxocp?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                background: "#1A1A1A",
                color: "#F5F2ED",
                borderRadius: "2px",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.04em",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Contactez-nous
            </a>
          </motion.div>

          {/* Right: accordions */}
          <div>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 2fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          div[style*="position: sticky"] {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}
