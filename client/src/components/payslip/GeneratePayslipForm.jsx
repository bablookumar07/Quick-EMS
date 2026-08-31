import { useState } from "react";
import {
  Plus,
  X,
  User,
  CalendarDays,
  IndianRupee,
} from "lucide-react";

const GeneratePayslipForm = ({
  employees,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    month: "",
    year: "2026",
    basicSalary: "",
    allowances: "",
    deductions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const employee = employees.find(
      (item) => item.id === formData.employeeId
    );

    if (!employee) {
      return;
    }

    const basicSalary =
      Number(formData.basicSalary) || 0;

    const allowances =
      Number(formData.allowances) || 0;

    const deductions =
      Number(formData.deductions) || 0;

    const netSalary =
      basicSalary +
      allowances -
      deductions;

    const newPayslip = {
      id: Date.now().toString(),

      employee,

      month: formData.month,

      year: formData.year,

      basicSalary,

      allowances,

      deductions,

      netSalary,
    };

    onSuccess(newPayslip);

    setFormData({
      employeeId: "",
      month: "",
      year: "2026",
      basicSalary: "",
      allowances: "",
      deductions: "",
    });

    setIsOpen(false);
  };

  // Button when modal is closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
      >
        <Plus size={18} />

        Generate Payslip
      </button>
    );
  }

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
    >

      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl"
      >

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              Generate Payslip
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Create a new employee payslip
            </p>

          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* Employee */}
          <div>

            <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">

              <User
                size={16}
                className="text-indigo-600"
              />

              Employee

            </label>

            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            >

              <option value="">
                Select employee
              </option>

              {employees.map((employee) => (

                <option
                  key={employee.id}
                  value={employee.id}
                >
                  {employee.firstName}{" "}
                  {employee.lastName}
                </option>

              ))}

            </select>

          </div>

          {/* Month & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>

              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">

                <CalendarDays
                  size={16}
                  className="text-indigo-600"
                />

                Month

              </label>

              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
              >

                <option value="">
                  Select month
                </option>

                <option value="January">
                  January
                </option>

                <option value="February">
                  February
                </option>

                <option value="March">
                  March
                </option>

                <option value="April">
                  April
                </option>

                <option value="May">
                  May
                </option>

                <option value="June">
                  June
                </option>

                <option value="July">
                  July
                </option>

                <option value="August">
                  August
                </option>

                <option value="September">
                  September
                </option>

                <option value="October">
                  October
                </option>

                <option value="November">
                  November
                </option>

                <option value="December">
                  December
                </option>

              </select>

            </div>

            <div>

              <label className="block text-sm font-medium text-slate-600 mb-2">
                Year
              </label>

              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="2020"
                max="2100"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

          </div>

          {/* Salary */}
          <div>

            <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">

              <IndianRupee
                size={16}
                className="text-indigo-600"
              />

              Basic Salary

            </label>

            <input
              type="number"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              placeholder="50000"
              min="0"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>

          {/* Allowances & Deductions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-medium text-slate-600 mb-2">
                Allowances
              </label>

              <input
                type="number"
                name="allowances"
                value={formData.allowances}
                onChange={handleChange}
                placeholder="5000"
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-slate-600 mb-2">
                Deductions
              </label>

              <input
                type="number"
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
                placeholder="2000"
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

          </div>

          {/* Net Salary Preview */}
          <div className="bg-indigo-50 rounded-xl p-4">

            <p className="text-sm text-indigo-600">
              Net Salary
            </p>

            <p className="text-2xl font-bold text-slate-800 mt-1">

              ₹
              {(
                (Number(formData.basicSalary) || 0) +
                (Number(formData.allowances) || 0) -
                (Number(formData.deductions) || 0)
              ).toLocaleString("en-IN")}

            </p>

            <p className="text-xs text-slate-500 mt-1">
              Basic salary + allowances - deductions
            </p>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={() =>
                setIsOpen(false)
              }
              className="px-5 py-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
            >
              Generate Payslip
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default GeneratePayslipForm;