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

  const [submitting, setSubmitting] =
    useState(false);

  // ==========================================
  // Handle Input Change
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // Handle Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) {
      return;
    }

    const employee = employees.find(
      (item) =>
        item.id === formData.employeeId
    );

    if (!employee) {
      return;
    }

    try {
      setSubmitting(true);

      // ========================================
      // Send data to backend
      // ========================================

      await onSuccess({
        employeeId: formData.employeeId,
        month: formData.month,
        year: Number(formData.year),
        basicSalary:
          Number(formData.basicSalary) || 0,
        allowances:
          Number(formData.allowances) || 0,
        deductions:
          Number(formData.deductions) || 0,
      });

      // ========================================
      // Reset Form
      // ========================================

      setFormData({
        employeeId: "",
        month: "",
        year: "2026",
        basicSalary: "",
        allowances: "",
        deductions: "",
      });

      setIsOpen(false);
    } catch (error) {
      // Parent handles API error/toast
      console.error(
        "GENERATE PAYSLIP FORM ERROR:",
        error
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // Net Salary Preview
  // ==========================================

  const netSalary =
    (Number(formData.basicSalary) || 0) +
    (Number(formData.allowances) || 0) -
    (Number(formData.deductions) || 0);

  // ==========================================
  // Button when modal is closed
  // ==========================================

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

  // ==========================================
  // Modal
  // ==========================================

  return (
    <div
      onClick={() => {
        if (!submitting) {
          setIsOpen(false);
        }
      }}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl"
      >
        {/* ====================================
            Header
        ==================================== */}

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
            onClick={() => {
              if (!submitting) {
                setIsOpen(false);
              }
            }}
            disabled={submitting}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* ====================================
            Form
        ==================================== */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          {/* ==================================
              Employee
          ================================== */}

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
              disabled={submitting}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
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

          {/* ==================================
              Month & Year
          ================================== */}

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
                disabled={submitting}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
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
                disabled={submitting}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
              />
            </div>
          </div>

          {/* ==================================
              Basic Salary
          ================================== */}

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
              disabled={submitting}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
            />
          </div>

          {/* ==================================
              Allowances & Deductions
          ================================== */}

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
                disabled={submitting}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
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
                disabled={submitting}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
              />
            </div>
          </div>

          {/* ==================================
              Net Salary Preview
          ================================== */}

          <div className="bg-indigo-50 rounded-xl p-4">
            <p className="text-sm text-indigo-600">
              Net Salary
            </p>

            <p className="text-2xl font-bold text-slate-800 mt-1">
              ₹
              {netSalary.toLocaleString(
                "en-IN"
              )}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Basic salary + allowances -
              deductions
            </p>
          </div>

          {/* ==================================
              Buttons
          ================================== */}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                if (!submitting) {
                  setIsOpen(false);
                }
              }}
              disabled={submitting}
              className="px-5 py-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
            >
              {submitting
                ? "Generating..."
                : "Generate Payslip"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratePayslipForm;