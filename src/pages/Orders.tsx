import { FiCodesandbox } from "react-icons/fi";

import { Link } from "react-router-dom";
import Header from "../components/Header";
const EmptyOrders = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-screen bg-[#f2f6ff]">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-blue-200 p-4 rounded-full">
              <FiCodesandbox size={32} className="text-blue-500" />
            </div>
          </div>
          <p className="text-lg font-medium text-gray-800 mb-4">
            Вы еще ничего не заказывали
          </p>
          <Link to="/catalog">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition">
              Каталог
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyOrders;
