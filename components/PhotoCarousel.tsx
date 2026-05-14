"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function PhotoCarousel() {
  const { lang } = useLanguage();
  const isFr = lang === "fr";

  const [photos, setPhotos] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    fetch("/api/realisations")
      .then((r) => r.json())
      .then((data: string[]) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % photos.length),
    [photos.length]
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + photos.length) % photos.length),
    [photos.length]
  );

  // Auto-advance every 5s
  useEffect(() => {
    if (photos.length < 2 || paused) return;
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, photos.length, paused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  // Label derived from filename e.g. "saint-claude-01.jpg" → "Saint Claude"
  function labelFromPath(p: string) {
    const file = p.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
    return file
      .replace(/-\d+$/, "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return (
    <section style={{ background: "#0f0e0c", padding: "80px 0 0" }}>
      {/* Section header */}
      <div
        style={{
          padding: "0 24px 48px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "200px" }}
          transition={{ duration: 0.7 }}
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
            {isFr ? "GALERIE" : "GALLERY"}
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300,
              color: "#F5F2ED",
              margin: 0,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {isFr ? "Nos réalisations" : "Our projects"}
          </h2>
        </motion.div>
      </div>

      {/* Carousel */}
      <div
        style={{ position: "relative", width: "100%", overflow: "hidden" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {loading ? (
          /* Loading state */
          <div
            style={{
              height: "clamp(300px, 56.25vw, 900px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "1px",
                background: "rgba(245,242,237,0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "40%",
                  background: "rgba(245,242,237,0.3)",
                  animation: "slide 1.2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        ) : photos.length === 0 ? (
          /* Empty state */
          <div
            style={{
              height: "clamp(300px, 56.25vw, 900px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              borderTop: "1px solid rgba(245,242,237,0.06)",
              borderBottom: "1px solid rgba(245,242,237,0.06)",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              style={{ opacity: 0.2 }}
            >
              <rect
                x="4"
                y="8"
                width="32"
                height="24"
                rx="2"
                stroke="#F5F2ED"
                strokeWidth="1.5"
              />
              <circle
                cx="14"
                cy="16"
                r="3"
                stroke="#F5F2ED"
                strokeWidth="1.5"
              />
              <path
                d="M4 28l8-8 6 6 4-4 8 8"
                stroke="#F5F2ED"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "0.15em",
                color: "rgba(245,242,237,0.25)",
                fontFamily: "'DM Sans', sans-serif",
                margin: 0,
              }}
            >
              {isFr
                ? "DÉPOSEZ VOS PHOTOS DANS public/realisations/"
                : "DROP PHOTOS IN public/realisations/"}
            </p>
          </div>
        ) : (
          /* Photo carousel */
          <>
            <div
              style={{
                position: "relative",
                height: "clamp(300px, 56.25vw, 900px)",
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${photos[current]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </AnimatePresence>

              {/* Dark gradient overlay bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "160px",
                  background:
                    "linear-gradient(to top, rgba(15,14,12,0.85) 0%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Photo label */}
              <div
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "32px",
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "22px",
                    fontWeight: 300,
                    color: "#F5F2ED",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {labelFromPath(photos[current])}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    color: "rgba(245,242,237,0.45)",
                    fontFamily: "'DM Sans', sans-serif",
                    marginTop: "4px",
                  }}
                >
                  {current + 1} / {photos.length}
                </span>
              </div>

              {/* Prev / Next arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Photo précédente"
                    style={{
                      position: "absolute",
                      left: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      border: "1px solid rgba(245,242,237,0.25)",
                      background: "rgba(15,14,12,0.5)",
                      backdropFilter: "blur(6px)",
                      color: "#F5F2ED",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 3,
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(245,242,237,0.6)";
                      e.currentTarget.style.background = "rgba(15,14,12,0.8)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(245,242,237,0.25)";
                      e.currentTarget.style.background = "rgba(15,14,12,0.5)";
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M10 3L5 8l5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    aria-label="Photo suivante"
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      border: "1px solid rgba(245,242,237,0.25)",
                      background: "rgba(15,14,12,0.5)",
                      backdropFilter: "blur(6px)",
                      color: "#F5F2ED",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 3,
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(245,242,237,0.6)";
                      e.currentTarget.style.background = "rgba(15,14,12,0.8)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(245,242,237,0.25)";
                      e.currentTarget.style.background = "rgba(15,14,12,0.5)";
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M6 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Dot navigation + progress bar */}
            {photos.length > 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "20px 0 28px",
                }}
              >
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Photo ${i + 1}`}
                    style={{
                      width: i === current ? "28px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      border: "none",
                      background:
                        i === current
                          ? "#B8975A"
                          : "rgba(245,242,237,0.2)",
                      cursor: "pointer",
                      padding: 0,
                      transition: "width 0.3s ease, background 0.3s ease",
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom padding */}
      <div style={{ height: "60px" }} />

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </section>
  );
}
