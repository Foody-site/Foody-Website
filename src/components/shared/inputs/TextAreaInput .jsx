import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const TextAreaInput = ({
  name,
  label,
  className = "",
  Icon,
  value,
  onChange,
  placeholder,
  disabled,
  rows = 4,
  required = false, // Added required prop with default value
}) => {
  return (
    <div className="w-full">
      <label className="flex items-center justify-end text-gray-700 font-medium mb-1 gap-2">
        {Icon && <Icon size={20} />}
        <div className="flex items-center">
          {required && <span className="text-red-600 mr-1 text-lg">*</span>}
          {label}
        </div>
      </label>
      <div className="relative">
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          dir="rtl"
          rows={rows}
          className={`w-full px-4 py-3 border border-gray-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-hover_primary-1 resize-none ${className}`}
        />
      </div>
    </div>
  );
};

export default TextAreaInput;
