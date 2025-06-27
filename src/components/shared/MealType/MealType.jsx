import { FaCheck } from "react-icons/fa";

const mealOptions = [
  { key: "breakfast", label: "فطور" },
  { key: "lateBreakfast", label: "فطور متأخر" },
  { key: "lunch", label: "غداء" },
  { key: "dinner", label: "عشاء" },
];

const MealType = ({ selectedMeals, setSelectedMeals }) => {
  const toggleMeal = (key) => {
    setSelectedMeals((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div>
      <label className="block mb-2 text-black font-semibold text-right pb-2">نوع الوجبة</label>
      {mealOptions.map(({ key, label }) => {
        const isSelected = selectedMeals[key];

        return (
          <div
            key={key}
            onClick={() => toggleMeal(key)}
            className={`flex items-center justify-between bg-white px-3 py-2 rounded-lg mb-2 cursor-pointer ${
              isSelected ? "text-[#030303]" : "text-[#808080]"
            }`}
          >
            {/* Start checkmark (left) */}
            <div className="w-4">
              {isSelected && <FaCheck className="text-primary-1 text-sm" />}
            </div>

            {/* Text (center) */}
            <div
              className={`flex-1 text-right text-sm font-semibold px-2 ${
                isSelected ? "text-[#030303]" : "text-[#808080]"
              }`}
            >
              {label}
            </div>

            {/* Checkbox (right) */}
            <div
              className={`w-4 h-4 flex items-center justify-center rounded-md border ${
                isSelected ? "border-primary-1" : "border-[#808080]"
              }`}
            >
              {isSelected && (
                <div className="bg-primary-1 w-4 h-4 flex items-center justify-center rounded-[4px]">
                  <FaCheck className="text-white text-[10px]" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MealType;