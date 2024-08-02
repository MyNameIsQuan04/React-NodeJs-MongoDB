import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../interfaces/Product";
import instance from "../api";
import { CartContext } from "../contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product>({} as Product);

  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/products/${id}`);
      setProduct(data.data);
    })();
  }, [id]);

  const { addToCart } = useContext(CartContext);
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    addToCart(product._id as string, quantity);
    alert("Added to cart successfully");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Detail</h1>
      <img
        className="w-full h-auto mb-4"
        src={product.images}
        alt={product.title}
      />
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-lg text-gray-700 mb-4">${product.price}</p>
      <div className="flex items-center mb-4">
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={handleQuantityChange}
          className="border rounded px-2 py-1 w-16 text-center"
        />
        <button
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
