import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Alert from "../shared/Alert/Alert";
import Button from "../shared/Buttons/Button";
import Inputs from "../shared/inputs/Inputs";
//import Footer from "./../layout/Footer";
import apiClient from "../../utils/ApiClient";
import TestimonialCard from "../shared/Testimonials/TestimonialCard";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    role: location.state?.role,
  });
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSubMessage, setAlertSubMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "! الاسم مطلوب";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "! يجب أن يكون الاسم 3 أحرف على الأقل";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "! البريد الإلكتروني مطلوب";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "! يرجى إدخال بريد إلكتروني صالح";
    }

    const phoneRegex = /^[0-9]{7,11}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "! رقم الهاتف مطلوب";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "! يجب أن يكون رقم الهاتف مكون من 10-15 رقمًا";
    }

    if (!formData.password) {
      newErrors.password = "! كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "! يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل";
    }

    if (!formData.birthday) {
      newErrors.birthday = "! تاريخ الميلاد مطلوب";
    } else {
      const birthDate = new Date(formData.birthday);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13) {
        newErrors.birthday = "! يجب أن يكون عمرك 13 سنة على الأقل";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "! تأكيد كلمة المرور مطلوب";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "! كلمتا المرور غير متطابقتين";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (location.state?.role) {
      setFormData((prev) => ({ ...prev, role: location.state.role }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const updatedData = {
      ...formData,
      phone: formData.phone.trim().startsWith("+966")
        ? formData.phone.trim()
        : `+966${formData.phone.trim()}`,
    };

    try {
      console.log("Registering with role:", updatedData.role);

      const res = await apiClient.post("/auth/register", updatedData);
      const token = res.data.accessToken;
      localStorage.setItem("token", token);

      const userResponse = await apiClient.get("/auth/me");

      const userData = userResponse.data;
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("User registration successful:", userData);

      setAlertType("success");
      setAlertMessage("تم تسجيل حسابك ");
      setAlertSubMessage(
        "شكرًا لانضمامك إلى منصه فودي , يمكنك الآن التمتع بخدمات المنصه."
      );
      setAlertOpen(true);

      const userRole = userData.role || formData.role;
      const isApproved = userData.status === "APPROVED" || !userData.status;

      let redirectPath = "/";
      if (userRole === "BUSINESS") {
        redirectPath = isApproved ? "/list" : "/pending-approval";
      } else if (userRole === "CUSTOMER") {
        redirectPath = "/";
      }

      localStorage.setItem("redirectAfterRegister", redirectPath);
    } catch (err) {
      console.error("Registration error:", err);

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

  const handleAlertClose = () => {
    setAlertOpen(false);

    if (alertType === "success") {
      try {
        const redirectPath =
          localStorage.getItem("redirectAfterRegister") || "/";

        navigate(redirectPath);
      } catch (error) {
        console.error("Error during navigation:", error);

        try {
          const userData = JSON.parse(localStorage.getItem("user")) || {};
          const role = userData.role || formData.role;

          if (role === "BUSINESS") {
            const isApproved =
              userData.status === "APPROVED" || !userData.status;
            navigate(isApproved ? "/list" : "/pending-approval");
          } else if (role === "CUSTOMER") {
            navigate("/");
          } else {
            navigate("/");
          }
        } catch (innerError) {
          console.error("Fallback navigation error:", innerError);
          navigate("/");
        }
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
        <div className="flex flex-col md:flex-row gap-20 w-full max-w-7xl">
          {/* Left Card */}
          <div className="w-full md:w-[44%]">
            <TestimonialCard />
          </div>
          {/* Right Card */}
          <div className="bg-white rounded-xl shadow-md flex-1 p-8 max-h-[770px] w-full self-center pl-6">
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
              انشاء حساب{" "}
            </h2>
            <p className="text-center text-gray-500 mb-6">
              سعداء بانضمامك معنا في فودي و نتمني لك تجربة مميزة
            </p>
            <form onSubmit={handleSubmit}>
              <Inputs
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                label="الاسم"
                type="text"
                className="bg-gray-200 border-gray-300 h-12 w-full"
                placeholder="أدخل الاسم الخاص بك"
              />
              <p className="text-primary-1 text-sm min-h-[1.5rem]">
                {errors.fullName}
              </p>

              <div className="flex flex-col md:flex-row gap-x-4">
                <div className="w-full md:w-1/2">
                  <Inputs
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    label="البريد الإلكتروني"
                    type="email"
                    className="bg-gray-200 border-gray-300 h-12 w-full"
                    icon="email"
                    placeholder="أدخل البريد الإلكتروني الخاص بك"
                  />
                  <p className="text-primary-1 text-sm min-h-[1.5rem]">
                    {errors.email}
                  </p>
                </div>

                <div className="w-full md:w-1/2">
                  <Inputs
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    label="رقم الجوال"
                    type="text"
                    className="bg-gray-200 border-gray-300 h-12 w-full"
                    placeholder="أدخل رقم الجوال الخاص بك"
                  />
                  <p className="text-primary-1 text-sm min-h-[1.5rem]">
                    {errors.phone}
                  </p>
                </div>
              </div>

              <Inputs
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                label="تاريخ الميلاد"
                type="date"
                className="bg-gray-200 border-gray-300 h-12 w-full"
                icon="calendar"
              />
              <p className="text-primary-1 text-sm min-h-[1.5rem]">
                {errors.birthday}
              </p>

              <div className="flex flex-col md:flex-row gap-x-4">
                <div className="w-full md:w-1/2">
                  <Inputs
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    label="تأكيد كلمة المرور"
                    type="password"
                    className="bg-gray-200 border-gray-300 h-12 w-full"
                    placeholder="أدخل كلمة المرور الخاص بك"
                  />
                  <p className="text-primary-1 text-sm min-h-[1.5rem]">
                    {errors.confirmPassword}
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <Inputs
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    label="كلمة المرور"
                    type="password"
                    className="bg-gray-200 border-gray-300 h-12 w-full"
                    placeholder="أدخل كلمة المرور الخاص بك"
                  />
                  <p className="text-primary-1 text-sm min-h-[1.5rem]">
                    {errors.password}
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                label={loading ? "جاري تسجيل الدخول..." : "انشاء الحساب"}
                disabled={loading}
                className="w-full bg-primary-1 hover:bg-hover_primary-1 text-white"
              />

              <Button
                label="تسجيل دخول"
                className="w-full mt-4 !text-primary-1 font-medium border border-primary-1 hover:bg-primary-1 hover:!text-white transition"
                type="button"
                onClick={() => navigate("/login")}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
