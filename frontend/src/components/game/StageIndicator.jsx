function StageIndicator({
  stage,
}) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em]">

      <span
        className={
          stage === 1
            ? "text-[#8f2028]"
            : "text-[#625c55]"
        }
      >
        Stage 01
      </span>

      <span className="text-[#4b4640]">
        /
      </span>

      <span
        className={
          stage === 2
            ? "text-[#8f2028]"
            : "text-[#625c55]"
        }
      >
        Stage 02
      </span>

    </div>
  )
}

export default StageIndicator