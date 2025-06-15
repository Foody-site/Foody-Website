import {
    FaMapMarkerAlt,
    FaHeart,
    FaUserFriends,
    FaBirthdayCake,
    FaGraduationCap,
    FaEllipsisH,
} from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import PageWrapper from "../common/PageWrapper";

const ChefNeed = () => {
    const occasions = [
        { label: "ليلة رومانسية", icon: <FaHeart /> },
        { label: "تجمع عائلي", icon: <BsCalendar2Date /> },
        { label: "حفلة تخرج", icon: <FaGraduationCap /> },
        { label: "تجمع اصدقاء", icon: <FaUserFriends /> },
        { label: "عيد ميلاد", icon: <FaBirthdayCake /> },
        { label: "أخرى", icon: <FaEllipsisH /> },
    ];

    return (
        <PageWrapper>
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Left Section - Form */}
                <div className="w-full lg:w-2/3">
                    <h2 className="text-2xl font-bold mb-6 text-right">المناسبة</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {occasions.map((item, idx) => (
                            <label
                                key={idx}
                                className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 cursor-pointer text-right"
                            >
                                <span className="flex items-center gap-2 text-sm text-gray-700">
                                    <span className="text-primary-1">{item.icon}</span>
                                    {item.label}
                                </span>
                                <input
                                    type="radio"
                                    name="occasion"
                                    className="form-radio text-primary-1 w-4 h-4"
                                />
                            </label>
                        ))}
                    </div>

                    {/* Date Field */}
                    <div className="mb-4">
                        <label className="block mb-2 text-right font-medium">تاريخ المناسبة</label>
                        <div className="flex flex-row-reverse items-center border rounded px-3 py-2">
                            <BsCalendar2Date className="ml-2 text-gray-500" />
                            <input
                                type="date"
                                className="flex-grow bg-transparent text-right outline-none"
                            />
                        </div>
                    </div>

                    {/* City Dropdown */}
                    <div className="mb-4">
                        <label className="block mb-2 text-right font-medium">المدينة</label>
                        <div className="flex flex-row-reverse items-center border rounded px-3 py-2">
                            <FaMapMarkerAlt className="ml-2 text-gray-500" />
                            <select className="flex-grow bg-transparent text-right outline-none">
                                <option value="">اختر المدينة</option>
                                <option>الرياض</option>
                                <option>جدة</option>
                                <option>مكة</option>
                            </select>
                        </div>
                    </div>

                    {/* Guests */}
                    <div className="mb-4">
                        <label className="block mb-2 text-right font-medium">عدد المدعوين</label>
                        <div className="flex flex-row-reverse items-center border rounded px-3 py-2">
                            <FaUserFriends className="ml-2 text-gray-500" />
                            <input
                                type="number"
                                className="flex-grow bg-transparent text-right outline-none"
                                placeholder="أدخل العدد"
                            />
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="mb-6">
                        <label className="block mb-2 text-right font-medium">رقم التواصل</label>
                        <div className="flex flex-row-reverse items-center border rounded px-3 py-2">
                            <FaUserFriends className="ml-2 text-gray-500" />
                            <input
                                type="tel"
                                className="flex-grow bg-transparent text-right outline-none"
                                placeholder="أدخل رقم الهاتف"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button className="w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-md text-center font-semibold">
                        حجز الشيف
                    </button>
                </div>

                {/* Right Section - Chef Info */}
                <div className="w-full lg:w-1/3 border rounded-lg p-4 text-center shadow-sm">
                    <img
                        src="/public/assets/home/chef.png"
                        alt="Chef"
                        className="rounded-full w-20 h-20 object-cover mx-auto"
                    />
                    <h3 className="text-xl font-bold mt-2">هشام باعشن</h3>
                    <p className="text-sm text-gray-500 mb-2">أنواع وصفات الطبخ هنا</p>

                    <div className="flex justify-between text-center py-3 border-t border-b my-2 text-sm">
                        <div>
                            <p className="font-bold text-gray-900">1700+</p>
                            <p className="text-gray-600">عدد الوصفات</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">456</p>
                            <p className="text-gray-600">عدد المتابعين</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">120</p>
                            <p className="text-gray-600">عدد الزوار</p>
                        </div>
                    </div>

                    <button className="w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-md font-semibold">
                        المتابعة
                    </button>
                </div>
            </div>
        </PageWrapper>
    );
};

export default ChefNeed;