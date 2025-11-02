import Volunteer from "../models/Volunteer.js";
import { sendSMS } from "../utils/smsService.js";
import Alert from "../models/Alert.js";

/**
 * @desc Send disaster alert to volunteers in a specific location (multi-language)
 * @route POST /api/alerts
 * @access Admin (protected)
 */
export const sendAlert = async (req, res) => {
  try {
    // Receive both Amharic + English messages
    const { location, message_en, message_am, language } = req.body;

    // 1️⃣ Find volunteers in that location
    const volunteers = await Volunteer.find({ location });

    if (!volunteers || volunteers.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: req.t("NO_VOLUNTEERS_FOUND") });
    }

    // 2️⃣ Save alert to DB (with both translations)
    const alert = await Alert.create({
      location,
      message: {
        en: message_en || "",
        am: message_am || "",
      },
      volunteers: volunteers.map((v) => v._id),
    });

    // 3️⃣ Determine which language to send (default: English)
    const lang = language === "am" ? "am" : "en";

    // 4️⃣ Prepare translation keys
    const translatedText = {
      DISASTER_ALERT: req.t("DISASTER_ALERT", { lng: lang }),
      CONFIRM_AVAILABILITY: req.t("CONFIRM_AVAILABILITY", { lng: lang }),
      ACCEPT: req.t("ACCEPT", { lng: lang }),
      DECLINE: req.t("DECLINE", { lng: lang }),
    };

    // 5️⃣ Send SMS alert to each volunteer
    for (const volunteer of volunteers) {
      const msg =
        lang === "am"
          ? `🔔 ${translatedText.DISASTER_ALERT}\n${message_am}\n\n${translatedText.CONFIRM_AVAILABILITY}\n✅ ${translatedText.ACCEPT} → [link]\n❌ ${translatedText.DECLINE} → [link]`
          : `🔔 ${translatedText.DISASTER_ALERT}\n${message_en}\n\n${translatedText.CONFIRM_AVAILABILITY}\n✅ ${translatedText.ACCEPT} → [link]\n❌ ${translatedText.DECLINE} → [link]`;

      await sendSMS(volunteer.phone, msg);
    }

    // 6️⃣ Respond
    res.json({
      success: true,
      message: req.t("ALERT_SENT_SUCCESS", { count: volunteers.length, lng: lang }),
      alert,
    });
  } catch (error) {
    console.error("Error sending alert:", error);
    res.status(500).json({
      success: false,
      message: req.t("SERVER_ERROR"),
    });
  }
};
