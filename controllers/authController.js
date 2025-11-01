import Volunteer from "../models/Volunteer.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// 🧩 Hard-coded admin credentials
const ADMIN_USERNAME = "adime";
const ADMIN_PASSWORD_HASH = "$2a$10$k1tqk1uJ8lO.0JXhz6oP8u4GJH9Xq5H3B4C1lZmKjUOXjF1T7vXyC"; 
// hash of "adminpassword"
// You can generate hash using bcrypt.hashSync("adminpassword", 10)
const ADMIN_EMAIL = "adime@example.com";

// 🧩 Generate JWT Token for Admin
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

/* =========================
   ADMIN CONTROLS
========================= */

// 🔐 Admin Login (only hard-coded admin)
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username !== ADMIN_USERNAME)
      return res.status(401).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid username or password" });

    // Generate token (you can use a fixed id for the admin)
    const token = generateToken("admin-unique-id");

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: "admin-unique-id",
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   VOLUNTEER REGISTRATION
========================= */

// 🧍‍♂️ Volunteer Registration (public)
export const registerVolunteer = async (req, res) => {
  try {
    const { name, phone, email, location, specialization } = req.body;

    // Check if volunteer already exists
    const volunteerExists = await Volunteer.findOne({ email });
    if (volunteerExists)
      return res.status(400).json({ message: "Volunteer already registered" });

    const newVolunteer = await Volunteer.create({
      name,
      phone,
      email,
      location,
      specialization,
      digitalID: uuidv4(), // unique ID for tracking
    });

    res.status(201).json({
      message: "Volunteer registered successfully",
      volunteer: newVolunteer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
