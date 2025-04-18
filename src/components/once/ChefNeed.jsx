import React from "react";
import { FaMapMarkerAlt, FaHeart, FaUserFriends, FaBirthdayCake, FaGraduationCap, FaEllipsisH } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";

const ChefNeed = () => {
    return (
        <div className="flex flex-col lg:flex-row items-start justify-center p-6 gap-10 bg-white min-h-screen">
            {/* Left Section - Chef Info */}
            <div className="flex flex-col items-center text-center gap-2">
                <img
                    src="/public/assets/home/chef.png"
                    alt="Chef"
                    className="rounded-full w-28 h-28 object-cover"
                />
                <div className="flex items-center gap-1 text-yellow-500 mt-2">
                    <AiFillStar />
                    <span className="text-red-600 font-semibold text-lg">4.7</span>
                </div>
                <h2 className="text-xl font-bold">هشام باعشن</h2>
                <p className="text-gray-600 text-sm leading-5 max-w-xs">
                    صانع محتوى - شيف سعودي ويقدم مدونة الطعام لكل حكاية
                </p>
                <div className="flex gap-4 mt-2 text-sm text-gray-700">
                    <div>الرياض <FaMapMarkerAlt className="inline ml-1" /></div>
                    <div>122 متابع</div>
                    <div>20 وصفة</div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="w-full max-w-md">
                <h2 className="text-center text-xl font-bold mb-4">المناسبة</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <label className="flex items-center gap-2 border border-gray-300 rounded-lg py-2 px-4 cursor-pointer">
                        <input type="radio" name="occasion" className="radio radio-primary" />
                        <span className="flex items-center gap-1">
                            <FaBirthdayCake className="text-xl" />
                            عيد ميلاد
                        </span>
                    </label>

                    <label className="flex items-center gap-2 border border-gray-300 rounded-lg py-2 px-4 cursor-pointer">
                        <input type="radio" name="occasion" className="radio radio-primary" />
                        <span className="flex items-center gap-1">
                            🎉 تجمع عائلي
                        </span>
                    </label>

                    <label className="flex items-center gap-2 border border-gray-300 rounded-lg py-2 px-4 cursor-pointer">
                        <input type="radio" name="occasion" className="radio radio-primary" />
                        <span className="flex items-center gap-1">
                            <FaGraduationCap className="text-xl" />
                            حفلة تخرج
                        </span>
                    </label>

                    <label className="flex items-center gap-2 border border-gray-300 rounded-lg py-2 px-4 cursor-pointer">
                        <input type="radio" name="occasion" className="radio radio-primary" />
                        <span className="flex items-center gap-1">
                            <FaUserFriends className="text-xl" />
                            تجمع اصدقاء
                        </span>
                    </label>

                    <label className="flex items-center gap-2 border border-gray-300 rounded-lg py-2 px-4 cursor-pointer">
                        <input type="radio" name="occasion" className="radio radio-primary" />
                        <span className="flex items-center gap-1">
                            <FaHeart className="text-xl text-red-500" />
                            ليلة رومانسية
                        </span>
                    </label>

                    <label className="flex items-center gap-2 border border-gray-300 rounded-lg py-2 px-4 cursor-pointer">
                        <input type="radio" name="occasion" className="radio radio-primary" />
                        <span className="flex items-center gap-1">
                            <FaEllipsisH className="text-xl" />
                            أخرى
                        </span>
                    </label>
                </div>

                {/* Date */}
                <div className="mb-4">
                    <label className="label">
                        <span className="label-text text-right block w-full mb-1">تاريخ المناسبة :</span>
                    </label>
                    <div className="relative">
                        <input type="date" className="input input-bordered bg-black text-white w-full pl-10" />
                        <BsCalendar2Date className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>

                {/* City */}
                <div className="mb-6">
                    <label className="label">
                        <span className="label-text text-right block w-full mb-1">المدينة :</span>
                    </label>
                    <div className="relative">
                        <select className="select select-bordered w-full bg-black text-white">
                            <option disabled selected>اختر المدينة</option>
                            <option>الرياض</option>
                            <option>جدة</option>
                            <option>مكة</option>
                        </select>
                        <FiChevronDown className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>

                {/* Button */}
                <button className="btn btn-error text-white w-full rounded-full">
                    ارسل الى الشيف
                </button>
            </div>
        </div>
    );
};

export default ChefNeed;
