import express from "express";
import { sendAlert } from "../controllers/alertController.js";
import { protect } from "../middlewares/authMiddleware.js"; // Only admin can send alerts

const router = express.Router();

// Route: Admin sends disaster alert
router.post("/", protect, sendAlert);

export default router;
