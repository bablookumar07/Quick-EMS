import {
  Code2,
  ShieldCheck,
  Workflow,
  Database,
  Users,
  CheckCircle2,
} from "lucide-react";

const About = () => {
  const technologies = [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
  ];

  const points = [
    "Centralized employee management",
    "Role-based access and workflows",
    "Attendance, leave and payroll management",
    "Designed for a clean and scalable experience",
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-950 text-white py-24 sm:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-semibold">
            <Users size={14} />
            About Quick EMS
          </div>

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Built around your
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              people.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Quick EMS is designed to bring the essential parts of
            employee management into one connected workspace.
          </p>

        </div>

        {/* Main Content */}
        <div className="mt-16 grid lg:grid-cols-2 gap-8 items-stretch">

          {/* Left - Product Story */}
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-10 overflow-hidden">

            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl" />

            <div className="relative">

              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-400/10 flex items-center justify-center">
                <Workflow
                  size={23}
                  className="text-indigo-400"
                />
              </div>

              <h3 className="mt-7 text-2xl sm:text-3xl font-bold text-white">
                One connected employee ecosystem.
              </h3>

              <p className="mt-5 text-sm sm:text-base text-slate-400 leading-7">
                Instead of managing employee information across
                different tools and disconnected workflows, Quick EMS
                brings everyday workforce operations together in a
                single platform.
              </p>

              <div className="mt-7 space-y-4">

                {points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />

                    <span className="text-sm text-slate-300">
                      {point}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* Right - Architecture */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-10">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-400/10 flex items-center justify-center">
                <Code2
                  size={23}
                  className="text-purple-400"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  Modern technology
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Built with the MERN stack
                </p>
              </div>

            </div>

            {/* Technology Stack */}
            <div className="mt-8 grid grid-cols-2 gap-3">

              {technologies.map((technology) => (
                <div
                  key={technology}
                  className="px-4 py-4 rounded-xl border border-white/10 bg-white/[0.03] text-center hover:bg-white/[0.07] hover:border-indigo-400/30 transition-all duration-300"
                >
                  <span className="text-sm font-medium text-slate-300">
                    {technology}
                  </span>
                </div>
              ))}

            </div>

            {/* Architecture visual */}
            <div className="mt-7 p-5 rounded-2xl bg-slate-900/70 border border-white/10">

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Architecture
              </p>

              <div className="mt-5 space-y-3">

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <Code2
                      size={16}
                      className="text-indigo-400"
                    />
                  </div>

                  <span className="text-sm text-slate-300">
                    React Frontend
                  </span>
                </div>

                <div className="ml-4 h-4 w-px bg-white/10" />

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <ShieldCheck
                      size={16}
                      className="text-purple-400"
                    />
                  </div>

                  <span className="text-sm text-slate-300">
                    Express & Node.js API
                  </span>
                </div>

                <div className="ml-4 h-4 w-px bg-white/10" />

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Database
                      size={16}
                      className="text-emerald-400"
                    />
                  </div>

                  <span className="text-sm text-slate-300">
                    MongoDB Database
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom statement */}
        <div className="mt-10 text-center">

          <p className="text-sm sm:text-base text-slate-500">
            Designed to keep teams
            <span className="text-slate-300 font-medium">
              {" "}organized, productive and connected.
            </span>
          </p>

        </div>

      </div>
    </section>
  );
};

export default About;