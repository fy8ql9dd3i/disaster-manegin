import Volunteer from "../models/Volunteer.js";
import { v4 as uuidv4 } from "uuid";

/* =========================
   VOLUNTEER CONTROLLER
========================= */

/**
 * @desc Register a new volunteer
 * @route POST /api/volunteers/register
 * @access Public
 */
export const registerVolunteer = async (req, res) => {
  try {
    const { name, phone, email, location, specialization } = req.body;

    // Check if volunteer already exists by email
    const volunteerExists = await Volunteer.findOne({ email });
    if (volunteerExists) {
      return res.status(400).json({ message: "Volunteer already registered" });
    }

    // Create new volunteer
    const newVolunteer = await Volunteer.create({
      name,
      phone,
      email,
      location,
      specialization,
      digitalID: uuidv4(), // Unique ID for tracking
      status: "Pending",   // Default status
    });

    res.status(201).json({
      message: "Volunteer registered successfully",
      volunteer: newVolunteer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Get all volunteers (optional if admin wants to check from API)
 * @route GET /api/volunteers
 * @access Public or Admin (can protect if needed)
 */
export const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
