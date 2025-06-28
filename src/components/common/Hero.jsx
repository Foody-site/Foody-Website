import { FaFireAlt, FaUtensils, FaArrowLeft } from "react-icons/fa";
import PageWrapper from "./PageWrapper";
import Slider from "./Slider";
import slider_photo2 from "/assets/home/slider_2.webp";
import slider_photo from "/assets/home/slider.webp";

const Hero = () => {
  return (
    <div className="hero py-10">
      <PageWrapper>
        <div className="flex flex-col lg:flex-row-reverse gap-6 bg-white font-sans">
          {/* Right Side: Slider */}
          <div className="w-full lg:w-1/4 flex justify-center">
            <Slider />
          </div>

          {/* Left Side: Main Content */}
          <div className="w-full lg:w-3/4 flex flex-col justify-center text-right">
            {/* Title and Description */}
            <div className="mb-[120px]">
              <h1 className="text-5xl text-[#030303] font-medium mb-6">
                {" "}
                ! فودي – حيث يبدأ شغف الطعام
              </h1>
              <p className="text-[#808080] leading-relaxed text-lg">
                منصة فودي هي قاعدة بيانات المعلومات الطعام والمشروبات بالمملكة
                العربية السعودية، وهي عبارة عن منصة اجتماعية حيث تقدم بيانات
                تفصيلية وشاملة للمنتجات والخدمات الغذائية والعروض التي تقدمها
                المطاعم والكافيهات وتعريفها، كما أنها تقدم معلومات عن الطهاة
                (شيف) ومهاراتهم، وتسهل المنصة على استكشاف الطعام والمشروبات ونشر
                من نشء الأعمال 
              </p>
            </div>

            {/* عروض وخصومات */}
            <div>
              <div className="flex flex-row-reverse justify-between items-center mb-4 px-2">
                <h2 className="text-2xl font-normal">عروض وخصومات</h2>
                <a href="#" className="text-primary-1 hover:underline">
                  مشاهدة المزيد
                </a>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                {/* Card 1 */}
                <div className="border-2 border-primary-1 rounded-lg hover:bg-primary-1/60 transition duration-300 shadow-xl cursor-pointer">
                  <div className="p-3 text-black hover:text-white">
                    {/* Two-column layout inside the card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      {/* Image */}
                      <img
                        src={slider_photo2 || "https://dummyimage.com/187"}
                        alt="image"
                        className="w-full h-full rounded-lg object-cover"
                      />

                      {/* Text Details */}
                      <div className="ms-3 space-y-10">
                        <h3 className="font-bold text-lg">الاسم</h3>
                        <p className="mt-2 text-[#808080]">الوصف</p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-end gap-4 items-center mt-4 text-sm">
                          <div className="flex items-center gap-1 text-[#C7C7C7] border-2 p-1 rounded-md">
                            <span>42</span>
                            <FaUtensils />
                          </div>
                          <div className="flex items-center gap-1 text-[#C7C7C7] border-2 p-1 rounded-md">
                            <FaFireAlt />
                            <span>1030 سعر حراري</span>
                          </div>
                        </div>

                        {/* Link */}
                        <div className="mt-4 flex items-center justify-end gap-1 text-primary-1 hover:text-white">
                          <FaArrowLeft />
                          <a className="hover:underline">رؤية المزيد</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 – Same structure */}
                <div className="border-2 border-primary-1 rounded-lg hover:bg-primary-1/60 transition duration-300 shadow-xl cursor-pointer">
                  <div className="p-3 text-black hover:text-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      <img
                        src={slider_photo || "https://dummyimage.com/187"}
                        alt="image"
                        className="w-full h-full rounded-lg object-cover"
                      />
                      <div className="ms-3 space-y-10">
                        <h3 className="font-bold text-lg">الاسم</h3>
                        <p className="mt-2 text-[#808080]">الوصف</p>

                        <div className="flex flex-wrap justify-end gap-4 items-center mt-4 text-sm">
                          <div className="flex items-center gap-1 text-[#C7C7C7] border-2 p-1 rounded-md">
                            <span>42</span>
                            <FaUtensils />
                          </div>
                          <div className="flex items-center gap-1 text-[#C7C7C7] border-2 p-1 rounded-md">
                            <FaFireAlt />
                            <span>1030 سعر حراري</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-1 text-primary-1 hover:text-white">
                          <FaArrowLeft />
                          <a className="hover:underline">رؤية المزيد</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default Hero;
