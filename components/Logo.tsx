interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

// variant="dark"  → dark-colored logo, for light/cream backgrounds (navbar)
// variant="light" → light-colored logo, for dark backgrounds (footer)
export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const src =
    variant === "light"
      ? "/assets/atom-logo-ondark.svg"   // cream fill, for dark bg
      : "/assets/atom-logo-onlight.svg"; // dark fill, for light bg

  const subColor =
    variant === "light"
      ? "rgba(245,242,237,0.5)"
      : "rgba(28,28,28,0.4)";

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "5px",
      }}
    >
      {/* Official Atom SVG logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="atom"
        height={22}
        style={{ display: "block", width: "auto" }}
      />
      {/* "buyers club" below */}
      <span
        style={{
          fontFamily: "var(--font-dm-sans), 'DM Sans', Arial, sans-serif",
          fontSize: "8.5px",
          fontWeight: 400,
          letterSpacing: "4px",
          color: subColor,
          textTransform: "uppercase",
          paddingLeft: "1px",
          lineHeight: 1,
        }}
      >
        buyers club
      </span>
    </div>
  );
}
