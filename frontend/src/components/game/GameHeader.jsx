import SectionLabel from "../common/SectionLabel"
import StageIndicator from "./StageIndicator"
import RoundTimer from "./RoundTimer"

function GameHeader({
  round,
  stage,
  elapsedMs,
}) {
  return (
    <div className="border-b border-[#3a3530] pb-6">

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

        <div>
          <SectionLabel>
            Investigation Round 0{round}
          </SectionLabel>

          <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.08em] md:text-5xl">
            {round === 1
              ? "Latitude"
              : "Longitude"}
          </h1>

          <div className="mt-5">
            <StageIndicator
              stage={stage}
            />
          </div>
        </div>

        <RoundTimer
          milliseconds={
            elapsedMs
          }
        />

      </div>
    </div>
  )
}

export default GameHeader