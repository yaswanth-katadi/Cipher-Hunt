import {
  useCallback,
  useEffect,
  useState,
} from "react"
import api from "../lib/api"
import FerrofluidBackground from "../components/FerrofluidBackground"
import SectionLabel from "../components/common/SectionLabel"
import LoadingScreen from "../components/common/LoadingScreen"
import CaseFooter from "../components/layout/CaseFooter"

function Leaderboard() {
  const [
    entries,
    setEntries,
  ] = useState([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  const loadLeaderboard = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadLeaderboard()
  }, [loadLeaderboard])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#050507]">
        <div className="flex-1">
          <LoadingScreen message="Loading leaderboard..." />
        </div>

        <CaseFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#050507] text-[#f5f5f7]">
      <FerrofluidBackground />

      <main className="relative z-10 w-full flex-1 px-5 py-12">

        <div className="mx-auto max-w-6xl">

          <SectionLabel>
            Investigation Rankings
          </SectionLabel>

          <h1 className="mt-5 text-4xl font-black uppercase md:text-6xl">
            Leaderboard
          </h1>

          <div className="mt-6 h-px w-24 bg-[#e50914]" />

          <div className="mt-10 overflow-x-auto border border-[#292930]">

            <table className="w-full min-w-[650px] border-collapse">

              <thead>
                <tr className="border-b border-[#292930] text-left">
                  <th className="p-4 text-[10px] uppercase tracking-[0.2em] text-[#85858f]">
                    Rank
                  </th>

                  <th className="p-4 text-[10px] uppercase tracking-[0.2em] text-[#85858f]">
                    Investigator
                  </th>

                  <th className="p-4 text-[10px] uppercase tracking-[0.2em] text-[#85858f]">
                    Time(ms)
                  </th>

                  <th className="p-4 text-[10px] uppercase tracking-[0.2em] text-[#85858f]">
                    Attempts
                  </th>

                  <th className="p-4 text-[10px] uppercase tracking-[0.2em] text-[#85858f]">
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
                      className="border-b border-[#24242a]"
                    >
                      <td className="p-4 text-xl font-black text-[#e50914]">
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
                <p className="text-xs uppercase tracking-[0.2em] text-[#85858f]">
                  No completed investigations
                  yet.
                </p>
              </div>
            )}

          </div>

        </div>

      </main>

      <div className="relative z-10 mt-auto w-full">
        <CaseFooter />
      </div>
    </div>
  )
}

export default Leaderboard