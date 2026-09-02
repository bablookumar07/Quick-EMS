import Employee from "../models/employee.js";
import Attendance from "../models/attendance.js";
import Leave from "../models/leave.js";
import Payslip from "../models/payslip.js";
import { departments } from "../constants/department.js";

// ==========================================
// Get Dashboard Data
// Admin + Employee
// ==========================================

export const getDashboard = async (req, res) => {
  try {
    const session = req.session;

    // ==========================================
    // ADMIN DASHBOARD
    // ==========================================

    if (session.role === "admin") {
      const today = new Date();

      const startOfDay = new Date(today);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);

      const [
        totalEmployees,
        todayAttendance,
        pendingLeaves,
      ] = await Promise.all([
        Employee.countDocuments({
          isDeleted: false,
        }),

        Attendance.countDocuments({
          date: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        }),

        Leave.countDocuments({
          status: "Pending",
        }),
      ]);

      return res.json({
        role: "admin",
        totalEmployees,
        totalDepartments: departments.length,
        todayAttendance,
        pendingLeaves,
      });
    }

    // ==========================================
    // EMPLOYEE DASHBOARD
    // ==========================================

    const employee = await Employee.findOne({
      userId: session.id,
      isDeleted: false,
    }).lean();

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    const today = new Date();

    // ==========================================
    // Current Month Attendance
    // ==========================================

    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const startOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );

    // ==========================================
    // Pending Leaves
    // ==========================================

    const pendingLeaves = await Leave.countDocuments({
      userId: session.id,
      status: "Pending",
    });

    // ==========================================
    // Latest Payslip
    // ==========================================

    const latestPayslip = await Payslip.findOne({
      userId: session.id,
    })
      .sort({
        year: -1,
        createdAt: -1,
      })
      .lean();

    // ==========================================
    // Current Month Attendance
    // ==========================================

    const currentMonthAttendance =
      await Attendance.countDocuments({
        userId: session.id,
        date: {
          $gte: startOfMonth,
          $lt: startOfNextMonth,
        },
      });

    return res.json({
      role: "employee",

      employee: {
        ...employee,
        id: employee._id.toString(),
      },

      currentMonthAttendance,

      pendingLeaves,

      latestPayslip: latestPayslip
        ? {
            ...latestPayslip,
            id: latestPayslip._id.toString(),
          }
        : null,
    });
  } catch (error) {
    console.error(
      "DASHBOARD ERROR:",
      error
    );

    return res.status(500).json({
      error: "Failed to fetch dashboard data",
    });
  }
};