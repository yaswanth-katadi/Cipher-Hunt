import {
  SESSION_TOKEN_KEY,
  SESSION_ID_KEY,
} from "./constants"

export function getSessionToken() {
  return localStorage.getItem(SESSION_TOKEN_KEY)
}

export function getSessionId() {
  return localStorage.getItem(SESSION_ID_KEY)
}

export function saveSession({
  sessionToken,
  sessionId,
}) {
  if (sessionToken) {
    localStorage.setItem(
      SESSION_TOKEN_KEY,
      sessionToken
    )
  }

  if (sessionId) {
    localStorage.setItem(
      SESSION_ID_KEY,
      sessionId
    )
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_TOKEN_KEY)
  localStorage.removeItem(SESSION_ID_KEY)
}