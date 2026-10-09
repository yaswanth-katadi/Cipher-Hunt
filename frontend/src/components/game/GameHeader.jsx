import { motion } from "framer-motion"
import SectionLabel from "../common/SectionLabel"
import StageIndicator from "./StageIndicator"
import RoundTimer from "./RoundTimer"

function GameHeader({ round, stage, elapsedMs }) {
  return (
    <div className="cyber-scan border-b border-[#292930] pb-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <SectionLabel>Investigation Round 0{round}</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-3 font-cyber text-3xl font-black uppercase tracking-[0.06em] md:text-5xl"
          >
            {round === 1 ? "Latitude" : "Longitude"}
          </motion.h1>
          <div className="mt-5"><StageIndicator stage={stage} /></div>
        </div>
        <RoundTimer milliseconds={elapsedMs} />
      </div>
    </div>
  )
}

export default GameHeader
