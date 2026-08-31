import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";

import EmployeeCard from "../components/EmployeeCard";
import EmployeeForm from "../components/EmployeeForm";

const Employees = () => {
  // ==========================================
  // Employee Data
  // ==========================================

  const [employees, setEmployees] = useState([
    {
      id: "1",
      firstName: "Rahul",
      lastName: "Sharma",
      email: "rahul.sharma@example.com",
      department: "Engineering",
      position: "Frontend Developer",
    },
    {
      id: "2",
      firstName: "Priya",
      lastName: "Verma",
      email: "priya.verma@example.com",
      department: "HR",
      position: "HR Manager",
    },
    {
      id: "3",
      firstName: "Aman",
      lastName: "Kumar",
      email: "aman.kumar@example.com",
      department: "Finance",
      position: "Accountant",
    },
    {
      id: "4",
      firstName: "Neha",
      lastName: "Singh",
      email: "neha.singh@example.com",
      department: "Engineering",
      position: "Backend Developer",
    },
    {
      id: "5",
      firstName: "Vikas",
      lastName: "Yadav",
      email: "vikas.yadav@example.com",
      department: "Marketing",
      position: "Marketing Executive",
    },
    {
      id: "6",
      firstName: "Anjali",
      lastName: "Gupta",
      email: "anjali.gupta@example.com",
      department: "Design",
      position: "UI/UX Designer",
    },
  ]);

  // ==========================================
  // UI States
  // ==========================================

  const [search, setSearch] = useState("");

  const [selectedDepartment, setSelectedDepartment] =
    useState("");

  const [loading, setLoading] = useState(false);

  // Add modal
  const [createModal, setCreateModal] = useState(false);

  // Edit modal
  const [editModal, setEditModal] = useState(false);

  // Employee being edited
  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  // ==========================================
  // Departments
  // ==========================================

  const departments = [
    ...new Set(
      employees.map((employee) => employee.department)
    ),
  ];

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

  const handleDelete = (employee) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
    );

    if (!confirmed) {
      return;
    }

    setEmployees((currentEmployees) =>
      currentEmployees.filter(
        (item) => item.id !== employee.id
      )
    );
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

  const handleAddEmployee = (employeeData) => {
    const newEmployee = {
      ...employeeData,
      id: Date.now().toString(),
    };

    setEmployees((currentEmployees) => [
      ...currentEmployees,
      newEmployee,
    ]);

    setCreateModal(false);
  };

  // ==========================================
  // Update Employee
  // ==========================================

  const handleUpdateEmployee = (updatedData) => {
    setEmployees((currentEmployees) =>
      currentEmployees.map((employee) =>
        employee.id === selectedEmployee.id
          ? {
              ...updatedData,
              id: employee.id,
            }
          : employee
      )
    );

    setEditModal(false);
    setSelectedEmployee(null);
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

          <p className="text-slate-500">
            Loading employees...
          </p>

        </div>

      ) : filteredEmployees.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
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