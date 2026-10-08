import {
  useCallback,
} from "react"

import {
  useGame,
} from "../context/GameContext"

export default function usePuzzle() {
  const {
    puzzle,
    loadPuzzle,
    loading,
  } = useGame()

  const load =
    useCallback(
      () => loadPuzzle(),
      [loadPuzzle]
    )

  return {
    puzzle,
    loading,
    load,
  }
}