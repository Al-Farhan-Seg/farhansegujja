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

if (!reduced) {
  initSplash()
  initHeroIntro()
  initRoleTypewriter()
  initReveals()
  initPinSteps()
  if (finePointer) {
    initMagnetic()
    initCursor()
  }
  initEvidenceHover()
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

  const PARTICLE_COUNT = 32
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

  gsap.set(particles, {
    x: (i) => Math.cos(angleStep * i) * spread() * 1.6,
    y: (i) => Math.sin(angleStep * i) * spread() * 1.6,
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

  // Storm: "</>" particles rush in from every edge toward scattered
  // mid-screen positions.
  tl.to(particles, {
    x: (i) => Math.cos(angleStep * i * 1.7) * spread() * 0.5,
    y: (i) => Math.sin(angleStep * i * 1.7) * spread() * 0.5,
    rotation: () => gsap.utils.random(-40, 40),
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out',
    stagger: { each: 0.012, from: 'random' },
  })

  // Converge: the storm collapses into the center and the logo pops out of it.
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
    '-=0.15'
  )
  tl.to(
    logo,
    { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' },
    '-=0.35'
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

  if (split) {
    gsap.set(split.words, { opacity: 0, yPercent: 130 })
    tl.to(split.words, { opacity: 1, yPercent: 0, duration: 0.8, stagger: 0.06 })
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
  document.querySelectorAll('.evidence-frame').forEach((frame) => {
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
