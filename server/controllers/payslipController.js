import Payslip from "../models/payslip.js";

// ==========================================
// Get Payslips
// ==========================================

export const getPayslips = async (req, res) => {
  try {
    const userId = req.session.id;
    const role = req.session.role;

    let payslips;

    if (role === "admin") {
      payslips = await Payslip.find({})
        .populate(
          "employeeId",
          "firstName lastName email position department"
        )
        .sort({
          year: -1,
          createdAt: -1,
        });
    } else {
      payslips = await Payslip.find({
        userId,
      })
        .populate(
          "employeeId",
          "firstName lastName email position department"
        )
        .sort({
          year: -1,
          createdAt: -1,
        });
    }

    return res.json({
      payslips,
    });
  } catch (error) {
    console.error(
      "GET PAYSLIPS ERROR:",
      error
    );

    return res.status(500).json({
      error: "Failed to fetch payslips",
    });
  }
};

// ==========================================
// Get Single Payslip
// ==========================================

export const getPayslipById = async (
  req,
  res
) => {
  try {
    const userId = req.session.id;
    const role = req.session.role;
    const { id } = req.params;

    const payslip =
      await Payslip.findById(id).populate(
        "employeeId",
        "firstName lastName email position department"
      );

    if (!payslip) {
      return res.status(404).json({
        error: "Payslip not found",
      });
    }

    // ========================================
    // Employee can only access own payslip
    // ========================================

    if (
      role !== "admin" &&
      payslip.userId.toString() !== userId
    ) {
      return res.status(403).json({
        error: "Access denied",
      });
    }

    return res.json({
      payslip,
    });
  } catch (error) {
    console.error(
      "GET SINGLE PAYSLIP ERROR:",
      error
    );

    return res.status(500).json({
      error: "Failed to fetch payslip",
    });
  }
};

// ==========================================
// Generate Payslip
// ==========================================

export const generatePayslip = async (
  req,
  res
) => {
  try {
    if (req.session.role !== "admin") {
      return res.status(403).json({
        error: "Admin access required",
      });
    }

    const {
      employeeId,
      month,
      year,
      basicSalary,
      allowances,
      deductions,
    } = req.body;

    if (
      !employeeId ||
      !month ||
      !year
    ) {
      return res.status(400).json({
        error:
          "Employee, month and year are required",
      });
    }

    // Import Employee here to avoid
    // changing any existing logic
    const Employee =
      (
        await import(
          "../models/employee.js"
        )
      ).default;

    const employee =
      await Employee.findOne({
        _id: employeeId,
        isDeleted: false,
      });

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    const finalBasicSalary =
      Number(basicSalary) || 0;

    const finalAllowances =
      Number(allowances) || 0;

    const finalDeductions =
      Number(deductions) || 0;

    const netSalary =
      finalBasicSalary +
      finalAllowances -
      finalDeductions;

    const existingPayslip =
      await Payslip.findOne({
        employeeId,
        month,
        year: Number(year),
      });

    if (existingPayslip) {
      return res.status(409).json({
        error:
          "Payslip already exists for this month",
      });
    }

    const payslip = new Payslip({
      userId: employee.userId,
      employeeId: employee._id,
      month,
      year: Number(year),
      basicSalary: finalBasicSalary,
      allowances: finalAllowances,
      deductions: finalDeductions,
      netSalary,
    });

    await payslip.save();

    const populatedPayslip =
      await payslip.populate(
        "employeeId",
        "firstName lastName email position department"
      );

    return res.status(201).json({
      success: true,
      payslip: populatedPayslip,
    });
  } catch (error) {
    console.error(
      "GENERATE PAYSLIP ERROR:",
      error
    );

    return res.status(500).json({
      error: "Failed to generate payslip",
    });
  }
};