import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    message: {
      en: { type: String, required: true },
      am: { type: String, required: true }
    },
    location: { type: String, required: true }, // zone or city
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" }],
    sentAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);
