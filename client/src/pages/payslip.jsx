import { useState } from "react";

import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm";

const Payslip = () => {

  // ==========================================
  // Demo Role
  // ==========================================
  // true  = Admin
  // false = Employee

  const [isAdmin, setIsAdmin] = useState(true);

  // ==========================================
  // Employees
  // ==========================================

  const [employees] = useState([
    {
      id: "1",
      firstName: "Rahul",
      lastName: "Sharma",
      email: "rahul.sharma@example.com",
      position: "Frontend Developer",
      department: "Engineering",
    },
    {
      id: "2",
      firstName: "Priya",
      lastName: "Verma",
      email: "priya.verma@example.com",
      position: "HR Manager",
      department: "HR",
    },
    {
      id: "3",
      firstName: "Aman",
      lastName: "Kumar",
      email: "aman.kumar@example.com",
      position: "Accountant",
      department: "Finance",
    },
    {
      id: "4",
      firstName: "Neha",
      lastName: "Singh",
      email: "neha.singh@example.com",
      position: "Backend Developer",
      department: "Engineering",
    },
  ]);

  // ==========================================
  // Payslip Data
  // ==========================================

  const [payslips, setPayslips] = useState([
    {
      id: "101",

      employee: employees[0],

      month: "August",

      year: "2026",

      basicSalary: 50000,

      allowances: 5000,

      deductions: 2000,

      netSalary: 53000,
    },

    {
      id: "102",

      employee: employees[1],

      month: "August",

      year: "2026",

      basicSalary: 45000,

      allowances: 4000,

      deductions: 1500,

      netSalary: 47500,
    },

    {
      id: "103",

      employee: employees[2],

      month: "July",

      year: "2026",

      basicSalary: 40000,

      allowances: 3000,

      deductions: 1200,

      netSalary: 41800,
    },

    {
      id: "104",

      employee: employees[3],

      month: "July",

      year: "2026",

      basicSalary: 55000,

      allowances: 6000,

      deductions: 2500,

      netSalary: 58500,
    },
  ]);

  // ==========================================
  // Generate New Payslip
  // ==========================================

  const handlePayslipGenerated = (
    newPayslip
  ) => {
    setPayslips((currentPayslips) => [
      newPayslip,
      ...currentPayslips,
    ]);
  };

  // ==========================================
  // Employee Payslips
  // ==========================================

  const employeePayslips = payslips.filter(
    (payslip) =>
      payslip.employee.id === "1"
  );

  // ==========================================
  // Data according to role
  // ==========================================

  const visiblePayslips = isAdmin
    ? payslips
    : employeePayslips;

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="space-y-6">

      {/* ========================================
          Header
      ======================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Payslips
          </h1>

          <p className="mt-1 text-slate-500">
            {isAdmin
              ? "Manage employee salary records"
              : "View your salary history"}
          </p>

        </div>

        {/* Admin Generate Button */}
        {isAdmin && (
          <GeneratePayslipForm
            employees={employees}
            onSuccess={
              handlePayslipGenerated
            }
          />
        )}

      </div>

      {/* ========================================
          Payslip History
      ======================================== */}

      <PayslipList
        payslips={visiblePayslips}
        isAdmin={isAdmin}
      />

    </div>
  );
};

export default Payslip;