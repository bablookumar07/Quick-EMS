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
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          Welcome back, Admin
        </p>

        <p className="text-sm text-slate-400">
          Here is your overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    {stat.label}
                  </p>

                  <h2 className="text-3xl font-bold text-slate-800 mt-2">
                    {stat.value}
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    {stat.description}
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

      {/* Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Attendance Overview
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Today's employee attendance.
          </p>

          <div className="mt-6 text-4xl font-bold text-indigo-600">
            {data?.todayAttendance ?? 0}
          </div>

          <p className="text-sm text-slate-400 mt-1">
            employees checked in today
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Leave Requests
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Leave applications waiting for approval.
          </p>

          <div className="mt-6 text-4xl font-bold text-indigo-600">
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