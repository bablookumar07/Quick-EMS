
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginForm = ({ role, title, subtitle }) => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Check required fields
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      // Login using AuthContext
      await login(email, password, role);

      // Login successful
      navigate("/dashboard");
    // } catch (error) {
    //   console.error("Login error:", error);

    //   const message =
    //     error.response?.data?.error ||
    //     "Login failed. Please check your credentials.";

    //   setError(message);
    // }
    
    } catch (error) {
  console.error("LOGIN ERROR:", error);
  console.error("RESPONSE:", error.response);
  console.error("MESSAGE:", error.message);

  const message =
    error.response?.data?.error ||
    error.message ||
    "Login failed";

  setError(message);
}
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">

      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">

        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-center px-10 lg:px-16">

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Employee
            <br />
            Management System
          </h1>

          <p className="mt-5 max-w-md text-white/80 text-base lg:text-lg leading-relaxed">
            Manage your employees, attendance, leaves and payroll
            efficiently from one place.
          </p>

        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* Back Button */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          {/* Heading */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold text-slate-800">
              {title}
            </h1>

            <p className="mt-2 text-slate-500">
              {subtitle}
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60 transition"
            >
              {loading && (
                <LoaderCircle
                  size={20}
                  className="animate-spin"
                />
              )}

              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

        </div>
      </div>

    </div>
  );
};

export default LoginForm;