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
}) => {
  return (
    <div className="w-full">
      <label className="flex items-center justify-end text-gray-700 font-medium mb-1 gap-2">
        {Icon && <Icon size={20} />}
        {label}
      </label>
      <div className="relative">
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          dir="rtl"
          rows={rows}
          className={`w-full px-4 py-3 border border-gray-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-hover_primary-1 resize-none ${className}`}
        />
      </div>
    </div>
  );
};

export default TextAreaInput;
