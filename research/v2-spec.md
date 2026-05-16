# South Valley v2 — Synthesis Spec

Compiled 05-15-2026 from three research streams: visual.md (Awwwards/FWA/BBQ/editorial/WebGL), voice.md (Yelp/Google/NJM/competitive), patterns.md (Dribbble/Behance/Mobbin).

---

## Truth check (v1 corrections from voice research)

| v1 (training-data fiction) | v2 (verified) |
|---|---|
| Est. 2014 | **Est. 2021** (took over former SuzyQue's space) |
| 14-hr brisket, guava-glaze ribs, charred cabbage, etc. | **Smoked wings · Pulled pork sliders · Texas beef brisket · Beer-battered catfish · Mac & cheese** (all named verbatim by reviewers) |
| Generic "smokehouse" voice | **Black-owned · Woman-owned · Veteran-owned** — must be foregrounded |
| "Blue Room books three weekends out" | **Real venue**, 125-seat private rental, Sunday Brunch via Gregory Burrus Productions |
| Hours Tue–Thu 5–11p, Fri–Sat 5p–1a, Sun 4–10p | Actual: **Tue–Thu 5p–12a · Fri–Sat 3p–2a · Sun 11a–12a · Mon closed** |
| "Six nights a week" of live music | Thu / Fri / Sat live music + Sunday Blue Room Brunch |
| "Walk-ins welcome at the bar" | Real differentiator: **late nights to 2 AM, full bourbon program, happy hour** |
| Generic competitive positioning | **Only full-service BBQ + live music + cocktail bar** in West Orange / Montclair / South Orange corridor (Wood Pit, Ruthie's, Dinosaur Newark all closed) |
| Press: none cited | **NJ Monthly "Carnivore's Paradise" · Montclair Local · Patch · EatOkra** |

## Differentiation pillars (vs BWYW + vs visual reference set)

- **Substrate:** matte charcoal + ember (vs BWYW jet-black/lime · vs v1 cream-paper-editorial)
- **Type:** Bricolage Grotesque (variable) + Instrument Serif + IBM Plex Mono (vs BWYW Fraunces/Inter/JetBrains · vs v1 Bowlby/Newsreader/Caveat)
- **Chapter markers:** time-coded (5PM · 8PM · 11PM) (vs BWYW 01/02/03 · vs v1 roman numerals)
- **Menu:** ledger with dot-leader rails (vs BWYW glassmorph cards)
- **WebGL:** two-layer composite (FBM + sparse particles, scroll-coupled) (vs v1 pure FBM shader, vs BWYW none)
- **Lineup:** persistent bottom marquee ticker (vs everyone's event card grid)
- **Reservation:** sticky pill with live time-of-day (Resy/OpenTable Mobbin pattern)

## Design DNA — 14 moves to inject into v2

| # | Move | Source |
|---|---|---|
| 1 | Pivot palette to matte charcoal (#0E0B09) + ember (#C44A24), per-chapter color shifts | Don Molinico, SŌM |
| 2 | Kill roman numerals → "5PM · The Smoke / 8PM · The Room / 11PM · The Night" | Visual report |
| 3 | Tri-weight Volume type system (Quiet/Live/Late) driven by server time | Bacàn / Pentagram |
| 4 | Reverse-contrast SOUTH VALLEY wordmark — top slab = smoker-horizon line | Coqodaq |
| 5 | Two-layer smoke (FBM base + 2k instanced particles + scroll coupling) | Active Theory v5, makemepulse |
| 6 | Ledger-style menu with dot-leader rails between dish name and price | Dribbble cocktail-lounge cluster |
| 7 | DOORS · DOWNBEAT · LAST CALL three-cell time strip on every event | Mobbin event-detail consensus |
| 8 | Persistent reservation pill, bottom-right, live time-of-day | Resy + OpenTable Mobbin |
| 9 | Lineup as bottom marquee ticker, not event cards | Dribbble music-venue cluster |
| 10 | Calendar-tear date blocks for the lineup list (huge day number) | Eventbrite + Luma on Mobbin |
| 11 | Bon Appétit arrow callouts pointing at photo elements | Visual report |
| 12 | Garden & Gun ingredient sidebar on the smoke chapter | Visual report |
| 13 | Concentric ring mark (bark/smoke/meat) — section divider + favicon + scroll indicator | Smoky PIT Behance |
| 14 | Inline gallery expansion, kill all modals | Mobbin gallery consensus |

## Copy direction (customer voice, not training data)

**Hero headline candidates:**
- "Good vibes. Good drinks. Good music." (verbatim Friday-night review phrase)
- "Your neighborhood gem on South Valley Road." (top-ranked review descriptor)
- "Smoked wings. Sliders. Brisket. Piled high." (verbatim "Fred Flintstone Sized" energy)

**Kicker line:** "Black-owned · Woman-owned · Veteran-owned · West Orange since 2021"

**Press strip (above fold):** "Carnivore's Paradise — *New Jersey Monthly*" + Montclair Local + Patch logos

**Blue Room positioning:** "Sunday Blue Room Brunch · Live jazz, blues & R&B with Gregory Burrus Productions · The Blue Room Mimosa"

## Build plan

1. globals.css — full palette pivot, type system, ledger styles, marquee, pill
2. layout.tsx — new Google Fonts (Bricolage Grotesque variable, Instrument Serif, IBM Plex Mono)
3. SmokeField.tsx — add sparse particle layer, scroll coupling, dark-mode color palette
4. Wordmark.tsx — new SVG reverse-contrast "SOUTH VALLEY" lockup
5. RingMark.tsx — concentric bark/smoke/meat SVG, reused 6 ways
6. ReservationPill.tsx — sticky bottom-right, time-of-day live
7. LineupMarquee.tsx — bottom-edge ticker
8. ChapterMark.tsx — "5PM · The Smoke" timecoded marker
9. page.tsx — full rewrite with real menu, real Blue Room positioning, real lineup structure, real hours, real press
