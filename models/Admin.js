// backend/models/Admin.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Admin email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Admin password is required"],
      minlength: 6,
    },
  },
  { timestamps: true }
);

// Compare password during login (plain text)
adminSchema.methods.matchPassword = function (enteredPassword) {
  return this.password === enteredPassword;
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
