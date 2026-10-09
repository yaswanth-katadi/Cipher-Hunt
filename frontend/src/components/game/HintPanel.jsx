function HintPanel({
  text,
}) {
  if (!text) {
    return null
  }

  return (
    <aside className="border border-[#3d3d45] bg-[#09090c] p-5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#e50914]">
        Investigator Note
      </p>

      <p className="mt-3 text-sm leading-6 text-[#a2a2ad]">
        {text}
      </p>
    </aside>
  )
}

export default HintPanel