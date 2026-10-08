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
import OrderPanel from "../components/game/OrderPanel"
import FeedbackPanel from "../components/game/FeedbackPanel"
import AttemptCounter from "../components/game/AttemptCounter"
import LoadingScreen from "../components/common/LoadingScreen"

import useRoundTimer from "../hooks/useRoundTimer"


function Round2() {
  const navigate = useNavigate()

  const [session, setSession] = useState(null)
  const [puzzle, setPuzzle] = useState(null)

  const [stage, setStage] = useState(1)

  const [selectedNodes, setSelectedNodes] = useState([])
  const [order, setOrder] = useState([])

  const [feedback, setFeedback] = useState(null)

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)


  // =========================================================
  // CURRENT ROUND STATE
  // =========================================================

  const roundState = getRoundState(
    session,
    2
  )


  // =========================================================
  // ROUND 2 TIMER
  // =========================================================

  const elapsedMs = useRoundTimer({
    startedAt:
      session?.round_2_started_at,

    elapsedMs:
      session?.round_2_elapsed_ms || 0,

    active:
      roundState?.status === "ACTIVE",
  })


  // =========================================================
  // INITIALIZE ROUND 2
  // =========================================================

  useEffect(() => {
    initialize()
  }, [])


  async function initialize() {
    setLoading(true)
    setError(null)

    try {
      const sessionId = getSessionId()

      if (!sessionId) {
        navigate("/", {
          replace: true,
        })

        return
      }


      // -------------------------------------------------------
      // IMPORTANT:
      // Round 2 is already active.
      // DO NOT call /session/start/.
      // -------------------------------------------------------

      const statusResponse =
        await api.get(
          `/session/${sessionId}/`
        )

      const currentSession =
        statusResponse.data

      setSession(currentSession)


      // -------------------------------------------------------
      // STATE GUARDS
      // -------------------------------------------------------

      if (
        currentSession.status ===
        "NOT_STARTED"
      ) {
        navigate("/briefing", {
          replace: true,
        })

        return
      }


      if (
        currentSession.status ===
        "ROUND_1"
      ) {
        navigate("/round-1", {
          replace: true,
        })

        return
      }


      if (
        currentSession.status ===
        "FINAL"
      ) {
        navigate("/final", {
          replace: true,
        })

        return
      }


      // -------------------------------------------------------
      // ROUND 2 STATE
      // -------------------------------------------------------

      const currentRound =
        getRoundState(
          currentSession,
          2
        )


      if (
        currentRound?.status ===
        "SOLVED"
      ) {
        navigate("/final", {
          replace: true,
        })

        return
      }


      if (
        currentRound?.stage ===
        "completed"
      ) {
        navigate("/final", {
          replace: true,
        })

        return
      }


      if (
        currentRound?.stage ===
        "stage_2"
      ) {
        setStage(2)
      } else {
        setStage(1)
      }


      // -------------------------------------------------------
      // LOAD PUBLIC PUZZLE
      // -------------------------------------------------------

      const puzzleResponse =
        await api.get(
          "/session/puzzle/"
        )

      setPuzzle(
        puzzleResponse.data
      )

    } catch (err) {
      console.error(
        "Round 2 initialization failed:",
        err.response?.data || err
      )

      setError(
        err.response?.data?.detail ||
        "Unable to load Round 2."
      )

    } finally {
      setLoading(false)
    }
  }


  // =========================================================
  // PUBLIC ROUND 2 DATA
  // =========================================================

  const roundData =
    puzzle?.public_data?.round_2


  const clues =
    roundData?.clues || []


  const instructions =
    roundData?.instructions || []


  const letterToNode =
    roundData?.letter_to_node || {}


  // =========================================================
  // ALWAYS SHOW NODES 1–9
  // =========================================================

  const nodes = useMemo(
    () => {
      const apiNodes =
        roundData?.map?.nodes || []

      const apiNumbers =
        apiNodes
          .map(
            (item) =>
              Number(item?.node)
          )
          .filter(
            (value) =>
              Number.isInteger(value) &&
              value >= 1 &&
              value <= 9
          )

      const unique =
        [...new Set(apiNumbers)]

      if (unique.length === 9) {
        return unique.sort(
          (a, b) => a - b
        )
      }

      return [
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
      ]
    },
    [roundData]
  )


  // =========================================================
  // STAGE 1 NODE SELECTION
  // =========================================================

  function handleNodeClick(node) {
    if (
      stage !== 1 ||
      submitting
    ) {
      return
    }

    setFeedback(null)

    setSelectedNodes(
      (current) => {

        // Click selected node again
        // to remove it.
        if (
          current.includes(node)
        ) {
          return current.filter(
            (item) =>
              item !== node
          )
        }


        // Maximum four nodes.
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


  function resetStage1() {
    if (submitting) {
      return
    }

    setSelectedNodes([])
    setFeedback(null)
  }


  // =========================================================
  // STAGE 1 SUBMIT
  // =========================================================

  async function submitStage1() {
    if (
      selectedNodes.length !== 4 ||
      submitting
    ) {
      return
    }

    setSubmitting(true)
    setFeedback(null)

    try {
      const response =
        await api.post(
          "/session/round-2/stage-1/",
          {
            selected_nodes:
              selectedNodes,
          }
        )

      const data =
        response.data

      setFeedback(data)


      setSession(
        (current) => ({
          ...current,

          round_2_attempts:
            data.attempts_count ??
            current?.round_2_attempts,
        })
      )


      if (
        data.solved
      ) {
        setOrder(
          [...selectedNodes]
        )

        setSelectedNodes([])

        setStage(2)
      }

    } catch (err) {
      setFeedback({
        solved: false,

        message:
          err.response?.data?.detail ||
          "Node verification failed.",
      })

    } finally {
      setSubmitting(false)
    }
  }


  // =========================================================
  // STAGE 2 ORDER
  // =========================================================

  function moveOrderLeft(index) {
    if (
      index <= 0 ||
      submitting
    ) {
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
      index >=
        order.length - 1 ||
      submitting
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


  // =========================================================
  // STAGE 2 SUBMIT
  // =========================================================

  async function submitStage2() {
    if (
      order.length !== 4 ||
      submitting
    ) {
      return
    }

    setSubmitting(true)
    setFeedback(null)

    try {
      const response =
        await api.post(
          "/session/round-2/stage-2/",
          {
            selected_order:
              order,
          }
        )

      const data =
        response.data

      setFeedback(data)


      if (
        data.solved
      ) {
        navigate("/final", {
          replace: true,
        })
      }

    } catch (err) {
      setFeedback({
        solved: false,

        message:
          err.response?.data?.detail ||
          "Order verification failed.",
      })

    } finally {
      setSubmitting(false)
    }
  }


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <LoadingScreen
        message="Loading Round 02 evidence..."
      />
    )
  }


  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <main className="min-h-screen bg-[#11100e] px-5 py-10 text-[#f3eee3]">

        <div className="mx-auto max-w-xl border border-[#8f2028] bg-[#171512] p-8">

          <p className="text-xs uppercase tracking-[0.2em] text-[#8f2028]">
            Investigation Error
          </p>

          <h1 className="mt-3 text-2xl font-black">
            Round 02 could not be loaded
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


  // =========================================================
  // MAIN
  // =========================================================

  return (
    <main className="min-h-screen bg-[#11100e] px-4 py-7 text-[#f3eee3] sm:px-5 md:px-8">

      <div className="mx-auto max-w-7xl">


        {/* ================================================= */}
        {/* HEADER                                            */}
        {/* ================================================= */}

        <GameHeader
          round={2}
          stage={stage}
          elapsedMs={elapsedMs}
        />


        {/* ================================================= */}
        {/* INTRO                                             */}
        {/* ================================================= */}

        <section className="mt-7 border-y border-[#39352f] py-5">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-[0.25em] text-[#8c857b]">
                Investigation Round 02
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Find The Longitude
              </h1>

            </div>

            <p className="max-w-md text-sm leading-6 text-[#928c83]">
              The clues no longer describe locations. They describe
              words. Count the symbols, extract the letters, then
              identify the four nodes.
            </p>

          </div>

        </section>


        {/* ================================================= */}
        {/* ROUND CONTENT                                     */}
        {/* ================================================= */}

        <div className="mt-7 space-y-6">


          {/* ================================================= */}
          {/* EXTRACTION CLUES                                  */}
          {/* ================================================= */}

          <section className="border border-[#3a3530] bg-[#171512] p-5 sm:p-7">

            <div className="flex flex-col gap-2 border-b border-[#39352f] pb-5 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[0.25em] text-[#817a70]">
                  Evidence Log
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Workshop Extraction
                </h2>

              </div>

              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#625e57]">
                FOUR CLUES
              </span>

            </div>


            <div className="mt-6 grid gap-4 md:grid-cols-2">

              {clues.length === 0 ? (

                <div className="border border-[#4a2d2d] bg-[#1b1513] p-5 md:col-span-2">

                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#a83232]">
                    No extraction clues received
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#aaa298]">
                    The server returned the Round 02 payload,
                    but no clue entries were found.
                  </p>

                </div>

              ) : (

                clues.map(
                  (clue, index) => {

                    const emojiText =
                      clue?.emoji_text ||
                      clue?.emoji ||
                      ""

                    const displayWord =
                      clue?.display_word ||
                      clue?.word ||
                      ""

                    const tag =
                      clue?.tag ||
                      "EVIDENCE"

                    return (
                      <article
                        key={
                          clue?.id ||
                          `clue-${index + 1}`
                        }
                        className="border border-[#403b34] bg-[#141310] p-5"
                      >

                        <div className="flex items-center justify-between gap-4">

                          <span className="border border-[#5b5045] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#c5baab]">
                            {tag}
                          </span>

                          <span className="font-mono text-[10px] text-[#625e57]">
                            E-{String(index + 1).padStart(2, "0")}
                          </span>

                        </div>


                        <div className="mt-5 border-l border-[#8f2028] pl-4">

                          <p className="font-mono text-2xl leading-8 tracking-[0.12em] text-[#eee7dc] break-words">
                            {emojiText || "—"}
                          </p>

                          <div className="mt-4 border-t border-[#332f2a] pt-4">

                            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#706a61]">
                              Displayed Word
                            </p>

                            <p className="mt-2 text-lg font-bold uppercase tracking-[0.08em] text-[#d9d0c4]">
                              {displayWord || "—"}
                            </p>

                          </div>

                        </div>

                      </article>
                    )
                  }
                )

              )}

            </div>

          </section>


          {/* ================================================= */}
          {/* HOW TO DECODE                                     */}
          {/* ================================================= */}

          <section className="border border-[#3a3530] bg-[#171512] p-5 sm:p-7">

            <div>

              <p className="text-[10px] uppercase tracking-[0.25em] text-[#817a70]">
                Investigation Notes
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Decode The Evidence
              </h2>

            </div>


            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              {instructions.length > 0 ? (

                instructions.map(
                  (instruction, index) => (

                    <div
                      key={index}
                      className="border-l border-[#8f2028] px-4 py-2"
                    >

                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#625e57]">
                        STEP {String(index + 1).padStart(2, "0")}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-[#cfc7bb]">
                        {typeof instruction === "string"
                          ? instruction
                          : instruction?.text ||
                            instruction?.description ||
                            JSON.stringify(
                              instruction
                            )}
                      </p>

                    </div>

                  )
                )

              ) : (

                <>
                  <DecodeStep
                    number="01"
                    text="Count the emojis in each evidence line."
                  />

                  <DecodeStep
                    number="02"
                    text="Use that count as the character position in the displayed word."
                  />

                  <DecodeStep
                    number="03"
                    text="Extract the resulting letter."
                  />

                  <DecodeStep
                    number="04"
                    text="Use the letter-to-node evidence to identify the four nodes."
                  />

                </>

              )}

            </div>

          </section>


          {/* ================================================= */}
          {/* LETTER → NODE EVIDENCE                            */}
          {/* ================================================= */}

          {Object.keys(letterToNode).length > 0 && (
            <section className="border border-[#3a3530] bg-[#171512] p-5 sm:p-7">

              <div className="flex items-end justify-between gap-4">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#817a70]">
                    Reference Evidence
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Letter → Node
                  </h2>

                </div>

                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#625e57]">
                  NODE KEY
                </span>

              </div>


              <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-9">

                {Object.entries(letterToNode).map(
                  ([letter, node]) => (

                    <div
                      key={letter}
                      className="border border-[#403b34] bg-[#141310] p-3 text-center"
                    >

                      <p className="font-mono text-lg font-bold text-[#eee7dc]">
                        {letter}
                      </p>

                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-[#8f2028]">
                        NODE {node}
                      </p>

                    </div>

                  )
                )}

              </div>

            </section>
          )}


          {/* ================================================= */}
          {/* ATTEMPTS                                          */}
          {/* ================================================= */}

          <section className="border border-[#3a3530] bg-[#171512] p-5">

            <AttemptCounter
              attempts={
                roundState?.attempts ??
                roundState?.attempts_count ??
                session?.round_2_attempts ??
                0
              }
            />

          </section>


          {/* ================================================= */}
          {/* STAGE 1                                           */}
          {/* ================================================= */}

          {stage === 1 ? (

            <section className="border border-[#3a3530] bg-[#171512] p-5 sm:p-7">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#817a70]">
                    Stage 01
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    Identify Four Nodes
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#928c83]">
                    Select exactly four nodes from the nine-point grid.
                    The server will verify the set.
                  </p>

                </div>

                <p className="font-mono text-xs text-[#80796f]">
                  {selectedNodes.length} / 4 SELECTED
                </p>

              </div>


              {/* ------------------------------------------- */}
              {/* NINE NODE GRID                              */}
              {/* ------------------------------------------- */}

              <div className="mt-7 grid grid-cols-3 gap-3 sm:max-w-lg">

                {nodes.map(
                  (node) => {

                    const selected =
                      selectedNodes.includes(node)

                    return (
                      <button
                        key={node}
                        type="button"
                        disabled={submitting}
                        onClick={() =>
                          handleNodeClick(node)
                        }
                        className={[
                          "relative aspect-square min-h-[90px] border transition-all duration-200",
                          "touch-manipulation select-none",
                          selected
                            ? "border-[#a52a32] bg-[#371719]"
                            : "border-[#403b34] bg-[#141310] hover:border-[#746b60] hover:bg-[#1c1a17]",
                          submitting
                            ? "cursor-not-allowed opacity-60"
                            : "cursor-pointer",
                        ].join(" ")}
                      >

                        <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[#625e57]">
                          NODE
                        </span>

                        <span
                          className={[
                            "absolute inset-0 flex items-center justify-center font-black text-4xl",
                            selected
                              ? "text-[#d94b50]"
                              : "text-[#a72b32]",
                          ].join(" ")}
                        >
                          {node}
                        </span>


                        {selected && (
                          <span className="absolute bottom-3 right-3 font-mono text-[10px] text-[#dec1b7]">
                            #{selectedNodes.indexOf(node) + 1}
                          </span>
                        )}

                      </button>
                    )
                  }
                )}

              </div>


              {/* ------------------------------------------- */}
              {/* RESET                                       */}
              {/* ------------------------------------------- */}

              <button
                type="button"
                disabled={
                  submitting ||
                  selectedNodes.length === 0
                }
                onClick={
                  resetStage1
                }
                className="mt-5 w-full border border-[#403b34] bg-[#141310] px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#aaa298] transition hover:border-[#756d63] hover:text-[#eee7dc] disabled:cursor-not-allowed disabled:opacity-30 sm:max-w-lg"
              >
                Reset Selection
              </button>


              {/* ------------------------------------------- */}
              {/* SUBMIT                                      */}
              {/* ------------------------------------------- */}

              <button
                type="button"
                disabled={
                  submitting ||
                  selectedNodes.length !== 4
                }
                onClick={
                  submitStage1
                }
                className="mt-3 w-full border border-[#8f2028] bg-[#8f2028] px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-[#aa2c35] disabled:cursor-not-allowed disabled:opacity-40 sm:max-w-lg"
              >
                {submitting
                  ? "Verifying..."
                  : "Confirm Nodes"}
              </button>

            </section>

          ) : (

            /* ============================================= */
            /* STAGE 2                                       */
            /* ============================================= */

            <section className="border border-[#3a3530] bg-[#171512] p-5 sm:p-7">

              <div className="mb-6">

                <p className="text-[10px] uppercase tracking-[0.25em] text-[#817a70]">
                  Stage 02
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Reconstruct The Trail
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[#928c83]">
                  Arrange the four recovered nodes in the exact
                  order indicated by the evidence.
                </p>

              </div>


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

            </section>

          )}


          {/* ================================================= */}
          {/* FEEDBACK                                          */}
          {/* ================================================= */}

          <FeedbackPanel
            feedback={feedback}
          />

        </div>

      </div>

    </main>
  )
}


// =============================================================
// DECODE STEP COMPONENT
// =============================================================

function DecodeStep({
  number,
  text,
}) {
  return (
    <div className="border-l border-[#8f2028] px-4 py-2">

      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#625e57]">
        STEP {number}
      </p>

      <p className="mt-2 text-sm leading-6 text-[#cfc7bb]">
        {text}
      </p>

    </div>
  )
}


export default Round2