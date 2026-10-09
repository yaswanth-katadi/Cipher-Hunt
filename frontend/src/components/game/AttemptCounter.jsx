function AttemptCounter({
  attempts = 0,
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#85858f]">
        Accepted Attempts
      </p>

      <p className="mt-1 text-xl font-bold">
        {attempts}
      </p>
    </div>
  )
}

export default AttemptCounter