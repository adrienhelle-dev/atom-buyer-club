"use client";

import { motion } from "framer-motion";

const projects = [
  // ── Disponible ──────────────────────────────────────────────────────────────
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
    name: "Vieille du Temple",
    location: "Paris 3e",
    surface: "12 m² Carrez",
    floor: "4e étage",
    fai: "165 000 €",
    travaux: "35 000 €",
    totalAllin: "222 925 €",
    loyer: "1 050 €/mois",
    mensualite: "1 015 €/mois",
    rendement: "~5,7%",
    metro: "500m (Saint-Sébastien - Froissart)",
    status: "Disponible",
    statusColor: "#22c55e",
    statusBg: "rgba(34,197,94,0.1)",
    gradient: "linear-gradient(135deg, #1A2020 0%, #1A2C2A 100%)",
  },
  {
    name: "Montmorency",
    location: "Paris 3e",
    surface: "14 m² Carrez",
    floor: "4e étage",
    fai: "155 000 €",
    travaux: "40 000 €",
    totalAllin: "217 075 €",
    loyer: "1 000 €/mois",
    mensualite: "989 €/mois",
    rendement: "~5,5%",
    metro: "300m (Arts et Métiers)",
    status: "Disponible",
    statusColor: "#22c55e",
    statusBg: "rgba(34,197,94,0.1)",
    gradient: "linear-gradient(135deg, #1A1A28 0%, #252540 100%)",
  },
  // ── Vendu ───────────────────────────────────────────────────────────────────
  {
    name: "Saint-Antoine",
    location: "Paris 11e",
    surface: "9,7 m² Carrez",
    floor: "1er étage",
    fai: "109 000 €",
    travaux: "20 000 €",
    totalAllin: "146 075 €",
    loyer: "725 €/mois",
    mensualite: "665 €/mois",
    rendement: "~6,0%",
    metro: "120m (Faidherbe - Chaligny)",
    status: "Vendu",
    statusColor: "#9ca3af",
    statusBg: "rgba(156,163,175,0.1)",
    gradient: "linear-gradient(135deg, #2A2A2A 0%, #3A3330 100%)",
  },
  {
    name: "Demours",
    location: "Paris 17e",
    surface: "12 m²",
    floor: "6e étage",
    fai: "105 000 €",
    travaux: "35 000 €",
    totalAllin: "157 825 €",
    loyer: "870 €/mois",
    mensualite: "719 €/mois",
    rendement: "~6,6%",
    metro: "600m (Péreire - Levallois)",
    status: "Vendu",
    statusColor: "#9ca3af",
    statusBg: "rgba(156,163,175,0.1)",
    gradient: "linear-gradient(135deg, #28241E 0%, #3A3220 100%)",
  },
  {
    name: "Lacroix",
    location: "Paris 17e",
    surface: "12,3 m² Carrez",
    floor: "Rez-de-chaussée",
    fai: "105 000 €",
    travaux: "35 000 €",
    totalAllin: "157 825 €",
    loyer: "850 €/mois",
    mensualite: "719 €/mois",
    rendement: "~6,5%",
    metro: "200m (Brochant)",
    status: "Vendu",
    statusColor: "#9ca3af",
    statusBg: "rgba(156,163,175,0.1)",
    gradient: "linear-gradient(135deg, #201E28 0%, #302840 100%)",
  },
  {
    name: "Rosiers",
    location: "Paris 4e",
    surface: "13,9 m² Carrez",
    floor: "2e étage",
    fai: "175 000 €",
    travaux: "35 000 €",
    totalAllin: "232 025 €",
    loyer: "1 050 €/mois",
    mensualite: "1 057 €/mois",
    rendement: "~5,4%",
    metro: "350m (Saint-Paul)",
    status: "Vendu",
    statusColor: "#9ca3af",
    statusBg: "rgba(156,163,175,0.1)",
    gradient: "linear-gradient(135deg, #241A1A 0%, #3C2828 100%)",
  },
  {
    name: "Grenelle",
    location: "Paris 6e",
    surface: "14,7 m² Carrez",
    floor: "6e étage",
    fai: "190 000 €",
    travaux: "40 000 €",
    totalAllin: "255 050 €",
    loyer: "1 100 €/mois",
    mensualite: "1 162 €/mois",
    rendement: "~5,2%",
    metro: "260m (Saint-Sulpice)",
    status: "Vendu",
    statusColor: "#9ca3af",
    statusBg: "rgba(156,163,175,0.1)",
    gradient: "linear-gradient(135deg, #1E2420 0%, #283422 100%)",
  },
  {
    name: "Commerce",
    location: "Paris 15e",
    surface: "10 m² Carrez",
    floor: "6e étage",
    fai: "115 000 €",
    travaux: "35 000 €",
    totalAllin: "168 675 €",
    loyer: "890 €/mois",
    mensualite: "768 €/mois",
    rendement: "~6,3%",
    metro: "50m (Commerce)",
    status: "Vendu",
    statusColor: "#9ca3af",
    statusBg: "rgba(156,163,175,0.1)",
    gradient: "linear-gradient(135deg, #1C2028 0%, #243040 100%)",
  },
  {
    name: "Fondary",
    location: "Paris 15e",
    surface: "13,5 m² Carrez",
    floor: "2e étage",
    fai: "80 000 €",
    travaux: "85 000 €",
    totalAllin: "180 700 €",
    loyer: "850 €/mois",
    mensualite: "823 €/mois",
    rendement: "~5,6%",
    metro: "230m (Av. Émile Zola)",
    status: "Vendu",
    statusColor: "#9ca3af",
    statusBg: "rgba(156,163,175,0.1)",
    gradient: "linear-gradient(135deg, #24201C 0%, #382E24 100%)",
  },
  {
    name: "Legendre",
    location: "Paris 17e",
    surface: "11,2 m² Carrez",
    floor: "6e étage",
    fai: "120 000 €",
    travaux: "20 000 €",
    totalAllin: "159 100 €",
    loyer: "830 €/mois",
    mensualite: "725 €/mois",
    rendement: "~6,3%",
    metro: "400m (Malesherbes)",
    status: "Vendu",
    statusColor: "#9ca3af",
    statusBg: "rgba(156,163,175,0.1)",
    gradient: "linear-gradient(135deg, #1E2020 0%, #2C3030 100%)",
  },
  {
    name: "Madeleine",
    location: "Paris 8e",
    surface: "9,9 m² Carrez",
    floor: "2e étage",
    fai: "85 000 €",
    travaux: "35 000 €",
    totalAllin: "136 125 €",
    loyer: "720 €/mois",
    mensualite: "620 €/mois",
    rendement: "~6,3%",
    metro: "500m (Havre - Caumartin)",
    status: "Vendu",
    statusColor: "#9ca3af",
    statusBg: "rgba(156,163,175,0.1)",
    gradient: "linear-gradient(135deg, #201C24 0%, #342838 100%)",
  },
  {
    name: "Fédération",
    location: "Montreuil 93",
    surface: "10,6 m² Carrez",
    floor: "2e étage",
    fai: "80 000 €",
    travaux: "35 000 €",
    totalAllin: "130 700 €",
    loyer: "700 €/mois",
    mensualite: "595 €/mois",
    rendement: "~6,4%",
    metro: "500m (Croix de Chavaux)",
    status: "Vendu",
    statusColor: "#9ca3af",
    statusBg: "rgba(156,163,175,0.1)",
    gradient: "linear-gradient(135deg, #1A2024 0%, #22303A 100%)",
  },
  {
    name: "Église",
    location: "Paris 15e",
    surface: "12,6 m² Carrez",
    floor: "4e étage",
    fai: "109 000 €",
    travaux: "35 000 €",
    totalAllin: "162 165 €",
    loyer: "850 €/mois",
    mensualite: "739 €/mois",
    rendement: "~6,3%",
    metro: "350m (Charles Michels)",
    status: "Vendu",
    statusColor: "#9ca3af",
    statusBg: "rgba(156,163,175,0.1)",
    gradient: "linear-gradient(135deg, #202018 0%, #303020 100%)",
  },
  {
    name: "Faubourg du Temple",
    location: "Paris 11e",
    surface: "10,6 m²",
    floor: "3e étage",
    fai: "126 000 €",
    travaux: "5 000 €",
    totalAllin: "149 350 €",
    loyer: "750 €/mois",
    mensualite: "680 €/mois",
    rendement: "~6,0%",
    metro: "150m (Goncourt)",
    status: "Vendu",
    statusColor: "#9ca3af",
    statusBg: "rgba(156,163,175,0.1)",
    gradient: "linear-gradient(135deg, #20181A 0%, #30202A 100%)",
  },
  {
    name: "Rochechouart",
    location: "Paris 9e",
    surface: "15 m² Carrez",
    floor: "Rez-de-chaussée",
    fai: "140 000 €",
    travaux: "5 000 €",
    totalAllin: "164 400 €",
    loyer: "850 €/mois",
    mensualite: "749 €/mois",
    rendement: "~6,2%",
    metro: "100m (Barbès - Rochechouart)",
    status: "Vendu",
    statusColor: "#9ca3af",
    statusBg: "rgba(156,163,175,0.1)",
    gradient: "linear-gradient(135deg, #1C1820 0%, #282030 100%)",
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
  return (
    <section
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "300px" }}
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: "300px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.1 }}
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
                <StatRow label="Étage" value={project.floor} />
                <StatRow label="Prix FAI" value={project.fai} />
                <StatRow label="Travaux" value={project.travaux} />
                <StatRow label="Total all-in" value={project.totalAllin} />
                <StatRow label="Loyer Atom" value={project.loyer} highlight />
                <StatRow label="Mensualité" value={project.mensualite} />
                <StatRow label="Rendement brut" value={project.rendement} />
                <StatRow label="Métro" value={project.metro} />
              </div>
            </motion.div>
          ))}

          {/* Coming soon card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "300px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
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
