```jsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import api from "../lib/api"

const GameContext = createContext(null)

function normalizeStatus(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
}

function getProgress(data) {
  const state =
    data?.game_session ??
    data?.session ??
    data?.progress ??
    data?.data ??
    data ??
    {}

  const status = normalizeStatus(
    state.status ??
    state.game_status ??
    state.state
  )

  const roundValue =
    state.current_round ??
    state.round_number ??
    state.round

  let round = Number(roundValue)

  if (!Number.isFinite(round) || round < 1) {
    round = 1
  }

  if (
    [
      "round_2",
      "round2",
      "round_2_active",
      "longitude",
    ].includes(status)
  ) {
    round = 2
  }

  const stageValue =
    state.current_stage ??
    state.stage_number ??
    state.stage

  let stage = Number(stageValue)

  if (!Number.isFinite(stage) || stage < 1) {
    stage = 1
  }

  const completed =
    state.is_completed === true ||
    state.completed === true ||
    [
      "completed",
      "complete",
      "finished",
    ].includes(status)

  return {
    currentRound: Math.min(round, 2),
    currentStage: stage,
    completed,
    status,
    raw: state,
  }
}

export function GameProvider({ children }) {
  const [puzzle, setPuzzle] = useState(null)

  const [currentRound, setCurrentRound] = useState(1)
  const [currentStage, setCurrentStage] = useState(1)

  const [selectedNodes, setSelectedNodes] = useState([])
  const [selectedOrder, setSelectedOrder] = useState([])

  const [feedback, setFeedback] = useState(null)

  const [loading, setLoading] = useState(false)
  const [progressLoading, setProgressLoading] = useState(true)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [gameStatus, setGameStatus] = useState("")

  // Restore saved progress from the backend.
  const restoreProgress = useCallback(async () => {
    setProgressLoading(true)

    try {
      // Use the session endpoint already used by your backend.
      const response = await api.get("/session/status/")
      const progress = getProgress(response.data)

      setCurrentRound(progress.currentRound)
      setCurrentStage(progress.currentStage)
      setGameCompleted(progress.completed)
      setGameStatus(progress.status)

      return progress
    } catch (error) {
      console.error(
        "Unable to restore game progress:",
        error.response?.data ?? error.message
      )

      // Do not overwrite saved progress with default values.
      return null
    } finally {
      setProgressLoading(false)
    }
  }, [])

  // Fetch the puzzle after progress has been restored.
  const loadPuzzle = useCallback(async () => {
    setLoading(true)

    try {
      const response = await api.get("/session/puzzle/")

      setPuzzle(response.data)

      const progress = getProgress(response.data)

      // Apply progress only if the puzzle response contains it.
      if (
        response.data?.current_round != null ||
        response.data?.round_number != null ||
        response.data?.game_session ||
        response.data?.session
      ) {
        setCurrentRound(progress.currentRound)
        setCurrentStage(progress.currentStage)
        setGameCompleted(progress.completed)
        setGameStatus(progress.status)
      }

      return response.data
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    restoreProgress()
  }, [restoreProgress])

  function resetRoundInput() {
    setSelectedNodes([])
    setSelectedOrder([])
    setFeedback(null)
  }

  function clearFeedback() {
    setFeedback(null)
  }

  return (
    <GameContext.Provider
      value={{
        puzzle,
        setPuzzle,

        currentRound,
        setCurrentRound,

        currentStage,
        setCurrentStage,

        selectedNodes,
        setSelectedNodes,

        selectedOrder,
        setSelectedOrder,

        feedback,
        setFeedback,

        loading,
        progressLoading,

        gameCompleted,
        gameStatus,

        loadPuzzle,
        restoreProgress,
        resetRoundInput,
        clearFeedback,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error(
      "useGame must be used inside GameProvider"
    )
  }

  return context
}
```