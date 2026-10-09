function LoadingScreen({
  message = "Reopening Case File...",
}) {
  return (
    <main className="min-h-screen bg-[#050507] text-[#f5f5f7] flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-5 h-8 w-8 animate-spin border border-[#55555e] border-t-[#e50914]" />

        <p className="text-xs uppercase tracking-[0.3em] text-[#e50914]">
          {message}
        </p>
      </div>
    </main>
  )
}

export default LoadingScreen