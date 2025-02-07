import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/index";
import { removeItem, updateQuantity } from "../store/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
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
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center bg-[#1E1E1E] border border-gray-700 rounded-lg p-4 shadow-lg w-full"
            >
              <div className="w-full sm:w-24 h-24 overflow-hidden rounded-md mb-4 sm:mb-0">
                <img
                  src={`http://localhost:5000${item.images}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col sm:ml-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-200">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {item.description}
                </p>
                <p className="text-xl font-bold text-orange-500">
                  {item.price} ₽
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
        </div>
      )}
    </div>
  );
};

export default CartPage;
