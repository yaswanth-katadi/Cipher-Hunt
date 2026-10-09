function CaseStamp({
  children = "CLASSIFIED",
}) {
  return (
    <span className="inline-block border border-[#e50914] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e50914]">
      {children}
    </span>
  )
}

export default CaseStamp