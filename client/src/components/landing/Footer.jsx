import {
  ArrowUp,
  Mail,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <footer className="relative w-full overflow-hidden bg-slate-950 text-white border-t border-white/10">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/3 w-[500px] max-w-[100vw] h-[250px] bg-indigo-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 sm:gap-12">

          {/* Brand */}
          <div className="max-w-sm">

            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
                Q
              </div>

              <div className="text-left">
                <span className="block text-lg font-bold">
                  Quick EMS
                </span>

                <span className="text-[10px] text-slate-500 tracking-wider">
                  EMPLOYEE MANAGEMENT
                </span>
              </div>
            </button>

            <p className="mt-6 text-sm leading-6 text-slate-500">
              A modern employee management platform designed
              to make workforce management simpler, smarter and
              more connected.
            </p>

            {/* Email */}
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
              <Mail
                size={16}
                className="shrink-0 text-indigo-400"
              />

              <span className="break-all">
                hello@quickems.com
              </span>
            </div>

          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Product
            </h3>

            <div className="mt-5 space-y-3">

              {[
                {
                  label: "Features",
                  id: "features",
                },
                {
                  label: "How It Works",
                  id: "how-it-works",
                },
                {
                  label: "Benefits",
                  id: "benefits",
                },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() =>
                    scrollToSection(link.id)
                  }
                  className="block text-sm text-slate-500 hover:text-indigo-400 transition"
                >
                  {link.label}
                </button>
              ))}

            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Company
            </h3>

            <div className="mt-5 space-y-3">

              <button
                onClick={() =>
                  scrollToSection("about")
                }
                className="block text-sm text-slate-500 hover:text-indigo-400 transition"
              >
                About
              </button>

              <button
                onClick={() =>
                  scrollToSection("contact")
                }
                className="block text-sm text-slate-500 hover:text-indigo-400 transition"
              >
                Contact
              </button>

              <button
                onClick={() =>
                  scrollToSection("home")
                }
                className="block text-sm text-slate-500 hover:text-indigo-400 transition"
              >
                Home
              </button>

            </div>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Get Started
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-500">
              Ready to simplify your employee management?
              Access your workspace today.
            </p>

            <button
              type="button"
              onClick={handleLogin}
              className="mt-5 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white text-slate-900 text-sm font-semibold hover:bg-indigo-50 transition"
            >
              Login
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 text-center sm:text-left">
            © 2026 Quick EMS. Built with

            <Heart
              size={13}
              className="shrink-0 text-pink-500 fill-current"
            />

            for modern teams.
          </p>

          {/* Back to top */}
          <button
            type="button"
            onClick={() =>
              scrollToSection("home")
            }
            className="w-9 h-9 shrink-0 rounded-lg bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-500 transition"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>

        </div>

      </div>
    </footer>
  );
};

export default Footer;