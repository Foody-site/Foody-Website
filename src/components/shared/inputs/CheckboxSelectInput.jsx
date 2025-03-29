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
        name: name, // اسم الحقل
        value: updatedSelection, // القيم المحددة
      },
    });
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
        <span className="text-gray-600">
          {selectedOptions.length > 0
            ? selectedOptions
                .map((val) => options.find((opt) => opt.value === val)?.label)
                .join(", ")
            : "اختر"}
        </span>
        <FaChevronDown className="text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 w-full mt-1 border bg-white shadow-md rounded-md max-h-60 overflow-y-auto z-10">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                value={option.value}
                checked={selectedOptions.includes(option.value)}
                onChange={handleCheckboxChange}
                className="ml-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown;
