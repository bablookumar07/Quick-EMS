import {
  ShieldCheck,
  Zap,
  BarChart3,
  Layers3,
  Clock3,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Secure & Reliable",
      description:
        "Keep employee information protected with secure access and role-based workflows.",
    },
    {
      icon: Zap,
      title: "Work Faster",
      description:
        "Reduce repetitive tasks and manage everyday HR operations from one place.",
    },
    {
      icon: BarChart3,
      title: "Clear Insights",
      description:
        "Turn employee data into useful information for better decisions.",
    },
    {
      icon: Layers3,
      title: "Everything Connected",
      description:
        "Employees, attendance, leaves and payroll stay connected in one workspace.",
    },
    {
      icon: Clock3,
      title: "Save Valuable Time",
      description:
        "Spend less time searching through records and more time focusing on your team.",
    },
    {
      icon: Sparkles,
      title: "Simple Experience",
      description:
        "A clean and intuitive interface makes employee management easier for everyone.",
    },
  ];

  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-slate-950 text-white py-24 sm:py-28"
    >
      {/* =====================================
          Background
      ====================================== */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-1/4 -left-40 w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-3xl" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* =====================================
            Main Layout
        ====================================== */}

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20 items-start">

          {/* =====================================
              Left Content
          ====================================== */}

          <div className="lg:sticky lg:top-32">

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-semibold">

              <Sparkles size={14} />

              Why Quick EMS?
            </div>

            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">

              Built to make

              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                work simpler.
              </span>

            </h2>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-400 max-w-lg">
              Quick EMS brings structure to everyday employee
              management so your team can spend less time
              dealing with administrative work and more time
              doing meaningful work.
            </p>

            {/* Highlight */}

            <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-white/[0.04]">

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 shrink-0 rounded-xl bg-indigo-500/10 border border-indigo-400/10 flex items-center justify-center">

                  <Sparkles
                    size={20}
                    className="text-indigo-400"
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    One system. Less complexity.
                  </h3>

                  <p className="mt-1.5 text-sm text-slate-500 leading-5">
                    Everything your team needs without
                    unnecessary complexity.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =====================================
              Right Benefits
          ====================================== */}

          <div className="grid sm:grid-cols-2 gap-4">

            {benefits.map((benefit, index) => {

              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="group relative min-h-[220px] p-6 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:border-indigo-400/30 hover:-translate-y-1.5 transition-all duration-500"
                >

                  {/* Number */}

                  <div className="absolute top-5 right-5 text-xs font-bold text-slate-700 group-hover:text-indigo-400/60 transition-colors">
                    0{index + 1}
                  </div>

                  {/* Icon */}

                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-400/10 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-500">

                    <Icon
                      size={22}
                      className="text-indigo-400 group-hover:text-white transition-colors duration-500"
                    />

                  </div>

                  {/* Content */}

                  <h3 className="mt-7 text-lg font-semibold text-white">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {benefit.description}
                  </p>

                  {/* Arrow */}

                  <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-600 group-hover:text-indigo-400 group-hover:border-indigo-400/30 transition-all duration-300">

                    <ArrowUpRight size={16} />

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* =====================================
            Bottom Stats
        ====================================== */}

        <div className="mt-20 pt-10 border-t border-white/10">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">
                4+
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Core modules
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">
                100%
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Centralized
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">
                24/7
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Accessibility
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">
                1
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Connected workspace
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Benefits;