import {
  useNavigate,
} from "react-router-dom"

import {
  useAuth,
} from "../../context/AuthContext"

function CaseHeader() {
  const navigate =
    useNavigate()

  const {
    registration,
    logout,
  } = useAuth()

  function handleLogout() {
    logout()
    navigate("/", {
      replace: true,
    })
  }

  return (
    <header className="border-b border-[#302c28] bg-[#11100e]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        <button
          onClick={() =>
            navigate("/case")
          }
          className="text-sm font-black tracking-[0.18em]"
        >
          CIPHERHUNT
        </button>

        <div className="flex items-center gap-5">

          <div className="hidden text-right sm:block">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#777168]">
              Investigator
            </p>

            <p className="text-sm text-[#d7d0c5]">
              {
                registration?.participant_name ||
                "Unknown"
              }
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="text-[10px] uppercase tracking-[0.2em] text-[#777168] hover:text-[#8f2028]"
          >
            Exit
          </button>

        </div>
      </div>
    </header>
  )
}

export default CaseHeader