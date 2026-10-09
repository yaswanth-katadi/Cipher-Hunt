function OrderPanel({
  order = [],
  onMoveLeft,
  onMoveRight,
  onSubmit,
  disabled = false,
}) {
  return (
    <section className="border border-[#292930] bg-[#0d0d11] p-5 md:p-7">

      <p className="text-[10px] uppercase tracking-[0.25em] text-[#85858f]">
        Reconstruct The Order
      </p>

      <p className="mt-3 text-sm leading-6 text-[#a2a2ad]">
        Arrange the four recovered nodes
        according to the ordering rule
        contained in the evidence.
      </p>

      <div className="mt-6 grid grid-cols-4 gap-2">

        {order.map(
          (node, index) => (
            <button
              key={`${node}-${index}`}
              type="button"
              disabled={disabled}
              onClick={() =>
                onMoveLeft(index)
              }
              className="border border-[#55555e] bg-[#050507] p-4 text-center"
            >
              <span className="block text-[10px] text-[#85858f]">
                {index + 1}
              </span>

              <span className="mt-2 block text-2xl font-black text-[#e50914]">
                {node}
              </span>
            </button>
          )
        )}

      </div>

      <div className="mt-5 flex flex-wrap gap-2">

        <button
          type="button"
          disabled={
            disabled ||
            order.length < 2
          }
          onClick={() =>
            onMoveLeft(
              order.length - 1
            )
          }
          className="border border-[#35353d] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#a2a2ad] disabled:opacity-40"
        >
          Move Last Left
        </button>

        <button
          type="button"
          disabled={
            disabled ||
            order.length < 2
          }
          onClick={() =>
            onMoveRight(0)
          }
          className="border border-[#35353d] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#a2a2ad] disabled:opacity-40"
        >
          Move First Right
        </button>

      </div>

      <button
        type="button"
        disabled={
          disabled ||
          order.length !== 4
        }
        onClick={onSubmit}
        className="mt-6 w-full border border-[#e50914] bg-[#e50914] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Submit Order
      </button>

    </section>
  )
}

export default OrderPanel