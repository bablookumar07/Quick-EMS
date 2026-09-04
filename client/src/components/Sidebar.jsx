import {
  CalendarCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UserRound,
  Users,
  X,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: Users,
      adminOnly: true,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: CalendarCheck,
    },
    {
      name: "Leave",
      path: "/leave",
      icon: FileText,
    },
    {
      name: "Payslips",
      path: "/payslips",
      icon: FileText,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const visibleMenuItems =
    menuItems.filter(
      (item) =>
        !item.adminOnly ||
        user?.role === "admin"
    );

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const handleNavigation = () => {
    setMobileMenuOpen(false);
  };

  /*
   * Sidebar content is shared by
   * desktop and mobile versions.
   */
  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-100">
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-xl font-bold text-indigo-600">
              Quick EMS
            </h1>

            <p className="text-xs text-slate-400 mt-1">
              Employee Management
            </p>
          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

        </div>
      </div>

      {/* User */}
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3 min-w-0">

          <div className="w-10 h-10 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <UserRound size={20} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {user?.email || "User"}
            </p>

            <p className="text-xs text-slate-400 capitalize">
              {user?.role || "Employee"}
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">

        {visibleMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavigation}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                }`
              }
            >
              <Icon
                size={19}
                className="shrink-0"
              />

              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-100">

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition"
        >
          <LogOut
            size={19}
            className="shrink-0"
          />

          <span>Logout</span>
        </button>

      </div>
    </>
  );

  return (
    <>
      {/* ========================================
          DESKTOP SIDEBAR
      ======================================== */}

      <aside className="hidden lg:flex w-64 shrink-0 min-h-screen bg-white border-r border-slate-200 flex-col">
        {sidebarContent}
      </aside>


      {/* ========================================
          MOBILE MENU BUTTON
      ======================================== */}

      {!mobileMenuOpen && (
        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen(true)
          }
          className="lg:hidden fixed top-4 left-4 z-50 w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 transition"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      )}


      {/* ========================================
          MOBILE OVERLAY
      ======================================== */}

      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px]"
          onClick={() =>
            setMobileMenuOpen(false)
          }
        />
      )}


      {/* ========================================
          MOBILE SIDEBAR
      ======================================== */}

      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 w-[min(82vw,320px)] h-dvh bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;