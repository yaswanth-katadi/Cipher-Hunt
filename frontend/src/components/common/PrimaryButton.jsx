function PrimaryButton({
  children,
  onClick,
  disabled = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="border border-[#8f2028] bg-[#8f2028] px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[#f3eee3] transition hover:bg-[#a32932] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  )
}

export default PrimaryButton