import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <header className="bg-gray-800">
        <Header />
      </header>
      <main className="max-w-[1200px] mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
