import Volunteer from "../models/Volunteer.js";
import Contact from "../models/Contact.js";
import Alert from "../models/Alert.js"; // Optional: if you want to store alerts
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
    const volunteers = await Volunteer.find().select("-__v"); // Exclude internal fields
    res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers
    });
  } catch (error) {
    console.error("Get Volunteers Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
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
    const photo = req.file ? req.file.path : null; // Optional image for alert

    if (!location || !message) {
      return res.status(400).json({ success: false, message: "Location and message are required" });
    }

    // Find volunteers in the specified location
    const volunteers = await Volunteer.find({ location });

    // Send SMS alert to each volunteer
    for (const volunteer of volunteers) {
      const alertMsg = `🔔 Disaster Relief Alert\nLocation: ${location}\nMessage: ${message}\n✅ Accept → [link]\n❌ Decline → [link]`;
      await sendSMS(volunteer.phone, alertMsg);
    }

    // Optional: Save alert in database
    const newAlert = await Alert.create({ location, message, photo, sentTo: volunteers.map(v => v._id) });

    res.status(201).json({
      success: true,
      message: `Alert sent to ${volunteers.length} volunteers`,
      alert: newAlert
    });
  } catch (error) {
    console.error("Send Alert Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @desc Get all messages submitted from contact form
 * @route GET /api/admin/messages
 * @access Admin (protected)
 */
export const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().select("-__v");

    // Convert relative photo path to full URL
    const host = req.get("host");
    const protocol = req.protocol;
    const messagesWithPhotoURL = messages.map(msg => ({
      ...msg._doc,
      photo: msg.photo ? `${protocol}://${host}/${msg.photo}` : null
    }));

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messagesWithPhotoURL
    });
  } catch (error) {
    console.error("Get Contact Messages Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
