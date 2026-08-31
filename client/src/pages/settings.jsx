import { useState } from "react";
import {
  Lock,
  ShieldCheck,
} from "lucide-react";

import ProfileForm from "../components/ProfileForm";
import ChangePasswordModal from "../components/ChangePasswordModal";

const Settings = () => {

  // ==========================================
  // Profile
  // ==========================================

  const [profile, setProfile] = useState({
    id: "1",
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@example.com",
    position: "Frontend Developer",
    bio: "Passionate frontend developer learning React and building modern web applications.",
  });

  // ==========================================
  // Loading
  // ==========================================

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // Password Modal
  // ==========================================

  const [passwordModal, setPasswordModal] =
    useState(false);

  // ==========================================
  // Update Profile
  // ==========================================

  const handleProfileUpdate = (
    updatedProfile
  ) => {
    setLoading(true);

    setTimeout(() => {
      setProfile(updatedProfile);
      setLoading(false);
    }, 500);
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="space-y-6">

      {/* ========================================
          Header
      ======================================== */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="mt-1 text-slate-500">
          Manage your account and preferences
        </p>

      </div>

      {/* ========================================
          Loading
      ======================================== */}

      {loading ? (

        <div className="flex items-center justify-center py-20">

          <div className="flex flex-col items-center gap-3">

            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

            <p className="text-sm text-slate-500">
              Saving profile...
            </p>

          </div>

        </div>

      ) : (

        <>

          {/* ====================================
              Profile Form
          ==================================== */}

          <ProfileForm
            profile={profile}
            onSuccess={handleProfileUpdate}
          />

          {/* ====================================
              Password Section
          ==================================== */}

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

            <div className="p-6">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                {/* Left */}
                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <ShieldCheck size={24} />
                  </div>

                  <div>

                    <h2 className="text-lg font-semibold text-slate-800">
                      Password
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Update your account password
                    </p>

                  </div>

                </div>

                {/* Change Button */}
                <button
                  onClick={() =>
                    setPasswordModal(true)
                  }
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition"
                >

                  <Lock size={17} />

                  Change Password

                </button>

              </div>

            </div>

          </div>

        </>

      )}

      {/* ========================================
          Change Password Modal
      ======================================== */}

      <ChangePasswordModal
        open={passwordModal}
        onClose={() =>
          setPasswordModal(false)
        }
      />

    </div>
  );
};

export default Settings;