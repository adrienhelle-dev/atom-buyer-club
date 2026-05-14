"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

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
    status: "available" as const,
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
    status: "available" as const,
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
    status: "available" as const,
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
    status: "sold" as const,
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
    status: "sold" as const,
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
    status: "sold" as const,
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
    status: "sold" as const,
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
    status: "sold" as const,
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
    status: "sold" as const,
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
    status: "sold" as const,
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
    status: "sold" as const,
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
    status: "sold" as const,
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
    status: "sold" as const,
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
    status: "sold" as const,
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
    status: "sold" as const,
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
    status: "sold" as const,
    gradient: "linear-gradient(135deg, #1C1820 0%, #282030 100%)",
  },
];

interface StatRowProps { label: string; value: string; highlight?: boolean }

function StatRow({ label, value, highlight }: StatRowProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(245,242,237,0.08)" }}>
      <span style={{ fontSize: "12px", color: "rgba(245,242,237,0.45)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>{label}</span>
      <span style={{ fontSize: highlight ? "16px" : "13px", color: highlight ? "#B8975A" : "rgba(245,242,237,0.85)", fontFamily: highlight ? "'Cormorant Garamond', serif" : "'DM Sans', sans-serif", fontWeight: highlight ? 400 : 500 }}>{value}</span>
    </div>
  );
}

export default function Portfolio() {
  const { tr } = useLanguage();
  const p = tr.portfolio;
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".portfolio-card") as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : 360;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const allCards = [
    ...projects,
    { name: "__coming__" as const },
  ];

  return (
    <section id="realisations" style={{ padding: "120px 0", background: "#F5F2ED", overflow: "hidden" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "300px" }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "48px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}
        >
          <div>
            <span style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#5C6BC0", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "16px" }}>
              {p.label}
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: "#1A1A1A", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              {p.heading}
            </h2>
          </div>
          {/* Nav arrows */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => scroll(-1)}
              disabled={!canPrev}
              aria-label="Previous"
              style={{
                width: "44px", height: "44px", borderRadius: "50%",
                border: "1px solid #E8E3DB", background: canPrev ? "#1A1A1A" : "transparent",
                color: canPrev ? "#F5F2ED" : "#C8C3BB", cursor: canPrev ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canNext}
              aria-label="Next"
              style={{
                width: "44px", height: "44px", borderRadius: "50%",
                border: "1px solid #E8E3DB", background: canNext ? "#1A1A1A" : "transparent",
                color: canNext ? "#F5F2ED" : "#C8C3BB", cursor: canNext ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scrollable track — full bleed */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "24px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          paddingLeft: "max(24px, calc((100vw - 1280px) / 2 + 24px))",
          paddingRight: "max(24px, calc((100vw - 1280px) / 2 + 24px))",
          paddingBottom: "8px",
        }}
      >
        {allCards.map((project, i) => {
          if (project.name === "__coming__") {
            return (
              <a
                key="coming-soon"
                href="https://chat.whatsapp.com/FgUjjDMT6ofKptPEHBxocp?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-card"
                style={{
                  flexShrink: 0,
                  width: "clamp(280px, 30vw, 380px)",
                  scrollSnapAlign: "start",
                  borderRadius: "2px",
                  border: "1px dashed #E8E3DB",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "48px 32px",
                  minHeight: "520px",
                  background: "transparent",
                  textAlign: "center",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(26,26,26,0.4)";
                  e.currentTarget.style.background = "rgba(26,26,26,0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E8E3DB";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: "1px solid #E8E3DB", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", color: "rgba(26,26,26,0.3)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, color: "rgba(26,26,26,0.4)", marginBottom: "8px" }}>{p.comingSoonTitle}</div>
                <div style={{ fontSize: "13px", color: "rgba(26,26,26,0.3)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{p.comingSoonText}</div>
              </a>
            );
          }
          const proj = project as typeof projects[0];
          const isAvailable = proj.status === "available";
          const statusLabel = isAvailable ? p.available : p.sold;
          const statusColor = isAvailable ? "#22c55e" : "#9ca3af";
          const statusBg = isAvailable ? "rgba(34,197,94,0.1)" : "rgba(156,163,175,0.1)";
          return (
            <motion.div
              key={proj.name}
              className="portfolio-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: "300px" }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.08, 0.4) }}
              whileHover={{ y: -4 }}
              style={{
                flexShrink: 0,
                width: "clamp(280px, 30vw, 380px)",
                scrollSnapAlign: "start",
                borderRadius: "2px",
                overflow: "hidden",
                background: "#1A1A1A",
              }}
            >
              {/* Card header */}
              <div style={{ height: "220px", background: proj.gradient, position: "relative", display: "flex", alignItems: "flex-end", padding: "24px" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(245,242,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,237,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }}/>
                <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%" }}>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 300, color: "#F5F2ED", lineHeight: 1, marginBottom: "4px" }}>{proj.name}</div>
                    <div style={{ fontSize: "13px", color: "rgba(245,242,237,0.5)", fontFamily: "'DM Sans', sans-serif" }}>{proj.location}</div>
                  </div>
                  <div style={{ padding: "6px 14px", borderRadius: "100px", background: statusBg, border: `1px solid ${statusColor}40`, fontSize: "11px", color: statusColor, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: "0.05em" }}>
                    {statusLabel}
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div style={{ padding: "28px 28px 32px" }}>
                <StatRow label={p.surface} value={proj.surface} />
                <StatRow label={p.floor} value={proj.floor} />
                <StatRow label={p.fai} value={proj.fai} />
                <StatRow label={p.travaux} value={proj.travaux} />
                <StatRow label={p.total} value={proj.totalAllin} />
                <StatRow label={p.loyer} value={proj.loyer} highlight />
                <StatRow label={p.mensualite} value={proj.mensualite} />
                <StatRow label={p.rendement} value={proj.rendement} />
                <StatRow label={p.metro} value={proj.metro} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
