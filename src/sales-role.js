// /sales-role/ application form -> Web3Forms (https://web3forms.com).
//
// SETUP: the Web3Forms access key is read at build time from the
// VITE_WEB3FORMS_ACCESS_KEY environment variable (see .env.example). Web3Forms
// access keys are designed to be public, but they live in config rather than
// in this file. Applicant data is never logged to the console or analytics.

import { formDeadlinePassed, msUntilFormDeadline } from './recruitment.js'

// LIMITATION: the deadline is enforced in the browser only (countdown, locked
// form, and a check right before every submit). Client-side code cannot stop
// someone posting straight to the Web3Forms API, so for a strict cutoff also
// disable the form (or rotate/delete the access key) in the Web3Forms
// dashboard after the deadline, or move submission behind server-side logic.
// Visitors with a wrong device clock can also see a shifted countdown.

const ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim()
const ENDPOINT = 'https://api.web3forms.com/submit'
const REQUEST_TIMEOUT_MS = 20000
const WHATSAPP_URL = 'https://wa.me/256754882329'

const form = document.getElementById('apply-form')

if (form) initApplicationForm(form)
initRecruitmentDeadline()
initStickyCta()

function initApplicationForm(form) {
  const submitBtn = form.querySelector('#submit-btn')
  const submitLabel = form.querySelector('[data-submit-label]')
  const formError = form.querySelector('#form-error')
  const success = document.getElementById('apply-success')
  const idleLabel = submitLabel.textContent

  let submitting = false
  let submitted = false

  const fields = {
    name: { el: form.elements.name, check: checkName },
    whatsapp: { el: form.elements.whatsapp, check: checkWhatsapp },
    availability: { el: form.elements.availability, check: checkRequiredChoice('Please choose your weekly availability.') },
    calling: { el: form.querySelector('#f-calling'), check: checkRadioGroup('Please choose how comfortable you are with cold-calling.') },
    scenario: { el: form.elements.scenario, check: checkLongAnswer('Tell me how you would respond to the director.') },
    clients: { el: form.elements.clients, check: checkLongAnswer('Tell me how you would find your first five potential clients.') },
    terms: { el: form.elements.terms, check: checkTicked('Please confirm you understand the commission-only arrangement.') },
    privacy: { el: form.elements.privacy, check: checkTicked('Please confirm you have read the privacy notice and consent.') },
  }

  // Inline validation: validate a field once the person leaves it, then keep
  // it live so the message clears as soon as it is fixed.
  Object.values(fields).forEach((field) => {
    const { el } = field
    field.touched = false
    el.addEventListener('blur', () => {
      field.touched = true
      validateField(field)
    })
    const live = () => {
      if (field.touched || el.getAttribute('aria-invalid') === 'true') validateField(field)
    }
    el.addEventListener('input', live)
    el.addEventListener('change', live)
  })

  // Polite heads-up (never a block) when the chosen availability is below the
  // expected 10 hours per week minimum.
  const availabilityNote = document.getElementById('f-availability-note')
  fields.availability.el.addEventListener('change', (e) => {
    availabilityNote.hidden = e.target.value !== 'Less than 10 hours'
  })

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    if (submitting || submitted) return

    hideFormError()

    // Re-check the deadline at the moment of submission, not just on load.
    if (formDeadlinePassed()) {
      closeApplications()
      return
    }

    let firstInvalid = null
    for (const field of Object.values(fields)) {
      field.touched = true
      if (!validateField(field) && !firstInvalid) firstInvalid = field.el
    }
    if (firstInvalid) {
      firstInvalid.focus()
      return
    }

    // Honeypot: only automated form-fillers tick the hidden field. Pretend it
    // worked so a bot gets no signal to adapt to, and send nothing.
    if (form.elements.botcheck.checked) {
      showSuccess()
      return
    }

    if (!ACCESS_KEY) {
      showFormError(
        'Online applications are not open yet. Please message me on <a href="' + WHATSAPP_URL + '">WhatsApp</a> and I will help you apply.'
      )
      return
    }

    // Validation can take a while (a person fixing fields); check once more
    // immediately before any request is started.
    if (formDeadlinePassed()) {
      closeApplications()
      return
    }

    setSubmitting(true)
    try {
      const outcome = await sendApplication(buildPayload())
      if (outcome.ok) {
        showSuccess()
      } else {
        showFormError(outcome.message)
      }
    } finally {
      setSubmitting(false)
    }
  })

  function buildPayload() {
    const value = (name) => form.elements[name].value.trim()
    const name = value('name')
    return {
      access_key: ACCESS_KEY,
      subject: 'Sales Representative application: ' + name,
      from_name: 'Sales role application form',
      botcheck: '',
      'Full name': name,
      'WhatsApp number': normalisePhone(value('whatsapp')),
      'Weekly availability': value('availability'),
      'Previous sales experience': value('experience') || 'Not provided',
      'Cold-calling confidence': value('calling'),
      'Scenario: school director says no website needed': value('scenario'),
      'How they would respond to "our websites are too expensive"': value('objection') || 'Not provided',
      'How they would find their first five clients': value('clients'),
      'Acknowledged commission-only terms': 'Yes',
      'Consented to privacy notice and processing': 'Yes',
    }
  }

  // Resolves to { ok: true } only when Web3Forms itself confirms success; every
  // other path resolves to { ok: false, message } and never throws.
  async function sendApplication(payload) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      let data = null
      try {
        data = await response.json()
      } catch {
        // Non-JSON body: treated as a failure below.
      }

      if (response.ok && data && data.success === true) return { ok: true }

      if (response.status === 429) {
        return { ok: false, message: 'Too many submissions right now. Your answers are still here, so please wait a minute and try again.' }
      }
      return {
        ok: false,
        message:
          'Your application could not be sent. Your answers are still here, so please try again, or message me on <a href="' + WHATSAPP_URL + '">WhatsApp</a>.',
      }
    } catch {
      return {
        ok: false,
        message:
          'Could not reach the server. Check your connection and try again. Your answers are still here. If it keeps failing, message me on <a href="' + WHATSAPP_URL + '">WhatsApp</a>.',
      }
    } finally {
      clearTimeout(timer)
    }
  }

  function setSubmitting(state) {
    submitting = state
    submitBtn.disabled = state
    submitBtn.setAttribute('aria-busy', String(state))
    form.setAttribute('aria-busy', String(state))
    submitLabel.textContent = state ? 'Sending…' : idleLabel
  }

  function showFormError(html) {
    formError.innerHTML = html
    formError.hidden = false
    formError.focus()
  }

  function hideFormError() {
    formError.hidden = true
    formError.textContent = ''
  }

  function showSuccess() {
    submitted = true
    form.hidden = true
    success.hidden = false
    success.focus()
    success.scrollIntoView({ block: 'center', behavior: 'smooth' })
    form.reset()
  }
}

/* ---------- Validation ---------- */

function validateField(field) {
  const message = field.check(field.el.value, field.el)
  const error = document.getElementById(field.el.id + '-error')

  if (message) {
    field.el.setAttribute('aria-invalid', 'true')
    error.textContent = message
    error.hidden = false
    return false
  }

  field.el.removeAttribute('aria-invalid')
  error.textContent = ''
  error.hidden = true
  return true
}

function checkName(value) {
  const v = value.trim()
  if (!v) return 'Please enter your full name.'
  if (v.length < 2) return 'Your name looks too short.'
  return ''
}

function checkWhatsapp(value) {
  if (!value.trim()) return 'Please enter your WhatsApp number.'
  if (!normalisePhone(value)) {
    return 'Enter a valid number, such as 0754 882 329 or +254 712 345 678.'
  }
  return ''
}

function checkLongAnswer(emptyMessage) {
  return (value) => {
    const v = value.trim()
    if (!v) return emptyMessage
    if (v.length < 30) return 'Please write a little more, at least a couple of sentences.'
    return ''
  }
}

function checkRequiredChoice(message) {
  return (value) => (value ? '' : message)
}

// The "field" is the fieldset; valid when one of its radios is selected.
function checkRadioGroup(message) {
  return (_value, el) => (el.querySelector('input:checked') ? '' : message)
}

function checkTicked(message) {
  return (_value, el) => (el.checked ? '' : message)
}

// Accepts Ugandan numbers (0754882329, 754882329, 256754882329, +256...) and
// international numbers (+254..., 00254...). Returns the number in +country
// form for the email, or null when it is not a plausible number.
function normalisePhone(raw) {
  const cleaned = raw.trim().replace(/[\s().-]/g, '')
  if (!/^\+?\d+$/.test(cleaned)) return null

  let digits = cleaned
  let international = false
  if (digits.startsWith('+')) {
    digits = digits.slice(1)
    international = true
  } else if (digits.startsWith('00')) {
    digits = digits.slice(2)
    international = true
  }

  if (!international) {
    if (/^0[1-9]\d{8}$/.test(digits)) return '+256' + digits.slice(1)
    if (/^[1-9]\d{8}$/.test(digits)) return '+256' + digits
    if (/^256\d{9}$/.test(digits)) return '+' + digits
    return null
  }

  if (digits.startsWith('256')) return /^256[1-9]\d{8}$/.test(digits) ? '+' + digits : null
  return /^[1-9]\d{7,14}$/.test(digits) ? '+' + digits : null
}

/* ---------- Deadline: countdown and closed state ---------- */

function initRecruitmentDeadline() {
  renderOriginalDeadlineAsDisabled()
  initFormDeadline()
}

// The originally advertised deadline (31 October 2026) has already passed.
// Rather than hide it, the hero countdown is left on the page but frozen at
// zero and visually marked as disabled, so visitors can see that window has
// closed -- while the application form below stays open under its own,
// separate extension deadline (see initFormDeadline).
function renderOriginalDeadlineAsDisabled() {
  const countdown = document.querySelector('[data-countdown]')
  if (!countdown) return

  countdown.classList.add('sales-countdown--disabled')
  countdown.setAttribute('aria-disabled', 'true')

  const label = countdown.querySelector('.sales-countdown-label')
  if (label) label.textContent = 'Applications closed 31 October 2026 · 11:59 PM EAT'

  const pad = '00'
  ;['days', 'hours', 'minutes', 'seconds'].forEach((unit) => {
    const cell = countdown.querySelector('[data-cd="' + unit + '"]')
    if (cell) cell.textContent = pad
  })
}

// A fresh, separate countdown next to the form itself. Applications stay open
// until this one runs out, at which point the form locks the same way the
// original deadline used to.
function initFormDeadline() {
  const countdown = document.querySelector('[data-form-countdown]')
  const cells = countdown
    ? {
        days: countdown.querySelector('[data-fcd="days"]'),
        hours: countdown.querySelector('[data-fcd="hours"]'),
        minutes: countdown.querySelector('[data-fcd="minutes"]'),
        seconds: countdown.querySelector('[data-fcd="seconds"]'),
      }
    : null
  let timer = null

  function tick() {
    if (formDeadlinePassed()) {
      clearInterval(timer)
      if (cells) {
        const pad = '00'
        cells.days.textContent = pad
        cells.hours.textContent = pad
        cells.minutes.textContent = pad
        cells.seconds.textContent = pad
      }
      closeApplications()
      return
    }
    if (!cells) return
    const total = Math.floor(msUntilFormDeadline() / 1000)
    const pad = (n) => String(n).padStart(2, '0')
    cells.days.textContent = pad(Math.floor(total / 86400))
    cells.hours.textContent = pad(Math.floor((total % 86400) / 3600))
    cells.minutes.textContent = pad(Math.floor((total % 3600) / 60))
    cells.seconds.textContent = pad(total % 60)
  }

  tick()
  if (formDeadlinePassed()) return
  timer = setInterval(tick, 1000)
  // Timers are throttled in background tabs; re-check as soon as the tab is back.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tick()
  })
}

// Idempotent. Swaps the form for the closed message (unless this visitor has
// just submitted successfully, in which case their confirmation stays) and
// stops the page encouraging applications.
function closeApplications() {
  const form = document.getElementById('apply-form')
  const closedPanel = document.getElementById('apply-closed')
  const success = document.getElementById('apply-success')
  if (!form || !closedPanel) return

  document.documentElement.classList.add('applications-closed')
  document.getElementById('submit-btn').disabled = true

  if (success.hidden) {
    form.hidden = true
    closedPanel.hidden = false
  }

  const heading = document.querySelector('[data-apply-heading]')
  if (heading) heading.textContent = 'Applications closed'
  const lead = document.querySelector('[data-apply-lead]')
  if (lead) lead.hidden = true

  const countdown = document.querySelector('[data-countdown]')
  if (countdown) countdown.hidden = true
  const formCountdown = document.querySelector('[data-form-countdown]')
  if (formCountdown) formCountdown.hidden = true
  const positions = document.querySelector('[data-positions-note]')
  if (positions) positions.hidden = true
  const note = document.querySelector('[data-closed-note]')
  if (note) note.hidden = false

  const cta = document.querySelector('[data-apply-cta]')
  if (cta) {
    const closedLabel = document.createElement('span')
    closedLabel.className = 'work-cta work-cta--ghost'
    closedLabel.textContent = 'Applications closed'
    cta.replaceWith(closedLabel)
  }
}

// Mobile-only Apply bar: hidden while the hero button or the form is on screen.
function initStickyCta() {
  const bar = document.querySelector('[data-sticky-cta]')
  const targets = document.querySelectorAll('[data-hero-actions], #apply, .site-footer')
  if (!bar || !('IntersectionObserver' in window)) return
  const visible = new Set()
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))
    bar.toggleAttribute('data-hidden', visible.size > 0)
  })
  targets.forEach((t) => io.observe(t))
  bar.setAttribute('data-hidden', '')
}
