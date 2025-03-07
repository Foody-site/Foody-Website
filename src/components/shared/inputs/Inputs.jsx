import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Inputs = ({ name, label, type, className = "", icon, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full">
      <label className="block text-gray-700 font-medium text-right mb-1">{label}</label>
      <div className="relative">
        <input
          name={name}
          type={isPassword && showPassword ? "text" : type} 
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-hover_primary-1 ${className}`}
        />
        {isPassword ? (
          <span
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
          </span>
        ) : (
          icon && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700">
              <i className={`fas fa-${icon}`}></i>
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default Inputs;
