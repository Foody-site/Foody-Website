import { useState } from "react";
import { FaHome, FaUtensils } from "react-icons/fa";
import SearchFilter from "../search/SearchFilter";
import MoreDetails from "../MoreDetails/MoreDetails";

const RecipeFilter = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [moreDetails, setMoreDetails] = useState({
        todayRecipe: false,
        isAllergenic: false,
        isFastFood: false,
        canContactChef: false,
    });

    const handleSearch = () => {
        const filters = {
            name: query,
            ...moreDetails,
        };

        onSearch && onSearch(filters);
    };

    const handleClear = () => {
        setQuery("");
        setMoreDetails({
            todayRecipe: false,
            isAllergenic: false,
            isFastFood: false,
            canContactChef: false,
        });

        onSearch && onSearch({});
    };

    return (
        <div className="bg-[#FDF3F1] p-4 rounded-xl w-full lg:w-80 space-y-4 text-right font-sans text-sm">
            <SearchFilter
                value={query}
                onChange={(val) => setQuery(val)}
                onSearch={() => handleSearch()}
            />

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

            <MoreDetails values={moreDetails} onChange={setMoreDetails} />

            <div className="flex flex-row-reverse gap-3 mt-4">
                <button
                    className="w-full bg-primary-1 hover:opacity-90 text-white font-bold py-2 rounded-md"
                    onClick={handleSearch}
                >
                    عرض النتائج
                </button>
                <button
                    className="w-full border border-primary-1 text-primary-1 font-bold py-2 rounded-md"
                    onClick={handleClear}
                >
                    الغاء التصفيات
                </button>
            </div>
        </div>
    );
};

export default RecipeFilter;