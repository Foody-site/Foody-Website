import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Button from "../shared/Buttons/Button";
import Inputs from "../shared/inputs/Inputs";
import Footer from "./../layout/Footer";
import axios from "axios";
import { api_url } from "../../utils/ApiClient";

const Register = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    birthday: "",
    role: location.state?.role,
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
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

    const phoneRegex = /^[0-9]{10,15}$/;
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
      return;
    }
    const updatedData = {
      ...formData,
      phone: formData.phone.trim().startsWith("+2")
        ? formData.phone.trim()
        : `+2${formData.phone.trim()}`,
    };

    try {
      const res = await axios.post(`${api_url}/auth/register`, updatedData);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("تم التسجيل بنجاح");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "حدث خطأ أثناء التسجيل!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex justify-center items-center px-4">
        <div className="w-full max-w-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-1">
            حساب جديد
          </h2>
          <p className="text-center text-gray-500 mb-6">مرحبًا بك! نورتنا</p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
              <div className="w-full">
                <Inputs
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  label="كلمة المرور"
                  type="password"
                  className="bg-gray-200 border-gray-300 h-12 w-full"
                />
                <p className="text-primary-1 text-sm min-h-[1.5rem]">
                  {errors.password}
                </p>
              </div>

              <div className="w-full">
                <Inputs
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  label="الاسم"
                  type="text"
                  className="bg-gray-200 border-gray-300 h-12 w-full"
                />
                <p className="text-primary-1 text-sm min-h-[1.5rem]">
                  {errors.fullName}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
              <div className="w-full">
                <Inputs
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="البريد الإلكتروني"
                  type="email"
                  className="bg-gray-200 border-gray-300 h-12 w-full"
                  icon="email"
                />
                <p className="text-red-500 text-sm min-h-[1.5rem]">
                  {errors.email}
                </p>
              </div>

              <div className="w-full">
                <Inputs
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  label="رقم الجوال"
                  type="text"
                  className="bg-gray-200 border-gray-300 h-12 w-full"
                />
                <p className="text-primary-1 text-sm min-h-[1.5rem]">
                  {errors.phone}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <p className="text-xs text-primary-1 leading-5">
                تاريخ الميلاد لا يتم نشره أو عرضه للمستخدمين الآخرين، بل من أجل
                تحديد العروض والخصومات المناسبة لك.
              </p>

              <div className="w-full">
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
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                label={loading ? "جاري تسجيل الدخول..." : "تسجيل حساب جديد"}
                disabled={loading}
                className="max-w-[290px] bg-primary-1 hover:bg-hover_primary-1 text-white py-2 rounded-md text-lg font-semibold"
              />
            </div>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            هل لديك حساب بالفعل؟
            <a href="#" className="text-primary-1 hover:underline ml-1">
              تسجيل الدخول
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
