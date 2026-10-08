export const SESSION_TOKEN_KEY = "cipherhunt_session_token"
export const SESSION_ID_KEY = "cipherhunt_session_id"

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000/api"

export const ROUND_STATUS = {
  LOCKED: "LOCKED",
  ACTIVE: "ACTIVE",
  SOLVED: "SOLVED",
}

export const GAME_STATUS = {
  NOT_STARTED: "NOT_STARTED",
  ROUND_1: "ROUND_1",
  ROUND_2: "ROUND_2",
  FINAL: "FINAL",
  COMPLETED: "COMPLETED",
}