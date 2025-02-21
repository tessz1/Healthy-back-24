import CourseContent from "../models/courseContentModels.js";
import mongoose from "mongoose"
// Создание контента
export const createContent = async (req, res) => {
  try {
    const { courseId, type, title, description, content, order } = req.body;

    const courseExists = await mongoose.model("Course").findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ error: "Курс не найден" });
    }

    const newContent = new CourseContent({
      courseId,
      type,
      title,
      description,
      content,
      order,
    });

    await newContent.save();
    res.status(201).json(newContent);
  } catch (error) {
    console.error("Ошибка при создании контента:", error);
    res.status(500).json({ error: "Ошибка при создании контента" });
  }
};

export const getContentByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const courseExists = await mongoose.model("Course").findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ error: "Курс не найден" });
    }

    const content = await CourseContent.find({ courseId }).sort({ order: 1 });
    res.status(200).json(content);
  } catch (error) {
    console.error("Ошибка при получении контента:", error);
    res.status(500).json({ error: "Ошибка при получении контента" });
  }
};