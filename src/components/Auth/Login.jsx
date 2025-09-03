import { useState } from "react";
import apiClient, { api_url } from "../../utils/ApiClient";
import { setAuthData } from "../../utils/AuthHelpers";
import Button from "../shared/Buttons/Button";
import Inputs from "../shared/inputs/Inputs";
//import Footer from "../layout/Footer";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
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

  const handleGoogleLogin = () => {
    setGoogleLoading(true);

    try {
      console.log("Initiating Google login");

      // إعادة توجيه المستخدم إلى نقطة نهاية مصادقة Google
      window.location.href = `${api_url}/auth/google`;
    } catch (error) {
      console.error("Error initiating Google login:", error);
      setAlertType("error");
      setAlertMessage("خطأ في تسجيل الدخول باستخدام Google");
      setAlertSubMessage("حدث خطأ أثناء محاولة الاتصال بخدمة Google");
      setAlertOpen(true);
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
      const loginResponse = await apiClient.post("/auth/login", formData);

      const token = loginResponse.data.accessToken;
      const refreshToken = loginResponse.data.refreshToken;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      const userResponse = await apiClient.get("/auth/me");

      const userData = userResponse.data;
      localStorage.setItem("user", JSON.stringify(userData));

      setAlertType("success");
      setAlertMessage("تم تسجيل دخولك بنجاح");
      setAlertSubMessage(
        "شكرًا لانضمامك إلى منصه فودي، يمكنك الآن التمتع بخدمات المنصه."
      );
      setAlertOpen(true);

      const userRole = userData.role;
      console.log("User role:", userRole);

      localStorage.setItem(
        "redirectPath",
        userRole === "BUSINESS" ? "/list" : "/"
      );
    } catch (err) {
      console.error("Login error:", err);

      setAlertType("error");
      setAlertMessage("خطأ في تسجيل الدخول");
      setAlertSubMessage(
        err.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول!"
      );
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);

    if (alertType === "success") {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));

        if (userData && userData.role) {
          if (userData.role === "BUSINESS") {
            navigate("/list");
          } else if (userData.role === "CUSTOMER") {
            navigate("/");
          } else {
            navigate("/");
          }
        } else {
          const redirectPath = localStorage.getItem("redirectPath") || "/";
          navigate(redirectPath);
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

              <div className="flex justify-end items-center mb-3 text-sm text-gray-600">
                <a
                  href="#"
                  className="text-primary-1 hover:underline text-right justify-end"
                >
                  نسيت كلمة المرور؟
                </a>
              </div>
              <Button
                label={loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                className="w-full bg-primary-1 hover:bg-hover_primary-1 text-white"
                disabled={loading || googleLoading}
                type="submit"
              />
              <Button
                label="انشاء حساب"
                className="w-full mt-4 !text-primary-1 font-medium border border-primary-1 hover:bg-primary-1 hover:!text-white transition"
                type="button"
                onClick={() => navigate("/choose-role")}
                disabled={loading || googleLoading}
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
                {/* زر Google مع القيم الثابتة */}
                <button
                  className={`border p-2 rounded-full relative ${
                    googleLoading ? "opacity-70" : ""
                  }`}
                  onClick={handleGoogleLogin}
                  disabled={googleLoading || loading}
                  type="button"
                  aria-label="تسجيل الدخول باستخدام Google"
                  title="تسجيل الدخول باستخدام Google"
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
                  <span className="sr-only">تسجيل الدخول باستخدام Google</span>
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
