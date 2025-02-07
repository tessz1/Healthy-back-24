import express from "express";
import Course from "../models/courseModels.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, duration, instructor } = req.body;

    const courseImage = req.file ? `/uploads/${req.file.filename}` : null;

    const newCourse = new Course({
      title,
      description,
      price,
      duration,
      instructor,
      images: courseImage, 
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении курсов", error });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Курс не найден" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении курса", error });
  }
});

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


router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Курс не найден" });
    res.status(200).json({ message: "Курс удален" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении курса", error });
  }
});


router.use("/uploads", express.static("uploads"));

export default router;
