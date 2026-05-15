import { MEMBER_COUNT } from "@/lib/config";
import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  // Load Cormorant Garamond Light from local file (bundled in repo)
  // This avoids any network dependency at build/render time
  // Satori (next/og engine) requires TTF — WOFF2 is not supported
  const cormorantFont: ArrayBuffer = readFileSync(
    join(process.cwd(), "app/fonts/CormorantGaramond-Light.ttf")
  ).buffer as ArrayBuffer;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1C1C1C",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(245,242,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,237,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Top: logo */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span
            style={{
              fontFamily: "Cormorant",
              fontSize: 64,
              fontWeight: 300,
              color: "#EDEEE8",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            atom
          </span>
          <span
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "6px",
              color: "rgba(245,242,237,0.35)",
              textTransform: "uppercase",
            }}
          >
            BUYERS CLUB
          </span>
        </div>

        {/* Center: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              fontFamily: "Cormorant",
              fontSize: 56,
              fontWeight: 300,
              color: "#F5F2ED",
              lineHeight: 1.15,
              maxWidth: "720px",
              letterSpacing: "-0.5px",
            }}
          >
            Investissez dans le micro-logement parisien.
          </span>
          <span
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 20,
              color: "rgba(245,242,237,0.5)",
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            Sourcing · Rénovation premium · Loyer garanti dès la mise en location
          </span>
        </div>

        {/* Bottom: key stats */}
        <div style={{ display: "flex", gap: "60px", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontFamily: "Cormorant",
                fontSize: 48,
                fontWeight: 300,
                color: "#B8975A",
                lineHeight: 1,
              }}
            >
              {MEMBER_COUNT}
            </span>
            <span
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 10,
                letterSpacing: "4px",
                color: "rgba(245,242,237,0.3)",
                textTransform: "uppercase",
              }}
            >
              MEMBRES DU CLUB
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontFamily: "Cormorant",
                fontSize: 48,
                fontWeight: 300,
                color: "#B8975A",
                lineHeight: 1,
              }}
            >
              0%
            </span>
            <span
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 10,
                letterSpacing: "4px",
                color: "rgba(245,242,237,0.3)",
                textTransform: "uppercase",
              }}
            >
              MARGE SUR TRAVAUX
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontFamily: "Cormorant",
                fontSize: 48,
                fontWeight: 300,
                color: "#B8975A",
                lineHeight: 1,
              }}
            >
              Paris
            </span>
            <span
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 10,
                letterSpacing: "4px",
                color: "rgba(245,242,237,0.3)",
                textTransform: "uppercase",
              }}
            >
              EXCLUSIVEMENT
            </span>
          </div>

          {/* Domain */}
          <div
            style={{
              marginLeft: "auto",
              fontFamily: "Arial, sans-serif",
              fontSize: 14,
              color: "rgba(245,242,237,0.2)",
              letterSpacing: "0.05em",
              alignSelf: "flex-end",
            }}
          >
            atombuyersclub.fr
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Cormorant",
          data: cormorantFont,
          style: "normal",
          weight: 300,
        },
      ],
    }
  );
}
