import { useState, useEffect, useRef } from "react";
import { FaUtensils, FaChevronDown, FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const options = [
    { value: "meat", label: "لحم" },
    { value: "chicken", label: "دجاج" },
    { value: "fish", label: "أسماك" },
    { value: "vegetable", label: "خضار" },
    { value: "rice", label: "أرز" },
    { value: "macaroni", label: "مكرونة" },
];

const MainIngredients = ({ selected = [], onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const toggleSelect = (value) => {
        const isSelected = selected.includes(value);
        if (isSelected) {
            onChange(selected.filter((v) => v !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    const getDisplay = () => {
        if (selected.length === 0) return "اختر المكونات الرئيسية";
        const first = options.find((o) => o.value === selected[0])?.label;
        const restCount = selected.length - 1;
        return restCount > 0 ? `${first}, (${restCount}) أخرى` : first;
    };

    useEffect(() => {
        const clickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", clickOutside);
        return () => document.removeEventListener("mousedown", clickOutside);
    }, []);

    return (
        <div className="relative" ref={wrapperRef}>
            <label className="block text-gray-800 mb-1">المكونات الرئيسية</label>
            <div
                className="flex justify-between items-center w-full pr-3 pl-3 py-2 rounded-md border border-gray-300 bg-white cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <IoIosArrowDown className="text-black text-lg" />
                <span className="text-sm text-gray-400 flex-1 text-right">{getDisplay()}</span>
                <span className="text-gray-300 font-bold mx-2">|</span>
                <FaUtensils className="text-gray-400 mr-2" />
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-md text-sm max-h-60 overflow-y-auto">
                    {options.map((opt) => {
                        const isSelected = selected.includes(opt.value);
                        return (
                            <div
                                key={opt.value}
                                onClick={() => toggleSelect(opt.value)}
                                className={`flex flex-row-reverse items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 ${isSelected ? "text-primary-1 font-semibold" : "text-gray-700"
                                    }`}
                            >
                                <span>{opt.label}</span>
                                {isSelected && <FaCheck className="text-primary-1 text-xs" />}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MainIngredients;