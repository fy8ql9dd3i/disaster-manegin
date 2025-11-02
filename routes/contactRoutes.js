import express from "express";
import multer from "multer";
import { submitMessage, getAllMessages } from "../controllers/contactController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ================================
   Multer configuration for photo upload
================================ */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder to save uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

// Accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Max file size: 5MB
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

/* ================================
   Public route: submit a contact form
   Users can optionally upload a photo
================================ */
router.post("/", upload.single("photo"), submitMessage);

/* ================================
   Admin route: view all messages
   Protected route for transparency
================================ */
router.get("/", protect, getAllMessages);

export default router;
