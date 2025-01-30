import mainLogo from "../../../assets/mainLogo.png";

interface StartPagesProps {
  onClose: () => void;
}

function StartPages({ onClose }: StartPagesProps) {
  return (
    <div className="w-full max-w-5xl bg-[#121212] text-gray-200 font-roboto min-h-screen flex flex-col items-center px-4 md:px-6 py-6">
      <div className="flex flex-col space-y-3 max-w-2xl">
        <div>
          <img src={mainLogo} alt="mainLogo" />
        </div>
        <div className="text-gray-200 text-base sm:text-lg md:text-xl leading-normal">
          Здоровая спина — основа здоровья, красоты и молодости. Это жизнь без боли и ограничений.
        </div>
        <div className="text-gray-200 text-base sm:text-lg md:text-xl leading-normal">
          Реабилитация после операции, коррекция осанки и программы для офисных сотрудников. Это не просто тренировки — это новый образ жизни.
        </div>
        <div className="text-gray-200 text-sm sm:text-base leading-relaxed">
          <ul className="space-y-2">
            <li>✅ Избавься от боли в спине и шее.</li>
            <li>✅ Почувствуй легкость и энергию.</li>
            <li>✅ Улучши осанку и уверенность.</li>
            <li>✅ Забудь о головных болях.</li>
            <li>✅ Верни свободу движения.</li>
          </ul>
        </div>
        <div className="text-gray-200 text-sm sm:text-base leading-relaxed">
          <ul className="space-y-2">
            <li>💡 <b>Специалисты ЦИТО:</b> Проверенные методики.</li>
            <li>🛠 <b>Минимум оборудования:</b> Занятия в офисе.</li>
            <li>📱 <b>Простота:</b> Формат через Telegram-бот.</li>
            <li>🏆 <b>Результат:</b> Здоровье и комфорт.</li>
          </ul>
        </div>
        <button 
          className="bg-black text-white text-base font-medium rounded-lg py-3 px-6 mt-4 hover:bg-gray-800 transition"
          onClick={onClose} 
        >
          Начать
        </button>
      </div>
    </div>
  );
}

export default StartPages;
