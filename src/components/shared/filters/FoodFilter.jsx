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
import MoreChoicesFilter from "../MoreChoicesFilter/MoreChoicesFilter";
import DeliveryApps from "../DeliveryApps/DeliveryApps";
import MealType from "../MealType/MealType";
import PlaceSearch from "../PlaceSearch/PlaceSearch";

const FoodFilter = ({ onSearch }) => {
    const [selectedMeals, setSelectedMeals] = useState({
        breakfast: false,
        lateBreakfast: false,
        lunch: false,
        dinner: true,
    });

    const [selectedOptions, setSelectedOptions] = useState(["أضيف حديثاً"]);
    const [ratingRange, setRatingRange] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDeliveryApps, setSelectedDeliveryApps] = useState([]);

    const handleSearch = () => {
        const deliveryAppParams = selectedDeliveryApps.reduce((acc, app) => {
            acc[app] = true;
            return acc;
        }, {});

        const optionsObj = {
            isOpen: selectedOptions.includes("مفتوح الآن"),
            indoorSessions: selectedOptions.includes("جلسات داخلية"),
            outdoorSessions: selectedOptions.includes("جلسات خارجية"),
            hasDelivery: selectedOptions.includes("يوجد توصيل"),
            familySessions: selectedOptions.includes("جلسات عائلية"),
            preBooking: selectedOptions.includes("يوجد حجز مسبق"),
            newStore: selectedOptions.includes("أضيف حديثاً"),
        };

        const mealParams = Object.entries(selectedMeals).reduce((acc, [key, value]) => {
            if (value) acc[key] = true;
            return acc;
        }, {});

        onSearch({
            ...deliveryAppParams,
            region: selectedRegion,
            city: selectedCity,
            rating: ratingRange?.min,
            ...optionsObj,
            ...mealParams,
        });
    };

    return (
        <div className="bg-[#D713130D] text-white p-4 rounded-xl w-80 space-y-4 font-sans text-sm">
            <div className="relative">
                <SearchFilter onSearch={onSearch} />
            </div>

            <div className="relative">
                <PlaceSearch
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                />
            </div>

            {/* <div className="relative">
                <select className="w-full appearance-none pl-10 pr-4 py-2 bg-white text-black rounded-lg">
                    <option>قم بإختيار نوع المطعم</option>
                </select>
                <div className="absolute left-4 top-2.5 text-gray-500"><FaUtensils /></div>
            </div> */}

            <div className="relative">
                <DeliveryApps
                    selectedApps={selectedDeliveryApps}
                    setSelectedApps={setSelectedDeliveryApps}
                />

            </div>

            <MealType
                selectedMeals={selectedMeals}
                setSelectedMeals={setSelectedMeals}
            />

            <div>
                <MoreChoicesFilter
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                />
            </div>

            <div>
                <RatingFilter
                    selectedRating={ratingRange?.min}
                    setRatingRange={setRatingRange}
                />
            </div>

            <div className="flex gap-2">
                <button
                    className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                    onClick={handleSearch}
                >
                    عرض النتائج
                </button>
                <button
                    className="w-1/2 border border-red-600 text-red-600 py-2 rounded-lg"
                    onClick={() => {
                        setSelectedRegion("");
                        setSelectedCity("");
                        setSelectedMeals({
                            breakfast: false,
                            lateBreakfast: false,
                            lunch: false,
                            dinner: false,
                        });
                        setSelectedOptions([]);
                        setRatingRange(null);
                        onSearch({});
                        setSelectedDeliveryApps([]);
                    }}
                >
                    الغاء التصفيات
                </button>
            </div>
        </div>
    );
};

export default FoodFilter;