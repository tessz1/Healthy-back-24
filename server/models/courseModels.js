import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  instructor: { type: String, required: true },
  images: { type: String, required: true },
  content: [
    {
      type: { type: String, enum: ["video", "text", "quiz", "assignment"], required: true },
      title: { type: String, required: true },
      description: { type: String, default: "" },
      content: { type: String, required: true },
      order: { type: Number, required: true },
    },
  ],
}, { timestamps: true });

export default mongoose.model("Course", CourseSchema);
