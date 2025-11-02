import express from "express";
import multer from "multer";
import { getAllVolunteers, sendAlert, getContactMessages } from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ================================
   Multer setup for image upload
================================ */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to save uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

/* ================================
   Routes
================================ */

// GET all volunteers
router.get("/volunteers", protect, getAllVolunteers);

// POST alert with optional photo
//router.post("/alerts", protect, upload.single("photo"), sendAlert);

// GET all contact messages
router.get("/messages", protect, getContactMessages);

export default router;
