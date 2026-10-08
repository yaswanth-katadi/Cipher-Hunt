import {
  useEffect,
  useState,
} from "react"

export default function useRoundTimer({
  startedAt,
  elapsedMs = 0,
  active = false,
}) {
  const [
    elapsed,
    setElapsed,
  ] = useState(elapsedMs || 0)

  useEffect(() => {
    if (!active) {
      setElapsed(
        elapsedMs || 0
      )

      return undefined
    }

    const start =
      startedAt
        ? new Date(
            startedAt
          ).getTime()
        : Date.now()

    function update() {
      setElapsed(
        Math.max(
          0,
          Date.now() - start
        )
      )
    }

    update()

    const interval =
      setInterval(
        update,
        250
      )

    return () =>
      clearInterval(interval)
  }, [
    startedAt,
    elapsedMs,
    active,
  ])

  return elapsed
}
