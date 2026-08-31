import {
  Thermometer,
  Briefcase,
  CalendarDays,
} from "lucide-react";

const LeaveStats = ({ leaves }) => {
  const approvedLeaves = leaves.filter(
    (leave) => leave.status === "Approved"
  );

  const sickCount = approvedLeaves.filter(
    (leave) => leave.type === "sick"
  ).length;

  const casualCount = approvedLeaves.filter(
    (leave) => leave.type === "casual"
  ).length;

  const annualCount = approvedLeaves.filter(
    (leave) => leave.type === "annual"
  ).length;

  const stats = [
    {
      label: "Sick Leave",
      value: sickCount,
      icon: Thermometer,
    },
    {
      label: "Casual Leave",
      value: casualCount,
      icon: Briefcase,
    },
    {
      label: "Annual Leave",
      value: annualCount,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Icon size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  {stat.label}
                </p>

                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {stat.value}
                  <span className="text-sm font-normal text-slate-400 ml-1">
                    taken
                  </span>
                </p>
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
};

export default LeaveStats;