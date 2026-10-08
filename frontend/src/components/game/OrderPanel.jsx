function OrderPanel({
  order = [],
  onMoveLeft,
  onMoveRight,
  onSubmit,
  disabled = false,
}) {
  return (
    <section className="border border-[#3a3530] bg-[#171512] p-5 md:p-7">

      <p className="text-[10px] uppercase tracking-[0.25em] text-[#777168]">
        Reconstruct The Order
      </p>

      <p className="mt-3 text-sm leading-6 text-[#aaa298]">
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
              className="border border-[#5a5148] bg-[#11100e] p-4 text-center"
            >
              <span className="block text-[10px] text-[#777168]">
                {index + 1}
              </span>

              <span className="mt-2 block text-2xl font-black text-[#8f2028]">
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
          className="border border-[#403a34] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#aaa298] disabled:opacity-40"
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
          className="border border-[#403a34] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#aaa298] disabled:opacity-40"
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
        className="mt-6 w-full border border-[#8f2028] bg-[#8f2028] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Submit Order
      </button>

    </section>
  )
}

export default OrderPanel