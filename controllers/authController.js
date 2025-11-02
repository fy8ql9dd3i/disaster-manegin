// backend/controllers/authController.js
import Volunteer from "../models/Volunteer.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

/* ============================
   HARD-CODED ADMIN CREDENTIALS
============================ */
const ADMIN_NAME = "admin";
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

/* ============================
   JWT TOKEN GENERATOR
============================ */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

/* ============================
   ADMIN LOGIN
============================ */
export const loginAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate credentials
    if (
      name !== ADMIN_NAME ||
      email !== ADMIN_EMAIL ||
      password !== ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // Generate JWT token
    const token = generateToken("hardcoded-admin-id");

    res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: "hardcoded-admin-id",
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Server error during admin login" });
  }
};

/* ============================
   VOLUNTEER REGISTRATION
============================ */
export const registerVolunteer = async (req, res) => {
  try {
    const { name, phone, email, location, specialization } = req.body;

    // Check if volunteer already exists
    const volunteerExists = await Volunteer.findOne({ email });
    if (volunteerExists) {
      return res
        .status(400)
        .json({ message: "Volunteer already registered with this email" });
    }

    // Create new volunteer
    const newVolunteer = await Volunteer.create({
      name,
      phone,
      email,
      location,
      specialization,
      digitalIDImage: req.files?.digitalIDImage?.[0]?.path || null,
      cv: req.files?.cv?.[0]?.path || null,
      status: "Pending",
    });

    res.status(201).json({
      message: "Volunteer registered successfully",
      volunteer: newVolunteer,
    });
  } catch (error) {
    console.error("Volunteer Registration Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};
