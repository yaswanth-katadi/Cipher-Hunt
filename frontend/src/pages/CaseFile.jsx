import {
  useNavigate,
} from "react-router-dom"

import SectionLabel from "../components/common/SectionLabel"
import CaseStamp from "../components/common/CaseStamp"
import PrimaryButton from "../components/common/PrimaryButton"

import {
  useAuth,
} from "../context/AuthContext"

function CaseFile() {
  const navigate =
    useNavigate()

  const {
    registration,
    session,
  } = useAuth()

  return (
    <main className="min-h-screen bg-[#11100e] px-6 py-12 text-[#f3eee3]">

      <div className="mx-auto max-w-5xl">

        <div className="flex flex-col justify-between gap-5 border-b border-[#3a3530] pb-8 sm:flex-row sm:items-end">

          <div>
            <SectionLabel>
              Investigator Case File
            </SectionLabel>

            <h1 className="mt-4 text-4xl font-black uppercase tracking-[0.08em] md:text-6xl">
              Case File
            </h1>
          </div>

          <CaseStamp>
            Classified
          </CaseStamp>

        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">

          <div className="border border-[#3a3530] bg-[#171512] p-7">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#777168]">
              Investigator
            </p>

            <p className="mt-3 text-2xl font-bold">
              {
                registration?.participant_name ||
                "Unknown"
              }
            </p>
          </div>

          <div className="border border-[#3a3530] bg-[#171512] p-7">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#777168]">
              Registration Code
            </p>

            <p className="mt-3 font-mono text-2xl font-bold text-[#8f2028]">
              {
                registration?.registration_code ||
                "—"
              }
            </p>
          </div>

        </div>

        <section className="mt-5 border border-[#3a3530] bg-[#171512] p-7 md:p-10">

          <SectionLabel>
            Investigation Status
          </SectionLabel>

          <h2 className="mt-4 text-2xl font-bold">
            {
              session?.status ||
              "NOT_STARTED"
            }
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#aaa298]">
            The case file is active. Read the
            incident briefing before beginning
            the first investigation round.
          </p>

          <div className="mt-8">
            <PrimaryButton
              onClick={() =>
                navigate("/story")
              }
            >
              Open Investigation
            </PrimaryButton>
          </div>

        </section>

      </div>

    </main>
  )
}

export default CaseFile