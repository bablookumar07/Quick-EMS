import {
  CalendarDays,
  FileText,
  IndianRupee,
} from "lucide-react";

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
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          Welcome back, {employee?.firstName || "Employee"}
        </p>

        <p className="text-sm text-slate-400">
          Here is your overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold text-slate-800 mt-2">
                    {card.value}
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    {card.subtitle}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Icon size={22} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">

        <h2 className="text-lg font-semibold text-slate-800">
          Quick Actions
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Manage your attendance and leave requests.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-5">

          <a
            href="/attendance"
            className="flex-1 text-center px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Mark Attendance
          </a>

          <a
            href="/leave"
            className="flex-1 text-center px-5 py-3 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
          >
            Apply for Leave
          </a>

        </div>

      </div>

    </div>
  );
};

export default EmployeeDashboard;