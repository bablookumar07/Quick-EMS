import {
  CalendarCheck,
  Clock3,
  TrendingUp,
} from "lucide-react";

const AttendanceStats = ({ history }) => {
  const records = history || [];

  const daysPresent = records.filter(
    (item) => item.status === "Present"
  ).length;

  const lateArrivals = records.filter(
    (item) => item.status === "Late"
  ).length;

  const totalWorkingHours = records.reduce(
    (total, item) => total + (item.workingHours || 0),
    0
  );

  const averageWorkingHours =
    records.length > 0
      ? (totalWorkingHours / records.length).toFixed(1)
      : "0.0";

  const stats = [
    {
      title: "Days Present",
      value: daysPresent,
      icon: CalendarCheck,
      description: "Total days present",
    },
    {
      title: "Late Arrivals",
      value: lateArrivals,
      icon: Clock3,
      description: "Late check-ins",
    },
    {
      title: "Average Working Hours",
      value: `${averageWorkingHours}h`,
      icon: TrendingUp,
      description: "Per working day",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {stat.value}
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  {stat.description}
                </p>
              </div>

              <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Icon size={21} />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
};

export default AttendanceStats;