import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const PreparationTimePicker = ({ label, onChange, className = "" }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const updateTotalMinutes = (newHours, newMinutes) => {
    const totalMinutes = newHours * 60 + newMinutes;
    onChange(totalMinutes);
  };

  const handleHourChange = (value) => {
    const newHours = parseInt(value, 10);
    setHours(newHours);
    updateTotalMinutes(newHours, minutes);
  };

  const handleMinuteChange = (value) => {
    const newMinutes = parseInt(value, 10);
    setMinutes(newMinutes);
    updateTotalMinutes(hours, newMinutes);
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="flex items-center justify-end text-gray-700 font-medium mb-1 gap-2">
        {label}
      </label>
      <div className="flex gap-3 w-full">
        {/* Minutes selection */}
        <div className="w-1/2 relative">
          <select
            value={minutes}
            onChange={(e) => handleMinuteChange(e.target.value)}
            className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 text-base font-medium shadow-md focus:outline-none text-right"
          >
            <option value="" disabled hidden>
              دقيقة
            </option>
            {[...Array(61).keys()].map((minute) => (
              <option key={minute} value={minute}>
                {minute} دقيقة
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
            <FaChevronDown />
          </div>
        </div>

        {/* Hours selection */}
        <div className="w-1/2 relative">
          <select
            value={hours}
            onChange={(e) => handleHourChange(e.target.value)}
            className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 text-base font-medium shadow-md focus:outline-none text-right"
          >
            <option value="" disabled hidden>
              ساعة
            </option>
            {[...Array(25).keys()].map((hour) => (
              <option key={hour} value={hour}>
                {hour} ساعة
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
            <FaChevronDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationTimePicker;
