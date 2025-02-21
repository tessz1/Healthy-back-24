import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Массив купленных курсов
  role: { type: String, default: "user" }, // Роль пользователя
});

const User = mongoose.model("User", userSchema);
export default User;