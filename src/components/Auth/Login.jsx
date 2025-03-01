import Button from "../shared/Buttons/Button";
import Inputs from "../shared/inputs/Inputs";
import Footer from "./../layout/Footer";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-grow justify-center items-center">
        <div className="w-full max-w-sm p-6 border border-gray-300 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            تسجيل الدخول
          </h2>

          <div className="mb-4">
            <Inputs label="رقم الجوال/البريد الالكتروني" type="text" />
          </div>

          <div className="mb-4">
            <Inputs label="كلمة السر" type="password" />
          </div>

          <Button
            label="تسجيل الدخول"
            className="w-full bg-primary-1 hover:bg-hover_primary-1"
          />

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
