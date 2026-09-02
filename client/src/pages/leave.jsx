import { useEffect, useState } from "react";
import {
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";

import LeaveStats from "../components/leave/LeaveStats";
import LeaveHistory from "../components/leave/LeaveHistory";
import ApplyLeaveModal from "../components/leave/ApplyLeaveModal";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Leave = () => {
  // ==========================================
  // Auth
  // ==========================================

  const { user } = useAuth();

  const isAdmin =
    user?.role === "admin";

  // ==========================================
  // Leave Data
  // ==========================================

  const [leaves, setLeaves] = useState([]);

  // ==========================================
  // Loading
  // ==========================================

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  // ==========================================
  // Apply Leave Modal
  // ==========================================

  const [showModal, setShowModal] =
    useState(false);

  // ==========================================
  // Fetch Leaves
  // ==========================================

  const fetchLeaves = async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/leave");

      setLeaves(
        response.data.leaves || []
      );
    } catch (error) {
      console.error(
        "FETCH LEAVES ERROR:",
        error
      );

      const message =
        error.response?.data?.error ||
        "Failed to fetch leave data";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Fetch on Page Load
  // ==========================================

  useEffect(() => {
    fetchLeaves();
  }, []);

  // ==========================================
  // Apply Leave
  // ==========================================

  const handleApplyLeave = async (
    formData
  ) => {
    try {
      setActionLoading(true);

      await api.post(
        "/leave",
        formData
      );

      toast.success(
        "Leave applied successfully"
      );

      setShowModal(false);

      await fetchLeaves();
    } catch (error) {
      console.error(
        "APPLY LEAVE ERROR:",
        error
      );

      const message =
        error.response?.data?.error ||
        "Failed to apply for leave";

      toast.error(message);
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // Admin Approve / Reject
  // ==========================================

  const handleStatusUpdate = async (
    leaveId,
    status
  ) => {
    try {
      setActionLoading(true);

      await api.put(
        `/leave/${leaveId}/status`,
        {
          status,
        }
      );

      toast.success(
        `Leave ${status.toLowerCase()} successfully`
      );

      await fetchLeaves();
    } catch (error) {
      console.error(
        "UPDATE LEAVE STATUS ERROR:",
        error
      );

      const message =
        error.response?.data?.error ||
        "Failed to update leave status";

      toast.error(message);
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // Format Leaves
  // ==========================================

  const formattedLeaves =
    leaves.map((leave) => ({
      ...leave,

      id: leave._id,

      employeeName:
        leave.employeeId
          ? `${leave.employeeId.firstName} ${leave.employeeId.lastName}`
          : "Unknown Employee",

      employeeEmail:
        leave.employeeId?.email ||
        "",

      startDate: new Date(
        leave.startDate
      ).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),

      endDate: new Date(
        leave.endDate
      ).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),
    }));

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="space-y-6">

      {/* ========================================
          Header
      ======================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Leave Management
          </h1>

          <p className="mt-1 text-slate-500">
            {isAdmin
              ? "Manage employee leave applications"
              : "Your leave history and requests"}
          </p>

        </div>

        {/* Employee Apply Button */}

        {!isAdmin && (
          <button
            onClick={() =>
              setShowModal(true)
            }
            disabled={actionLoading}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60 transition"
          >
            <Plus size={18} />

            Apply for Leave
          </button>
        )}

      </div>

      {/* ========================================
          Employee Stats
      ======================================== */}

      {!isAdmin && (
        <LeaveStats
          leaves={formattedLeaves}
        />
      )}

      {/* ========================================
          Loading
      ======================================== */}

      {loading ? (

        <div className="flex items-center justify-center py-20">

          <div className="flex flex-col items-center gap-3">

            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

            <p className="text-slate-500">
              Loading leave data...
            </p>

          </div>

        </div>

      ) : (

        <LeaveHistory
          leaves={formattedLeaves}
          isAdmin={isAdmin}
          onUpdate={handleStatusUpdate}
        />

      )}

      {/* ========================================
          Apply Leave Modal
      ======================================== */}

      {showModal && !isAdmin && (

        <ApplyLeaveModal
          onClose={() =>
            setShowModal(false)
          }
          onSubmit={handleApplyLeave}
        />

      )}

    </div>
  );
};

export default Leave;