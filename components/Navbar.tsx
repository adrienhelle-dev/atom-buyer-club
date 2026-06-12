"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { JOIN_LANDING_URL, SHOWROOM_URL } from "@/lib/config";
import { trackLead, trackViewContent } from "@/lib/track";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, tr } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: tr.nav.offer, href: "#services" },
    { label: tr.nav.process, href: "#processus" },
    { label: tr.nav.portfolio, href: "#realisations" },
    { label: tr.nav.faq, href: "#faq" },
  ];

  const linkColor = scrolled ? "#1A1A1A" : "#F5F2ED";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(245, 242, 237, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #E8E3DB" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <Logo variant={scrolled ? "dark" : "light"} />
        </Link>

        {/* Desktop nav */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "40px" }}
          className="hidden-mobile"
        >
          <div style={{ display: "flex", gap: "32px" }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  textDecoration: "none",
                  color: linkColor,
                  fontSize: "14px",
                  fontWeight: "400",
                  letterSpacing: "0.02em",
                  opacity: 0.75,
                  transition: "color 0.3s, opacity 0.2s",
                  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.75")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              border: `1px solid ${scrolled ? "rgba(26,26,26,0.15)" : "rgba(245,242,237,0.2)"}`,
              borderRadius: "100px",
              padding: "3px",
            }}
          >
            {(["fr", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                  fontWeight: lang === l ? 500 : 400,
                  background: lang === l ? (scrolled ? "#1A1A1A" : "rgba(245,242,237,0.2)") : "transparent",
                  color: lang === l ? (scrolled ? "#F5F2ED" : "#F5F2ED") : linkColor,
                  transition: "all 0.2s",
                  textTransform: "uppercase",
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Instagram icon */}
          <a
            href="https://www.instagram.com/atom.living?igsh=MXh4aWtudno0NW43MA=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @atom.living"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: linkColor,
              opacity: 0.55,
              transition: "color 0.3s, opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>

          <a
            href={JOIN_LANDING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackLead("navbar")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 24px",
              background: scrolled ? "#1A1A1A" : "rgba(245,242,237,0.12)",
              border: scrolled ? "none" : "1px solid rgba(245,242,237,0.3)",
              color: "#F5F2ED",
              borderRadius: "2px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "500",
              letterSpacing: "0.06em",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              transition: "background 0.3s, border 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#5C6BC0";
              e.currentTarget.style.border = "1px solid transparent";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = scrolled ? "#1A1A1A" : "rgba(245,242,237,0.12)";
              e.currentTarget.style.border = scrolled ? "none" : "1px solid rgba(245,242,237,0.3)";
            }}
          >
            {tr.nav.join}
          </a>
        </div>

        {/* Mobile hamburger */}
        <div style={{ display: "none" }} className="show-mobile">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Mobile lang toggle — même pastille que le desktop */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                border: `1px solid ${scrolled ? "rgba(26,26,26,0.15)" : "rgba(245,242,237,0.2)"}`,
                borderRadius: "100px",
                padding: "3px",
              }}
            >
              {(["fr", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "100px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: lang === l ? 500 : 400,
                    background: lang === l ? (scrolled ? "#1A1A1A" : "rgba(245,242,237,0.2)") : "transparent",
                    color: lang === l ? "#F5F2ED" : linkColor,
                    transition: "all 0.2s",
                    textTransform: "uppercase",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            {/* Instagram icon */}
            <a
              href="https://www.instagram.com/atom.living?igsh=MXh4aWtudno0NW43MA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @atom.living"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: linkColor,
                opacity: 0.55,
                transition: "color 0.3s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                color: linkColor,
                transition: "color 0.3s",
              }}
              aria-label="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {menuOpen ? (
                  <>
                    <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="1.5" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="4" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "#F5F2ED",
            borderTop: "1px solid #E8E3DB",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {navLinks.slice(0, 3).map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: "#1A1A1A",
                fontSize: "18px",
                fontWeight: "400",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={SHOWROOM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { trackViewContent("menu_realisations"); setMenuOpen(false); }}
            style={{
              textDecoration: "none",
              color: "#1A1A1A",
              fontSize: "18px",
              fontWeight: "400",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {lang === "fr" ? "Nos réalisations" : "Our projects"}
          </a>
          {navLinks.slice(3).map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: "#1A1A1A",
                fontSize: "18px",
                fontWeight: "400",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={JOIN_LANDING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackLead("navbar_mobile")}
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "#1A1A1A",
              color: "#F5F2ED",
              borderRadius: "2px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "500",
              letterSpacing: "0.06em",
              fontFamily: "'DM Sans', sans-serif",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            {tr.nav.join}
          </a>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
          .show-mobile {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
