import {
  useNavigate,
} from "react-router-dom"
import FerrofluidBackground from "../components/FerrofluidBackground"
function NotFound() {
  const navigate =
    useNavigate()

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#11100e] px-6 text-[#f3eee3]">
      <FerrofluidBackground />
      <div className="max-w-md text-center">

        <p className="text-6xl font-black text-[#8f2028]">
          404
        </p>

        <h1 className="mt-5 text-2xl font-bold uppercase tracking-[0.1em]">
          Evidence Not Found
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#777168]">
          The requested investigation page
          does not exist.
        </p>

        <button
          onClick={() =>
            navigate("/")
          }
          className="mt-7 border border-[#8f2028] px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          Return To Entry
        </button>

      </div>

    </main>
  )
}

export default NotFound