import { useEffect, useState } from "react";

import AdminDashboard from "../components/AdminDashboard";
import EmployeeDashboard from "../components/EmployeeDashboard";

import api from "../api/axios";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/dashboard");

      setData(response.data);
    } catch (error) {
      console.error(
        "DASHBOARD FETCH ERROR:",
        error
      );

      setError(
        error.response?.data?.error ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-3">
            {error}
          </p>

          <button
            onClick={fetchDashboard}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // No Data
  // ==========================================

  if (!data) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-slate-500">
          No dashboard data found.
        </p>
      </div>
    );
  }

  // ==========================================
  // Render Dashboard
  // ==========================================

  return (
    <>
      {data.role === "admin" ? (
        <AdminDashboard data={data} />
      ) : (
        <EmployeeDashboard data={data} />
      )}
    </>
  );
};

export default Dashboard;