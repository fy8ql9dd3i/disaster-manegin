import Contact from "../models/Contact.js";

/**
 * @desc Submit a contact form message
 * @route POST /api/messages
 * @access Public
 */
export const submitMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: req.t("CONTACT_FILL_ALL_FIELDS") });
    }

    const newMessage = await Contact.create({ name, email, message });

    res.status(201).json({
      message: req.t("CONTACT_SUBMITTED"),
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Get all contact messages (Admin only)
 * @route GET /api/messages
 * @access Admin (protected)
 */
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
