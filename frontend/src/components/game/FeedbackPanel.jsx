import { motion } from "framer-motion"

function FeedbackPanel({ feedback }) {
  if (!feedback) return null
  const solved = feedback.solved

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={["red-border-glow border p-5", solved ? "border-[#e50914] bg-[#18080a]" : "border-[#35353d] bg-[#0d0d11]"].join(" ")}
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#e50914]">{solved ? "Evidence Confirmed" : "Submission Recorded"}</p>
      {feedback.message && <p className="mt-3 text-sm leading-6 text-[#a2a2ad]">{feedback.message}</p>}
      {typeof feedback.correctly_placed === "number" && (
        <div className="mt-4 flex gap-8">
          <div><p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#85858f]">Correct</p><p className="mt-1 font-cyber text-xl font-bold">{feedback.correctly_placed}</p></div>
          <div><p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#85858f]">Incorrect</p><p className="mt-1 font-cyber text-xl font-bold">{feedback.incorrectly_placed ?? 0}</p></div>
        </div>
      )}
    </motion.div>
  )
}

export default FeedbackPanel
