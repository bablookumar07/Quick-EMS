import User from "../models/user.js";
import Employee from "../models/employee.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ==========================================
// Login
// ==========================================

export const login = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error:
          "Email and password are required",
      });
    }

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    if (
      role &&
      user.role !== role
    ) {
      return res.status(401).json({
        error: "Invalid role",
      });
    }

    const payload = {
      id: user._id.toString(),
      role: user.role,
      email: user.email,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      success: true,
      user: payload,
      token,
    });
  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error
    );

    return res.status(500).json({
      error: "Failed to login",
    });
  }
};

// ==========================================
// Session
// ==========================================

export const session = async (
  req,
  res
) => {
  try {
    const user = req.session;

    return res.json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error:
        "Failed to get session",
    });
  }
};

// ==========================================
// Get Profile
// ==========================================

export const getProfile = async (
  req,
  res
) => {
  try {
    const userId = req.session.id;

    const user =
      await User.findById(userId).select(
        "-password"
      );

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const employee =
      await Employee.findOne({
        userId: user._id,
        isDeleted: false,
      });

    return res.json({
      profile: {
        id: user._id,
        firstName:
          employee?.firstName || "",
        lastName:
          employee?.lastName || "",
        email: user.email,
        position:
          employee?.position || "",
        department:
          employee?.department || "",
        bio:
          employee?.bio || "",
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "GET PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      error:
        "Failed to fetch profile",
    });
  }
};

// ==========================================
// Update Profile
// ==========================================

export const updateProfile = async (
  req,
  res
) => {
  try {
    const userId = req.session.id;

    const { bio } = req.body;

    const employee =
      await Employee.findOne({
        userId,
        isDeleted: false,
      });

    if (!employee) {
      return res.status(404).json({
        error:
          "Employee profile not found",
      });
    }

    employee.bio = bio || "";

    await employee.save();

    return res.json({
      success: true,
      profile: {
        id: employee.userId,
        firstName:
          employee.firstName,
        lastName:
          employee.lastName,
        email:
          employee.email,
        position:
          employee.position,
        department:
          employee.department,
        bio:
          employee.bio,
      },
    });
  } catch (error) {
    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      error:
        "Failed to update profile",
    });
  }
};

// ==========================================
// Change Password
// ==========================================

export const changePassword = async (
  req,
  res
) => {
  try {
    const user = req.session;

    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (
      !currentPassword ||
      !newPassword
    ) {
      return res.status(400).json({
        error:
          "Both passwords are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error:
          "New password must be at least 6 characters",
      });
    }

    const userData =
      await User.findById(user.id);

    if (!userData) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const isCurrentPasswordValid =
      await bcrypt.compare(
        currentPassword,
        userData.password
      );

    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        error:
          "Invalid current password",
      });
    }

    userData.password =
      await bcrypt.hash(
        newPassword,
        10
      );

    await userData.save();

    return res.json({
      success: true,
      message:
        "Password updated successfully",
    });
  } catch (error) {
    console.error(
      "CHANGE PASSWORD ERROR:",
      error
    );

    return res.status(500).json({
      error:
        "Failed to change password",
    });
  }
};