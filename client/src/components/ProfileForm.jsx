import { useEffect, useState } from "react";
import {
  User,
  Mail,
  BriefcaseBusiness,
  FileText,
  Save,
} from "lucide-react";

const ProfileForm = ({
  profile,
  onSuccess,
}) => {
  const [bio, setBio] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (profile) {
      setBio(
        profile.bio || ""
      );
    }
  }, [profile]);

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await onSuccess({
        ...profile,
        bio,
      });
    } catch (error) {
      console.error(
        "PROFILE FORM ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
    >

      {/* ========================================
          Header
      ======================================== */}

      <div className="px-6 py-5 border-b border-slate-200">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <User size={20} />
          </div>

          <div>

            <h2 className="text-lg font-semibold text-slate-800">
              Profile Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Manage your profile information
            </p>

          </div>

        </div>

      </div>

      {/* ========================================
          Form Body
      ======================================== */}

      <div className="p-6 space-y-5">

        {/* Full Name */}

        <div>

          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">

            <User
              size={16}
              className="text-indigo-600"
            />

            Full Name

          </label>

          <input
            type="text"
            value={`${profile.firstName || ""} ${profile.lastName || ""}`}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
          />

        </div>

        {/* Email */}

        <div>

          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">

            <Mail
              size={16}
              className="text-indigo-600"
            />

            Email

          </label>

          <input
            type="email"
            value={profile.email || ""}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
          />

        </div>

        {/* Position */}

        <div>

          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">

            <BriefcaseBusiness
              size={16}
              className="text-indigo-600"
            />

            Position

          </label>

          <input
            type="text"
            value={
              profile.position || ""
            }
            disabled
            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
          />

        </div>

        {/* Bio */}

        <div>

          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">

            <FileText
              size={16}
              className="text-indigo-600"
            />

            Bio

          </label>

          <textarea
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
            rows={5}
            placeholder="Tell us something about yourself..."
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none resize-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
          />

        </div>

      </div>

      {/* ========================================
          Footer
      ======================================== */}

      <div className="px-6 py-5 border-t border-slate-200 flex justify-end">

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >

          <Save size={18} />

          {loading
            ? "Saving..."
            : "Save Changes"}

        </button>

      </div>

    </form>
  );
};

export default ProfileForm;