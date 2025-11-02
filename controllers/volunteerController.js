// backend/controllers/volunteerController.js
import Volunteer from "../models/Volunteer.js";

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

    // Handle uploaded files (cv and digital ID image)
    let cvFile = null;
    let digitalIDImageFile = null;

    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        if (file.fieldname === "cv") cvFile = file.path;
        if (file.fieldname === "digitalIDImage") digitalIDImageFile = file.path;
      });
    }

    // Create new volunteer
    const newVolunteer = await Volunteer.create({
      name,
      phone,
      email,
      location,
      specialization: specialization || null,
      cv: cvFile || null,
      digitalIDImage: digitalIDImageFile || null,
      status: "Pending",
    });

    res.status(201).json({
      message: "Volunteer registered successfully",
      volunteer: newVolunteer,
    });
  } catch (error) {
    console.error("Error registering volunteer:", error.message);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

/**
 * @desc Get all volunteers
 * @route GET /api/volunteers
 * @access Public (can protect for admin later)
 */
export const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteers:", error.message);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};
