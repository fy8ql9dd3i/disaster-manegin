import express from "express";
import multer from "multer";
import { createNews, getAllNews } from "../controllers/newsController.js";
import { protect } from "../middlewares/authMiddleware.js"; // Admin only

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // make sure folder exists
  },
  filename(req, file, cb) {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", protect, upload.single("image"), createNews); // Admin posts news
router.get("/", getAllNews); // Public fetch news

export default router;
