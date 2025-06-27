import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FiSearch, FiBell, FiMapPin } from "react-icons/fi";
import { GiKnifeFork } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { MdStorefront } from "react-icons/md";   
import { api_url } from './../../utils/ApiClient';

const Navbar = () => {
  const [fullName, setFullName] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setFullName(parsedUser.fullName || "");
      } catch {
        setFullName("");
      }
    }

    // Fetch user role from auth API
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${api_url}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserRole(userData.role || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserRole();
  }, [api_url]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.reload(); 
  };

  return (
    <div
      className="w-full border-b bg-white shadow-sm text-sm font-medium"
      dir="rtl"
    >
      {/* Top Row */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left Icons */}
        <div className="flex items-center gap-2">
          <div
            className="bg-red-600 text-white p-2 rounded-full"
            onClick={() => navigate("/under-construction")}
          >
            <MdDiscount className="text-lg" />
          </div>
        </div>

        {/* Logo Center */}
        <div className="flex flex-col items-center text-red-600 font-bold text-sm">
          <GiKnifeFork className="text-2xl" />
          <span>FOODY</span>
          <span className="text-xs text-red-500">فودي</span>
        </div>

        {/* User Info Clickable */}
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate("/user-profile")}
        >
          <span className="text-gray-700">{fullName || "المستخدم"}</span>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="user"
            className="w-6 h-6 rounded-full"
          />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="relative border-t text-gray-700 py-2 px-4">
        <div className="flex justify-center gap-4 text-sm font-medium">
          <button
            className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={() => navigate("/")}
          >
            الرئيسية
          </button>
          <button className="hover:text-red-600" onClick={() => navigate("/")}>
            الشيفات
          </button>
          <button className="hover:text-red-600" onClick={() => navigate("/")}>
            الوصفات
          </button>
        </div>

        {/* Logout Button */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <button
            onClick={handleLogout}
            className="flex items-center border border-red-600 text-red-600 px-3 py-1 rounded gap-1 text-sm hover:bg-red-50"
          >
            تسجيل الخروج
          </button>
        </div>

        {/* Search Input with Business Button */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
          <div className="relative flex items-center border rounded overflow-hidden">
            <input
              type="text"
              placeholder="البحث"
              className="px-2 py-1 w-64 max-w-full text-sm focus:outline-none text-right"
            />
            <FiSearch className="mx-2 text-gray-500" />
          </div>

          {/* Business Button - Only shown if role is BUSINESS */}
          {userRole === "BUSINESS" && (
            <button
              className="mr-2 bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm hover:bg-red-700"
              onClick={() => navigate("/list")}
            >
              <MdStorefront className="text-lg" />
              <span>خاص بحساب الاعمال</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
