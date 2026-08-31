import { useState } from "react";

const EmployeeForm = ({ onSuccess, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState(
    initialData || {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      position: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Employee data:", formData);

    onSuccess(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800">
          Personal Information
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          Enter employee personal details
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

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

          <div className="md:col-span-2">
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
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

        </div>
      </div>

      {/* Employment Details */}
      <div className="border-t border-slate-200 pt-6">

        <h3 className="text-lg font-semibold text-slate-800">
          Employment Details
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          Enter employee job details
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

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
              <option value="">Select department</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
            </select>
          </div>

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

        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
        >
          {initialData ? "Save Changes" : "Add Employee"}
        </button>

      </div>

    </form>
  );
};

export default EmployeeForm;