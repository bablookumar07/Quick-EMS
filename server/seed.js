import dotenv from "dotenv";
import bcrypt from "bcrypt";

import connectDB from "./config/db.js";
import User from "./models/user.js";

dotenv.config();

const temporaryPassword = "admin123";

const registerAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      console.error(
        "Missing ADMIN_EMAIL environment variable"
      );

      process.exit(1);
    }

    await connectDB();

    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    // ==========================================
    // Existing Admin
    // ==========================================

    if (existingAdmin) {
      console.log(
        `User already exists with role: ${existingAdmin.role}`
      );

      // If password is already bcrypt hashed,
      // don't change it.
      const isAlreadyHashed =
        existingAdmin.password.startsWith("$2");

      if (!isAlreadyHashed) {
        existingAdmin.password =
          await bcrypt.hash(
            existingAdmin.password,
            10
          );

        await existingAdmin.save();

        console.log(
          "Existing admin password migrated to bcrypt successfully."
        );
      } else {
        console.log(
          "Admin password is already bcrypt hashed."
        );
      }

      process.exit(0);
    }

    // ==========================================
    // Create New Admin
    // ==========================================

    const hashedPassword =
      await bcrypt.hash(
        temporaryPassword,
        10
      );

    const admin = await User.create({
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log(
      `Admin created successfully: ${admin.email}`
    );

    console.log(
      `Temporary password: ${temporaryPassword}`
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "ADMIN SEED ERROR:",
      error
    );

    process.exit(1);
  }
};

registerAdmin();