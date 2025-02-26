import Logo from "../../assets/Group.png";
import Instagram from "../../assets/Instagram.png";
import Snapchat from "../../assets/Snapchat.png";
import WhatsApp from "../../assets/WhatsApp.png";
import X from "../../assets/X.png";

const Footer = () => {
  return (
    <footer className="w-full bg-white py-6 flex flex-col items-center justify-center border-t border-gray-200">
      <div className="flex flex-col items-center">
        <img src={Logo} alt="Foody Logo" className="h-10 mb-2" />
        <div className="flex gap-4 mb-4">
          <img
            src={Snapchat}
            alt="Snapchat"
            className="h-6 w-6 cursor-pointer"
          />
          <img
            src={WhatsApp}
            alt="WhatsApp"
            className="h-6 w-6 cursor-pointer"
          />
          <img
            src={Instagram}
            alt="Instagram"
            className="h-6 w-6 cursor-pointer"
          />
          <img src={X} alt="X" className="h-6 w-6 cursor-pointer" />
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-6 text-gray-600 text-sm text-center md:text-left">
        <div className="flex flex-col gap-2">
          <p>
            عدد المتاجر: <span className="font-semibold">531</span>
          </p>
          <p>
            عدد الزوار: <span className="font-semibold">1993</span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">سياسة الاستخدام</p>
          <p className="cursor-pointer hover:text-gray-900">الشروط والأحكام</p>
          <p className="cursor-pointer hover:text-gray-900">إخلاء المسؤولية</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">من نحن</p>
          <p className="cursor-pointer hover:text-gray-900">استطلاع الرأي</p>
          <p className="cursor-pointer hover:text-gray-900">المدونة</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">حسابي</p>
          <p className="cursor-pointer hover:text-gray-900">المفضلة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
