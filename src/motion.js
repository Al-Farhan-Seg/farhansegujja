import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText)

const root = document.documentElement
const reduced = root.classList.contains('motion-reduced')
const finePointer = window.matchMedia('(pointer: fine)').matches

initLightbox()
initScrollProgress()
initSmoothAnchors()
initPageTransitions()
initThemeToggle()
initHeaderScrollState()
initMobileNav()
initFooterWordmark()
initContactSchematic()
initFarhanCore()

if (!reduced) {
  initSplash()
  initHeroIntro()
  initWorkHeroSlideIn()
  initRoleTypewriter()
  initReveals()
  initPinSteps()
  if (finePointer) {
    initMagnetic()
    initCursor()
  }
  initEvidenceHover()
  initFaqAccordion()
}

function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress')
  if (!bar || reduced) return

  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: 0.3,
    },
  })
}

function initSmoothAnchors() {
  if (reduced) return

  document.querySelectorAll('a[href*="#"]').forEach((link) => {
    let url
    try {
      url = new URL(link.getAttribute('href'), location.href)
    } catch {
      return
    }
    if (url.pathname !== location.pathname || url.origin !== location.origin || !url.hash) return

    link.addEventListener('click', (e) => {
      const target = document.querySelector(url.hash)
      if (!target) return
      e.preventDefault()
      gsap.to(window, {
        duration: 0.9,
        ease: 'power3.inOut',
        scrollTo: { y: target, offsetY: 64 },
      })
      history.pushState(null, '', url.hash)
    })
  })
}

function initPageTransitions() {
  const overlay = document.querySelector('.page-transition')
  if (!overlay) return

  if (reduced) {
    overlay.style.display = 'none'
    return
  }

  // Cover and reveal are set together, right here, so the overlay is never left
  // covering the page while waiting on a slow network — it only exists for the
  // instant this script is actually running.
  gsap.set(overlay, { scaleY: 1, transformOrigin: 'top' })
  gsap.to(overlay, { scaleY: 0, duration: 0.7, ease: 'power3.inOut', delay: 0.05 })

  document.querySelectorAll('a[href]').forEach((link) => {
    let url
    try {
      url = new URL(link.getAttribute('href'), location.href)
    } catch {
      return
    }

    const isInternal = url.origin === location.origin
    const isSamePageHash = isInternal && url.pathname === location.pathname && url.hash
    const isSpecial =
      link.target === '_blank' ||
      link.hasAttribute('download') ||
      link.protocol === 'mailto:' ||
      link.protocol === 'tel:'

    if (!isInternal || isSamePageHash || isSpecial) return

    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault()
      gsap.set(overlay, { transformOrigin: 'bottom' })
      gsap.to(overlay, {
        scaleY: 1,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          location.href = link.href
        },
      })
    })
  })
}

function initThemeToggle() {
  syncThemeColorMeta()

  const btn = document.querySelector('[data-theme-toggle]')
  if (!btn) return

  const themes = ['light', 'dark', 'umber']

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'umber'
    const next = themes[(themes.indexOf(current) + 1) % themes.length]

    root.setAttribute('data-theme', next)
    syncThemeColorMeta()

    try {
      localStorage.setItem('theme', next)
    } catch {
      // Private browsing / storage disabled: theme still applies for this load.
    }
  })
}

// Keeps the mobile browser-chrome color (address bar / status bar) matching
// the active theme instead of sitting stuck on whatever the static <meta>
// fallback in <head> declared. Reads the resolved custom property rather
// than a hand-picked value so it can never drift from the real token.
function syncThemeColorMeta() {
  const meta = document.querySelector('meta[name="theme-color"]')
  if (!meta) return
  const paper = getComputedStyle(root).getPropertyValue('--color-paper').trim()
  if (paper) meta.setAttribute('content', paper)
}

function initMobileNav() {
  const nav = document.querySelector('.nav-mobile')
  if (!nav) return

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.open = false
    })
  })

  document.addEventListener('click', (e) => {
    if (nav.open && !nav.contains(e.target)) nav.open = false
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.open) {
      nav.open = false
      nav.querySelector('summary')?.focus()
    }
  })
}

function initHeaderScrollState() {
  const header = document.querySelector('.site-header')
  if (!header) return

  ScrollTrigger.create({
    start: 'top -8',
    end: 99999,
    toggleClass: { targets: header, className: 'is-scrolled' },
  })
}

function initSplash() {
  const splash = document.querySelector('[data-splash]')
  if (!splash) return

  try {
    if (sessionStorage.getItem('splashSeen') === '1') return
  } catch {
    // Storage disabled: fall through and play the splash anyway rather than
    // guessing whether this is a first visit.
  }

  const particlesLayer = splash.querySelector('[data-splash-particles]')
  const logo = splash.querySelector('[data-splash-logo]')
  const markSeen = () => {
    try {
      sessionStorage.setItem('splashSeen', '1')
    } catch {
      // Ignore: worst case the splash replays next load.
    }
  }

  // Kept low enough, at the storm radius below, that adjacent particles'
  // rotated bounding boxes never touch even on the narrowest phone screens.
  const PARTICLE_COUNT = 18
  const particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const span = document.createElement('span')
    span.className = 'splash-particle'
    span.textContent = '</>'
    particlesLayer.appendChild(span)
    particles.push(span)
  }

  // Smaller viewport dimension, not larger — otherwise the circle the
  // particles form is sized off the tall axis on a narrow phone screen and
  // spills past the (already overflow-hidden) edges instead of reading as
  // a clean circle.
  const spread = () => Math.min(window.innerWidth, window.innerHeight) * 0.5
  const angleStep = (Math.PI * 2) / PARTICLE_COUNT
  const STORM_RADIUS_FACTOR = 0.8

  // xPercent/yPercent center each particle's own box on its circle-path
  // point (top/left: 50% in CSS only anchors the box's corner there); GSAP
  // keeps this offset in place through every later tween that only touches
  // x/y, so the ring stays centered on the viewport instead of drifting
  // toward the bottom-right by half a particle's size.
  gsap.set(particles, {
    x: (i) => Math.cos(angleStep * i) * spread() * 1.6,
    y: (i) => Math.sin(angleStep * i) * spread() * 1.6,
    xPercent: -50,
    yPercent: -50,
    rotation: () => gsap.utils.random(-180, 180),
    scale: 0.4,
    opacity: 0,
  })

  root.classList.add('splash-active')

  const finish = () => {
    root.classList.remove('splash-active')
    splash.remove()
    markSeen()
  }

  // Safety net: if a tab is backgrounded mid-sequence and rAF stalls, don't
  // leave the homepage permanently covered — force-clear after a hard cap.
  const safety = setTimeout(finish, 6000)

  const tl = gsap.timeline({
    onComplete: () => {
      clearTimeout(safety)
      finish()
    },
  })

  // Storm: "</>" particles rush in from every edge and settle into an even
  // ring. Same angle per particle as the initial set() above, so each one
  // travels a straight radial line inward — different particles' paths
  // point at the same center but never cross — and lands evenly spaced
  // around the circle instead of the bunched, uneven arcs a mismatched
  // angle would produce.
  tl.to(particles, {
    x: (i) => Math.cos(angleStep * i) * spread() * STORM_RADIUS_FACTOR,
    y: (i) => Math.sin(angleStep * i) * spread() * STORM_RADIUS_FACTOR,
    rotation: () => gsap.utils.random(-40, 40),
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out',
    stagger: { each: 0.012, from: 'random' },
  })

  // Converge: the whole ring gives one quick spin as it collapses into the
  // center, then the logo pops out of it. Rotating the shared layer (rather
  // than each particle around its own point) keeps the ring intact as it
  // spins instead of scattering it.
  tl.to(
    particlesLayer,
    {
      rotation: 130,
      duration: 0.45,
      ease: 'power1.inOut',
    },
    '-=0.15'
  )
  tl.to(
    particles,
    {
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0,
      duration: 0.45,
      ease: 'power2.in',
      stagger: { each: 0.008, from: 'random' },
    },
    '<'
  )
  tl.to(
    logo,
    { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' },
    '-=0.1'
  )

  // Hold on the logo for a beat.
  tl.to({}, { duration: 0.4 })

  // Tear: a circular hole rips open from the center, like tearing cloth,
  // exposing the real page underneath. Driven by mask-image rather than
  // clip-path so the reveal grows outward from the middle instead of in.
  const maxRadius = () => Math.hypot(window.innerWidth, window.innerHeight) / 2 + 40

  tl.to(logo, { opacity: 0, duration: 0.25 })
  tl.to(
    splash,
    {
      duration: 0.7,
      ease: 'power2.in',
      onUpdate: function () {
        const radius = this.progress() * maxRadius()
        const mask = `radial-gradient(circle at 50% 50%, transparent ${radius}px, black ${radius}px)`
        splash.style.maskImage = mask
        splash.style.webkitMaskImage = mask
      },
    },
    '<'
  )
}

function initHeroIntro() {
  const hero = document.querySelector('[data-hero]')
  if (!hero) return

  const heading = hero.querySelector('h1')
  const split = heading ? new SplitText(heading, { type: 'words' }) : null

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.to(hero.querySelectorAll('[data-hero-kicker]'), { opacity: 1, y: 0, duration: 0.5 })

  if (split) {
    gsap.set(split.words, { opacity: 0, yPercent: 130 })
    tl.to(split.words, { opacity: 1, yPercent: 0, duration: 0.8, stagger: 0.06 }, '-=0.25')
  }

  tl.to(hero.querySelectorAll('[data-hero-role]'), { opacity: 1, duration: 0.5 }, '-=0.3')

  tl.to(
    hero.querySelectorAll('[data-hero-copy], [data-hero-actions] > *'),
    { opacity: 1, duration: 0.6, stagger: 0.08 },
    '-=0.2'
  )

  tl.fromTo(
    hero.querySelectorAll('[data-hero-media]'),
    { opacity: 0, scale: 1.05 },
    { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
    '-=0.5'
  )
}

// /work hero: the two cards run in from fully off-canvas — left from the
// left edge, then, the instant it settles, right from the right edge —
// each landing with an elastic overshoot-and-shake, like braking hard after
// a run rather than gliding to a smooth stop. No-op anywhere else (the
// homepage hero doesn't have these cards).
function initWorkHeroSlideIn() {
  const hero = document.querySelector('[data-hero]')
  if (!hero) return

  const grid = hero.querySelector('.work-hero-grid')
  const left = hero.querySelector('.work-hero-card--copy')
  const right = hero.querySelector('.work-hero-card--signal')
  if (!grid || !left || !right) return

  // The off-canvas travel briefly exceeds the viewport width, which would
  // otherwise open a horizontal scrollbar for the ~1.8s the sequence runs;
  // contained only for that window, not permanently, so the cards' resting
  // box-shadow is never clipped.
  grid.style.overflow = 'hidden'

  // A plain elastic ease overshoots in proportion to the distance travelled
  // — over a ~120vw run that reads as a wild several-hundred-pixel swing,
  // not the "shake a little" the brief asked for. So each card gets its own
  // nested timeline instead: a hard braking run in (hits its mark with no
  // overshoot), then a short, rapidly-decaying shudder with its own small,
  // fixed amplitude — independent of how far the card actually travelled.
  function shockIn(target, fromX) {
    const run = gsap.timeline()
    run.fromTo(target, { x: fromX }, { x: 0, duration: 0.55, ease: 'power4.out' })
    run.to(target, { x: 16, duration: 0.07, ease: 'power1.inOut' })
    run.to(target, { x: -11, duration: 0.07, ease: 'power1.inOut' })
    run.to(target, { x: 6, duration: 0.06, ease: 'power1.inOut' })
    run.to(target, { x: -3, duration: 0.06, ease: 'power1.inOut' })
    run.to(target, { x: 0, duration: 0.08, ease: 'power1.inOut' })
    return run
  }

  const tl = gsap.timeline({
    onComplete: () => {
      grid.style.overflow = ''
    },
  })

  tl.add(shockIn(left, '-120vw'))
  tl.add(shockIn(right, '120vw'))
}

function initRoleTypewriter() {
  const el = document.querySelector('[data-role-text]')
  if (!el) return

  const roles = ['Computer Scientist', 'Software Developer', 'Tech Enthusiast']
  let index = Math.max(0, roles.indexOf(el.textContent.trim()))
  const TYPE_MS = 55
  const DELETE_MS = 35
  const HOLD_MS = 1600

  function deleteCurrent() {
    const word = roles[index]
    let pos = word.length
    const timer = setInterval(() => {
      pos--
      el.textContent = word.slice(0, pos)
      if (pos <= 0) {
        clearInterval(timer)
        index = (index + 1) % roles.length
        typeNext()
      }
    }, DELETE_MS)
  }

  function typeNext() {
    const word = roles[index]
    let pos = 0
    const timer = setInterval(() => {
      pos++
      el.textContent = word.slice(0, pos)
      if (pos >= word.length) {
        clearInterval(timer)
        setTimeout(deleteCurrent, HOLD_MS)
      }
    }, TYPE_MS)
  }

  setTimeout(deleteCurrent, HOLD_MS)
}

function initReveals() {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    })
  })

  document.querySelectorAll('[data-reveal-group]').forEach((group) => {
    const items = gsap.utils.toArray(group.children)

    // Large grids (the /work page's 5/5/21-card sections) use ScrollTrigger.batch
    // instead of one whole-group tween: a group this size finishes animating well
    // before its later rows scroll into view, so those rows would otherwise just
    // appear already-opaque with no visible stagger. Batching re-triggers the
    // stagger per row as it actually enters the viewport.
    if (group.hasAttribute('data-reveal-batch')) {
      ScrollTrigger.batch(items, {
        start: 'top 92%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: true,
          }),
      })
      return
    }

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: 'top 85%' },
    })
  })
}

function initPinSteps() {
  document.querySelectorAll('[data-pin-steps]').forEach((container) => {
    const steps = gsap.utils.toArray(container.querySelectorAll('[data-step]'))
    if (steps.length < 2) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top+=72',
        end: () => `+=${steps.length * 320}`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
      },
    })

    steps.forEach((step, i) => {
      if (i === 0) return
      tl.to(steps[i - 1], { opacity: 0, y: -20, duration: 0.4 }, i - 0.5)
      tl.fromTo(step, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, i - 0.5)
    })
  })
}

function initMagnetic() {
  document.querySelectorAll('.btn, .btn-quiet').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' })
    })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
    })
  })
}

function initCursor() {
  const dot = document.querySelector('.cursor-dot')
  if (!dot) return

  const setX = gsap.quickTo(dot, 'x', { duration: 0.5, ease: 'power3' })
  const setY = gsap.quickTo(dot, 'y', { duration: 0.5, ease: 'power3' })

  let revealed = false
  window.addEventListener('mousemove', (e) => {
    setX(e.clientX)
    setY(e.clientY)
    if (!revealed) {
      revealed = true
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      gsap.to(dot, { opacity: 1, duration: 0.3 })
    }
  })

  window.addEventListener('mouseleave', () => gsap.to(dot, { opacity: 0, duration: 0.2 }))
  window.addEventListener('mouseenter', () => {
    if (revealed) gsap.to(dot, { opacity: 1, duration: 0.2 })
  })

  const restWidth = 20

  document.querySelectorAll('[data-cursor]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      dot.textContent = el.getAttribute('data-cursor') || ''
      dot.classList.add('cursor-dot--label')
      const targetWidth = dot.scrollWidth
      gsap.fromTo(dot, { width: restWidth }, { width: targetWidth, duration: 0.35, ease: 'power2.out' })
    })
    el.addEventListener('mouseleave', () => {
      gsap.to(dot, {
        width: restWidth,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          dot.textContent = ''
          dot.classList.remove('cursor-dot--label')
        },
      })
    })
  })
}

function initEvidenceHover() {
  document.querySelectorAll('.evidence-frame, .bento-card--media').forEach((frame) => {
    const img = frame.querySelector('img')
    if (!img) return
    frame.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.04, duration: 0.6, ease: 'power2.out' })
    })
    frame.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' })
    })
  })
}

function initLightbox() {
  const lightbox = document.getElementById('evidence-lightbox')
  if (!lightbox) return

  const lightboxImg = lightbox.querySelector('img')
  const closeBtn = lightbox.querySelector('[data-lightbox-close]')
  let lastTrigger = null

  document.querySelectorAll('[data-enlarge]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const el = trigger.querySelector('img') || trigger
      lightboxImg.src = el.currentSrc || el.src
      lightboxImg.alt = el.alt
      lastTrigger = trigger
      lightbox.showModal()
    })
  })

  closeBtn?.addEventListener('click', () => lightbox.close())

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close()
  })

  lightbox.addEventListener('close', () => {
    lightboxImg.src = ''
    lastTrigger?.focus()
  })
}

// ===========================================================================
// Footer wordmark: a monumental "FARHAN SEGUJJA" set in a geometric block
// alphabet (see tools/build-wordmark.mjs -- the glyphs are closed contours
// generated from one shared measurement system, not hand-drawn per letter).
//
// Three layers over the same <use> layout: a hairline outline (resting), a
// solid fill revealed only through a pointer-following ink mask (hover), and
// a construction layer of rulers / ticks / registration crosses.
//
// Reactive to prefers-reduced-motion and pointer type via GSAP's own
// matchMedia rather than the one-time `reduced`/`finePointer` checks above,
// so it stays correct if either changes live.
// ===========================================================================
function initFooterWordmark() {
  const wordmarks = document.querySelectorAll('[data-wordmark]')
  if (!wordmarks.length) return

  const mm = gsap.matchMedia()

  mm.add(
    {
      isFine: '(pointer: fine)',
      noPreference: '(prefers-reduced-motion: no-preference)',
    },
    (context) => {
      const { isFine, noPreference } = context.conditions
      const cleanups = []

      wordmarks.forEach((svg) => {
        if (!noPreference) return // CSS resting state is already correct
        cleanups.push(animateWordmarkEntrance(svg))
        cleanups.push(isFine ? initWordmarkInk(svg) : initWordmarkTapInk(svg))
      })

      // matchMedia reverts this context on a condition change; each cleanup
      // only ever touches tweens, listeners and ticker callbacks it created
      // itself, so nothing else on the page is affected.
      return () => cleanups.forEach((fn) => fn && fn())
    }
  )
}

// The letterforms live in <defs> as <path>, drawn via <use> -- so the real
// <path> elements are never descendants of .wm-outline in the light DOM, and
// querying for "path" under it finds nothing. getTotalLength() only exists on
// the source path. <use> does inherit stroke-dasharray/-dashoffset down into
// the referenced content though, so: read the length from the source path,
// but set the dash properties on the <use> instance (each instance animates
// independently even though they share one source path).
function animateWordmarkEntrance(svg) {
  const outlineUses = svg.querySelectorAll('.wm-outline use')
  const rulers = svg.querySelectorAll('.wm-datum, .wm-tick, .wm-cross')
  const extensions = svg.querySelectorAll('.wm-extension line')
  const joints = svg.querySelectorAll('.wm-joint')

  outlineUses.forEach((use) => {
    const id = (use.getAttribute('href') || use.getAttribute('xlink:href') || '').slice(1)
    const source = document.getElementById(id)
    const len = source ? source.getTotalLength() : 0
    gsap.set(use, { strokeDasharray: len, strokeDashoffset: len })
  })
  gsap.set([rulers, extensions], { opacity: 0 })
  gsap.set(joints, { scale: 0, transformOrigin: '50% 50%' })

  const tl = gsap.timeline({
    scrollTrigger: { trigger: svg, start: 'top 88%', once: true },
  })

  tl.to(rulers, { opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power1.out' })
  tl.to(outlineUses, { strokeDashoffset: 0, duration: 1.6, stagger: 0.055, ease: 'power2.inOut' }, '-=0.25')
  tl.to(extensions, { opacity: 1, duration: 0.4, stagger: 0.01 }, '-=0.9')
  tl.to(joints, { scale: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(2.2)' }, '-=0.7')

  return () => {
    tl.scrollTrigger && tl.scrollTrigger.kill()
    tl.kill()
    // Leave the wordmark drawn rather than half-drawn if the context reverts
    // mid-entrance.
    gsap.set(outlineUses, { strokeDasharray: 'none', strokeDashoffset: 0 })
    gsap.set([rulers, extensions], { opacity: 1 })
    gsap.set(joints, { scale: 1 })
  }
}

// Client -> viewBox coordinates. Recomputed from the live screen CTM on every
// move, so this stays correct across resize, zoom and scroll with no cached
// geometry to invalidate.
function svgPoint(svg, clientX, clientY) {
  const ctm = svg.getScreenCTM()
  if (!ctm) return null
  const pt = svg.createSVGPoint()
  pt.x = clientX
  pt.y = clientY
  const p = pt.matrixTransform(ctm.inverse())
  return { x: p.x, y: p.y }
}

// ---------------------------------------------------------------------------
// Pointer ink.
//
// Note on the previous implementation: gsap.quickTo(circle, 'cx', ...) cannot
// work. `circle.cx` is a read-only SVGAnimatedLength, so GSAP's default
// property setter assigns to it and the browser silently discards the write
// -- no error, no movement. The attr plugin (`{attr: {cx}}`) is the only
// tween route, and quickTo takes a single property name with no plugin path,
// so there is no quickTo form of it either.
//
// So: one gsap.ticker callback owns all three blobs and writes the attributes
// directly. That also satisfies the harder requirement -- the reveal must
// stay alive for as long as the pointer is inside, with no tween created per
// pointermove and nothing that can complete and switch it off. `hovering` is
// the only thing that gates it, and only pointerleave clears that.
// ---------------------------------------------------------------------------
const INK_LAG = [0.28, 0.16, 0.1] // per-blob follow response; lower = more lag
const INK_SCALE = [1, 0.78, 0.56] // per-blob radius, as a fraction of base
const INK_EPSILON = 0.015 // fraction of base radius below which ink is invisible

// Sized off the cap height by the generator (data-ink-radius), so retuning
// the drafting frame's air never changes how much the ink uncovers.
function inkRadius(svg) {
  const declared = parseFloat(svg.dataset.inkRadius)
  return Number.isFinite(declared) ? declared : svg.viewBox.baseVal.height * 0.55
}

function initWordmarkInk(svg) {
  const blobs = Array.from(svg.querySelectorAll('.wm-blob'))
  // The pointer and touch reveals drive the same three mask circles, so only
  // one of them may ever be bound to a given wordmark. The flag lives on the
  // element rather than in a module-level WeakSet because every `const` in
  // this file is declared below the top-level init calls -- reading one from
  // inside an initialiser hits its temporal dead zone.
  if (!blobs.length || svg.dataset.wmInk) return null
  svg.dataset.wmInk = 'pointer'

  const baseRadius = inkRadius(svg)
  const state = blobs.map(() => ({ x: 0, y: 0, r: 0, primed: false }))
  const target = { x: 0, y: 0 }

  // A plain object, so the enter/leave tween can never collide with (or be
  // overwritten by) anything that touches the DOM nodes.
  const reveal = { amount: 0 }
  let hovering = false
  let running = false

  function write(i) {
    const s = state[i]
    const b = blobs[i]
    b.setAttribute('cx', s.x.toFixed(2))
    b.setAttribute('cy', s.y.toFixed(2))
    b.setAttribute('r', s.r.toFixed(2))
  }

  function tick(time, deltaMs) {
    const dt = Math.min(deltaMs, 50) / 1000 // clamp: tab-restore can hand us a huge delta
    let alive = reveal.amount > 0.001

    for (let i = 0; i < blobs.length; i++) {
      const s = state[i]
      // Frame-rate independent smoothing, so the trail is identical at 60
      // and 144Hz. Interpolating (rather than restarting a tween) is what
      // makes a fast flick trail behind the cursor instead of snapping.
      const k = 1 - Math.pow(1 - INK_LAG[i % INK_LAG.length], dt * 60)
      s.x += (target.x - s.x) * k
      s.y += (target.y - s.y) * k
      const wanted = baseRadius * INK_SCALE[i % INK_SCALE.length] * reveal.amount
      s.r += (wanted - s.r) * k
      // The slowest blob decays at its own lag rate, which trails well past
      // the leave tween; cut the invisible tail so the ticker detaches.
      if (!hovering && s.r < baseRadius * INK_EPSILON) s.r = 0
      if (s.r > 0) alive = true
      write(i)
    }

    if (!hovering && !alive) {
      gsap.ticker.remove(tick)
      running = false
    }
  }

  function start() {
    if (running) return
    running = true
    gsap.ticker.add(tick)
  }

  function onEnter(e) {
    const p = svgPoint(svg, e.clientX, e.clientY)
    if (!p) return
    hovering = true
    target.x = p.x
    target.y = p.y
    // Snap the blobs to the entry point the first time rather than sweeping
    // them in from wherever they were left.
    state.forEach((s) => {
      if (!s.primed) {
        s.x = p.x
        s.y = p.y
        s.primed = true
      }
    })
    start()
    gsap.to(reveal, { amount: 1, duration: 0.32, ease: 'power2.out', overwrite: true })
  }

  function onMove(e) {
    const p = svgPoint(svg, e.clientX, e.clientY)
    if (!p) return
    // pointerenter can be missed when the pointer is already over the element
    // on load, or after a scroll brings the footer up under a stationary
    // cursor. Treat any move as an implicit enter.
    if (!hovering) {
      onEnter(e)
      return
    }
    target.x = p.x
    target.y = p.y
  }

  function onLeave() {
    hovering = false
    // Fades the reveal out. The ticker keeps interpolating until the radii
    // reach zero and then removes itself -- state, listeners and blobs all
    // stay mounted, so re-entering picks straight back up.
    gsap.to(reveal, { amount: 0, duration: 0.5, ease: 'power2.out', overwrite: true })
    state.forEach((s) => { s.primed = false })
  }

  svg.addEventListener('pointerenter', onEnter)
  svg.addEventListener('pointermove', onMove)
  svg.addEventListener('pointerleave', onLeave)
  svg.addEventListener('pointercancel', onLeave)

  return () => {
    svg.removeEventListener('pointerenter', onEnter)
    svg.removeEventListener('pointermove', onMove)
    svg.removeEventListener('pointerleave', onLeave)
    svg.removeEventListener('pointercancel', onLeave)
    gsap.ticker.remove(tick)
    gsap.killTweensOf(reveal)
    running = false
    hovering = false
    reveal.amount = 0
    state.forEach((s, i) => {
      s.r = 0
      write(i)
    })
    delete svg.dataset.wmInk
  }
}

// ---------------------------------------------------------------------------
// Touch ink.
//
// A touch device has no hover to track, so the reveal is a staged bloom
// rather than a follower: tap -> a large ink flood opens at the touch point
// across several letterforms, holds, then dissolves.
//
// Why this is sized off the viewBox and not data-ink-radius: the hover reveal
// is a cursor-sized spotlight -- one cap height, ~15% of the mobile wordmark's
// width -- because the pointer stays put to move it around, and a patch that
// size is legible at desk distance under a 1px cursor. A tap gets one shot,
// at arm's length, under a fingertip that covers the thing it is revealing.
// At a third of the viewBox width the flood is 2.3x the hover radius (over 5x
// the area) and washes across most of both lines of the mobile lockup.
// ---------------------------------------------------------------------------
const TAP_INK_WIDTH = 0.34 // max radius, as a fraction of the viewBox width
const TAP_INK_SCALE = [1, 1.18, 0.82] // primary, wider trailing halo, edge
// Blob centres, offset from the touch point by a fraction of the max radius,
// so their union reads as one irregular flood and not three concentric discs.
const TAP_INK_OFFSET = [[0, 0], [0.13, -0.08], [-0.15, 0.11]]
const TAP_INK_SEED = 0.16 // starting radius, as a fraction of the max
const TAP_IN = 0.45 // bloom
const TAP_IN_STAGGER = 0.06 // the halo and edge trail the primary out
const TAP_HOLD = 0.7 // at full radius; extended while the finger stays down
const TAP_OUT = 0.65 // dissolve
const TAP_OUT_STAGGER = 0.03 // and lag it back in, so the edge is last to go

function initWordmarkTapInk(svg) {
  const blobs = Array.from(svg.querySelectorAll('.wm-blob'))
  if (!blobs.length || svg.dataset.wmInk) return null
  svg.dataset.wmInk = 'tap'

  // The authored per-blob opacities are the ink's density stack. Everything
  // here stays in attribute space (never CSS opacity) so restoring them is a
  // plain setAttribute -- a style written by a tween would outrank it.
  const baseOpacity = blobs.map((b) => parseFloat(b.getAttribute('opacity')) || 1)

  let bloomTl = null
  let dissolveTl = null
  let hold = null
  let pointerDown = false
  let holdElapsed = false // hold ran out while the finger was still down

  function stop() {
    bloomTl && bloomTl.kill()
    dissolveTl && dissolveTl.kill()
    hold && hold.kill()
    bloomTl = dissolveTl = hold = null
    holdElapsed = false
  }

  // Read off the live viewBox at tap time rather than cached at init, in the
  // same spirit as svgPoint's per-move CTM read: no geometry to invalidate.
  function maxRadius() {
    return svg.viewBox.baseVal.width * TAP_INK_WIDTH
  }

  function dissolve() {
    dissolveTl = gsap.timeline()
    dissolveTl.to(blobs, {
      attr: { r: 0, opacity: 0 },
      duration: TAP_OUT,
      stagger: TAP_OUT_STAGGER,
      ease: 'power2.inOut',
    })
  }

  function onDown(e) {
    if (!e.isPrimary) return
    const p = svgPoint(svg, e.clientX, e.clientY)
    if (!p) return
    pointerDown = true

    // One mask, one set of blobs, reused for the life of the page. A tap
    // during an existing reveal kills only this wordmark's own tweens and
    // re-seeds the same three circles at the new point -- no node is created,
    // and no half-finished dissolve is left queued to snap r back to 0 later.
    stop()
    const max = maxRadius()
    blobs.forEach((b, i) => {
      const [ox, oy] = TAP_INK_OFFSET[i % TAP_INK_OFFSET.length]
      b.setAttribute('cx', (p.x + ox * max).toFixed(2))
      b.setAttribute('cy', (p.y + oy * max).toFixed(2))
      b.setAttribute('r', (max * TAP_INK_SEED).toFixed(2))
      b.setAttribute('opacity', baseOpacity[i])
    })

    bloomTl = gsap.timeline({
      onComplete: () => {
        // Hold at full radius. If the finger is still down when it runs out,
        // wait for it: pointerup only ever releases the hold, it never cuts
        // the reveal short.
        hold = gsap.delayedCall(TAP_HOLD, () => {
          if (pointerDown) holdElapsed = true
          else dissolve()
        })
      },
    })
    bloomTl.to(blobs, {
      attr: { r: (i) => max * TAP_INK_SCALE[i % TAP_INK_SCALE.length] },
      duration: TAP_IN,
      stagger: TAP_IN_STAGGER,
      ease: 'power2.out',
    })
  }

  function onUp(e) {
    if (!e.isPrimary) return
    pointerDown = false
    if (holdElapsed) {
      holdElapsed = false
      dissolve()
    }
  }

  svg.addEventListener('pointerdown', onDown)
  svg.addEventListener('pointerup', onUp)
  svg.addEventListener('pointercancel', onUp)

  return () => {
    svg.removeEventListener('pointerdown', onDown)
    svg.removeEventListener('pointerup', onUp)
    svg.removeEventListener('pointercancel', onUp)
    stop()
    pointerDown = false
    blobs.forEach((b, i) => {
      b.setAttribute('r', '0')
      b.setAttribute('opacity', baseOpacity[i])
    })
    delete svg.dataset.wmInk
  }
}

// ---------------------------------------------------------------------------
// Contact: Connection Schematic.
//
// Same construction-line vocabulary as the footer wordmark (.sc-cross /
// .sc-ticks / hub outline share stroke widths and resting opacities with
// .wm-cross / .wm-tick / .wm-outline) and the same interaction shape: a fine
// pointer gets a continuous, lerped proximity follower -- nodes and paths
// ease toward "activated" rather than snapping, the same per-frame
// `amount += (wanted - amount) * k` the wordmark ink uses. Touch gets a
// one-shot bloom/hold/dissolve per tap, the wordmark tap ink's own shape.
// Both share one pulse -- a dot walked along a path with getPointAtLength(),
// the native API the wordmark's entrance draw already relies on -- fired
// once per activation rather than looping, so it reads as a signal sent, not
// a decoration running in the background.
// ---------------------------------------------------------------------------
const SC_PROXIMITY = 130 // svg units the pointer must be within to light a node
const SC_LERP = 0.18
const SC_REST_PATH = 0.22
const SC_REST_PRIMARY = 0.4
const SC_REST_MINOR = 0.16
const SC_ACTIVE_PATH = 0.85
const SC_REST_SCALE = 1
const SC_ACTIVE_SCALE = 1.35
const SC_PULSE_DURATION = 0.7

function initContactSchematic() {
  const svg = document.querySelector('[data-schematic-svg]')
  if (!svg) return

  const mm = gsap.matchMedia()

  mm.add(
    {
      isFine: '(pointer: fine)',
      noPreference: '(prefers-reduced-motion: no-preference)',
    },
    (context) => {
      const { isFine, noPreference } = context.conditions
      if (!noPreference) return undefined // CSS resting state is already the complete drawing

      return isFine ? bindSchematicProximity(svg) : bindSchematicTaps(svg)
    }
  )
}

function schematicNodes(svg) {
  return Array.from(svg.querySelectorAll('.sc-node')).map((g) => ({
    el: g,
    key: g.dataset.node,
    cx: parseFloat(g.dataset.cx),
    cy: parseFloat(g.dataset.cy),
    path: svg.querySelector(`.sc-path[data-path="${g.dataset.node}"]`),
    pulse: svg.querySelector(`.sc-pulse[data-pulse="${g.dataset.node}"]`),
  }))
}

function schematicRestingOpacity(path) {
  if (!path) return 0
  if (path.classList.contains('sc-path--primary')) return SC_REST_PRIMARY
  if (path.classList.contains('sc-path--minor')) return SC_REST_MINOR
  return SC_REST_PATH
}

// Walks node.pulse from the hub to the node along its own connecting path.
// Snaps to the path's start point before animating so a pulse fired while an
// earlier one is still fading never flashes at its previous, unrelated
// position for a frame.
function firePulse(node) {
  if (!node.path || !node.pulse) return
  const len = node.path.getTotalLength()
  const start = node.path.getPointAtLength(0)
  gsap.killTweensOf(node.pulse)
  gsap.set(node.pulse, { attr: { cx: start.x, cy: start.y }, opacity: 1 })

  const p = { t: 0 }
  gsap.to(p, {
    t: 1,
    duration: SC_PULSE_DURATION,
    ease: 'power1.inOut',
    onUpdate: () => {
      const pt = node.path.getPointAtLength(len * p.t)
      node.pulse.setAttribute('cx', pt.x.toFixed(2))
      node.pulse.setAttribute('cy', pt.y.toFixed(2))
    },
    onComplete: () => gsap.to(node.pulse, { opacity: 0, duration: 0.25 }),
  })
}

function bindSchematicProximity(svg) {
  const nodes = schematicNodes(svg)
  if (!nodes.length) return null

  const state = nodes.map(() => ({ amount: 0, pulsed: false }))
  const target = { x: -9999, y: -9999 }
  let running = false

  function write(i) {
    const n = nodes[i]
    const s = state[i]
    const scale = SC_REST_SCALE + (SC_ACTIVE_SCALE - SC_REST_SCALE) * s.amount
    n.el.setAttribute(
      'transform',
      `translate(${n.cx} ${n.cy}) scale(${scale.toFixed(3)}) translate(${-n.cx} ${-n.cy})`
    )
    if (n.path) {
      const resting = schematicRestingOpacity(n.path)
      n.path.style.opacity = resting + (SC_ACTIVE_PATH - resting) * s.amount
    }
  }

  function tick() {
    let alive = false
    nodes.forEach((n, i) => {
      const s = state[i]
      const d = Math.hypot(target.x - n.cx, target.y - n.cy)
      const wanted = d < SC_PROXIMITY ? 1 - d / SC_PROXIMITY : 0
      s.amount += (wanted - s.amount) * SC_LERP
      if (s.amount < 0.02) s.amount = 0
      else alive = true

      if (wanted > 0.6 && !s.pulsed) {
        s.pulsed = true
        firePulse(n)
      } else if (wanted < 0.2) {
        s.pulsed = false
      }

      write(i)
    })

    if (!alive) {
      gsap.ticker.remove(tick)
      running = false
    }
  }

  function start() {
    if (running) return
    running = true
    gsap.ticker.add(tick)
  }

  function onMove(e) {
    const p = svgPoint(svg, e.clientX, e.clientY)
    if (!p) return
    target.x = p.x
    target.y = p.y
    start()
  }

  function onLeave() {
    target.x = -9999
    target.y = -9999
    start()
  }

  svg.addEventListener('pointermove', onMove)
  svg.addEventListener('pointerleave', onLeave)

  return () => {
    svg.removeEventListener('pointermove', onMove)
    svg.removeEventListener('pointerleave', onLeave)
    gsap.ticker.remove(tick)
    running = false
    nodes.forEach((n, i) => {
      state[i].amount = 0
      write(i)
      n.el.removeAttribute('transform')
      if (n.path) n.path.style.opacity = ''
      gsap.killTweensOf(n.pulse)
      if (n.pulse) gsap.set(n.pulse, { opacity: 0 })
    })
  }
}

// Touch: no proximity to read, only discrete taps -- each node's own hit
// circle blooms that node and its path to full strength, holds, then relaxes
// back to the resting drawing. A tap mid-relax kills only that node's own
// timeline and restarts cleanly, so repeated taps on the same or different
// nodes always work.
function bindSchematicTaps(svg) {
  const nodes = schematicNodes(svg)
  if (!nodes.length) return null

  const timelines = new Map()
  const handlers = []

  nodes.forEach((n) => {
    const hit = n.el.querySelector('.sc-hit')
    if (!hit) return

    const onDown = (e) => {
      e.stopPropagation()
      timelines.get(n.key)?.kill()
      const resting = schematicRestingOpacity(n.path)

      const tl = gsap.timeline()
      tl.to(n.el, { transformOrigin: `${n.cx}px ${n.cy}px`, scale: SC_ACTIVE_SCALE, duration: 0.3, ease: 'power2.out' })
      if (n.path) tl.to(n.path, { opacity: SC_ACTIVE_PATH, duration: 0.3, ease: 'power2.out' }, '<')
      tl.call(() => firePulse(n))
      tl.to(n.el, { scale: SC_REST_SCALE, duration: 0.5, ease: 'power2.inOut' }, '+=0.5')
      if (n.path) tl.to(n.path, { opacity: resting, duration: 0.5, ease: 'power2.inOut' }, '<')

      timelines.set(n.key, tl)
    }

    hit.addEventListener('pointerdown', onDown)
    handlers.push({ hit, onDown })
  })

  return () => {
    handlers.forEach(({ hit, onDown }) => hit.removeEventListener('pointerdown', onDown))
    timelines.forEach((tl) => tl.kill())
    nodes.forEach((n) => {
      gsap.set(n.el, { clearProps: 'scale,transformOrigin' })
      if (n.path) gsap.set(n.path, { clearProps: 'opacity' })
      gsap.killTweensOf(n.pulse)
      if (n.pulse) gsap.set(n.pulse, { opacity: 0 })
    })
  }
}

// ---------------------------------------------------------------------------
// About: Farhan Core.
//
// A bespoke system schematic (radial routes + an orbit ring around a
// central FS core) that constructs itself once About scrolls into view,
// then goes idle-ambient (an occasional signal along a random route) and
// interactive (pointer proximity + light path deformation on desktop, tap
// on touch) -- the same three-stage shape as the footer wordmark and the
// Connection Schematic, but its own layout and its own gsap.matchMedia
// gate, since it needs a ScrollTrigger-driven entrance neither of those do.
//
// Resting opacities live on each element's data-rest attribute (see
// styles.css) rather than duplicated per-class logic, so the entrance
// timeline, the proximity ticker and the tap timeline all restore the exact
// same number instead of three independent guesses.
// ---------------------------------------------------------------------------
const FC_PROXIMITY = 130
const FC_LERP = 0.18
const FC_ACTIVE_PATH = 0.85
const FC_REST_SCALE = 1
const FC_ACTIVE_SCALE = 1.35
const FC_PULSE_DURATION = 0.7
const FC_DEFORM_RADIUS = 190 // svg units: how close the pointer must be to a deform path's midpoint to pull it
const FC_DEFORM_MAX = 10 // svg units: max control-point displacement toward the pointer, keeps the curve legible

function initFarhanCore() {
  const wrap = document.querySelector('[data-farhan-core]')
  const svg = document.querySelector('[data-farhan-core-svg]')
  if (!wrap || !svg) return

  const mm = gsap.matchMedia()

  mm.add(
    {
      isFine: '(pointer: fine)',
      noPreference: '(prefers-reduced-motion: no-preference)',
    },
    (context) => {
      const { isFine, noPreference } = context.conditions
      if (!noPreference) return undefined // CSS resting state is already the complete drawing

      let ambientCleanup = null
      let interactionCleanup = null

      const entrance = buildFarhanCoreEntrance(svg, () => {
        ambientCleanup = bindFarhanCoreAmbientPulses(svg)
        interactionCleanup = isFine ? bindFarhanCoreProximity(svg) : bindFarhanCoreTaps(svg)
      })

      const parallax = initFarhanCoreParallax(svg)

      return () => {
        entrance.scrollTrigger?.kill()
        entrance.kill()
        ambientCleanup?.()
        interactionCleanup?.()
        parallax.forEach((st) => st.kill())
      }
    }
  )
}

function farhanCoreNodes(svg) {
  return Array.from(svg.querySelectorAll('.fc-node')).map((g) => ({
    el: g,
    key: g.dataset.node,
    cx: parseFloat(g.dataset.cx),
    cy: parseFloat(g.dataset.cy),
    path: svg.querySelector(`.fc-path[data-path="${g.dataset.node}"]`),
    pulse: svg.querySelector(`.fc-pulse[data-pulse="${g.dataset.node}"]`),
    dot: g.querySelector('.fc-dot'),
    hit: g.querySelector('.fc-hit'),
    label: g.querySelector('.fc-label'),
  }))
}

// Walks node.pulse from the hub to the node along its own connecting path --
// identical technique to the Connection Schematic's firePulse(), see there
// for why getPointAtLength() rather than MotionPathPlugin (not part of this
// bundle) or a plain positional tween (wouldn't follow the curve).
function fireFarhanPulse(node) {
  if (!node.path || !node.pulse) return
  const len = node.path.getTotalLength()
  const start = node.path.getPointAtLength(0)
  gsap.killTweensOf(node.pulse)
  gsap.set(node.pulse, { attr: { cx: start.x, cy: start.y }, opacity: 1 })

  const p = { t: 0 }
  gsap.to(p, {
    t: 1,
    duration: FC_PULSE_DURATION,
    ease: 'power1.inOut',
    onUpdate: () => {
      const pt = node.path.getPointAtLength(len * p.t)
      node.pulse.setAttribute('cx', pt.x.toFixed(2))
      node.pulse.setAttribute('cy', pt.y.toFixed(2))
    },
    onComplete: () => gsap.to(node.pulse, { opacity: 0, duration: 0.25 }),
  })
}

// Construction sequence: hub, then each route draws outward with its own
// node blooming in only once that route's draw completes (a small
// sub-timeline per branch, staggered against the others), then the two
// peer-to-peer arcs, then the crosshairs/ticks/ring/measurement fragment,
// then labels. `pathLength="1"` on every .fc-path normalizes stroke-dash
// math to 0..1 regardless of each curve's real geometric length, so the
// draw tween never has to call getTotalLength() itself (fireFarhanPulse
// still does, for the actual point-following pulse, which pathLength does
// not affect).
function buildFarhanCoreEntrance(svg, onSettled) {
  const hub = svg.querySelector('.fc-hub')
  const primaryPaths = Array.from(svg.querySelectorAll('.fc-path[data-path]'))
  const minorPaths = Array.from(svg.querySelectorAll('.fc-path--minor'))
  const nodes = farhanCoreNodes(svg)
  const constructionEls = [
    ...svg.querySelectorAll('.fc-cross'),
    svg.querySelector('.fc-ticks'),
    svg.querySelector('.fc-ring'),
    svg.querySelector('.fc-radial'),
    svg.querySelector('.fc-radial-tick'),
  ].filter(Boolean)
  const labelEls = [
    ...svg.querySelectorAll('.fc-label'),
    svg.querySelector('.fc-hub-caption'),
    svg.querySelector('.fc-frag-label'),
  ].filter(Boolean)

  // The hub sits inside .fc-depth-front, which the parallax tween also
  // transforms -- GSAP's own scale/transformOrigin (and svgOrigin) resolve
  // unpredictably once a transformed ancestor is in play (confirmed via a
  // large bogus translate baked into the resulting matrix). Sidestepping
  // that entirely: tween a plain proxy value and write the equivalent
  // translate/scale/translate matrix onto the `transform` attribute by
  // hand, exactly the technique bindFarhanCoreProximity's ticker already
  // uses for the same reason.
  const hubScale = { s: 0.55 }
  const writeHub = () =>
    hub.setAttribute('transform', `translate(238 268) scale(${hubScale.s.toFixed(4)}) translate(-238 -268)`)
  writeHub()

  const tl = gsap.timeline({
    scrollTrigger: { trigger: svg, start: 'top 78%' },
    onComplete: onSettled,
  })

  // 1. central FS node appears
  tl.to(hub, { opacity: 1, duration: 0.55, ease: 'power2.out' })
  tl.to(hubScale, { s: 1, duration: 0.55, ease: 'back.out(1.7)', onUpdate: writeHub }, '<')

  // 2 + 3. structural routes draw outward; each node blooms in once its own
  // route's draw finishes (sequential inside its own sub-timeline), the four
  // branches overlapping each other slightly.
  primaryPaths.forEach((path, i) => {
    const node = nodes.find((n) => n.key === path.dataset.path)
    const pathRest = parseFloat(path.dataset.rest || '0.22')
    const sub = gsap.timeline()
    sub.to(path, { strokeDashoffset: 0, opacity: pathRest, duration: 0.6, ease: 'power2.inOut' })
    if (node?.dot) {
      const dotRest = parseFloat(node.dot.dataset.rest || '0.8')
      sub.to(node.dot, { opacity: dotRest, duration: 0.3, ease: 'back.out(2)' })
    }
    tl.add(sub, i === 0 ? '+=0.15' : '<+=0.16')
  })

  // 4. secondary paths (peer-to-peer construction arcs) draw
  if (minorPaths.length) {
    tl.to(
      minorPaths,
      {
        strokeDashoffset: 0,
        opacity: (i, t) => parseFloat(t.dataset.rest || '0.14'),
        duration: 0.7,
        ease: 'power2.inOut',
        stagger: 0.12,
      },
      '+=0.05'
    )
  }

  // 5. small construction geometry: crosshairs, ticks, ring, measurement fragment
  if (constructionEls.length) {
    tl.to(
      constructionEls,
      {
        opacity: (i, t) => parseFloat(t.dataset.rest || '0.3'),
        duration: 0.5,
        ease: 'power1.out',
        stagger: 0.02,
      },
      '-=0.3'
    )
  }

  // 6. labels reveal
  if (labelEls.length) {
    tl.to(
      labelEls,
      {
        opacity: (i, t) => parseFloat(t.dataset.rest || '0.8'),
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.04,
      },
      '-=0.2'
    )
  }

  // 7. ambient interaction becomes active -- see onSettled (tl's onComplete)

  return tl
}

function bindFarhanCoreAmbientPulses(svg) {
  const nodes = farhanCoreNodes(svg)
  if (!nodes.length) return null

  let stopped = false
  let call = null

  function schedule() {
    if (stopped) return
    call = gsap.delayedCall(gsap.utils.random(4.5, 8.5), () => {
      if (stopped) return
      if (!document.hidden) fireFarhanPulse(gsap.utils.random(nodes))
      schedule()
    })
  }

  schedule()

  return () => {
    stopped = true
    call?.kill()
  }
}

// Desktop: one ticker owns both the proximity bloom (scale/opacity toward
// whichever node the pointer nears, dimming the others) and a very small
// cursor-ward pull on two routes' Bezier control points -- combined into a
// single loop rather than two, per the same "no tween per pointermove"
// constraint the Connection Schematic already established (see its comment
// on why circle attrs and computed transform strings can't go through
// quickTo/quickSetter).
function bindFarhanCoreProximity(svg) {
  const nodes = farhanCoreNodes(svg)
  if (!nodes.length) return null

  const deformPaths = Array.from(svg.querySelectorAll('.fc-path[data-deform="1"]')).map((path) => {
    const [sx, sy] = path.dataset.start.split(',').map(Number)
    const [c1x, c1y] = path.dataset.c1.split(',').map(Number)
    const [c2x, c2y] = path.dataset.c2.split(',').map(Number)
    const [ex, ey] = path.dataset.end.split(',').map(Number)
    return {
      path,
      sx,
      sy,
      c1x,
      c1y,
      c2x,
      c2y,
      ex,
      ey,
      midx: (c1x + c2x) / 2,
      midy: (c1y + c2y) / 2,
      ox: 0,
      oy: 0,
    }
  })

  const state = nodes.map(() => ({ amount: 0, pulsed: false }))
  const target = { x: -9999, y: -9999 }
  let running = false

  function writeNode(i, dimAmount) {
    const n = nodes[i]
    const s = state[i]
    const scale = FC_REST_SCALE + (FC_ACTIVE_SCALE - FC_REST_SCALE) * s.amount
    n.el.setAttribute(
      'transform',
      `translate(${n.cx} ${n.cy}) scale(${scale.toFixed(3)}) translate(${-n.cx} ${-n.cy})`
    )
    if (n.path) {
      const resting = parseFloat(n.path.dataset.rest || '0.22')
      const boosted = resting + (FC_ACTIVE_PATH - resting) * s.amount
      n.path.style.opacity = dimAmount > 0 && s.amount < dimAmount * 0.5 ? resting * (1 - dimAmount * 0.5) : boosted
    }
    if (n.label) {
      const restingLabel = parseFloat(n.label.dataset.rest || '0.8')
      n.label.style.opacity = restingLabel + (1 - restingLabel) * s.amount
    }
  }

  function tick() {
    let alive = false
    let maxAmount = 0

    nodes.forEach((n, i) => {
      const s = state[i]
      const d = Math.hypot(target.x - n.cx, target.y - n.cy)
      const wanted = d < FC_PROXIMITY ? 1 - d / FC_PROXIMITY : 0
      s.amount += (wanted - s.amount) * FC_LERP
      if (s.amount < 0.02) s.amount = 0
      else alive = true
      if (s.amount > maxAmount) maxAmount = s.amount

      if (wanted > 0.6 && !s.pulsed) {
        s.pulsed = true
        fireFarhanPulse(n)
      } else if (wanted < 0.2) {
        s.pulsed = false
      }
    })

    nodes.forEach((_, i) => writeNode(i, maxAmount))

    deformPaths.forEach((d) => {
      const dx = target.x - d.midx
      const dy = target.y - d.midy
      const dist = Math.hypot(dx, dy)
      // pull -> 1 as the pointer approaches the path's midpoint, -> 0 at
      // FC_DEFORM_RADIUS away, so the displacement grows as the pointer gets
      // CLOSER (a unit vector toward the pointer, scaled by that closeness)
      // rather than growing with raw distance.
      const pull = dist < FC_DEFORM_RADIUS ? 1 - dist / FC_DEFORM_RADIUS : 0
      const ux = dist > 0.001 ? dx / dist : 0
      const uy = dist > 0.001 ? dy / dist : 0
      const wantedX = gsap.utils.clamp(-FC_DEFORM_MAX, FC_DEFORM_MAX, ux * pull * FC_DEFORM_MAX)
      const wantedY = gsap.utils.clamp(-FC_DEFORM_MAX, FC_DEFORM_MAX, uy * pull * FC_DEFORM_MAX)
      d.ox += (wantedX - d.ox) * FC_LERP
      d.oy += (wantedY - d.oy) * FC_LERP
      if (Math.abs(d.ox) > 0.05 || Math.abs(d.oy) > 0.05) alive = true

      const c1x = d.c1x + d.ox
      const c1y = d.c1y + d.oy
      const c2x = d.c2x + d.ox * 0.6
      const c2y = d.c2y + d.oy * 0.6
      d.path.setAttribute(
        'd',
        `M${d.sx},${d.sy} C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${d.ex},${d.ey}`
      )
    })

    if (!alive) {
      gsap.ticker.remove(tick)
      running = false
    }
  }

  function start() {
    if (running) return
    running = true
    gsap.ticker.add(tick)
  }

  function onMove(e) {
    const p = svgPoint(svg, e.clientX, e.clientY)
    if (!p) return
    target.x = p.x
    target.y = p.y
    start()
  }

  function onLeave() {
    target.x = -9999
    target.y = -9999
    start()
  }

  svg.addEventListener('pointermove', onMove)
  svg.addEventListener('pointerleave', onLeave)

  return () => {
    svg.removeEventListener('pointermove', onMove)
    svg.removeEventListener('pointerleave', onLeave)
    gsap.ticker.remove(tick)
    running = false
    nodes.forEach((n, i) => {
      state[i].amount = 0
      n.el.removeAttribute('transform')
      if (n.path) n.path.style.opacity = ''
      if (n.label) n.label.style.opacity = ''
      gsap.killTweensOf(n.pulse)
      if (n.pulse) gsap.set(n.pulse, { opacity: 0 })
    })
    deformPaths.forEach((d) => {
      d.path.setAttribute('d', `M${d.sx},${d.sy} C${d.c1x},${d.c1y} ${d.c2x},${d.c2y} ${d.ex},${d.ey}`)
    })
  }
}

// Touch: no proximity to read, only discrete taps -- mirrors
// bindSchematicTaps exactly (see there for why a tap kills its own node's
// running timeline before restarting, rather than guarding with a flag).
function bindFarhanCoreTaps(svg) {
  const nodes = farhanCoreNodes(svg)
  if (!nodes.length) return null

  const timelines = new Map()
  const handlers = []

  nodes.forEach((n) => {
    if (!n.hit) return

    const onDown = (e) => {
      e.stopPropagation()
      timelines.get(n.key)?.kill()
      const pathRest = parseFloat(n.path?.dataset.rest || '0.22')
      const labelRest = parseFloat(n.label?.dataset.rest || '0.8')

      // Same transform-attribute-by-hand technique as the hub's entrance and
      // the proximity ticker's writeNode() -- n.el is a descendant of the
      // parallax-transformed .fc-depth-front, where GSAP's own scale +
      // (sv)transformOrigin resolves incorrectly (see buildFarhanCoreEntrance).
      const scaleProxy = { s: FC_REST_SCALE }
      const writeScale = () =>
        n.el.setAttribute(
          'transform',
          `translate(${n.cx} ${n.cy}) scale(${scaleProxy.s.toFixed(3)}) translate(${-n.cx} ${-n.cy})`
        )

      const tl = gsap.timeline()
      tl.to(scaleProxy, { s: FC_ACTIVE_SCALE, duration: 0.3, ease: 'power2.out', onUpdate: writeScale })
      if (n.path) tl.to(n.path, { opacity: FC_ACTIVE_PATH, duration: 0.3, ease: 'power2.out' }, '<')
      if (n.label) tl.to(n.label, { opacity: 1, duration: 0.3, ease: 'power2.out' }, '<')
      tl.call(() => fireFarhanPulse(n))
      tl.to(scaleProxy, { s: FC_REST_SCALE, duration: 0.5, ease: 'power2.inOut', onUpdate: writeScale }, '+=0.4')
      if (n.path) tl.to(n.path, { opacity: pathRest, duration: 0.5, ease: 'power2.inOut' }, '<')
      if (n.label) tl.to(n.label, { opacity: labelRest, duration: 0.5, ease: 'power2.inOut' }, '<')

      timelines.set(n.key, tl)
    }

    n.hit.addEventListener('pointerdown', onDown)
    handlers.push({ hit: n.hit, onDown })
  })

  return () => {
    handlers.forEach(({ hit, onDown }) => hit.removeEventListener('pointerdown', onDown))
    timelines.forEach((tl) => tl.kill())
    nodes.forEach((n) => {
      n.el.removeAttribute('transform')
      if (n.path) gsap.set(n.path, { clearProps: 'opacity' })
      if (n.label) gsap.set(n.label, { clearProps: 'opacity' })
      gsap.killTweensOf(n.pulse)
      if (n.pulse) gsap.set(n.pulse, { opacity: 0 })
    })
  }
}

// Scroll depth: the construction marks (crosshairs/ticks/ring/measurement
// fragment) and the structural geometry (hub/routes/nodes) drift a few
// pixels apart while About scrolls through -- the sitewide hex pattern
// behind everything is `position:fixed` (see styles.css), so it is already
// the "doesn't move with scroll" end of this same depth effect for free.
function initFarhanCoreParallax(svg) {
  const back = svg.querySelector('.fc-depth-back')
  const front = svg.querySelector('.fc-depth-front')
  const triggers = []

  ;[
    [back, -7, 7],
    [front, 9, -9],
  ].forEach(([el, from, to]) => {
    if (!el) return
    const tween = gsap.fromTo(
      el,
      { y: from },
      { y: to, ease: 'none', scrollTrigger: { trigger: svg, start: 'top bottom', end: 'bottom top', scrub: 0.6 } }
    )
    triggers.push(tween.scrollTrigger)
  })

  return triggers
}

// ---------------------------------------------------------------------------
// FAQ accordion.
//
// Layers a height/opacity reveal onto the native <details> disclosure
// already used for the mobile nav drawer. Only called `if (!reduced)` by the
// top-level init list, so under prefers-reduced-motion (or with this script
// absent entirely) <details> just toggles instantly -- fully correct and
// keyboard-operable with zero JS, exactly like the nav drawer.
// ---------------------------------------------------------------------------
function initFaqAccordion() {
  document.querySelectorAll('[data-faq]').forEach((item) => {
    const panel = item.querySelector('.faq-a')
    if (!panel) return

    item.addEventListener('click', (e) => {
      // Only the summary's own toggle is handled here -- a click on a link
      // inside an already-open panel (the phone number in the last item)
      // must reach its own default action, not get cancelled by this.
      if (e.target.closest('.faq-a')) return
      e.preventDefault()

      if (item.open) {
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            item.open = false
            gsap.set(panel, { clearProps: 'height,opacity' })
          },
        })
        return
      }

      item.open = true
      const h = panel.scrollHeight
      gsap.fromTo(
        panel,
        { height: 0, opacity: 0 },
        {
          height: h,
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
          onComplete: () => gsap.set(panel, { clearProps: 'height' }),
        }
      )
    })
  })
}
