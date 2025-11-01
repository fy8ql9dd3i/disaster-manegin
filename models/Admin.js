// backend/models/Admin.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String, required: true }, // hashed password
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
