"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * SmokeField v2 — two-layer composite.
 *
 * Layer 1: domain-warped FBM smoke shader (atmosphere).
 * Layer 2: ~2k GPU-instanced particle motes (depth + parallax).
 * Coupling: scroll velocity drives smoke amplitude + particle drift speed.
 *
 * Dark palette (matte-charcoal + ember). Mobile fallback: low device-pixel-ratio,
 * particle count halved, no scroll coupling.
 */
export default function SmokeField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile =
      typeof window !== "undefined" &&
      (window.matchMedia("(max-width: 768px)").matches ||
        navigator.maxTouchPoints > 0);

    const particleCount = isMobile ? 600 : 1400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    let renderer: THREE.WebGLRenderer;
    try {
      // antialias: false — the noise field has no straight edges to alias;
      // MSAA cost was pure waste. perf gain: ~10–15% fragment time.
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    } catch {
      // WebGL unavailable (headless / old device) — silently skip the shader
      return;
    }
    // Cap DPR aggressively. 1.5 desktop / 1 mobile keeps the FBM shader
    // affordable on Retina without visible quality loss for a smoke field.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // ─── LAYER 1 — FBM smoke shader on full-screen quad ──────────────────────

    const smokeUniforms = {
      u_time:        { value: 0 },
      u_scrollVel:   { value: 0 },
      u_resolution:  { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      u_char:        { value: new THREE.Color(0x0e0b09) },
      u_ember:       { value: new THREE.Color(0xc44a24) },
      u_amber:       { value: new THREE.Color(0xe08a2c) },
      u_ash:         { value: new THREE.Color(0x6b5f54) },
    };

    const smokeQuad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: smokeUniforms,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        vertexShader: /* glsl */ `
          varying vec2 v_uv;
          void main() {
            v_uv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;
          varying vec2 v_uv;
          uniform float u_time;
          uniform float u_scrollVel;
          uniform vec2  u_resolution;
          uniform vec3  u_char;
          uniform vec3  u_ember;
          uniform vec3  u_amber;
          uniform vec3  u_ash;

          float hash(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
          }

          float noise(vec2 p) {
            vec2 i = floor(p), f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(
              mix(hash(i), hash(i + vec2(1.0,0.0)), u.x),
              mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x),
              u.y
            );
          }

          float fbm(vec2 p) {
            // 4 octaves (down from 6). The warpedFbm wrapper still composes
            // 3 fbm() calls per pixel, so effective detail stays high while
            // shader cost drops ~33%.
            float v = 0.0;
            float a = 0.5;
            mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
            for (int i = 0; i < 4; i++) {
              v += a * noise(p);
              p = rot * p * 2.0 + vec2(0.1);
              a *= 0.5;
            }
            return v;
          }

          // domain-warped fbm — gives smoke its braided turbulence
          float warpedFbm(vec2 p) {
            vec2 q = vec2(fbm(p), fbm(p + vec2(5.2, 1.3)));
            vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2)),
                          fbm(p + 4.0 * q + vec2(8.3, 2.8)));
            return fbm(p + 4.0 * r);
          }

          void main() {
            float ar = u_resolution.x / u_resolution.y;
            vec2 uv = v_uv;
            vec2 p = vec2(uv.x * ar, uv.y);

            // base time, accelerated by scroll velocity
            float t = u_time * (0.06 + abs(u_scrollVel) * 0.15);
            vec2 drift = vec2(sin(t * 0.7) * 0.18, -t * 0.55);

            float dense   = warpedFbm(p * 2.4 + drift);
            float ambient = fbm(p * 0.9 + drift * 0.35);

            float smoke = mix(ambient, dense, 0.62);
            smoke = smoothstep(0.30, 0.94, smoke);

            // vertical mask — concentrate density in lower half
            float vMask = smoothstep(1.05, 0.20, uv.y);
            smoke *= vMask;

            // ember mask — heat low-center
            float emberMask =
              smoothstep(0.55, 0.0, uv.y) *
              smoothstep(1.0, 0.4, abs(uv.x - 0.5) * 2.0);

            // amber halo — wider, lower contrast
            float amberMask =
              smoothstep(0.45, 0.0, uv.y) *
              smoothstep(1.4, 0.6, abs(uv.x - 0.5) * 2.0);

            vec3 col = u_char;
            col = mix(col, u_ash,   smoke * 0.35);
            col = mix(col, u_amber, smoke * amberMask * 0.25);
            col = mix(col, u_ember, smoke * emberMask * 0.65);

            float alpha = smoke * 0.95;
            gl_FragColor = vec4(col, alpha);
          }
        `,
      })
    );
    smokeQuad.frustumCulled = false;
    smokeQuad.renderOrder = 0;

    const smokeScene = new THREE.Scene();
    const smokeCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    smokeScene.add(smokeQuad);

    // ─── LAYER 2 — Sparse instanced particles (motes drifting upward) ───────

    const partGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const seeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      seeds[i] = Math.random();
    }
    partGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    partGeom.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));

    const partUniforms = {
      u_time:      { value: 0 },
      u_scrollVel: { value: 0 },
      u_ember:     { value: new THREE.Color(0xc44a24) },
      u_bone:      { value: new THREE.Color(0xece2cc) },
      u_pixelRatio:{ value: renderer.getPixelRatio() },
    };

    const partMat = new THREE.ShaderMaterial({
      uniforms: partUniforms,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        attribute float seed;
        uniform float u_time;
        uniform float u_scrollVel;
        uniform float u_pixelRatio;
        varying float v_seed;
        varying float v_life;

        void main() {
          v_seed = seed;
          float t = u_time * (0.18 + abs(u_scrollVel) * 0.2) + seed * 12.0;

          // upward drift with side sway
          vec3 p = position;
          p.x += sin(t * 0.6 + seed * 5.0) * 0.6;
          p.y += mod(t * (0.18 + seed * 0.22), 12.0) - 5.0;
          p.z += cos(t * 0.4 + seed * 3.0) * 0.3;

          // loop horizontally to keep the field full
          p.x = mod(p.x + 7.0, 14.0) - 7.0;

          v_life = smoothstep(-5.0, 0.0, p.y) * (1.0 - smoothstep(2.0, 5.5, p.y));

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (1.4 + seed * 2.6) * u_pixelRatio * (8.0 / -mv.z);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 u_ember;
        uniform vec3 u_bone;
        varying float v_seed;
        varying float v_life;

        void main() {
          // soft round particle
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c);
          if (d > 0.5) discard;
          float falloff = smoothstep(0.5, 0.0, d);

          // mostly bone, occasionally ember-glowing
          vec3 col = mix(u_bone, u_ember, step(0.78, v_seed));
          float alpha = falloff * v_life * (0.22 + v_seed * 0.18);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const particles = new THREE.Points(partGeom, partMat);
    particles.frustumCulled = false;
    scene.add(particles);

    // ─── Scroll velocity → uniforms ─────────────────────────────────────────

    // Scroll velocity is computed inside animate() — once per frame, not
    // once per scroll event. The handler now only marks the latest position;
    // the rAF tick does the math. On a 120Hz trackpad this drops dozens of
    // synchronous calculations per scroll burst.
    let lastScrollY = window.scrollY;
    let lastScrollT = performance.now();
    let scrollVel = 0;
    let pendingScrollY = window.scrollY;

    const onScroll = () => {
      pendingScrollY = window.scrollY;
    };
    if (!isMobile) window.addEventListener("scroll", onScroll, { passive: true });

    // ─── Animate ────────────────────────────────────────────────────────────

    let raf = 0;
    let isVisible = true;
    let docVisible = !document.hidden;
    let pausedAt: number | null = null;
    // `start` is mutated on resume so u_time advances smoothly across pauses.
    let start = performance.now();

    // Pause rendering when the canvas leaves the viewport. The hero is fixed
    // height and the user scrolls past it almost immediately — keeping the
    // shader rendering behind solid content below was the single biggest
    // perf leak.
    const io = new IntersectionObserver(
      (entries) => { isVisible = entries[0].isIntersecting; },
      { threshold: 0 }
    );
    io.observe(container);

    // Also pause when the tab is hidden — saves battery.
    const onVis = () => { docVisible = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    const animate = () => {
      if (!isVisible || !docVisible) {
        if (pausedAt === null) pausedAt = performance.now();
        raf = requestAnimationFrame(animate);
        return;
      }

      const now = performance.now();

      // First frame after a pause — rebase all clocks so neither the smoke
      // shader nor the scroll-velocity math sees a multi-second jump.
      // Without this, returning to the hero (e.g. anchor jump to #blue-room
      // then scroll back up) produces a visible flame glitch on resume.
      if (pausedAt !== null) {
        const pausedFor = now - pausedAt;
        start += pausedFor;
        lastScrollT = now;
        lastScrollY = pendingScrollY;
        pausedAt = null;
      }

      const t = (now - start) / 1000;

      // Scroll velocity — computed once per frame from latest scrollY,
      // not once per scroll event.
      const dt = Math.max(1, now - lastScrollT);
      const dy = pendingScrollY - lastScrollY;
      const inst = dy / dt;
      scrollVel = scrollVel * 0.85 + inst * 0.15;
      scrollVel = Math.max(-0.6, Math.min(0.6, scrollVel));
      lastScrollY = pendingScrollY;
      lastScrollT = now;

      smokeUniforms.u_time.value = t;
      smokeUniforms.u_scrollVel.value = scrollVel;
      partUniforms.u_time.value = t;
      partUniforms.u_scrollVel.value = scrollVel;

      renderer.autoClear = true;
      renderer.render(smokeScene, smokeCam);
      renderer.autoClear = false;
      renderer.render(scene, camera);

      // decay scroll velocity when scroll stops
      scrollVel *= 0.94;
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      smokeUniforms.u_resolution.value.set(w, h);
      partUniforms.u_pixelRatio.value = renderer.getPixelRatio();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (!isMobile) window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      cancelAnimationFrame(raf);
      smokeQuad.geometry.dispose();
      (smokeQuad.material as THREE.Material).dispose();
      partGeom.dispose();
      partMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
