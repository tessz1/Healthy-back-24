import { MdPeopleAlt, MdOutlineShoppingBag, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { useState } from "react";
import { FaHome, FaStore } from "react-icons/fa";
import { TbFolderCheck } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full z-50">
      {/* Верхняя панель */}
      <div className="fixed top-0 left-0 w-full bg-[#f2f6ff] z-20">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
          {/* Левая часть */}
          <div className="flex items-center space-x-6">
            <Link to="/profile">
              <MdPeopleAlt size={40} />
            </Link>
            <Link to="/orders">
              <MdPeopleAlt className="border rounded-2xl p-1" size={30} />
            </Link>
          </div>

          {/* Центральная часть */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-800 text-lg font-medium">Профиль</span>
            <IoIosArrowForward size={15} />
          </div>

          {/* Правая часть */}
          <div className="flex items-center space-x-4">
            <Link to="/shopping">
              <MdOutlineShoppingBag
                className="rounded-2xl border p-1 bg-white"
                size={35}
              />
            </Link>
            <div className="cursor-pointer" onClick={toggleMenu}>
              {isMenuOpen ? (
                <MdClose size={35} className="rounded-2xl border p-2 bg-white" />
              ) : (
                <CiMenuFries size={35} className="rounded-2xl border p-2 bg-white" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Выезжающее меню */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white text-black p-6 transform transition-transform duration-300 ease-in-out z-10 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Кнопка закрытия */}
        <div className="flex justify-end">
          <MdClose
            size={35}
            className="cursor-pointer rounded-2xl border p-2 bg-gray-200"
            onClick={toggleMenu}
          />
        </div>

        {/* Содержимое меню */}
        <div className="flex flex-col space-y-4 mt-8">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50 shadow">
            <div className="flex items-center space-x-4">
              <FaHome size={24} className="text-blue-500" />
              <span className="text-gray-800 font-medium">Главная</span>
            </div>
            <IoIosArrowForward size={20} className="text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-indigo-50 shadow">
            <div className="flex items-center space-x-4">
              <FaStore size={24} className="text-indigo-500" />
              <span className="text-gray-800 font-medium">О магазине</span>
            </div>
            <IoIosArrowForward size={20} className="text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-[#fefbf3] shadow">
            <div className="flex items-center space-x-4">
              <TbFolderCheck size={24} className="text-[#ebad10]" />
              <span className="text-gray-800 font-medium">История заказов</span>
            </div>
            <IoIosArrowForward size={20} className="text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-[#f5fdf5] shadow">
            <div className="flex items-center space-x-4">
              <BiSupport size={24} />
              <span className="text-gray-800 font-medium">Служба поддержки</span>
            </div>
            <IoIosArrowForward size={20} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
