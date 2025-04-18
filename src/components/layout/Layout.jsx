import Navbar from "./Navbar";
import Footer from "./Footer";
import { Navigate, Outlet, useLocation } from "react-router";

const Layout = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default Layout;
