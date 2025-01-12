import { MdPeopleAlt, MdOutlineShoppingBag, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative flex justify-center h-screen bg-[#f2f6ff]">
      <div className="w-full max-w-xl text-center flex flex-row space-x-6 p-4 z-10">
        <Link to="/profile" className="flex justify-center">
          <MdPeopleAlt className="ml-2" size={40} />
        </Link>
        <Link to="/orders" className="flex justify-center">
          <MdPeopleAlt className="mt-1 border rounded-2xl p-1" size={30} />
        </Link>

        <Link to="/profile" className="flex justify-center">
          <span className="mt-1">Профиль</span>
          <IoIosArrowForward className="ml-1 mt-2" size={15} />
        </Link>
        <div className="flex justify-end space-x-4 ml-auto">
          <Link to="/shopping" className="flex justify-center">
            <MdOutlineShoppingBag
              className="rounded-2xl border p-1 bg-white ml-8"
              size={35}
            />
          </Link>
          <div className="cursor-pointer" onClick={toggleMenu}>
            {isMenuOpen ? (
              <MdClose size={35} className="rounded-2xl border p-2 bg-white" />
            ) : (
              <CiMenuFries
                size={35}
                className="rounded-2xl border p-2 bg-white after:scale-50 transform"
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 w-full h-full bg-white text-white p-4 transform transition-transform duration-300 ease-in-out z-1 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      ></div>
    </div>
  );
}

export default Header;
