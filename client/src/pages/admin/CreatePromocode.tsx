import React, { useState } from "react";
import axios from "axios";

const CreatePromoCode: React.FC = () => {
  const [discountType, setDiscountType] = useState<string>("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const handleSubmit = async (e :React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/promo/generate`, {
        discountType,
        discountValue,
        validUntil,
        maxUses: maxUses || null,
      });
      setGeneratedCode(response.data.promoCode.code);
      alert("Промокод успешно создан!");
    } catch (error) {
      alert("Ошибка при создании промокода");
    }
  };

  return (
    <div className="bg-black min-h-screen p-4 font-roboto">
      <div className="flex flex-col items-center mt-24 sm:mt-20">
        <h1 className="text-2xl text-white mb-6">Создание промокода</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div>
            <label className="block text-white mb-2">Тип скидки:</label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full p-2 border rounded bg-white"
            >
              <option value="percentage">Процент</option>
              <option value="fixed">Фиксированная сумма</option>
            </select>
          </div>
          <div>
            <label className="block text-white mb-2">Значение скидки:</label>
            <input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Действует до:</label>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-white mb-2">
              Максимальное количество использований (необязательно):
            </label>
            <input
              type="number"
              value={maxUses}
              onChange={(e) => setMaxUses(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-orange-400 text-white rounded-xl hover:bg-orange-500 transition duration-300"
          >
            Сгенерировать промокод
          </button>
        </form>
        {generatedCode && (
          <div className="mt-6 text-center">
            <p className="text-white">
              Сгенерированный промокод: <strong>{generatedCode}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePromoCode;