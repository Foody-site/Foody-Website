import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import icon from "../../assets/icon.svg";
import Footer from "../layout/Footer";
import PageWrapper from "../common/PageWrapper";
import Button from "../shared/Buttons/Button";
const Login_2 = () => {
  return (
    <PageWrapper>
      <div className="py-10 flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="w-full max-w-sm p-6 border border-gray-300 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-center mb-5 text-gray-600">
            تسجيل دخول
          </h2>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border rounded-md mb-3 text-gray-700 hover:bg-gray-100">
            <span className="text-sm font-medium text-gray-600">
              تسجيل دخول بفودي
            </span>
            <img src={icon} alt="Foody Logo" className="w-14 h-10" />
          </button>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border rounded-md mb-3 text-gray-700 hover:bg-gray-100">
            <span className="text-sm font-medium text-gray-600">
              تسجيل دخول بأبل
            </span>
            <FaApple size={27} className="text-black" />
          </button>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border rounded-md mb-3 text-gray-700 hover:bg-gray-100">
            <span className="text-sm font-medium  text-gray-600">
              تسجيل دخول بجوجل
            </span>
            <FcGoogle size={27} />
          </button>

          <div className="flex items-center my-4 w-full">
            <hr className="w-1/2 border-1 border-black" />
            <span className="mx-3 text-gray-700 text-sm font-medium">أو</span>
            <hr className="w-1/2 border-1 border-black" />
          </div>

          <Button
            label="إنشاء حساب جديد"
            className="bg-primary-1 hover:bg-hover_primary-1"
          />

          <p className="text-xs text-gray-500 text-center mt-4">
            من خلال تسجيل الدخول، فإنك توافق على{" "}
            <a href="#" className="text-blue-600 hover:underline">
              شروط الاستخدام
            </a>{" "}
            و{" "}
            <a href="#" className="text-blue-600 hover:underline">
              سياسة الخصوصية
            </a>{" "}
            الخاصة بـ FOODY.
          </p>
        </div>

        <div className="w-full max-w-md p-6 border border-gray-300 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-3 text-right">
            لماذا تسجيل الحساب والحصول على ملف شخصي في فودي مهم؟
          </h2>

          <h3 className="font-semibold mb-2 text-right">للأفراد</h3>
          <ul className="list-disc pr-5 text-sm text-gray-700 mb-4 text-right">
            <li>متابعة اخر العروض والخصومات في مدينتك.</li>
            <li>اعداد قائمة خاصة بالمتاجر المفضلة.</li>
            <li>اعداد قائمة خاصة بالاكلات والمشروبات المفضلة.</li>
            <li>اعداد قائمة خاصة بالشيفات والوصفات المفضلة.</li>
            <li>الاطلاع علي المتاجر وتقييمها والتعليق.</li>
            <li>
              حديد مناسباتك الخاصة (عيد ميلادك-مناسبة التخرج-حفلة خاصة-ذكرى
              زواج.....الخ) وتذكيرك بها عند قرب موعدها
            </li>
            <li>اختيار شيف وحجزه لمناسبة.</li>
          </ul>

          <h3 className="font-semibold mb-2 text-right">للأعمال (متجر/شيف)</h3>
          <ul className="list-disc pr-5 text-sm text-gray-700 text-right">
            <li>انشاء صفحة اعمال خاصة (متجر/شيف) وإدارتها.</li>
            <li>نشر المنتجات والوصفات والخدمات المقدمة.</li>
            <li>نشر العروض والخصومات.</li>
            <li>مشاهدة الزوار للمنتجات والخدمات المقدمة.</li>
            <li>مشاهدة التقييمات والتعليقات.</li>
            <li>سهولة التواجد في المنصات الالكترونية.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default Login_2;
