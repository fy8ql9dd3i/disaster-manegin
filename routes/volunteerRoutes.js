import express from "express";
import { registerVolunteer, getVolunteers } from "../controllers/volunteerController.js";

const router = express.Router();

// Route: Volunteer registration (public)
router.post("/register", registerVolunteer);

// Optional route: Get all volunteers (can protect with admin JWT if needed)
router.get("/", getVolunteers);

export default router;
