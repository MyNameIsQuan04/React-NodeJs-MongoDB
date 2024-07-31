import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import { Product } from "../../interfaces/Product";

const ProductTable = () => {
  const { state, handleRemove } = useContext(ProductContext);
  console.log(state.products);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Hello, admin</h1>
      <Link
        to="/admin/product-add"
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add new product
      </Link>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="p-3 text-left text-sm font-semibold text-gray-700">
              ID
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">
              Title
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">
              Price
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">
              Description
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">
              Category
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">
              Thumbnail
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((p: Product, index: number) => (
            <tr key={p._id} className="border-b border-gray-200">
              <td className="p-3 text-sm">{index + 1}</td>
              <td className="p-3 text-sm">{p.title}</td>
              <td className="p-3 text-sm">{p.price}</td>
              <td className="p-3 text-sm">{p.description || "Updating"}</td>
              <td className="p-3 text-sm">
                {p.category?.toString() || "Updating"}
              </td>
              <td className="p-3 text-sm">
                {p.images ? (
                  <img
                    src={p.images}
                    alt="Thumbnail"
                    className="max-w-xs h-[200px]"
                  />
                ) : (
                  "Updating"
                )}
              </td>
              <td className="p-3 text-sm">
                <button
                  className="mr-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  onClick={() => handleRemove(p._id!)}
                >
                  Delete
                </button>
                <Link
                  to={`/admin/product-edit/${p._id}`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
