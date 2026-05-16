/**
 * Time-coded chapter marker.
 *   5PM · The Smoke
 *   8PM · The Room
 *   11PM · The Night
 *
 * Replaces v1's roman numerals. Ties chapters to the actual rhythm of the
 * evening at a BBQ + live-music venue.
 */
import RingMark from "./RingMark";

export default function ChapterMark({
  time,
  name,
  blurb,
}: {
  time: string;
  name: string;
  blurb?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <RingMark size={56} />
        <div>
          <div className="chapter-time">{time}</div>
          <div className="chapter-name">{name}</div>
        </div>
      </div>
      <div className="editorial-rule-ember mt-2" style={{ maxWidth: "16rem" }} />
      {blurb ? (
        <p className="body-editorial mt-3" style={{ fontSize: 14, maxWidth: "28ch" }}>
          {blurb}
        </p>
      ) : null}
    </div>
  );
}
