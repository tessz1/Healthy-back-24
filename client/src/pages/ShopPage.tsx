import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";

declare global {
  interface Window {
    Telegram: any;
  }
}

const ProductCatalog = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses");
        setCourses(response.data);
      } catch (err) {
        setError("Ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    };

    
    console.log("Courses data (initial):", courses); 
    fetchCourses();


    courses.forEach((course) => {
      console.log(`Course: ${course.title}, Image URL: ${course.imageUrl}`);
    });

    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, [courses]);

  if (loading) {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="w-full min-h-screen bg-[#121212] px-4 py-8">
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-8 mt-12">
          Курсы
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-[#1E1E1E] border border-gray-700 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all flex flex-col h-full"
            >
              <div className="overflow-hidden h-48 mb-4">

                {course.images ? (
                  <img
                    src={`http://localhost:5000${course.images}`} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white">
                    Нет изображения
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                {course.description}
              </p>
              <p className="text-xl font-bold text-orange-500 mb-4">
                {course.price} ₽
              </p>
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400 transition-all w-full"
                onClick={() => {
                  if (window.Telegram?.WebApp) {
                    window.Telegram.WebApp.sendData(JSON.stringify(course));
                  }
                }}
              >
                Добавить
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
