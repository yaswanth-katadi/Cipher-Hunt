function PuzzleNode({
  node,
  selected,
  orderNumber,
  onClick,
  disabled,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "relative aspect-square border p-3 text-left transition",
        selected
          ? "border-[#8f2028] bg-[#241416]"
          : "border-[#403a34] bg-[#171512] hover:border-[#776b5f]",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "",
      ].join(" ")}
    >

      {orderNumber && (
        <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center border border-[#8f2028] text-[10px] text-[#f3eee3]">
          {orderNumber}
        </span>
      )}

      <span className="text-2xl font-black text-[#8f2028]">
        {node.node}
      </span>

      <div className="mt-3 space-y-1 text-[10px] uppercase tracking-[0.08em] text-[#8d867d]">
        <p>
          Object: {node.object}
        </p>

        <p>
          Zone: {node.zone}
        </p>

        <p>
          CCTV: {node.cctv}
        </p>

        <p>
          Time: {node.time}
        </p>
      </div>

    </button>
  )
}

export default PuzzleNode