// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import i18next from "./config/i18n.js";                  // i18n configuration for multi-language support
import i18nextMiddleware from "i18next-http-middleware";

import authRoutes from "./routes/authRoutes.js";         // Admin login
import adminRoutes from "./routes/adminRoutes.js";       // Admin management: volunteers, alerts, messages
import volunteerRoutes from "./routes/volunteerRoutes.js"; // Volunteer registration
import alertRoutes from "./routes/alertRoutes.js";       // Send alerts (admin only)
import contactRoutes from "./routes/contactRoutes.js";   // Contact form messages

import { errorHandler } from "./middlewares/errorMiddleware.js"; // Global error handler

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ===== Middleware ===== //
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// i18n middleware for multi-language support
app.use(i18nextMiddleware.handle(i18next));

// ===== Routes ===== //
// Admin authentication
app.use("/api/auth", authRoutes);

// Admin-controlled routes
app.use("/api/admin", adminRoutes);

// Volunteer registration
app.use("/api/volunteers", volunteerRoutes);

// Disaster alert routes (optional if separate)
app.use("/api/alerts", alertRoutes);

// Contact form / messages
app.use("/api/contact", contactRoutes);

// ===== Test Route ===== //
app.get("/test", (req, res) => {
  res.json({ message: req.t("VOLUNTEER_REGISTER_SUCCESS") });
});

// ===== Error Handling ===== //
app.use(errorHandler);

// ===== Start Server ===== //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
