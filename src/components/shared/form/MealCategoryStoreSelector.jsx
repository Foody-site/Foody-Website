import { useState, useEffect } from "react";
import SelectInput from "../inputs/SelectInput";

const MealCategoryStoreSelector = ({
  categoryValue,
  storeValue,
  stores,
  onCategoryChange,
  onStoreChange,
  className = "w-full h-12 px-6 text-xl py-4",
}) => {
  const [mealTypes, setMealTypes] = useState([]);

  // Translation mapping for meal types
  const translateMealType = (type) => {
    const translations = {
      Offers: "العروض",
      News: "جديدنا",
      "Main Meals": "الوجبات الرئيسيه",
      "Side Meals": "الوجبات الفرعيه",
      Drinks: "مشروبات",
      "Oriental Sweets": "حلويات شرقيه",
      "Western Sweets": "حلويات غربيه",
      Other: "اخرى",
      "Baked Goods and Crackers": "المخبوزات والمقرمشات",
      "Diet Meals": "وجبات دايت",
      Juices: "عصائر",
      "Ice Cream": "ايس كريم",
    };
    return translations[type] || type; // Return original if no translation found
  };

  useEffect(() => {
    if (storeValue && stores.length > 0) {
      // Find the selected store and get its meal types
      const selectedStore = stores.find((store) => store.value === storeValue);
      if (selectedStore && selectedStore.mealTypes) {
        const mealTypeOptions = selectedStore.mealTypes.map((type) => ({
          value: type, // Keep original format as expected by API
          label: translateMealType(type), // Use translated label
        }));
        setMealTypes(mealTypeOptions);
      } else {
        setMealTypes([]);
      }
    } else {
      setMealTypes([]);
    }
  }, [storeValue, stores]);

  return (
    <>
      <div>
        {!storeValue ? (
          <div className="text-gray-500">يرجى اختيار المتجر أولاً...</div>
        ) : mealTypes.length > 0 ? (
          <SelectInput
            name="category"
            label="فئه الوجبة"
            className={className}
            value={categoryValue}
            onChange={(e) => onCategoryChange(e.target.value)}
            options={mealTypes}
            required
          />
        ) : (
          <div className="text-gray-500">
            لا توجد فئات وجبات متاحة لهذا المتجر
          </div>
        )}
      </div>

      <div>
        {stores.length > 0 ? (
          <SelectInput
            name="store"
            label="اسم المتجر"
            className={className}
            value={storeValue}
            onChange={(e) => onStoreChange(e.target.value)}
            options={stores}
            required
          />
        ) : (
          <div className="text-gray-500">جاري تحميل المتاجر...</div>
        )}
      </div>
    </>
  );
};

export default MealCategoryStoreSelector;
