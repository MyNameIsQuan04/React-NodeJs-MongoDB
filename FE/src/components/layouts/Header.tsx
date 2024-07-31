import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext) as AuthContextType;
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-gray-400">
              Giỏ Hàng
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-400">
              About
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-4">
          {user ? (
            <>
              <li className="flex items-center space-x-2">
                <span>Welcome, {user?.email}</span>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                >
                  Logout
                </button>
              </li>
              <li>
                <Link to="/admin" className="hover:text-gray-400">
                  You are admin?
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-400">
                  Login
                </Link>{" "}
                /
                <Link to="/register" className="hover:text-gray-400">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
