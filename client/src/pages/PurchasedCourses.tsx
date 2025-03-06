import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EmptyOrders from "./Orders";

interface Course {
  _id: string;
  title: string;
  description: string;
  images: string;
}

const PurchasedCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const userData = window.Telegram.WebApp.initDataUnsafe.user;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/${userData.id}/purchases`);
        setCourses(response.data);
      } catch (error) {
        console.error("Ошибка при получении курсов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (courses.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <div className="font-roboto bg-[#121212] min-h-screen text-white p-4">
      <h2 className="text-2xl font-bold mb-8">Мои курсы</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
            <img
              src={`${import.meta.env.VITE_API_URL}${course.images}`}
              alt={course.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-400 mb-4">{course.description}</p>
            <Link
              to={`/course/${course._id}`}
              className="bg-[#ff8c00] text-white px-4 py-2 rounded-lg hover:bg-[#e07b00] transition"
            >
              Перейти к курсу
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedCourses;