interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "dark", className = "", size = "md" }: LogoProps) {
  const color = variant === "light" ? "#F5F2ED" : "#1C1C1C";
  const subColor = variant === "light" ? "rgba(245,242,237,0.55)" : "rgba(28,28,28,0.45)";

  const scales = { sm: 0.7, md: 1, lg: 1.4 };
  const scale = scales[size];
  const w = Math.round(180 * scale);
  const h = Math.round(72 * scale);

  return (
    <svg
      viewBox="0 0 180 72"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Atom Buyer Club"
    >
      {/* "atom" — Playfair Display Black to match the real atom logo */}
      <text
        x="0"
        y="48"
        fontFamily="var(--font-playfair), 'Playfair Display', Georgia, serif"
        fontSize="52"
        fontWeight="900"
        fill={color}
        letterSpacing="-1"
      >
        atom
      </text>
      {/* "buyer club" — light sans, generous tracking */}
      <text
        x="2"
        y="66"
        fontFamily="var(--font-dm-sans), 'DM Sans', Arial, sans-serif"
        fontSize="10"
        fontWeight="400"
        letterSpacing="5"
        fill={subColor}
      >
        BUYER CLUB
      </text>
    </svg>
  );
}
