import { useEffect, useState } from "react";
import People from "../../../assets/mainPeopleIcon.png";
import { FaUser, FaBox } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import StartPages from "../components/StartPages";

const tg = window.Telegram?.WebApp;

interface ProfileData {
  fullName: string;
  phoneNumber: string;
  email: string;
}

function HomePage() {
  const [showStartPages, setShowStartPages] = useState(() => {
    return localStorage.getItem("firstVisit") !== "false";
  });

  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Гость",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    if (tg) {
      tg.expand();
      const user = tg.initDataUnsafe.user;
      if (user) {
        setProfileData({
          fullName:
            user.first_name + (user.last_name ? " " + user.last_name : ""),
          phoneNumber: "",
          email: "",
        });
      }
    }
  }, []);

  const handleCloseStartPage = () => {
    setShowStartPages(false);
    localStorage.setItem("firstVisit", "false");
  };

  if (showStartPages) {
    return <StartPages onClose={handleCloseStartPage} />;
  }

  return (
    <div className="w-full min-h-screen bg-[#121212] text-gray-200 font-roboto">
      <div className="max-w-5xl mx-auto text-center pt-6">
        <div className="text-orange-400 font-bold text-lg">Профиль</div>
        <div className="h-[2px] bg-orange-500 w-1/3 mx-auto mt-2 rounded-full"></div>

        <div className="flex items-center justify-center mt-12">
          <img
            src={People}
            alt="people"
            className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-2 border-orange-400 shadow-lg"
          />
        </div>

        <div className="mt-6">
          <div className="font-bold text-lg">{profileData.fullName}</div>
        </div>

        <div className="border border-gray-700 rounded-lg p-4 shadow-md flex m-2 mt-12 bg-[#1E1E1E]">
          <FaUser className="mr-2 text-orange-400" size={20} />
          <button className="w-full flex justify-between items-center text-gray-300">
            <span>Данные профиля</span>
            <IoIosArrowForward className="text-orange-400" size={15} />
          </button>
        </div>

        <div>
          <Link to="/orders">
            <div className="border border-gray-700 rounded-lg p-4 shadow-md flex m-2 bg-[#1E1E1E]">
              <FaBox className="mr-2 text-orange-400" size={20} />
              <button className="w-full flex justify-between items-center text-gray-300">
                <span>Мои заказы</span>
                <IoIosArrowForward className="text-orange-400" size={15} />
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
