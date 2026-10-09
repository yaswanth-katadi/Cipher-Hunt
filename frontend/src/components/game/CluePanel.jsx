import EvidenceTag from "../common/EvidenceTag"

function CluePanel({
  clues = [],
}) {
  return (
    <section className="border border-[#292930] bg-[#0d0d11] p-5 md:p-7">

      <p className="text-[10px] uppercase tracking-[0.25em] text-[#85858f]">
        Evidence Log
      </p>

      <div className="mt-5 space-y-4">

        {clues.map(
          (clue, index) => (
            <article
              key={
                clue.id ||
                index
              }
              className="border-l border-[#e50914] pl-4"
            >
              <EvidenceTag>
                {clue.tag ||
                  `Evidence ${
                    index + 1
                  }`}
              </EvidenceTag>

              <p className="mt-3 text-sm leading-6 text-[#b8b8c1]">
                {clue.text}
              </p>
            </article>
          )
        )}

      </div>
    </section>
  )
}

export default CluePanel