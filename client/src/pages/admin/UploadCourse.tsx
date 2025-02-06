import { useState } from "react";
import axios from "axios";

declare global {
  interface Window {
    Telegram: any;
  }
}

const UploadCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [instructor, setInstructor] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("duration", duration);
    formData.append("instructor", instructor);

    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/courses",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("Курс успешно загружен!");
      setMessageType("success");
      console.log("Курс успешно загружен:", response.data);
    } catch (error) {
      setMessage("Ошибка загрузки курса. Попробуйте еще раз.");
      setMessageType("error");
      console.error("Ошибка загрузки курса:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#121212] px-4 py-8">
      <h2 className="text-2xl font-bold text-center text-gray-200 mb-8 mt-12">
        Добавить курс
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Название курса"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 bg-[#1E1E1E] text-gray-200 border border-gray-700 rounded"
          />
        </div>
        <div>
          <textarea
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 bg-[#1E1E1E] text-gray-200 border border-gray-700 rounded"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full px-4 py-2 bg-[#1E1E1E] text-gray-200 border border-gray-700 rounded"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Длительность"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full px-4 py-2 bg-[#1E1E1E] text-gray-200 border border-gray-700 rounded"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Преподаватель"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            required
            className="w-full px-4 py-2 bg-[#1E1E1E] text-gray-200 border border-gray-700 rounded"
          />
        </div>
        <div>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full px-4 py-2 bg-[#1E1E1E] text-gray-200 border border-gray-700 rounded"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-400 transition-all disabled:opacity-50"
          >
            {loading ? "Загружается..." : "Загрузить курс"}
          </button>
        </div>
      </form>

      {message && (
        <div
          className={`mt-6 p-4 rounded-md text-center ${
            messageType === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default UploadCourse;
