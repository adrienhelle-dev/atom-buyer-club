"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const contacts = [
  {
    name: "Thierry Vignal",
    phone: "+33 6 37 12 47 96",
    email: "thierry.vignal@atom-capital.fr",
  },
  {
    name: "Alexandre Kiman",
    phone: "+33 6 22 05 73 64",
    email: "alexandre.kiman@atom-capital.fr",
  },
  {
    name: "Adrien Helle",
    phone: "+33 6 86 47 56 56",
    email: null,
  },
];

export default function JoinClub() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "160px 24px",
        background: "#1A1A1A",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(92,107,192,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Label */}
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "#B8975A",
              fontFamily: "'DM Sans', sans-serif",
              display: "block",
              marginBottom: "24px",
            }}
          >
            REJOINDRE
          </span>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 300,
              color: "#F5F2ED",
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            713 investisseurs ont déjà rejoint Atom.
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(245,242,237,0.6)",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.7,
              margin: "0 0 48px",
              maxWidth: "480px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Recevez nos prochaines opportunités en avant-première.
          </p>

          {/* CTA */}
          <a
            href="https://chat.whatsapp.com/PLACEHOLDER"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "18px 40px",
              background: "#5C6BC0",
              color: "#FFFFFF",
              borderRadius: "2px",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 500,
              letterSpacing: "0.04em",
              fontFamily: "'DM Sans', sans-serif",
              transition: "background 0.2s, transform 0.2s",
              marginBottom: "80px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#4a5ab8";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#5C6BC0";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* WhatsApp icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Rejoindre le groupe WhatsApp
          </a>
        </motion.div>

        {/* Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div
            style={{
              width: "48px",
              height: "1px",
              background: "rgba(245,242,237,0.15)",
              margin: "0 auto 40px",
            }}
          />
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "rgba(245,242,237,0.3)",
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: "24px",
            }}
          >
            OU CONTACTEZ L&apos;ÉQUIPE DIRECTEMENT
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "48px",
              flexWrap: "wrap",
            }}
          >
            {contacts.map((contact) => (
              <div key={contact.name} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#F5F2ED",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: "4px",
                  }}
                >
                  {contact.name}
                </div>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  style={{
                    fontSize: "13px",
                    color: "rgba(245,242,237,0.5)",
                    fontFamily: "'DM Sans', sans-serif",
                    textDecoration: "none",
                    display: "block",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F2ED")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(245,242,237,0.5)")
                  }
                >
                  {contact.phone}
                </a>
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    style={{
                      fontSize: "12px",
                      color: "rgba(245,242,237,0.35)",
                      fontFamily: "'DM Sans', sans-serif",
                      textDecoration: "none",
                      display: "block",
                      marginTop: "2px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#5C6BC0")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(245,242,237,0.35)")
                    }
                  >
                    {contact.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
