import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const CheckboxDropdown = ({
  name,
  label,
  options,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedSelection = checked
      ? [...selectedOptions, value]
      : selectedOptions.filter((item) => item !== value);

    setSelectedOptions(updatedSelection);
    onChange({
      target: {
        name: name,
        value: updatedSelection,
      },
    });
  };

  // تنسيق عرض العناصر المحددة
  const displaySelectedOptions = () => {
    if (selectedOptions.length === 0) return "اختر";

    if (selectedOptions.length === 1) {
      return options.find((opt) => opt.value === selectedOptions[0])?.label;
    }

    // إذا تم تحديد أكثر من عنصر، نعرض الأول مع عدد العناصر المتبقية
    const firstOption = options.find(
      (opt) => opt.value === selectedOptions[0]
    )?.label;
    return `${firstOption} و${selectedOptions.length - 1} أخرى`;
  };

  return (
    <div className={`relative ${className}`}>
    <label className="block text-gray-700 font-medium mb-1 text-right">
      {label}
    </label>
  
    <button
      type="button"
      className="w-full text-right border border-gray-300 p-2 bg-white rounded-md flex justify-between items-center"
      onClick={handleToggle}
    >
      <FaChevronDown className="text-gray-500" />
      <span className="text-gray-600 truncate max-w-[90%] overflow-hidden">
        {displaySelectedOptions()}
      </span>
    </button>
  
    {isOpen && (
      <div className="absolute right-0 w-full mt-1 border bg-white shadow-md rounded-md max-h-60 overflow-y-auto z-10">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer text-right"
          >
            <input
              type="checkbox"
              value={option.value}
              checked={selectedOptions.includes(option.value)}
              onChange={handleCheckboxChange}
              className="w-5 h-5 accent-hover_primary-1 ml-2 min-w-[20px] min-h-[20px]"
            />
            <span className="overflow-hidden text-ellipsis">{option.label}</span>
          </label>
        ))}
      </div>
    )}
  </div>
  
  );
};

export default CheckboxDropdown;
