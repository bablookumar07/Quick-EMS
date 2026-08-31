import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen flex bg-slate-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">

        <div className="p-6 md:p-8">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default Layout;