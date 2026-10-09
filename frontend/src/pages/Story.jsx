import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"

const scenes = [
  { number: "01", label: "THE WORKSHOP", title: "The workshop went quiet at 02:17.", text: "The lights were still on. The machines had stopped. But something was missing." },
  { number: "02", label: "THE INCIDENT", title: "A component disappeared without a trace.", text: "The owner found an empty space where a critical component had been secured only minutes earlier." },
  { number: "03", label: "THE EVIDENCE", title: "Someone wanted the trail to be difficult to follow.", text: "The available evidence contains fragments of a hidden coordinate. The information has been deliberately divided." },
  { number: "04", label: "THE ASSIGNMENT", title: "Now the investigation is yours.", text: "Follow the patterns. Recover the coordinate. Find where the trail ends." },
]

function Story() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const scene = scenes[index]

  function next() {
    if (index === scenes.length - 1) return navigate("/briefing")
    setIndex((value) => value + 1)
  }

  return (
    <main className="cyber-grid min-h-screen bg-[#030305] text-[#f5f5f7]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 py-7 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between border-b border-[#24242a] pb-5">
          <div>
            <p className="font-cyber text-xs font-bold tracking-[0.22em]">CIPHER HUNT</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#70707a]">Evidence Sequence</p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#85858f]">{index + 1} / {scenes.length}</p>
        </header>

        <AnimatePresence mode="wait">
          <motion.section
            key={scene.number}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45 }}
            className="max-w-5xl py-16"
          >
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em]">
              <span className="h-2 w-2 bg-[#e50914] cyber-pulse" />
              <span className="text-[#e50914]">{scene.number}</span>
              <span className="text-[#55555e]">//</span>
              <span className="text-[#85858f]">{scene.label}</span>
            </div>
            <h1 className="mt-7 font-cyber text-[clamp(2.6rem,6vw,6.5rem)] font-black leading-[0.98] tracking-[-0.035em]">
              {scene.title}
            </h1>
            <div className="mt-9 h-px w-24 bg-[#e50914]" />
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#a2a2ad] md:text-xl">{scene.text}</p>
          </motion.section>
        </AnimatePresence>

        <footer className="flex items-center justify-between border-t border-[#24242a] pt-6">
          <div className="flex gap-2">
            {scenes.map((item, sceneIndex) => (
              <span key={item.number} className={`h-1 w-10 transition-all duration-300 ${sceneIndex === index ? "bg-[#e50914]" : "bg-[#35353d]"}`} />
            ))}
          </div>
          <motion.button whileHover={{ x: 4 }} whileTap={{ scale: .98 }} onClick={next} className="border border-[#e50914] bg-[#e50914] px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#ff1a24]">
            {index === scenes.length - 1 ? "Read Briefing ↗" : "Continue ↗"}
          </motion.button>
        </footer>
      </div>
    </main>
  )
}

export default Story
