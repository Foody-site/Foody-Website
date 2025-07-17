import { FaChevronDown } from "react-icons/fa";

const SelectInput = ({
  name,
  label,
  options,
  onChange,
  value,
  placeholder,
  required = false, // Added required prop with default value
}) => {
  return (
    <div className="flex flex-col relative">
      {label && (
        <label className="text-gray-700 font-medium mb-1 flex justify-end items-center">
          {required && <span className="text-red-600 mr-1 text-lg">*</span>}
          {label}
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="p-2 border border-gray-300 rounded-md bg-white w-full appearance-none text-black pr-8"
        >
          <option value="" className="text-gray-500 text-right">
            {placeholder || label || "اختر..."}
          </option>
          {options
            .filter((option) => option.value !== "")
            .map((option, index) => (
              <option key={index} value={option.value} className="text-right">
                {option.label}
              </option>
            ))}
        </select>
        <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none text-gray-500">
          <FaChevronDown />
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
