import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";

import i18next from "./config/i18n.js"; // i18n configuration
import i18nextMiddleware from "i18next-http-middleware";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import newsRoutes from "./routes/newsRoutes.js"; // ✅ News routes

import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// ===== Middleware ===== //
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🌍 i18n middleware for multi-language support
app.use(i18nextMiddleware.handle(i18next));

// ===== Static Files ===== //
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// ===== API Routes ===== //
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/news", newsRoutes); // ✅ News feature

// ===== Test Route ===== //
app.get("/test", (req, res) => {
  res.json({
    message: req.t("VOLUNTEER_REGISTER_SUCCESS"), // i18n translation example
  });
});

// ===== Error Handling ===== //
app.use(errorHandler);

// ===== Start Server ===== //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 ${i18next.t("SERVER_RUNNING")} on port ${PORT}`);
});
