import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import smiling_woman from "/assets/login/smiling_woman.webp";
import comma from "/assets/login/comma.webp";
import logo from "/assets/common/logo.webp";

const TestimonialCard = () => {
  return (
    <>
      {/* Left Card */}
      <div className="bg-[#FBD5D5] rounded-xl shadow-md flex-1 flex flex-col items-center p-8 min-h-[500px] w-full">
        {/* Logo */}
        <img src={logo} alt="Foody Logo" className="w-20 h-auto mx-auto mb-6" />
        {/* Title and Description */}
        <h2 className="text-1xl font-bold text-center p-3">
          تعرف علي اراء عملائنا{" "}
        </h2>
        <p className="text-center text-gray-700 mb-6 max-w-lg">
          استمع لتجارب حقيقية من مستخدمي تطبيق فودي! قصص وفّروا فيها، استمتعوا
          بالعروض، وجربوا أفضل المطاعم بكل سهولة. رضاكم هو أولويتنا، وآراؤكم
          تلهمنا نطوّر أكثر كل يوم.{" "}
        </p>
        <div className="rounded-xl flex flex-col items-center p-6 w-full max-w-lg">
          {/* Image */}
          <div className="w-full overflow-hidden rounded-xl">
            <img
              src={smiling_woman}
              alt="Smiling Woman"
              className="object-cover w-full h-64 rounded-xl"
            />
          </div>
          {/* Review Box */}
          <div className="bg-white rounded-lg p-6 text-center shadow-sm w-11/12 -mt-12">
            <img src={comma} alt="comma" className="w-10 h-10 mx-auto mb-4" />
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              تطبيق فودي غيّر طريقة طلبي للأكل! الخصومات ممتازة جدًا. جربت بسببه
              مطاعم في شمال الرياض وفعلاً كانت تجربه مميزة{" "}
            </p>
            <p className="font-semibold text-gray-800">عبدالله العسيري</p>
          </div>
        </div>
        {/* Dots Navigation */}
        <div className="flex justify-center items-center gap-6 mt-6">
          {/* Left Arrow */}
          <button className="w-10 h-10 flex justify-center items-center rounded-full border border-primary-1 text-primary-1 hover:bg-primary-1 hover:text-white transition">
            <IoIosArrowBack size={24} />
          </button>

          {/* Dots in the center */}
          <div className="flex justify-center gap-2 relative">
            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
            <span className="w-3 h-3 bg-primary-1 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
          </div>

          {/* Right Arrow */}
          <button className="w-10 h-10 flex justify-center items-center rounded-full border border-primary-1 text-primary-1 hover:bg-primary-1 hover:text-white transition">
            <IoIosArrowForward size={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default TestimonialCard;
