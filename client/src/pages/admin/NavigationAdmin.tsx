import React from "react";
import { Link } from "react-router-dom";

function NavigationAdmin() {
  return (
    <div className="bg-black min-h-screen p-4 font-roboto">
      <div className="flex flex-col items-center mt-24 sm:mt-20">
        <ul className="w-full max-w-md space-y-4 ">
          <li className="rounded-xl p-2 bg-orange-400 text-white text-sm sm:text-base text-center hover:bg-orange-500 transition duration-300 sm:w-1/4">
            <Link to="/uploadCourse" className="block w-full h-full">
              Добавление курсов в магазин
            </Link>
          </li>
          <li className="rounded-xl p-2 bg-orange-400 text-white text-sm sm:text-base text-center hover:bg-orange-500 transition duration-300 sm:w-1/4">
            <Link to="/add-content" className="block w-full h-full">
              Добавление контента в курсы
            </Link>
          </li>
          <li className="rounded-xl p-2 bg-orange-400 text-white text-sm sm:text-base text-center hover:bg-orange-500 transition duration-300 sm:w-1/4">
            <Link to="/delete-course" className="block w-full h-full">
              Удаление курса
            </Link>
          </li>
          <li className="rounded-xl p-2 bg-orange-400 text-white text-sm sm:text-base text-center hover:bg-orange-500 transition duration-300 sm:w-1/4">
            <Link to="/createPromoCode" className="block w-full h-full">
              Промокоды
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavigationAdmin;