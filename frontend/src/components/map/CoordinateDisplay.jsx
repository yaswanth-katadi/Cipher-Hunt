function CoordinateDisplay({
  latitude,
  longitude,
}) {
  return (
    <div className="border border-[#3a3530] bg-[#171512] p-7 text-center">

      <p className="text-[10px] uppercase tracking-[0.3em] text-[#777168]">
        Recovered Coordinate
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4">

        <div className="border border-[#403a34] p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#777168]">
            Latitude
          </p>

          <p className="mt-2 text-2xl font-black text-[#8f2028]">
            {latitude ?? "—"}
          </p>
        </div>

        <div className="border border-[#403a34] p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#777168]">
            Longitude
          </p>

          <p className="mt-2 text-2xl font-black text-[#8f2028]">
            {longitude ?? "—"}
          </p>
        </div>

      </div>

    </div>
  )
}

export default CoordinateDisplay
