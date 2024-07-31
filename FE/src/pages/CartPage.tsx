import { useContext } from "react";
import { CartItem } from "../reducers/cartReducer";
import { CartContext, CartContextType } from "../contexts/CartContext";

const CartPage = () => {
  const { state, removeFromCart, checkout } = useContext(
    CartContext
  ) as CartContextType;
  console.log(state);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Gio hang cua ban!</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              STT
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              Ten san pham
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              So luong
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              Gia
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              Thanh tien
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              Xoa
            </th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((product: CartItem, index: number) => (
            <tr key={product.product._id} className="border-b">
              <td className="p-3 text-sm">{index + 1}</td>
              <td className="p-3 text-sm">{product.product.title}</td>
              <td className="p-3 text-sm">{product.quantity}</td>
              <td className="p-3 text-sm">{product.product.price}</td>
              <td className="p-3 text-sm">
                {product.product.price * product.quantity}
              </td>
              <td className="p-3 text-sm">
                <button
                  onClick={() => removeFromCart(String(product.product._id))}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Xoa
                </button>
              </td>
            </tr>
          ))}
          <tr className="bg-gray-200">
            <td colSpan={4} className="p-3 text-right font-semibold">
              Tong tien
            </td>
            <td className="p-3 text-sm">{state.totalPrice}</td>
            <td className="p-3 text-sm">
              <button
                onClick={checkout}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Thanh toan
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CartPage;
