"use client";

import { motion } from "motion/react";
import { Phone, MapPin, Clock, Music } from "lucide-react";
import SmokeField from "@/components/SmokeField";
import Wordmark from "@/components/Wordmark";
import RingMark from "@/components/RingMark";
import ReservationPill from "@/components/ReservationPill";
import LineupMarquee from "@/components/LineupMarquee";
import ChapterMark from "@/components/ChapterMark";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Lineup rhythm (Thu / Fri / Sat live music + Sun Blue Room Brunch) ───── */
const lineup = [
  { day: "Thu", act: "Open Mic Night", time: "After dark" },
  { day: "Fri", act: "Live Trio · Jazz & Blues", time: "After 8" },
  { day: "Sat", act: "Full Band · Soul & R&B", time: "Late set" },
  { day: "Sun", act: "Blue Room Brunch · Gregory Burrus Productions", time: "Midday" },
];

/* ─── Menu (items reviewers name; notes evocative until owner confirms) ──── */
const menu = [
  {
    course: "From the Pit",
    items: [
      { name: "Smoked Hot Wings", note: "the ones reviewers keep naming", price: "—" },
      { name: "Texas Beef Brisket", note: "piled high", price: "—" },
      { name: "Pulled Pork Sliders", note: "a plate of three", price: "—" },
      { name: "Beef Short Rib", note: "Fred Flintstone-sized · come hungry", price: "—" },
      { name: "Half Rack St. Louis Ribs", note: "the house way", price: "—" },
    ],
  },
  {
    course: "From the Kitchen",
    items: [
      { name: "Beer-Battered Catfish", note: "golden brown", price: "—" },
      { name: "Soul Plate", note: "choose your sides", price: "—" },
      { name: "Mac & Cheese", note: "comfort, the way it should be", price: "—" },
      { name: "Cornbread Skillet", note: "warm from the kitchen", price: "—" },
      { name: "Charred Brussels", note: "the side reviewers come back for", price: "—" },
    ],
  },
  {
    course: "The Bar",
    items: [
      { name: "Blue Room Mimosa", note: "the Sunday move", price: "—" },
      { name: "Smoked Old Fashioned", note: "house build", price: "—" },
      { name: "Hennessy Sweet Tea", note: "ask the bar", price: "—" },
      { name: "Bourbon flight", note: "ask your bartender", price: "—" },
      { name: "Local drafts", note: "rotating · ask", price: "—" },
    ],
  },
];

/* ─── Real hours ─────────────────────────────────────────────────────────── */
const hours = [
  { day: "Mon", note: "Closed" },
  { day: "Tue – Thu", note: "5:00 PM – 12:00 AM" },
  { day: "Fri – Sat", note: "3:00 PM – 2:00 AM" },
  { day: "Sun", note: "11:00 AM – 12:00 AM · Blue Room Brunch 12:30 PM" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* ─── Masthead ─────────────────────────────────────────────────── */}
      <header className="relative z-30">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 pt-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="masthead-rule">Black-Owned · Woman-Owned · Veteran-Owned</div>
            <div className="masthead-rule hidden md:block">West Orange, NJ · Est. 2021</div>
            <div className="masthead-rule">
              <a href="tel:9737367899" style={{ color: "inherit" }}>(973) 736-7899</a>
            </div>
          </div>
          <div className="editorial-rule-strong mt-3" />
        </div>
      </header>

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative" style={{ minHeight: "94vh", isolation: "isolate" }}>
        <SmokeField />

        {/* Right-side fire photo — smoke shader floats on top for depth */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full hidden lg:block"
          style={{ zIndex: -1, overflow: "hidden" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-fire.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
          />
          {/* Blend left edge into charcoal */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to right, var(--char) 0%, rgba(14,11,9,0.5) 35%, transparent 100%)"
          }} />
          {/* Top + bottom vignette */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, var(--char) 0%, transparent 18%, transparent 65%, var(--char) 100%)"
          }} />
          {/* Darkening film */}
          <div className="absolute inset-0" style={{ background: "rgba(14,11,9,0.5)" }} />
        </div>

        <div className="relative z-20 max-w-[1360px] mx-auto px-6 lg:px-12 pt-14 lg:pt-20 pb-28">

          {/* Reverse-contrast wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease }}
          >
            <Wordmark height={150} />
          </motion.div>

          {/* Headline — verbatim customer voice */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.18 }}
            className="display mt-10"
            style={{
              fontSize: "clamp(2.6rem, 6.4vw, 6.2rem)",
              fontVariationSettings: '"wght" 360, "opsz" 96',
              maxWidth: "22ch",
            }}
          >
            Good vibes. Good drinks. <em style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: "var(--ember)" }}>Good music.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.45 }}
            className="body-editorial mt-7 max-w-[42ch]"
            style={{ fontSize: 18 }}
          >
            Smoked wings, pulled-pork sliders, and Texas brisket piled high — paired with
            live jazz, blues and R&amp;B Thursday through Sunday. A full-service BBQ
            and live-music house on South Valley Road.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a className="btn-ember" href="tel:9737367899">
              Reserve Tonight
              <span style={{ marginLeft: 4 }}>→</span>
            </a>
            <a className="btn-bone" href="#blue-room">Book the Blue Room</a>
          </motion.div>

          {/* Press strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            <span className="masthead-rule">Press</span>
            <span className="body-editorial" style={{ fontSize: 13, color: "var(--bone-3)" }}>
              <em style={{ color: "var(--bone-2)" }}>&ldquo;Carnivore&rsquo;s Paradise.&rdquo;</em> &mdash; <span className="mono" style={{ fontSize: 12 }}>NJ MONTHLY</span>
            </span>
            <span className="masthead-rule">Montclair Local</span>
            <span className="masthead-rule">Patch</span>
            <span className="masthead-rule">EatOkra</span>
          </motion.div>
        </div>
      </section>

      {/* ─── This week ribbon (real lineup, scrolling marquee) ────────── */}
      <LineupMarquee items={lineup} />

      {/* ─── Brisket photo break ──────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: "48vh", minHeight: 280 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brisket.jpg"
          alt="Sliced Texas brisket — South Valley BBQ"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 45%" }}
        />
        {/* Top + bottom fade to section backgrounds */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, var(--char) 0%, transparent 22%, transparent 68%, var(--char-2) 100%)"
        }} />
        {/* Subtle darkening */}
        <div className="absolute inset-0" style={{ background: "rgba(14,11,9,0.38)" }} />

        {/* Pull quote overlay */}
        <div className="relative z-10 h-full flex items-center max-w-[1360px] mx-auto px-6 lg:px-12">
          <blockquote>
            <p className="body-editorial" style={{
              fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)",
              fontStyle: "italic",
              color: "var(--bone)",
              maxWidth: "20ch",
              lineHeight: 1.25,
            }}>
              &ldquo;Carnivore&rsquo;s Paradise.&rdquo;
            </p>
            <cite className="mono not-italic mt-4 block" style={{
              fontSize: 12,
              color: "var(--ember)",
              letterSpacing: "0.14em",
            }}>
              &mdash; NJ MONTHLY
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ─── 5PM · THE SMOKE ──────────────────────────────────────────── */}
      <section className="relative chapter-section chapter-smoke" id="menu">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 grid grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-12 md:col-span-4">
            <ChapterMark
              time="5PM"
              name="The Smoke"
              blurb="Doors open Tuesday through Sunday. The pit&rsquo;s been running since the night before."
            />

            {/* Mood sidebar — no operational claims */}
            <div className="ingredient-rail mt-10">
              <div className="ingredient-rail-label">The Pit</div>
              <ul>
                <li>Low and slow</li>
                <li>Hardwood and patience</li>
                <li>Salt, pepper, smoke</li>
                <li>Hours, not minutes</li>
                <li>The way it should be</li>
              </ul>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <p className="body-editorial dropcap" style={{ fontSize: 20 }}>
              South Valley opened in 2021 on South Valley Road &mdash;
              Black-owned, woman-owned, veteran-owned, and built around
              a full pit, a full bar, and a full live-music calendar under one roof.
            </p>
            <p className="body-editorial mt-5" style={{ fontSize: 18 }}>
              The dishes reviewers keep naming: smoked wings, the pulled-pork sliders,
              the Texas brisket piled high. The catfish. The mac &amp; cheese.
              A short rib that earned its &ldquo;Fred Flintstone&rdquo; nickname.
              Come hungry. Come thirsty. Bring a friend.
            </p>

            {/* Ledger menu */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-10">
              {menu.map((section) => (
                <div key={section.course} className="ledger-section">
                  <div className="ledger-section-label">{section.course}</div>
                  {section.items.map((item) => (
                    <div key={item.name} className="ledger-row">
                      <span className="ledger-row-name">{item.name}</span>
                      <span className="ledger-leader" />
                      <span className="ledger-row-price">
                        {item.price === "—" ? "—" : `$${item.price}`}
                      </span>
                    </div>
                  ))}
                  {/* note row beneath each section */}
                  <div className="mt-3">
                    {section.items.map((item) => (
                      <div key={item.name + "-note"} className="flex gap-2 text-[12px] mt-1">
                        <span style={{ color: "var(--ash-2)", fontFamily: "var(--font-plex-mono)", letterSpacing: "0.04em", minWidth: "9ch" }}>
                          {item.name.split(" ").slice(0,2).join(" ").toUpperCase()}
                        </span>
                        <span className="body-editorial" style={{ fontSize: 12, color: "var(--bone-3)" }}>
                          {item.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8PM · THE ROOM (Blue Room) ───────────────────────────────── */}
      <section className="relative chapter-section chapter-room" id="blue-room">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 grid grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-12 md:col-span-5 md:order-2">
            <ChapterMark
              time="8PM"
              name="The Room"
              blurb="The Blue Room. 125 seats. Private rentals, Sunday brunches, and the bookings that hold the year together."
            />
            <p className="body-editorial mt-8" style={{ fontSize: 14, maxWidth: "32ch" }}>
              <em>Sunday Blue Room Brunch</em> is curated by{" "}
              <span style={{ color: "var(--ember)" }}>Gregory Burrus Productions</span> &mdash;
              soulful live jazz, blues, and R&amp;B, paired with the Blue Room Mimosa and the full pit menu.
            </p>

            <div className="arrow-callout mt-8">
              The Blue Room Mimosa is the Sunday-brunch move &mdash; bartenders pour it
              before you finish the question.
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 md:order-1">
            <h2 className="display" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", fontVariationSettings: '"wght" 600, "opsz" 96' }}>
              125 seats.
              <br />
              <span style={{ color: "var(--amber)" }}>Live jazz, blues, R&amp;B.</span>
              <br />
              Your party, our room.
            </h2>
            <p className="body-editorial mt-7" style={{ fontSize: 18, maxWidth: "52ch" }}>
              Milestone birthdays, engagement parties, label releases, wakes that
              need a soft place to land. The kitchen builds a menu around your night,
              the bar runs a tab or a fixed list, and the music &mdash; if you want
              music &mdash; is yours to choose.
            </p>
            <p className="body-editorial mt-4" style={{ fontSize: 18, maxWidth: "52ch" }}>
              Built for milestone-sized nights. Ask about private bookings.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a className="btn-ember" href="tel:9737367899">Inquire — Private Events</a>
              <a className="btn-bone" href="tel:9737367899">Sunday Brunch Reservations</a>
            </div>

            {/* Doors / Downbeat / Last Call strip */}
            <div className="time-strip mt-12">
              <div>
                <div className="time-strip-label">Doors</div>
                <div className="time-strip-value">Late morning</div>
              </div>
              <div>
                <div className="time-strip-label">Downbeat</div>
                <div className="time-strip-value">Midday</div>
              </div>
              <div>
                <div className="time-strip-label">Last Pour</div>
                <div className="time-strip-value">Afternoon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 11PM · THE NIGHT (Live music lineup) ─────────────────────── */}
      <section className="relative chapter-section chapter-night" id="lineup">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 grid grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-12 md:col-span-4">
            <ChapterMark
              time="11PM"
              name="The Night"
              blurb="Live music Thursday through Saturday. The bar runs until 2 AM Friday and Saturday. Stay for the late set."
            />

            {/* Jazz neon photo */}
            <div className="mt-10 hidden md:block" style={{
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              height: 280,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/jazz-neon.jpg"
                alt="Jazz neon sign — The Blue Room"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center center" }}
              />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to bottom, transparent 55%, var(--char-2) 100%)"
              }} />
            </div>

            <div className="arrow-callout mt-8">
              Friday and Saturday push to 2 AM. Sunday brunch hands the day back by late afternoon.
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="space-y-7">
              {lineup.map((act, i) => (
                <div
                  key={act.day + i}
                  className="flex items-stretch gap-6 pb-7"
                  style={{ borderBottom: i < lineup.length - 1 ? "1px solid var(--rule-strong)" : "none" }}
                >
                  <div className="date-tear">
                    <div className="date-tear-month">This Week</div>
                    <div className="date-tear-day">{act.day.charAt(0)}</div>
                    <div className="date-tear-dow">{act.day === "Thu" ? "Thursday" : act.day === "Fri" ? "Friday" : act.day === "Sat" ? "Saturday" : "Sunday"}</div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <div className="display" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)", fontVariationSettings: '"wght" 520, "opsz" 96' }}>
                      {act.act}
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <Music size={14} style={{ color: "var(--ember)" }} />
                      <span className="mono" style={{ fontSize: 12, letterSpacing: "0.12em", color: "var(--bone-3)" }}>
                        {act.time.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center">
                    <a className="btn-bone" href="tel:9737367899" style={{ padding: "10px 16px" }}>
                      Reserve
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact masthead ─────────────────────────────────────────── */}
      <footer className="relative" style={{ paddingTop: "5.5rem", paddingBottom: "4rem", background: "var(--char-2)" }}>
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12">

          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="col-span-12 md:col-span-7">
              <div className="kicker">Come Hungry · Stay Late</div>
              <h2 className="display mt-5" style={{ fontSize: "clamp(2.4rem, 7vw, 5.4rem)", fontVariationSettings: '"wght" 700, "opsz" 96' }}>
                Tuesday through Sunday.
                <br />
                <span style={{ color: "var(--ember)" }}>Closed Mondays.</span>
              </h2>
            </div>

            <div className="col-span-12 md:col-span-5">
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="shrink-0 mt-1" style={{ color: "var(--ember)" }} />
                  <div>
                    <div className="body-editorial" style={{ fontSize: 17, color: "var(--bone)" }}>34 S Valley Rd</div>
                    <div className="body-editorial" style={{ fontSize: 14, color: "var(--bone-3)" }}>West Orange, NJ 07052</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="shrink-0 mt-1" style={{ color: "var(--ember)" }} />
                  <a className="body-editorial" href="tel:9737367899" style={{ fontSize: 17, color: "var(--bone)" }}>
                    (973) 736-7899
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} className="shrink-0 mt-1" style={{ color: "var(--ember)" }} />
                  <div>
                    {hours.map((h) => (
                      <div key={h.day} className="body-editorial flex gap-4" style={{ fontSize: 14 }}>
                        <span className="mono" style={{ minWidth: "5ch", color: "var(--bone-3)" }}>{h.day}</span>
                        <span style={{ color: h.note === "Closed" ? "var(--ash-2)" : "var(--bone-2)" }}>{h.note}</span>
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="editorial-rule mt-16" />
          <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
            <div className="masthead-rule">© 2026 South Valley BBQ &amp; Lounge · West Orange, NJ</div>
            <div className="masthead-rule">Black-Owned · Woman-Owned · Veteran-Owned</div>
            <div className="masthead-rule" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <RingMark size={18} /> southvalleybbq
            </div>
          </div>
        </div>
      </footer>

      <ReservationPill />
    </main>
  );
}
