import {
  CalendarDays,
  FileText,
} from "lucide-react";

const LeaveHistory = ({
  leaves,
  isAdmin,
  onUpdate,
}) => {

  const getStatusClass = (status) => {
    if (status === "Approved") {
      return "bg-green-50 text-green-600";
    }

    if (status === "Rejected") {
      return "bg-red-50 text-red-600";
    }

    return "bg-yellow-50 text-yellow-600";
  };

  const getLeaveType = (type) => {
    return (
      type.charAt(0).toUpperCase() +
      type.slice(1)
    );
  };

  const handleStatusUpdate = (
    leaveId,
    status
  ) => {
    onUpdate(leaveId, status);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-200">

        <h2 className="text-lg font-semibold text-slate-800">
          {isAdmin
            ? "Leave Applications"
            : "Leave History"}
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {isAdmin
            ? "Manage employee leave requests"
            : "Your recent leave requests"}
        </p>

      </div>

      {leaves.length === 0 ? (

        <div className="py-16 text-center">

          <FileText
            size={40}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 text-lg font-semibold text-slate-700">
            No leave applications found
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            There are no leave requests to display.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-100 text-left">

                {isAdmin && (
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                    Employee
                  </th>
                )}

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Type
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Date
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Reason
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Status
                </th>

                {isAdmin && (
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                    Actions
                  </th>
                )}

              </tr>
            </thead>

            <tbody>

              {leaves.map((leave) => (

                <tr
                  key={leave.id}
                  className="border-b border-slate-100 last:border-none hover:bg-slate-50"
                >

                  {/* Employee */}
                  {isAdmin && (
                    <td className="px-6 py-4">

                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {leave.employeeName}
                        </p>

                        <p className="text-xs text-slate-400">
                          {leave.employeeEmail}
                        </p>
                      </div>

                    </td>
                  )}

                  {/* Type */}
                  <td className="px-6 py-4">

                    <span className="text-sm font-medium text-slate-700">
                      {getLeaveType(leave.type)}
                    </span>

                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <CalendarDays
                        size={16}
                        className="text-slate-400"
                      />

                      <div>
                        <p>
                          {leave.startDate}
                        </p>

                        {leave.endDate !==
                          leave.startDate && (
                          <p className="text-xs text-slate-400">
                            to {leave.endDate}
                          </p>
                        )}
                      </div>

                    </div>

                  </td>

                  {/* Reason */}
                  <td className="px-6 py-4">

                    <p className="text-sm text-slate-600 max-w-xs">
                      {leave.reason}
                    </p>

                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(
                        leave.status
                      )}`}
                    >
                      {leave.status}
                    </span>

                  </td>

                  {/* Admin Actions */}
                  {isAdmin && (
                    <td className="px-6 py-4">

                      {leave.status === "Pending" ? (

                        <div className="flex items-center gap-2">

                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                leave.id,
                                "Approved"
                              )
                            }
                            className="px-3 py-1.5 rounded-lg bg-green-50 text-green-600 text-xs font-medium hover:bg-green-100"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                leave.id,
                                "Rejected"
                              )
                            }
                            className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100"
                          >
                            Reject
                          </button>

                        </div>

                      ) : (

                        <span className="text-xs text-slate-400">
                          No action
                        </span>

                      )}

                    </td>
                  )}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default LeaveHistory;