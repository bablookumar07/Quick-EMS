import Leave from "../models/leave.js";
import Employee from "../models/employee.js";
import { inngest } from "../inngest/index.js";

// Get Leaves
export const getLeaves = async (req, res) => {
  try {
    const userId = req.session.id;
    const role = req.session.role;

    let leaves;

    if (role === "admin") {
      leaves = await Leave.find({
        status: {
          $in: [
            "Pending",
            "Approved",
            "Rejected",
          ],
        },
      })
        .populate(
          "employeeId",
          "firstName lastName email"
        )
        .sort({
          createdAt: -1,
        });
    } else {
      leaves = await Leave.find({
        userId,
      })
        .populate(
          "employeeId",
          "firstName lastName email"
        )
        .sort({
          createdAt: -1,
        });
    }

    return res.json({
      leaves,
    });
  } catch (error) {
    console.error(
      "GET LEAVES ERROR:",
      error
    );

    return res.status(500).json({
      error: "Failed to fetch leaves",
    });
  }
};

// Apply Leave
export const applyLeave = async (req, res) => {
  try {
    const userId = req.session.id;

    const {
      type,
      startDate,
      endDate,
      reason,
    } = req.body;

    if (
      !type ||
      !startDate ||
      !endDate ||
      !reason
    ) {
      return res.status(400).json({
        error: "All leave fields are required",
      });
    }

    const employee =
      await Employee.findOne({
        userId,
        isDeleted: false,
      });

    if (!employee) {
      return res.status(404).json({
        error: "Employee profile not found",
      });
    }

    if (
      new Date(endDate) <
      new Date(startDate)
    ) {
      return res.status(400).json({
        error:
          "End date cannot be before start date",
      });
    }

    const leave = new Leave({
      userId,
      employeeId: employee._id,
      type,
      startDate,
      endDate,
      reason,
      status: "Pending",
    });

    await leave.save();

    // Trigger Inngest Leave Reminder Event
    await inngest.send({
      name: "leave/pending",
      data: {
        leaveApplicationId:
          leave._id.toString(),
      },
    });

    const populatedLeave =
      await leave.populate(
        "employeeId",
        "firstName lastName email"
      );

    return res.status(201).json({
      success: true,
      leave: populatedLeave,
    });
  } catch (error) {
    console.error(
      "APPLY LEAVE ERROR:",
      error
    );

    return res.status(500).json({
      error: "Failed to apply for leave",
    });
  }
};

// Update Leave Status
export const updateLeaveStatus = async (
  req,
  res
) => {
  try {
    if (req.session.role !== "admin") {
      return res.status(403).json({
        error: "Admin access required",
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (
      !["Approved", "Rejected"].includes(
        status
      )
    ) {
      return res.status(400).json({
        error: "Invalid leave status",
      });
    }

    const leave =
      await Leave.findById(id);

    if (!leave) {
      return res.status(404).json({
        error: "Leave request not found",
      });
    }

    leave.status = status;

    await leave.save();

    const updatedLeave =
      await leave.populate(
        "employeeId",
        "firstName lastName email"
      );

    return res.json({
      success: true,
      leave: updatedLeave,
    });
  } catch (error) {
    console.error(
      "UPDATE LEAVE STATUS ERROR:",
      error
    );

    return res.status(500).json({
      error:
        "Failed to update leave status",
    });
  }
};