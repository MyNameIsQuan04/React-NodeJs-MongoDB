import { useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../contexts/CategoryContext";
import { Category } from "../../interfaces/Category";

const CategoryTable = () => {
  const { state, onRemove } = useContext(CategoryContext);
  console.log(state.categories);

  return (
    <div>
      <Link
        to={`/admin/category-add`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Thêm mới danh mục
      </Link>
      <table className="min-w-full bg-white border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {state.categories.map((p: Category) => (
            <tr key={p._id}>
              <td className="py-2 px-4 border-b">{p._id}</td>
              <td className="py-2 px-4 border-b">{p.name}</td>
              <td className="py-2 px-4 border-b">
                {p.description || "Dang cap nhat"}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mr-2"
                  onClick={() => onRemove(p._id!)}
                >
                  Delete
                </button>
                <Link
                  to={`/admin/category-edit/${p._id}`}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
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

export default CategoryTable;
