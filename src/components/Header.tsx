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
      <div className="fixed top-0 left-0 w-full bg-[#121212] z-20 shadow-lg">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
          {/* Левая часть */}
          <div className="flex items-center space-x-6">
            <Link to="/profile">
              <MdPeopleAlt size={40} className="text-white" />
            </Link>
            <Link to="/orders">
              <MdPeopleAlt className="border border-[#ff8c00] rounded-2xl p-1 text-white" size={30} />
            </Link>
          </div>

          {/* Центральная часть */}
          <div className="flex items-center space-x-2">
            <span className="text-white text-lg font-medium cursor-pointer">Профиль</span>
            <IoIosArrowForward size={15} className="text-[#ff8c00]" />
          </div>

          {/* Правая часть */}
          <div className="flex items-center space-x-4">
            <Link to="/shopping">
              <MdOutlineShoppingBag className="rounded-2xl border border-[#ff8c00] p-1 text-white" size={35} />
            </Link>
            <div className="cursor-pointer" onClick={toggleMenu}>
              {isMenuOpen ? (
                <MdClose size={35} className="rounded-2xl border border-[#ff8c00] p-2 text-white" />
              ) : (
                <CiMenuFries size={35} className="rounded-2xl border border-[#ff8c00] p-2 text-white" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Выезжающее меню */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#1e1e1e] text-white p-6 transform transition-transform duration-300 ease-in-out z-10 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Кнопка закрытия */}
        <div className="flex justify-end">
          <MdClose
            size={35}
            className="cursor-pointer rounded-2xl border border-[#ff8c00] p-2 text-white"
            onClick={toggleMenu}
          />
        </div>

        {/* Содержимое меню */}
        <div className="flex flex-col space-y-4 mt-8">
          <div className="flex items-center justify-between p-4 border border-[#ff8c00] rounded-lg bg-[#2a2a2a] shadow hover:bg-[#ff8c00] transition">
            <div className="flex items-center space-x-4">
              <FaHome size={24} className="text-[#ff8c00]" />
              <span className="text-white font-medium">Главная</span>
            </div>
            <IoIosArrowForward size={20} className="text-[#ff8c00]" />
          </div>
          <div className="flex items-center justify-between p-4 border border-[#ff8c00] rounded-lg bg-[#2a2a2a] shadow hover:bg-[#ff8c00] transition">
            <div className="flex items-center space-x-4">
              <FaStore size={24} className="text-[#ff8c00]" />
              <span className="text-white font-medium">О магазине</span>
            </div>
            <IoIosArrowForward size={20} className="text-[#ff8c00]" />
          </div>
          <div className="flex items-center justify-between p-4 border border-[#ff8c00] rounded-lg bg-[#2a2a2a] shadow hover:bg-[#ff8c00] transition">
            <div className="flex items-center space-x-4">
              <TbFolderCheck size={24} className="text-[#ff8c00]" />
              <span className="text-white font-medium">История заказов</span>
            </div>
            <IoIosArrowForward size={20} className="text-[#ff8c00]" />
          </div>
          <div className="flex items-center justify-between p-4 border border-[#ff8c00] rounded-lg bg-[#2a2a2a] shadow hover:bg-[#ff8c00] transition">
            <div className="flex items-center space-x-4">
              <BiSupport size={24} className="text-[#ff8c00]" />
              <span className="text-white font-medium">Служба поддержки</span>
            </div>
            <IoIosArrowForward size={20} className="text-[#ff8c00]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
