import { useState } from "react";
import {
  X,
  Lock,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";

const ChangePasswordModal = ({
  open,
  onClose,
}) => {
  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  if (!open) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      setError(
        "New password and confirm password do not match."
      );

      return;
    }

    if (formData.newPassword.length < 6) {
      setError(
        "New password must be at least 6 characters."
      );

      return;
    }

    setLoading(true);

    // Frontend simulation
    setTimeout(() => {
      setLoading(false);

      setMessage(
        "Password updated successfully."
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 700);
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

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Lock size={20} />
              </div>

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Change Password
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Update your account password
                </p>

              </div>

            </div>

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

          {/* Current Password */}
          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              Current Password
            </label>

            <div className="relative">

              <input
                type={
                  showCurrent
                    ? "text"
                    : "password"
                }
                name="currentPassword"
                value={
                  formData.currentPassword
                }
                onChange={handleChange}
                required
                placeholder="Enter current password"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrent(
                    !showCurrent
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showCurrent ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* New Password */}
          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              New Password
            </label>

            <div className="relative">

              <input
                type={
                  showNew
                    ? "text"
                    : "password"
                }
                name="newPassword"
                value={
                  formData.newPassword
                }
                onChange={handleChange}
                required
                placeholder="Enter new password"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNew(!showNew)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showNew ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}
          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              Confirm New Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
                required
                placeholder="Confirm new password"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="px-4 py-3 rounded-lg bg-green-50 text-green-600 text-sm">
              {message}
            </div>
          )}

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
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60 transition"
            >

              <Save size={17} />

              {loading
                ? "Updating..."
                : "Update Password"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ChangePasswordModal;