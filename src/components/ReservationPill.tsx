"use client";

import { useEffect, useState } from "react";

/**
 * Sticky reservation pill, bottom-right.
 * Shows live time-of-day; suggests next reservation slot in 30-min increments.
 * Hides until user has scrolled past the hero.
 * Inspired by Resy + OpenTable chip-row patterns on Mobbin.
 */
export default function ReservationPill() {
  const [time, setTime] = useState<string>("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fmt = (d: Date) => {
      let h = d.getHours();
      const m = d.getMinutes();
      // round forward to next :00 or :30
      let slotMin = m < 30 ? 30 : 0;
      let slotH = m < 30 ? h : h + 1;
      if (slotH >= 24) slotH -= 24;
      const ampm = slotH >= 12 ? "PM" : "AM";
      const dispH = slotH % 12 === 0 ? 12 : slotH % 12;
      return `${dispH}:${slotMin.toString().padStart(2, "0")} ${ampm}`;
    };
    const tick = () => setTime(fmt(new Date()));
    tick();
    const id = setInterval(tick, 30000);

    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!show) return null;

  return (
    <a className="reservation-pill" href="tel:9737367899" aria-label="Reserve">
      <span className="reservation-pill-label">Reserve</span>
      <span className="reservation-pill-sep" />
      <span className="reservation-pill-time">Tonight · {time}</span>
    </a>
  );
}
