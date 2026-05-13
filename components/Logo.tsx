interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const color = variant === "light" ? "#FFFFFF" : "#1A1A1A";
  const subColor = variant === "light" ? "rgba(255,255,255,0.7)" : "rgba(26,26,26,0.6)";

  return (
    <svg
      viewBox="0 0 200 70"
      width="140"
      height="49"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Atom Buyer Club"
    >
      <text
        x="0"
        y="42"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="40"
        fontWeight="300"
        letterSpacing="2"
        fill={color}
      >
        atom
      </text>
      <text
        x="2"
        y="62"
        fontFamily="'DM Sans', Arial, sans-serif"
        fontSize="11"
        fontWeight="400"
        letterSpacing="4"
        fill={subColor}
        textAnchor="start"
      >
        BUYER CLUB
      </text>
    </svg>
  );
}
