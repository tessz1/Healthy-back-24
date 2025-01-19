// import { useParams } from "react-router-dom";


// const ProductDetails = () => {
//   const { id } = useParams();
//   const product = id
//     ? mockProducts.find((p) => p.id === parseInt(id, 10))
//     : undefined;

//   if (!product) {
//     return (
//       <div className="text-center py-10 text-orange-400">Товар не найден</div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-[#121212] px-4 py-8">
//       <h2 className="text-2xl font-bold text-center text-gray-200 mb-8 mt-12">
//         Подробнее о товаре
//       </h2>
//       <div className="bg-[#1E1E1E] border border-gray-700 rounded-lg shadow-lg p-4 flex flex-col items-center">
//         <div className="overflow-hidden h-64 mb-4">
//           <img
//             src={product.imageUrl}
//             alt={product.name}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <h3 className="text-lg font-semibold text-gray-200 mb-2">
//           {product.name}
//         </h3>
//         <p className="text-sm text-gray-400 mb-4">{product.description}</p>
//         <p className="text-xl font-bold text-orange-500 mb-4">
//           {product.price} ₽
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
