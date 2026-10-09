import {
  formatTime,
} from "../../lib/helpers"

function RoundTimer({
  milliseconds = 0,
}) {
  return (
    <div className="text-right">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#85858f]">
        Investigation Time
      </p>

      <p className="font-mono text-xl text-[#e0e0e8]">
        {formatTime(
          milliseconds
        )}
      </p>
    </div>
  )
}

export default RoundTimer