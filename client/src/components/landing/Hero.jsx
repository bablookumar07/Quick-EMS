import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Users,
  CalendarCheck,
  WalletCards,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    document
      .getElementById("features")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-slate-950 text-white"
    >
      {/* =========================================
          Background
      ========================================== */}

      <div className="absolute inset-0">

        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950" />

        {/* Glow 1 */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

        {/* Glow 2 */}
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl" />

        {/* Glow 3 */}
        <div className="absolute -bottom-40 left-1/3 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

      </div>

      {/* =========================================
          Content
      ========================================== */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center min-h-[calc(100vh-8rem)]">

          {/* =====================================
              Left Content
          ===================================== */}

          <div className="max-w-2xl">

            {/* Badge */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-7">

              <span className="relative flex h-2 w-2">

                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />

                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />

              </span>

              Smart Employee Management System

            </div>

            {/* Heading */}

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">

              Manage Your Team

              <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Smarter. Faster.
              </span>

            </h1>

            {/* Description */}

            <p className="mt-7 text-lg sm:text-xl leading-relaxed text-slate-300 max-w-xl">
              Everything you need to manage employees,
              track attendance, handle leave requests
              and simplify payroll — all in one powerful
              platform.
            </p>

            {/* CTA */}

            <div className="mt-9 flex flex-col sm:flex-row gap-4">

              {/* Get Started */}

              <button
                onClick={() => navigate("/login")}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 font-semibold shadow-xl shadow-indigo-950/30 hover:bg-indigo-50 hover:-translate-y-0.5 transition-all duration-300"
              >

                Get Started

                <ArrowRight
                  size={19}
                  className="group-hover:translate-x-1 transition-transform"
                />

              </button>

              {/* Explore */}

              <button
                onClick={scrollToFeatures}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm text-white font-semibold hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >

                <Play
                  size={17}
                  className="fill-current"
                />

                Explore Features

              </button>

            </div>

            {/* Trust Points */}

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">

              <div className="flex items-center gap-2 text-sm text-slate-300">

                <CheckCircle2
                  size={17}
                  className="text-emerald-400"
                />

                Easy to use

              </div>

              <div className="flex items-center gap-2 text-sm text-slate-300">

                <CheckCircle2
                  size={17}
                  className="text-emerald-400"
                />

                Real-time tracking

              </div>

              <div className="flex items-center gap-2 text-sm text-slate-300">

                <CheckCircle2
                  size={17}
                  className="text-emerald-400"
                />

                Secure access

              </div>

            </div>

          </div>

          {/* =====================================
              Right Dashboard Preview
          ===================================== */}

          <div className="relative lg:pl-4">

            {/* Floating card — top */}

            <div className="absolute -top-8 -left-5 sm:left-0 z-20 hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl animate-[bounce_4s_ease-in-out_infinite]">

              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">

                <TrendingUp
                  size={20}
                  className="text-emerald-400"
                />

              </div>

              <div>

                <p className="text-xs text-slate-400">
                  Productivity
                </p>

                <p className="text-sm font-semibold">
                  +24.8%
                </p>

              </div>

            </div>

            {/* Main Dashboard */}

            <div className="relative rounded-3xl border border-white/10 bg-white/[0.07] backdrop-blur-xl p-3 shadow-2xl shadow-indigo-950/50 transform lg:rotate-1 hover:rotate-0 transition-transform duration-700">

              {/* Browser top */}

              <div className="rounded-2xl overflow-hidden bg-slate-900/90 border border-white/5">

                <div className="h-12 px-5 flex items-center justify-between border-b border-white/5">

                  <div className="flex items-center gap-2">

                    <span className="w-3 h-3 rounded-full bg-red-400/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <span className="w-3 h-3 rounded-full bg-green-400/80" />

                  </div>

                  <div className="text-[10px] text-slate-500">
                    quickems.app/dashboard
                  </div>

                  <div className="w-14" />

                </div>

                {/* Dashboard Body */}

                <div className="p-5 sm:p-7">

                  {/* Dashboard heading */}

                  <div className="flex items-center justify-between mb-6">

                    <div>

                      <p className="text-xs text-slate-500">
                        Tuesday, September 2026
                      </p>

                      <h3 className="text-lg sm:text-xl font-semibold mt-1">
                        Good morning, Rahul 👋
                      </h3>

                    </div>

                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold">
                      RS
                    </div>

                  </div>

                  {/* Stats */}

                  <div className="grid grid-cols-3 gap-3">

                    {/* Employees */}

                    <div className="rounded-xl bg-white/[0.05] border border-white/5 p-3">

                      <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center mb-3">

                        <Users
                          size={15}
                          className="text-indigo-400"
                        />

                      </div>

                      <p className="text-[10px] text-slate-500">
                        Employees
                      </p>

                      <p className="text-lg font-bold mt-1">
                        124
                      </p>

                    </div>

                    {/* Attendance */}

                    <div className="rounded-xl bg-white/[0.05] border border-white/5 p-3">

                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center mb-3">

                        <CalendarCheck
                          size={15}
                          className="text-emerald-400"
                        />

                      </div>

                      <p className="text-[10px] text-slate-500">
                        Attendance
                      </p>

                      <p className="text-lg font-bold mt-1">
                        94%
                      </p>

                    </div>

                    {/* Payroll */}

                    <div className="rounded-xl bg-white/[0.05] border border-white/5 p-3">

                      <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center mb-3">

                        <WalletCards
                          size={15}
                          className="text-purple-400"
                        />

                      </div>

                      <p className="text-[10px] text-slate-500">
                        Payroll
                      </p>

                      <p className="text-lg font-bold mt-1">
                        ₹8.4L
                      </p>

                    </div>

                  </div>

                  {/* Chart */}

                  <div className="mt-5 rounded-xl bg-white/[0.05] border border-white/5 p-4">

                    <div className="flex items-center justify-between mb-5">

                      <div>

                        <p className="text-xs text-slate-400">
                          Attendance Overview
                        </p>

                        <p className="text-sm font-semibold mt-1">
                          Weekly Performance
                        </p>

                      </div>

                      <span className="text-xs text-emerald-400">
                        +8.2%
                      </span>

                    </div>

                    <div className="h-28 flex items-end gap-2">

                      {[45, 65, 52, 80, 68, 92, 76, 88, 70, 96, 82, 91].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600/40 to-indigo-400/80 hover:from-indigo-500 hover:to-purple-400 transition-all duration-300"
                            style={{
                              height: `${height}%`,
                            }}
                          />
                        )
                      )}

                    </div>

                  </div>

                  {/* Activity */}

                  <div className="mt-5 space-y-3">

                    <div className="flex items-center justify-between">

                      <p className="text-xs text-slate-400">
                        Recent Activity
                      </p>

                      <p className="text-[10px] text-indigo-400">
                        View all
                      </p>

                    </div>

                    <div className="flex items-center gap-3">

                      <div className="w-7 h-7 rounded-full bg-indigo-500/15 flex items-center justify-center text-[9px] text-indigo-300">
                        AS
                      </div>

                      <div className="flex-1">

                        <p className="text-xs text-slate-300">
                          New employee added
                        </p>

                        <p className="text-[10px] text-slate-600">
                          2 minutes ago
                        </p>

                      </div>

                      <CheckCircle2
                        size={14}
                        className="text-emerald-400"
                      />

                    </div>

                    <div className="flex items-center gap-3">

                      <div className="w-7 h-7 rounded-full bg-purple-500/15 flex items-center justify-center text-[9px] text-purple-300">
                        PV
                      </div>

                      <div className="flex-1">

                        <p className="text-xs text-slate-300">
                          Leave request approved
                        </p>

                        <p className="text-[10px] text-slate-600">
                          18 minutes ago
                        </p>

                      </div>

                      <CheckCircle2
                        size={14}
                        className="text-emerald-400"
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Floating card — bottom */}

            <div className="absolute -bottom-7 -right-3 sm:right-0 z-20 flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl">

              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center">

                <Users
                  size={20}
                  className="text-indigo-400"
                />

              </div>

              <div>

                <p className="text-xs text-slate-400">
                  Active Employees
                </p>

                <p className="text-sm font-semibold">
                  118 / 124
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom fade */}

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

    </section>
  );
};

export default Hero;