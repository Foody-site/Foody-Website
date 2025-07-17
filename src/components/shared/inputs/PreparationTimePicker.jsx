import React, { useState, useEffect } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const PreparationTimePicker = ({
  label,
  onHourChange,
  onMinuteChange,
  className = "",
  error,
  hourValue, // قيمة افتراضية للساعات
  minuteValue, // قيمة افتراضية للدقائق
  required = false, // Added required prop with default value
}) => {
  const [hours, setHours] = useState(hourValue !== undefined ? hourValue : 0);
  const [minutes, setMinutes] = useState(
    minuteValue !== undefined ? minuteValue : 0
  );

  // تحديث القيم المحلية عندما تتغير القيم الخارجية
  useEffect(() => {
    if (hourValue !== undefined) {
      setHours(hourValue);
    }
  }, [hourValue]);

  useEffect(() => {
    if (minuteValue !== undefined) {
      setMinutes(minuteValue);
    }
  }, [minuteValue]);

  const handleHourChange = (value) => {
    const newHours = parseInt(value, 10);
    setHours(newHours);
    if (typeof onHourChange === "function") {
      onHourChange(newHours);
    }
  };

  const handleMinuteChange = (value) => {
    const newMinutes = parseInt(value, 10);
    setMinutes(newMinutes);
    if (typeof onMinuteChange === "function") {
      onMinuteChange(newMinutes);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="flex items-center justify-end text-gray-700 text-sm font-medium mb-2">
        <div className="flex items-center">
          {required && <span className="text-red-600 mr-1 text-lg">*</span>}
          {label || "وقت الطهي"}
        </div>
      </label>
      <div className="flex gap-2 w-full">
        {/* Minutes selection */}
        <div className="w-1/2 relative">
          <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden">
            <div className="pointer-events-none px-2 flex items-center text-gray-400">
              <IoChevronDownOutline size={16} />
            </div>
            <select
              value={minutes}
              onChange={(e) => handleMinuteChange(e.target.value)}
              required={required}
              className="w-full appearance-none py-2 px-1 bg-transparent text-gray-700 text-right focus:outline-none"
            >
              {[...Array(61).keys()].map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <span className="px-2 text-gray-700 text-sm">دقيقة</span>
          </div>
        </div>

        {/* Hours selection */}
        <div className="w-1/2 relative">
          <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden">
            <div className="pointer-events-none px-2 flex items-center text-gray-400">
              <IoChevronDownOutline size={16} />
            </div>
            <select
              value={hours}
              onChange={(e) => handleHourChange(e.target.value)}
              required={required}
              className="w-full appearance-none py-2 px-1 bg-transparent text-gray-700 text-right focus:outline-none"
            >
              {[...Array(25).keys()].map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <span className="px-2 text-gray-700 text-sm">ساعة</span>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1 text-right">{error}</p>}
    </div>
  );
};

export default PreparationTimePicker;
