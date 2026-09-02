import express from "express";

import {
  getPayslips,
  getPayslipById,
  generatePayslip,
} from "../controllers/payslipController.js";

import {
  protect,
  protectAdmin,
} from "../middleware/authMiddleware.js";

const payslipRouter =
  express.Router();

// ==========================================
// Get All / Own Payslips
// ==========================================

payslipRouter.get(
  "/",
  protect,
  getPayslips
);

// ==========================================
// Get Single Payslip
// ==========================================

payslipRouter.get(
  "/:id",
  protect,
  getPayslipById
);

// ==========================================
// Generate Payslip
// ==========================================

payslipRouter.post(
  "/",
  protect,
  protectAdmin,
  generatePayslip
);

export default payslipRouter;