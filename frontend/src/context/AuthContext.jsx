import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import api from "../lib/api"

import {
  saveSession,
  clearSession,
  getSessionId,
  getSessionToken,
} from "../lib/storage"

const AuthContext =
  createContext(null)

export function AuthProvider({
  children,
}) {
  const [
    registration,
    setRegistration,
  ] = useState(null)

  const [
    session,
    setSession,
  ] = useState(null)

  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    authError,
    setAuthError,
  ] = useState(null)

  // Intentionally require Google login after a full page refresh.
  // The backend associates the Google account with its existing GameSession,
  // so login can resume the saved round without creating a new session.
  useEffect(() => {
    clearSession()
    setRegistration(null)
    setSession(null)
    setLoading(false)
  }, [])

  async function loginWithGoogle(
    credential
  ) {
    setLoading(true)
    setAuthError(null)

    try {
      const response =
        await api.post(
          "/auth/google/",
          {
            credential,
          }
        )

      const data =
        response.data

      // Support both response shapes:
      //   Nested:  { session: { session_token, id }, registration: { ... } }
      //   Flat:    { session_token, id, registration_code, ... }
      const sessionData =
        data.session ?? data

      const sessionToken =
        sessionData?.session_token

      const sessionId =
        sessionData?.id

      if (
        !sessionToken ||
        !sessionId
      ) {
        throw new Error(
          "Authentication succeeded but no game session was returned."
        )
      }

      saveSession({
        sessionToken,
        sessionId,
      })

      setRegistration(
        data.registration ?? {
          registration_code: sessionData.registration_code,
          participant_name: sessionData.participant_name,
        }
      )

      setSession(
        sessionData
      )

      return data
    } catch (error) {
      console.error(
        "Google authentication failed:",
        error.response?.data ||
          error
      )

      setAuthError(
        error.response?.data
          ?.detail ||
          error.message ||
          "Google authentication failed."
      )

      throw error
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    clearSession()

    setRegistration(null)
    setSession(null)
    setAuthError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        registration,
        session,
        loading,
        authError,
        loginWithGoogle,
        logout,
        setSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context =
    useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    )
  }

  return context
}