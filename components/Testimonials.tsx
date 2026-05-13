"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Marc D.",
    role: "Cadre en finance",
    location: "Investi Paris 11e",
    quote:
      "Processus ultra-fluide, du sourcing à la première mensualité. Atom m'a évité des mois de recherche infructueuse.",
    stars: 5,
    initial: "M",
  },
  {
    name: "Sophie L.",
    role: "Médecin libérale",
    location: "Investie Paris 16e",
    quote:
      "Le fait qu'Atom ne marge pas sur les travaux a été décisif. Transparence totale sur chaque poste de coût.",
    stars: 5,
    initial: "S",
  },
  {
    name: "Thomas B.",
    role: "Entrepreneur",
    location: "Investi Paris 9e",
    quote:
      "Le loyer contractualisé couvre ma mensualité dès le premier mois. C'est exactement ce que je cherchais.",
    stars: 5,
    initial: "T",
  },
  {
    name: "Céline M.",
    role: "Consultante",
    location: "Investie Paris 17e",
    quote:
      "713 membres dans le club, c'est la preuve que le modèle fonctionne. J'ai rejoint sur recommandation et je ne regrette pas.",
    stars: 5,
    initial: "C",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#B8975A">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {

  return (
    <section
      style={{
        padding: "120px 24px",
        background: "#1A1A1A",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: "300px" }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "80px" }}
        >
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "#B8975A",
              fontFamily: "'DM Sans', sans-serif",
              display: "block",
              marginBottom: "16px",
            }}
          >
            TÉMOIGNAGES
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300,
              color: "#F5F2ED",
              margin: 0,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Ils nous font confiance
          </h2>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2px",
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: "300px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                padding: "36px 32px",
                background: "rgba(245,242,237,0.04)",
                borderRadius: "2px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "64px",
                  lineHeight: 1,
                  color: "rgba(184,151,90,0.3)",
                  marginBottom: "-8px",
                }}
              >
                "
              </div>

              <Stars count={t.stars} />

              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "rgba(245,242,237,0.75)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontStyle: "italic",
                  margin: "0 0 28px",
                  flexGrow: 1,
                }}
              >
                {t.quote}
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #5C6BC0, #B8975A)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "18px",
                      fontWeight: 300,
                      color: "#FFFFFF",
                    }}
                  >
                    {t.initial}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#F5F2ED",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(245,242,237,0.4)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {t.role} — {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
