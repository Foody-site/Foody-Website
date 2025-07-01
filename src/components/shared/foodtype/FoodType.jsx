import { useState, useEffect, useRef } from "react";
import { FaHome, FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { api_url } from "../../../utils/ApiClient";

const FoodType = ({ selected = [], onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const res = await axios.get(`${api_url}/chef/recipe/types`);
                setOptions(res.data || []);
            } catch (err) {
                console.error("فشل تحميل أنواع الطعام", err);
            }
        };
        fetchTypes();
    }, []);

    const toggleSelect = (value) => {
        const isSelected = selected.includes(value);
        const newSelection = isSelected
            ? selected.filter((v) => v !== value)
            : [...selected, value];
        onChange(newSelection);
    };

    const getDisplay = () => {
        if (selected.length === 0) {
            return { text: "اختر نوع الطعام", isPlaceholder: true };
        }
        const firstLabel = options.find((o) => o.id === selected[0])?.name.ar;
        const restCount = selected.length - 1;
        return {
            text: restCount > 0 ? `${firstLabel}, (${restCount}) أخرى` : firstLabel,
            isPlaceholder: false,
        };
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const { text: displayText, isPlaceholder } = getDisplay();

    return (
        <div className="relative" ref={wrapperRef}>
            <label className="block text-gray-800 mb-1">نوع الطعام</label>
            <div
                className="flex justify-between items-center w-full pr-3 pl-3 py-2 rounded-md border border-gray-300 bg-white cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <IoIosArrowDown className="text-black text-lg" />
                <span className={`text-sm flex-1 text-right ${isPlaceholder ? "text-gray-400" : "text-gray-600"}`}>
                    {displayText}
                </span>
                <span className="text-gray-300 font-bold mx-2">|</span>
                <FaHome className="text-gray-400 mr-2" />
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-md text-sm max-h-60 overflow-y-auto">
                    {options.map((opt) => {
                        const isSelected = selected.includes(opt.id);
                        return (
                            <div
                                key={opt.id}
                                onClick={() => toggleSelect(opt.id)}
                                className={`flex flex-row-reverse items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                    isSelected ? "text-primary-1 font-semibold" : "text-gray-700"
                                }`}
                            >
                                <span>{opt.name.ar}</span>
                                {isSelected && <FaCheck className="text-primary-1 text-xs" />}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default FoodType;