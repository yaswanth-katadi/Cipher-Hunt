import EvidenceTag from "../common/EvidenceTag"

function CluePanel({
  clues = [],
}) {
  return (
    <section className="border border-[#3a3530] bg-[#171512] p-5 md:p-7">

      <p className="text-[10px] uppercase tracking-[0.25em] text-[#777168]">
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
              className="border-l border-[#8f2028] pl-4"
            >
              <EvidenceTag>
                {clue.tag ||
                  `Evidence ${
                    index + 1
                  }`}
              </EvidenceTag>

              <p className="mt-3 text-sm leading-6 text-[#c2bbb1]">
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