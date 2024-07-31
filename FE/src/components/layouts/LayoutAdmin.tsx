import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";

const LayoutAdmin = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  if (user?.role !== "admin") {
    return (
      <h1 className="text-center text-red-600">
        Access denied. You are not an admin.
      </h1>
    );
  }

  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hello Admin</h1>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/hosts" className="hover:text-gray-400">
                Quản lý host
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-gray-400">
                Xem thống kê
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <div className="container mx-auto mt-4 flex">
        <aside className="w-1/4 bg-gray-100 p-4">
          <div className="sidebar">
            <ul className="space-y-2">
              <li>
                <Link to="/admin" className="block p-2 hover:bg-gray-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/users" className="block p-2 hover:bg-gray-200">
                  User
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products"
                  className="block p-2 hover:bg-gray-200"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/categories"
                  className="block p-2 hover:bg-gray-200"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/brands"
                  className="block p-2 hover:bg-gray-200"
                >
                  Brands
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <main className="w-3/4 bg-white p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default LayoutAdmin;
