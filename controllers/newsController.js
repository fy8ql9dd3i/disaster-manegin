import News from "../models/News.js";

// @desc   Create a news post
// @route  POST /api/news
// @access Admin
export const createNews = async (req, res) => {
  try {
    const { title, description, language } = req.body;
    let image;

    if (req.file) {
      image = req.file.filename;
    }

    const news = await News.create({
      title,
      description,
      image,
      language: language || "en",
      postedBy: req.admin._id,
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all news
// @route  GET /api/news
// @access Public
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find()
      .populate("postedBy", "username email")
      .sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
