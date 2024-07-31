import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext, ProductContextType } from "../contexts/ProductContext";

function Home() {
  const { state } = useContext<ProductContextType>(ProductContext);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Danh sach san pham</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {state.products.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
          >
            <Link to={`/product-detail/${product._id}`}>
              <img
                src={product.images}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <Link
                to={`/product-detail/${product._id}`}
                className="text-lg font-semibold text-gray-800 hover:underline"
              >
                {product.title}
              </Link>
              <p className="text-gray-600 text-sm mb-2">${product.price}</p>
              <p className="text-gray-500 text-sm mb-4">
                {product.description}
              </p>
              <Link
                to={`/product-detail/${product._id}`}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Xem chi tiet
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
