import { useEffect, useState } from "react";
import {
  Lock,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";

import ProfileForm from "../components/ProfileForm";
import ChangePasswordModal from "../components/ChangePasswordModal";

import api from "../api/axios";

const Settings = () => {
  // ==========================================
  // Profile
  // ==========================================

  const [profile, setProfile] =
    useState(null);

  // ==========================================
  // Loading
  // ==========================================

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // Password Modal
  // ==========================================

  const [passwordModal, setPasswordModal] =
    useState(false);

  // ==========================================
  // Fetch Profile
  // ==========================================

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response =
        await api.get(
          "/auth/profile"
        );

      setProfile(
        response.data.profile
      );
    } catch (error) {
      console.error(
        "FETCH PROFILE ERROR:",
        error
      );

      const message =
        error.response?.data?.error ||
        "Failed to fetch profile";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Page Load
  // ==========================================

  useEffect(() => {
    fetchProfile();
  }, []);

  // ==========================================
  // Update Profile
  // ==========================================

  const handleProfileUpdate = async (
    updatedProfile
  ) => {
    try {
      setLoading(true);

      const response =
        await api.put(
          "/auth/profile",
          {
            bio: updatedProfile.bio,
          }
        );

      setProfile(
        response.data.profile
      );

      toast.success(
        "Profile updated successfully"
      );
    } catch (error) {
      console.error(
        "UPDATE PROFILE ERROR:",
        error
      );

      const message =
        error.response?.data?.error ||
        "Failed to update profile";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading && !profile) {
    return (
      <div className="flex items-center justify-center py-20">

        <div className="flex flex-col items-center gap-3">

          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

          <p className="text-sm text-slate-500">
            Loading settings...
          </p>

        </div>

      </div>
    );
  }

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
          Profile
      ======================================== */}

      {profile && (
        <ProfileForm
          profile={profile}
          onSuccess={
            handleProfileUpdate
          }
        />
      )}

      {/* ========================================
          Password Section
      ======================================== */}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

        <div className="p-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            {/* Left */}

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ShieldCheck
                  size={24}
                />
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