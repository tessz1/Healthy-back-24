import express from "express";
import Promocode from "../models/promocodesModels.js";

const router = express.Router();

function generatePromoCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let promoCode = "";
  for (let i = 0; i < length; i++) {
    promoCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return promoCode;
}

// Создать промокод
router.post("/generate", async (req, res) => {
  const { discountType, discountValue, validUntil, maxUses } = req.body;

  try {
    const promoCode = generatePromoCode();
    const newPromoCode = new Promocode({
      code: promoCode,
      discountType,
      discountValue,
      validUntil: new Date(validUntil),
      maxUses,
    });
    await newPromoCode.save();
    res.json({ success: true, promoCode: newPromoCode });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Ошибка при создании промокода" });
  }
});

// Применить промокод
router.post("/apply", async (req, res) => {
  const { code, orderTotal } = req.body;

  try {
    const promo = await Promocode.findOne({
      code,
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() },
    });

    if (!promo) {
      return res.json({ success: false, message: "Промокод недействителен" });
    }

    if (promo.maxUses && promo.usedCount >= promo.maxUses) {
      return res.json({ success: false, message: "Промокод исчерпан" });
    }

    let discount = 0;
    if (promo.discountType === "percentage") {
      discount = (orderTotal * promo.discountValue) / 100;
    } else if (promo.discountType === "fixed") {
      discount = promo.discountValue;
    }

    const finalTotal = orderTotal - discount;

    promo.usedCount += 1;
    await promo.save();

    res.json({ success: true, finalTotal, discount });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Ошибка при применении промокода" });
  }
});

export default router;
