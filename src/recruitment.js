// Single source of truth for when /sales-role/ applications close. Shared by
// the page (countdown, form lock) and every page's ticker banner.
//
// 31 October 2026, 11:59:59 PM East Africa Time (UTC+03:00). The explicit
// offset makes this one fixed instant, so it is the same moment for visitors
// in any timezone. Applications count as closed from that instant onward.
//
// This original deadline has already passed. It is kept only so the hero
// countdown can still display when the role was originally advertised as
// closing; it no longer gates the form itself (see FORM_DEADLINE below).
export const APPLICATION_DEADLINE = '2026-10-31T23:59:59+03:00'

const deadlineMs = Date.parse(APPLICATION_DEADLINE)

export function msUntilDeadline(now = Date.now()) {
  return Math.max(0, deadlineMs - now)
}

export function applicationsClosed(now = Date.now()) {
  return now >= deadlineMs
}

// Extension deadline for the application form itself: 2 November 2026, 8:00 AM
// East Africa Time. The form stays open and usable past the original
// APPLICATION_DEADLINE above until this instant, when it locks the same way.
export const FORM_DEADLINE = '2026-11-02T08:00:00+03:00'

const formDeadlineMs = Date.parse(FORM_DEADLINE)

export function msUntilFormDeadline(now = Date.now()) {
  return Math.max(0, formDeadlineMs - now)
}

export function formDeadlinePassed(now = Date.now()) {
  return now >= formDeadlineMs
}
