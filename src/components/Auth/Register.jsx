import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../shared/Buttons/Button";
import Inputs from "../shared/inputs/Inputs";
import Footer from "./../layout/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    birthday: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log("Stored Data: ", formData);
    navigate("/choose-role", { state: formData });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex justify-center items-center px-4">
        <div className="w-full max-w-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-1">
            حساب جديد
          </h2>
          <p className="text-center text-gray-500 mb-6">! مرحبا بك نورتنا</p>
          <form onSubmit={handleNext} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Inputs
                name="password"
                value={formData.password}
                onChange={handleChange}
                label="كلمة المرور "
                type="password"
              />
              <Inputs
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                label="الاسم "
                type="text"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Inputs
                name="email"
                value={formData.email}
                onChange={handleChange}
                label="البريد الإلكتروني"
                type="email"
              />
              <Inputs
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                label="رقم الجوال "
                type="text"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <p className="text-xs text-primary-1 leading-5">
                تاريخ الميلاد لا يتم نشره أو عرضه للمستخدمين الآخرين، بل من أجل
                تحديد العروض والخصومات المناسبة لك.
              </p>
              <Inputs
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                label="تاريخ الميلاد"
                type="date"
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                label="تسجيل حساب جديد"
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
