import { ArrowRight, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import LoginLeftSide from "../components/LoginLeftSide";

const LoginLanding = () => {
  const portalOptions = [
    {
      id: "admin",
      title: "Admin Portal",
      description: "Sign in to manage your organization",
      path: "/login/admin",
      icon: ShieldCheck,
    },
    {
      id: "employee",
      title: "Employee Portal",
      description: "Sign in to access your account",
      path: "/login/employee",
      icon: UserRound,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">

      {/* Left Side */}
      <LoginLeftSide />

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="mt-2 text-slate-500">
              Please choose a portal to continue
            </p>
          </div>

          {/* Portal List */}
          <div className="space-y-4">
            {portalOptions.map((portal) => {
              const Icon = portal.icon;

              return (
                <Link
                  key={portal.id}
                  to={portal.path}
                  className="group flex items-center justify-between p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {portal.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {portal.description}
                      </p>
                    </div>

                  </div>

                  <ArrowRight
                    size={20}
                    className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"
                  />
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <p className="mt-10 text-center text-sm text-slate-400">
            © {new Date().getFullYear()} Quick EMS. All rights reserved.
          </p>

        </div>
      </div>

    </div>
  );
};

export default LoginLanding;