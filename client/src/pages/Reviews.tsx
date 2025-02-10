import React from "react";
import { Link } from "react-router-dom";
function Reviews() {
  return (
    <div className="w-full mt-20 max-w-1xl bg-[#121212] text-gray-200 font-roboto min-h-screen flex flex-col items-center px-4 md:px-6 py-6">
      <div className="flex flex-col space-y-3 max-w-2xl w-full">
        <div className="text-3xl text-center">Отзывы</div>
        <div className="text-center">
          Смотрите и читайте отзывы от людей, которым мы помогли восстановить
          спину после операции или улучшить осанку.
        </div>

        <div className="relative w-full overflow-hidden pt-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://rutube.ru/play/embed/e403e67359de2104e889e0a4b4cd013a/"
            allow="clipboard-write; autoplay"
            allowFullScreen
            title="RuTube Video"
          ></iframe>
        </div>
        <div className="text-xl text-center p-4">
          Видеоотзывы Подборка видеоотзывов от наших довольных клиентов, которые
          делятся своими историями успеха.
        </div>
        <div className="text-center">
          <Link to="/shop">
            <button className="bg-[#ff8c00] text-white font-bold hover:bg-green-600 duration-150   rounded-2xl p-4">
              Хочу здоровую спину!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
