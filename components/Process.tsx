"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Process() {
  const { tr } = useLanguage();
  const steps = tr.process.steps;

  return (
    <section
      id="processus"
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "300px" }}
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
            {tr.process.label}
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300,
              color: "#F5F2ED",
              margin: 0,
              letterSpacing: "-0.02em",
              maxWidth: "560px",
              lineHeight: 1.15,
            }}
          >
            {tr.process.heading}
          </h2>
        </motion.div>

        {/* Desktop: 8-column row with connector line */}
        <div className="process-desktop">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: "0",
              position: "relative",
            }}
          >
            {/* Connecting line — starts/ends at center of first/last circle */}
            <div
              style={{
                position: "absolute",
                top: "28px",
                left: "6.25%",
                right: "6.25%",
                height: "1px",
                background: "rgba(245,242,237,0.12)",
                zIndex: 0,
              }}
            />
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0, margin: "300px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                style={{ padding: "0 16px 40px", position: "relative", zIndex: 1 }}
              >
                <StepNode step={step} i={i} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: 2-column grid, no connector line */}
        <div className="process-mobile">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0",
            }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0, margin: "300px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                style={{ padding: "0 16px 40px", position: "relative" }}
              >
                <StepNode step={step} i={i} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "300px" }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{
            marginTop: "40px",
            padding: "24px 32px",
            border: "1px solid rgba(245,242,237,0.1)",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#B8975A",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontSize: "14px",
              color: "rgba(245,242,237,0.6)",
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "#F5F2ED", fontWeight: 500 }}>
              {tr.process.noteBold}
            </strong>{" "}
            {tr.process.noteDetail}
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .process-desktop { display: block; }
        .process-mobile { display: none; }
        @media (max-width: 900px) {
          .process-desktop { display: none; }
          .process-mobile { display: block; }
        }
      `}</style>
    </section>
  );
}

function StepNode({ step, i }: { step: { number: string; title: string; description: string }; i: number }) {
  return (
    <>
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: `1px solid ${i < 2 ? "#5C6BC0" : "rgba(245,242,237,0.2)"}`,
          background: i < 2 ? "#1e2140" : "#1A1A1A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "16px",
            fontWeight: 300,
            color: i < 2 ? "#5C6BC0" : "rgba(245,242,237,0.5)",
          }}
        >
          {step.number}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "20px",
          fontWeight: 400,
          color: "#F5F2ED",
          margin: "0 0 10px",
          letterSpacing: "-0.01em",
        }}
      >
        {step.title}
      </h3>
      <p
        style={{
          fontSize: "13px",
          color: "rgba(245,242,237,0.5)",
          margin: 0,
          lineHeight: 1.6,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {step.description}
      </p>
    </>
  );
}
