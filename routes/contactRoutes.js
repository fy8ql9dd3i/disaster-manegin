import express from "express";
import { submitMessage, getAllMessages } from "../controllers/contactController.js";
import { protect } from "../middlewares/authMiddleware.js"; // Admin protection

const router = express.Router();

// Public route: submit a contact form
router.post("/", submitMessage);

// Admin route: view all messages
router.get("/", protect, getAllMessages);

export default router;
