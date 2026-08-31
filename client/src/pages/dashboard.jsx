import { useEffect, useState } from "react";

import AdminDashboard from "../components/AdminDashboard";
import EmployeeDashboard from "../components/EmployeeDashboard";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {

    // Temporary dummy data
    const dummyData = {
      role: "admin",

      totalEmployees: 24,
      totalDepartments: 5,
      todayAttendance: 20,
      pendingLeaves: 4,

      employee: {
        firstName: "Rahul",
        lastName: "Sharma",
      },

      currentMonthAttendance: 20,
      latestPayslip: {
        netSalary: 45000,
        month: "August",
        year: 2026,
      },
    };

    setData(dummyData);

  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <>
      {data.role === "admin" ? (
        <AdminDashboard data={data} />
      ) : (
        <EmployeeDashboard data={data} />
      )}
    </>
  );
};

export default Dashboard;