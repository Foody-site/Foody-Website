import React from "react";
import { useNavigate } from "react-router";

const tabs = [
    { label: "الشيفات", type: "page", path: "/chef" },
    { label: "وصفات", type: "page", path: "/recipe" },
    { label: "عصائر/آيسكريم", type: "category", enum: "icecream" },
    { label: "أكلات صحية", type: "category", enum: "health" },
    { label: "حلويات", type: "category", enum: "patisserie" },
    { label: "كافيهات/قهوة", type: "category", enum: "icecream" },
    { label: "مطاعم", type: "category", enum: "restaurant" },
];

const CategoryTabs = ({ onCategoryChange }) => {
    const navigate = useNavigate();
    const [active, setActive] = React.useState("مطاعم");

    const handleClick = (tab) => {
        setActive(tab.label);
        if (tab.type === "page") {
            navigate(tab.path);
        } else {
            onCategoryChange(tab.enum);
        }
    };

    return (
        <div className="w-full flex justify-between flex-wrap gap-2 p-2 rounded-xl border border-[#808080]">
            {tabs.map((tab) => (
                <button
                    key={tab.label}
                    onClick={() => handleClick(tab)}
                    className={`min-w-[100px] px-4 py-2 rounded-lg mx-1 text-sm border transition-all duration-200 ${active === tab.label
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

export default CategoryTabs;