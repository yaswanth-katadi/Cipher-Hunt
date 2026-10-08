import { useState } from "react"
import { useNavigate } from "react-router-dom"

import GoogleAuthButton from "../components/auth/GoogleAuthButton"
import SectionLabel from "../components/common/SectionLabel"
import CaseStamp from "../components/common/CaseStamp"
import { useAuth } from "../context/AuthContext"

function Login() {
  const navigate = useNavigate()
  const { loginWithGoogle, loading } = useAuth()

  const [error, setError] = useState("")

  const handleGoogleSuccess = async (credentialResponse) => {
    setError("")

    if (!credentialResponse?.credential) {
      setError("Google authentication did not return a valid credential.")
      return
    }

    try {
      await loginWithGoogle(credentialResponse.credential)
      navigate("/case")
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Google authentication failed. Please try again."

      setError(message)
    }
  }

  const handleGoogleError = () => {
    setError("Google Sign-In was cancelled or failed. Please try again.")
  }

  return (
    <main className="min-h-screen bg-[#0b0b0a] text-[#f4efe5]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-5 py-10 sm:px-8">
        <section className="w-full max-w-xl">
          <div className="border border-[#3a3833] bg-[#11110f] p-6 shadow-2xl sm:p-10">
            <div className="mb-8 flex items-start justify-between gap-6">
              <div>
                <SectionLabel>CASE FILE REGISTRATION</SectionLabel>

                <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                  CIPHERHUNT
                </h1>

                <p className="mt-3 max-w-md text-sm leading-6 text-[#aaa49a] sm:text-base">
                  Crack the clues. Trace the thief.
                </p>
              </div>

              <CaseStamp>CASE 01</CaseStamp>
            </div>

            <div className="mb-8 border-y border-[#3a3833] py-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8f8a81]">
                ACCESS REQUIRED
              </p>

              <p className="mt-3 text-sm leading-6 text-[#c8c1b6]">
                Sign in with your verified Google account to open your case
                file. Your participant identity is taken directly from your
                Google account.
              </p>
            </div>

            <div className="space-y-4">
              <GoogleAuthButton
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                disabled={loading}
              />

              {loading && (
                <p className="text-center text-sm text-[#aaa49a]">
                  Verifying your case credentials...
                </p>
              )}

              {error && (
                <div className="border border-[#7f2d2d] bg-[#21100f] px-4 py-3 text-sm leading-6 text-[#f0aaa0]">
                  {error}
                </div>
              )}
            </div>

            <div className="mt-8 border-t border-[#3a3833] pt-5">
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#716d66]">
                <span>Single Player</span>
                <span>Google Verified</span>
                <span>Secure Session</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login