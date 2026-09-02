import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import employeeRouter from "./routes/employeeRoutes.js";
import authRouter from "./routes/authRoutes.js";
import attendanceRouter from "./routes/attendanceRoutes.js";
import leaveRouter from "./routes/leaveRoutes.js";
import payslipRouter from "./routes/payslipRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import { serve } from "inngest/express";
import {
  inngest,
  functions,
} from "./inngest/index.js";

dotenv.config();

const app = express();

const PORT =
  process.env.PORT || 4000;

// ==========================================
// Database
// ==========================================

connectDB();

// ==========================================
// Middleware
// ==========================================

app.use(cors());

app.use(express.json());

// ==========================================
// Root
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "Quick EMS server is running",
  });
});

// ==========================================
// Routes
// ==========================================

app.use(
  "/api/employees",
  employeeRouter
);

app.use(
  "/api/auth",
  authRouter
);

app.use(
  "/api/attendance",
  attendanceRouter
);

app.use(
  "/api/leave",
  leaveRouter
);

app.use(
  "/api/payslips",
  payslipRouter
);

app.use(
  "/api/dashboard",
  dashboardRouter
);

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

// ==========================================
// Server
// ==========================================

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});