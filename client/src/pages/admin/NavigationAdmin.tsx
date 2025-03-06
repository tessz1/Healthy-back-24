import React from "react";
import { Link } from "react-router-dom";

function NavigationAdmin() {
  return (
    <div className="bg-gray-900 min-h-screen p-4 font-roboto flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <ul className="space-y-6">
          <li className="rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
            <Link
              to="/uploadCourse"
              className="block bg-gradient-to-r from-orange-400 to-orange-600 text-white text-lg sm:text-xl font-semibold py-4 px-6 text-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-700"
            >
              Добавление курсов в магазин
            </Link>
          </li>
          <li className="rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
            <Link
              to="/createPromoCode"
              className="block bg-gradient-to-r from-purple-400 to-purple-600 text-white text-lg sm:text-xl font-semibold py-4 px-6 text-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700"
            >
              Промокоды
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavigationAdmin;
