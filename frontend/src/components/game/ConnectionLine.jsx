function ConnectionLine() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block">
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <line
          x1="25%"
          y1="25%"
          x2="75%"
          y2="75%"
          stroke="#e50914"
          strokeWidth="2"
          strokeOpacity="0.35"
        />
      </svg>
    </div>
  )
}

export default ConnectionLine