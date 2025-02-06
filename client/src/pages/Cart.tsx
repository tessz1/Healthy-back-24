import { useState } from "react";
import axios from "axios";

const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
    },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discountedTotal = discount ? total - (total * discount) / 100 : total;

  const handleApplyPromo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/promos/validate",
        {
          code: promoCode,
          userId: "user_id",
        }
      );
      setDiscount(response.data.discount);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка при проверке промокда");
      setDiscount(null);
    }
  };

  return (
    <div className="w-full mt-20 max-w-1xl bg-[#121212] text-gray-200 font-roboto min-h-screen flex flex-col items-center px-4 md:px-6 py-6">
      <h2 className="text-xl font-bold mb-4">Корзина</h2>
      <ul className="md-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between border-b py-2">
            <span>{item.name}</span>
            <span>{item.price} руб.</span>
          </li>
        ))}
      </ul>
      <div className="mb-4">
        <label className="block mb-2">Введите промокод:</label>
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="border p-2 mr-2"
          placeholder="PROMO2025"
        />
        <button
          onClick={handleApplyPromo}
          className="bg-blue-500 text-white p-2"
        >
          Применить
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {discount && <p className="text-green-500">Скидка: {discount}%</p>}
      <h3 className="text-lg font-semibold mt-4">
        Итог: <span className="text-blue-600">{discountedTotal} ₽</span>
      </h3>
      <button className="bg-green-500 text-white p-2 mt-4 w-1/2">
        Оплатить
      </button>
    </div>
  );
};

export default Cart;
