import {
  useCallback,
  useEffect,
  useState,
} from "react"
import {
  useNavigate,
} from "react-router-dom"

import api from "../lib/api"

import SectionLabel from "../components/common/SectionLabel"
import PrimaryButton from "../components/common/PrimaryButton"
import LoadingScreen from "../components/common/LoadingScreen"

function FinalResult() {
  const navigate =
    useNavigate()


  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    latitude,
    setLatitude,
  ] = useState("")

  const [
    longitude,
    setLongitude,
  ] = useState("")

  const [
    error,
    setError,
  ] = useState(null)

  const loadSession = useCallback(async () => {
    try {
      const sessionId =
        localStorage.getItem(
          "cipherhunt_session_id"
        )

      await api.get(
        `/session/${sessionId}/`
      )
    } catch (err) {
      console.error(
        err.response?.data ||
          err
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadSession()
  }, [loadSession])

  async function submitResult() {
    setError(null)

    if (
      latitude === "" ||
      longitude === ""
    ) {
      setError(
        "Enter the recovered latitude and longitude."
      )
      return
    }

    try {
      await api.post(
        "/session/final-result/",
        {
          latitude:
            Number(latitude),
          longitude:
            Number(longitude),
        }
      )

      navigate(
        "/leaderboard"
      )
    } catch (err) {
      setError(
        err.response?.data
          ?.detail ||
          "Unable to submit final result."
      )
    }
  }

  if (loading) {
    return (
      <LoadingScreen message="Preparing final report..." />
    )
  }

  return (
    <main className="min-h-screen bg-[#050507] px-6 py-12 text-[#f5f5f7]">

      <div className="mx-auto max-w-3xl">

        <SectionLabel>
          Final Report
        </SectionLabel>

        <h1 className="mt-5 text-4xl font-black uppercase md:text-6xl">
          Close The Case
        </h1>

        <div className="mt-6 h-px w-24 bg-[#e50914]" />

        <p className="mt-7 text-sm leading-7 text-[#a2a2ad]">
          Submit the coordinate recovered
          during the investigation.
        </p>

        <div className="mt-10 border border-[#292930] bg-[#0d0d11] p-7">

          <div className="grid gap-5 md:grid-cols-2">

            <label>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#85858f]">
                Latitude
              </span>

              <input
                type="number"
                step="any"
                value={latitude}
                onChange={(event) =>
                  setLatitude(
                    event.target.value
                  )
                }
                className="mt-3 w-full border border-[#35353d] bg-[#050507] px-4 py-3 text-[#f5f5f7] outline-none focus:border-[#e50914]"
              />
            </label>

            <label>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#85858f]">
                Longitude
              </span>

              <input
                type="number"
                step="any"
                value={longitude}
                onChange={(event) =>
                  setLongitude(
                    event.target.value
                  )
                }
                className="mt-3 w-full border border-[#35353d] bg-[#050507] px-4 py-3 text-[#f5f5f7] outline-none focus:border-[#e50914]"
              />
            </label>

          </div>

          {error && (
            <p className="mt-5 border border-[#e50914] p-4 text-sm text-[#ff9aa0]">
              {error}
            </p>
          )}

          <div className="mt-7">
            <PrimaryButton
              onClick={
                submitResult
              }
            >
              Submit Final Report
            </PrimaryButton>
          </div>

        </div>

      </div>

    </main>
  )
}

export default FinalResult