// backend/models/Volunteer.js
import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: true },      // e.g., Zone A
    specialization: { type: String },               // e.g., Health, Logistics
    digitalID: { type: String, unique: true },      // unique ID for tracking
    status: { 
      type: String, 
      enum: ["Pending", "Available", "Assigned", "Completed"], 
      default: "Pending" 
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

export default mongoose.model("Volunteer", volunteerSchema);
