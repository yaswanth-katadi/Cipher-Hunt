function CoordinateDisplay({
  latitude,
  longitude,
}) {
  return (
    <div className="border border-[#292930] bg-[#0d0d11] p-7 text-center">

      <p className="text-[10px] uppercase tracking-[0.3em] text-[#85858f]">
        Recovered Coordinate
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4">

        <div className="border border-[#35353d] p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#85858f]">
            Latitude
          </p>

          <p className="mt-2 text-2xl font-black text-[#e50914]">
            {latitude ?? "—"}
          </p>
        </div>

        <div className="border border-[#35353d] p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#85858f]">
            Longitude
          </p>

          <p className="mt-2 text-2xl font-black text-[#e50914]">
            {longitude ?? "—"}
          </p>
        </div>

      </div>

    </div>
  )
}

export default CoordinateDisplay
