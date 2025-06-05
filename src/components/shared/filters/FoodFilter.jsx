import { useState } from "react";
import {
    FaMapMarkerAlt,
    FaCity,
    FaUtensils,
    FaBiking,
} from "react-icons/fa";
import SearchFilter from "../search/SearchFilter";
import RatingFilter from "../rating/RatingFilter";
import SelectInput from "../../../components/shared/inputs/SelectInput";

const FoodFilter = ({ onSearch }) => {
    const [selectedMeals, setSelectedMeals] = useState(["عشاء"]);
    const [selectedOptions, setSelectedOptions] = useState(["أضيف حديثاً"]);
    const [ratingRange, setRatingRange] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const toggleSelection = (value, state, setState) => {
        setState(
            state.includes(value)
                ? state.filter((item) => item !== value)
                : [...state, value]
        );
    };

    return (
        <div className="bg-[#D713130D] text-white p-4 rounded-xl w-80 space-y-4 font-sans text-sm">
            <div className="relative">
                <SearchFilter onSearch={onSearch} />
            </div>

            {/* المنطقة */}
            <div className="relative">
                <div className="absolute left-4 top-3 text-gray-500">
                    <FaMapMarkerAlt />
                </div>
                <SelectInput
                    name="region"
                    label=""
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white text-black rounded-lg"
                    options={[
                        { value: "", label: "قم بإختيار المنطقة" },
                        { value: "Riyadh", label: "الرياض" },
                        { value: "Mecca", label: "مكة المكرمة" },
                        { value: "Eastern", label: "الشرقية" },
                        { value: "Medina", label: "المدينة المنورة" },
                        { value: "Asir", label: "عسير" },
                        { value: "Al-Qassim", label: "القصيم" },
                        { value: "Tabuk", label: "تبوك" },
                        { value: "Hail", label: "حائل" },
                        { value: "Northern Borders", label: "الحدود الشمالية" },
                        { value: "Jizan", label: "جازان" },
                        { value: "Najran", label: "نجران" },
                        { value: "Al-Bahah", label: "الباحة" },
                        { value: "Al-Jouf", label: "الجوف" },
                    ]}
                />
            </div>

            {/* المدينة */}
            <div className="relative">
                <div className="absolute left-4 top-3 text-gray-500">
                    <FaCity />
                </div>
                <SelectInput
                    name="city"
                    label=""
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white text-black rounded-lg"
                    options={[
                        { value: "", label: "قم بإختيار المدينة" },
                        { value: "Mecca", label: "مكة المكرمة" },
                        { value: "Riyadh", label: "الرياض" },
                        { value: "Jeddah", label: "جدة" },
                        { value: "Dammam", label: "الدمام" },
                        { value: "Medina", label: "المدينة المنورة" },
                        { value: "Khobar", label: "الخبر" },
                    ]}
                />
            </div>

            {/* نوع المطعم */}
            <div className="relative">
                <select className="w-full appearance-none pl-10 pr-4 py-2 bg-white text-black rounded-lg">
                    <option>قم بإختيار نوع المطعم</option>
                </select>
                <div className="absolute left-4 top-2.5 text-gray-500"><FaUtensils /></div>
            </div>

            {/* نوع تطبيقات التوصيل */}
            <div className="relative">
                <select className="w-full appearance-none pl-10 pr-4 py-2 bg-white text-black rounded-lg">
                    <option>قم بإختيار نوع تطبيقات التوصيل</option>
                </select>
                <div className="absolute left-4 top-2.5 text-gray-500"><FaBiking /></div>
            </div>

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
                <RatingFilter
                    selectedRating={ratingRange?.min}
                    setRatingRange={setRatingRange}
                />
            </div>

            {/* الأزرار */}
            <div className="flex gap-2">
                <button
                    className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                    onClick={() => {
                        onSearch({
                            region: selectedRegion,
                            city: selectedCity,
                            meals: selectedMeals,
                            options: selectedOptions,
                            rating: ratingRange?.min,
                        });
                    }}
                >
                    عرض النتائج
                </button>
                <button
                    className="w-1/2 border border-red-600 text-red-600 py-2 rounded-lg"
                    onClick={() => {
                        setSelectedRegion("");
                        setSelectedCity("");
                        setSelectedMeals([]);
                        setSelectedOptions([]);
                        setRatingRange(null);
                        onSearch({});
                    }}
                >
                    الغاء التصفيات
                </button>
            </div>
        </div>
    );
};

export default FoodFilter;