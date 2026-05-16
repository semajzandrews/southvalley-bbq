import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "South Valley BBQ & Lounge — West Orange, NJ · Smoked wings, sliders, brisket, live music",
  description:
    "Black-owned, woman-owned, veteran-owned smokehouse on South Valley Road. Tuesday through Sunday. Live music Thu–Sat. Sunday Blue Room Brunch with Gregory Burrus Productions. (973) 736-7899.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
