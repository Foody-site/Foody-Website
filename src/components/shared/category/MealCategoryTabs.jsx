import { useEffect, useState } from "react";

const tabs = [
    { label: "العروض/الخصومات", enum: "discounts" },
    { label: "جديدنا", enum: "new" },
    { label: "الوجبات الرئيسية", enum: "main" },
    { label: "الوجبات الجانبية", enum: "side_meals" },
    { label: "المشروبات", enum: "drinks" },
];

const MealCategoryTabs = ({ activeTabLabel, onTabChange }) => {
    const [active, setActive] = useState(activeTabLabel || "الوجبات الرئيسية");

    useEffect(() => {
        if (activeTabLabel) {
            setActive(activeTabLabel);
        }
    }, [activeTabLabel]);

    const handleClick = (tab) => {
        setActive(tab.label);
        if (onTabChange) {
            onTabChange(tab.enum);
        }
    };

    return (
        <div className="w-full flex flex-wrap p-2 rounded-xl border border-[#808080]">
            {tabs.map((tab) => (
                <button
                    key={tab.label}
                    onClick={() => handleClick(tab)}
                    className={`flex-1 min-w-[100px] m-1 px-4 py-2 rounded-lg text-sm border transition-all duration-200 text-center ${active === tab.label
                        ? "bg-primary-1 text-white"
                        : "text-black border-[#808080]"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default MealCategoryTabs;