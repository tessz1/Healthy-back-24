import { FiCodesandbox } from "react-icons/fi";
import { Link } from "react-router-dom";


const EmptyOrders = () => {
  return (
    <div className="font-roboto bg-[#121212] min-h-screen text-white">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg text-center w-80 border border-[#ff8c00]">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-[#ff8c00] p-4 rounded-full ">
              <FiCodesandbox size={32} className="text-white" />
            </div>
          </div>
          <p className="text-lg font-medium text-gray-300 mb-8">
            Вы еще ничего не заказывали
          </p>
          <Link to="/shop">
            <button className="bg-[#ff8c00] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#e07b00] transition">
              Каталог
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyOrders;
