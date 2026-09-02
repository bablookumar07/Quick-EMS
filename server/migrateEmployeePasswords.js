import dotenv from "dotenv";
import bcrypt from "bcrypt";

import connectDB from "./config/db.js";
import User from "./models/user.js";

dotenv.config();

const migrateEmployeePasswords = async () => {
  try {
    await connectDB();

    const employees = await User.find({
      role: "employee",
    });

    if (employees.length === 0) {
      console.log("No employee users found.");
      process.exit(0);
    }

    let migratedCount = 0;

    for (const employee of employees) {
      const isAlreadyHashed =
        employee.password.startsWith("$2");

      if (isAlreadyHashed) {
        console.log(
          `Already hashed: ${employee.email}`
        );
        continue;
      }

      employee.password =
        await bcrypt.hash(
          employee.password,
          10
        );

      await employee.save();

      migratedCount++;

      console.log(
        `Password migrated: ${employee.email}`
      );
    }

    console.log(
      `\nMigration completed. ${migratedCount} employee password(s) migrated.`
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "EMPLOYEE PASSWORD MIGRATION ERROR:",
      error
    );

    process.exit(1);
  }
};

migrateEmployeePasswords();