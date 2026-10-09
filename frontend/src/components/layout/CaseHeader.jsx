import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

function CaseHeader() {
  const navigate = useNavigate()
  const { registration, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate("/", { replace: true })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#24242a] bg-[#030305]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <button onClick={() => navigate("/case")} className="group flex items-center gap-3 text-left">
          <span className="grid h-8 w-8 place-items-center bg-[#e50914] font-cyber text-sm font-black text-black transition group-hover:bg-[#ff1a24]">X</span>
          <span>
            <span className="block font-cyber text-xs font-bold tracking-[0.18em]">CIPHER HUNT</span>
            <span className="block font-mono text-[8px] uppercase tracking-[0.25em] text-[#70707a]">The Investigation</span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          <button onClick={() => navigate("/case")} className="cyber-link font-mono text-[10px] uppercase tracking-[0.18em] text-[#85858f]">Case</button>
          <button onClick={() => navigate("/leaderboard")} className="cyber-link font-mono text-[10px] uppercase tracking-[0.18em] text-[#85858f]">Leaderboard</button>
          <button onClick={handleLogout} className="border border-[#e50914] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white transition hover:bg-[#e50914]">Exit Case</button>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <span className="hidden text-right sm:block">
            <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-[#70707a]">Investigator</span>
            <span className="block text-xs text-[#e0e0e8]">{registration?.participant_name || "Unknown"}</span>
          </span>
          <button onClick={handleLogout} className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#85858f] hover:text-[#e50914]">Exit</button>
        </div>
      </div>
    </header>
  )
}

export default CaseHeader
