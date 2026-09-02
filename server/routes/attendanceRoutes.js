import express from "express";

import {
  getAttendance,
  clockIn,
  clockOut,
} from "../controllers/attendanceController.js";

import { protect } from "../middleware/authMiddleware.js";

const attendanceRouter = express.Router();

// Get logged-in user's attendance
attendanceRouter.get(
  "/",
  protect,
  getAttendance
);

// Clock in
attendanceRouter.post(
  "/clock-in",
  protect,
  clockIn
);

// Clock out
attendanceRouter.post(
  "/clock-out",
  protect,
  clockOut
);

export default attendanceRouter;