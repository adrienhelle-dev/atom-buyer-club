"use client";

import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Sourcing",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 20l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 14h6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    features: [
      "30 micro-logements visités par semaine",
      "1 à 2 retenus et partagés au club",
      "Marché on et off-market",
      "Analyse du deal et des risques avant transmission",
    ],
  },
  {
    number: "02",
    title: "Travaux & Design",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 12h24" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 4v8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 20l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    features: [
      "Architectes en interne, artisans spécialisés micro-logement",
      "Budget moyen : 35 000 € par studio",
      "Rénovation complète : mise aux normes, électroménager, mobilier, décoration",
      "DPE F/G → D après travaux",
      "Aucune marge sur les travaux (neutralité totale)",
    ],
    highlight: true,
  },
  {
    number: "03",
    title: "Gestion & Exploitation",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L4 12v16h24V12L16 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 28V20h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="16" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    features: [
      "Option 1 (recommandée) : Atom locataire en bail société — loyer fixe contractualisé, vacance portée par Atom",
      "Option 2 : Gestion locative classique — loyers réels, 10% frais de gestion",
      "Option 3 : Récupération du bien — usage personnel ou mixte",
    ],
  },
];

export default function Services() {

  return (
    <section
      id="services"
      style={{
        padding: "120px 24px",
        background: "#F5F2ED",
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
              color: "#5C6BC0",
              fontFamily: "'DM Sans', sans-serif",
              display: "block",
              marginBottom: "16px",
            }}
          >
            NOTRE OFFRE
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300,
              color: "#1A1A1A",
              margin: 0,
              letterSpacing: "-0.02em",
              maxWidth: "560px",
              lineHeight: 1.15,
            }}
          >
            Une offre intégrale de A à Z
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2px",
          }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: "300px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              style={{
                padding: "48px 40px",
                background: service.highlight ? "#1A1A1A" : "#FFFFFF",
                borderRadius: "2px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background number */}
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "24px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "120px",
                  fontWeight: 300,
                  color: service.highlight
                    ? "rgba(245,242,237,0.04)"
                    : "rgba(26,26,26,0.04)",
                  lineHeight: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {service.number}
              </div>

              {/* Icon */}
              <div
                style={{
                  color: service.highlight ? "#B8975A" : "#5C6BC0",
                  marginBottom: "24px",
                }}
              >
                {service.icon}
              </div>

              {/* Number label */}
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  color: service.highlight ? "rgba(245,242,237,0.4)" : "rgba(26,26,26,0.4)",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: "12px",
                }}
              >
                {service.number}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: service.highlight ? "#F5F2ED" : "#1A1A1A",
                  margin: "0 0 28px",
                  letterSpacing: "-0.01em",
                }}
              >
                {service.title}
              </h3>

              {/* Features */}
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {service.features.map((feature, fi) => (
                  <li
                    key={fi}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: "14px",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: service.highlight
                        ? "rgba(245,242,237,0.7)"
                        : "rgba(26,26,26,0.7)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: service.highlight ? "#B8975A" : "#5C6BC0",
                        marginTop: "8px",
                        flexShrink: 0,
                      }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
