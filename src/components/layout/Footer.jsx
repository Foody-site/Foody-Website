import {
  FaInstagram,
  FaXTwitter,
  FaWhatsapp,
  FaSnapchat,
} from "react-icons/fa6";
import PageWrapper from "../common/PageWrapper";
import { useNavigate } from "react-router";

const Footer = () => {

  const navigate = useNavigate();

  return (
    <footer className="bg-[#970D0D] text-white text-sm font-sans max-w-full" dir="rtl">
      <PageWrapper>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center md:text-right mb-6">
          <div className="md:col-span-1">
            <img
              src="/assets/common/whitelogo.webp"
              alt="Foody Logo"
              className="w-24 mx-auto md:mx-0 mb-2"
            />
            <p className="text-xs leading-relaxed text-justify md:text-right">
              منصة فودي هي قاعدة بيانات للمطاعم والمتاجر بالمملكة العربية
              السعودية وهي عبارة عن منصة اجتماعية تهدف لتقديم تغطية تفصيلية
              وشاملة للمنتجات والخدمات والعروض التي تقدمها أشهر المطاعم
              والكافيهات وتعكس كل ما هو مهم للمستهلك من المميزات (نقطة البيع)
              وخدماتهم. وتسهل المنصة على استكشاف الطعام والمقارنات وتسريع من
              قرار الشراء.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">الرئيسية</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white no-underline" onClick={() => navigate("/user-profile")}>حسابي</a></li>
              <li><a href="#" className="text-white no-underline" onClick={() => navigate("/user-profile")}>المفضلة</a></li>
              <li><a href="#" className="text-white no-underline" onClick={() => navigate("/under-construction")}>العروض/الخصومات</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold mb-2">من نحن</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white no-underline" onClick={() => navigate("/under-construction")}>إخلاء المسؤولية</a></li>
              <li><a href="#" className="text-white no-underline" onClick={() => navigate("/under-construction")}>سياسة الإستخدام</a></li>
              <li><a href="#" className="text-white no-underline" onClick={() => navigate("/under-construction")}>الشروط والأحكام</a></li>
              <li><a href="#" className="text-white no-underline" onClick={() => navigate("/under-construction")}>فريقنا</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold mb-2">روابط سريعة</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white no-underline" onClick={() => navigate("/under-construction")}>المدونة</a></li>
              <li><a href="#" className="text-white no-underline" onClick={() => navigate("/under-construction")}>استطلاع الرأي</a></li>
              <li><a href="#" className="text-white no-underline" onClick={() => navigate("/under-construction")}>آخر الأخبار</a></li>
              <li><a href="#" className="text-white no-underline" onClick={() => navigate("/under-construction")}>مناسبات</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">تواصل معنا</h3>
            <p className="mb-4">تابعنا من خلال مواقع التواصل الاجتماعي</p>
            <div className="flex justify-center md:justify-start gap-3 text-lg">
              <div className="bg-white text-[#970D0D] p-2 rounded-md">
                <FaInstagram />
              </div>
              <div className="bg-white text-[#970D0D] p-2 rounded-md">
                <FaXTwitter />
              </div>
              <div className="bg-white text-[#970D0D] p-2 rounded-md">
                <FaSnapchat />
              </div>
              <div className="bg-white text-[#970D0D] p-2 rounded-md">
                <FaWhatsapp />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t border-white opacity-20 mb-4" />

        <div className="text-center py-4 text-xs" dir="rtl">
          © 2025 Foody . جميع الحقوق محفوظة
        </div>
      </PageWrapper>
    </footer>
  );
};

export default Footer;