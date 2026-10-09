import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import GoogleAuthButton from "../components/auth/GoogleAuthButton"
import { useAuth } from "../context/AuthContext"
import FerrofluidBackground from "../components/FerrofluidBackground";
function Login() {
  const { loginWithGoogle, loading } = useAuth()
  const [showAccess, setShowAccess] = useState(false)
  const [error, setError] = useState("")

  const handleGoogleSuccess = async (credentialResponse) => {
    setError("")
    if (!credentialResponse?.credential) {
      setError("Google authentication did not return a valid credential.")
      return
    }
    try {
      await loginWithGoogle(credentialResponse.credential)
      // PublicRoute redirects using the saved session status/resume_path:
      // Round 1, Round 2, or leaderboard for completed sessions.
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
        err?.message ||
        "Google authentication failed. Please try again."
      )
    }
  }

  const handleGoogleError = () => {
    setError("Google Sign-In was cancelled or failed. Please try again.")
  }

  return (
    <main className="cyber-grid min-h-screen overflow-hidden bg-[#030305] text-[#f5f5f7]">
      <FerrofluidBackground/>
      <AnimatePresence mode="wait">
        {!showAccess ? (
          <motion.section
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.55 }}
            className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-7 sm:px-10 lg:px-14"
          >
            <header className="flex items-center justify-between border-b border-[#292930] pb-5">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center bg-[#e50914] font-black text-black">X</span>
                <div>
                  <p className="font-cyber text-sm font-bold tracking-[0.22em]">CIPHER HUNT</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#85858f]">The Investigation</p>
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#85858f]">SAEINDIA // 2026</span>
            </header>

            <div className="flex flex-1 items-center py-16">
              <div className="max-w-5xl">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em]"
                >
                  <span className="h-2 w-2 bg-[#e50914] cyber-pulse" />
                  <span className="text-[#e50914]">Case File</span>
                  <span className="text-[#55555e]">//</span>
                  <span className="text-[#85858f]">Status: Active</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.7 }}
                  className="font-cyber text-[clamp(3.7rem,11vw,9.5rem)] font-black leading-[0.84] tracking-[-0.055em]"
                >
                  CIPHER
                  <br />
                  <span className="red-glow text-[#e50914]">HUNT</span>
                </motion.h1>

                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "8rem", opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mt-10 h-px bg-[#e50914]"
                />

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95, duration: 0.5 }}
                  className="mt-8 max-w-xl text-lg leading-8 text-[#a2a2ad] sm:text-xl"
                >
                  A critical component has been stolen.<br />
                  The suspect has escaped.<br />
                  <span className="font-bold tracking-[0.12em] text-white">YOU ARE THE LEAD INVESTIGATOR.</span>
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15, duration: 0.5 }}
                  whileHover={{ x: 5, boxShadow: "0 0 35px rgba(229,9,20,.18)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAccess(true)}
                  className="mt-10 border border-[#e50914] bg-[#e50914] px-7 py-4 font-cyber text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#ff1a24]"
                >
                  Enter the Case ↗
                </motion.button>
              </div>
            </div>

            <footer className="flex items-end justify-between border-t border-[#292930] pt-5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#70707a]">
              <span>CASE 01 / CLASSIFIED</span>
              <span>Secure Investigation Portal</span>
            </footer>
          </motion.section>
        ) : (
          <motion.section
            key="access"
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -35 }}
            transition={{ duration: 0.45 }}
            className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 py-10 sm:px-8"
          >
            <div className="cyber-corner cyber-scan red-border-glow w-full max-w-lg border border-[#292930] bg-[#09090c] p-7 sm:p-10">
              <div className="mb-8 flex items-start justify-between gap-5 border-b border-[#292930] pb-7">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#e50914]">CIPHER HUNT // SECURE ACCESS</p>
                  <h2 className="mt-4 font-cyber text-2xl font-bold tracking-[0.08em]">ENTER THE INVESTIGATION</h2>
                  <p className="mt-3 text-sm text-[#85858f]">SAEINDIA presents a restricted investigation portal.</p>
                </div>
                <button onClick={() => setShowAccess(false)} className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#85858f] hover:text-white">Back</button>
              </div>

              <GoogleAuthButton onSuccess={handleGoogleSuccess} onError={handleGoogleError} disabled={loading} />

              {loading && <p className="mt-4 text-center text-sm text-[#a2a2ad]">Verifying case credentials...</p>}
              {error && <div className="mt-5 border border-[#8f1119] bg-[#18080a] px-4 py-3 text-sm leading-6 text-[#ff9aa0]">{error}</div>}

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#292930] pt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#70707a]">
                <span>Google Verified</span>
                <span>Secure Session</span>
                <span>Encrypted Access</span>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Login
