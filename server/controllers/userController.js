import User from "../models/userModel.js";
import Course from "../models/courseModels.js";
export const getPurchasedCourses = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ telegramId: userId });
    if (!user) {
      console.log(`Пользователь с telegramId ${userId} не найден`);
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const purchasedCourses = await Course.find({
      _id: { $in: user.purchases },
    });

    res.status(200).json(purchasedCourses);
  } catch (error) {
    console.error("Ошибка при получении купленных курсов:", error);
    res.status(500).json({ error: "Ошибка при получении купленных курсов" });
  }
};
export const addCourseToUser = async (userId, courseId) => {
  try {
    console.log("Добавление курса пользователю:", { userId, courseId });

    const user = await User.findOne({ telegramId: userId });
    if (!user) {
      throw new Error("Пользователь не найден");
    }

    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Курс не найден");
    }

    if (!user.purchases.includes(courseId)) {
      user.purchases.push(courseId);
      console.log("Курс добавлен в purchases");
    } else {
      console.log("Курс уже добавлен пользователю");
    }

    await user.save();
    console.log("Пользователь успешно обновлен");
  } catch (error) {
    console.error("Ошибка при добавлении курса:", error);
    throw error;
  }
};
