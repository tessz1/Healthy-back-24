import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    instructor: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
