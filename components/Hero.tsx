"use client";
import { MEMBER_COUNT, JOIN_LANDING_URL, SHOWROOM_URL } from "@/lib/config";
import { trackLead, trackViewContent } from "@/lib/track";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

export default function Hero() {
  const { tr } = useLanguage();
  const h = tr.hero;
  const [countStarted, setCountStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setCountStarted(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const memberCount = useCountUp(parseInt(MEMBER_COUNT), 2200, countStarted);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1A1A1A 0%, #2C2526 50%, #1E2235 100%)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(245,242,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,237,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", top: "20%", right: "10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(92,107,192,0.12) 0%, transparent 70%)", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(184,151,90,0.08) 0%, transparent 70%)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "120px 24px 80px", position: "relative", zIndex: 1, width: "100%" }}>
        <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: "900px" }}>
          <motion.div variants={item}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", border: "1px solid rgba(245,242,237,0.2)", borderRadius: "100px", color: "rgba(245,242,237,0.6)", fontSize: "12px", letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif", marginBottom: "32px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#B8975A", display: "inline-block" }}/>
              {h.tag}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(48px, 8vw, 88px)", fontWeight: 300, lineHeight: 1.05, color: "#F5F2ED", margin: "0 0 32px", letterSpacing: "-0.02em" }}
          >
            {h.h1a}{" "}
            <em style={{ fontStyle: "italic", color: "#B8975A" }}>{h.h1em}</em>{" "}
            {h.h1b}
          </motion.h1>

          <motion.p
            variants={item}
            style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 300, color: "rgba(245,242,237,0.7)", maxWidth: "560px", lineHeight: 1.7, margin: "0 0 48px", fontFamily: "'DM Sans', sans-serif" }}
          >
            {h.subtitle}
          </motion.p>

          <motion.div variants={item} style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "72px" }}>
            <a
              href={JOIN_LANDING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLead("hero")}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 32px", background: "#5C6BC0", color: "#FFFFFF", borderRadius: "2px", textDecoration: "none", fontSize: "14px", fontWeight: "500", letterSpacing: "0.04em", fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s, transform 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#4a5ab8"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#5C6BC0"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {h.ctaJoin}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a
              href={SHOWROOM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackViewContent("hero_realisations")}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 32px", background: "transparent", color: "#F5F2ED", border: "1px solid rgba(245,242,237,0.3)", borderRadius: "2px", textDecoration: "none", fontSize: "14px", fontWeight: "400", letterSpacing: "0.04em", fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.2s, background 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,242,237,0.7)"; e.currentTarget.style.background = "rgba(245,242,237,0.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,242,237,0.3)"; e.currentTarget.style.background = "transparent"; }}
            >
              {h.ctaProjects}
            </a>
          </motion.div>

          <motion.div
            variants={item}
            style={{ display: "flex", alignItems: "center", gap: "40px", paddingTop: "40px", borderTop: "1px solid rgba(245,242,237,0.1)", flexWrap: "wrap" }}
          >
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 300, color: "#F5F2ED", lineHeight: 1, letterSpacing: "-0.02em" }}>
                {memberCount.toLocaleString("fr-FR")}
              </div>
              <div style={{ fontSize: "12px", color: "rgba(245,242,237,0.5)", letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif", marginTop: "6px" }}>{h.membersLabel}</div>
            </div>
            <div style={{ width: "1px", height: "48px", background: "rgba(245,242,237,0.15)" }}/>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 300, color: "#F5F2ED", lineHeight: 1, letterSpacing: "-0.02em" }}>Paris</div>
              <div style={{ fontSize: "12px", color: "rgba(245,242,237,0.5)", letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif", marginTop: "6px" }}>{h.locationLabel}</div>
            </div>
            <div style={{ width: "1px", height: "48px", background: "rgba(245,242,237,0.15)" }}/>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 300, color: "#B8975A", lineHeight: 1, letterSpacing: "-0.02em" }}>0%</div>
              <div style={{ fontSize: "12px", color: "rgba(245,242,237,0.5)", letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif", marginTop: "6px" }}>{h.marginLabel}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
      >
        <span style={{ fontSize: "11px", color: "rgba(245,242,237,0.4)", letterSpacing: "0.15em", fontFamily: "'DM Sans', sans-serif" }}>{h.scroll}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} style={{ color: "rgba(245,242,237,0.4)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
