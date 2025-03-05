import { useState } from "react";
import Button from "../shared/Buttons/Button";
import Inputs from "../shared/inputs/Inputs";
import Footer from "./../layout/Footer";
import axios from "axios";
import { api_url } from "../../utils/ApiClient";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    birthday: "",
    role: "CUSTOMER",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data :", formData);
    // if (!validateForm()) return;

    try {
      const res = await axios.post(`${api_url}/auth/register`, formData);
      alert("تم التسجيل بنجاح");
    } catch (err) {
      alert(err.response?.data?.message || "حدث خطأ أثناء التسجيل!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex justify-center items-center px-4">
        <div className="w-full max-w-3xl p-8 border border-gray-300 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-1">
            حساب جديد
          </h2>
          <p className="text-center text-gray-500 mb-6">مرحبًا بك! نورتنا</p>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <Inputs
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                label="الاسم *"
                type="text"
                className="bg-gray-200 border-gray-300 h-12"
              />
              <Inputs
                name="password"
                value={formData.password}
                onChange={handleChange}
                label="كلمة المرور *"
                type="password"
                className="bg-gray-200 border-gray-300 h-12"
                icon="eye"
              />
              <Inputs
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                label="رقم الجوال *"
                type="text"
                className="bg-gray-200 border-gray-300 h-12"
              />
              <Inputs
                name="email"
                value={formData.email}
                onChange={handleChange}
                label="البريد الإلكتروني"
                type="email"
                className="bg-gray-200 border-gray-300 h-12"
                icon="email"
              />

              <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:gap-4">
                <p className="text-xs text-primary-1 leading-5 text-right md:w-1/2">
                  تاريخ الميلاد لا يتم نشره أو عرضه للمستخدمين الآخرين، بل من
                  أجل تحديد العروض والخصومات المناسبة لك.
                </p>
                <div className="md:w-1/2">
                  <Inputs
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    label="تاريخ الميلاد *"
                    type="date"
                    className="bg-gray-200 border-gray-300 h-12 w-full"
                    icon="calendar"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              label="تسجيل حساب جديد"
              className="w-96 mt-6 bg-primary-1 hover:bg-hover_primary-1 text-white py-3.5 rounded-lg text-xl font-semibold flex justify-center mx-auto"
            />
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
