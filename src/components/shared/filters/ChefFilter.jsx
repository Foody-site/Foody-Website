import { useState } from "react";
import { FaHome, FaUtensils } from "react-icons/fa";
import SearchFilter from "../search/SearchFilter";
import MoreDetails from "../MoreDetails/MoreDetails";
import FoodType from "../foodtype/FoodType";
import MainIngredients from "../mainIngredients/MainIngredients";

const ChefFilter = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [foodTypes, setFoodTypes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [moreDetails, setMoreDetails] = useState({
        todayRecipe: false,
        isAllergenic: false,
        isFastFood: false,
        canContactChef: false,
    });

    const handleSearch = () => {
        const filters = {};

        if (query.trim() !== "") {
            filters.name = query.trim();
        }

        if (foodTypes.length > 0) {
            filters.recipeTypes = foodTypes.join(",");
        }

        if (ingredients.length > 0) {
            filters.mainIngredient = ingredients.join(",");
        }

        Object.entries(moreDetails).forEach(([key, value]) => {
            if (value === true) {
                filters[key] = true;
            }
        });

        onSearch && onSearch(filters);
    };

    const handleClear = () => {
        setQuery("");
        setFoodTypes([]);
        setIngredients([]);
        setMoreDetails({
            todayRecipe: false,
            isAllergenic: false,
            isFastFood: false,
            canContactChef: false,
        });

        onSearch && onSearch({});
    };

    return (
        <div className="bg-[#FDF3F1] p-4 rounded-xl w-80 space-y-4 text-right font-sans text-sm">
            {/* Search input (reusable component) */}
            <SearchFilter
                value={query}
                onChange={(val) => setQuery(val)}
                onSearch={() => handleSearch()}
            />

            <div className="relative">
                <FoodType selected={foodTypes} onChange={setFoodTypes} />
            </div>

            <div className="relative">
                <MainIngredients selected={ingredients} onChange={setIngredients} />
            </div>

            <MoreDetails values={moreDetails} onChange={setMoreDetails} />

            <div className="flex flex-row-reverse gap-3 mt-4">
                <button
                    className="w-full bg-primary-1 hover:opacity-90 text-white py-2 rounded-md"
                    onClick={handleSearch}
                >
                    عرض النتائج
                </button>
                <button
                    className="w-full border border-primary-1 text-primary-1 py-2 rounded-md"
                    onClick={handleClear}
                >
                    الغاء التصفيات
                </button>
            </div>
        </div>
    );
};

export default ChefFilter;