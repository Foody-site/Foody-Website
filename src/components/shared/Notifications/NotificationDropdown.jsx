import { useState, useEffect } from "react";
import { api_url } from "../../../utils/ApiClient";

const NotificationDropdown = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // دالة تنسيق التاريخ
  const formatDate = (dateString) => {
    if (!dateString) return "منذ وقت قريب";

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now - date;
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInMinutes < 60) {
        return diffInMinutes <= 1 ? "منذ قليل" : `منذ ${diffInMinutes} دقيقة`;
      } else if (diffInHours < 24) {
        return `منذ ${diffInHours} ساعة`;
      } else if (diffInDays < 7) {
        return `منذ ${diffInDays} يوم`;
      } else {
        // تنسيق التاريخ: يوم/شهر/سنة
        return date.toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      }
    } catch (error) {
      return "منذ وقت قريب";
    }
  };

  // دالة لاستخراج أول حرف من كل كلمة
  const getMessageInitials = (message) => {
    if (!message) return "ن";

    const words = message.trim().split(" ");
    if (words.length === 1) {
      return words[0].charAt(0);
    } else {
      return words[0].charAt(0) + (words[1]?.charAt(0) || "");
    }
  };

  // دالة جلب الإشعارات
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(`${api_url}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.data || data || []);
      } else {
        console.error("Failed to fetch notifications:", response.status);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // جلب الإشعارات عند فتح القائمة
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        !event.target.closest(".notification-dropdown") &&
        !event.target.closest(".notification-bell")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="notification-dropdown absolute top-12 left-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 text-right">
          الإشعارات
        </h3>
      </div>

      {loading ? (
        <div className="p-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-1 mx-auto"></div>
          <p className="text-gray-500 mt-2">جاري تحميل الإشعارات...</p>
        </div>
      ) : notifications.length > 0 ? (
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="p-4 border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="flex items-start justify-between">
                <div className="text-left">
                  <p className="text-xs text-gray-500">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>
                <div className="flex-1 text-right">
                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex flex-col text-right">
                      <p className="text-sm text-gray-800 mb-1">
                        {notification.message || "نص الإشعار"}
                      </p>
                      {notification.description && (
                        <p className="text-xs text-gray-600">
                          {notification.description}
                        </p>
                      )}
                    </div>
                    <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {getMessageInitials(notification.message || "نص الإشعار")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-gray-500">لا توجد إشعارات جديدة</p>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
