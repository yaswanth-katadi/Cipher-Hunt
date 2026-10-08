import {
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  useNavigate,
} from "react-router-dom"

import api from "../lib/api"

import {
  getSessionId,
} from "../lib/storage"

import {
  getRoundState,
} from "../lib/helpers"

import GameHeader from "../components/game/GameHeader"
import CluePanel from "../components/game/CluePanel"
import PuzzleGrid from "../components/game/PuzzleGrid"
import OrderPanel from "../components/game/OrderPanel"
import FeedbackPanel from "../components/game/FeedbackPanel"
import AttemptCounter from "../components/game/AttemptCounter"
import LoadingScreen from "../components/common/LoadingScreen"

import useRoundTimer from "../hooks/useRoundTimer"


function Round1() {
  const navigate = useNavigate()

  // ---------------------------------------------------------
  // STATE
  // ---------------------------------------------------------

  const [
    session,
    setSession,
  ] = useState(null)

  const [
    puzzle,
    setPuzzle,
  ] = useState(null)

  const [
    stage,
    setStage,
  ] = useState(1)

  const [
    selectedNodes,
    setSelectedNodes,
  ] = useState([])

  const [
    order,
    setOrder,
  ] = useState([])

  const [
    feedback,
    setFeedback,
  ] = useState(null)

  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    submitting,
    setSubmitting,
  ] = useState(false)

  const [
    error,
    setError,
  ] = useState(null)


  // ---------------------------------------------------------
  // ROUND STATE
  // ---------------------------------------------------------

  const roundState = getRoundState(
    session,
    1
  )


  // ---------------------------------------------------------
  // SERVER-AUTHORITATIVE TIMER DISPLAY
  // ---------------------------------------------------------

  const elapsedMs = useRoundTimer({
    startedAt: session?.round_1_started_at,
    elapsedMs: session?.round_1_elapsed_ms || 0,
    active: roundState?.status === "ACTIVE",
  })


  // ---------------------------------------------------------
  // INITIALIZE ROUND 1
  // ---------------------------------------------------------

  useEffect(() => {
    initialize()
  }, [])


  async function initialize() {
    setLoading(true)
    setError(null)

    try {
      // -----------------------------------------------------
      // GET SESSION ID
      // -----------------------------------------------------

      const sessionId = getSessionId()

      if (!sessionId) {
        navigate("/", {
          replace: true,
        })
        return
      }


      // -----------------------------------------------------
      // START GAME / RESUME GAME
      // -----------------------------------------------------

      let currentSession

      try {
        const startResponse = await api.post(
          "/session/start/"
        )

        currentSession =
          startResponse.data?.session ||
          startResponse.data

      } catch (startError) {
        // ---------------------------------------------------
        // If the game is already started, retrieve the
        // authoritative current session state.
        // ---------------------------------------------------

        if (
          startError.response?.status !== 409
        ) {
          throw startError
        }

        const statusResponse = await api.get(
          `/session/${sessionId}/`
        )

        currentSession = statusResponse.data
      }


      // -----------------------------------------------------
      // STORE AUTHORITATIVE SESSION
      // -----------------------------------------------------

      setSession(currentSession)


      // -----------------------------------------------------
      // NEVER SHOW ROUND 1 IF PLAYER HAS MOVED TO ROUND 2
      // -----------------------------------------------------

      if (
        currentSession.status === "ROUND_2"
      ) {
        navigate("/round-2", {
          replace: true,
        })
        return
      }


      // -----------------------------------------------------
      // NEVER SHOW ROUND 1 IF PLAYER IS AT FINAL
      // -----------------------------------------------------

      if (
        currentSession.status === "FINAL"
      ) {
        navigate("/final", {
          replace: true,
        })
        return
      }


      // -----------------------------------------------------
      // GET ROUND 1 STATE
      // -----------------------------------------------------

      const round = getRoundState(
        currentSession,
        1
      )


      // -----------------------------------------------------
      // IF ROUND 1 ALREADY COMPLETED
      // -----------------------------------------------------

      if (
        round?.stage === "completed" ||
        round?.status === "SOLVED"
      ) {
        navigate("/round-2", {
          replace: true,
        })
        return
      }


      // -----------------------------------------------------
      // RESTORE STAGE
      // -----------------------------------------------------

      if (
        round?.stage === "stage_2"
      ) {
        setStage(2)
      } else {
        setStage(1)
      }


      // -----------------------------------------------------
      // LOAD PUBLIC PUZZLE
      // -----------------------------------------------------

      const puzzleResponse = await api.get(
        "/session/puzzle/"
      )

      setPuzzle(
        puzzleResponse.data
      )

    } catch (err) {
      console.error(
        "Round 1 initialization failed:",
        err.response?.data || err
      )

      setError(
        err.response?.data?.detail ||
        "Unable to load Round 1."
      )

    } finally {
      setLoading(false)
    }
  }


  // ---------------------------------------------------------
  // IMPORTANT:
  // API RESPONSE SHAPE IS:
  //
  // {
  //   public_data: {
  //     round_1: {...}
  //   }
  // }
  // ---------------------------------------------------------

  const roundData =
    puzzle?.public_data?.round_1


  // ---------------------------------------------------------
  // SAFE PUBLIC NODE DATA
  // ---------------------------------------------------------

  const nodes = useMemo(
    () =>
      roundData?.map?.nodes || [],
    [roundData]
  )


  // ---------------------------------------------------------
  // SAFE PUBLIC CLUES
  // ---------------------------------------------------------

  const clues =
    roundData?.clues || []


  // ---------------------------------------------------------
  // STAGE 1 NODE SELECTION
  // ---------------------------------------------------------

  function handleNodeClick(node) {
    if (stage !== 1) {
      return
    }

    if (submitting) {
      return
    }

    setFeedback(null)

    setSelectedNodes(
      (current) => {
        // -----------------------------------------------
        // Clicking an already selected node removes it.
        // -----------------------------------------------

        if (
          current.includes(node)
        ) {
          return current.filter(
            (item) => item !== node
          )
        }

        // -----------------------------------------------
        // Maximum four nodes.
        // -----------------------------------------------

        if (
          current.length >= 4
        ) {
          return current
        }

        return [
          ...current,
          node,
        ]
      }
    )
  }


  // ---------------------------------------------------------
  // STAGE 1 SUBMISSION
  // ---------------------------------------------------------

  async function submitStage1() {
    if (
      selectedNodes.length !== 4
    ) {
      return
    }

    if (submitting) {
      return
    }

    setSubmitting(true)
    setFeedback(null)

    try {
      const response = await api.post(
        "/session/round-1/stage-1/",
        {
          selected_nodes:
            selectedNodes,
        }
      )

      const data =
        response.data

      // -----------------------------------------------
      // Backend returns ONLY aggregate feedback.
      // -----------------------------------------------

      setFeedback(data)

      // -----------------------------------------------
      // Keep authoritative attempt count.
      // -----------------------------------------------

      setSession(
        (current) => ({
          ...current,

          round_1_attempts:
            data.attempts_count ??
            current?.round_1_attempts,
        })
      )

      // -----------------------------------------------
      // Stage 1 solved.
      // Move to Stage 2.
      // -----------------------------------------------

      if (data.solved) {
        setOrder(
          [...selectedNodes]
        )

        setStage(2)
      }

    } catch (err) {
      setFeedback({
        solved: false,

        message:
          err.response?.data?.detail ||
          "Submission failed.",
      })

    } finally {
      setSubmitting(false)
    }
  }


  // ---------------------------------------------------------
  // STAGE 2 ORDER CONTROLS
  // ---------------------------------------------------------

  function moveOrderLeft(index) {
    if (index <= 0) {
      return
    }

    setOrder(
      (current) => {
        const next = [
          ...current,
        ]

        ;[
          next[index - 1],
          next[index],
        ] = [
          next[index],
          next[index - 1],
        ]

        return next
      }
    )
  }


  function moveOrderRight(index) {
    if (
      index >= order.length - 1
    ) {
      return
    }

    setOrder(
      (current) => {
        const next = [
          ...current,
        ]

        ;[
          next[index],
          next[index + 1],
        ] = [
          next[index + 1],
          next[index],
        ]

        return next
      }
    )
  }


  // ---------------------------------------------------------
  // STAGE 2 SUBMISSION
  // ---------------------------------------------------------

  async function submitStage2() {
    if (
      order.length !== 4
    ) {
      return
    }

    if (submitting) {
      return
    }

    setSubmitting(true)
    setFeedback(null)

    try {
      const response = await api.post(
        "/session/round-1/stage-2/",
        {
          selected_order:
            order,
        }
      )

      const data =
        response.data

      setFeedback(data)

      // -----------------------------------------------
      // Correct order -> Round 2
      // -----------------------------------------------

      if (data.solved) {
        navigate("/round-2", {
          replace: true,
        })
      }

    } catch (err) {
      setFeedback({
        solved: false,

        message:
          err.response?.data?.detail ||
          "Order submission failed.",
      })

    } finally {
      setSubmitting(false)
    }
  }


  // ---------------------------------------------------------
  // LOADING SCREEN
  // ---------------------------------------------------------

  if (loading) {
    return (
      <LoadingScreen
        message="Loading Round 01 evidence..."
      />
    )
  }


  // ---------------------------------------------------------
  // ERROR SCREEN
  // ---------------------------------------------------------

  if (error) {
    return (
      <main className="min-h-screen bg-[#11100e] px-6 py-16 text-[#f3eee3]">
        <div className="mx-auto max-w-xl border border-[#8f2028] bg-[#171512] p-8">

          <p className="text-xs uppercase tracking-[0.2em] text-[#8f2028]">
            Investigation Error
          </p>

          <h1 className="mt-3 text-2xl font-black">
            Round 01 could not be loaded
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#aaa298]">
            {error}
          </p>

          <button
            type="button"
            onClick={initialize}
            className="mt-6 border border-[#8f2028] px-5 py-3 text-xs uppercase tracking-[0.2em] transition hover:bg-[#8f2028] hover:text-white"
          >
            Retry
          </button>

        </div>
      </main>
    )
  }


  // ---------------------------------------------------------
  // ROUND 1 PAGE
  // ---------------------------------------------------------

  return (
    <main className="min-h-screen bg-[#11100e] px-5 py-8 text-[#f3eee3] md:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ------------------------------------------------ */}
        {/* HEADER                                           */}
        {/* ------------------------------------------------ */}

        <GameHeader
          round={1}
          stage={stage}
          elapsedMs={elapsedMs}
        />


        {/* ------------------------------------------------ */}
        {/* MAIN CONTENT                                     */}
        {/* ------------------------------------------------ */}

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">

          {/* ============================================== */}
          {/* LEFT COLUMN                                    */}
          {/* ============================================== */}

          <div className="space-y-6">

            {/* -------------------------------------------- */}
            {/* EVIDENCE                                     */}
            {/* -------------------------------------------- */}

            <CluePanel
              clues={clues}
            />


            {/* -------------------------------------------- */}
            {/* ATTEMPTS                                     */}
            {/* -------------------------------------------- */}

            <div className="border border-[#3a3530] bg-[#171512] p-5">

              <AttemptCounter
                attempts={
                  roundState?.attempts ??
                  roundState?.attempts_count ??
                  0
                }
              />

            </div>

          </div>


          {/* ============================================== */}
          {/* RIGHT COLUMN                                   */}
          {/* ============================================== */}

          <div className="space-y-6">

            {/* ============================================ */}
            {/* STAGE 1                                      */}
            {/* ============================================ */}

            {stage === 1 ? (

              <section className="border border-[#3a3530] bg-[#171512] p-5 md:p-7">

                <div className="mb-6 flex items-end justify-between gap-4">

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#777168]">
                      Stage 01
                    </p>

                    <h2 className="mt-2 text-2xl font-black">
                      Find The Nodes
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-[#938d84]">
                      Examine the evidence and identify the four
                      nodes belonging to this investigation.
                    </p>

                  </div>

                  <p className="shrink-0 text-xs text-[#777168]">
                    {selectedNodes.length} / 4 selected
                  </p>

                </div>


                {/* ---------------------------------------- */}
                {/* NODE GRID                                */}
                {/* ---------------------------------------- */}

                <PuzzleGrid
                  nodes={nodes}
                  selectedNodes={selectedNodes}

                  /*
                   * New PuzzleGrid expects onNodeSelect.
                   * We also pass onNodeClick for compatibility
                   * with the older component version.
                   */
                  onNodeSelect={handleNodeClick}
                  onNodeClick={handleNodeClick}

                  disabled={submitting}
                />


                {/* ---------------------------------------- */}
                {/* RESET                                    */}
                {/* ---------------------------------------- */}

                <button
                  type="button"
                  onClick={() => {
                    if (submitting) {
                      return
                    }

                    setSelectedNodes([])
                    setFeedback(null)
                  }}
                  disabled={
                    submitting ||
                    selectedNodes.length === 0
                  }
                  className="mt-4 w-full border border-[#3d3933] bg-[#141310] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#b8b1a6] transition hover:border-[#756e63] hover:text-[#eee7dc] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Reset Selection
                </button>


                {/* ---------------------------------------- */}
                {/* SUBMIT                                   */}
                {/* ---------------------------------------- */}

                <button
                  type="button"
                  disabled={
                    submitting ||
                    selectedNodes.length !== 4
                  }
                  onClick={submitStage1}
                  className="mt-3 w-full border border-[#8f2028] bg-[#8f2028] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-[#a92a32] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting
                    ? "Verifying..."
                    : "Confirm Nodes"}
                </button>

              </section>

            ) : (

              /* ========================================== */
              /* STAGE 2                                    */
              /* ========================================== */

              <OrderPanel
                order={order}
                onMoveLeft={
                  moveOrderLeft
                }
                onMoveRight={
                  moveOrderRight
                }
                onSubmit={
                  submitStage2
                }
                disabled={
                  submitting
                }
              />

            )}


            {/* -------------------------------------------- */}
            {/* FEEDBACK                                     */}
            {/* -------------------------------------------- */}

            <FeedbackPanel
              feedback={feedback}
            />

          </div>

        </div>

      </div>

    </main>
  )
}


export default Round1