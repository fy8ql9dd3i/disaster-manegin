import Contact from "../models/Contact.js";

// Submit contact message with GPS coordinates and optional photo
export const submitMessage = async (req, res) => {
  try {
    const { name, email, message, latitude, longitude } = req.body;
    const photo = req.file ? req.file.path : null; // multer stores uploaded file path

    // Validate required fields
    const missing = [];
    if (!name) missing.push("name");
    if (!email) missing.push("email");
    if (!message) missing.push("message");
    if (latitude === undefined || latitude === null || latitude === "") missing.push("latitude");
    if (longitude === undefined || longitude === null || longitude === "") missing.push("longitude");

    if (missing.length > 0) {
      return res.status(400).json({ message: "Missing required fields", missing });
    }

    // Validate that coordinates are numeric
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return res.status(400).json({ message: "Invalid latitude or longitude" });
    }

    // Save message in MongoDB
    const newMessage = await Contact.create({
      name,
      email,
      message,
      photo, // save photo path
      location: {
        type: "Point",
        coordinates: [lon, lat],
      },
    });

    res.status(201).json({ message: "Message submitted successfully", contact: newMessage });
  } catch (error) {
    console.error("Submit Message Error:", error);
    // Send helpful validation details for Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation failed", details: error.errors });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// Get all messages (admin only)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Get All Messages Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
