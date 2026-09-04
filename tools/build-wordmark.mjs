// Generates the footer wordmark SVG markup for "FARHAN SEGUJJA".
//
// Every glyph is a CLOSED block contour (plus a counter subpath where the
// letter has one), derived from the shared measurements below -- no glyph is
// drawn by eye and none is a centerline polyline. Run:
//   node tools/build-wordmark.mjs --write
// to regenerate the markup in all five pages.

import { readFileSync, writeFileSync } from 'node:fs'

// ---------------------------------------------------------------------------
// 1. THE TYPE SYSTEM. Every number in every glyph comes from here.
// ---------------------------------------------------------------------------
const CAP = 180 // cap height: glyph y runs 0 (cap) .. 180 (baseline)
const STEM = 40 // vertical stem thickness
const ARM = 36 // horizontal arm thickness; also the vertical band unit
const FACET = 36 // corner cut on the round letters (G, U, J)
const CH = 10 // chamfer on terminal corners (a crisp bevel, not a cut tip)
const GAP = 28 // letter gap
const WORDSPACE = 88 // gap between the two words
const PAD = 28 // horizontal frame padding

// Horizontal landmarks every glyph shares: y = 0, 36, 72, 108, 144, 180.
// Arms, crossbars and counters all snap to this 5-band grid, so F/E/H/S/A/R/G
// share exact internal landmarks by construction.
const B = (n) => n * ARM

// Frame: the glyph band sits well inside the rules, so no rule can ever
// cross a letter contour.
const FRAME_TOP = 0
const RULE_TOP = 30
const CAP_Y = 72 // cap height begins here
const BASE_Y = CAP_Y + CAP // 252 -- baseline
const CLEAR = 42 // air between a datum rule and the cap line / baseline
const RULE_BOT = BASE_Y + CLEAR // 294
const FRAME_BOT = RULE_BOT + RULE_TOP // 324
const LINE_ADVANCE = 300 // mobile: line 1 cap -> line 2 cap

// The reveal is sized off the cap height, not the frame, so retuning the
// frame's air never changes how much of the wordmark the ink uncovers.
const INK_RADIUS = Math.round(CAP * 0.95)

// Inner counter facet: the inset of a FACET-cut corner by a wall of ARM.
const FACET_IN = +(FACET - ARM * (Math.SQRT2 - 1)).toFixed(1) // 21.1

// ---------------------------------------------------------------------------
// 2. GLYPHS. Vertex rings in local coords, y 0 (cap) .. 180 (baseline).
//    First ring = outer contour, any further ring = counter (a hole).
// ---------------------------------------------------------------------------
const A_W = 180
const A_APEX_L = 76
const A_APEX_R = 104
const A_FOOT = 44
const A_SLOPE = A_APEX_L / CAP // inner diagonals run parallel to the outer
const aInL = (y) => +(A_FOOT + (CAP - y) * A_SLOPE).toFixed(1)
const aInR = (y) => +(A_W - A_FOOT - (CAP - y) * A_SLOPE).toFixed(1)
const A_APEX_T = +(CAP - (A_W - 2 * A_FOOT) / (2 * A_SLOPE)).toFixed(1)

// A's crossbar closes a triangular counter rather than dividing a rectilinear
// stack, so it sits half a band below the mid-band the other letters share.
// On the mid-band it would meet the converging diagonals only ~37u below the
// counter apex and the counter would collapse to a dot.
const A_BAR_TOP = B(3) + ARM / 2
const A_BAR_BOT = A_BAR_TOP + ARM

// R -- a bold-sans R rebuilt from the construction system: block stem, a
// D-shaped bowl that CLOSES back onto the stem, and a leg that springs from
// under the bowl's lower right. The bowl closing is the whole point; when it
// ran straight down into the leg instead, the R read as a long narrow
// capsule rather than a bowl.
//
// The bowl is the top R_BOWL_BOT of the cap (60%), broad rather than tall:
// its right end is a half-ellipse R_BOWL_RX wide and R_BOWL_BOT/2 tall, so
// the counter comes out 58x36 -- wider than it is tall, as in the reference.
// R_BOWL_K is the corner tension; 0.60 sits just above circular (0.5523),
// firming the curve without flattening it.
const R_W = 158
const R_BOWL = 134 // bowl's widest point
const R_BOWL_BOT = B(3) // bowl closes back onto the stem here
const R_BOWL_RX = 50 // horizontal radius of the D's right end
const R_BOWL_K = 0.6
const R_LEG_W = 44 // leg's HORIZONTAL width; perpendicular lands on STEM

const R_BOWL_CX = R_BOWL - R_BOWL_RX // where the flat top hands over to the D
const R_BOWL_MY = R_BOWL_BOT / 2 // the D's widest point

// The leg's inner edge springs from the bowl's bottom-right corner and runs
// to the baseline; the outer edge is that line pushed right by R_LEG_W, so
// the two stay parallel and the perpendicular thickness matches STEM
// (44 * 72 / hypot(30,72) = 40.6, beside A's 40.5).
const R_LEG_DIR = (() => {
  const d = [R_W - R_LEG_W - R_BOWL_CX, CAP - R_BOWL_BOT]
  const len = Math.hypot(d[0], d[1])
  return [d[0] / len, d[1] / len]
})()

// Rounded corner: horizontal tangent at the start, vertical at the end.
const roundCorner = (x0, y0, rx, ry, k) => [
  [x0, y0],
  [x0 + k * rx, y0],
  [x0 + rx, y0 + ry * (1 - k)],
  [x0 + rx, y0 + ry],
]
// ...and its mirror: vertical tangent in, horizontal out.
const roundCornerOut = (x1, y0, rx, ry, k) => [
  [x1, y0],
  [x1, y0 + k * ry],
  [x1 - rx + (1 - k) * rx, y0 + ry],
  [x1 - rx, y0 + ry],
]

// --- cubic helpers, used only by R ----------------------------------------
const bezPt = (P, t) => {
  const u = 1 - t
  return [
    u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0],
    u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1],
  ]
}
// de Casteljau -- the exact sub-curve from 0 to t.
function bezSplit(P, t) {
  const lp = (A, B) => [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t]
  const a = lp(P[0], P[1])
  const b = lp(P[1], P[2])
  const c = lp(P[2], P[3])
  const d = lp(a, b)
  const e = lp(b, c)
  return [P[0], a, d, lp(d, e)]
}
// Where the bowl's lower-right curve crosses the leg's outer edge -- the
// point the leg springs from. Solved rather than eyeballed so the junction
// stays exact if any bowl or leg constant is retuned.
function bezCrossLine(P, origin, dir) {
  const side = (t) => {
    const q = bezPt(P, t)
    return (q[0] - origin[0]) * dir[1] - (q[1] - origin[1]) * dir[0]
  }
  let lo = 0
  let hi = 1
  const s0 = side(0)
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2
    if (Math.sign(side(m)) === Math.sign(s0)) lo = m
    else hi = m
  }
  return (lo + hi) / 2
}

const GLYPHS = {
  F: {
    w: 126,
    rings: [[
      [0, 0], [126, 0], [126, B(1)], [STEM, B(1)], [STEM, B(2)],
      [106, B(2)], [106, B(3)], [STEM, B(3)], [STEM, CAP], [0, CAP],
    ]],
  },

  A: {
    w: A_W,
    rings: [
      [
        [A_APEX_L, 0], [A_APEX_R, 0], [A_W, CAP], [A_W - A_FOOT, CAP],
        [aInR(A_BAR_BOT), A_BAR_BOT], [aInL(A_BAR_BOT), A_BAR_BOT], [A_FOOT, CAP], [0, CAP],
      ],
      [
        [(A_APEX_L + A_APEX_R) / 2, A_APEX_T],
        [aInL(A_BAR_TOP), A_BAR_TOP],
        [aInR(A_BAR_TOP), A_BAR_TOP],
      ],
    ],
  },

  // Stem, leg foot and bowl floor keep the same CH chamfers the ring builder
  // gives every other glyph; the bowl is cubic Beziers, so this glyph writes
  // its own path.
  R: {
    w: R_W,
    path() {
      const n = (v) => (Math.round(v * 10) / 10).toString()
      const pt = (p) => `${n(p[0])},${n(p[1])}`
      const cv = (c) => `C${pt(c[1])} ${pt(c[2])} ${pt(c[3])}`

      // Bowl: two quarters making a D. Out to the widest point at mid-bowl,
      // then back in to close on the stem at the bowl floor.
      const upper = roundCorner(R_BOWL_CX, 0, R_BOWL_RX, R_BOWL_MY, R_BOWL_K)
      const lower = roundCornerOut(R_BOWL, R_BOWL_MY, R_BOWL_RX, R_BOWL_MY, R_BOWL_K)

      // Leg. Inner edge springs from the bowl's bottom-right corner; the
      // outer edge is the same line R_LEG_W to its right, and the bowl's
      // lower curve is cut where that outer edge meets it.
      const legFoot = R_W - R_LEG_W
      const outerOrigin = [R_BOWL_CX + R_LEG_W, R_BOWL_BOT]
      const spring = bezSplit(lower, bezCrossLine(lower, outerOrigin, R_LEG_DIR))
      const lx = CH * R_LEG_DIR[0]
      const ly = CH * R_LEG_DIR[1]

      // Counter: concentric with the bowl -- same centre, both radii pulled
      // in by one wall -- so it follows the bowl's curvature exactly.
      const cRx = R_BOWL_RX - ARM
      const cRy = R_BOWL_MY - ARM
      const cBot = R_BOWL_BOT - ARM
      const cUpper = roundCorner(R_BOWL_CX, ARM, cRx, cRy, R_BOWL_K)
      const cLower = roundCornerOut(R_BOWL - ARM, R_BOWL_MY, cRx, cRy, R_BOWL_K)
      // The counter is only ARM tall between its corners, so its left-hand
      // chamfers hit the shared half-the-edge budget before reaching CH.
      const cch = Math.min(CH, ((cBot - ARM) * EDGE_BUDGET) / 2)

      return (
        `M0,${CH}L${CH},0L${R_BOWL_CX},0${cv(upper)}${cv(spring)}` +
        `L${n(R_W - lx)},${n(CAP - ly)}L${R_W - CH},${CAP}` +
        `L${legFoot + CH},${CAP}L${n(legFoot - lx)},${n(CAP - ly)}` +
        `L${R_BOWL_CX},${R_BOWL_BOT}L${STEM},${R_BOWL_BOT}` +
        `L${STEM},${CAP - CH}L${STEM - CH},${CAP}L${CH},${CAP}L0,${CAP - CH}Z` +
        `M${STEM},${n(ARM + cch)}L${n(STEM + cch)},${ARM}L${R_BOWL_CX},${ARM}` +
        `${cv(cUpper)}${cv(cLower)}` +
        `L${n(STEM + cch)},${cBot}L${STEM},${n(cBot - cch)}Z`
      )
    },
  },

  H: {
    w: 146,
    rings: [[
      [0, 0], [STEM, 0], [STEM, B(2)], [106, B(2)], [106, 0], [146, 0],
      [146, CAP], [106, CAP], [106, B(3)], [STEM, B(3)], [STEM, CAP], [0, CAP],
    ]],
  },

  // Diagonal vertical offset chosen so its perpendicular thickness lands on
  // STEM, matching A's legs -- a diagonal at nominal stem width reads thin.
  N: {
    w: 150,
    rings: [[
      [0, 0], [STEM, 0], [110, 106], [110, 0], [150, 0], [150, CAP],
      [110, CAP], [STEM, 74], [STEM, CAP], [0, CAP],
    ]],
  },

  // Five equal ARM bands: bar / notch-right / bar / notch-left / bar.
  S: {
    w: 134,
    rings: [[
      [0, 0], [134, 0], [134, B(1)], [STEM, B(1)], [STEM, B(2)], [134, B(2)],
      [134, CAP], [0, CAP], [0, B(4)], [94, B(4)], [94, B(3)], [0, B(3)],
    ]],
  },

  E: {
    w: 126,
    rings: [[
      [0, 0], [126, 0], [126, B(1)], [STEM, B(1)], [STEM, B(2)],
      [106, B(2)], [106, B(3)], [STEM, B(3)], [STEM, B(4)], [126, B(4)],
      [126, CAP], [0, CAP],
    ]],
  },

  G: {
    w: 156,
    rings: [[
      [FACET, 0], [120, 0], [156, FACET], [FACET + FACET_IN, B(1)],
      [FACET, FACET + FACET_IN], [FACET, B(4) - FACET_IN], [FACET + FACET_IN, B(4)],
      [120, B(4)], [120, B(3)], [80, B(3)], [80, B(2)], [156, B(2)],
      [156, B(4)], [120, CAP], [FACET, CAP], [0, B(4)], [0, FACET],
    ]],
  },

  U: {
    w: 146,
    rings: [[
      [0, 0], [STEM, 0], [STEM, B(4) - FACET_IN], [STEM + FACET_IN, B(4)],
      [106 - FACET_IN, B(4)], [106, B(4) - FACET_IN], [106, 0], [146, 0],
      [146, B(4)], [146 - FACET, CAP], [FACET, CAP], [0, B(4)],
    ]],
  },

  J: {
    w: 104,
    rings: [[
      [64, 0], [104, 0], [104, B(4)], [104 - FACET, CAP], [0, CAP],
      [0, B(4)], [64 - FACET_IN, B(4)], [64, B(4) - FACET_IN],
    ]],
  },
}

// ---------------------------------------------------------------------------
// 3. ONE corner rule, applied to every ring: chamfer convex corners that
//    turn more than 60 degrees; leave concave corners and shallow facet
//    corners square. That is what keeps the corner treatment consistent.
//
//    Terminal edges are only ARM or STEM long, so both of their corners
//    compete for the same edge. EDGE_BUDGET reserves half of every edge as
//    flat, scaling a conflicting pair down in proportion -- that is what
//    keeps a stem foot reading as a flat contact on the baseline instead of
//    a pencil tip, without introducing a per-letter exception.
// ---------------------------------------------------------------------------
const CHAMFER_MIN_TURN = 60
const EDGE_BUDGET = 0.5

function ringToPath(ring) {
  const n = ring.length
  const area = ring.reduce((sum, pt, i) => {
    const next = ring[(i + 1) % n]
    return sum + (pt[0] * next[1] - next[0] * pt[1])
  }, 0)
  const wind = Math.sign(area)

  const edge = (i) => {
    const V = ring[i]
    const N = ring[(i + 1) % n]
    const d = [N[0] - V[0], N[1] - V[1]]
    return { d, len: Math.hypot(d[0], d[1]) }
  }

  // pass 1 -- which corners want a chamfer
  const want = ring.map((V, i) => {
    const inE = edge((i - 1 + n) % n)
    const outE = edge(i)
    if (!inE.len || !outE.len) return 0
    const cross = inE.d[0] * outE.d[1] - inE.d[1] * outE.d[0]
    if (Math.sign(cross) !== wind) return 0 // concave
    const dot = (inE.d[0] * outE.d[0] + inE.d[1] * outE.d[1]) / (inE.len * outE.len)
    const turn = (Math.acos(Math.max(-1, Math.min(1, dot))) * 180) / Math.PI
    return turn < CHAMFER_MIN_TURN ? 0 : CH // shallow facet corners stay crisp
  })

  // pass 2 -- share each edge between the two corners that consume it
  const cut = want.slice()
  for (let i = 0; i < n; i++) {
    const { len } = edge(i)
    const j = (i + 1) % n
    const demand = want[i] + want[j]
    if (!demand || !len) continue
    const budget = len * EDGE_BUDGET
    if (demand <= budget) continue
    const k = budget / demand
    cut[i] = Math.min(cut[i], want[i] * k)
    cut[j] = Math.min(cut[j], want[j] * k)
  }

  const out = []
  for (let i = 0; i < n; i++) {
    const V = ring[i]
    const inE = edge((i - 1 + n) % n)
    const outE = edge(i)
    if (!inE.len || !outE.len) continue
    const c = cut[i]
    if (!c) {
      out.push(V)
      continue
    }
    out.push(
      [V[0] - (inE.d[0] / inE.len) * c, V[1] - (inE.d[1] / inE.len) * c],
      [V[0] + (outE.d[0] / outE.len) * c, V[1] + (outE.d[1] / outE.len) * c]
    )
  }

  const f = (v) => (Math.round(v * 10) / 10).toString()
  return 'M' + out.map((p) => f(p[0]) + ',' + f(p[1])).join('L') + 'Z'
}

const glyphPath = (k) =>
  GLYPHS[k].path ? GLYPHS[k].path() : GLYPHS[k].rings.map(ringToPath).join('')

// ---------------------------------------------------------------------------
// 4. Layout
// ---------------------------------------------------------------------------
const WORD1 = [...'FARHAN']
const WORD2 = [...'SEGUJJA']
const wordWidth = (w) => w.reduce((s, k) => s + GLYPHS[k].w, 0) + (w.length - 1) * GAP

function place(letters, x0, y0) {
  let x = x0
  return letters.map((k) => {
    const at = { k, x: +x.toFixed(1), y: y0, w: GLYPHS[k].w }
    x += GLYPHS[k].w + GAP
    return at
  })
}

const W1 = wordWidth(WORD1)
const W2 = wordWidth(WORD2)

// Desktop: one line.
const D_W = PAD * 2 + W1 + WORDSPACE + W2
const D_H = FRAME_BOT
const D_SLOTS = [
  ...place(WORD1, PAD, CAP_Y),
  ...place(WORD2, PAD + W1 + WORDSPACE, CAP_Y),
]

// Mobile: two lines, each centred on the wider one.
const M_INNER = Math.max(W1, W2)
const M_W = PAD * 2 + M_INNER
const M_H = FRAME_BOT + LINE_ADVANCE
const M_SLOTS = [
  ...place(WORD1, PAD + (M_INNER - W1) / 2, CAP_Y),
  ...place(WORD2, PAD + (M_INNER - W2) / 2, CAP_Y + LINE_ADVANCE),
]
const M_LINES = [CAP_Y, CAP_Y + LINE_ADVANCE]

// ---------------------------------------------------------------------------
// 5. Markup
// ---------------------------------------------------------------------------
const uses = (slots, indent) =>
  slots.map((s) => `${indent}<use href="#wm-${s.k}" x="${s.x}" y="${s.y}" />`).join('\n')

// Rulers: the horizontal datums + edge ticks + corner registration crosses.
// All ticks live in the frame margins, outside the glyph band.
function rulers(w, h, lines, indent) {
  const o = []
  for (const capY of lines) {
    o.push(`${indent}<line class="wm-datum" x1="0" y1="${capY - CLEAR}" x2="${w}" y2="${capY - CLEAR}" />`)
    o.push(`${indent}<line class="wm-datum" x1="0" y1="${capY + CAP + CLEAR}" x2="${w}" y2="${capY + CAP + CLEAR}" />`)
  }

  const spacing = 48
  const count = Math.floor(w / spacing)
  const off = +((w - count * spacing) / 2).toFixed(1)
  for (const [edge, y, dir] of [['top', FRAME_TOP, 1], ['bottom', h, -1]]) {
    const t = []
    for (let i = 0; i <= count; i++) {
      const x = +(i * spacing + off).toFixed(1)
      const len = i % 5 === 0 ? 11 : 5
      t.push(`<line x1="${x}" y1="${y}" x2="${x}" y2="${y + dir * len}" />`)
    }
    o.push(`${indent}<g class="wm-tick" data-edge="${edge}">${t.join('')}</g>`)
  }

  const corners = [[16, 16], [w - 16, 16], [16, h - 16], [w - 16, h - 16]]
  for (const [cx, cy] of corners) {
    o.push(
      `${indent}<g class="wm-cross">` +
        `<line x1="${cx - 6}" y1="${cy}" x2="${cx + 6}" y2="${cy}" />` +
        `<line x1="${cx}" y1="${cy - 6}" x2="${cx}" y2="${cy + 6}" />` +
        `</g>`
    )
  }
  return o.join('\n')
}

// Guides: per-letter extension lines, drawn only in the margin bands between
// a datum rule and the cap/baseline, so they read as drafting extensions
// without colliding with any glyph.
function guides(slots, indent) {
  const o = []
  const seen = new Set()
  for (const s of slots) {
    for (const x of [s.x, +(s.x + s.w).toFixed(1)]) {
      const key = `${x}:${s.y}`
      if (seen.has(key)) continue
      seen.add(key)
      o.push(
        `${indent}  <line x1="${x}" y1="${s.y - CLEAR}" x2="${x}" y2="${s.y - 10}" />` +
          `<line x1="${x}" y1="${s.y + CAP + 10}" x2="${x}" y2="${s.y + CAP + CLEAR}" />`
      )
    }
  }
  return `${indent}<g class="wm-extension">\n${o.join('\n')}\n${indent}</g>`
}

// Accent markers on real structural landmarks, not decoration.
function joints(slots, indent) {
  const picks = [
    [3, 106, B(2)], // H crossbar, right junction
    [1, A_FOOT, CAP], // A inner left foot meeting the baseline
    [8, 80, B(2)], // G crossbar terminal
    [6, 94, B(3)], // S lower notch corner
  ]
  return picks
    .filter(([i]) => slots[i])
    .map(([i, dx, dy]) => {
      const s = slots[i]
      const x = +(s.x + dx - 4).toFixed(1)
      const y = +(s.y + dy - 4).toFixed(1)
      return `${indent}<rect class="wm-joint" x="${x}" y="${y}" width="8" height="8" />`
    })
    .join('\n')
}

function svgMarkup({ id, cls, w, h, slots, lines, scale, indent }) {
  const p = indent
  const q = p + '  '
  return `${p}<svg
${q}class="${cls}"
${q}data-wordmark
${q}data-ink-radius="${INK_RADIUS}"
${q}viewBox="0 0 ${w} ${h}"
${q}aria-hidden="true"
${p}>
${q}<defs>
${q}  <filter id="wm-ink-warp-${id}" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
${q}    <feTurbulence type="fractalNoise" baseFrequency="0.009 0.013" numOctaves="2" seed="${id === 'd' ? 7 : 11}" result="noise" />
${q}    <feDisplacementMap in="SourceGraphic" in2="noise" scale="${scale}" xChannelSelector="R" yChannelSelector="G" result="warped" />
${q}    <feGaussianBlur in="warped" stdDeviation="4" result="soft" />
${q}    <feComponentTransfer in="soft">
${q}      <feFuncA type="linear" slope="3.4" intercept="-0.95" />
${q}    </feComponentTransfer>
${q}  </filter>
${q}  <mask id="wm-ink-mask-${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}">
${q}    <g filter="url(#wm-ink-warp-${id})">
${q}      <circle class="wm-blob" cx="-400" cy="-400" r="0" fill="#fff" />
${q}      <circle class="wm-blob" cx="-400" cy="-400" r="0" fill="#fff" opacity="0.85" />
${q}      <circle class="wm-blob" cx="-400" cy="-400" r="0" fill="#fff" opacity="0.7" />
${q}    </g>
${q}  </mask>
${q}</defs>

${q}<!-- rulers sit below the glyph layer, so no rule can cut a letter -->
${q}<g class="wm-rulers">
${rulers(w, h, lines, q + '  ')}
${q}</g>

${q}<!-- glyph geometry: closed block contours, hairline stroke -->
${q}<g class="wm-outline">
${uses(slots, q + '  ')}
${q}</g>

${guides(slots, q)}

${q}<!-- hover fill: the same geometry, filled, revealed through the ink mask -->
${q}<g class="wm-fill" mask="url(#wm-ink-mask-${id})">
${uses(slots, q + '  ')}
${q}</g>

${joints(slots, q)}
${p}</svg>`
}

const defsBlock = `  <svg aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">
    <defs>
${Object.keys(GLYPHS).map((k) => `      <path id="wm-${k}" d="${glyphPath(k)}" />`).join('\n')}
    </defs>
  </svg>`

const wordmarkBlock = `    <div class="footer-wordmark" role="img" aria-label="Farhan Segujja">
${svgMarkup({ id: 'd', cls: 'footer-wordmark-desktop hidden lg:block', w: D_W, h: D_H, slots: D_SLOTS, lines: [CAP_Y], scale: 26, indent: '      ' })}

${svgMarkup({ id: 'm', cls: 'footer-wordmark-mobile lg:hidden', w: M_W, h: M_H, slots: M_SLOTS, lines: M_LINES, scale: 18, indent: '      ' })}
    </div>`

// ---------------------------------------------------------------------------
// 6. Splice into the pages
// ---------------------------------------------------------------------------
const PAGES = [
  'index.html',
  '404.html',
  'work/index.html',
  'work/c23/index.html',
  'experience/embiro/index.html',
]

if (process.argv.includes('--write')) {
  for (const page of PAGES) {
    const before = readFileSync(page, 'utf8')
    let html = before.replace(
      /[ \t]*<svg aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">[\s\S]*?<\/svg>/,
      defsBlock
    )
    html = html.replace(
      /[ \t]*<div class="footer-wordmark"[\s\S]*?\n[ \t]*<\/div>(?=\s*<\/footer>)/,
      wordmarkBlock
    )
    if (html === before) throw new Error('no substitution made in ' + page)
    writeFileSync(page, html)
    console.log('wrote', page)
  }
} else {
  console.log(defsBlock)
  console.log(wordmarkBlock)
}

// Perpendicular thickness of a diagonal band. A horizontal offset (A, R legs)
// projects through dy; a vertical offset (N) projects through dx.
const perpH = (dx, dy, w) => ((w * dy) / Math.hypot(dx, dy)).toFixed(1)
const perpV = (dx, dy, v) => ((v * dx) / Math.hypot(dx, dy)).toFixed(1)
console.error(`
system    CAP=${CAP} STEM=${STEM} ARM=${ARM} FACET=${FACET} CH=${CH} GAP=${GAP}
bands     y = ${[0, 1, 2, 3, 4, 5].map(B).join(', ')}
counter   facet inset = ${FACET_IN}
frame     rule ${RULE_TOP} | cap ${CAP_Y} -> baseline ${BASE_Y} | rule ${RULE_BOT} | edge ${FRAME_BOT}
clearance ${CLEAR}u above cap and below baseline; ink radius ${INK_RADIUS}
desktop   ${D_W} x ${D_H}  (aspect ${(D_W / D_H).toFixed(2)})
mobile    ${M_W} x ${M_H}  (aspect ${(M_W / M_H).toFixed(2)})
diagonals A leg ${perpH(A_APEX_L, CAP, A_FOOT)}, N ${perpV(70, 106, 74)}, R leg ${perpH(R_W - R_BOWL, CAP - R_BOWL_BOT, R_LEG_W)}  (target STEM=${STEM})
A counter apex y=${A_APEX_T}, bar ${A_BAR_TOP}-${A_BAR_BOT}, counter ${(aInR(A_BAR_TOP) - aInL(A_BAR_TOP)).toFixed(1)} x ${(A_BAR_TOP - A_APEX_T).toFixed(1)}
R counter  ${R_BOWL - ARM - STEM} x ${R_BOWL_BOT - 2 * ARM}, bowl bottom ${R_BOWL_BOT}, leg ${(Math.atan2(R_W - R_BOWL, CAP - R_BOWL_BOT) * 180 / Math.PI).toFixed(1)}deg from vertical (<=30 keeps both foot chamfers)
subpaths  ${Object.keys(GLYPHS).map((k) => k + ':' + (GLYPHS[k].rings ? GLYPHS[k].rings.length : 2)).join(' ')}`)
