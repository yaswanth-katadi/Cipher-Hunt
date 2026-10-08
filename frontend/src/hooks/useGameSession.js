import {
  useCallback,
  useState,
} from "react"

import api from "../lib/api"

import {
  getSessionId,
} from "../lib/storage"

export default function useGameSession() {
  const [
    session,
    setSession,
  ] = useState(null)

  const [
    loading,
    setLoading,
  ] = useState(false)

  const [
    error,
    setError,
  ] = useState(null)

  const loadSession =
    useCallback(
      async () => {
        const sessionId =
          getSessionId()

        if (!sessionId) {
          throw new Error(
            "No active session."
          )
        }

        setLoading(true)
        setError(null)

        try {
          const response =
            await api.get(
              `/session/${sessionId}/`
            )

          setSession(
            response.data
          )

          return response.data
        } catch (err) {
          setError(
            err.response?.data
              ?.detail ||
              err.message
          )

          throw err
        } finally {
          setLoading(false)
        }
      },
      []
    )

  return {
    session,
    setSession,
    loading,
    error,
    loadSession,
  }
}