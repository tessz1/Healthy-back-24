import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const ProductCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (err) {
        setError("Ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#121212] px-4 py-8">
      <Header />
      <h2 className="text-2xl font-bold text-center text-gray-200 mb-8 mt-12">
        Каталог товаров
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-[#1E1E1E] border border-gray-700 rounded-lg shadow-lg p-4 hover:shadow-xl transition-all max-w-xs mx-auto flex flex-col h-full"
          >
            <div className="overflow-hidden h-48 mb-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-3">
              {product.description}
            </p>
            <p className="text-xl font-bold text-orange-500 mb-4">
              {product.price} ₽
            </p>
            <div className="flex justify-between mt-auto">
              <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400 transition-all w-1/2 mr-2">
                Купить
              </button>
              <Link
                to={`/product/${product._id}`}
                className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition-all w-1/2 ml-2 text-center"
              >
                Узнать больше
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
