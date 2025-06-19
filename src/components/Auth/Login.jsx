import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../shared/Buttons/Button";
import Inputs from "../shared/inputs/Inputs";
//import Footer from "../layout/Footer";
import { api_url } from "../../utils/ApiClient";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from "react-router";
import TestimonialCard from "../shared/Testimonials/TestimonialCard";
import Alert from "../shared/Alert/Alert";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSubMessage, setAlertSubMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // القيم الثابتة المطلوبة
  const currentDateTime = "2025-06-19 17:53:07";
  const currentUserLogin = "Amr3011";

  useEffect(() => {
    // طباعة المعلومات الثابتة في وحدة التحكم
    console.log(
      `Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${currentDateTime}`
    );
    console.log(`Current User's Login: ${currentUserLogin}`);

    // التحقق من عودة المستخدم من مصادقة Google
    const urlParams = new URLSearchParams(location.search);
    const status = urlParams.get("status");

    // إذا كان هناك حالة مصادقة، فقم بمعالجتها
    if (status === "authenticated") {
      console.log("Authentication status detected:", status);
      handleSocialLoginCallback(urlParams);
    }
  }, [location]);

  // معالجة استجابة تسجيل الدخول الاجتماعي
  const handleSocialLoginCallback = (params) => {
    try {
      // استخراج التوكنات من معلمات URL
      const accessToken = params.get("accessToken");
      const refreshToken = params.get("refreshToken");

      console.log("Processing social login callback");
      console.log("Status:", params.get("status"));
      console.log("Access Token found in URL?", !!accessToken);
      console.log("Refresh Token found in URL?", !!refreshToken);

      if (accessToken && refreshToken) {
        // تخزين التوكنات
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // جلب معلومات المستخدم باستخدام التوكن
        fetchUserInfo(accessToken);
      } else {
        console.error("Tokens not found in URL parameters");
        showAlert(
          "error",
          "خطأ في تسجيل الدخول",
          "لم يتم العثور على بيانات المصادقة المطلوبة"
        );
      }
    } catch (error) {
      console.error("Error processing social login callback:", error);
      showAlert(
        "error",
        "خطأ في تسجيل الدخول",
        "حدث خطأ أثناء معالجة استجابة تسجيل الدخول الاجتماعي"
      );
    }
  };

  // جلب معلومات المستخدم وفحص الدور
  const fetchUserInfo = async (token) => {
    try {
      const userResponse = await axios.get(`${api_url}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = userResponse.data;
      localStorage.setItem("user", JSON.stringify(userData));

      // عرض تنبيه النجاح
      showAlert(
        "success",
        "تم تسجيل دخولك بنجاح",
        "تم تسجيل دخولك بنجاح باستخدام حساب Google"
      );

      // توجيه المستخدم بناءً على الدور
      const userRole = userData.role;
      console.log("User role:", userRole);

      if (userRole === null || userRole === undefined) {
        localStorage.setItem("redirectPath", "/choose-role-with-google");
      } else if (userRole === "CUSTOMER") {
        localStorage.setItem("redirectPath", "/");
      } else if (userRole === "BUSINESS") {
        localStorage.setItem("redirectPath", "/list");
      } else {
        // دور غير معروف، توجيه إلى الصفحة الرئيسية كاحتياطي
        localStorage.setItem("redirectPath", "/");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      showAlert(
        "error",
        "خطأ في جلب معلومات المستخدم",
        "تم المصادقة بنجاح ولكن حدث خطأ أثناء جلب معلومات المستخدم"
      );
    }
  };

  // وظيفة مساعدة لعرض التنبيهات
  const showAlert = (type, message, subMessage) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertSubMessage(subMessage);
    setAlertOpen(true);
  };

  // تسجيل الدخول باستخدام Google
  const handleGoogleLogin = () => {
    setGoogleLoading(true);

    try {
      console.log("Initiating Google login");
      // إعادة توجيه المستخدم إلى نقطة نهاية مصادقة Google
      window.location.href = `${api_url}/auth/google`;
    } catch (error) {
      console.error("Error initiating Google login:", error);
      showAlert(
        "error",
        "خطأ في تسجيل الدخول باستخدام Google",
        "حدث خطأ أثناء محاولة الاتصال بخدمة Google"
      );
      setGoogleLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const loginResponse = await axios.post(
        `${api_url}/auth/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = loginResponse.data.accessToken;
      const refreshToken = loginResponse.data.refreshToken;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      const userResponse = await axios.get(`${api_url}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = userResponse.data;
      localStorage.setItem("user", JSON.stringify(userData));

      showAlert(
        "success",
        "تم تسجيل دخولك بنجاح",
        "شكرًا لانضمامك إلى منصه فودي، يمكنك الآن التمتع بخدمات المنصه."
      );

      // توجيه المستخدم بناءً على الدور
      const userRole = userData.role;
      console.log("User role:", userRole);

      if (userRole === null || userRole === undefined) {
        localStorage.setItem("redirectPath", "/choose-role-with-google");
      } else if (userRole === "CUSTOMER") {
        localStorage.setItem("redirectPath", "/");
      } else if (userRole === "BUSINESS") {
        localStorage.setItem("redirectPath", "/list");
      } else {
        // دور غير معروف، توجيه إلى الصفحة الرئيسية كاحتياطي
        localStorage.setItem("redirectPath", "/");
      }
    } catch (err) {
      console.error("Login error:", err);
      showAlert(
        "error",
        "خطأ في تسجيل الدخول",
        err.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);

    if (alertType === "success") {
      try {
        const redirectPath = localStorage.getItem("redirectPath");

        if (redirectPath) {
          navigate(redirectPath);
          // مسح مسار إعادة التوجيه بعد الاستخدام
          localStorage.removeItem("redirectPath");
        } else {
          // إذا لم يكن هناك مسار محدد، استخدم المسار الافتراضي
          navigate("/");
        }
      } catch (error) {
        console.error("Error during redirect:", error);
        navigate("/");
      }
    }
  };

  return (
    <>
      <Alert
        message={alertMessage}
        subMessage={alertSubMessage}
        isOpen={alertOpen}
        type={alertType}
        onClose={handleAlertClose}
      />
      <div className="flex min-h-screen justify-center items-center bg-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-36 w-full max-w-7xl">
          {/* Left Card */}
          <div className="w-full md:w-[44%]">
            <TestimonialCard />
          </div>{" "}
          {/* Right Card - Login Form - Using self-center to vertically center */}
          <div className="bg-white rounded-xl shadow-md flex-1 p-8 max-h-[630px] w-full self-center">
            <h2 className="text-2xl font-bold text-center mb-2">
              تسجيل الدخول
            </h2>
            <p className="text-center text-gray-600 mb-4">
              أهلاً بعودتك ! يُرجى ادخال رقم جوالك او بريدك الابكتروني و كلمة
              المرور لتسجيل دخولك{" "}
            </p>
            {error && (
              <p className="text-primary-1 text-center mb-2">{error}</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <Inputs
                  label=" البريد الالكتروني"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <Inputs
                  label="كلمة المرور"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 accent-primary-1" />
                  تذكرني
                </label>
                <a href="#" className="text-primary-1 hover:underline">
                  نسيت كلمة المرور؟
                </a>
              </div>

              <Button
                label={loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                className="w-full bg-primary-1 hover:bg-hover_primary-1 text-white"
                disabled={loading}
                type="submit"
              />
              <Button
                label="انشاء حساب"
                className="w-full mt-4 !text-primary-1 font-medium border border-primary-1 hover:bg-primary-1 hover:!text-white transition"
                type="button"
                onClick={() => navigate("/choose-role-with-google")}
                disabled={loading}
              />
            </form>
            <div className="text-center mt-3">
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="px-3 text-gray-500 text-sm">
                  أو الاستمرار بواسطة
                </span>
                <hr className="flex-grow border-gray-300" />
              </div>
              <div className="flex justify-center gap-4">
                <button
                  className={`border p-2 rounded-full relative ${
                    googleLoading ? "opacity-70" : ""
                  }`}
                  onClick={handleGoogleLogin}
                  disabled={googleLoading || loading}
                  type="button"
                >
                  {googleLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : null}
                  <FcGoogle
                    size={24}
                    className={`w-6 h-6 ${googleLoading ? "opacity-30" : ""}`}
                  />
                </button>
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
