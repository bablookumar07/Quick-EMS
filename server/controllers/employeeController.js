import Employee from "../models/employee.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

// ==========================================
// Get Employees
// ==========================================

export const getEmployees = async (req, res) => {
  try {
    const { department } = req.query;

    let where = {
      isDeleted: false,
    };

    if (department) {
      where.department = department;
    }

    const employees = await Employee.find(where).sort({
      createdAt: -1,
    });

    return res.json({
      employees,
    });
  } catch (error) {
    console.error("GET EMPLOYEES ERROR:", error);

    return res.status(500).json({
      error: "Failed to fetch employees",
    });
  }
};

// ==========================================
// Create Employee
// ==========================================

export const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary,
      allowances,
      deductions,
      joinDate,
      bio,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !position ||
      !department ||
      !joinDate
    ) {
      return res.status(400).json({
        error: "Please fill all required fields",
      });
    }

    let user = await User.findOne({ email });

    // ==========================================
    // Create New Employee User
    // ==========================================

    if (!user) {
      const hashedPassword = await bcrypt.hash(
        "123456",
        10
      );

      user = await User.create({
        email,
        password: hashedPassword,
        role: "employee",
      });
    }

    // ==========================================
    // Check Existing Employee
    // ==========================================

    const existingEmployee =
      await Employee.findOne({
        userId: user._id,
      });

    if (existingEmployee) {
      if (existingEmployee.isDeleted) {
        existingEmployee.firstName = firstName;
        existingEmployee.lastName = lastName;
        existingEmployee.email = email;
        existingEmployee.phone = phone;
        existingEmployee.position = position;
        existingEmployee.department = department;

        existingEmployee.basicSalary =
          Number(basicSalary) || 0;

        existingEmployee.allowances =
          Number(allowances) || 0;

        existingEmployee.deductions =
          Number(deductions) || 0;

        existingEmployee.joinDate = joinDate;
        existingEmployee.bio = bio || "";
        existingEmployee.status = "active";
        existingEmployee.isDeleted = false;

        await existingEmployee.save();

        return res.status(201).json({
          success: true,
          employee: existingEmployee,
        });
      }

      return res.status(409).json({
        error:
          "An employee profile already exists for this user",
      });
    }

    // ==========================================
    // Create Employee Profile
    // ==========================================

    const employee = new Employee({
      userId: user._id,
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary:
        Number(basicSalary) || 0,
      allowances:
        Number(allowances) || 0,
      deductions:
        Number(deductions) || 0,
      joinDate,
      bio: bio || "",
    });

    await employee.save();

    return res.status(201).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error("CREATE EMPLOYEE ERROR:", error);

    return res.status(500).json({
      error: "Failed to create employee",
    });
  }
};

// ==========================================
// Update Employee
// ==========================================

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary,
      allowances,
      deductions,
      status,
      joinDate,
      bio,
    } = req.body;

    const employee =
      await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.email = email;
    employee.phone = phone;
    employee.position = position;
    employee.department = department;

    employee.basicSalary =
      Number(basicSalary) || 0;

    employee.allowances =
      Number(allowances) || 0;

    employee.deductions =
      Number(deductions) || 0;

    employee.status =
      status || "active";

    employee.joinDate = joinDate;
    employee.bio = bio || "";

    await employee.save();

    // Update login email
    if (employee.userId) {
      await User.findByIdAndUpdate(
        employee.userId,
        {
          email,
        }
      );
    }

    return res.json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error("UPDATE EMPLOYEE ERROR:", error);

    return res.status(500).json({
      error: "Failed to update employee",
    });
  }
};

// ==========================================
// Delete Employee
// ==========================================

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee =
      await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    employee.isDeleted = true;
    employee.status = "inactive";

    await employee.save();

    return res.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("DELETE EMPLOYEE ERROR:", error);

    return res.status(500).json({
      error: "Failed to delete employee",
    });
  }
};