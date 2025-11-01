import Volunteer from "../models/Volunteer.js";
import { sendSMS } from "../utils/smsService.js";

/* =========================
   ALERT CONTROLLER
========================= */

/**
 * @desc Send disaster alert to volunteers in a specific location
 * @route POST /api/alerts
 * @access Admin (protected)
 */
export const sendAlert = async (req, res) => {
  try {
    const { location, message } = req.body;

    // Find volunteers in the specified location
    const volunteers = await Volunteer.find({ location });

    if (!volunteers || volunteers.length === 0) {
      return res.status(404).json({ message: "No volunteers found in this location" });
    }

    // Send SMS alert to each volunteer
    for (const volunteer of volunteers) {
      const alertMsg = `🔔 Disaster Relief Alert
${message}

Please confirm if you’re available:
✅ Accept → [link]
❌ Decline → [link]`;

      // sendSMS is a helper function in utils
      await sendSMS(volunteer.phone, alertMsg);
    }

    res.json({ message: `Alert sent to ${volunteers.length} volunteers` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
