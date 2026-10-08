function FeedbackPanel({
  feedback,
}) {
  if (!feedback) {
    return null
  }

  const solved =
    feedback.solved

  return (
    <div
      className={[
        "border p-5",
        solved
          ? "border-[#6f8b68] bg-[#151b14]"
          : "border-[#5a5148] bg-[#171512]",
      ].join(" ")}
    >

      <p className="text-xs uppercase tracking-[0.2em]">
        {solved
          ? "Evidence Confirmed"
          : "Submission Recorded"}
      </p>

      {feedback.message && (
        <p className="mt-3 text-sm text-[#aaa298]">
          {feedback.message}
        </p>
      )}

      {typeof feedback.correctly_placed ===
        "number" && (
        <div className="mt-4 flex gap-6">

          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#777168]">
              Correct
            </p>

            <p className="mt-1 text-xl font-bold">
              {
                feedback.correctly_placed
              }
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#777168]">
              Incorrect
            </p>

            <p className="mt-1 text-xl font-bold">
              {
                feedback.incorrectly_placed ??
                0
              }
            </p>
          </div>

        </div>
      )}

    </div>
  )
}

export default FeedbackPanel