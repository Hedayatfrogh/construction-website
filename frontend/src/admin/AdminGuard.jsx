// AdminGuard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Wraps the /admin route tree. If the visitor isn't signed in as admin,
// we redirect to /login (preserving the requested location). If they
// ARE signed in, we render children.
//
// We deliberately keep this guard SEPARATE from AdminProtect.jsx so the
// /admin and /dashboard entry points stay independent — and so this
// guard does not auto-render the public Navbar/Footer.
// ─────────────────────────────────────────────────────────────────────────────

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminGuard({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // While we're still checking the session, render nothing — avoids a
  // flash of the login redirect when the user IS authenticated.
  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-charcoal-50">
        <div className="text-charcoal-500 text-sm">Loading…</div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
