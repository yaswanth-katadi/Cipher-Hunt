import {
  useState,
} from "react"
<FerrofluidBackground />
import {
  motion,
  AnimatePresence,
} from "framer-motion"

import {
  useNavigate,
} from "react-router-dom"

const scenes = [
  {
    number: "01",
    label: "THE WORKSHOP",
    title:
      "The workshop went quiet at 02:17.",
    text:
      "The lights were still on. The machines had stopped. But something was missing.",
  },
  {
    number: "02",
    label: "THE INCIDENT",
    title:
      "A component disappeared without a trace.",
    text:
      "The owner found an empty space where a critical component had been secured only minutes earlier.",
  },
  {
    number: "03",
    label: "THE EVIDENCE",
    title:
      "Someone wanted the trail to be difficult to follow.",
    text:
      "The available evidence contains fragments of a hidden coordinate. The information has been deliberately divided.",
  },
  {
    number: "04",
    label: "THE ASSIGNMENT",
    title:
      "Now the investigation is yours.",
    text:
      "Follow the patterns. Recover the coordinate. Find where the trail ends.",
  },
]

function Story() {
  const navigate =
    useNavigate()

  const [
    index,
    setIndex,
  ] = useState(0)

  const scene =
    scenes[index]

  function next() {
    if (
      index ===
      scenes.length - 1
    ) {
      navigate("/briefing")
      return
    }

    setIndex(
      (value) => value + 1
    )
  }

  return (
    
    <main className="min-h-screen bg-[#11100e] text-[#f3eee3]">
      <FerrofluidBackground />
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-6 py-10">

        <div className="flex items-center justify-between">
          <p className="text-xs font-bold tracking-[0.25em]">
            CIPHERHUNT
          </p>

          <p className="text-[10px] uppercase tracking-[0.2em] text-[#777168]">
            Evidence Sequence{" "}
            {index + 1}/{scenes.length}
          </p>
        </div>

        <AnimatePresence mode="wait">

          <motion.section
            key={scene.number}
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -25,
            }}
            transition={{
              duration: 0.4,
            }}
            className="max-w-4xl"
          >

            <p className="text-sm uppercase tracking-[0.35em] text-[#8f2028]">
              {scene.number} /{" "}
              {scene.label}
            </p>

            <h1 className="mt-6 text-4xl font-black leading-tight md:text-7xl">
              {scene.title}
            </h1>

            <div className="mt-8 h-px w-24 bg-[#8f2028]" />

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#aaa298] md:text-lg">
              {scene.text}
            </p>

          </motion.section>

        </AnimatePresence>

        <div className="flex items-center justify-between border-t border-[#302c28] pt-6">

          <div className="flex gap-2">
            {scenes.map(
              (_, sceneIndex) => (
                <span
                  key={sceneIndex}
                  className={[
                    "h-1 w-8",
                    sceneIndex ===
                    index
                      ? "bg-[#8f2028]"
                      : "bg-[#403a34]",
                  ].join(" ")}
                />
              )
            )}
          </div>

          <button
            onClick={next}
            className="border border-[#8f2028] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]"
          >
            {index ===
            scenes.length - 1
              ? "Read Briefing"
              : "Continue"}
          </button>

        </div>

      </div>

    </main>
  )
}

export default Story