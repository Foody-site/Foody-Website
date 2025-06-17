import React from "react";
import { FaSearch, FaHome, FaUtensils } from "react-icons/fa";

const ChefFilter = () => {
    return (
        <div className="bg-[#FDF3F1] p-4 rounded-xl w-80 space-y-4 text-right font-sans text-sm">
            {/* Header */}
            <h2 className="font-bold text-md text-gray-800">البحث</h2>

            {/* Search */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="يتم كتابة اسم الشيف هنا"
                    className="w-full pr-10 pl-4 py-2 rounded-md border border-gray-300 focus:outline-none"
                />
                <FaSearch className="absolute top-2.5 right-3 text-gray-400" />
            </div>

            {/* نوع الطعام */}
            <div className="relative">
                <label className="block text-gray-800 mb-1">نوع الطعام</label>
                <select className="w-full pr-10 pl-3 py-2 rounded-md border border-gray-300 bg-white">
                    <option>تم اختيار نوع الطعام</option>
                    <option>حلويات</option>
                    <option>أطباق رئيسية</option>
                    <option>مقبلات</option>
                </select>
                <FaHome className="absolute top-9 right-3 text-gray-400" />
            </div>

            {/* المكونات الرئيسية */}
            <div className="relative">
                <label className="block text-gray-800 mb-1">المكونات الرئيسية</label>
                <select className="w-full pr-10 pl-3 py-2 rounded-md border border-gray-300 bg-white">
                    <option>تم اختيار المكونات الرئيسية</option>
                    <option>دجاج</option>
                    <option>لحم</option>
                    <option>خضروات</option>
                </select>
                <FaUtensils className="absolute top-9 right-3 text-gray-400" />
            </div>

            {/* مزيد من التفاصيل */}
            <h2 className="font-bold text-md text-gray-800">مزيد من التفاصيل</h2>

            <div className="space-y-3 text-gray-700">
                {[
                    "وصفات اليوم من فودي",
                    "إمكانية التواصل مع الشيف لحجز موعد مناسبة",
                    "وصفات سريعة التحضير (أقل من 45 دقيقة)",
                    "أطعمة لا تحتوي على مسببات الحساسية"
                ].map((label, i) => (
                    <label key={i} className="flex items-center justify-between bg-white px-3 py-2 rounded-md border border-gray-200 cursor-pointer">
                        <span>{label}</span>
                        <input type="checkbox" className="form-checkbox text-primary-1 w-4 h-4" />
                    </label>
                ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
                <button className="w-full bg-primary-1 hover:opacity-90 text-white font-bold py-2 rounded-md">
                    عرض النتائج
                </button>
                <button className="w-full border border-primary-1 text-primary-1 font-bold py-2 rounded-md">
                    الغاء التصفيات
                </button>
            </div>
        </div>
    );
};

export default ChefFilter;