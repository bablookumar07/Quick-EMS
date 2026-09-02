import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Payslip = () => {
  // ==========================================
  // Auth
  // ==========================================

  const { user } = useAuth();

  const isAdmin =
    user?.role === "admin";

  // ==========================================
  // Employees
  // ==========================================

  const [employees, setEmployees] =
    useState([]);

  // ==========================================
  // Payslips
  // ==========================================

  const [payslips, setPayslips] =
    useState([]);

  // ==========================================
  // Loading
  // ==========================================

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // Fetch Employees
  // ==========================================

  const fetchEmployees = async () => {
    if (!isAdmin) {
      return;
    }

    try {
      const response =
        await api.get("/employees");

      const employeeData =
        response.data.employees || [];

      setEmployees(
        employeeData.map((employee) => ({
          ...employee,

          id: employee._id,

          firstName:
            employee.firstName,

          lastName:
            employee.lastName,

          email:
            employee.email,

          position:
            employee.position,

          department:
            employee.department,
        }))
      );
    } catch (error) {
      console.error(
        "FETCH EMPLOYEES ERROR:",
        error
      );

      const message =
        error.response?.data?.error ||
        "Failed to fetch employees";

      toast.error(message);
    }
  };

  // ==========================================
  // Fetch Payslips
  // ==========================================

  const fetchPayslips = async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/payslips");

      setPayslips(
        response.data.payslips || []
      );
    } catch (error) {
      console.error(
        "FETCH PAYSLIPS ERROR:",
        error
      );

      const message =
        error.response?.data?.error ||
        "Failed to fetch payslips";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Page Load
  // ==========================================

  useEffect(() => {
    fetchEmployees();
    fetchPayslips();
  }, [isAdmin]);

  // ==========================================
  // Generate Payslip
  // ==========================================

  const handlePayslipGenerated =
    async (formData) => {
      try {
        await api.post(
          "/payslips",
          formData
        );

        toast.success(
          "Payslip generated successfully"
        );

        await fetchPayslips();
      } catch (error) {
        console.error(
          "GENERATE PAYSLIP ERROR:",
          error
        );

        const message =
          error.response?.data?.error ||
          "Failed to generate payslip";

        toast.error(message);
      }
    };

  // ==========================================
  // Format Payslips
  // ==========================================

  const formattedPayslips =
    payslips.map((payslip) => ({
      ...payslip,

      id: payslip._id,

      employee: payslip.employeeId
        ? {
            id: payslip.employeeId._id,

            firstName:
              payslip.employeeId.firstName,

            lastName:
              payslip.employeeId.lastName,

            email:
              payslip.employeeId.email,

            position:
              payslip.employeeId.position,

            department:
              payslip.employeeId.department,
          }
        : null,
    }));

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">

        <div className="flex flex-col items-center gap-3">

          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

          <p className="text-slate-500">
            Loading payslips...
          </p>

        </div>

      </div>
    );
  }

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

        {/* ======================================
            Admin Generate Form
        ====================================== */}

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
        payslips={formattedPayslips}
        isAdmin={isAdmin}
      />

    </div>
  );
};

export default Payslip;