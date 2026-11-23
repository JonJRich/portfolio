/*! z-texture v0.1 — seeded risograph halftone textures (part of Zinify, standalone)
 *  <z-texture pattern="cloud" seed="abc" ink-a="#eb48f7"></z-texture>
 *  Fills its own box. Edges always fade out, so it never shows a hard crop.
 *  Attributes (all optional):
 *   pattern     cloud | cumulus | sun | brush | topo | scatter | marble | tiger
 *   seed        any string, or a bank "a, b, c": one is picked at random on each page load
 *   ink-a ink-b colours, or a CSS variable: "var(--accent)"   two-tone   off | offset | reseed | shadows | pattern
 *   pattern-b   (two-tone="pattern")      offset  0–1 (two-tone="offset")
 *   density density-b 0–1     fill 0.3–3     scale 0.3–3     soft 0.05–0.6 (edge fade)
 *   pitch (px)  angle-a angle-b (deg)      shape round | square | line
 *   gain 0.6–1.6 (ink gain)   grain 0–1 (starvation)   mis (px misregistration)
 *   interactive  dots swell around the cursor (with a trail), a click ripples them,
 *                and the print drifts gently. Tune with CSS custom properties:
 *                The cursor never adds ink: it only swells and nudges dots already printed.
 *                --z-cloud-size (140px) --z-cloud-swell (0.5) --z-cloud-push (3px)
 *                --z-cloud-trail (500ms) --z-cloud-drift (4px)
 *                Ignored on touch and with prefers-reduced-motion.
 */
(function () {
  "use strict";
  if (window.customElements && customElements.get("z-texture")) return;

  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hash(s) {
    let h = 2166136261;
    for (const c of String(s)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    return h >>> 0;
  }
  const clamp = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
  const S = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t); };

  function noise(seed) {
    const r = rng(seed), P = new Uint16Array(512), p = [], G = new Float32Array(256);
    for (let i = 0; i < 256; i++) { p[i] = i; G[i] = r(); }
    for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = p[i]; p[i] = p[j]; p[j] = t; }
    for (let i = 0; i < 512; i++) P[i] = p[i & 255];
    function vn(x, y) {
      const X = Math.floor(x), Y = Math.floor(y), xf = x - X, yf = y - Y, xi = X & 255, yi = Y & 255;
      const a = G[P[P[xi] + yi] & 255], b = G[P[P[xi + 1] + yi] & 255], c = G[P[P[xi] + yi + 1] & 255], d = G[P[P[xi + 1] + yi + 1] & 255];
      const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    }
    function fbm(x, y, o) {
      o = o || 5;
      let s = 0, amp = 0.5, n = 0;
      for (let i = 0; i < o; i++) { s += amp * vn(x, y); n += amp; amp *= 0.5; x = x * 2.03 + 17.3; y = y * 2.03 + 9.1; }
      return s / n;
    }
    return { vn, fbm, r };
  }

  /* ---------- patterns: (X, Y) centred, aspect-correct, scaled → 0..1 ---------- */
  const PATTERNS = {
    cloud(N) {
      return (X, Y) => S(0.42, 0.74, N.fbm(X * 1.7 + 3.1, Y * 1.7 + 1.7));
    },
    cumulus(N, A) {
      const puffs = [], k = 6 + Math.floor(N.r() * 4);
      for (let i = 0; i < k; i++) {
        const cx = (N.r() - 0.5) * A * 0.75, mid = 1 - Math.abs(cx) / (A * 0.5);
        puffs.push([cx, (N.r() - 0.5) * 0.25 - mid * 0.08, 0.1 + N.r() * 0.16 + mid * 0.1]);
      }
      return (X, Y) => {
        let v = 0;
        for (const [cx, cy, r] of puffs) { const d = Math.hypot(X - cx, Y - cy); v = Math.max(v, S(r, r * 0.25, d)); }
        return clamp(v * (0.7 + 0.5 * N.fbm(X * 4, Y * 4)));
      };
    },
    sun(N, A) {
      const cx = (N.r() - 0.5) * A * 0.5, cy = (N.r() - 0.5) * 0.3, rays = 9 + Math.floor(N.r() * 10), ph = N.r() * 6.28;
      return (X, Y) => {
        const dx = X - cx, dy = Y - cy, d = Math.hypot(dx, dy), th = Math.atan2(dy, dx);
        const ray = 0.5 + 0.5 * Math.cos(th * rays + ph + N.fbm(X * 2, Y * 2) * 2.5);
        return clamp(S(0.62, 0.0, d) * (0.45 + 0.55 * ray * ray) + S(0.16, 0.1, d));
      };
    },
    brush(N, A) {
      const ph = N.r() * 6.28;
      return (X, Y) => {
        const yc = 0.07 * Math.sin(X * 1.4 + ph) + 0.14 * (N.fbm(X * 0.7, 7.7) - 0.5);
        const th = 0.17 + 0.08 * (N.fbm(X * 1.3, 3.3) - 0.5);
        const band = S(th, th * 0.5, Math.abs(Y - yc));
        const streak = 0.45 + 0.55 * N.fbm(X * 0.5, Y * 22);
        const ends = S(-A * 0.46, -A * 0.3, X + (N.fbm(Y * 3, 1) - 0.5) * 0.3) * S(A * 0.46, A * 0.28, X + (N.fbm(Y * 3, 4) - 0.5) * 0.3);
        return clamp(band * streak * ends * 1.2);
      };
    },
    topo(N) {
      return (X, Y) => {
        const f = N.fbm(X * 1.1 + 2, Y * 1.1 + 5);
        const L = Math.abs(((f * 11) % 1) - 0.5);
        return clamp(S(0.3, 0.44, L) * S(0.3, 0.46, f) + 0.12 * S(0.5, 0.75, f));
      };
    },
    scatter(N, A) {
      const spots = [], k = 34 + Math.floor(N.r() * 30);
      for (let i = 0; i < k; i++) spots.push([(N.r() - 0.5) * A * 0.95, (N.r() - 0.5) * 0.95, 0.015 + Math.pow(N.r(), 2.5) * 0.11]);
      return (X, Y) => {
        let v = 0;
        for (const [cx, cy, r] of spots) { const d = Math.hypot(X - cx, Y - cy); if (d < r * 2.2) v = Math.max(v, S(r * 1.6, r * 0.4, d)); }
        return v;
      };
    },
    marble(N) {
      return (X, Y) => {
        const qx = N.fbm(X * 1.1, Y * 1.1), qy = N.fbm(X * 1.1 + 5.2, Y * 1.1 + 1.3);
        const rx = N.fbm(X + 4 * qx + 1.7, Y + 4 * qy + 9.2, 4), ry = N.fbm(X + 4 * qx + 8.3, Y + 4 * qy + 2.8, 4);
        const f = N.fbm(X + 3.5 * rx, Y + 3.5 * ry, 4);
        const veins = 0.5 + 0.5 * Math.sin(f * 22 + rx * 6);
        return clamp(S(0.35, 0.95, veins) * S(0.28, 0.5, f) + 0.25 * S(0.55, 0.8, f));
      };
    },
    tiger(N) {
      const ang = N.r() * 1.2 - 0.6;
      return (X, Y) => {
        const w = N.fbm(X * 1.1, Y * 1.1);
        const u = X * Math.sin(ang) + Y * Math.cos(ang);
        const s = Math.sin((u * 2.2 + w * 4.2) * 6.5);
        return clamp(S(0.05, 0.55, s) * (0.7 + 0.4 * N.fbm(X * 5, Y * 5)));
      };
    },
  };

  const DEF = {
    pattern: "cloud", seed: "zinify", "ink-a": "#eb48f7", "ink-b": "#3d5588", "two-tone": "off", "pattern-b": "sun",
    offset: 0.18, density: 0.75, "density-b": 0.7, fill: 1, scale: 1, soft: 0.35, pitch: 5, "angle-a": 15, "angle-b": 75,
    shape: "round", gain: 1, grain: 0.3, mis: 3,
  };

  function field(name, seed, A, scale) {
    const N = noise(seed);
    const fn = (PATTERNS[name] || PATTERNS.cloud)(N, A / scale);
    return { fn, N };
  }

  function dotHash(i, j, s) {
    let h = Math.imul(i, 374761393) ^ Math.imul(j, 668265263) ^ Math.imul(s, 2246822519);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }

  // Lay out one plate's halftone screen: every lattice dot inside the box, with its
  // resting tone, mottle, edge mask and a fixed random value (all deterministic).
  function buildPlate(W, H, dpr, opt, tone, edgeAt, ink, angleDeg, dx, dy, seed) {
    const pitch = Math.max(2, opt.pitch) * dpr, ang = (angleDeg * Math.PI) / 180;
    const ca = Math.cos(ang), sa = Math.sin(ang), R = Math.hypot(W, H) / 2 + pitch * 2;
    const cx = W / 2, cy = H / 2, M = noise(seed ^ 0x5bd1e995), g = opt.grain;
    const n = Math.ceil((2 * R) / pitch) + 1;
    const lx = [], ly = [], wx = [], wy = [], base = [], mot = [], edge = [], hr = [], gi = [], gj = [];
    for (let jj = 0; jj < n; jj++) {
      const j = -R + jj * pitch;
      for (let ii = 0; ii < n; ii++) {
        const i = -R + ii * pitch;
        const x = i + pitch / 2, y = j + pitch / 2;
        const px = cx + x * ca - y * sa + dx * dpr, py = cy + x * sa + y * ca + dy * dpr;
        if (px < -pitch || py < -pitch || px > W + pitch || py > H + pitch) continue;
        const u = px / W, v = py / H, m = edgeAt(u, v);
        if (m <= 0) continue;
        lx.push(x); ly.push(y); wx.push(px / dpr); wy.push(py / dpr);
        base.push(tone(u, v)); edge.push(m);
        mot.push(g > 0 ? 1 - g * 0.45 * S(0.4, 0.8, M.fbm(px / (34 * dpr), py / (34 * dpr), 3)) : 1);
        hr.push(dotHash(ii, jj, seed)); gi.push(ii); gj.push(jj);
      }
    }
    const N = lx.length, F = (a) => Float32Array.from(a);
    const index = new Int32Array(n * n).fill(-1);
    for (let k = 0; k < N; k++) index[gj[k] * n + gi[k]] = k;
    return { N, n, pitch, ca, sa, cx, cy, dx: dx * dpr, dy: dy * dpr, R, ink, opt,
      lx: F(lx), ly: F(ly), wx: F(wx), wy: F(wy), base: F(base), mot: F(mot), edge: F(edge), hr: F(hr),
      heat: new Float32Array(N), dirx: new Float32Array(N), diry: new Float32Array(N), fx: null, index, seed };
  }

  function paintPlate(ctx, P, W, H, dpr) {
    const o = P.opt, g = o.grain, pitch = P.pitch;
    ctx.save();
    ctx.fillStyle = P.ink;
    ctx.translate(P.cx + P.dx, P.cy + P.dy);
    ctx.rotate(Math.atan2(P.sa, P.ca));
    ctx.beginPath();
    const fx = P.fx, swell = fx ? fx.swell : 0, push = fx ? fx.push * P.pitch / Math.max(1e-6, o.pitch) : 0;
    for (let k = 0; k < P.N; k++) {
      const hk = P.heat[k];
      let t = hk > 0 ? P.base[k] * (1 + swell * hk) : P.base[k];
      if (t < 0.015) continue;
      if (t > 1) t = 1;
      if (g > 0 && P.hr[k] < g * 0.1 * (0.4 + t)) continue;
      t *= P.mot[k];
      const s = Math.sqrt(t) * o.gain, x = hk > 0 ? P.lx[k] + P.dirx[k] * push * hk : P.lx[k], y = hk > 0 ? P.ly[k] + P.diry[k] * push * hk : P.ly[k];
      if (o.shape === "square") {
        const e = pitch * 0.98 * s;
        if (e > 0.25) ctx.rect(x - e / 2, y - e / 2, e, e);
      } else if (o.shape === "line") {
        const e = pitch * 0.92 * t * o.gain;
        if (e > 0.25) ctx.rect(x - pitch / 2, y - e / 2, pitch + 0.6, e);
      } else {
        const rad = pitch * 0.62 * s;
        if (rad > 0.25) { ctx.moveTo(x + rad, y); ctx.arc(x, y, rad, 0, 6.2832); }
      }
    }
    ctx.fill();
    ctx.restore();
    if (g > 0) {
      const r = rng(P.seed + 99);
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      const n = Math.round(((W * H) / (900 * dpr * dpr)) * g * 6);
      for (let k = 0; k < n; k++) {
        ctx.globalAlpha = 0.5 + r() * 0.5;
        ctx.fillRect(r() * W, r() * H, (0.6 + r() * 1.4) * dpr, (0.6 + r() * 1.2) * dpr);
      }
      ctx.restore();
    }
  }

  // Build the plates for a box. Returns a plan that paint() can redraw cheaply.
  function prepare(attrs, cssW, cssH, dprIn) {
    const o = Object.assign({}, DEF);
    for (const k in attrs) if (attrs[k] != null && attrs[k] !== "") o[k] = attrs[k];
    ["offset", "density", "density-b", "fill", "scale", "soft", "pitch", "angle-a", "angle-b", "gain", "grain", "mis"].forEach((k) => (o[k] = +o[k]));
    const dpr = dprIn || Math.min(2, window.devicePixelRatio || 1);
    const W = Math.max(1, Math.round(cssW * dpr)), H = Math.max(1, Math.round(cssH * dpr));
    const A = cssW / cssH, sc = Math.max(0.2, o.scale), seed = hash(o.seed);
    const E = noise(seed ^ 0x9e3779b9);
    const soft = Math.max(0.03, o.soft) * Math.min(cssW, cssH);
    // organic edge fade: every pattern reaches zero before the box edge
    const edgeAt = (u, v) => {
      const k = soft * (0.55 + 0.9 * E.fbm(u * 3.2, v * 3.2, 3));
      return S(0, k, Math.min(u, 1 - u) * cssW) * S(0, k, Math.min(v, 1 - v) * cssH);
    };
    const gamma = 1 / Math.max(0.2, o.fill);
    const mk = (name, s, dens, ox, oy) => {
      const F = field(name, s, A, sc).fn;
      return (u, v) => {
        const m = edgeAt(u, v);
        if (m <= 0) return 0;
        const X = ((u - 0.5) * A) / sc - ox, Y = (v - 0.5) / sc - oy;
        return dens * Math.pow(clamp(F(X, Y)), gamma) * m;
      };
    };
    const misA = rng(seed + 7), ma = misA() * 6.2832;
    const mdx = Math.cos(ma) * o.mis, mdy = Math.sin(ma) * o.mis;
    const plates = [buildPlate(W, H, dpr, o, mk(o.pattern, seed, o.density, 0, 0), edgeAt, o["ink-a"], o["angle-a"], mdx, mdy, seed + 11)];
    let tB = null;
    const mode = o["two-tone"];
    if (mode && mode !== "off") {
      if (mode === "offset") { const a = rng(seed + 3)() * 6.2832; tB = mk(o.pattern, seed, o["density-b"], Math.cos(a) * o.offset, Math.sin(a) * o.offset * 0.6); }
      else if (mode === "reseed") tB = mk(o.pattern, seed + 101, o["density-b"], 0, 0);
      else if (mode === "pattern") tB = mk(o["pattern-b"], seed + 202, o["density-b"], 0, 0);
      else if (mode === "shadows") { const base = mk(o.pattern, seed, 1, 0, 0); tB = (u, v) => o["density-b"] * S(0.45, 0.9, base(u, v)); }
    }
    if (tB) plates.push(buildPlate(W, H, dpr, o, tB, edgeAt, o["ink-b"], o["angle-b"], 0, 0, seed + 13));
    return { W, H, dpr, plates, off: null };
  }

  function paint(canvas, plan) {
    const { W, H, dpr, plates } = plan;
    if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    paintPlate(ctx, plates[0], W, H, dpr);
    if (plates[1]) {
      const off = plan.off || (plan.off = document.createElement("canvas"));
      if (off.width !== W || off.height !== H) { off.width = W; off.height = H; }
      const c2 = off.getContext("2d");
      c2.setTransform(1, 0, 0, 1, 0, 0); c2.clearRect(0, 0, W, H);
      paintPlate(c2, plates[1], W, H, dpr);
      ctx.globalCompositeOperation = "multiply";
      ctx.drawImage(off, 0, 0);
      ctx.globalCompositeOperation = "source-over";
    }
  }

  function render(canvas, attrs, cssW, cssH, dprIn) {
    const plan = prepare(attrs, cssW, cssH, dprIn);
    paint(canvas, plan);
    return plan;
  }

  const ATTRS = Object.keys(DEF);

  class ZTexture extends HTMLElement {
    static get observedAttributes() { return ATTRS.concat(["interactive"]); }
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = '<style>:host{display:block;pointer-events:none}canvas{display:block;width:100%;height:100%}</style><canvas part="canvas"></canvas>';
      this._c = root.querySelector("canvas");
    }
    connectedCallback() {
      this.setAttribute("aria-hidden", "true");
      this._ro = new ResizeObserver(() => this.redraw());
      this._ro.observe(this);
      this._watchTheme();
      this._onMove = (e) => this._pointer(e, false);
      this._onDown = (e) => this._pointer(e, true);
      this._onLeave = () => { if (this._ptr) this._ptr.inside = false; this._kick(); };
      window.addEventListener("pointermove", this._onMove, { passive: true });
      window.addEventListener("pointerdown", this._onDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", this._onLeave);
      window.addEventListener("blur", this._onLeave);
    }
    disconnectedCallback() {
      this._ro && this._ro.disconnect();
      this._mo && this._mo.disconnect(); this._mo = null;
      this._onChange && document.removeEventListener("change", this._onChange, true);
      window.removeEventListener("pointermove", this._onMove);
      window.removeEventListener("pointerdown", this._onDown);
      document.documentElement.removeEventListener("pointerleave", this._onLeave);
      window.removeEventListener("blur", this._onLeave);
    }
    attributeChangedCallback(name) {
      if (name === "interactive") { if (!this._live()) this._calm(); return; }
      this._sig = null; this.redraw();
    }

    /* ---------- interactive: the cursor swells and nudges existing dots, trails, ripples, drifts ---------- */
    _live() {
      if (!this.hasAttribute("interactive")) return false;
      const mm = window.matchMedia;
      if (mm && !mm("(hover: hover) and (pointer: fine)").matches) return false;
      if (mm && mm("(prefers-reduced-motion: reduce)").matches) return false;
      return true;
    }
    _cfg() {
      const cs = getComputedStyle(this), g = (n, d) => { const v = parseFloat(cs.getPropertyValue(n)); return isNaN(v) ? d : v; };
      return { size: g("--z-cloud-size", 140), swell: g("--z-cloud-swell", 0.5), push: g("--z-cloud-push", 3), trail: Math.max(60, g("--z-cloud-trail", 500)), drift: g("--z-cloud-drift", 4) };
    }
    _pointer(e, down) {
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      if (!this._live() || !this._plan) return;
      const r = this.getBoundingClientRect(), w = this.clientWidth, h = this.clientHeight;
      const tx = this._drift ? this._drift.x : 0, ty = this._drift ? this._drift.y : 0;
      const x = e.clientX - (r.left - tx), y = e.clientY - (r.top - ty);
      const inside = x >= 0 && y >= 0 && x <= w && y <= h;
      this._ptr = { x, y, inside };
      if (down && inside) (this._ripples ||= []).push({ x, y, t0: performance.now() });
      if (inside || (this._active && this._active.size)) this._kick();
    }
    _kick() { if (!this._loop && this._plan) { this._last = 0; this._loop = requestAnimationFrame((t) => this._frame(t)); } }
    _calm() {
      const P = this._plan && this._plan.plates[0];
      if (P) P.heat.fill(0);
      this._active && this._active.clear();
      this._ripples = [];
      this._drift = { x: 0, y: 0 };
      this.style.translate = "";
      if (this._plan) paint(this._c, this._plan);
    }
    _raise(P, dpr, px, py, fn) {
      // visit lattice dots near (px, py) in css px; fn(distance, angle) -> target heat
      const X = px * dpr - (P.cx + P.dx), Y = py * dpr - (P.cy + P.dy);
      const lxp = X * P.ca + Y * P.sa, lyp = -X * P.sa + Y * P.ca;
      const reach = fn.reach * dpr, n = P.n, pitch = P.pitch;
      const i0 = Math.max(0, Math.floor((lxp - reach + P.R) / pitch)), i1 = Math.min(n - 1, Math.ceil((lxp + reach + P.R) / pitch));
      const j0 = Math.max(0, Math.floor((lyp - reach + P.R) / pitch)), j1 = Math.min(n - 1, Math.ceil((lyp + reach + P.R) / pitch));
      for (let jj = j0; jj <= j1; jj++) for (let ii = i0; ii <= i1; ii++) {
        const k = P.index[jj * n + ii];
        if (k < 0) continue;
        const ddx = P.lx[k] - lxp, ddy = P.ly[k] - lyp, dl = Math.sqrt(ddx * ddx + ddy * ddy);
        if (P.base[k] < 0.015) continue;                 // empty paper stays empty
        const v = fn(dl / dpr, Math.atan2(ddy, ddx)) * P.edge[k];
        if (v > P.heat[k] + 0.005) {
          fn.set(k, v); this._active.add(k);
          if (dl > 0.01) { P.dirx[k] = ddx / dl; P.diry[k] = ddy / dl; }
        }
      }
    }
    _frame(now) {
      this._loop = 0;
      const plan = this._plan;
      if (!plan || !this._live()) { this._calm(); return; }
      const P = plan.plates[0], dpr = plan.dpr, c = this._cfg();
      const dt = this._last ? Math.min(64, now - this._last) : 16; this._last = now;
      this._active ||= new Set();
      const decay = Math.exp(-dt / c.trail), rise = 1 - Math.exp(-dt / 70);
      for (const k of this._active) { P.heat[k] *= decay; if (P.heat[k] < 0.004) { P.heat[k] = 0; this._active.delete(k); } }

      const p = this._ptr, inside = p && p.inside;
      if (inside) {
        const R = c.size, t = now;
        const wob = (a) => 1 + 0.16 * Math.sin(a * 3 + t * 0.0011) + 0.1 * Math.sin(a * 5 - t * 0.0017 + 1.3) + 0.06 * Math.sin(a * 9 + t * 0.0023);
        const fn = (d, a) => { const rr = R * wob(a); return d > rr ? 0 : S(rr, rr * 0.1, d); };
        fn.reach = R * 1.35;
        fn.set = (k, v) => { P.heat[k] += (v - P.heat[k]) * rise; };
        this._raise(P, dpr, p.x, p.y, fn);
      }
      this._ripples = (this._ripples || []).filter((r) => now - r.t0 < 1400);
      for (const r of this._ripples) {
        const age = (now - r.t0) / 1400, rad = age * 240, str = (1 - age) * 0.9;
        const fn = (d) => { const ring = Math.abs(d - rad); return ring > 30 ? 0 : S(30, 0, ring) * str; };
        fn.reach = rad + 30;
        fn.set = (k, v) => { P.heat[k] = v; };
        this._raise(P, dpr, r.x, r.y, fn);
      }

      // the whole print drifts a little toward the cursor
      const w = this.clientWidth, h = this.clientHeight;
      const tx = inside ? ((p.x - w / 2) / (w / 2)) * c.drift : 0, ty = inside ? ((p.y - h / 2) / (h / 2)) * c.drift * 0.6 : 0;
      this._drift ||= { x: 0, y: 0 };
      const ke = 1 - Math.exp(-dt / 260);
      this._drift.x += (tx - this._drift.x) * ke; this._drift.y += (ty - this._drift.y) * ke;
      this.style.translate = this._drift.x.toFixed(2) + "px " + this._drift.y.toFixed(2) + "px";

      P.fx = { swell: c.swell, push: c.push };
      paint(this._c, plan);
      const settling = Math.abs(tx - this._drift.x) + Math.abs(ty - this._drift.y) > 0.05;
      if (inside || this._active.size || this._ripples.length || settling) this._loop = requestAnimationFrame((t2) => this._frame(t2));
    }
    // Ink attributes may name a CSS custom property, e.g. ink-a="var(--accent)" or ink-a="--accent",
    // so the texture follows the site's theme. Resolved against this element.
    _resolve(v) {
      if (!v) return v;
      const m = /^\s*(?:var\(\s*)?(--[\w-]+)\s*\)?\s*$/.exec(v);
      if (!m) return v;
      const val = getComputedStyle(this).getPropertyValue(m[1]).trim();
      if (!val) return undefined;
      const cx = (ZTexture._cx ||= document.createElement("canvas").getContext("2d"));
      cx.fillStyle = "#000"; cx.fillStyle = val; return cx.fillStyle;
    }
    _attrs() {
      const a = {};
      for (const k of ATTRS) if (this.hasAttribute(k)) a[k] = this.getAttribute(k);
      // seed="a, b, c" is a bank: pick one at random, once per page load
      if (a.seed && /[,\s]/.test(a.seed.trim())) {
        if (this._bank !== a.seed) {
          this._bank = a.seed;
          const list = a.seed.split(/[,\s]+/).filter(Boolean);
          this._pick = list[Math.floor(Math.random() * list.length)];
        }
        a.seed = this._pick;
      }
      a["ink-a"] = this._resolve(a["ink-a"]);
      a["ink-b"] = this._resolve(a["ink-b"]);
      return a;
    }
    redraw() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = 0;
        const w = this.clientWidth, h = this.clientHeight;
        if (w < 2 || h < 2) return;
        const a = this._attrs(), sig = JSON.stringify(a) + w + "x" + h;
        if (sig === this._sig) return;
        this._sig = sig;
        this._plan = render(this._c, a, w, h);
        if (this._active) this._active.clear();
      });
    }
    _watchTheme() {
      // Theme switches (inline custom properties, classes, data-* on <html>) can change resolved inks.
      if (this._mo) return;
      const uses = /--/.test((this.getAttribute("ink-a") || "") + (this.getAttribute("ink-b") || ""));
      if (!uses) return;
      this._mo = new MutationObserver(() => this.redraw());
      this._mo.observe(document.documentElement, { attributes: true });
      if (document.body) this._mo.observe(document.body, { attributes: true });
      this._onChange = () => this.redraw();
      document.addEventListener("change", this._onChange, true);
    }
    toPNG() { return this._c.toDataURL("image/png"); }
  }
  customElements.define("z-texture", ZTexture);
  window.ZTexture = { render, patterns: Object.keys(PATTERNS), defaults: DEF };
})();
