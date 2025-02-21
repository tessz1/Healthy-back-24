import express from "express";
import { getPurchasedCourses } from "../controllers/userController.js";
import User from "../models/userModel.js";
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { telegramId, purchases, role } = req.body;

    const existingUser = await User.findOne({ telegramId });
    if (existingUser) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }
    
    const newUser = new User({
      telegramId,
      purchases: purchases || [],
      role: role || "user",
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Ошибка при создании пользователя:", err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/:userId/purchases", getPurchasedCourses);

export default router;