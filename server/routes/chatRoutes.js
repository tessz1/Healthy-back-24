import express from "express";
import User from "../models/userModel.js";
import Course from "../models/courseModels.js";

const router = express.Router();

// Покупка курса
router.post("/purchase", async (req, res) => {
  try {
    const { telegramId, courseId } = req.body;

    const user = await User.findOne({ telegramId });
    if (!user) return res.status(404).json({ message: "Пользователь не найден" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Курс не найден" });

  
    let newRole;
    switch (course.title) {
      case "Укрепление спины":
        newRole = "back_strengthening";
        break;
      case "Реабилитация после операций":
        newRole = "post_surgery_rehabilitation";
        break;
      case "Коррекция осанки для офисных работников":
        newRole = "posture_correction_office";
        break;
      default:
        newRole = "user";
    }

  
    if (!user.role || user.role === "user") {
      user.role = newRole;
    }


    if (!user.purchases.includes(courseId)) {
      user.purchases.push(courseId);
    }

    await user.save();

    res.status(200).json({ message: "Курс успешно приобретен", user });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обработке покупки", error });
  }
});

export default router;
