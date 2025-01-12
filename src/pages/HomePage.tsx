import People from "../../public/mainPeopleIcon.png";
import { FaUser, FaBox } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

function HomePage() {
  return (
    <div className="flex justify-center h-screen bg-gray-200">
      <div className="w-full max-w-xl text-center bg-white">
        <div className="h-[0.1px] bg-gray-200 mt-4 w-screen"></div>
        <div className="pt-4 sm:pt-6 md:pt-8 lg:pt-12 xl:pt-16 text-blue-950 font-bold">
          Профиль
        </div>

        <div className="h-[0.1px] bg-gray-200 mt-6 w-full"></div>
        <div className="flex items-center justify-center mt-24 ">
          <img
            src={People}
            alt="people"
            className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32"
          />
        </div>
        <div className="mt-12">
          <div className="font-bold">name</div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm flex m-2 mt-12 ">
          <FaUser className="mr-2 mt-auto text-blue-500" size={20} />
          <button className="w-full h-full flex justify-between items-center  bg-white rounded-lg">
            <span>Данные профиля</span>
            <IoIosArrowForward className="mt-1" size={15} />
          </button>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm flex m-2 ">
          <FaBox className="mr-2 mt-auto text-blue-500" size={20} />
          <button className="w-full h-full flex justify-between items-center  bg-white rounded-lg">
            <span>Мои заказы</span>
            <IoIosArrowForward className="mt-1" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
