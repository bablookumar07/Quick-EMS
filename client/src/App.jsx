import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginLanding from "./pages/login_landing.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Layout from "./pages/layout.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Employees from "./pages/Employees.jsx";
import Attendance from "./pages/attendance.jsx";
import Leave from "./pages/leave.jsx";
import Payslip from "./pages/payslip.jsx";
import PrintPayslip from "./pages/printpayslip.jsx";
import Settings from "./pages/settings.jsx";

const App = () => {
  return (
    <>
      <Toaster />

      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={<LoginLanding />}
        />

        <Route
          path="/login/admin"
          element={
            <LoginForm
              role="admin"
              title="Admin Portal"
              subtitle="Sign in to manage your organization"
            />
          }
        />

        <Route
          path="/login/employee"
          element={
            <LoginForm
              role="employee"
              title="Employee Portal"
              subtitle="Sign in to access your account"
            />
          }
        />

        {/* Main Application */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payslips" element={<Payslip />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Print Payslip */}
        <Route
          path="/print/payslip/:id"
          element={<PrintPayslip />}
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </>
  );
};

export default App;