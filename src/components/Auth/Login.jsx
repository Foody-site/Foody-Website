import { useState } from "react";
import axios from "axios";
import Button from "../shared/Buttons/Button";
import Inputs from "../shared/inputs/Inputs";
//import Footer from "../layout/Footer";
import { api_url } from "../../utils/ApiClient";
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
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSubMessage, setAlertSubMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      localStorage.setItem("token", token);

      const userResponse = await axios.get(`${api_url}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("user", JSON.stringify(userResponse.data));

      setAlertType("success");
      setAlertMessage("تم تسجيل حسابك ");
      setAlertSubMessage(
        "شكرًا لانضمامك إلى منصه فودي , يمكنك الآن التمتع بخدمات المنصه."
      );
      setAlertOpen(true);
    } catch (err) {
      setAlertType("error");
      setAlertMessage("خطأ في التسجيل");
      setAlertSubMessage(
        err.response?.data?.message || "حدث خطأ أثناء التسجيل!"
      );
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Alert
        message={alertMessage}
        subMessage={alertSubMessage}
        isOpen={alertOpen}
        type={alertType}
        onClose={() => {
          setAlertOpen(false);
          if (alertType === "success") {
            window.location.href = "/";
          }
        }}
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
                  label="رقم الجوال/البريد الالكتروني"
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
                onClick={() => navigate("/choose-role")}
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
                <button className="border p-2 rounded-full">
                  <FcGoogle size={24} className="w-6 h-6" />
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
