"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    name: "Assomption",
    location: "Paris 16e",
    surface: "9,1 m² Carrez",
    floor: "8e avec ascenseur",
    fai: "95 000 €",
    travaux: "35 000 €",
    totalAllin: "146 975 €",
    loyer: "770 €/mois",
    mensualite: "669 €/mois",
    rendement: "~6,3%",
    metro: "290m (Ranelagh)",
    status: "Disponible",
    statusColor: "#22c55e",
    statusBg: "rgba(34,197,94,0.1)",
    gradient: "linear-gradient(135deg, #1A1A1A 0%, #2C2C3E 100%)",
  },
  {
    name: "Saint-Antoine",
    location: "Paris 11e",
    surface: "9,7 m²",
    floor: "—",
    fai: "104 000 €",
    travaux: "35 000 €",
    totalAllin: "~155 000 €",
    loyer: "850 €/mois",
    mensualite: "711 €/mois",
    rendement: "~6,5%",
    metro: "—",
    status: "Vendu",
    statusColor: "#9ca3af",
    statusBg: "rgba(156,163,175,0.1)",
    gradient: "linear-gradient(135deg, #2A2A2A 0%, #3A3330 100%)",
  },
];

interface StatRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function StatRow({ label, value, highlight }: StatRowProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: "1px solid rgba(245,242,237,0.08)",
      }}
    >
      <span
        style={{
          fontSize: "12px",
          color: "rgba(245,242,237,0.45)",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: highlight ? "16px" : "13px",
          color: highlight ? "#B8975A" : "rgba(245,242,237,0.85)",
          fontFamily: highlight ? "'Cormorant Garamond', serif" : "'DM Sans', sans-serif",
          fontWeight: highlight ? 400 : 500,
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="realisations"
      style={{
        padding: "120px 24px",
        background: "#F5F2ED",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
            RÉALISATIONS
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300,
              color: "#1A1A1A",
              margin: 0,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Nos réalisations
          </h2>
        </motion.div>

        {/* Project cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              style={{
                borderRadius: "2px",
                overflow: "hidden",
                background: "#1A1A1A",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              whileHover={{ y: -4 }}
            >
              {/* Image placeholder */}
              <div
                style={{
                  height: "220px",
                  background: project.gradient,
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "24px",
                }}
              >
                {/* Grid lines overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "linear-gradient(rgba(245,242,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,237,0.03) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* Address tag */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    width: "100%",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "28px",
                        fontWeight: 300,
                        color: "#F5F2ED",
                        lineHeight: 1,
                        marginBottom: "4px",
                      }}
                    >
                      {project.name}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "rgba(245,242,237,0.5)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {project.location}
                    </div>
                  </div>
                  {/* Status badge */}
                  <div
                    style={{
                      padding: "6px 14px",
                      borderRadius: "100px",
                      background: project.statusBg,
                      border: `1px solid ${project.statusColor}40`,
                      fontSize: "11px",
                      color: project.statusColor,
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {project.status}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div style={{ padding: "28px 28px 32px" }}>
                <StatRow label="Surface" value={project.surface} />
                <StatRow label="Prix FAI" value={project.fai} />
                <StatRow label="Travaux" value={project.travaux} />
                <StatRow label="Total all-in" value={project.totalAllin} />
                <StatRow label="Loyer Atom" value={project.loyer} highlight />
                <StatRow label="Mensualité" value={project.mensualite} />
                <StatRow label="Rendement brut" value={project.rendement} />
                {project.metro !== "—" && (
                  <StatRow label="Métro" value={project.metro} />
                )}
              </div>
            </motion.div>
          ))}

          {/* Coming soon card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              borderRadius: "2px",
              border: "1px dashed #E8E3DB",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "48px 32px",
              minHeight: "400px",
              background: "transparent",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1px solid #E8E3DB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                color: "rgba(26,26,26,0.3)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "22px",
                fontWeight: 300,
                color: "rgba(26,26,26,0.4)",
                marginBottom: "8px",
              }}
            >
              Prochaine opportunité
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(26,26,26,0.3)",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.6,
              }}
            >
              Rejoignez le club pour recevoir les prochaines fiches projet en avant-première.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
