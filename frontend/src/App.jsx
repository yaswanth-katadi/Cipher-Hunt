```jsx
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
// RESUME ROUTE
// Redirect authenticated players based on saved game progress.
// ============================================================

function getResumePath(gameState) {
  if (!gameState) {
    return "/case"
  }

  const status = String(
    gameState.status ??
    gameState.game_status ??
    gameState.state ??
    ""
  ).toLowerCase()

  // Completed game: show leaderboard.
  if (
    ["completed", "complete", "finished", "final", "solved"].includes(status) ||
    gameState.is_completed === true ||
    gameState.completed === true
  ) {
    return "/leaderboard"
  }

  // Determine the current round from the saved backend state.
  const round = Number(
    gameState.current_round ??
    gameState.round_number ??
    gameState.round ??
    0
  )

  if (
    round >= 2 ||
    ["round_2", "round2", "longitude", "round_2_active"].includes(status)
  ) {
    return "/round-2"
  }

  if (
    ["round_1", "round1", "latitude", "round_1_active"].includes(status)
  ) {
    return "/round-1"
  }

  if (["briefing", "briefed"].includes(status)) {
    return "/briefing"
  }

  if (["video"].includes(status)) {
    return "/video"
  }

  if (["story"].includes(status)) {
    return "/story"
  }

  return "/case"
}


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
    // AuthContext may expose saved game progress under one
    // of these properties. Use the property your context provides.
    const gameState =
      session.game_session ??
      session.gameState ??
      session.game_state ??
      session.progress ??
      null

    return <Navigate to={getResumePath(gameState)} replace />
  }

  return children
}


// ============================================================
// APP
// ============================================================

function App() {
  return (
    <Routes>
      {/* Public entry */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Story */}
      <Route
        path="/story"
        element={
          <ProtectedRoute>
            <Story />
          </ProtectedRoute>
        }
      />

      {/* Case file */}
      <Route
        path="/case"
        element={
          <ProtectedRoute>
            <CaseFile />
          </ProtectedRoute>
        }
      />

      {/* Video */}
      <Route
        path="/video"
        element={
          <ProtectedRoute>
            <Video />
          </ProtectedRoute>
        }
      />

      {/* Briefing */}
      <Route
        path="/briefing"
        element={
          <ProtectedRoute>
            <Briefing />
          </ProtectedRoute>
        }
      />

      {/* Round 1 */}
      <Route
        path="/round-1"
        element={
          <ProtectedRoute>
            <Round1 />
          </ProtectedRoute>
        }
      />

      {/* Round 2 */}
      <Route
        path="/round-2"
        element={
          <ProtectedRoute>
            <Round2 />
          </ProtectedRoute>
        }
      />

      {/* Final investigation */}
      <Route
        path="/final"
        element={
          <ProtectedRoute>
            <FinalInvestigation />
          </ProtectedRoute>
        }
      />

      {/* Legacy URLs */}
      <Route
        path="/final-investigation"
        element={<Navigate to="/final" replace />}
      />

      <Route
        path="/result"
        element={<Navigate to="/leaderboard" replace />}
      />

      <Route
        path="/final-result"
        element={<Navigate to="/leaderboard" replace />}
      />

      {/* Leaderboard */}
      <Route
        path="/leaderboard"
        element={<Leaderboard />}
      />

      {/* Unknown route */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  )
}

export default App
```