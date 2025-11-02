import mongoose from "mongoose";

const newsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    language: { type: String, default: "en" }, // for multilingual support
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);

export default News;
