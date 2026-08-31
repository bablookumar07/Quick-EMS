import { useState } from "react";
import {
  X,
  FileText,
  CalendarDays,
} from "lucide-react";

const ApplyLeaveModal = ({
  onClose,
  onSubmit,
}) => {

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [formData, setFormData] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
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

    onSubmit(formData);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
    >

      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl"
      >

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Apply for Leave
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Submit a new leave request
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
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

          {/* Leave Type */}
          <div>

            <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
              <FileText
                size={16}
                className="text-indigo-600"
              />

              Leave Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">
                Select leave type
              </option>

              <option value="sick">
                Sick Leave
              </option>

              <option value="casual">
                Casual Leave
              </option>

              <option value="annual">
                Annual Leave
              </option>
            </select>

          </div>

          {/* Duration */}
          <div>

            <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
              <CalendarDays
                size={16}
                className="text-indigo-600"
              />

              Duration
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>

                <span className="block text-xs text-slate-400 mb-1">
                  Start Date
                </span>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />

              </div>

              <div>

                <span className="block text-xs text-slate-400 mb-1">
                  End Date
                </span>

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={
                    formData.startDate ||
                    today
                  }
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />

              </div>

            </div>

          </div>

          {/* Reason */}
          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              Reason
            </label>

            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Enter reason for leave..."
              className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none resize-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
            >
              Submit Leave
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ApplyLeaveModal;