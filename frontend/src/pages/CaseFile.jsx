import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import SectionLabel from "../components/common/SectionLabel"
import CaseStamp from "../components/common/CaseStamp"
import PrimaryButton from "../components/common/PrimaryButton"
import { useAuth } from "../context/AuthContext"

function CaseFile() {
  const navigate = useNavigate()
  const { registration, session } = useAuth()

  return (
    <main className="cyber-grid min-h-screen bg-[#030305] px-6 py-12 text-[#f5f5f7] sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 border-b border-[#292930] pb-8 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Case File // Classified</SectionLabel>
            <h1 className="mt-4 font-cyber text-[clamp(2.7rem,6vw,6rem)] font-black uppercase tracking-[-0.03em]">The Case</h1>
          </div>
          <CaseStamp>STATUS: ACTIVE</CaseStamp>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <motion.div whileHover={{ y: -3 }} className="cyber-corner border border-[#292930] bg-[#0d0d11] p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#70707a]">Lead Investigator</p>
            <p className="mt-3 font-cyber text-xl font-bold">{registration?.participant_name || "Unknown"}</p>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} className="cyber-corner border border-[#292930] bg-[#0d0d11] p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#70707a]">Registration Code</p>
            <p className="mt-3 font-mono text-xl font-bold tracking-[0.12em] text-[#e50914]">{registration?.registration_code || "—"}</p>
          </motion.div>
        </div>

        <section className="cyber-corner red-border-glow mt-4 border border-[#292930] bg-[#09090c] p-7 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionLabel>Investigation Status</SectionLabel>
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#e50914]"><span className="h-2 w-2 bg-[#e50914] cyber-pulse" /> {session?.status || "NOT_STARTED"}</span>
          </div>
          <h2 className="mt-5 font-cyber text-2xl font-bold uppercase tracking-[0.04em]">The investigation is waiting.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#a2a2ad]">Read the incident sequence, study the evidence, and begin the first round. Every decision becomes part of the case record.</p>
          <div className="mt-8"><PrimaryButton onClick={() => navigate("/video")}>Open Investigation ↗</PrimaryButton></div>
        </section>
      </div>
    </main>
  )
}

export default CaseFile
