import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  const navLinks = [
    {
      label: "Home",
      id: "home",
    },
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
    {
      label: "About",
      id: "about",
    },
    {
      label: "Contact",
      id: "contact",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/10">

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="min-h-[72px] flex items-center justify-between gap-4">

          {/* Logo */}
          <button
            type="button"
            onClick={() =>
              scrollToSection("home")
            }
            className="flex items-center gap-3 group min-w-0"
          >

            <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              Q
            </div>

            <div className="text-left min-w-0">

              <span className="block text-lg font-bold text-white leading-none">
                Quick EMS
              </span>

              <span className="hidden sm:block text-[10px] text-slate-400 mt-1 tracking-wide">
                EMPLOYEE MANAGEMENT
              </span>

            </div>

          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">

            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() =>
                  scrollToSection(link.id)
                }
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition"
              >
                {link.label}
              </button>
            ))}

          </div>

          {/* Desktop Login */}
          <button
            type="button"
            onClick={handleLogin}
            className="hidden lg:inline-flex shrink-0 items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-slate-900 text-sm font-semibold hover:bg-indigo-50 hover:-translate-y-0.5 transition-all"
          >
            Login
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="lg:hidden shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="lg:hidden pb-5">

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  onClick={() =>
                    scrollToSection(link.id)
                  }
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition"
                >
                  {link.label}
                </button>
              ))}

              <div className="h-px bg-white/10 my-2" />

              <button
                type="button"
                onClick={handleLogin}
                className="w-full px-4 py-3 rounded-lg bg-white text-slate-900 text-sm font-semibold hover:bg-indigo-50 transition"
              >
                Login
              </button>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;