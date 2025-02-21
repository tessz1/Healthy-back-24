import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";



const tg = window.Telegram?.WebApp;

const Chat = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Гость",
  })
  
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Привет! Как я могу помочь?" }
  ]);
  const [input, setInput] = useState<string>("");

  const userData = tg?.initDataUnsafe?.user
  

  useEffect(() => {
    if(userData) {
      setProfileData((prev) => ({
       ...prev,
        fullName: userData.first_name || "Гость",
      }));
    }
  }, [userData])




  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botResponse = { sender: "bot", text: "Это автоответчик. Я пока учусь." };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="w-full h-screen bg-[#121212] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 text-gray-200 pt-20">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded-lg max-w-xs ${
              msg.sender === "user" ? "bg-orange-500 ml-auto" : "bg-[#1E1E1E] mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700 bg-[#1E1E1E] flex">
        <input
          type="text"
          className="flex-1 p-2 bg-[#2A2A2A] border border-gray-600 rounded-lg text-gray-200"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
        />
        <button
          className="ml-2 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400"
          onClick={sendMessage}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chat;
