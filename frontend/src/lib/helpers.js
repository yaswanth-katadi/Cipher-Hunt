export function formatTime(milliseconds = 0) {
  const totalSeconds = Math.max(
    0,
    Math.floor(milliseconds / 1000)
  )

  const minutes = Math.floor(
    totalSeconds / 60
  )

  const seconds =
    totalSeconds % 60

  return `${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(
    2,
    "0"
  )}`
}

export function formatDate(value) {
  if (!value) {
    return "—"
  }

  try {
    return new Date(value).toLocaleString()
  } catch {
    return "—"
  }
}

export function getSessionIdFromResponse(
  data
) {
  return (
    data?.session?.id ||
    data?.id ||
    null
  )
}

export function getSessionTokenFromResponse(
  data
) {
  return (
    data?.session?.session_token ||
    data?.session_token ||
    null
  )
}

export function getRoundState(
  session,
  roundNumber
) {
  if (!session) {
    return null
  }

  return {
    status:
      session[
        `round_${roundNumber}_status`
      ] || null,

    attempts:
      session[
        `round_${roundNumber}_attempts`
      ] || 0,

    stage:
      session[
        `round_${roundNumber}_stage`
      ] || null,
  }
}

export function clamp(value, min, max) {
  return Math.min(
    Math.max(value, min),
    max
  )
}