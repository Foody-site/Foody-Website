import { FaChevronDown } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const SelectInput = ({
  name,
  label,
  options,
  onChange,
  value,
  placeholder,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  // Find the selected option object
  useEffect(() => {
    const option = options.find((opt) => opt.value === value);
    setSelectedOption(option || null);
  }, [value, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);

    // Create a synthetic event to match the original onChange signature
    const syntheticEvent = {
      target: {
        name: name,
        value: option.value,
      },
    };

    if (onChange) {
      onChange(syntheticEvent);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col relative group">
      {label && (
        <label className="text-gray-700 font-semibold mb-2 flex justify-end items-center text-sm">
          {required && <span className="text-red-500 mr-1 text-lg">*</span>}
          {label}
        </label>
      )}
      <div className="relative" ref={dropdownRef}>
        {/* Hidden input for form submission */}
        <input type="hidden" name={name} value={value || ""} />

        {/* Custom dropdown trigger */}
        <div
          onClick={toggleDropdown}
          className={`p-3 border-2 rounded-lg bg-white w-full text-gray-800 pr-10 transition-all duration-200 cursor-pointer font-medium text-right flex items-center justify-between ${
            isOpen
              ? "border-primary-1 shadow-lg ring-2 ring-primary-1 ring-opacity-20"
              : "border-gray-200 hover:border-gray-300"
          } ${!selectedOption ? "text-gray-400" : "text-gray-800"}`}
        >
          <span className="flex-1 text-right">
            {selectedOption
              ? selectedOption.label
              : placeholder || label || "اختر..."}
          </span>
        </div>

        {/* Custom dropdown arrow */}
        <div
          className={`absolute inset-y-0 left-3 flex items-center pointer-events-none transition-all duration-200 ${
            isOpen
              ? "text-primary-1 rotate-180"
              : "text-gray-400 group-hover:text-primary-1"
          }`}
        >
          <FaChevronDown size={14} />
        </div>

        {/* Dropdown options */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
            {options
              .filter((option) => option.value !== "")
              .map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`px-4 py-3 text-right cursor-pointer transition-all duration-150 font-medium border-b border-gray-100 last:border-b-0 ${
                    value === option.value
                      ? "bg-primary-1 text-white"
                      : "text-gray-700 hover:bg-gray-50 hover:text-primary-1"
                  }`}
                >
                  {option.label}
                </div>
              ))}

            {options.filter((option) => option.value !== "").length === 0 && (
              <div className="px-4 py-3 text-center text-gray-400 font-medium">
                لا توجد خيارات متاحة
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
