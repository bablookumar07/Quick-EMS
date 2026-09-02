import Attendance from "../models/attendance.js";
import Employee from "../models/employee.js";
import { inngest } from "../inngest/index.js";

// ==========================================
// Get Attendance
// ==========================================

export const getAttendance = async (req, res) => {
  try {
    const userId = req.session.id;

    const employee = await Employee.findOne({
      userId,
      isDeleted: false,
    });

    if (!employee) {
      return res.status(404).json({
        error: "Employee profile not found",
      });
    }

    const attendance = await Attendance.find({
      userId,
      employeeId: employee._id,
    }).sort({
      date: -1,
    });

    return res.json({
      attendance,
    });
  } catch (error) {
    console.error(
      "GET ATTENDANCE ERROR:",
      error
    );

    return res.status(500).json({
      error: "Failed to fetch attendance",
    });
  }
};

// ==========================================
// Clock In
// ==========================================

export const clockIn = async (req, res) => {
  try {
    const userId = req.session.id;

    const employee = await Employee.findOne({
      userId,
      isDeleted: false,
    });

    if (!employee) {
      return res.status(404).json({
        error: "Employee profile not found",
      });
    }

    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAttendance =
      await Attendance.findOne({
        userId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

    if (existingAttendance) {
      return res.status(400).json({
        error:
          "You have already clocked in today",
      });
    }

    const lateTime = new Date(now);
    lateTime.setHours(9, 15, 0, 0);

    const status =
      now > lateTime
        ? "Late"
        : "Present";

    const attendance = new Attendance({
      userId,
      employeeId: employee._id,
      date: startOfDay,
      clockIn: now,
      status,
    });

    await attendance.save();

    // ==========================================
    // Trigger Inngest Auto Checkout Event
    // ==========================================

    await inngest.send({
      name: "employee/checkout",
      data: {
        employeeId:
          employee._id.toString(),

        attendanceId:
          attendance._id.toString(),
      },
    });

    return res.status(201).json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error(
      "CLOCK IN ERROR:",
      error
    );

    return res.status(500).json({
      error: "Failed to clock in",
    });
  }
};

// ==========================================
// Clock Out
// ==========================================

export const clockOut = async (req, res) => {
  try {
    const userId = req.session.id;

    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const attendance =
      await Attendance.findOne({
        userId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

    if (!attendance) {
      return res.status(404).json({
        error:
          "You have not clocked in today",
      });
    }

    if (attendance.clockOut) {
      return res.status(400).json({
        error:
          "You have already clocked out today",
      });
    }

    const workingHours =
      (now - attendance.clockIn) /
      (1000 * 60 * 60);

    attendance.clockOut = now;

    attendance.workingHours = Number(
      workingHours.toFixed(2)
    );

    await attendance.save();

    return res.json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error(
      "CLOCK OUT ERROR:",
      error
    );

    return res.status(500).json({
      error: "Failed to clock out",
    });
  }
};