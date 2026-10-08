function CaseStamp({
  children = "CLASSIFIED",
}) {
  return (
    <span className="inline-block border border-[#8f2028] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8f2028]">
      {children}
    </span>
  )
}

export default CaseStamp