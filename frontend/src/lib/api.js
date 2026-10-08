import axios from "axios"
import {
  API_BASE_URL,
} from "./constants"
import {
  getSessionToken,
} from "./storage"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  (config) => {
    const sessionToken =
      getSessionToken()

    const isGoogleAuth =
      config.url === "/auth/google/"

    if (
      sessionToken &&
      !isGoogleAuth
    ) {
      config.headers[
        "X-Session-Token"
      ] = sessionToken
    }

    return config
  },
  (error) =>
    Promise.reject(error)
)

export default api