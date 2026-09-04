import {
  CalendarDays,
  FileText,
  IndianRupee,
} from "lucide-react";

import { Link } from "react-router-dom";

const EmployeeDashboard = ({ data }) => {
  const employee = data?.employee;

  const cards = [
    {
      icon: CalendarDays,
      value: data?.currentMonthAttendance ?? 0,
      title: "Days Present",
      subtitle: "This month",
    },
    {
      icon: FileText,
      value: data?.pendingLeaves ?? 0,
      title: "Pending Leaves",
      subtitle: "Awaiting approval",
    },
    {
      icon: IndianRupee,
      value: data?.latestPayslip
        ? `₹${data.latestPayslip.netSalary}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: data?.latestPayslip
        ? `${data.latestPayslip.month} ${data.latestPayslip.year}`
        : "No payslip available",
    },
  ];

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6">

      {/* Header */}
      <div className="min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-1 text-sm sm:text-base text-slate-500">
          Welcome back, {employee?.firstName || "Employee"}
        </p>

        <p className="text-xs sm:text-sm text-slate-400">
          Here is your overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="min-w-0 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">
                  <p className="text-sm text-slate-500 truncate">
                    {card.title}
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2 break-words">
                    {card.value}
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    {card.subtitle}
                  </p>
                </div>

                <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Icon size={21} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Quick Actions */}
      <div className="min-w-0 bg-white border border-slate-200 rounded-xl p-5 sm:p-6">

        <h2 className="text-base sm:text-lg font-semibold text-slate-800">
          Quick Actions
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Manage your attendance and leave requests.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-5">

          <Link
            to="/attendance"
            className="flex-1 text-center px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Mark Attendance
          </Link>

          <Link
            to="/leave"
            className="flex-1 text-center px-5 py-3 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
          >
            Apply for Leave
          </Link>

        </div>

      </div>

    </div>
  );
};

export default EmployeeDashboard;