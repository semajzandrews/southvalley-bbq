/**
 * Concentric ring mark — bark / smoke / meat.
 * A single SVG that doubles as: section divider, scroll progress indicator,
 * favicon, pricing-tier glyph, loading state.
 *
 * Inspired by Smoky PIT (Vietnam-based BBQ branding study on Behance).
 */
export default function RingMark({
  size = 96,
  stroke = "var(--bone-2)",
  accent = "var(--ember)",
  spinning = false,
}: {
  size?: number;
  stroke?: string;
  accent?: string;
  spinning?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      style={{
        width: size,
        height: size,
        animation: spinning ? "ringspin 18s linear infinite" : undefined,
      }}
      aria-hidden
    >
      <style>{`
        @keyframes ringspin {
          from { transform: rotate(0deg); transform-origin: 50px 50px; }
          to   { transform: rotate(360deg); transform-origin: 50px 50px; }
        }
      `}</style>
      {/* outer ring — bark */}
      <circle cx="50" cy="50" r="46" fill="none" stroke={stroke} strokeWidth="0.6" strokeDasharray="1 2.4" />
      {/* mid ring — smoke */}
      <circle cx="50" cy="50" r="34" fill="none" stroke={stroke} strokeWidth="0.5" opacity="0.55" />
      {/* inner ring — meat */}
      <circle cx="50" cy="50" r="22" fill="none" stroke={accent} strokeWidth="0.8" />
      {/* core dot */}
      <circle cx="50" cy="50" r="2.2" fill={accent} />
      {/* compass ticks */}
      <line x1="50" y1="2" x2="50" y2="6" stroke={accent} strokeWidth="0.8" />
      <line x1="50" y1="94" x2="50" y2="98" stroke={stroke} strokeWidth="0.6" />
      <line x1="2" y1="50" x2="6" y2="50" stroke={stroke} strokeWidth="0.6" />
      <line x1="94" y1="50" x2="98" y2="50" stroke={stroke} strokeWidth="0.6" />
    </svg>
  );
}
