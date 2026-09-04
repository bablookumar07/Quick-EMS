import {
  Building2,
  CalendarCheck,
  FileText,
  Users,
} from "lucide-react";

const AdminDashboard = ({ data }) => {
  const stats = [
    {
      label: "Total Employees",
      value: data?.totalEmployees ?? 0,
      description: "Active workforce",
      icon: Users,
    },
    {
      label: "Departments",
      value: data?.totalDepartments ?? 0,
      description: "Organization units",
      icon: Building2,
    },
    {
      label: "Today's Attendance",
      value: data?.todayAttendance ?? 0,
      description: "Checked in today",
      icon: CalendarCheck,
    },
    {
      label: "Pending Leaves",
      value: data?.pendingLeaves ?? 0,
      description: "Awaiting approval",
      icon: FileText,
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
          Welcome back, Admin
        </p>

        <p className="text-xs sm:text-sm text-slate-400">
          Here is your overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="min-w-0 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">
                  <p className="text-sm text-slate-500 truncate">
                    {stat.label}
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2">
                    {stat.value}
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    {stat.description}
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

      {/* Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">

        {/* Attendance Overview */}
        <div className="min-w-0 bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800">
            Attendance Overview
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Today's employee attendance.
          </p>

          <div className="mt-5 sm:mt-6 text-3xl sm:text-4xl font-bold text-indigo-600">
            {data?.todayAttendance ?? 0}
          </div>

          <p className="text-sm text-slate-400 mt-1">
            employees checked in today
          </p>
        </div>

        {/* Leave Requests */}
        <div className="min-w-0 bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800">
            Leave Requests
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Leave applications waiting for approval.
          </p>

          <div className="mt-5 sm:mt-6 text-3xl sm:text-4xl font-bold text-indigo-600">
            {data?.pendingLeaves ?? 0}
          </div>

          <p className="text-sm text-slate-400 mt-1">
            pending requests
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;