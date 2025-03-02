import Button from "../shared/Buttons/Button";
import Inputs from "../shared/inputs/Inputs";
import Footer from "./../layout/Footer";

const Register = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex justify-center items-center px-4">
        <div className="w-full max-w-3xl p-8 border border-gray-300 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-1">
            حساب جديد
          </h2>
          <p className="text-center text-gray-500 mb-6">مرحبًا بك! نورتنا</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <Inputs
              label="الاسم *"
              type="text"
              className="bg-gray-200 border-gray-300 h-12"
            />
            <Inputs
              label="كلمة المرور *"
              type="password"
              className="bg-gray-200 border-gray-300 h-12"
              icon="eye"
            />
            <Inputs
              label="رقم الجوال *"
              type="text"
              className="bg-gray-200 border-gray-300 h-12"
            />
            <Inputs
              label="البريد الإلكتروني"
              type="email"
              className="bg-gray-200 border-gray-300 h-12"
              icon="email"
            />

            <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:gap-4">
              <p className="text-xs text-primary-1 leading-5 text-right md:w-1/2">
                تاريخ الميلاد لا يتم نشره أو عرضه للمستخدمين الآخرين، بل من أجل
                تحديد العروض والخصومات المناسبة لك.
              </p>
              <div className="md:w-1/2">
                <Inputs
                  label="تاريخ الميلاد *"
                  type="date"
                  className="bg-gray-200 border-gray-300 h-12 w-full"
                  icon="calendar"
                />
              </div>
            </div>
          </div>

          <Button
            label="تسجيل حساب جديد"
            className="w-96 mt-6 bg-primary-1 hover:bg-hover_primary-1 text-white py-3.5 rounded-lg text-xl font-semibold flex justify-center mx-auto"
          />

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
