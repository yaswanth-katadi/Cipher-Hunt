import { Outlet } from "react-router-dom"
import CaseHeader from "./CaseHeader"
import CaseFooter from "./CaseFooter"

function CaseLayout() {
  return (
    <div className="cyber-grid min-h-screen bg-[#030305] text-[#f5f5f7]">
      <CaseHeader />
      <main>{/* Existing routes remain unchanged. */}<Outlet /></main>
      <CaseFooter />
    </div>
  )
}

export default CaseLayout
