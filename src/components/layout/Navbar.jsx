import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { FiSearch, FiBell } from "react-icons/fi";
import { MdDiscount } from "react-icons/md";
import { MdStorefront } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import logo from "/public/assets/common/logo.webp";
import NotificationDropdown from "../shared/Notifications/NotificationDropdown";
import apiClient from "../../utils/ApiClient";

const Navbar = () => {
  const [fullName, setFullName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [readTimeout, setReadTimeout] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("مطاعم");

  useEffect(() => {
    const state = location.state;
    if (state?.label) {
      setActiveTab(state.label);
      sessionStorage.setItem("tabState", JSON.stringify(state));
    } else {
      const savedTab = sessionStorage.getItem("tabState");
      if (savedTab) {
        const parsed = JSON.parse(savedTab);
        setActiveTab(parsed.label);
      }
    }
  }, [location]);

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

        const response = await apiClient.get("/auth/me");
        const userData = response.data;
        setUserRole(userData.role || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserRole();
  }, []);

  // دالة جلب عدد الرسائل غير المقروءة
  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await apiClient.get("/notifications/unread-count");
      setUnreadCount(response.data.count || 0);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  // جلب عدد الرسائل غير المقروءة عند تحميل الصفحة
  useEffect(() => {
    fetchUnreadCount();

    // تحديث العدد كل 30 ثانية
    const interval = setInterval(fetchUnreadCount, 30000);

    return () => clearInterval(interval);
  }, []);

  const getInitialsAvatar = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const initials =
      parts.length === 1 ? parts[0][0] : parts[0][0] + (parts[1]?.[0] || "");
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      initials
    )}&background=D71313&color=fff&bold=true`;
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("followed_chef_")) {
        localStorage.removeItem(key);
      }
    });

    window.location.reload();
  };

  // دالة تمييز كل الرسائل كمقروءة
  const markAllAsRead = async () => {
    try {
      const response = await apiClient.post("/notifications/mark-all-read");
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  // معالج النقر على أيقونة الجرس
  const handleNotificationClick = () => {
    const wasOpen = showNotifications;
    setShowNotifications(!showNotifications);

    if (!wasOpen && unreadCount > 0) {
      // إذا فُتحت الإشعارات، انتظر 3 ثواني ثم ميّز كل الرسائل كمقروءة
      const timeout = setTimeout(() => {
        markAllAsRead();
      }, 3000);
      setReadTimeout(timeout);
    } else if (wasOpen && readTimeout) {
      // إذا أُغلقت الإشعارات قبل انتهاء الوقت، ألغي التايمر
      clearTimeout(readTimeout);
      setReadTimeout(null);
    }
  };

  // إغلاق الإشعارات
  const handleCloseNotifications = () => {
    setShowNotifications(false);

    // إلغاء التايمر إذا كان شغال
    if (readTimeout) {
      clearTimeout(readTimeout);
      setReadTimeout(null);
    }
  };

  return (
    <div className="w-full border-b bg-white shadow-sm text-sm font-medium">
      {/* Top Row */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left Icons */}
        <div className="flex items-center gap-2 relative">
          <div
            className="bg-primary-1 text-white p-2 rounded-full cursor-pointer"
            onClick={() => navigate("/discount")}
          >
            <MdDiscount className="text-lg" />
          </div>
          <div
            className="bg-primary-1 text-white p-2 rounded-full cursor-pointer"
            onClick={() => navigate("/favorites")}
          >
            <MdFavorite className="text-lg" />
          </div>
          <div
            className="bg-primary-1 text-white p-2 rounded-full cursor-pointer relative notification-bell"
            onClick={handleNotificationClick}
          >
            <FaBell className="text-lg" />

            {/* عداد الرسائل غير المقروءة */}
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {unreadCount > 99 ? "99+" : unreadCount}
              </div>
            )}
          </div>

          {/* Notifications Dropdown Component */}
          <NotificationDropdown
            isOpen={showNotifications}
            onClose={handleCloseNotifications}
          />
        </div>

        {/* Logo Center */}
        <div className="flex items-center">
          <img src={logo} alt="Foody Logo" className="h-12 w-auto" />
        </div>

        {/* User Info Clickable */}
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate("/user-profile")}
        >
          <span className="text-gray-700">{fullName || "المستخدم"}</span>
          <img
            src={getInitialsAvatar(fullName)}
            alt="user"
            className="w-6 h-6 rounded-full"
          />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="relative border-t text-gray-700 py-2 px-4">
        <div className="flex justify-center gap-4 text-sm font-medium">
          <div className="flex flex-row-reverse justify-center gap-4 text-sm font-medium">
            <button
              className={`px-3 py-1 rounded ${
                activeTab === "مطاعم"
                  ? "bg-primary-1 text-white"
                  : "hover:text-primary-1"
              }`}
              onClick={() => {
                const tab = {
                  label: "مطاعم",
                  type: "category",
                  enum: "restaurant",
                };
                sessionStorage.setItem("tabState", JSON.stringify(tab));
                navigate("/", { state: tab });
              }}
            >
              الرئيسية
            </button>

            <button
              className={`px-3 py-1 rounded ${
                activeTab === "الشيفات"
                  ? "bg-primary-1 text-white"
                  : "hover:text-primary-1"
              }`}
              onClick={() => {
                const tab = {
                  label: "الشيفات",
                  type: "component",
                  component: "Chef",
                };
                sessionStorage.setItem("tabState", JSON.stringify(tab));
                navigate("/", { state: tab });
              }}
            >
              الشيفات
            </button>

            <button
              className={`px-3 py-1 rounded ${
                activeTab === "وصفات"
                  ? "bg-primary-1 text-white"
                  : "hover:text-primary-1"
              }`}
              onClick={() => {
                const tab = {
                  label: "وصفات",
                  type: "component",
                  component: "Recipe",
                };
                sessionStorage.setItem("tabState", JSON.stringify(tab));
                navigate("/", { state: tab });
              }}
            >
              الوصفات
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <button
            onClick={handleLogout}
            className="flex items-center border border-primary-1 text-primary-1 px-3 py-1 rounded gap-1 text-sm hover:bg-red-50"
          >
            تسجيل الخروج
          </button>
        </div>

        {/* Search Input with Business Button */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
          {/* Business Button - Only shown if role is BUSINESS */}
          {userRole === "BUSINESS" && (
            <button
              className="mr-2 bg-primary-1 text-white px-3 py-1 rounded flex items-center gap-1 text-sm hover:bg-red-700"
              onClick={() => navigate("/list")}
            >
              <MdStorefront className="text-lg" />
              <span>خاص بحساب الاعمال</span>
            </button>
          )}

          <div className="relative flex items-center border rounded overflow-hidden">
            <input
              type="text"
              placeholder="البحث"
              className="px-2 py-1 w-64 max-w-full text-sm focus:outline-none text-right"
            />
            <FiSearch className="mx-2 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
