import {
  CalendarDays,
  Clock3,
} from "lucide-react";

const AttendanceHistory = ({ history }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-200">

        <h2 className="text-lg font-semibold text-slate-800">
          Recent Activity
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Your recent attendance history
        </p>

      </div>

      {/* Table */}
      {history.length === 0 ? (

        <div className="py-12 text-center">

          <CalendarDays
            size={36}
            className="mx-auto text-slate-300"
          />

          <p className="mt-3 text-slate-500">
            No attendance records found.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-100 text-left">

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Date
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Clock In
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Clock Out
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Working Hours
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {history.map((record) => (

                <tr
                  key={record.id}
                  className="border-b border-slate-100 last:border-none hover:bg-slate-50"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <CalendarDays
                        size={16}
                        className="text-slate-400"
                      />

                      {record.date}
                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock3
                        size={16}
                        className="text-slate-400"
                      />

                      {record.clockIn || "--"}
                    </div>

                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {record.clockOut || "--"}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {record.workingHours
                      ? `${record.workingHours}h`
                      : "--"}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        record.status === "Present"
                          ? "bg-green-50 text-green-600"
                          : record.status === "Late"
                          ? "bg-yellow-50 text-yellow-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {record.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default AttendanceHistory;