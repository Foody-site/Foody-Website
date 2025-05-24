import React, { useState } from "react";
import {
    FaSearch,
    FaMapMarkerAlt,
    FaCity,
    FaUtensils,
    FaBiking,
    FaStar,
    FaRegStar,
} from "react-icons/fa";

const FoodFilter = () => {
    const [priceRange, setPriceRange] = useState({ min: 10, max: 50 });
    const [selectedMeals, setSelectedMeals] = useState(["عشاء"]);
    const [selectedOptions, setSelectedOptions] = useState(["أضيف حديثاً"]);
    const [selectedRating, setSelectedRating] = useState(1);

    const toggleSelection = (value, state, setState) => {
        setState(
            state.includes(value)
                ? state.filter((item) => item !== value)
                : [...state, value]
        );
    };

    return (
        <div className="bg-[#D713130D] text-white p-4 rounded-xl w-80 space-y-4 font-sans text-sm">

            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="ما الذي تريد أن تبحث عنه؟"
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-black focus:outline-none"
                />
                <FaSearch className="absolute top-2.5 left-4 text-gray-500" />
            </div>

            {/* السعر */}
            <div>
                <label className="block mb-2 text-white">السعر</label>
                <div className="relative">
                    <input
                        type="range"
                        min={10}
                        max={50}
                        value={priceRange.max}
                        onChange={(e) =>
                            setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
                        }
                        className="w-full"
                    />
                    <div className="flex justify-between text-red-600 text-sm font-bold mt-2">
                        <span>ريال 10</span>
                        <span>ريال 50</span>
                    </div>
                </div>
            </div>

            {/* Dropdowns */}
            {[
                { label: "المنطقة", icon: <FaMapMarkerAlt /> },
                { label: "المدينة", icon: <FaCity /> },
                { label: "نوع المطعم", icon: <FaUtensils /> },
                { label: "نوع تطبيقات التوصيل", icon: <FaBiking /> },
            ].map((item, i) => (
                <div key={i} className="relative">
                    <select className="w-full appearance-none pl-10 pr-4 py-2 bg-white text-black rounded-lg">
                        <option>قم بإختيار {item.label}</option>
                    </select>
                    <div className="absolute left-4 top-2.5 text-gray-500">{item.icon}</div>
                </div>
            ))}

            {/* نوع الوجبة */}
            <div>
                <label className="block mb-2 text-white">نوع الوجبة</label>
                {["فطور", "فطور متأخر", "غداء", "عشاء"].map((meal) => (
                    <label
                        key={meal}
                        className="flex justify-between items-center bg-white text-black px-3 py-2 rounded-lg mb-1"
                    >
                        <span>{meal}</span>
                        <input
                            type="checkbox"
                            checked={selectedMeals.includes(meal)}
                            onChange={() =>
                                toggleSelection(meal, selectedMeals, setSelectedMeals)
                            }
                            className="accent-primary-1"
                        />
                    </label>
                ))}
            </div>

            {/* مزيد من الخيارات */}
            <div>
                <label className="block mb-2 text-white">مزيد من الخيارات</label>
                {[
                    "مفتوح الآن",
                    "جلسات داخلية",
                    "جلسات خارجية",
                    "يوجد توصيل",
                    "جلسات عائلية",
                    "يوجد حجز مسبق",
                    "أضيف حديثاً",
                ].map((opt) => (
                    <label
                        key={opt}
                        className="flex justify-between items-center bg-white text-black px-3 py-2 rounded-lg mb-1"
                    >
                        <span>{opt}</span>
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(opt)}
                            onChange={() =>
                                toggleSelection(opt, selectedOptions, setSelectedOptions)
                            }
                            className="accent-primary-1"
                        />
                    </label>
                ))}
            </div>

            {/* التقييم */}
            <div>
                <label className="block mb-2 text-white">التقييم</label>
                {[5, 4, 3, 2, 1].map((rating) => (
                    <label
                        key={rating}
                        className="flex justify-between items-center bg-white text-black px-3 py-2 rounded-lg mb-1"
                    >
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) =>
                                i < rating ? (
                                    <FaStar key={i} className="text-yellow-500" />
                                ) : (
                                    <FaRegStar key={i} className="text-gray-300" />
                                )
                            )}
                        </div>
                        <input
                            type="checkbox"
                            checked={selectedRating === rating}
                            onChange={() => setSelectedRating(rating)}
                            className="accent-primary-1"
                        />
                    </label>
                ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
                <button className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">
                    عرض النتائج
                </button>
                <button className="w-1/2 border border-red-600 text-red-600 py-2 rounded-lg">
                    الغاء التصفيات
                </button>
            </div>
        </div>
    );
};

export default FoodFilter;