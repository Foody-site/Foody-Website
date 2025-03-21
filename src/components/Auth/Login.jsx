import { useState } from "react";
import axios from "axios";
import Button from "../shared/Buttons/Button";
import Inputs from "../shared/inputs/Inputs";
import Footer from "../layout/Footer";
import { api_url } from "../../utils/ApiClient";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${api_url}/auth/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Login Successful:", response.data);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("تم تسجيل الدخول بنجاح!");
    } catch (err) {
      setError(err.response?.data?.message || "فشل تسجيل الدخول. تحقق من بيانات الاعتماد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-grow justify-center items-center">
        <div className="w-full max-w-sm p-6 border border-gray-300 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-600 mb-6">
            تسجيل الدخول
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Inputs
                label="رقم الجوال/البريد الالكتروني"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <Inputs
                label="كلمة السر"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <Button
              label={loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              className="w-full bg-primary-1 hover:bg-hover_primary-1"
              disabled={loading}
              type="submit"
            />
          </form>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-primary-1" />
              <span>تذكرني</span>
            </label>

            <div>
              هل نسيت كلمة المرور؟
              <a href="#" className="text-primary-1 hover:underline ml-1">
                تسجيل جديد
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
