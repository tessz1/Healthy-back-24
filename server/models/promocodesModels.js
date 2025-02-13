import mongoose from "mongoose";

const promocodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, 
  discountType: { type: String, required: true, enum: ["percentage", "fixed"] }, // Тип 
  discountValue: { type: Number, required: true }, 
  validFrom: { type: Date, default: Date.now }, 
  validUntil: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }, 
  maxUses: { type: Number, default: null }, 
  usedCount: { type: Number, default: 0 }, 
});

export default mongoose.model("Promocode", promocodeSchema);