import { motion } from "framer-motion"

function PrimaryButton({ children, onClick, disabled = false, type = "button" }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { x: 3 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className="border border-[#e50914] bg-[#e50914] px-6 py-3 font-cyber text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5f5f7] transition hover:bg-[#ff1a24] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </motion.button>
  )
}

export default PrimaryButton
