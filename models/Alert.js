// backend/models/Alert.js
import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    location: { type: String, required: true },  // zone or city
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" }], // who received alert
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);
