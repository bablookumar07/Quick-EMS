import { useEffect, useState } from "react";

const EmployeeForm = ({
  onSuccess,
  onCancel,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    joinDate: "",
    bio: "",
    status: "active",
  });

  const [submitting, setSubmitting] = useState(false);

  // ==========================================
  // Set Initial Data
  // ==========================================

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        position: initialData.position || "",
        department: initialData.department || "",
        basicSalary: initialData.basicSalary ?? "",
        allowances: initialData.allowances ?? "",
        deductions: initialData.deductions ?? "",
        joinDate: initialData.joinDate
          ? initialData.joinDate.split("T")[0]
          : "",
        bio: initialData.bio || "",
        status: initialData.status || "active",
      });
    }
  }, [initialData]);

  // ==========================================
  // Handle Change
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const payload = {
        ...formData,
        basicSalary: Number(formData.basicSalary) || 0,
        allowances: Number(formData.allowances) || 0,
        deductions: Number(formData.deductions) || 0,
      };

      await onSuccess(payload);
    } catch (error) {
      console.error("EMPLOYEE FORM ERROR:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ========================================
          Personal Information
      ======================================== */}

      <div>
        <h3 className="text-lg font-semibold text-slate-800">
          Personal Information
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          Enter employee personal details
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

          {/* First Name */}

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Last Name */}

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              disabled={!!initialData}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100"
            />

            {initialData && (
              <p className="text-xs text-slate-400 mt-1">
                Email cannot be changed while editing.
              </p>
            )}
          </div>

          {/* Phone */}

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

        </div>
      </div>

      {/* ========================================
          Employment Details
      ======================================== */}

      <div className="border-t border-slate-200 pt-6">

        <h3 className="text-lg font-semibold text-slate-800">
          Employment Details
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          Enter employee job details
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

          {/* Department */}

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Department
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">
                Select department
              </option>

              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          {/* Position */}

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Position
            </label>

            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Join Date */}

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Join Date
            </label>

            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Status */}

          {initialData && (
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          )}

        </div>
      </div>

      {/* ========================================
          Salary Details
      ======================================== */}

      <div className="border-t border-slate-200 pt-6">

        <h3 className="text-lg font-semibold text-slate-800">
          Salary Details
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          Enter employee salary information
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">

          {/* Basic Salary */}

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Basic Salary
            </label>

            <input
              type="number"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Allowances */}

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Allowances
            </label>

            <input
              type="number"
              name="allowances"
              value={formData.allowances}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Deductions */}

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Deductions
            </label>

            <input
              type="number"
              name="deductions"
              value={formData.deductions}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

        </div>
      </div>

      {/* ========================================
          Bio
      ======================================== */}

      <div className="border-t border-slate-200 pt-6">

        <h3 className="text-lg font-semibold text-slate-800">
          Bio
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          Add a short description about the employee
        </p>

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Enter employee bio..."
          rows="4"
          className="w-full mt-5 px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      {/* ========================================
          Buttons
      ======================================== */}

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

        <button
          type="button"
          onClick={onCancel}
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
            ? "Saving..."
            : initialData
              ? "Save Changes"
              : "Add Employee"}
        </button>

      </div>

    </form>
  );
};

export default EmployeeForm;