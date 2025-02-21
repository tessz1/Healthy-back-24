import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TextBlock from "./TextBlock";
import VideoBlock from "./VideoBlock";

interface CourseContent {
  type: string;
  title: string;
  description: string;
  content: any;
  order: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  images: string;
  content: CourseContent[];
}

const CoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        //  данные о курсе
        const response = await axios.get(`http://localhost:5000/api/course/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!course) {
    return <div>Курс не найден</div>;
  }

  return (
    <div className="font-roboto bg-[#121212] min-h-screen text-white p-4">
      <h2 className="text-2xl font-bold mb-8">{course.title}</h2>
      <img
        src={`http://localhost:5000${course.images}`}
        alt={course.title}
        className="w-full h-48 object-cover rounded-md mb-8"
      />
      <div className="space-y-4">
        {course.content.map((block) => (
          <div key={block._id}>
            {block.type === "text" && <TextBlock {...block} />}
            {block.type === "video" && <VideoBlock {...block} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;