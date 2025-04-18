import React from "react";
import {
    FaSearch,
    FaStar,
    FaRegStar,
    FaLocationArrow,
    FaClock,
    FaTags,
    FaPlusCircle,
} from "react-icons/fa";

const FoodFilter = () => {
    return (
        <div className="bg-[#D9D9D9] p-4 rounded-xl w-80 space-y-5 text-right font-sans">

            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="ما الذي تريد أن تبحث عنه؟"
                    className="w-full pr-10 pl-4 py-2 rounded-full text-sm border border-gray-300 focus:outline-none"
                />
                <FaSearch className="absolute top-2.5 right-4 text-gray-500" />
            </div>

            {/* Filter Title */}
            <p className="text-sm font-bold text-gray-800">بحث بحسب :</p>

            {/* Price Range */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">السعر</label>
                <input type="range" min={20} max={50} className="range range-xs range-error" />
                <div className="flex justify-between text-xs px-1 text-gray-600 mt-1">
                    <span>20 ريال</span>
                    <span>50 ريال</span>
                </div>
            </div>

            {/* City Dropdown */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
                <select className="w-full py-2 px-3 rounded-full border border-gray-300 bg-white text-sm text-right">
                    <option>المدينة</option>
                </select>
            </div>

            {/* Ratings */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">التقييم</label>
                <div className="flex flex-col gap-2 text-yellow-400">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 text-gray-700">
                            <input type="checkbox" className="checkbox checkbox-sm" />
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) =>
                                    i < rating ? (
                                        <FaStar key={i} className="text-yellow-400" />
                                    ) : (
                                        <FaRegStar key={i} className="text-gray-400" />
                                    )
                                )}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Toggles */}
            <div className="flex justify-between gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                    <input type="checkbox" className="toggle toggle-xs" />
                    <span>مفتوح الآن</span>
                    <FaClock className="text-gray-500 text-xs" />
                </div>
                <div className="flex items-center gap-1">
                    <input type="checkbox" className="toggle toggle-xs" />
                    <span>الأقرب منك</span>
                    <FaLocationArrow className="text-gray-500 text-xs" />
                </div>
            </div>

            {/* Promotions */}
            <div className="flex flex-col gap-1 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                    <FaTags />
                    <span>عروض/خصومات</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaPlusCircle />
                    <span>أضيف حديثاً</span>
                </div>
            </div>

            {/* Delivery Apps */}
            <div>
                <p className="text-sm font-medium mb-1">تطبيقات التوصيل</p>
                <div className="h-24 overflow-y-auto bg-white p-2 rounded-lg shadow-inner space-y-1">
                    {["هنقرستيشن", "مرسول", "أوبر", "كريم", "جاهز"].map((app) => (
                        <label key={app} className="flex justify-between items-center text-sm text-gray-700">
                            <span>{app}</span>
                            <input type="checkbox" className="checkbox checkbox-xs" />
                        </label>
                    ))}
                </div>
            </div>

            {/* Meal Types */}
            <div>
                <p className="text-sm font-medium mb-1">نوع الوجبة</p>
                <div className="bg-white p-2 rounded-lg shadow-inner space-y-1">
                    {["فطور", "غداء", "عشاء"].map((meal) => (
                        <label key={meal} className="flex justify-between items-center text-sm text-gray-700">
                            <span>{meal}</span>
                            <input type="checkbox" className="checkbox checkbox-xs" />
                        </label>
                    ))}
                </div>
            </div>

            {/* Button */}
            <button className="w-full bg-primary-1 hover:bg-hover_primary-1 text-white font-bold py-2 rounded-full text-sm">
                عرض النتائج
            </button>
        </div>
    );
};

export default FoodFilter;
