const MealType = ({ selectedMeals, setSelectedMeals }) => {
    const toggleMeal = (key) => {
        setSelectedMeals((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const mealOptions = [
        { key: "breakfast", label: "فطور" },
        { key: "lateBreakfast", label: "فطور متأخر" },
        { key: "lunch", label: "غداء" },
        { key: "dinner", label: "عشاء" },
    ];

    return (
        <div>
            <label className="block mb-2 text-white">نوع الوجبة</label>
            {mealOptions.map(({ key, label }) => (
                <label
                    key={key}
                    className="flex justify-between items-center bg-white text-black px-3 py-2 rounded-lg mb-1"
                >
                    <span>{label}</span>
                    <input
                        type="checkbox"
                        checked={!!selectedMeals[key]}
                        onChange={() => toggleMeal(key)}
                        className="accent-primary-1"
                    />
                </label>
            ))}
        </div>
    );
};

export default MealType;