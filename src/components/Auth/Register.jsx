import Button from "../shared/Buttons/Button";
import Inputs from "../shared/inputs/Inputs";

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 border border-gray-300 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">حساب جديد</h2>
        <p className="text-center text-gray-500 mb-6">مرحبًا بك! نورتنا</p>

        <div className="space-y-4">
          <Inputs label="الاسم *" type="text" required />
          <Inputs label="كلمة المرور *" type="password" required icon="eye" />
          <Inputs label="رقم الجوال *" type="text" required />
          <Inputs label="البريد الإلكتروني" type="email" placeholder="اختياري" />
          <Inputs label="تاريخ الميلاد *" type="date" required icon="calendar" />
        </div>

        <p className="text-xs text-red-500 mt-2 text-right">
          تاريخ الميلاد لا يتم نشره أو عرضه للمستخدمين الآخرين، بل من أجل تحديد العروض والخصومات المناسبة لك.
        </p>

        <Button
          label="تسجيل حساب جديد"
          className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md"
        />

        <p className="text-center text-sm text-gray-600 mt-4">
          هل لديك حساب بالفعل؟
          <a href="#" className="text-red-600 hover:underline ml-1">تسجيل الدخول</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
