import { useState } from "react";
import {
  Plus,
  FileText,
} from "lucide-react";

import LeaveStats from "../components/leave/LeaveStats";
import LeaveHistory from "../components/leave/LeaveHistory";
import ApplyLeaveModal from "../components/leave/ApplyLeaveModal";

const Leave = () => {

  // ==========================================
  // Demo Role
  // ==========================================
  // false = Employee
  // true  = Admin

  const [isAdmin, setIsAdmin] = useState(false);

  // ==========================================
  // Leave Data
  // ==========================================

  const [leaves, setLeaves] = useState([
    {
      id: "1",
      employeeName: "Rahul Sharma",
      employeeEmail: "rahul.sharma@example.com",
      type: "sick",
      startDate: "05 Sep 2026",
      endDate: "06 Sep 2026",
      reason: "Not feeling well",
      status: "Approved",
    },
    {
      id: "2",
      employeeName: "Rahul Sharma",
      employeeEmail: "rahul.sharma@example.com",
      type: "casual",
      startDate: "12 Aug 2026",
      endDate: "12 Aug 2026",
      reason: "Personal work",
      status: "Pending",
    },
    {
      id: "3",
      employeeName: "Rahul Sharma",
      employeeEmail: "rahul.sharma@example.com",
      type: "annual",
      startDate: "20 Jul 2026",
      endDate: "22 Jul 2026",
      reason: "Family vacation",
      status: "Approved",
    },
    {
      id: "4",
      employeeName: "Rahul Sharma",
      employeeEmail: "rahul.sharma@example.com",
      type: "casual",
      startDate: "10 Jun 2026",
      endDate: "10 Jun 2026",
      reason: "Personal appointment",
      status: "Rejected",
    },
  ]);

  // ==========================================
  // Loading
  // ==========================================

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // Apply Leave Modal
  // ==========================================

  const [showModal, setShowModal] =
    useState(false);

  // ==========================================
  // Apply Leave
  // ==========================================

  const handleApplyLeave = (formData) => {

    const newLeave = {
      id: Date.now().toString(),

      employeeName: "Rahul Sharma",

      employeeEmail:
        "rahul.sharma@example.com",

      type: formData.type,

      startDate: formData.startDate,

      endDate: formData.endDate,

      reason: formData.reason,

      status: "Pending",
    };

    setLeaves((currentLeaves) => [
      newLeave,
      ...currentLeaves,
    ]);

    setShowModal(false);
  };

  // ==========================================
  // Admin Approve / Reject
  // ==========================================

  const handleStatusUpdate = (
    leaveId,
    status
  ) => {

    setLeaves((currentLeaves) =>
      currentLeaves.map((leave) =>
        leave.id === leaveId
          ? {
              ...leave,
              status,
            }
          : leave
      )
    );
  };

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
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
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
          leaves={leaves}
        />
      )}

      {/* ========================================
          Loading
      ======================================== */}

      {loading ? (

        <div className="flex items-center justify-center py-20">

          <p className="text-slate-500">
            Loading leave data...
          </p>

        </div>

      ) : (

        <LeaveHistory
          leaves={leaves}
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