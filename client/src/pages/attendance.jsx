import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Clock3,
  LogIn,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";

import AttendanceStats from "../components/AttendanceStats";
import AttendanceHistory from "../components/AttendanceHistory";
import api from "../api/axios";

const Attendance = () => {
  // ==========================================
  // Attendance
  // ==========================================

  const [history, setHistory] = useState([]);

  // ==========================================
  // UI States
  // ==========================================

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  // ==========================================
  // Today's Attendance
  // ==========================================

  const [todayAttendance, setTodayAttendance] =
    useState(null);

  // ==========================================
  // Fetch Attendance
  // ==========================================

  const fetchAttendance = async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/attendance");

      const attendance =
        response.data.attendance || [];

      setHistory(attendance);

      // Find today's record
      const today = new Date();

      const todayRecord =
        attendance.find((record) => {
          const recordDate =
            new Date(record.date);

          return (
            recordDate.getFullYear() ===
              today.getFullYear() &&
            recordDate.getMonth() ===
              today.getMonth() &&
            recordDate.getDate() ===
              today.getDate()
          );
        });

      setTodayAttendance(
        todayRecord || null
      );
    } catch (error) {
      console.error(
        "FETCH ATTENDANCE ERROR:",
        error
      );

      const message =
        error.response?.data?.error ||
        "Failed to fetch attendance";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Fetch on Page Load
  // ==========================================

  useEffect(() => {
    fetchAttendance();
  }, []);

  // ==========================================
  // Clock In
  // ==========================================

  const handleClockIn = async () => {
    try {
      setActionLoading(true);

      await api.post(
        "/attendance/clock-in"
      );

      toast.success(
        "Clocked in successfully"
      );

      await fetchAttendance();
    } catch (error) {
      console.error(
        "CLOCK IN ERROR:",
        error
      );

      const message =
        error.response?.data?.error ||
        "Failed to clock in";

      toast.error(message);
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // Clock Out
  // ==========================================

  const handleClockOut = async () => {
    try {
      setActionLoading(true);

      await api.post(
        "/attendance/clock-out"
      );

      toast.success(
        "Clocked out successfully"
      );

      await fetchAttendance();
    } catch (error) {
      console.error(
        "CLOCK OUT ERROR:",
        error
      );

      const message =
        error.response?.data?.error ||
        "Failed to clock out";

      toast.error(message);
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // Format Time
  // ==========================================

  const formatTime = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // ==========================================
  // Format History
  // ==========================================

  const formattedHistory =
    history.map((record) => ({
      ...record,

      id: record._id,

      date: new Date(
        record.date
      ).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),

      clockIn: formatTime(
        record.clockIn
      ),

      clockOut: formatTime(
        record.clockOut
      ),

      workingHours:
        record.workingHours || 0,
    }));

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="space-y-6">

      {/* ========================================
          Page Header
      ======================================== */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Attendance
        </h1>

        <p className="mt-1 text-slate-500">
          Track your attendance and working hours
        </p>
      </div>

      {/* ========================================
          Clock In / Clock Out Card
      ======================================== */}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CalendarCheck size={28} />
            </div>

            <div>

              <h2 className="text-xl font-semibold text-slate-800">
                Today's Attendance
              </h2>

              <p className="text-sm text-slate-500 mt-1">

                {!todayAttendance
                  ? "You have not clocked in yet."
                  : todayAttendance.clockOut
                    ? "You have completed today's attendance."
                    : "You are currently clocked in."}

              </p>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row gap-3">

            {!todayAttendance ? (

              <button
                onClick={handleClockIn}
                disabled={actionLoading}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60 transition"
              >
                <LogIn size={18} />

                {actionLoading
                  ? "Clocking In..."
                  : "Clock In"}
              </button>

            ) : !todayAttendance.clockOut ? (

              <button
                onClick={handleClockOut}
                disabled={actionLoading}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 disabled:opacity-60 transition"
              >
                <LogOut size={18} />

                {actionLoading
                  ? "Clocking Out..."
                  : "Clock Out"}
              </button>

            ) : (

              <div className="px-5 py-3 rounded-lg bg-slate-100 text-slate-500 font-medium">
                Attendance Completed
              </div>

            )}

          </div>

        </div>

        {/* Current Clock In */}

        {todayAttendance &&
          !todayAttendance.clockOut &&
          todayAttendance.clockIn && (

            <div className="mt-6 pt-5 border-t border-slate-100">

              <div className="flex items-center gap-3 text-sm text-slate-600">

                <Clock3
                  size={18}
                  className="text-indigo-600"
                />

                <span>
                  Clocked in at{" "}
                  <strong>
                    {formatTime(
                      todayAttendance.clockIn
                    )}
                  </strong>
                </span>

              </div>

            </div>
          )}

      </div>

      {/* ========================================
          Loading
      ======================================== */}

      {loading ? (

        <div className="flex items-center justify-center py-20">

          <div className="flex flex-col items-center gap-3">

            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

            <p className="text-slate-500">
              Loading attendance...
            </p>

          </div>

        </div>

      ) : (

        <>

          {/* Attendance Stats */}

          <AttendanceStats
            history={formattedHistory}
          />

          {/* Attendance History */}

          <AttendanceHistory
            history={formattedHistory}
          />

        </>

      )}

    </div>
  );
};

export default Attendance;