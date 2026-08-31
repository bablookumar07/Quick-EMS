import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Printer,
  Download,
} from "lucide-react";

const PrintPayslip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ==========================================
  // Dummy Payslip Data
  // ==========================================

  const payslips = [
    {
      id: "101",

      employee: {
        id: "1",
        firstName: "Rahul",
        lastName: "Sharma",
        email: "rahul.sharma@example.com",
        position: "Frontend Developer",
        department: "Engineering",
      },

      month: "August",
      year: "2026",

      basicSalary: 50000,
      allowances: 5000,
      deductions: 2000,
      netSalary: 53000,
    },

    {
      id: "102",

      employee: {
        id: "2",
        firstName: "Priya",
        lastName: "Verma",
        email: "priya.verma@example.com",
        position: "HR Manager",
        department: "HR",
      },

      month: "August",
      year: "2026",

      basicSalary: 45000,
      allowances: 4000,
      deductions: 1500,
      netSalary: 47500,
    },

    {
      id: "103",

      employee: {
        id: "3",
        firstName: "Aman",
        lastName: "Kumar",
        email: "aman.kumar@example.com",
        position: "Accountant",
        department: "Finance",
      },

      month: "July",
      year: "2026",

      basicSalary: 40000,
      allowances: 3000,
      deductions: 1200,
      netSalary: 41800,
    },

    {
      id: "104",

      employee: {
        id: "4",
        firstName: "Neha",
        lastName: "Singh",
        email: "neha.singh@example.com",
        position: "Backend Developer",
        department: "Engineering",
      },

      month: "July",
      year: "2026",

      basicSalary: 55000,
      allowances: 6000,
      deductions: 2500,
      netSalary: 58500,
    },
  ];

  // ==========================================
  // Find Payslip
  // ==========================================

  const payslip = useMemo(() => {
    return payslips.find(
      (item) => item.id === id
    );
  }, [id]);

  // ==========================================
  // Currency Formatter
  // ==========================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // ==========================================
  // Print
  // ==========================================

  const handlePrint = () => {
    window.print();
  };

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
  // JSX
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">

      {/* ========================================
          Action Bar
      ======================================== */}

      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">

        <button
  onClick={() => window.close()}
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
                {payslip.month} {payslip.year}
              </p>

            </div>

          </div>

        </div>

        {/* ======================================
            Employee Information
        ====================================== */}

        <div className="px-8 py-7">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>

              <p className="text-xs font-semibold uppercase text-slate-400">
                Employee Name
              </p>

              <p className="text-base font-semibold text-slate-800 mt-1">
                {payslip.employee.firstName}{" "}
                {payslip.employee.lastName}
              </p>

            </div>

            <div>

              <p className="text-xs font-semibold uppercase text-slate-400">
                Email
              </p>

              <p className="text-sm text-slate-600 mt-1">
                {payslip.employee.email}
              </p>

            </div>

            <div>

              <p className="text-xs font-semibold uppercase text-slate-400">
                Position
              </p>

              <p className="text-sm text-slate-600 mt-1">
                {payslip.employee.position}
              </p>

            </div>

            <div>

              <p className="text-xs font-semibold uppercase text-slate-400">
                Department
              </p>

              <p className="text-sm text-slate-600 mt-1">
                {payslip.employee.department}
              </p>

            </div>

            <div>

              <p className="text-xs font-semibold uppercase text-slate-400">
                Pay Period
              </p>

              <p className="text-sm text-slate-600 mt-1">
                {payslip.month} {payslip.year}
              </p>

            </div>

            <div>

              <p className="text-xs font-semibold uppercase text-slate-400">
                Payslip ID
              </p>

              <p className="text-sm text-slate-600 mt-1">
                #{payslip.id}
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