import { useState, useEffect } from "react";
import Header from "../components/Header";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Товар 1",
    price: 1999,
    description: "Подробное описание товара 1, его особенности и преимущества. Это может быть длинный текст о товаре.",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    name: "Товар 2",
    price: 2999,
    description: "Подробное описание товара 2, его особенности и преимущества. Это может быть длинный текст о товаре.",
    imageUrl: "https://picsum.photos/200/200",
  },
  {
    id: 3,
    name: "Товар 3",
    price: 1599,
    description: "Подробное описание товара 3, его особенности и преимущества. Это может быть длинный текст о товаре.",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    id: 4,
    name: "Товар 4",
    price: 2499,
    description: "Подробное описание товара 4, его особенности и преимущества. Это может быть длинный текст о товаре.",
    imageUrl: "https://picsum.photos/200/300",
  },
];

const ProductCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeProductId, setActiveProductId] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleProductDetails = (productId: number) => {
    setActiveProductId((prevState) =>
      prevState === productId ? null : productId
    );
  };

  const closeProductDetails = () => {
    setActiveProductId(null); 
  };

  if (loading) {
    return <div className="text-center py-10 text-orange-400">Загрузка...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#121212] px-4 py-8">
      <Header />
      <h2 className="text-2xl font-bold text-center text-gray-200 mb-8 mt-12">Каталог товаров</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#1E1E1E] border border-gray-700 rounded-lg shadow-lg p-4 hover:shadow-xl transition-all max-w-xs mx-auto flex flex-col h-full"
          >
            <div className="overflow-hidden h-48 mb-4">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">{product.name}</h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-3">{product.description}</p> {/* Ограничиваем описание */}
            <p className="text-xl font-bold text-orange-500 mb-4">{product.price} ₽</p>
            <div className="flex justify-between mt-auto">
              <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400 transition-all w-1/2 mr-2">
                Купить
              </button>
              <button
                className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition-all w-1/2 ml-2"
                onClick={() => toggleProductDetails(product.id)}
              >
                Узнать больше
              </button>
            </div>

         
            {activeProductId === product.id && (
              <div
                className={`fixed left-0 w-full sm:w-[calc(92%-10px)] md:w-[calc(75%-10px)] p-6 bg-[#1E1E1E] rounded-lg shadow-md border border-gray-700 transition-all duration-500 ease-in-out transform ${
                  activeProductId === product.id
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                }`}
                style={{
                  bottom: "0",
                  maxHeight: "80vh", 
                  overflowY: "auto",
                  zIndex: 999, 
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-300">Подробнее о товаре</h3>
                  <button
                    className="text-gray-400 hover:text-gray-200"
                    onClick={closeProductDetails}
                  >
                    Закрыть
                  </button>
                </div>
                <p className="text-sm text-gray-400">{product.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
