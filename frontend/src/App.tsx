import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import ProfileSettings from "./pages/ProfileSettings";
import { HomeIcon, UploadIcon } from "./components/icons";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";

export default function App() {
  const { isAuthenticated, logout } = useAuth();
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header isDark={isDark} onThemeToggle={() => setIsDark((value) => !value)} />

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <Link className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-slate-100" to="/">
                  <HomeIcon className="h-4 w-4 text-slate-600" />
                  Home
                </Link>
                <Link className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-slate-100" to="/upload">
                  <UploadIcon className="h-4 w-4 text-slate-600" />
                  Upload
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {!isAuthenticated ? (
                  <>
                    <Link className="rounded-full border border-slate-200 px-4 py-2 transition hover:bg-slate-100" to="/login">
                      Login
                    </Link>
                    <Link className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800" to="/register">
                      Register
                    </Link>
                  </>
                ) : (
                  <button onClick={logout} className="rounded-full border border-slate-200 px-4 py-2 transition hover:bg-slate-100">
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <Sidebar />
            <div className="flex-1">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <Upload />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfileSettings />
                    </ProtectedRoute>
                  }
                />
                <Route path="/watch/:id" element={<Watch />} />
                <Route index element={<Home />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
