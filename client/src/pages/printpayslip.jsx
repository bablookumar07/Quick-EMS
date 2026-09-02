import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Printer,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";

const PrintPayslip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ==========================================
  // State
  // ==========================================

  const [payslip, setPayslip] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // Fetch Single Payslip
  // ==========================================

  const fetchPayslip = async () => {
    try {
      setLoading(true);

      const response =
        await api.get(
          `/payslips/${id}`
        );

      setPayslip(
        response.data.payslip
      );
    } catch (error) {
      console.error(
        "FETCH PAYSLIP ERROR:",
        error
      );

      const message =
        error.response?.data?.error ||
        "Failed to fetch payslip";

      toast.error(message);

      setPayslip(null);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Page Load
  // ==========================================

  useEffect(() => {
    fetchPayslip();
  }, [id]);

  // ==========================================
  // Currency Formatter
  // ==========================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount) || 0);
  };

  // ==========================================
  // Print
  // ==========================================

  const handlePrint = () => {
    window.print();
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center max-w-md w-full">

          <div className="w-8 h-8 mx-auto border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

          <p className="text-slate-500 mt-4">
            Loading payslip...
          </p>

        </div>
      </div>
    );
  }

  // ==========================================
  // Not Found
  // ==========================================

  if (!payslip) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center max-w-md w-full">

          <h1 className="text-2xl font-bold text-slate-800">
            Payslip Not Found
          </h1>

          <p className="text-slate-500 mt-2">
            The requested payslip could not be found.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            <ArrowLeft size={18} />

            Go Back
          </button>

        </div>

      </div>
    );
  }

  // ==========================================
  // Employee Data
  // ==========================================

  const employee =
    payslip.employeeId;

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">

      {/* ========================================
          Action Bar
      ======================================== */}

      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">

        <button
          onClick={() =>
            window.close()
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
        >
          <ArrowLeft size={18} />

          Back
        </button>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          <Printer size={18} />

          Print Payslip
        </button>

      </div>

      {/* ========================================
          Payslip
      ======================================== */}

      <div
        id="payslip"
        className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden print:shadow-none print:rounded-none"
      >

        {/* ======================================
            Company Header
        ====================================== */}

        <div className="px-8 py-8 border-b border-slate-200">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <div>

              <h1 className="text-2xl font-bold text-slate-800">
                Quick EMS
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Employee Management System
              </p>

            </div>

            <div className="sm:text-right">

              <h2 className="text-xl font-bold text-indigo-600">
                PAYSLIP
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {payslip.month}{" "}
                {payslip.year}
              </p>

            </div>

          </div>

        </div>

        {/* ======================================
            Employee Information
        ====================================== */}

        <div className="px-8 py-7">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Employee Name */}

            <div>

              <p className="text-xs font-semibold uppercase text-slate-400">
                Employee Name
              </p>

              <p className="text-base font-semibold text-slate-800 mt-1">
                {employee?.firstName ||
                  "Unknown"}{" "}
                {employee?.lastName || ""}
              </p>

            </div>

            {/* Email */}

            <div>

              <p className="text-xs font-semibold uppercase text-slate-400">
                Email
              </p>

              <p className="text-sm text-slate-600 mt-1">
                {employee?.email ||
                  "N/A"}
              </p>

            </div>

            {/* Position */}

            <div>

              <p className="text-xs font-semibold uppercase text-slate-400">
                Position
              </p>

              <p className="text-sm text-slate-600 mt-1">
                {employee?.position ||
                  "N/A"}
              </p>

            </div>

            {/* Department */}

            <div>

              <p className="text-xs font-semibold uppercase text-slate-400">
                Department
              </p>

              <p className="text-sm text-slate-600 mt-1">
                {employee?.department ||
                  "N/A"}
              </p>

            </div>

            {/* Pay Period */}

            <div>

              <p className="text-xs font-semibold uppercase text-slate-400">
                Pay Period
              </p>

              <p className="text-sm text-slate-600 mt-1">
                {payslip.month}{" "}
                {payslip.year}
              </p>

            </div>

            {/* Payslip ID */}

            <div>

              <p className="text-xs font-semibold uppercase text-slate-400">
                Payslip ID
              </p>

              <p className="text-sm text-slate-600 mt-1 break-all">
                #{payslip._id}
              </p>

            </div>

          </div>

        </div>

        {/* ======================================
            Salary Details
        ====================================== */}

        <div className="px-8 pb-8">

          <div className="border border-slate-200 rounded-xl overflow-hidden">

            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">

              <h3 className="font-semibold text-slate-800">
                Salary Details
              </h3>

            </div>

            <div className="divide-y divide-slate-100">

              {/* Basic Salary */}

              <div className="flex items-center justify-between px-5 py-4">

                <span className="text-sm text-slate-600">
                  Basic Salary
                </span>

                <span className="text-sm font-medium text-slate-800">
                  {formatCurrency(
                    payslip.basicSalary
                  )}
                </span>

              </div>

              {/* Allowances */}

              <div className="flex items-center justify-between px-5 py-4">

                <span className="text-sm text-slate-600">
                  Allowances
                </span>

                <span className="text-sm font-medium text-green-600">
                  +{" "}
                  {formatCurrency(
                    payslip.allowances
                  )}
                </span>

              </div>

              {/* Deductions */}

              <div className="flex items-center justify-between px-5 py-4">

                <span className="text-sm text-slate-600">
                  Deductions
                </span>

                <span className="text-sm font-medium text-red-500">
                  -{" "}
                  {formatCurrency(
                    payslip.deductions
                  )}
                </span>

              </div>

              {/* Net Salary */}

              <div className="flex items-center justify-between px-5 py-5 bg-indigo-50">

                <span className="text-base font-bold text-slate-800">
                  Net Salary
                </span>

                <span className="text-xl font-bold text-indigo-600">
                  {formatCurrency(
                    payslip.netSalary
                  )}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ======================================
            Footer
        ====================================== */}

        <div className="px-8 py-6 border-t border-slate-200">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <p className="text-xs text-slate-400">
              This is a computer-generated payslip.
            </p>

            <p className="text-xs text-slate-400">
              Quick EMS
            </p>

          </div>

        </div>

      </div>

      {/* ========================================
          Download Hint
      ======================================== */}

      <div className="max-w-4xl mx-auto mt-4 text-center print:hidden">

        <p className="text-xs text-slate-400">
          Use your browser's print dialog to save
          this payslip as a PDF.
        </p>

      </div>

    </div>
  );
};

export default PrintPayslip;