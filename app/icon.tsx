import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#1C1C1C",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
      }}
    >
      <span
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 34,
          fontWeight: 700,
          color: "#EDEEE8",
          lineHeight: 1,
          marginTop: 2,
        }}
      >
        a
      </span>
    </div>,
    { ...size }
  );
}
