import express from "express";
import Course from "../models/courseModels.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });


router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const { title, description, price, duration, instructor } = req.body;
    if (!title || !description || !price || !duration || !instructor) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const courseImages = req.files.map(file => `/uploads/${file.filename}`);


    const newCourse = new Course({
      title,
      description,
      price,
      duration,
      instructor,
      imageUrls: courseImages,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Получение всех курсов
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении курсов", error });
  }
});

// Получение одного курса по ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Курс не найден" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении курса", error });
  }
});

// Обновление курса
router.put("/:id", async (req, res) => {
  try {
    const updateCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateCourse)
      return res.status(404).json({ message: "Курс не найден" });
    res.status(200).json(updateCourse);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при изменении курса", error });
  }
});

// Удаление курса
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Курс не найден" });
    res.status(200).json({ message: "Курс удален" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении курса", error });
  }
});

// Раздача загруженных файлов
router.use("/uploads", express.static("uploads"));

export default router;
