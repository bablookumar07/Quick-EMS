import express from "express";

import {
  login,
  session,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const authRouter =
  express.Router();

// ==========================================
// Login
// ==========================================

authRouter.post(
  "/login",
  login
);

// ==========================================
// Session
// ==========================================

authRouter.get(
  "/session",
  protect,
  session
);

// ==========================================
// Profile
// ==========================================

authRouter.get(
  "/profile",
  protect,
  getProfile
);

authRouter.put(
  "/profile",
  protect,
  updateProfile
);

// ==========================================
// Change Password
// ==========================================

authRouter.post(
  "/change-password",
  protect,
  changePassword
);

export default authRouter;