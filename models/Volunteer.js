// backend/models/Volunteer.js
import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    // Personal information
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: true },        // e.g., Zone A
    specialization: { type: String },                  // e.g., Health, Logistics

    // Optional file uploads
    digitalIDImage: { type: String },                 // Path or URL to ID image
    cv: { type: String },                             // Path or URL to CV

    // Status of the volunteer
    status: { 
      type: String,
      enum: ["Pending", "Available", "Assigned", "Completed"],
      default: "Pending"
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt & updatedAt
  }
);

// Optional: Geospatial index for location queries
volunteerSchema.index({ location: "2dsphere" });

export default mongoose.model("Volunteer", volunteerSchema);
