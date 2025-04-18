import React from "react";
import { FaSearch, FaStar, FaRegStar } from "react-icons/fa";

const ChefFilter = () => {
    return (
        <div className="bg-[#D9D9D9] p-4 rounded-xl w-72 space-y-5 text-right font-sans">

            {/* Search */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="ادخل اسم الشيف/الوصفة"
                    className="w-full pr-10 pl-4 py-2 rounded-full text-sm border border-gray-300 focus:outline-none"
                />
                <FaSearch className="absolute top-2.5 right-4 text-gray-500" />
            </div>

            {/* نوع الطعام */}
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">نوع الطعام</label>
                <select className="w-full py-2 px-3 rounded-full border border-gray-300 bg-white text-sm text-right">
                    <option>نوع الطعام</option>
                    <option>حلويات</option>
                    <option>أطباق رئيسية</option>
                    <option>مقبلات</option>
                </select>
            </div>

            {/* التقييم */}
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">التقييم</label>
                <div className="flex flex-col gap-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="rating" className="radio radio-sm" />
                            <div className="flex gap-1">
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

            {/* المكونات الرئيسية */}
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">المكونات الرئيسية</label>
                <select className="w-full py-2 px-3 rounded-full border border-gray-300 bg-white text-sm text-right">
                    <option>المكونات</option>
                    <option>دجاج</option>
                    <option>لحم</option>
                    <option>خضروات</option>
                </select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2 text-sm text-gray-800">
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="checkbox checkbox-sm" />
                    <span>وصفات اليوم من فودي</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="checkbox checkbox-sm" />
                    <span>إمكانية التواصل مع الشيف لحجز موعد مناسبة</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="checkbox checkbox-sm" />
                    <span>أطباق لا تحتوي على مسببات الحساسية</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="checkbox checkbox-sm" />
                    <span>وصفات سريعة التحضير (أقل من 45 دقيقة)</span>
                </label>
            </div>

            {/* Button */}
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-full text-sm">
                عرض النتائج
            </button>
        </div>
    );
};

export default ChefFilter;
