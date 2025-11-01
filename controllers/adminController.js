import Volunteer from "../models/Volunteer.js";
import Contact from "../models/Contact.js";
import { sendSMS } from "../utils/smsService.js";

/* =========================
   ADMIN CONTROLLER
========================= */

/**
 * @desc Get all registered volunteers
 * @route GET /api/admin/volunteers
 * @access Admin (protected)
 */
export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find(); // Fetch all volunteers
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Send disaster alert to volunteers in a specific location
 * @route POST /api/admin/alerts
 * @access Admin (protected)
 */
export const sendAlert = async (req, res) => {
  try {
    const { location, message } = req.body;

    // Find volunteers in the specified location
    const volunteers = await Volunteer.find({ location });

    // Send SMS alert to each volunteer
    for (const volunteer of volunteers) {
      const alertMsg = `🔔 Disaster Relief Alert\n${message}\n✅ Accept → [link]\n❌ Decline → [link]`;
      await sendSMS(volunteer.phone, alertMsg);
    }

    res.json({ message: `Alert sent to ${volunteers.length} volunteers` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Get all messages submitted from contact form
 * @route GET /api/admin/messages
 * @access Admin (protected)
 */
export const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find(); // Fetch all messages
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
