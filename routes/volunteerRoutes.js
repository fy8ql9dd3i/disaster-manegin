import express from "express";
import upload from "../middlewares/upload.js";
import { registerVolunteer, getVolunteers } from "../controllers/volunteerController.js";

const router = express.Router();

// ---------------------------
// Register volunteer
// Supports CV + Digital ID image upload
// ---------------------------
router.post(
  "/register",
  upload.any(), // Accept any file fields
  registerVolunteer
);

// Get all volunteers
router.get("/", getVolunteers);

export default router;
