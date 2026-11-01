// Single source of truth for when /sales-role/ applications close. Shared by
// the page (countdown, form lock) and every page's ticker banner.
//
// 31 October 2026, 11:59:59 PM East Africa Time (UTC+03:00). The explicit
// offset makes this one fixed instant, so it is the same moment for visitors
// in any timezone. Applications count as closed from that instant onward.
export const APPLICATION_DEADLINE = '2026-10-31T23:59:59+03:00'

const deadlineMs = Date.parse(APPLICATION_DEADLINE)

export function msUntilDeadline(now = Date.now()) {
  return Math.max(0, deadlineMs - now)
}

export function applicationsClosed(now = Date.now()) {
  return now >= deadlineMs
}
