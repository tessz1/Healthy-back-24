import { MdPeopleAlt, MdOutlineShoppingBag, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { useState, useEffect } from "react";
import { FaHome, FaStore } from "react-icons/fa";
import { TbFolderCheck } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import mainLogo from "../../../assets/mainLogo.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userTelegramId, setUserTelegramId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const tg = window.Telegram?.WebApp;
  const userData = tg?.initDataUnsafe?.user;


  useEffect(() => {
    if (userData?.id) {
      setUserTelegramId(userData.id.toString());
    }
  }, [userData]);


  useEffect(() => {
    const checkUserRole = async () => {
      if (userTelegramId) {
        try {
          const response = await fetch(`/api/users/${userTelegramId}`);
          const user = await response.json();
          if (user.role === "admin") {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error("Ошибка при проверке роли пользователя:", error);
        }
      }
    };

    checkUserRole();
  }, [userTelegramId]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full z-50">
      <div className="fixed top-0 left-0 w-full bg-[#121212] z-20 shadow-lg">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-6">
            <Link to="/">
              <img src={mainLogo} alt="logo" className="text-white w-12 h-12" />
            </Link>
            <Link to="/orders">
              <MdPeopleAlt
                className="border border-[#ff8c00] rounded-2xl p-[2px] text-white"
                size={30}
              />
            </Link>
          </div>
          <div>
            <Link to="/">
              <div className="flex items-center space-x-2">
                <span className="text-white text-lg font-medium cursor-pointer">
                  Профиль
                </span>
                <IoIosArrowForward size={15} className="text-[#ff8c00]" />
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/shop">
              <MdOutlineShoppingBag
                className="rounded-2xl border border-[#ff8c00] p-[2px] text-white"
                size={30}
              />
            </Link>
            <div className="cursor-pointer" onClick={toggleMenu}>
              {isMenuOpen ? (
                <MdClose
                  size={30}
                  className="rounded-2xl border border-[#ff8c00] p-[3px] text-white"
                />
              ) : (
                <CiMenuFries
                  size={30}
                  className="rounded-2xl border border-[#ff8c00] p-[3px] text-white"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#1e1e1e] text-white p-6 transform transition-transform duration-300 ease-in-out z-10 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <MdClose
            size={30}
            className="cursor-pointer rounded-2xl border border-[#ff8c00] p-[3px] text-white"
            onClick={toggleMenu}
          />
        </div>

        <div className="flex flex-col space-y-4 mt-8">
          <Link to="/">
            <div className="flex items-center justify-between p-3 border border-[#ff8c00] rounded-lg bg-[#2a2a2a] shadow hover:bg-[#ff8c00] transition">
              <div className="flex items-center space-x-4">
                <FaHome size={22} className="text-[#ff8c00]" />
                <span className="text-white font-medium">Главная</span>
              </div>
              <IoIosArrowForward size={18} className="text-[#ff8c00]" />
            </div>
          </Link>

          <Link to="/store">
            <div className="flex items-center justify-between p-3 border border-[#ff8c00] rounded-lg bg-[#2a2a2a] shadow hover:bg-[#ff8c00] transition">
              <div className="flex items-center space-x-4">
                <FaStore size={22} className="text-[#ff8c00]" />
                <span className="text-white font-medium">О магазине</span>
              </div>
              <IoIosArrowForward size={18} className="text-[#ff8c00]" />
            </div>
          </Link>

          <Link to="/orders">
            <div className="flex items-center justify-between p-3 border border-[#ff8c00] rounded-lg bg-[#2a2a2a] shadow hover:bg-[#ff8c00] transition">
              <div className="flex items-center space-x-4">
                <TbFolderCheck size={22} className="text-[#ff8c00]" />
                <span className="text-white font-medium">История заказов</span>
              </div>
              <IoIosArrowForward size={18} className="text-[#ff8c00]" />
            </div>
          </Link>

          <Link to="/chat">
            <div className="flex items-center justify-between p-3 border border-[#ff8c00] rounded-lg bg-[#2a2a2a] shadow hover:bg-[#ff8c00] transition">
              <div className="flex items-center space-x-4">
                <BiSupport size={22} className="text-[#ff8c00]" />
                <span className="text-white font-medium">Служба поддержки</span>
              </div>
              <IoIosArrowForward size={18} className="text-[#ff8c00]" />
            </div>
          </Link>

          {isAdmin && (
            <Link to="/admin">
              <div className="flex items-center justify-between p-3 border border-[#ff8c00] rounded-lg bg-[#2a2a2a] shadow hover:bg-[#ff8c00] transition">
                <div className="flex items-center space-x-4">
                  <span className="text-[#ff8c00]">Админка</span>
                </div>
                <IoIosArrowForward size={18} className="text-[#ff8c00]" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;