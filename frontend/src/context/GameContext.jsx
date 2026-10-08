import {
  createContext,
  useContext,
  useState,
} from "react"

import api from "../lib/api"

const GameContext =
  createContext(null)

export function GameProvider({
  children,
}) {
  const [
    puzzle,
    setPuzzle,
  ] = useState(null)

  const [
    currentRound,
    setCurrentRound,
  ] = useState(1)

  const [
    currentStage,
    setCurrentStage,
  ] = useState(1)

  const [
    selectedNodes,
    setSelectedNodes,
  ] = useState([])

  const [
    selectedOrder,
    setSelectedOrder,
  ] = useState([])

  const [
    feedback,
    setFeedback,
  ] = useState(null)

  const [
    loading,
    setLoading,
  ] = useState(false)

  async function loadPuzzle() {
    setLoading(true)

    try {
      const response =
        await api.get(
          "/session/puzzle/"
        )

      setPuzzle(
        response.data
      )

      return response.data
    } finally {
      setLoading(false)
    }
  }

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

        loadPuzzle,
        resetRoundInput,
        clearFeedback,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context =
    useContext(GameContext)

  if (!context) {
    throw new Error(
      "useGame must be used inside GameProvider"
    )
  }

  return context
}