// backend/routes/adminRoutes.js
import express from "express";
import { getAllVolunteers, sendAlert, getContactMessages } from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js"; // JWT protection for admin routes

const router = express.Router();

/**
 * @route   GET /api/admin/volunteers
 * @desc    Get all registered volunteers
 * @access  Admin only (protected)
 */
router.get("/volunteers", protect, getAllVolunteers);

/**
 * @route   POST /api/admin/alerts
 * @desc    Send disaster alerts to volunteers in specific locations
 * @access  Admin only (protected)
 */
router.post("/alerts", protect, sendAlert);

/**
 * @route   GET /api/admin/messages
 * @desc    Get all messages submitted from contact form
 * @access  Admin only (protected)
 */
router.get("/messages", protect, getContactMessages);

export default router;
