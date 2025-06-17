import { FaChevronDown } from "react-icons/fa";

const SelectInput = ({ name, label, options, onChange, value }) => {
  return (
    <div className="flex flex-col relative">
      <label className="text-gray-700 font-medium mb-1">{label}</label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="p-2 border border-gray-300 rounded-md bg-white w-full appearance-none text-black pr-8"
        >
          <option value="" className="text-right">{label}</option>
          {options.map((option, index) => (
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
