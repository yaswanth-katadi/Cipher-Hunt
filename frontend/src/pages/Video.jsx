
import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function Video() {
  const navigate = useNavigate()
  const [videoEnded, setVideoEnded] = useState(false)

  return (
    <main className="min-h-screen bg-[#030305] text-white flex flex-col">
      <header className="border-b border-red-900/50 px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black tracking-[0.25em]">
            <span className="text-red-600"></span> CIPHER HUNT
          </h1>
          <p className="text-[10px] text-red-500 tracking-[0.3em]">
            THE INVESTIGATION
          </p>
        </div>
        <span className="hidden sm:block text-xs text-gray-500 tracking-widest">
          SAEINDIA // 2026
        </span>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-5 py-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500 tracking-[0.35em] mb-4"
        >
          CASE FILE // VIDEO EVIDENCE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black tracking-wider text-center"
        >
          THE INCIDENT
        </motion.h2>

        <p className="text-gray-500 text-xs md:text-sm tracking-widest text-center mt-4 mb-8">
          REVIEW THE FOOTAGE BEFORE PROCEEDING
        </p>

        <div className="w-full max-w-5xl border border-red-800/60 bg-black shadow-[0_0_40px_rgba(180,0,0,0.15)]">
          <div className="flex justify-between px-4 py-3 border-b border-red-900/50 text-[10px] tracking-widest">
            <span className="text-red-500">SURVEILLANCE // PLAYBACK</span>
            <span className="text-gray-600">EVIDENCE 001</span>
          </div>

          <video
            className="w-full aspect-video bg-black"
            controls
            playsInline
            onEnded={() => setVideoEnded(true)}
          >
            <source src="/videos/case-video.mp4" type="video/mp4" />
            Your browser does not support this video.
          </video>

          <div className="px-4 py-3 border-t border-red-900/50 text-xs text-gray-500">
            STATUS: {videoEnded ? "EVIDENCE REVIEWED" : "AWAITING REVIEW"}
          </div>
        </div>

        <button
          onClick={() => navigate("/story")}
          disabled={!videoEnded}
          className="mt-8 px-8 py-4 border border-red-700 text-xs font-bold tracking-[0.2em] transition
            enabled:hover:bg-red-700 enabled:hover:shadow-[0_0_25px_rgba(220,0,0,0.3)]
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {videoEnded ? "CONTINUE TO STORY →" : "WATCH VIDEO TO CONTINUE"}
        </button>
      </section>

      <footer className="border-t border-red-900/30 px-6 py-4 flex justify-between text-[10px] tracking-widest text-gray-600">
        <span>CASE STATUS: ACTIVE</span>
        <span>SECURE CHANNEL</span>
      </footer>
    </main>
  )
}
