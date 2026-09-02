import {
  Users,
  CalendarCheck,
  ClipboardCheck,
  WalletCards,
  ArrowUpRight,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Users,
      number: "01",
      title: "Employee Management",
      description:
        "Manage employee profiles, departments, roles and essential information from one centralized workspace.",
    },
    {
      icon: CalendarCheck,
      number: "02",
      title: "Smart Attendance",
      description:
        "Track clock-ins, clock-outs and working hours while keeping attendance records organized.",
    },
    {
      icon: ClipboardCheck,
      number: "03",
      title: "Leave Management",
      description:
        "Submit, review and manage leave requests with a simple and transparent workflow.",
    },
    {
      icon: WalletCards,
      number: "04",
      title: "Payroll & Payslips",
      description:
        "Generate payslips, manage salary details and give employees easy access to their payment records.",
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-slate-950 py-24 sm:py-28"
    >
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* =====================================
            Section Heading
        ====================================== */}

        <div className="max-w-3xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Everything you need
          </div>

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            One platform.
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Complete control.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-400 max-w-2xl mx-auto">
            Quick EMS brings your essential employee management
            workflows together in one simple, powerful platform.
          </p>

        </div>

        {/* =====================================
            Feature Cards
        ====================================== */}

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (
              <div
                key={feature.number}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.07] hover:border-indigo-400/30 hover:-translate-y-2 transition-all duration-500"
              >

                {/* Number */}
                <div className="flex items-center justify-between">

                  <span className="text-xs font-semibold text-slate-600 tracking-widest">
                    {feature.number}
                  </span>

                  <ArrowUpRight
                    size={19}
                    className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  />

                </div>

                {/* Icon */}
                <div className="mt-8 w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-400/10 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-300">

                  <Icon
                    size={23}
                    className="text-indigo-400"
                  />

                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/70 transition-all duration-500" />

              </div>
            );
          })}

        </div>

        {/* =====================================
            Bottom Highlight
        ====================================== */}

        <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-500/[0.08] via-purple-500/[0.06] to-pink-500/[0.08] p-6 sm:p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <p className="text-sm font-medium text-indigo-300">
                Built for modern teams
              </p>

              <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-white">
                Spend less time managing.
                <span className="text-slate-400">
                  {" "}More time growing.
                </span>
              </h3>

            </div>

            <div className="flex flex-wrap gap-3">

              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
                Simple
              </span>

              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
                Secure
              </span>

              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
                Scalable
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Features;