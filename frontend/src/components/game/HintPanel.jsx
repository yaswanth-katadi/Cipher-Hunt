function HintPanel({
  text,
}) {
  if (!text) {
    return null
  }

  return (
    <aside className="border border-[#514941] bg-[#191714] p-5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f2028]">
        Investigator Note
      </p>

      <p className="mt-3 text-sm leading-6 text-[#aaa298]">
        {text}
      </p>
    </aside>
  )
}

export default HintPanel