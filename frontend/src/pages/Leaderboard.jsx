import {
  useEffect,
  useState,
} from "react"

import api from "../lib/api"

import SectionLabel from "../components/common/SectionLabel"
import LoadingScreen from "../components/common/LoadingScreen"

function Leaderboard() {
  const [
    entries,
    setEntries,
  ] = useState([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  async function loadLeaderboard() {
    try {
      const response =
        await api.get(
          "/leaderboard/"
        )

      const data =
        response.data

      setEntries(
        Array.isArray(data)
          ? data
          : data.results || []
      )
    } catch (error) {
      console.error(
        "Leaderboard failed:",
        error.response?.data ||
          error
      )
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <LoadingScreen message="Loading leaderboard..." />
    )
  }

  return (
    <main className="min-h-screen bg-[#11100e] px-5 py-12 text-[#f3eee3]">

      <div className="mx-auto max-w-6xl">

        <SectionLabel>
          Investigation Rankings
        </SectionLabel>

        <h1 className="mt-5 text-4xl font-black uppercase md:text-6xl">
          Leaderboard
        </h1>

        <div className="mt-6 h-px w-24 bg-[#8f2028]" />

        <div className="mt-10 overflow-x-auto border border-[#3a3530]">

          <table className="w-full min-w-[650px] border-collapse">

            <thead>
              <tr className="border-b border-[#3a3530] text-left">
                <th className="p-4 text-[10px] uppercase tracking-[0.2em] text-[#777168]">
                  Rank
                </th>

                <th className="p-4 text-[10px] uppercase tracking-[0.2em] text-[#777168]">
                  Investigator
                </th>

                <th className="p-4 text-[10px] uppercase tracking-[0.2em] text-[#777168]">
                  Time
                </th>

                <th className="p-4 text-[10px] uppercase tracking-[0.2em] text-[#777168]">
                  Attempts
                </th>

                <th className="p-4 text-[10px] uppercase tracking-[0.2em] text-[#777168]">
                  Hints
                </th>
              </tr>
            </thead>

            <tbody>

              {entries.map(
                (entry, index) => (
                  <tr
                    key={
                      entry.id ||
                      index
                    }
                    className="border-b border-[#2d2925]"
                  >
                    <td className="p-4 text-xl font-black text-[#8f2028]">
                      {entry.rank ||
                        index + 1}
                    </td>

                    <td className="p-4 text-sm">
                      {
                        entry.participant_name ||
                        entry.registration_code ||
                        "Investigator"
                      }
                    </td>

                    <td className="p-4 font-mono text-sm">
                      {
                        entry.total_time_ms ??
                        entry.elapsed_ms ??
                        "—"
                      }
                    </td>

                    <td className="p-4 text-sm">
                      {
                        entry.total_attempts ??
                        entry.attempts ??
                        "—"
                      }
                    </td>

                    <td className="p-4 text-sm">
                      {
                        entry.hints_used ??
                        "0"
                      }
                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

          {entries.length ===
            0 && (
            <div className="p-10 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-[#777168]">
                No completed investigations
                yet.
              </p>
            </div>
          )}

        </div>

      </div>

    </main>
  )
}

export default Leaderboard