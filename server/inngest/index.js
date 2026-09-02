import { Inngest } from "inngest";

import Attendance from "../models/attendance.js";
import Employee from "../models/employee.js";
import Leave from "../models/leave.js";

export const inngest = new Inngest({
  id: "quick-ems",
  isDev: true,
});

// ==========================================
// 1. AUTO CHECKOUT
// ==========================================

const autoCheckout = inngest.createFunction(
  {
    id: "auto-checkout",
    triggers: {
      event: "employee/checkout",
    },
  },

  async ({ event, step }) => {
    const {
      employeeId,
      attendanceId,
    } = event.data;

    // Wait for 9 hours
    await step.sleep(
      "wait-for-9-hours",
      "9h"
    );

    const attendance =
      await Attendance.findById(
        attendanceId
      );

    if (!attendance) {
      console.log(
        "Attendance record not found:",
        attendanceId
      );
      return;
    }

    // If employee has not checked out
    if (!attendance.clockOut) {
      const employee =
        await Employee.findById(
          employeeId
        );

      if (!employee) {
        console.log(
          "Employee not found:",
          employeeId
        );
        return;
      }

      // Email functionality will be added later
      console.log(
        `Checkout reminder should be sent to: ${employee.email}`
      );

      // Wait another 1 hour
      await step.sleep(
        "wait-for-1-hour",
        "1h"
      );

      const updatedAttendance =
        await Attendance.findById(
          attendanceId
        );

      if (!updatedAttendance) {
        console.log(
          "Attendance record not found after reminder."
        );
        return;
      }

      // Still not checked out
      if (!updatedAttendance.clockOut) {
        const checkoutTime =
          new Date(
            updatedAttendance.clockIn.getTime() +
              4 * 60 * 60 * 1000
          );

        updatedAttendance.clockOut =
          checkoutTime;

        updatedAttendance.workingHours = 4;

        updatedAttendance.status = "Late";

        await updatedAttendance.save();

        console.log(
          "Employee automatically checked out:",
          {
            employeeId,
            attendanceId,
          }
        );
      }
    }
  }
);

// ==========================================
// 2. LEAVE APPLICATION REMINDER
// ==========================================

const leaveApplicationReminder =
  inngest.createFunction(
    {
      id: "leave-application-reminder",
      triggers: {
        event: "leave/pending",
      },
    },

    async ({ event, step }) => {
      const { leaveApplicationId } =
        event.data;

      // Wait for 24 hours
      await step.sleep(
        "wait-for-24-hours",
        "24h"
      );

      // Get leave application
      const leaveApplication =
        await Leave.findById(
          leaveApplicationId
        );

      if (!leaveApplication) {
        console.log(
          "Leave application not found:",
          leaveApplicationId
        );
        return;
      }

      // Check if leave is still pending
      if (
        leaveApplication.status ===
        "Pending"
      ) {
        const employee =
          await Employee.findById(
            leaveApplication.employeeId
          );

        if (!employee) {
          console.log(
            "Employee not found for leave application:",
            leaveApplicationId
          );
          return;
        }

        // Email functionality will be added later
        console.log(
          `Leave reminder should be sent to admin for employee: ${employee.email}`
        );
      }
    }
  );

// ==========================================
// 3. ATTENDANCE REMINDER CRON
// ==========================================

const attendanceReminder =
  inngest.createFunction(
    {
      id: "attendance-reminder",
      triggers: {
        // Every day at 11:30 AM IST
        cron: "TZ=Asia/Kolkata 30 11 * * *",
      },
    },

    async () => {
      // Get today's date
      const today = new Date();

      const startOfDay = new Date(today);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(today);
      endOfDay.setHours(
        23,
        59,
        59,
        999
      );

      // Get all active employees
      const employees =
        await Employee.find({
          isDeleted: false,
          status: "active",
        });

      for (const employee of employees) {
        // Check today's attendance
        const attendance =
          await Attendance.findOne({
            employeeId: employee._id,
            date: {
              $gte: startOfDay,
              $lte: endOfDay,
            },
          });

        // If attendance is already marked
        if (attendance) {
          continue;
        }

        // Check whether employee is on leave today
        const leave =
          await Leave.findOne({
            employeeId: employee._id,
            status: "Approved",
            startDate: {
              $lte: endOfDay,
            },
            endDate: {
              $gte: startOfDay,
            },
          });

        // Employee is on approved leave
        if (leave) {
          continue;
        }

        // Email functionality will be added later
        console.log(
          `Attendance reminder should be sent to: ${employee.email}`
        );
      }

      console.log(
        "Attendance reminder cron completed."
      );
    }
  );

// ==========================================
// EXPORT ALL INNGEST FUNCTIONS
// ==========================================

export const functions = [
  autoCheckout,
  leaveApplicationReminder,
  attendanceReminder,
];