import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/index";
import { removeItem, updateQuantity, clearCart } from "../store/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  useEffect(() => {
    const newTotalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(newTotalAmount - discount);
  }, [cartItems, discount]);

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleApplyPromoCode = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/promo/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: promoCode,
          orderTotal: totalAmount + discount, 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setDiscount(data.discount);
        setTotalAmount(data.finalTotal);
        alert("Промокод успешно применен!");
      } else {
        alert(data.message || "Не удалось применить промокод");
      }
    } catch (error) {
      console.error("Ошибка при применении промокода:", error);
      alert("Ошибка при применении промокода");
    }
  };

  const handleCheckout = async () => {
    try {
      alert("Начало handleCheckout");
  
      if (!window.Telegram || !window.Telegram.WebApp) {
        throw new Error("Telegram WebApp не инициализирован");
      }
  
      const userData = window.Telegram.WebApp.initDataUnsafe?.user;
      alert(`Данные пользователя: ${JSON.stringify(userData)}`);
  
      if (!userData || !userData.id) {
        throw new Error("Данные пользователя не найдены");
      }
  
    
      if (cartItems.length === 0) {
        throw new Error("Корзина пуста");
      }
  
      const courseId = cartItems[0].id;
      const amount = totalAmount;
  
      alert(`Отправляемые данные: ${JSON.stringify({
        userId: userData.id,
        courseId: courseId,
        amount: amount,
      })}`);
  
      const response = await fetch("http://localhost:5000/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.id,
          courseId: courseId,
          amount: amount,
        }),
      });
  
      alert(`Ответ сервера: ${JSON.stringify(response)}`);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка при создании платежа");
      }
  
      const result = await response.json();
      alert(`Результат от сервера: ${JSON.stringify(result)}`);
  
      const { paymentUrl } = result;
      alert(`Ссылка на оплату: ${paymentUrl}`);
  
      if (window.Telegram.WebApp.openLink) {
        alert("Открываем ссылку на оплату через Telegram WebApp");
        window.Telegram.WebApp.openLink(paymentUrl);
      } else {
        alert("Метод openLink недоступен. Перенаправляем на платежную страницу.");
        window.open(paymentUrl, "_blank"); 
      }
    } catch (error) {
      // @ts-ignore
      alert(`Ошибка в handleCheckout: ${error.message}`);
    }
  };
  return (
    <div className="w-full min-h-screen bg-[#121212] px-4 py-8">
      <h2 className="text-2xl font-bold text-center text-gray-200 mb-8 mt-16">
        Корзина
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-center">Корзина пуста</p>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center bg-[#1E1E1E] border border-gray-700 rounded-lg p-4 shadow-lg w-full">
            <input
              type="text"
              placeholder="Введите промокод"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full p-2 border rounded bg-[#1E1E1E] text-white"
            />
            <button
              onClick={handleApplyPromoCode}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg mt-2 sm:mt-0 sm:ml-2 hover:bg-orange-600"
            >
              Применить
            </button>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center bg-[#1E1E1E] border border-gray-700 rounded-lg p-4 shadow-lg w-full"
            >
              <div className="w-full sm:w-24 h-24 overflow-hidden rounded-md mb-4 sm:mb-0">
                {item.images ? (
                  <img
                    src={`http://localhost:5000${item.images}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">Нет изображения</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:ml-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-200">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {item.description}
                </p>
                <p className="text-xl font-bold text-orange-500">
                  {new Intl.NumberFormat("ru-RU").format(item.price)} ₽
                </p>
              </div>

              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  className="bg-gray-600 text-white px-3 py-1 rounded text-lg hover:bg-gray-500"
                >
                  -
                </button>
                <span className="text-white text-lg">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  className="bg-gray-600 text-white px-3 py-1 rounded text-lg hover:bg-gray-500"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm sm:ml-4 mt-4 sm:mt-0 hover:bg-red-500"
              >
                Удалить
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-8">
            <p className="text-xl font-bold text-gray-200">
              Итого: {new Intl.NumberFormat("ru-RU").format(totalAmount)} ₽
            </p>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-500"
            >
              Оплатить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;