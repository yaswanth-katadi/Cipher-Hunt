import {
  formatTime,
} from "../../lib/helpers"

function RoundTimer({
  milliseconds = 0,
}) {
  return (
    <div className="text-right">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#777168]">
        Investigation Time
      </p>

      <p className="font-mono text-xl text-[#d7d0c5]">
        {formatTime(
          milliseconds
        )}
      </p>
    </div>
  )
}

export default RoundTimer