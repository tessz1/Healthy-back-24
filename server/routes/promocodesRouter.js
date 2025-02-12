const express = import("express");

function generationPromoCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

app.post("/api/promocodes", async (req, res) => {
  const { discountType, discountValue, validUntil, maxUses } = req.body;
  const promoCode = generationPromoCode();
});
