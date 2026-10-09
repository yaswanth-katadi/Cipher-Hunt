import { motion } from "framer-motion"

function PuzzleNode({ node, selected, orderNumber, onClick, disabled }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -3, scale: 1.015 } : undefined}
      whileTap={!disabled ? { scale: 0.975 } : undefined}
      animate={selected ? { boxShadow: "0 0 24px rgba(229,9,20,.14)" } : { boxShadow: "0 0 0 rgba(229,9,20,0)" }}
      className={[
        "cyber-corner relative aspect-square border p-3 text-left transition",
        selected ? "border-[#e50914] bg-[#18080a]" : "border-[#35353d] bg-[#0d0d11] hover:border-[#e50914]",
        disabled ? "cursor-not-allowed opacity-50" : "",
      ].join(" ")}
    >
      {orderNumber && (
        <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center border border-[#e50914] font-mono text-[10px] text-[#f5f5f7]">
          {orderNumber}
        </span>
      )}
      <span className="font-cyber text-2xl font-black text-[#e50914]">{node.node}</span>
      <div className="mt-3 space-y-1 font-mono text-[9px] uppercase tracking-[0.08em] text-[#85858f]">
        <p>Object: {node.object}</p>
        <p>Zone: {node.zone}</p>
        <p>CCTV: {node.cctv}</p>
        <p>Time: {node.time}</p>
      </div>
    </motion.button>
  )
}

export default PuzzleNode
