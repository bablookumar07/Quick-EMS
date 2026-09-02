import {
  LogIn,
  UsersRound,
  Activity,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: LogIn,
      title: "Sign In",
      description:
        "Access your workspace securely with your account and get everything you need from one place.",
    },
    {
      number: "02",
      icon: UsersRound,
      title: "Manage",
      description:
        "Manage employees, departments, roles and important employee information with ease.",
    },
    {
      number: "03",
      icon: Activity,
      title: "Track",
      description:
        "Keep an eye on attendance, working hours, leave requests and payroll records in real time.",
    },
    {
      number: "04",
      icon: TrendingUp,
      title: "Grow",
      description:
        "Use organized data and clear insights to make better decisions and build a stronger team.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-slate-950 text-white py-24 sm:py-28"
    >
      {/* =====================================
          Background Effects
      ====================================== */}

      <div className="absolute inset-0 pointer-events-none">

        {/* Top Right Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-3xl" />

        {/* Bottom Left Glow */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-3xl" />

        {/* Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-blue-600/5 blur-3xl" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

      </div>

      {/* =====================================
          Main Container
      ====================================== */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* =====================================
            Section Heading
        ====================================== */}

        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-semibold">

            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />

            Simple by design

          </div>

          {/* Heading */}

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">

            Everything starts

            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              with simplicity.
            </span>

          </h2>

          {/* Description */}

          <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            From signing in to managing your entire workforce,
            Quick EMS keeps every step simple and organized.
          </p>

        </div>

        {/* =====================================
            Steps
        ====================================== */}

        <div className="relative mt-20">

          {/* Connecting Line - Desktop */}

          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-px bg-gradient-to-r from-indigo-500/20 via-purple-500/30 to-pink-500/20" />

          {/* Steps Grid */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-5">

            {steps.map((step, index) => {

              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative group"
                >

                  {/* =================================
                      Icon Circle
                  ================================= */}

                  <div className="relative z-10 flex justify-center">

                    <div className="w-32 h-32 rounded-full bg-white/[0.05] border border-white/10 shadow-xl shadow-indigo-950/20 flex flex-col items-center justify-center group-hover:border-indigo-400/40 group-hover:bg-white/[0.08] group-hover:shadow-indigo-500/10 group-hover:-translate-y-2 transition-all duration-500">

                      {/* Icon */}

                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-400/10 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all duration-500">

                        <Icon size={23} />

                      </div>

                      {/* Number */}

                      <span className="mt-2 text-xs font-bold tracking-widest text-slate-600 group-hover:text-indigo-400 transition-colors">
                        {step.number}
                      </span>

                    </div>

                  </div>

                  {/* =================================
                      Content
                  ================================= */}

                  <div className="text-center mt-7 px-3">

                    <h3 className="text-xl font-bold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {step.description}
                    </p>

                  </div>

                  {/* =================================
                      Arrow
                  ================================= */}

                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-14 -right-3 z-20 w-7 h-7 rounded-full bg-slate-900 border border-white/10 items-center justify-center text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-400/30 transition-all duration-300">

                      <ArrowRight size={14} />

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>

        {/* =====================================
            Bottom Highlight Card
        ====================================== */}

        <div className="relative mt-20 rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-10 overflow-hidden">

          {/* Card Glow */}

          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

          <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* =================================
                Left Content
            ================================= */}

            <div className="max-w-2xl">

              <div className="flex items-center gap-2 text-indigo-300 text-sm font-medium">

                <CheckCircle2 size={17} />

                One connected workspace

              </div>

              <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white">

                Your entire employee lifecycle,

                <span className="text-slate-400">
                  {" "}in one place.
                </span>

              </h3>

              <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
                No scattered spreadsheets. No disconnected
                workflows. Just a centralized system designed
                to keep your team organized.
              </p>

            </div>

            {/* =================================
                Mini Stats
            ================================= */}

            <div className="grid grid-cols-3 gap-3 sm:gap-5">

              {/* Workspace */}

              <div className="px-4 py-4 rounded-2xl bg-white/[0.05] border border-white/10 text-center min-w-[90px] hover:bg-white/[0.08] hover:border-indigo-400/20 transition-all duration-300">

                <p className="text-xl sm:text-2xl font-bold text-white">
                  01
                </p>

                <p className="mt-1 text-[10px] sm:text-xs text-slate-500">
                  Workspace
                </p>

              </div>

              {/* Modules */}

              <div className="px-4 py-4 rounded-2xl bg-white/[0.05] border border-white/10 text-center min-w-[90px] hover:bg-white/[0.08] hover:border-indigo-400/20 transition-all duration-300">

                <p className="text-xl sm:text-2xl font-bold text-white">
                  04
                </p>

                <p className="mt-1 text-[10px] sm:text-xs text-slate-500">
                  Modules
                </p>

              </div>

              {/* Access */}

              <div className="px-4 py-4 rounded-2xl bg-white/[0.05] border border-white/10 text-center min-w-[90px] hover:bg-white/[0.08] hover:border-indigo-400/20 transition-all duration-300">

                <p className="text-xl sm:text-2xl font-bold text-white">
                  24/7
                </p>

                <p className="mt-1 text-[10px] sm:text-xs text-slate-500">
                  Access
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;