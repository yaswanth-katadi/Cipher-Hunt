import {
  Outlet,
} from "react-router-dom"

import CaseHeader from "./CaseHeader"
import CaseFooter from "./CaseFooter"

function CaseLayout() {
  return (
    <div className="min-h-screen bg-[#11100e] text-[#f3eee3]">
      <CaseHeader />

      <main>
        <Outlet />
      </main>

      <CaseFooter />
    </div>
  )
}

export default CaseLayout