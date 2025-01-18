import { useState, useEffect } from "react";
import People from "../../public/mainPeopleIcon.png";
import { FaUser, FaBox } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

interface ProfileData {
  fullName: string;
  phoneNumber: string;
  email: string;
}

function HomePage() {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "",
    phoneNumber: "",
    email: "",
  });


  useEffect(() => {
    const storedData = localStorage.getItem("profileData");
    if (storedData) {
      setProfileData(JSON.parse(storedData)); 
    }
  }, []);

  const handleToggleProfileForm = () => {
    setShowProfileForm(!showProfileForm);
  };

  const handleSubmitProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const fullName = formData.get("fullName");
    const phoneNumber = formData.get("phoneNumber");
    const email = formData.get("email");

    if (fullName && phoneNumber && email) {
      const newProfileData = {
        fullName: fullName as string,
        phoneNumber: phoneNumber as string,
        email: email as string,
      };

      setProfileData(newProfileData); 
      localStorage.setItem("profileData", JSON.stringify(newProfileData)); // Сохраняем данные в localStorage
    }
    setShowProfileForm(false);
  };

  return (
    <div className="w-full max-w-5xl text-center bg-[#121212] overflow-hidden text-gray-200 font-roboto min-h-screen relative">
      <div className="pt-6 text-orange-400 font-bold text-lg">Профиль</div>

      <div className="h-[2px] bg-orange-500 w-1/3 mx-auto mt-2 rounded-full"></div>

      <div className="flex items-center justify-center mt-12">
        <img
          src={People}
          alt="people"
          className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-2 border-orange-400 shadow-lg"
        />
      </div>

      <div className="mt-6">
        <div className="font-bold text-lg">
          {profileData.fullName || "Name"}
        </div>{" "}
      </div>

      <div className="border border-gray-700 rounded-lg p-4 shadow-md flex m-2 mt-12 bg-[#1E1E1E]">
        <FaUser className="mr-2 text-orange-400" size={20} />
        <button
          className="w-full flex justify-between items-center text-gray-300"
          onClick={handleToggleProfileForm}
        >
          <span>Данные профиля</span>
          <IoIosArrowForward className="text-orange-400" size={15} />
        </button>
      </div>

      <div
        className={`absolute left-0 w-full sm:w-[calc(92%-10px)] md:w-[calc(75%-10px)] p-4 bg-[#1E1E1E] rounded-lg shadow-md border border-gray-700 transition-all duration-500 ease-in-out transform ${
          showProfileForm
            ? "translate-y-24 opacity-100"
            : "translate-y-full opacity-0"
        }`}
        style={{
          bottom: "11%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <form onSubmit={handleSubmitProfile}>
          <div className="text-gray-300 mb-4 text-left">
            Введите данные профиля:
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-left">ФИО</label>
            <input
              type="text"
              name="fullName"
              placeholder="Введите ФИО"
              className="w-full p-2 mt-2 bg-[#2A2A2A] border border-gray-600 rounded-lg text-gray-200"
              defaultValue={profileData.fullName} 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-left">Контакты</label>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-2">
              <div className="flex-1">
                <label className="block text-gray-400">Номер телефона</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Введите номер телефона"
                  className="w-full p-2 mt-2 bg-[#2A2A2A] border border-gray-600 rounded-lg text-gray-200"
                  defaultValue={profileData.phoneNumber} 
                />
              </div>

              <div className="flex-1">
                <label className="block text-gray-400">Почта</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Введите почту"
                  className="w-full p-2 mt-2 bg-[#2A2A2A] border border-gray-600 rounded-lg text-gray-200"
                  defaultValue={profileData.email} 
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-all duration-300">
              Отправить
            </button>
          </div>
        </form>
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
  );
}

export default HomePage;
