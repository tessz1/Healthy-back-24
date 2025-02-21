import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import promocodesRouter from "./routes/promocodesRouter.js";
import chatRoutes from "./routes/chatRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import Course from "./models/courseModels.js";
import { addCourseToUser } from "./controllers/userController.js";
import { YooCheckout } from "@a2seven/yoo-checkout";
import { v4 as uuidv4 } from "uuid";

const checkout = new YooCheckout({
  shopId: process.env.YOOKASSA_SHOP_ID,
  secretKey: process.env.YOOKASSA_SECRET_KEY,
});

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE" }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/chat", chatRoutes);
app.use("/api/courses", courseRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/promo", promocodesRouter);

app.use("/api/user", userRouter);

app.get("/api/course/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Курс не найден" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error("Ошибка при получении курса:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.post("/create-payment", async (req, res) => {
  const { userId, courseId, amount } = req.body;

  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return res.status(400).json({ error: "Некорректная сумма платежа" });
  }

  const rubAmount = Number(amount);

  const idempotenceKey = uuidv4();

  try {
    const payment = await checkout.createPayment(
      {
        amount: {
          value: rubAmount.toFixed(2),
          currency: "RUB",
        },
        confirmation: {
          type: "redirect",
          return_url:
            "https://0f31-2607-740-22-5-9845-4aae-babc-38e3.ngrok-free.app/payment-webhook",
        },
        capture: true,
        description: `Оплата курса пользователем ${userId}`,
        metadata: {
          userId,
          courseId,
        },
        notification_url:
          "https://0f31-2607-740-22-5-9845-4aae-babc-38e3.ngrok-free.app/payment-webhook",
      },
      idempotenceKey
    );

    if (!payment || !payment.confirmation) {
      throw new Error("Некорректный ответ от YooKassa");
    }

    res.status(200).json({ paymentUrl: payment.confirmation.confirmation_url });
  } catch (error) {
    console.error("Ошибка при создании платежа:", error);
    res.status(500).json({ error: "Ошибка при создании платежа" });
  }
});

app.post("/payment-webhook", async (req, res) => {
  console.log("Webhook received:", req.body);
  const { event, object } = req.body;

  if (event === "payment.succeeded" || event === "payment.pending") {
    const { userId, courseId } = object.metadata;
    console.log("Metadata:", { userId, courseId });

    try {
      await addCourseToUser(userId, courseId);
      console.log(`Курс добавлен пользователю ${userId}`);
    } catch (error) {
      console.error("Ошибка при добавлении курса:", error);
    }
  }

  res.status(200).end();
});

app.get("/payment-success", (req, res) => {
  res.send("Оплата прошла успешно! Спасибо за покупку.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
