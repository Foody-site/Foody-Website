import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import apiClient from "../../utils/ApiClient";
import Alert from "../shared/Alert/Alert";

// القيم الثابتة المطلوبة
const CURRENT_DATE_TIME = "2025-06-19 18:14:13";
const CURRENT_USER_LOGIN = "Amr3011";

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSubMessage, setAlertSubMessage] = useState("");

  useEffect(() => {
    console.log(
      `Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${CURRENT_DATE_TIME}`
    );
    console.log(`Current User's Login: ${CURRENT_USER_LOGIN}`);

    handleCallback();
  }, []);

  // المعالجة الرئيسية للاستجابة
  const handleCallback = async () => {
    try {
      // 1. استخراج معلمة state من URL
      const urlParams = new URLSearchParams(location.search);
      const state = urlParams.get("state");

      console.log("State token extracted from URL:", state);

      if (!state) {
        throw new Error("معلمة State غير موجودة في URL");
      }

      // 2. إرسال طلب POST إلى /auth/state مع قيمة state
      console.log("Sending state to /auth/state API...");
      const response = await apiClient.post("/auth/state", { state });

      console.log("Response received from /auth/state:", response.data);

      // 3. التحقق من صحة الاستجابة
      if (
        response.data &&
        response.data.accessToken &&
        response.data.refreshToken
      ) {
        // 4. تخزين التوكنات
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        // 5. تخزين بيانات المستخدم
        const userData = { role: response.data.role };
        localStorage.setItem("user", JSON.stringify(userData));

        console.log("Tokens and user data stored successfully");
        console.log("User role:", response.data.role);

        // 6. تحديد مسار إعادة التوجيه بناءً على الدور
        let redirectPath;
        if (response.data.role === null || response.data.role === undefined) {
          redirectPath = "/choose-role-with-google";
        } else if (response.data.role === "CUSTOMER") {
          redirectPath = "/";
        } else if (response.data.role === "BUSINESS") {
          redirectPath = "/list";
        } else {
          redirectPath = "/";
        }

        localStorage.setItem("redirectPath", redirectPath);
        console.log("Redirect path set to:", redirectPath);

        // 7. إظهار تنبيه النجاح
        showAlert(
          "success",
          "تم تسجيل الدخول ",
          `سيتم توجيهك إلى ${getRedirectLabel(redirectPath)}`
        );
      } else {
        throw new Error(
          "استجابة API غير صالحة أو لا تحتوي على التوكنات المطلوبة"
        );
      }
    } catch (error) {
      console.error("Error during authentication process:", error);
      setError(error.message || "حدث خطأ أثناء عملية تسجيل الدخول");

      showAlert(
        "error",
        "فشل تسجيل الدخول",
        error.response?.data?.message ||
          error.message ||
          "حدث خطأ أثناء معالجة المصادقة"
      );
    } finally {
      setLoading(false);
    }
  };

  // الحصول على تسمية المسار للعرض
  const getRedirectLabel = (path) => {
    switch (path) {
      case "/choose-role-with-google":
        return "صفحة اختيار الدور";
      case "/":
        return "الصفحة الرئيسية";
      case "/list":
        return "صفحة القائمة";
      default:
        return path;
    }
  };

  // وظيفة مساعدة لعرض التنبيهات
  const showAlert = (type, message, subMessage) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertSubMessage(subMessage);
    setAlertOpen(true);
  };

  // معالج إغلاق التنبيه
  const handleAlertClose = () => {
    setAlertOpen(false);

    if (alertType === "success") {
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      navigate(redirectPath, { replace: true });
      localStorage.removeItem("redirectPath");
    } else {
      navigate("/login", { replace: true });
    }
  };

  // التوجيه اليدوي
  const handleContinueClick = () => {
    const redirectPath = localStorage.getItem("redirectPath") || "/";
    navigate(redirectPath, { replace: true });
    localStorage.removeItem("redirectPath");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Alert
        message={alertMessage}
        subMessage={alertSubMessage}
        isOpen={alertOpen}
        type={alertType}
        onClose={handleAlertClose}
      />

      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">معالجة تسجيل الدخول</h1>

        {loading ? (
          <div className="py-8">
            <div className="w-12 h-12 border-4 border-primary-1 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري معالجة تسجيل الدخول...</p>
          </div>
        ) : error ? (
          <div className="py-4">
            <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
              <p className="font-bold mb-1">حدث خطأ</p>
              <p>{error}</p>
            </div>
            <button
              onClick={() => navigate("/login", { replace: true })}
              className="px-4 py-2 bg-primary-1 text-white rounded-md hover:bg-hover_primary-1"
            >
              العودة للصفحة الرئيسية
            </button>
          </div>
        ) : (
          <div className="py-4">
            <div className="text-green-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xl font-bold">تم تسجيل الدخول بنجاح!</p>
            </div>
            <p className="text-gray-600 mb-6">
              سيتم توجيهك تلقائيًا في لحظات...
            </p>
            <button
              onClick={handleContinueClick}
              className="px-6 py-2 bg-primary-1 text-white rounded-md hover:bg-hover_primary-1 transition duration-200"
            >
              متابعة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
