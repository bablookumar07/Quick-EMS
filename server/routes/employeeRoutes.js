import express from "express";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

import {
  protect,
  protectAdmin,
} from "../middleware/authMiddleware.js";

const employeeRouter = express.Router();

// Get all employees
employeeRouter.get(
  "/",
  protect,
  protectAdmin,
  getEmployees
);

// Create employee
employeeRouter.post(
  "/",
  protect,
  protectAdmin,
  createEmployee
);

// Update employee
employeeRouter.put(
  "/:id",
  protect,
  protectAdmin,
  updateEmployee
);

// Delete employee
employeeRouter.delete(
  "/:id",
  protect,
  protectAdmin,
  deleteEmployee
);

export default employeeRouter;