import { useEffect, useState } from "react";
import People from "../../../assets/mainPeopleIcon.png";
import { FaUser, FaBox } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import StartPages from "../components/StartPages";
import axios from "axios";
const tg = window.Telegram?.WebApp;
const API_URL = import.meta.env.VITE_API_URL;

interface ProfileData {
  fullName: string;
  phoneNumber: string;
  email: string;
}

function HomePage() {
  const [showStartPages, setShowStartPages] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Гость",
    phoneNumber: "",
    email: "",
  });
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [animationState, setAnimationState] = useState<
    "entering" | "exiting" | "idle"
  >("idle");

  const userData = tg?.initDataUnsafe?.user;
  const userPhoto = userData?.photo_url || People;
  useEffect(() => {
    if (userData) {
      setProfileData((prev) => ({
        ...prev,
        fullName: userData.first_name || "Гость",
      }));
      axios
      .post(`${API_URL}/api/user`, {
        telegramId: userData.id,
        fullName: userData.first_name,
      })
      .then((response) => console.log("Пользователь сохранен:", response.data))
      .catch((error) => console.error("Ошибка регистрации пользователя:", error));
    }
  }, [userData]);

  useEffect(() => {
    if (isProfileModalVisible) {
      setAnimationState("entering");
    }
  }, [isProfileModalVisible]);

  const toggleProfileModal = () => {
    if (isProfileModalVisible) {
      setAnimationState("exiting");
      setTimeout(() => {
        setProfileModalVisible(false);
        setAnimationState("idle");
      }, 500);
    } else {
      setProfileModalVisible(true);
    }
  };

  const handleCloseStartPage = () => {
    setShowStartPages(false);
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
            src={userPhoto} 
            alt="people"
            className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-2 border-orange-400 shadow-lg object-cover"
          />
        </div>

        <div className="mt-6">
          <div className="font-bold text-lg">{profileData.fullName}</div>
        </div>

        <div className="border border-gray-700 rounded-lg p-4 shadow-md flex m-2 mt-12 bg-[#1E1E1E]">
          <FaUser className="mr-2 text-orange-400" size={20} />
          <button
            className="w-full flex justify-between items-center text-gray-300"
            onClick={toggleProfileModal}
          >
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

      {isProfileModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
          <div
            className={`bg-[#1E1E1E] p-6 rounded-lg max-w-lg w-full transform transition-all duration-500 ease-out ${
              animationState === "entering"
                ? "translate-y-0"
                : animationState === "exiting"
                ? "translate-y-full"
                : "translate-y-full"
            }`}
          >
            <h2 className="text-lg text-orange-400 font-semibold">
              Данные профиля
            </h2>
            <div className="mt-4">
              <p>
                <b>Имя:</b> {profileData.fullName}
              </p>
              <p>
                <b>Телефон:</b> {profileData.phoneNumber || "Не указано"}
              </p>
              <p>
                <b>Email:</b> {profileData.email || "Не указано"}
              </p>
            </div>
            <button
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg"
              onClick={toggleProfileModal}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;