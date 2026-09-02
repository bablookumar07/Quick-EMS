import express from "express";

import {
  getLeaves,
  applyLeave,
  updateLeaveStatus,
} from "../controllers/leaveController.js";

import {
  protect,
  protectAdmin,
} from "../middleware/authMiddleware.js";

const leaveRouter = express.Router();

// ==========================================
// Get Leaves
// ==========================================

leaveRouter.get(
  "/",
  protect,
  getLeaves
);

// ==========================================
// Apply Leave
// ==========================================

leaveRouter.post(
  "/",
  protect,
  applyLeave
);

// ==========================================
// Admin Approve / Reject
// ==========================================

leaveRouter.put(
  "/:id/status",
  protect,
  protectAdmin,
  updateLeaveStatus
);

export default leaveRouter;