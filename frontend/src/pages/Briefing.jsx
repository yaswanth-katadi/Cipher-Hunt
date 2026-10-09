import {
  useNavigate,
} from "react-router-dom"
import SectionLabel from "../components/common/SectionLabel"
import PrimaryButton from "../components/common/PrimaryButton"
import FerrofluidBackground from "../components/FerrofluidBackground";
function Briefing() {
  const navigate =
    useNavigate()

  return (
    <main className="min-h-screen bg-[#050507] text-[#f5f5f7]">
       <FerrofluidBackground/>
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">

        <SectionLabel>
          Investigation Briefing
        </SectionLabel>

        <h1 className="mt-5 text-5xl font-black uppercase tracking-[0.08em] md:text-7xl">
          Read The Evidence.
        </h1>

        <div className="mt-7 h-px w-24 bg-[#e50914]" />

        <div className="mt-12 border border-[#292930] bg-[#0d0d11] p-8 md:p-12">

          <p className="text-sm leading-8 text-[#a2a2ad]">
            The investigation consists of
            two rounds. Each round contains
            two stages.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <div className="border border-[#35353d] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#e50914]">
                Round 01
              </p>

              <h2 className="mt-3 text-xl font-bold">
                Latitude
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#85858f]">
                Identify four relevant nodes,
                then reconstruct their correct
                order.
              </p>
            </div>

            <div className="border border-[#35353d] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#e50914]">
                Round 02
              </p>

              <h2 className="mt-3 text-xl font-bold">
                Longitude
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#85858f]">
                Repeat the investigation to
                recover the second coordinate
                fragment.
              </p>
            </div>

          </div>

          <div className="mt-8 border-l border-[#e50914] pl-5">

            <p className="text-sm leading-7 text-[#a2a2ad]">
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