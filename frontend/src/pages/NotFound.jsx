import {
  useNavigate,
} from "react-router-dom"
function NotFound() {
  const navigate =
    useNavigate()

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050507] px-6 text-[#f5f5f7]">

      <div className="max-w-md text-center">

        <p className="text-6xl font-black text-[#e50914]">
          404
        </p>

        <h1 className="mt-5 text-2xl font-bold uppercase tracking-[0.1em]">
          Evidence Not Found
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#85858f]">
          The requested investigation page
          does not exist.
        </p>

        <button
          onClick={() =>
            navigate("/")
          }
          className="mt-7 border border-[#e50914] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          Return To Entry
        </button>

      </div>

    </main>
  )
}

export default NotFound