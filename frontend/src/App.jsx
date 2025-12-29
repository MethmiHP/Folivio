import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PublicPortfolio from "./pages/PublicPortfolio.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";



function App() {
  const location = useLocation();
  const normalizedPath = location.pathname.toLowerCase();
  const hideNav = normalizedPath === "/login" || normalizedPath === "/register" || normalizedPath === "/forgot-password" || normalizedPath === "/auth/callback";
  const isDashboard = normalizedPath === "/dashboard";
  const isHome = normalizedPath === "/";

  const content = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/portfolio/:username" element={<PublicPortfolio />} />
      <Route
        path="*"
        element={
          <div className="text-center mt-20">
            <h1 className="text-2xl font-semibold mb-2">404 - Not Found</h1>
            <p className="text-slate-400">
              The page you're looking for doesn't exist.
            </p>
          </div>
        }
      />
    </Routes>
  );

  return (
    <div className={isHome ? "min-h-screen flex flex-col" : "h-screen flex flex-col"}>
      {!hideNav && <Navbar />}
      {isDashboard ? (
        <div className="flex-1 min-h-0 overflow-hidden">{content}</div>
      ) : isHome ? (
        <div className="flex-1 relative flex flex-col">{content}</div>
      ) : (
        <main className="flex-1 px-4 py-6 max-w-6xl w-full mx-auto overflow-y-auto">{content}</main>
      )}
    </div>
  );
}

export default App;
