import {
  useNavigate,
} from "react-router-dom"
import FerroFluidBackground from "../components/FerroFluidBackground"
import SectionLabel from "../components/common/SectionLabel"
import PrimaryButton from "../components/common/PrimaryButton"

function Briefing() {
  const navigate =
    useNavigate()

  return (
    <main className="min-h-screen bg-[#11100e] text-[#f3eee3]">
      {/* Animated FerroFluid Background */}
      <FerroFluidBackground />  
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">

        <SectionLabel>
          Investigation Briefing
        </SectionLabel>

        <h1 className="mt-5 text-5xl font-black uppercase tracking-[0.08em] md:text-7xl">
          Read The Evidence.
        </h1>

        <div className="mt-7 h-px w-24 bg-[#8f2028]" />

        <div className="mt-12 border border-[#3a3530] bg-[#171512] p-8 md:p-12">

          <p className="text-sm leading-8 text-[#aaa298]">
            The investigation consists of
            two rounds. Each round contains
            two stages.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <div className="border border-[#403a34] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8f2028]">
                Round 01
              </p>

              <h2 className="mt-3 text-xl font-bold">
                Latitude
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#8d867d]">
                Identify four relevant nodes,
                then reconstruct their correct
                order.
              </p>
            </div>

            <div className="border border-[#403a34] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8f2028]">
                Round 02
              </p>

              <h2 className="mt-3 text-xl font-bold">
                Longitude
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#8d867d]">
                Repeat the investigation to
                recover the second coordinate
                fragment.
              </p>
            </div>

          </div>

          <div className="mt-8 border-l border-[#8f2028] pl-5">

            <p className="text-sm leading-7 text-[#aaa298]">
              There is no maximum attempt limit.
              Every accepted submission is
              recorded. Time and attempts
              contribute to the final ranking.
            </p>

          </div>

          <div className="mt-10">
            <PrimaryButton
              onClick={() =>
                navigate("/round-1")
              }
            >
              Begin Round 01
            </PrimaryButton>
          </div>

        </div>

      </section>

    </main>
  )
}

export default Briefing