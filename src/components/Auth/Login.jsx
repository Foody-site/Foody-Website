import { useState } from "react";
import axios from "axios";
import Button from "../shared/Buttons/Button";
import Inputs from "../shared/inputs/Inputs";
//import Footer from "../layout/Footer";
import { api_url } from "../../utils/ApiClient";
import { FcGoogle } from "react-icons/fc";
import smiling_woman from "/assets/login/smiling_woman.jpg";
import comma from "/assets/login/comma.png";
import logo from "/assets/common/logo.png";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
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

      alert("تم تسجيل الدخول بنجاح!");
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "فشل تسجيل الدخول. تحقق من بيانات الاعتماد."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row gap-36 w-full max-w-7xl">
        {/* Left Card */}
        <div className="bg-[#FBD5D5] rounded-xl shadow-md flex-1 flex flex-col items-center p-8 min-h-[500px] w-full">
          {/* Logo */}
          <img
            src={logo}
            alt="Foody Logo"
            className="w-20 h-auto mx-auto mb-6"
          />
          {/* Title and Description */}
          <h2 className="text-1xl font-bold text-center p-3">
            تعرف على آراء عملائنا
          </h2>
          <p className="text-center text-gray-700 mb-6 max-w-lg">
            اسمع التجارب مباشرة من مستخدمي تطبيق فودي! قصص وقصوا فيها، استمتعوا
            بتجربتهم ودوروا أفضل المطاعم بكل سهولة. رضاكم هو أولويتنا، وأفكاركم
            تساهم لتطويرنا أكثر كل يوم.
          </p>
          <div className="rounded-xl flex flex-col items-center p-6 w-full max-w-lg">
            {/* Image */}
            <div className="w-full overflow-hidden rounded-xl">
              <img
                src={smiling_woman}
                alt="Smiling Woman"
                className="object-cover w-full h-64 rounded-xl"
              />
            </div>
            {/* Review Box */}
            <div className="bg-white rounded-lg p-6 text-center shadow-sm w-11/12 -mt-12">
              <img src={comma} alt="comma" className="w-10 h-10 mx-auto mb-4" />
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                تطبيق فودي غيّر طريقة طلبي للأكل! الخصومات ممتازة جدًا. جربت
                بسببه مطاعم في شمال الرياض وفعلاً كانت تجربه مميزة{" "}
              </p>
              <p className="font-semibold text-gray-800">عبدالله العسيري</p>
            </div>
          </div>
          {/* Dots Navigation */}
          <div className="flex justify-center items-center gap-6 mt-6">
            {/* Left Arrow */}
            <button className="w-10 h-10 flex justify-center items-center rounded-full border border-primary-1 text-primary-1 hover:bg-primary-1 hover:text-white transition">
              <IoIosArrowBack size={24} />
            </button>

            {/* Dots in the center */}
            <div className="flex justify-center gap-2 relative">
              <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
              <span className="w-3 h-3 bg-primary-1 rounded-full"></span>
              <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
            </div>

            {/* Right Arrow */}
            <button className="w-10 h-10 flex justify-center items-center rounded-full border border-primary-1 text-primary-1 hover:bg-primary-1 hover:text-white transition">
              <IoIosArrowForward size={24} />
            </button>
          </div>
        </div>
        {/* Right Card - Login Form - Using self-center to vertically center */}
        <div className="bg-white rounded-xl shadow-md flex-1 p-8 max-h-[630px] w-full self-center">
          <h2 className="text-2xl font-bold text-center mb-2">تسجيل الدخول</h2>
          <p className="text-center text-gray-600 mb-4">
            أهلاً بعودتك ! يُرجى ادخال رقم جوالك او بريدك الابكتروني و كلمة
            المرور لتسجيل دخولك{" "}
          </p>
          {error && <p className="text-primary-1 text-center mb-2">{error}</p>}
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
              onClick={() => navigate('/register')}
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
  );
};

export default Login;
