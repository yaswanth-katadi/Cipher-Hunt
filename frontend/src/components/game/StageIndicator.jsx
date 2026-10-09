function StageIndicator({
  stage,
}) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em]">

      <span
        className={
          stage === 1
            ? "text-[#e50914]"
            : "text-[#5f5f68]"
        }
      >
        Stage 01
      </span>

      <span className="text-[#3d3d45]">
        /
      </span>

      <span
        className={
          stage === 2
            ? "text-[#e50914]"
            : "text-[#5f5f68]"
        }
      >
        Stage 02
      </span>

    </div>
  )
}

export default StageIndicator