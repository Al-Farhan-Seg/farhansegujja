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
  initHeroIntro()
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
  const btn = document.querySelector('[data-theme-toggle]')
  if (!btn) return

  const themes = ['light', 'dark', 'umber']

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'umber'
    const next = themes[(themes.indexOf(current) + 1) % themes.length]

    root.setAttribute('data-theme', next)

    try {
      localStorage.setItem('theme', next)
    } catch {
      // Private browsing / storage disabled: theme still applies for this load.
    }
  })
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

function initHeroIntro() {
  const hero = document.querySelector('[data-hero]')
  if (!hero) return

  const heading = hero.querySelector('h1')
  const split = heading ? new SplitText(heading, { type: 'words' }) : null

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.to(hero.querySelectorAll('[data-hero-kicker]'), { opacity: 1, duration: 0.6 })

  if (split) {
    gsap.set(split.words, { opacity: 0, yPercent: 130 })
    tl.to(split.words, { opacity: 1, yPercent: 0, duration: 0.8, stagger: 0.06 }, '-=0.3')
  }

  tl.to(
    hero.querySelectorAll('[data-hero-copy], [data-hero-actions] > *'),
    { opacity: 1, duration: 0.6, stagger: 0.08 },
    '-=0.4'
  )

  tl.fromTo(
    hero.querySelectorAll('[data-hero-media]'),
    { opacity: 0, scale: 1.05 },
    { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
    '-=0.5'
  )
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
