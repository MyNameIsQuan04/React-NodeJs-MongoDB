import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const LayoutClient = () => {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto p-4 bg-gray-100">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LayoutClient;
