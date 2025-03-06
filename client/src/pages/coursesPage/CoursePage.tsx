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

  const testCourse: Course = {
    _id: "1",
    title: "Тестовый курс по React",
    description:
      "Этот курс поможет вам изучить основы React и создавать современные веб-приложения.",
    images: "/images/test-course.jpg",
    content: [
      {
        type: "text",
        title: "Введение в React",
        description: "Основные концепции и принципы React.",
        content:
          "React — это JavaScript-библиотека для создания пользовательских интерфейсов. Она позволяет создавать компоненты, которые управляют своим состоянием и могут быть переиспользованы.",
        order: 1,
        _id: "1a",
        createdAt: "2023-10-01T00:00:00.000Z",
        updatedAt: "2023-10-01T00:00:00.000Z",
      },
      {
        type: "video",
        title: "Установка и настройка React",
        description:
          "Как установить React и настроить окружение для разработки.",
        content: "https://rutube.ru/play/embed/fc90bc7ece1923acfdb459a8786b1b8e/",
        order: 2,
        _id: "1b",
        createdAt: "2023-10-02T00:00:00.000Z",
        updatedAt: "2023-10-02T00:00:00.000Z",
      },
      {
        type: "text",
        title: "Компоненты и JSX",
        description: "Как создавать компоненты и использовать JSX.",
        content:
          "JSX — это синтаксический сахар, который позволяет писать HTML-подобный код в JavaScript. Компоненты — это строительные блоки React-приложений.",
        order: 3,
        _id: "1c",
        createdAt: "2023-10-03T00:00:00.000Z",
        updatedAt: "2023-10-03T00:00:00.000Z",
      },
      {
        type: "video",
        title: "Работа с состоянием",
        description: "Как управлять состоянием в React-компонентах.",
        content: "https://rutube.ru/play/embed/fc90bc7ece1923acfdb459a8786b1b8e/",
        order: 4,
        _id: "1d",
        createdAt: "2023-10-04T00:00:00.000Z",
        updatedAt: "2023-10-04T00:00:00.000Z",
      },
    ],
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        //   //  данные о курсе
          const response = await axios.get(`$process.env.VITE_API_URL}/api/course/${courseId}`);
        // setCourse(response.data);
        setCourse(testCourse);
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
        src={`${import.meta.env.VITE_API_URL}${course.images}`}
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
