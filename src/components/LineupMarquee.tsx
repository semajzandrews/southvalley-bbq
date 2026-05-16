/**
 * Persistent bottom-edge marquee with this week's lineup.
 * Wallpaper, not widget — scroll-tickers the night's rhythm.
 * Inspired by Dribbble music-venue tag and sportsbook tickers.
 */

type LineupItem = { day: string; act: string; time: string };

export default function LineupMarquee({ items }: { items: LineupItem[] }) {
  // duplicate for seamless loop
  const track = [...items, ...items];
  return (
    <div
      style={{
        borderTop: "1px solid var(--rule-strong)",
        borderBottom: "1px solid var(--rule-strong)",
        background: "var(--char-2)",
        overflow: "hidden",
        padding: "0.85rem 0",
      }}
      aria-label="This week's lineup"
    >
      <div className="marquee-track">
        {track.map((it, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-item-accent">{it.day}</span>
            <span className="marquee-sep">·</span>
            <span>{it.act}</span>
            <span className="marquee-sep">·</span>
            <span>{it.time}</span>
            <span className="marquee-sep" style={{ marginLeft: "1.6rem" }}>★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
