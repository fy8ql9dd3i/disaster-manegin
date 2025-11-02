import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  message: { type: String, required: true },
  photo: { type: String }, // store uploaded photo path; use array if multiple photos
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  }
}, { timestamps: true });

// 2dsphere index for geospatial queries
contactSchema.index({ location: "2dsphere" });

export default mongoose.model("Contact", contactSchema);
