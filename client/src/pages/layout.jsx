
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { user, loading } = useAuth();

  // ========================================
  // Loading
  // ========================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Loading...
        </p>
      </div>
    );
  }

  // ========================================
  // Authentication
  // ========================================
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-slate-50 overflow-x-hidden">

      {/* ========================================
          Sidebar
      ======================================== */}
      <Sidebar />

      {/* ========================================
          Main Content
      ======================================== */}
      <main className="flex-1 min-w-0 overflow-y-auto">

        <div className="w-full min-w-0 p-4 sm:p-6 md:p-8">

          <Outlet />

        </div>

      </main>

    </div>
  );
};

export default Layout;