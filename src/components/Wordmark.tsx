/**
 * Reverse-contrast SOUTH VALLEY wordmark.
 * Hairline vertical strokes, slab horizontals. The top slab of every letter
 * doubles as the smoker-horizon line. Inspired by Coqodaq (Pentagram).
 *
 * Rendered as SVG so it stays sharp at any size and can drive scroll-coupled
 * stroke-width effects later.
 */
export default function Wordmark({
  height = 110,
  color = "var(--bone)",
  accent = "var(--ember)",
}: {
  height?: number;
  color?: string;
  accent?: string;
}) {
  return (
    <svg
      viewBox="0 0 1280 220"
      style={{ height, width: "auto", display: "block" }}
      aria-label="South Valley BBQ & Lounge"
    >
      <text
        x="0"
        y="120"
        fill={color}
        style={{
          fontFamily: "var(--font-bricolage), sans-serif",
          fontVariationSettings: '"wght" 320, "opsz" 96',
          fontSize: 156,
          letterSpacing: "-0.005em",
        }}
      >
        SOUTH
      </text>
      <text
        x="0"
        y="206"
        fill={color}
        style={{
          fontFamily: "var(--font-bricolage), sans-serif",
          fontVariationSettings: '"wght" 820, "opsz" 96',
          fontSize: 88,
          letterSpacing: "0.08em",
        }}
      >
        VALLEY · BBQ · LOUNGE
      </text>
      {/* The smoker-horizon line — top slab of the wordmark, doubling as section rule */}
      <line x1="0" y1="2" x2="1280" y2="2" stroke={accent} strokeWidth="2" />
    </svg>
  );
}
