import React, { useState } from "react";
import axios from "axios";

interface AddCourseContentProps {
  courseId: string;
  onContentAdded: () => void;
}

const AddCourseContent: React.FC<AddCourseContentProps> = ({ courseId, onContentAdded }) => {
  const [content, setContent] = useState({
    type: "video",
    title: "",
    description: "",
    content: "",
    order: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newContent = { ...content, courseId };
      await axios.post("http://localhost:5000/api/course-content", newContent);
      alert("Контент успешно добавлен!");
      setContent({
        type: "video",
        title: "",
        description: "",
        content: "",
        order: 0,
      });
      onContentAdded(); 
    } catch (error) {
      console.error("Ошибка при добавлении контента:", error);
    }
  };

  return (
    <div className="bg-black">
    <div className="font-roboto bg-[#121212] h-screen text-white p-6 shadow-lg mt-20">
      <h2 className="text-2xl font-bold mb-4">Добавить контент к курсу</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="type"
          value={content.type}
          onChange={handleChange}
          className="w-full p-2 bg-[#1e1e1e] rounded-lg"
        >
          <option value="video">Видео</option>
          <option value="text">Текст</option>
          <option value="quiz">Тест(Пока не работает)</option>
          <option value="assignment">Домашнее задание</option>
        </select>
        <input
          type="text"
          name="title"
          placeholder="Название блока"
          value={content.title}
          onChange={handleChange}
          className="w-full p-2 bg-[#1e1e1e] rounded-lg"
        />
        <textarea
          name="description"
          placeholder="Описание блока"
          value={content.description}
          onChange={handleChange}
          className="w-full p-2 bg-[#1e1e1e] rounded-lg"
        />
        <input
          type="text"
          name="content"
          placeholder="Ссылка на контент (URL видео, текст и т.д.)"
          value={content.content}
          onChange={handleChange}
          className="w-full p-2 bg-[#1e1e1e] rounded-lg"
        />
        <input
          type="number"
          name="order"
          placeholder="Порядок отображения"
          value={content.order}
          onChange={handleChange}
          className="w-full p-2 bg-[#1e1e1e] rounded-lg"
        />
        <button
          type="submit"
          className="bg-[#ff8c00] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#e07b00] transition"
        >
          Добавить контент
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddCourseContent;