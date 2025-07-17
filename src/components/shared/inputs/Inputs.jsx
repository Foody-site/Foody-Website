import { useState } from "react";
import { MdVisibility, MdVisibilityOff, MdAttachFile } from "react-icons/md";

const Inputs = ({
  name,
  label,
  type,
  className = "",
  Icon,
  Icon_2,
  value,
  onChange,
  placeholder,
  disabled,
  required = false, // Added required prop with default value
  ...otherProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState(""); // لتخزين اسم الملف
  const isPassword = type === "password";
  const isFile = type === "file";

  const handleFileChange = (e) => {
    setFileName(e.target.files[0]?.name || "");
    onChange && onChange(e); // استدعاء onChange الأصلي لو موجود
  };

  return (
    <div className="w-full">
      <label className="flex items-center justify-end text-gray-700 font-medium mb-1 gap-2">
        <div className="flex items-center">
          {required && <span className="text-red-600 ml-1 text-lg">*</span>}
          {label}
        </div>
        {Icon && <Icon size={20} />}
      </label>

      {isFile ? (
        <label className="relative w-full flex items-center gap-2 pl-10 pr-4 py-3 border border-gray-400 rounded-md bg-white focus-within:ring-2 focus-within:ring-hover_primary-1 cursor-pointer">
          <MdAttachFile
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          />
          <span className="text-gray-700 truncate">
            {fileName || placeholder || "اختر "}
          </span>
          <input
            name={name}
            type="file"
            onChange={handleFileChange}
            disabled={disabled}
            required={required}
            className="absolute inset-0 opacity-0 cursor-pointer"
            {...otherProps}
          />
        </label>
      ) : (
        <div className="relative flex items-center">
          <input
            name={name}
            type={isPassword && showPassword ? "text" : type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            dir="rtl"
            className={`w-full px-4 py-3 border border-gray-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-hover_primary-1 ${
              isPassword || Icon_2 ? "pr-10" : ""
            } ${className}`}
          />
          {isPassword ? (
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <MdVisibilityOff size={20} />
              ) : (
                <MdVisibility size={20} />
              )}
            </span>
          ) : (
            Icon_2 && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700">
                <Icon_2 size={24} />
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Inputs;
