import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * BWYW Preview Gate.
 *
 * Spec builds live at vercel.app subdomains and stay PIN-gated until paid.
 * Pattern: cookie persists the unlock; `?pin=` query unlocks in one click
 * (so the sales URL can be shared as `https://southvalley-bbq.vercel.app/?pin=2026`).
 *
 * PIN source: BWYW_PREVIEW_PIN env var (set in Vercel project env) or `2026` default.
 */

const PIN = process.env.BWYW_PREVIEW_PIN || "2026";
const COOKIE_NAME = "bwyw-pin";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function proxy(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // Already unlocked
  const cookiePin = request.cookies.get(COOKIE_NAME)?.value;
  if (cookiePin === PIN) {
    return NextResponse.next();
  }

  // Unlock via query param — set cookie, strip the query, redirect to clean URL
  const queryPin = searchParams.get("pin");
  if (queryPin === PIN) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("pin");
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE_NAME, PIN, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
    return res;
  }

  // Gate page — inline HTML matching the build's palette
  const html = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>South Valley BBQ — Preview Access</title>
<style>
:root{color-scheme:dark}
html,body{margin:0;padding:0}
body{font-family:Georgia,"Times New Roman",serif;background:#0e0b09;color:#ece2cc;min-height:100vh;display:grid;place-items:center;padding:24px;background-image:radial-gradient(ellipse at 50% 100%, rgba(196,74,36,.18), transparent 60%)}
.card{max-width:420px;width:100%;text-align:center}
.eyebrow{font-size:11px;letter-spacing:.32em;text-transform:uppercase;color:#c44a24;margin:0 0 16px}
h1{font-weight:400;font-style:italic;font-size:28px;letter-spacing:.02em;margin:0 0 12px;color:#ece2cc}
p{color:#a8a4a0;font-size:14px;line-height:1.7;margin:0 0 32px;font-family:ui-sans-serif,system-ui,-apple-system,sans-serif}
form{display:flex;gap:10px}
input{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.14);color:#ece2cc;padding:16px;font-size:18px;border-radius:4px;outline:none;font-family:ui-sans-serif,system-ui,sans-serif;text-align:center;letter-spacing:.4em}
input:focus{border-color:#c44a24;background:rgba(255,255,255,.06)}
input::placeholder{color:#5a5550;letter-spacing:.1em}
button{background:#c44a24;color:#fff;border:0;padding:0 24px;font-size:12px;letter-spacing:.2em;text-transform:uppercase;border-radius:4px;cursor:pointer;font-family:ui-sans-serif,sans-serif;font-weight:600}
button:hover{background:#e08a2c}
.foot{margin-top:48px;color:#5a5550;font-size:10px;letter-spacing:.32em;text-transform:uppercase;font-family:ui-sans-serif,sans-serif}
</style></head>
<body><div class="card">
<p class="eyebrow">By Invitation</p>
<h1>South Valley BBQ <span style="color:#c44a24">&amp;</span> Lounge</h1>
<p>This is a private preview built for the South Valley team.<br>Enter your access PIN to continue.</p>
<form method="GET" action="/">
<input name="pin" inputmode="numeric" autocomplete="off" placeholder="••••" autofocus maxlength="12">
<button type="submit">Enter</button>
</form>
<div class="foot">Spec Build · BuildWhatYouWant</div>
</div></body></html>`;

  return new NextResponse(html, {
    status: 401,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex, nofollow",
      "cache-control": "no-store",
    },
  });
}

export const config = {
  // Gate everything except Next internals and the favicon.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
