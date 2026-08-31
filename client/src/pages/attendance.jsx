import { useState } from "react";
import {
  CalendarCheck,
  Clock3,
  LogIn,
  LogOut,
} from "lucide-react";

import AttendanceStats from "../components/AttendanceStats";
import AttendanceHistory from "../components/AttendanceHistory";

const Attendance = () => {
  // ==========================================
  // Attendance History
  // ==========================================

  const [history, setHistory] = useState([
    {
      id: "1",
      date: "01 Sep 2026",
      clockIn: "09:05 AM",
      clockOut: "06:02 PM",
      workingHours: 8.95,
      status: "Present",
    },
    {
      id: "2",
      date: "31 Aug 2026",
      clockIn: "09:12 AM",
      clockOut: "06:10 PM",
      workingHours: 8.97,
      status: "Late",
    },
    {
      id: "3",
      date: "29 Aug 2026",
      clockIn: "08:58 AM",
      clockOut: "06:00 PM",
      workingHours: 9.03,
      status: "Present",
    },
    {
      id: "4",
      date: "28 Aug 2026",
      clockIn: "09:01 AM",
      clockOut: "05:55 PM",
      workingHours: 8.9,
      status: "Present",
    },
    {
      id: "5",
      date: "27 Aug 2026",
      clockIn: "09:20 AM",
      clockOut: "06:15 PM",
      workingHours: 8.92,
      status: "Late",
    },
  ]);

  // ==========================================
  // UI States
  // ==========================================

  const [loading, setLoading] = useState(false);

  const [isClockedIn, setIsClockedIn] =
    useState(false);

  const [currentClockIn, setCurrentClockIn] =
    useState(null);

  // ==========================================
  // Clock In
  // ==========================================

  const handleClockIn = () => {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setIsClockedIn(true);
    setCurrentClockIn(now);

    console.log("Clocked in at:", time);
  };

  // ==========================================
  // Clock Out
  // ==========================================

  const handleClockOut = () => {
    if (!currentClockIn) {
      return;
    }

    const now = new Date();

    const clockOut = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const clockInTime =
      currentClockIn.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    const workingHours =
      (now - currentClockIn) /
      (1000 * 60 * 60);

    const newRecord = {
      id: Date.now().toString(),
      date: now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      clockIn: clockInTime,
      clockOut,
      workingHours: Number(
        workingHours.toFixed(2)
      ),
      status: "Present",
    };

    setHistory((currentHistory) => [
      newRecord,
      ...currentHistory,
    ]);

    setIsClockedIn(false);
    setCurrentClockIn(null);
  };

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

                {isClockedIn
                  ? "You are currently clocked in."
                  : "You have not clocked in yet."}

              </p>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">

            {!isClockedIn ? (

              <button
                onClick={handleClockIn}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
              >
                <LogIn size={18} />
                Clock In
              </button>

            ) : (

              <button
                onClick={handleClockOut}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
              >
                <LogOut size={18} />
                Clock Out
              </button>

            )}

          </div>

        </div>

        {/* Current Clock In */}
        {isClockedIn && currentClockIn && (

          <div className="mt-6 pt-5 border-t border-slate-100">

            <div className="flex items-center gap-3 text-sm text-slate-600">

              <Clock3
                size={18}
                className="text-indigo-600"
              />

              <span>
                Clocked in at{" "}
                <strong>
                  {currentClockIn.toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
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

          <p className="text-slate-500">
            Loading attendance...
          </p>

        </div>

      ) : (

        <>
          {/* Attendance Stats */}
          <AttendanceStats
            history={history}
          />

          {/* Attendance History */}
          <AttendanceHistory
            history={history}
          />
        </>

      )}

    </div>
  );
};

export default Attendance;