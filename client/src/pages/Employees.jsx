import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import EmployeeCard from "../components/EmployeeCard";
import EmployeeForm from "../components/EmployeeForm";
import api from "../api/axios";

const Employees = () => {
  // ==========================================
  // Employee Data
  // ==========================================

  const [employees, setEmployees] = useState([]);

  // ==========================================
  // UI States
  // ==========================================

  const [search, setSearch] = useState("");

  const [selectedDepartment, setSelectedDepartment] =
    useState("");

  const [loading, setLoading] = useState(true);

  // ==========================================
  // Modal States
  // ==========================================

  const [createModal, setCreateModal] = useState(false);

  const [editModal, setEditModal] = useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  // ==========================================
  // Departments
  // ==========================================

  const departments = [
    ...new Set(
      employees
        .map((employee) => employee.department)
        .filter(Boolean)
    ),
  ];

  // ==========================================
  // Fetch Employees
  // ==========================================

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await api.get("/employees");

      setEmployees(response.data.employees || []);
    } catch (error) {
      console.error("FETCH EMPLOYEES ERROR:", error);
      console.error("RESPONSE:", error.response);

      const message =
        error.response?.data?.error ||
        "Failed to fetch employees";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Fetch on Page Load
  // ==========================================

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ==========================================
  // Filter Employees
  // ==========================================

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesDepartment =
        selectedDepartment === "" ||
        employee.department === selectedDepartment;

      const searchText = search
        .toLowerCase()
        .trim();

      const searchableText = `
        ${employee.firstName}
        ${employee.lastName}
        ${employee.position}
        ${employee.email}
        ${employee.department}
      `.toLowerCase();

      const matchesSearch =
        searchableText.includes(searchText);

      return (
        matchesDepartment &&
        matchesSearch
      );
    });
  }, [
    employees,
    search,
    selectedDepartment,
  ]);

  // ==========================================
  // Delete Employee
  // ==========================================

  const handleDelete = async (employee) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(
        `/employees/${employee._id || employee.id}`
      );

      toast.success("Employee deleted successfully");

      await fetchEmployees();
    } catch (error) {
      console.error("DELETE EMPLOYEE ERROR:", error);
      console.error("RESPONSE:", error.response);

      const message =
        error.response?.data?.error ||
        "Failed to delete employee";

      toast.error(message);
    }
  };

  // ==========================================
  // Open Edit Modal
  // ==========================================

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setEditModal(true);
  };

  // ==========================================
  // Add Employee
  // ==========================================

  const handleAddEmployee = async (employeeData) => {
    try {
      await api.post(
        "/employees",
        employeeData
      );

      toast.success("Employee created successfully");

      setCreateModal(false);

      await fetchEmployees();
    } catch (error) {
      console.error("CREATE EMPLOYEE ERROR:", error);
      console.error("RESPONSE:", error.response);

      const message =
        error.response?.data?.error ||
        "Failed to create employee";

      toast.error(message);
    }
  };

  // ==========================================
  // Update Employee
  // ==========================================

  const handleUpdateEmployee = async (updatedData) => {
    try {
      const employeeId =
        selectedEmployee._id ||
        selectedEmployee.id;

      await api.put(
        `/employees/${employeeId}`,
        updatedData
      );

      toast.success("Employee updated successfully");

      setEditModal(false);
      setSelectedEmployee(null);

      await fetchEmployees();
    } catch (error) {
      console.error("UPDATE EMPLOYEE ERROR:", error);
      console.error("RESPONSE:", error.response);

      const message =
        error.response?.data?.error ||
        "Failed to update employee";

      toast.error(message);
    }
  };

  // ==========================================
  // Close Edit Modal
  // ==========================================

  const closeEditModal = () => {
    setEditModal(false);
    setSelectedEmployee(null);
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="space-y-6">

      {/* ========================================
          Page Header
      ======================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Employees
          </h1>

          <p className="mt-1 text-slate-500">
            Manage your team members
          </p>
        </div>

        <button
          onClick={() => setCreateModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          <Plus size={18} />

          Add Employee
        </button>

      </div>

      {/* ========================================
          Search & Department Filter
      ======================================== */}

      <div className="bg-white border border-slate-200 rounded-xl p-4">

        <div className="flex flex-col md:flex-row gap-3">

          {/* Search */}

          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search employee"
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />

          </div>

          {/* Department Filter */}

          <select
            value={selectedDepartment}
            onChange={(e) =>
              setSelectedDepartment(e.target.value)
            }
            className="md:w-56 px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">
              All Departments
            </option>

            {departments.map((department) => (
              <option
                key={department}
                value={department}
              >
                {department}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* ========================================
          Employee Count
      ======================================== */}

      <div className="flex items-center gap-2 text-sm text-slate-500">

        <Users size={17} />

        <span>
          {filteredEmployees.length} employee
          {filteredEmployees.length !== 1
            ? "s"
            : ""}
        </span>

      </div>

      {/* ========================================
          Employee Cards
      ======================================== */}

      {loading ? (

        <div className="flex items-center justify-center py-20">

          <div className="flex flex-col items-center gap-3">

            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

            <p className="text-slate-500">
              Loading employees...
            </p>

          </div>

        </div>

      ) : filteredEmployees.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee._id || employee.id}
              employee={employee}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}

        </div>

      ) : (

        /* No Employees Found */

        <div className="bg-white border border-slate-200 rounded-xl py-16 text-center">

          <Users
            size={40}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 text-lg font-semibold text-slate-700">
            No employees found
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Try changing your search or department
            filter.
          </p>

        </div>

      )}

      {/* ========================================
          Add Employee Modal
      ======================================== */}

      {createModal && (
        <div
          onClick={() => setCreateModal(false)}
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl"
          >

            {/* Modal Header */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Add New Employee
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Create a new employee profile
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setCreateModal(false)
                }
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>

            </div>

            {/* Employee Form */}

            <div className="p-6">

              <EmployeeForm
                onSuccess={handleAddEmployee}
                onCancel={() =>
                  setCreateModal(false)
                }
              />

            </div>

          </div>

        </div>
      )}

      {/* ========================================
          Edit Employee Modal
      ======================================== */}

      {editModal && selectedEmployee && (
        <div
          onClick={closeEditModal}
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl"
          >

            {/* Modal Header */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Edit Employee
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Update employee information
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>

            </div>

            {/* Employee Form */}

            <div className="p-6">

              <EmployeeForm
                initialData={selectedEmployee}
                onSuccess={handleUpdateEmployee}
                onCancel={closeEditModal}
              />

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Employees;