import Button from "../shared/Buttons/Button";
import Input from "../shared/inputs/input";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 border border-gray-300 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          تسجيل الدخول
        </h2>

        <div className="mb-4">
          <Input label="رقم الجوال/البريد الالكتروني" type="text" />
        </div>

        <div className="mb-4">
          <Input label="كلمة السر"type="password" />
        </div>

        <Button
          label= "تسجيل الدخول"
          className="bg-primary-1 hover:bg-hover_primary-1"
        />

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-primary-1" />
            <span>تذكري</span>
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
  );
};

export default Login;
