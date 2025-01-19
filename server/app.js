import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import cors from "cors";

// Загружаем переменные окружения из файла .env
dotenv.config();

const app = express();
app.use(express.json());

// Разрешаем запросы с любого источника (для разработки)
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
  })
);

// Подключение к MongoDB с использованием переменной окружения
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));


// Добавим базовый маршрут для корня
app.get("/", (req, res) => {
  res.send("Server is running"); // Ответ на запрос к корневому маршруту
});

// Подключение маршрутов для чатов и курсов
app.use("/api/chat", chatRoutes);
app.use("/api/courses", courseRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
