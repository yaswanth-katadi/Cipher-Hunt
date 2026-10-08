import {
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  useNavigate,
} from "react-router-dom"

import api from "../lib/api"
import LoadingScreen from "../components/common/LoadingScreen"


function FinalInvestigation() {
  const navigate = useNavigate()

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


  // =========================================================
  // LOAD FINAL RESULT
  // =========================================================

  useEffect(() => {
    loadFinalResult()
  }, [])


  async function loadFinalResult() {
    setLoading(true)
    setError("")

    try {
      const response = await api.get(
        "/session/final-result/"
      )

      setResult(response.data)

    } catch (err) {
      console.error(
        "Final result error:",
        err.response?.data || err
      )

      setError(
        err.response?.data?.detail ||
        "The recovered coordinate could not be loaded."
      )
    } finally {
      setLoading(false)
    }
  }


  // =========================================================
  // FORMAT COORDINATE OBJECT
  // =========================================================

  function formatCoordinate(
    coordinate,
    type
  ) {
    if (
      coordinate === null ||
      coordinate === undefined
    ) {
      return "—"
    }


    // Already a normal string/number.
    if (
      typeof coordinate === "string" ||
      typeof coordinate === "number"
    ) {
      return String(coordinate)
    }


    // Backend coordinate object:
    //
    // {
    //   decimal,
    //   degrees,
    //   minutes,
    //   hemisphere
    // }
    //
    if (
      typeof coordinate === "object"
    ) {
      const hemisphere =
        coordinate.hemisphere || ""

      const degrees =
        coordinate.degrees

      const minutes =
        coordinate.minutes

      const decimal =
        coordinate.decimal


      // Preferred display:
      //
      // 22°34.00' N
      //
      if (
        degrees !== undefined &&
        minutes !== undefined
      ) {
        const degreeText =
          String(degrees)

        const minuteNumber =
          Number(minutes)

        const minuteText =
          Number.isFinite(minuteNumber)
            ? minuteNumber.toFixed(2)
            : String(minutes)

        return [
          `${degreeText}°`,
          `${minuteText}'`,
          hemisphere,
        ]
          .filter(Boolean)
          .join(" ")
      }


      if (
        decimal !== undefined &&
        decimal !== null
      ) {
        return [
          String(decimal),
          hemisphere,
        ]
          .filter(Boolean)
          .join(" ")
      }
    }


    return "—"
  }


  // =========================================================
  // MEMOIZED COORDINATES
  // =========================================================

  const latitudeDisplay = useMemo(
    () =>
      formatCoordinate(
        result?.latitude,
        "latitude"
      ),
    [result?.latitude]
  )


  const longitudeDisplay = useMemo(
    () =>
      formatCoordinate(
        result?.longitude,
        "longitude"
      ),
    [result?.longitude]
  )


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <LoadingScreen
        message="Recovering final coordinates..."
      />
    )
  }


  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <main className="min-h-screen bg-[#0b0b0a] px-5 py-10 text-[#f4efe5] md:px-8">

        <div className="mx-auto max-w-2xl pt-12">

          <section className="border border-[#7f2525] bg-[#141311] p-7 md:p-10">

            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#a72b32]">
              Final Investigation Error
            </p>

            <h1 className="mt-4 text-3xl font-black md:text-5xl">
              Coordinates Unavailable
            </h1>

            <p className="mt-5 text-sm leading-7 text-[#aaa49a]">
              {error}
            </p>

            <button
              type="button"
              onClick={loadFinalResult}
              className="mt-7 border border-[#a72b32] bg-[#8f2028] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#aa2e36]"
            >
              Retry
            </button>

          </section>

        </div>

      </main>
    )
  }


  // =========================================================
  // MAIN
  // =========================================================

  return (
    <main className="min-h-screen bg-[#0b0b0a] px-5 py-10 text-[#f4efe5] md:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ================================================= */}
        {/* HEADER                                            */}
        {/* ================================================= */}

        <section className="pt-8 md:pt-14">

          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#a72b32]">
            Final Investigation
          </p>

          <h1 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-[0.92] tracking-tight md:text-7xl">
            The Trail Ends Here.
          </h1>

          <div className="mt-8 h-px w-28 bg-[#a72b32]" />

          <p className="mt-8 max-w-3xl text-base leading-7 text-[#aaa49a] md:text-lg">
            Both investigation rounds have been completed.
            The case server has authorized the recovered location.
          </p>

        </section>


        {/* ================================================= */}
        {/* COORDINATE                                        */}
        {/* ================================================= */}

        <section className="mt-12 border border-[#393631] bg-[#151411] p-6 md:p-10">

          <div className="text-center">

            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#817b72]">
              Recovered Coordinate
            </p>

            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5f5a53]">
              CASE AUTHORIZED
            </p>

          </div>


          <div className="mt-8 grid gap-5 md:grid-cols-2">

            {/* --------------------------------------------- */}
            {/* LATITUDE                                      */}
            {/* --------------------------------------------- */}

            <CoordinateCard
              label="Latitude"
              value={latitudeDisplay}
            />


            {/* --------------------------------------------- */}
            {/* LONGITUDE                                     */}
            {/* --------------------------------------------- */}

            <CoordinateCard
              label="Longitude"
              value={longitudeDisplay}
            />

          </div>


          {/* ================================================= */}
          {/* CASE INFORMATION                                 */}
          {/* ================================================= */}

          <div className="mt-8 grid gap-4 border-t border-[#35322d] pt-8 sm:grid-cols-2 lg:grid-cols-3">

            <MetaCard
              label="Case ID"
              value={
                result?.registration_code || "—"
              }
            />

            <MetaCard
              label="Investigator"
              value={
                result?.participant_name || "—"
              }
            />

            <MetaCard
              label="Total Time"
              value={
                formatDuration(
                  result?.total_time_ms
                )
              }
            />

            <MetaCard
              label="Round 01 Attempts"
              value={
                String(
                  result?.round_1_attempts ?? "—"
                )
              }
            />

            <MetaCard
              label="Round 02 Attempts"
              value={
                String(
                  result?.round_2_attempts ?? "—"
                )
              }
            />

            <MetaCard
              label="Total Attempts"
              value={
                String(
                  result?.total_attempts ?? "—"
                )
              }
            />

          </div>

        </section>


        {/* ================================================= */}
        {/* ACTIONS                                           */}
        {/* ================================================= */}

        <section className="mt-8 flex flex-col gap-4 sm:flex-row">

          <button
            type="button"
            onClick={() =>
              navigate("/result")
            }
            className="border border-[#a72b32] bg-[#8f2028] px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#aa2e36]"
          >
            Complete Investigation
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/leaderboard")
            }
            className="border border-[#403c36] px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#bbb4aa] transition hover:border-[#756e63] hover:text-[#eee7dc]"
          >
            View Leaderboard
          </button>

        </section>


        {/* ================================================= */}
        {/* FOOTER STATUS                                     */}
        {/* ================================================= */}

        <section className="mt-16 border-t border-[#35322d] pt-7">

          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#625e57]">

            <span>
              Latitude Recovered
            </span>

            <span>
              Longitude Recovered
            </span>

            <span>
              Case Authorized
            </span>

          </div>

        </section>

      </div>

    </main>
  )
}


// =============================================================
// COORDINATE CARD
// =============================================================

function CoordinateCard({
  label,
  value,
}) {
  return (
    <div className="border border-[#403c35] bg-[#11100e] p-7 text-center md:p-9">

      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#817b72]">
        {label}
      </p>

      <p className="mt-8 break-words text-3xl font-black tracking-tight text-[#eee7dc] sm:text-4xl md:text-5xl">
        {value}
      </p>

    </div>
  )
}


// =============================================================
// META CARD
// =============================================================

function MetaCard({
  label,
  value,
}) {
  return (
    <div className="border border-[#3c3832] bg-[#11100e] p-4">

      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#68635b]">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold text-[#d5cec2]">
        {value}
      </p>

    </div>
  )
}


// =============================================================
// DURATION
// =============================================================

function formatDuration(
  milliseconds
) {
  const value =
    Number(milliseconds)

  if (
    !Number.isFinite(value)
  ) {
    return "—"
  }

  const totalSeconds =
    Math.max(
      0,
      Math.floor(
        value / 1000
      )
    )

  const minutes =
    Math.floor(
      totalSeconds / 60
    )

  const seconds =
    totalSeconds % 60

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}


export default FinalInvestigation