import { Navigate, Route, Routes } from "react-router-dom"

import Login from "./pages/Login"
import Briefing from "./pages/Briefing"
import CaseFile from "./pages/CaseFile"
import Round1 from "./pages/Round1"
import Round2 from "./pages/Round2"
import FinalInvestigation from "./pages/FinalInvestigation"
import FinalResult from "./pages/FinalResult"
import Leaderboard from "./pages/Leaderboard"
import Story from "./pages/Story"
import NotFound from "./pages/NotFound"
import Video from "./pages/Video"
import { useAuth } from "./context/AuthContext"
import LoadingScreen from "./components/common/LoadingScreen"


// ============================================================
// PROTECTED ROUTE
// ============================================================

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (!session) {
    return <Navigate to="/" replace />
  }

  return children
}


// ============================================================
// PUBLIC ROUTE
// ============================================================

function PublicRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (session) {
    return <Navigate to="/case" replace />
  }

  return children
}


// ============================================================
// APP
// ============================================================

function App() {
  return (
    <Routes>

      {/* ================================================== */}
      {/* PUBLIC ENTRY                                      */}
      {/* ================================================== */}

      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />


      {/* ================================================== */}
      {/* STORY                                             */}
      {/* ================================================== */}

      <Route
        path="/story"
        element={
          <ProtectedRoute>
            <Story />
          </ProtectedRoute>
        }
      />


      {/* ================================================== */}
      {/* CASE FILE                                         */}
      {/* ================================================== */}

      <Route
        path="/case"
        element={
          <ProtectedRoute>
            <CaseFile />
          </ProtectedRoute>
        }
      />

 <Route
  path="/video"
  element={
    <ProtectedRoute>
      <Video />
    </ProtectedRoute>
  }
/>
      {/* ================================================== */}
      {/* BRIEFING                                          */}
      {/* ================================================== */}

      <Route
        path="/briefing"
        element={
          <ProtectedRoute>
            <Briefing />
          </ProtectedRoute>
        }
      />


      {/* ================================================== */}
      {/* ROUND 1 — LATITUDE                                */}
      {/* ================================================== */}

      <Route
        path="/round-1"
        element={
          <ProtectedRoute>
            <Round1 />
          </ProtectedRoute>
        }
      />


      {/* ================================================== */}
      {/* ROUND 2 — LONGITUDE                               */}
      {/* ================================================== */}

      <Route
        path="/round-2"
        element={
          <ProtectedRoute>
            <Round2 />
          </ProtectedRoute>
        }
      />


      {/* ================================================== */}
      {/* FINAL INVESTIGATION                               */}
      {/* ================================================== */}

      <Route
        path="/final"
        element={
          <ProtectedRoute>
            <FinalInvestigation />
          </ProtectedRoute>
        }
      />


      {/* ================================================== */}
      {/* OLD FINAL URL — KEEP FOR COMPATIBILITY             */}
      {/* ================================================== */}

      <Route
        path="/final-investigation"
        element={
          <Navigate
            to="/final"
            replace
          />
        }
      />

{/* OLD RESULT URLS — REDIRECT TO LEADERBOARD */}
<Route
  path="/result"
  element={<Navigate to="/leaderboard" replace />}
/>

<Route
  path="/final-result"
  element={<Navigate to="/leaderboard" replace />}
/>

      {/* ================================================== */}
      {/* LEADERBOARD                                       */}
      {/* ================================================== */}

      <Route
        path="/leaderboard"
        element={
          <Leaderboard />
        }
      />


      {/* ================================================== */}
      {/* UNKNOWN ROUTE                                     */}
      {/* ================================================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  )
}


export default App