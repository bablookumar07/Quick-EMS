import {
  Download,
  FileText,
} from "lucide-react";

const PayslipList = ({
  payslips,
  isAdmin,
}) => {
  const handleDownload = (payslip) => {
    window.open(
      `/printpayslip/${payslip.id}`,
      "_blank"
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-200">

        <h2 className="text-lg font-semibold text-slate-800">
          Payslip History
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {isAdmin
            ? "View and manage employee payslips"
            : "View your salary history"}
        </p>

      </div>

      {/* Table */}
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
                Period
              </th>

              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Basic Salary
              </th>

              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Net Salary
              </th>

              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-center">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {payslips.length === 0 ? (

              <tr>

                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="px-6 py-16 text-center"
                >

                  <FileText
                    size={40}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-4 text-lg font-semibold text-slate-700">
                    No payslips found
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    There are no payslips available.
                  </p>

                </td>

              </tr>

            ) : (

              payslips.map((payslip) => (

                <tr
                  key={payslip.id}
                  className="border-b border-slate-100 last:border-none hover:bg-slate-50"
                >

                  {/* Employee */}
                  {isAdmin && (
                    <td className="px-6 py-4">

                      <div>

                        <p className="text-sm font-medium text-slate-700">
                          {payslip.employee.firstName}{" "}
                          {payslip.employee.lastName}
                        </p>

                        <p className="text-xs text-slate-400">
                          {payslip.employee.position}
                        </p>

                      </div>

                    </td>
                  )}

                  {/* Period */}
                  <td className="px-6 py-4">

                    <p className="text-sm font-medium text-slate-700">
                      {payslip.month}{" "}
                      {payslip.year}
                    </p>

                  </td>

                  {/* Basic Salary */}
                  <td className="px-6 py-4">

                    <p className="text-sm text-slate-600">
                      {formatCurrency(
                        payslip.basicSalary
                      )}
                    </p>

                  </td>

                  {/* Net Salary */}
                  <td className="px-6 py-4">

                    <p className="text-sm font-semibold text-slate-800">
                      {formatCurrency(
                        payslip.netSalary
                      )}
                    </p>

                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-center">

                    <button
                      onClick={() =>
                        handleDownload(payslip)
                      }
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium hover:bg-indigo-100 transition"
                    >

                      <Download size={16} />

                      Download

                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PayslipList;